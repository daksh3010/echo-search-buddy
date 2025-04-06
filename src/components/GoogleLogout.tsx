
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from "lucide-react";

const GoogleLogout = () => {
  const { logout } = useAuth();

  return (
    <Button 
      onClick={logout} 
      variant="outline" 
      className="flex items-center gap-2 text-gray-700 hover:bg-gray-100"
    >
      <LogOut size={18} />
      Sign out
    </Button>
  );
};

export default GoogleLogout;
