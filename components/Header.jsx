"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChartColumn, FolderOpenIcon, PenBox } from "lucide-react";
import { checkUser } from "@/lib/User";

const Header =() => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await checkUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <header className="container mx-auto ">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
         
          <SignedIn>
          <Link href='/dashboard#collections'>
          <Button variant="outline" className="flex items-center gap-2">
            <FolderOpenIcon size={18}/>
           <span className="hidden md:inline"> Collections</span>
          </Button>
          </Link>
          </SignedIn>

          <Link href='/journal/write'>
          <Button variant="orange" className="flex items-center gap-2">
            <PenBox size={18}/>
           <span className="hidden md:inline"> Write New</span>
          </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
                <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{
                elements:{
                    avatarBox:"w-10 h-10"
                }
            }}>
                <UserButton.MenuItems>
                <UserButton.Link
                label="Dashboard"
                labelIcon={<ChartColumn size={15}/>}
                href="/dashboard"
                />
                </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
