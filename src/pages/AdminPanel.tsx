
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="p-6 backdrop-blur-sm bg-white/10">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p className="text-gray-400">Manage user accounts and permissions</p>
        </Card>
        <Card className="p-6 backdrop-blur-sm bg-white/10">
          <h2 className="text-xl font-semibold mb-4">Feedback Management</h2>
          <p className="text-gray-400">Review and moderate user feedback</p>
        </Card>
        <Card className="p-6 backdrop-blur-sm bg-white/10">
          <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
          <p className="text-gray-400">Track sales and revenue metrics</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
