
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      duration: "1 Day",
      price: "100",
      features: ["Full access to all features", "24/7 support", "Instant activation"],
    },
    {
      duration: "7 Days",
      price: "500",
      features: ["Weekly updates", "Priority support", "Custom configurations"],
    },
    {
      duration: "30 Days",
      price: "1000",
      features: ["Monthly updates", "VIP support", "Feature requests"],
    },
    {
      duration: "60 Days",
      price: "1800",
      features: ["Bi-monthly updates", "Premium support", "Private Discord access"],
    },
    {
      duration: "Full Season",
      price: "2000",
      features: ["Seasonal updates", "Exclusive features", "One-on-one coaching"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-2">Pricing Plans</h1>
        <p className="text-gray-500 text-center mb-12">
          Choose the perfect plan for your needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.duration}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-2">{plan.duration}</h3>
                <div className="text-3xl font-bold mb-6">₹{plan.price}</div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Started
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
