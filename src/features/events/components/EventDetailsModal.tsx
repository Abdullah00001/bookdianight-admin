import { X, Clock, MapPin } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Event } from "../types";
import { useTranslation } from "react-i18next";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export function EventDetailsModal({ isOpen, onClose, event }: EventDetailsModalProps) {
  const { t } = useTranslation();

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white gap-0 border-none shadow-2xl [&>button]:hidden rounded-3xl">
        <div className={`p-2 ${event.description || (event.images && event.images.length > 0) ? 'pb-0' : ''}`}>
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100">
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <img 
              src={event.thumbnail || ""} 
              alt={event.name} 
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block rounded-full bg-[#E5B869] px-4 py-1.5 text-sm font-semibold text-black mb-3">
                {event.price} {event.currency}
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">{event.name}</h2>
              
              <div className="flex items-center gap-2 w-full">
                <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-black shrink-0">
                  <Clock className="h-4 w-4 shrink-0" />
                  {event.dateAndTime}
                </div>
                {event.country && (
                  <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-black min-w-0">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="truncate">{event.country}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {(event.description || (event.images && event.images.length > 0)) && (
          <div className="p-6 pt-4 max-h-[350px] overflow-y-auto">
            {event.description && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">{t("commonCards.about")}</h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {event.description}
                </p>
              </div>
            )}

            {event.images && event.images.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{t("commonCards.photos")}</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                  {event.images.map((photo, index) => (
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
        )}
      </DialogContent>
    </Dialog>
  );
}
