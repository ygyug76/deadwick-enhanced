
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-2">About Us</h1>
        <p className="text-gray-500 text-center mb-12">Get to know our team</p>

        <Card className="max-w-3xl mx-auto p-8 backdrop-blur-sm bg-white/10">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Owner Information</h2>
              <p className="text-gray-300">Name: Ashu</p>
              <p className="text-gray-300">Telegram: @ashuyt2003</p>
              <p className="text-gray-300">Channel: @deadwickyt</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
              <p className="text-gray-300">
                We strive to provide the highest quality gaming enhancement tools with
                exceptional customer support and continuous innovation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <Button
                className="w-full md:w-auto"
                onClick={() => window.open("https://t.me/ITS_ME_DEADWICK_YT", "_blank")}
              >
                Contact on Telegram
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default About;
