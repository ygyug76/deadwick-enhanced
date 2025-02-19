
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Feedback {
  id: number;
  name: string;
  message: string;
  rating: number;
}

const Feedback = () => {
  const [feedbacks] = useState<Feedback[]>([
    {
      id: 1,
      name: "Arjun Kumar",
      message: "Amazing features and excellent support! Would definitely recommend.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Sharma",
      message: "Very satisfied with the product. Works flawlessly.",
      rating: 5,
    },
    {
      id: 3,
      name: "Rahul Singh",
      message: "Great service and quick response from support team.",
      rating: 4,
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-2">Feedback</h1>
        <p className="text-gray-500 text-center mb-12">
          What our users say about us
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbacks.map((feedback) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 backdrop-blur-sm bg-white/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{feedback.name}</h3>
                    <div className="flex">
                      {Array.from({ length: feedback.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{feedback.message}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Submit Your Feedback
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Feedback;
