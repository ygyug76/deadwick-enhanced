
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Star, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DatabaseFeedback = {
  created_at: string;
  id: string;
  message: string;
  rating: number;
  user_id: string;
  image_url?: string;
  profiles: {
    username: string | null;
  } | null;
}

interface Feedback {
  id: string;
  name: string;
  message: string;
  rating: number;
  image_url?: string;
  user_id: string;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select(`
          *,
          profiles (
            username
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedFeedbacks = data.map((item: any) => ({
          id: item.id,
          message: item.message,
          rating: item.rating || 5,
          image_url: item.image_url,
          user_id: item.user_id,
          name: item.profiles?.username || "Anonymous"
        }));
        setFeedbacks(formattedFeedbacks);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch feedbacks",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("feedback_images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("feedback_images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await handleImageUpload(image);
      }

      const { error } = await supabase.from("feedback").insert({
        message,
        rating,
        user_id: user.id,
        image_url: imageUrl,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Feedback submitted successfully!",
      });

      setMessage("");
      setRating(5);
      setImage(null);
      setShowForm(false);
      fetchFeedbacks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Feedback
        </h1>
        <p className="text-gray-400 text-center mb-12">
          What our users say about us
        </p>

        {!showForm ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Submit Your Feedback
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <Card className="p-6 backdrop-blur-sm bg-white/10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Submit Feedback</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowForm(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your feedback..."
                    required
                    className="w-full px-4 py-2 bg-gray-800/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400 min-h-[100px]"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-2"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className={`transition-all duration-200 transform hover:scale-110 ${
                        value <= rating ? "text-yellow-500" : "text-gray-400"
                      }`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image")?.click()}
                      className="border-purple-500/20"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                    {image && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setImage(file);
                    }}
                    className="hidden"
                  />
                  {image && (
                    <p className="text-sm text-gray-400">{image.name}</p>
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Feedback"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feedbacks.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="p-6 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                        {feedback.name}
                      </h3>
                      <div className="flex">
                        {Array.from({ length: feedback.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-yellow-500 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    {feedback.image_url && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src={feedback.image_url}
                        alt="Feedback"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                    <p className="text-gray-300">{feedback.message}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Feedback;
