import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Wifi, Tv, Coffee } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { formatCurrency } from "@/lib/utils";
import type { Room } from "@/types";

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const getIconForAmenity = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes("wifi") || lower.includes("internet"))
      return <Wifi className="w-4 h-4" />;
    if (lower.includes("tv") || lower.includes("television"))
      return <Tv className="w-4 h-4" />;
    if (lower.includes("coffee") || lower.includes("breakfast"))
      return <Coffee className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="bg-white border-2 border-neutral-200 hover:border-accent-400 shadow-soft hover:shadow-2xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 group relative">
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[3px] border-l-[3px] border-accent-700 group-hover:w-8 group-hover:h-8 transition-all duration-500 z-10"></div>
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[3px] border-r-[3px] border-accent-700 group-hover:w-8 group-hover:h-8 transition-all duration-500 z-10"></div>
      <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[3px] border-l-[3px] border-accent-700 group-hover:w-8 group-hover:h-8 transition-all duration-500 z-10"></div>
      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[3px] border-r-[3px] border-accent-700 group-hover:w-8 group-hover:h-8 transition-all duration-500 z-10"></div>

      {/* Image */}
      <div className="relative h-72 bg-neutral-100 overflow-hidden">
        {room.images && room.images.length > 0 ? (
          <img
            src={room.images[0]}
            alt={room.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 bg-neutral-100">
            No Image
          </div>
        )}
        {room.status === "unavailable" && (
          <div className="absolute top-6 right-6 bg-primary-900 text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] shadow-lg z-20">
            <div className="absolute inset-0 border border-white/20"></div>
            <span className="relative">Unavailable</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        {/* Room Title with Decorative Line */}
        <div className="mb-4">
          <h3 className="text-2xl font-serif font-semibold mb-3 text-primary-900 group-hover:text-accent-700 transition-colors duration-300">
            {room.title}
          </h3>
          <div className="h-px w-16 bg-accent-600 group-hover:w-24 transition-all duration-500"></div>
        </div>

        <p className="text-neutral-600 text-sm mb-6 line-clamp-2 leading-relaxed font-light">
          {room.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-neutral-200">
          <div className="flex items-center space-x-2 text-neutral-700">
            <Users className="w-4 h-4 text-accent-700" />
            <span className="text-xs uppercase tracking-[0.15em] font-medium">
              {room.maxGuests} Guests
            </span>
          </div>
          {room.amenities.slice(0, 2).map((amenity, index) => {
            const icon = getIconForAmenity(amenity);
            return icon ? (
              <div
                key={index}
                className="flex items-center space-x-2 text-neutral-700"
              >
                <span className="text-accent-700">{icon}</span>
                <span className="text-xs uppercase tracking-[0.15em] font-medium">
                  {amenity}
                </span>
              </div>
            ) : null;
          })}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-3xl font-serif font-bold text-primary-900 group-hover:text-accent-700 transition-colors duration-300">
              {formatCurrency(room.pricePerNight)}
            </span>
            <span className="text-neutral-600 text-xs uppercase tracking-[0.15em] font-medium mt-1">
              Per Night
            </span>
          </div>
          <Link href={`/rooms/${room.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="group-hover:bg-accent-700 group-hover:text-white group-hover:border-accent-700"
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
