
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isSignUp 
        ? await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username: email.split('@')[0],
              }
            }
          })
        : await supabase.auth.signInWithPassword({
            email,
            password,
          });

      if (error) throw error;

      toast({
        title: isSignUp ? "Account created!" : "Welcome back!",
        description: isSignUp 
          ? "Please check your email to verify your account."
          : "Successfully logged in.",
      });

      if (!isSignUp) {
        navigate("/");
      }
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-lg bg-black/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your credentials to {isSignUp ? "join" : "access"} DeadWick Cheats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-800/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-800/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                {loading ? (
                  "Loading..."
                ) : isSignUp ? (
                  "Sign Up"
                ) : (
                  "Login"
                )}
              </Button>
              <p className="text-center text-gray-400 mt-4">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-purple-400 hover:text-purple-300 underline-offset-2 hover:underline"
                >
                  {isSignUp ? "Login" : "Sign Up"}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
