
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Layout = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <nav className="backdrop-blur-md bg-black/30 fixed w-full z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold">
              DeadWick
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/features" className="hover:text-gray-300 transition-colors">
                Features
              </Link>
              <Link to="/pricing" className="hover:text-gray-300 transition-colors">
                Pricing
              </Link>
              <Link to="/feedback" className="hover:text-gray-300 transition-colors">
                Feedback
              </Link>
              <Link to="/about" className="hover:text-gray-300 transition-colors">
                About
              </Link>
              {isAdmin && (
                <Link to="/admin" className="hover:text-gray-300 transition-colors">
                  Admin
                </Link>
              )}
            </div>
            <div>
              {user ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button variant="default" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
