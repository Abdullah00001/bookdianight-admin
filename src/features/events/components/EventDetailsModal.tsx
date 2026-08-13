import { X, Clock, MapPin } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Event } from "../types";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export function EventDetailsModal({ isOpen, onClose, event }: EventDetailsModalProps) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white gap-0 border-none shadow-2xl [&>button]:hidden rounded-3xl">
        <div className="p-2 pb-0">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <img 
              src={event.image} 
              alt={event.name} 
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block rounded-full bg-[#E5B869] px-4 py-1.5 text-sm font-semibold text-black mb-3">
                {event.price}
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">{event.name}</h2>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-black">
                  <Clock className="h-4 w-4" />
                  {event.dateTime}
                </div>
                {event.location && (
                  <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-black">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 max-h-[350px] overflow-y-auto">
          {event.about && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">About</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {event.about}
              </p>
            </div>
          )}

          {event.photos && event.photos.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Photos</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {event.photos.map((photo, index) => (
                  <img 
                    key={index}
                    src={photo}
                    alt={`${event.name} photo ${index + 1}`}
                    className="h-36 w-36 object-cover rounded-2xl flex-shrink-0 snap-start"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
