
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

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

interface ExtendedFeedback {
  id: string;
  message: string;
  rating: number;
  image_url?: string;
  user_id: string;
  username: string;
  created_at: string;
}

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<ExtendedFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchFeedbacks();
  }, [isAdmin, navigate]);

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
          username: item.profiles?.username || "Anonymous",
          created_at: item.created_at
        }));
        setFeedbacks(formattedFeedbacks);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch feedbacks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl?: string) => {
    setDeleting(id);
    try {
      if (imageUrl) {
        const imagePath = imageUrl.split("/").pop();
        if (imagePath) {
          await supabase.storage
            .from("feedback_images")
            .remove([imagePath]);
        }
      }

      const { error } = await supabase
        .from("feedback")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Feedback deleted successfully",
      });

      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  if (!isAdmin) return null;

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
          Admin Panel
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Manage user feedbacks and content
        </p>

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-6">
              {feedbacks.map((feedback, index) => (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-6 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                              {feedback.username}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {new Date(feedback.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="text-yellow-500 mr-4">
                              Rating: {feedback.rating}/5
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(feedback.id, feedback.image_url)}
                              disabled={deleting === feedback.id}
                              className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                            >
                              {deleting === feedback.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        {feedback.image_url && (
                          <motion.img
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            src={feedback.image_url}
                            alt="Feedback"
                            className="w-full max-w-md h-48 object-cover rounded-lg"
                          />
                        )}
                        <p className="text-gray-300">{feedback.message}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;
