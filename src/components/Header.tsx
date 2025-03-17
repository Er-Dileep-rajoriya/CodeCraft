"use client";
import useTheme from "next-theme";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser } from "@/redux/userReducer";
import { RootState } from "@/redux/store";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function Navbar() {
  const session = useSession();
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const user = session.data?.user;
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { loggedInUser } = useSelector((store: RootState) => store.userReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      dispatch(setLoggedInUser(null));
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={"/"}>
              <h1 className="text-xl font-bold text-white hover:text-gray-200 transition-all duration-300">
                <span>Code</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                  Craft
                </span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 ${
                  pathname === link.href ? "bg-white/20" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Theme Toggle, Profile, and Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-white hover:bg-white/10"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Profile Dropdown or Auth Buttons */}
            {user || loggedInUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                  >
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage
                        src={
                          user?.image ||
                          loggedInUser?.image ||
                          "/default-avatar.png"
                        }
                        alt={user?.name || loggedInUser?.name || "User"}
                      />
                      <AvatarFallback className="bg-white text-blue-600 font-semibold">
                        {(user?.name || loggedInUser?.name || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem className="flex flex-col items-start p-2">
                    <span className="font-semibold">
                      {user?.name || loggedInUser?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {user?.email || loggedInUser?.email}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Link href={"/auth/signup"}>
                  <Button
                    variant="outline"
                    className="text-sm font-medium bg-white/10 text-white hover:bg-white/20"
                  >
                    Signup
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    variant="default"
                    className="text-sm font-medium bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg mt-2 p-2">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/20 ${
                    pathname === link.href ? "bg-white/30" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
