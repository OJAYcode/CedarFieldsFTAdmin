"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Hotel } from "lucide-react";
import { Button } from "../ui/Button";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/check-booking", label: "Check Booking" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-accent-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-600 to-accent-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Hotel className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-semibold text-primary-900 tracking-tight group-hover:text-accent-700 transition-colors duration-300">
              CEDARFIELDS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 group ${
                  isActive(link.href)
                    ? "text-accent-700"
                    : "text-primary-900 hover:text-accent-700"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-accent-600 transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
            <Link href="/">
              <Button variant="primary" size="sm">
                Admin Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-900 hover:text-neutral-600 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-xs font-medium tracking-widest uppercase transition-colors ${
                  isActive(link.href)
                    ? "text-primary-900"
                    : "text-neutral-600 hover:text-primary-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Button variant="primary" size="sm" className="w-full">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
