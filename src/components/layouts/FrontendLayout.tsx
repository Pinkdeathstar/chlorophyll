import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../home/Footer";
import SearchInput from "../ui/SearchInput";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <SearchInput />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </>
  );
}
