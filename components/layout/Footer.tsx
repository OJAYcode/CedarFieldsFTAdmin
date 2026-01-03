import React from "react";
import Link from "next/link";
import { Hotel, Mail, Phone, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-primary-900 via-neutral-900 to-accent-900 text-white border-t-4 border-accent-600 relative overflow-hidden">
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-400 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Hotel className="w-6 h-6 text-white" />
              <span className="text-xl font-serif font-medium tracking-wide">
                CEDARFIELDS
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Experience exceptional hospitality in a serene environment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2 uppercase tracking-[0.2em] text-white">
                Quick Links
              </h3>
              <div className="h-px w-12 bg-accent-500"></div>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-accent-300 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="text-white hover:text-accent-300 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/check-booking"
                  className="text-white hover:text-accent-300 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Check Booking
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white hover:text-accent-300 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2 uppercase tracking-[0.2em] text-white">
                Contact
              </h3>
              <div className="h-px w-12 bg-accent-500"></div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-neutral-300 flex-shrink-0" />
                <span className="text-white text-sm">
                  123 Cedar Lane, Nature Valley, NV 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-300 flex-shrink-0" />
                <span className="text-white text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-300 flex-shrink-0" />
                <span className="text-white text-sm">info@cedarfields.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2 uppercase tracking-[0.2em] text-white">
                Hours
              </h3>
              <div className="h-px w-12 bg-accent-500"></div>
            </div>
            <ul className="space-y-3 text-white text-sm">
              <li>Check-in: 3:00 PM</li>
              <li>Check-out: 11:00 AM</li>
              <li>Front Desk: 24/7</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-500 text-xs">
          <p>
            &copy; {new Date().getFullYear()} CedarFields Hotel. All rights
            reserved.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-accent-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm font-light">
              &copy; {new Date().getFullYear()} CedarFields Hotel. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-neutral-400 hover:text-accent-300 text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-accent-300 text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
