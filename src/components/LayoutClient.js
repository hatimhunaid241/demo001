"use client";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function LayoutClient({ children }) {
  const imageLoaded = useRef(false);

  return (
    <>
      {!imageLoaded && (
        <div className="flex items-center justify-center min-h-screen">
          <span>Loading...</span>
        </div>
      )}
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        style={{ display: "none" }}
        onLoad={() => imageLoaded.current = true}
      />
      {imageLoaded && (
        <>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}