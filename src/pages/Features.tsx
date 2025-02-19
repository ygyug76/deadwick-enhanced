
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Features = () => {
  const features = [
    {
      name: "ESP",
      description: "Advanced player detection and visualization system",
      details: ["Wall hacks", "Player tracking", "Distance information"],
    },
    {
      name: "Aimbot",
      description: "Precision targeting assistance",
      details: ["Auto-aim", "Target prediction", "Customizable FOV"],
    },
    {
      name: "Bullet Track",
      description: "Enhanced bullet trajectory control",
      details: ["Bullet path prediction", "Impact calculation", "Spread control"],
    },
    {
      name: "No Recoil",
      description: "Perfect recoil compensation",
      details: ["Recoil elimination", "Spread reduction", "Pattern learning"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-2">Features</h1>
        <p className="text-gray-500 text-center mb-12">
          Discover our premium features designed for competitive gaming
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4">{feature.name}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.details.map((detail) => (
                    <Badge
                      key={detail}
                      variant="secondary"
                      className="bg-gray-800 text-white"
                    >
                      {detail}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
