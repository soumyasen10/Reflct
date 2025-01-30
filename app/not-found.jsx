import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-9xl font-bold gradient-title mb-4 ">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-orange-500 mb-8">
        OOPs! The page you&apos;re looking for doesn&apos;t exists or has been
        moved
      </p>
      <Link href='/'>
        <Button variant="orange">
            Back To Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
