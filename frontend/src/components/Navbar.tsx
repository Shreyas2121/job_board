import { AlignJustify } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useLogout } from "@/api/react-query";
import { useAuthStore } from "@/store/user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const logout = useLogout();

  const role = useAuthStore((state) => state.user?.role!);

  function handleLogout() {
    logout.mutate();
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <Link to="/" className="text-lg font-bold">
          JobBoard
        </Link>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                className="w-8 h-8 rounded-full"
                src="https://www.gravatar.com/avatar/?d=mp"
                alt="Profile"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              {/* <DropdownMenuItem>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem> */}

              <DropdownMenuItem>
                <Link to="/applications">My Applications</Link>
              </DropdownMenuItem>

              {role === "employer" && (
                <>
                  <DropdownMenuItem>
                    <Link to="/newJob">Post new Job</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link to="/postedJobs">Posted Jobs</Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button onClick={handleLogout}>Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
