
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-bartr-primary">bartr</span>
              <span className="ml-1 text-xs bg-bartr-secondary text-white px-1 py-0.5 rounded">beta</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-bartr-primary px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/explore" className="text-gray-600 hover:text-bartr-primary px-3 py-2 rounded-md text-sm font-medium">
                Explore
              </Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-bartr-primary px-3 py-2 rounded-md text-sm font-medium">
                How It Works
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="rounded-full relative" asChild>
                  <Link to="/messages">
                    <MessageSquare size={20} />
                    <span className="absolute top-0 right-0 bg-bartr-secondary rounded-full w-2 h-2"></span>
                  </Link>
                </Button>
                
                <Button variant="ghost" size="icon" className="rounded-full relative" asChild>
                  <Link to="/notifications">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 bg-bartr-secondary rounded-full w-2 h-2"></span>
                  </Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full" size="sm">
                      <div className="flex items-center">
                        <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-full object-cover" />
                        <span className="ml-2 hidden md:block">{user?.name.split(' ')[0]}</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="w-full">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-500">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button className="bg-bartr-primary hover:bg-bartr-dark" asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
            
            <div className="md:hidden">
              <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} size="sm">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-bartr-light hover:text-bartr-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/explore" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-bartr-light hover:text-bartr-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link 
                to="/how-it-works" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-bartr-light hover:text-bartr-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              {isAuthenticated && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-bartr-light hover:text-bartr-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-bartr-light hover:text-bartr-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
