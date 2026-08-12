import { X, Phone, MapPin, Mail, Calendar, ShieldCheck, Globe, PartyPopper, UserX, Trash2, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any; // We'll type this properly later, for now we assume it has basic info
}

const recentBookings = [
  { id: 1, name: "Skyline Rooftop", date: "2026-05-10", price: "£480", status: "Confirmed" },
  { id: 2, name: "Neon Lounge", date: "2026-05-10", price: "£480", status: "Completed" },
  { id: 3, name: "The Grand Ballroom", date: "2026-05-10", price: "£1250", status: "Cancelled" },
];

const recentClubs = [
  { id: 1, name: "Skyline Rooftop", location: "Shoreditch", rating: 4.8, price: "From $65" },
  { id: 2, name: "Skyline Rooftop", location: "Shoreditch", rating: 4.8, price: "From $65" },
  { id: 3, name: "Skyline Rooftop", location: "Shoreditch", rating: 4.8, price: "From $65" },
];

const recentEvents = [
  { id: 1, name: "Skyline Rooftop", location: "Shoreditch", rating: 4.8, price: "$191.00 /person" },
  { id: 2, name: "Skyline Rooftop", location: "Shoreditch", rating: 4.8, price: "$191.00 /person" },
  { id: 3, name: "Skyline Rooftop", location: "Shoreditch", rating: 4.8, price: "$191.00 /person" },
];

export function UserDetailsModal({ isOpen, onClose, user }: UserDetailsModalProps) {
  // If no user is provided, don't render content properly or just use a fallback
  const displayUser = user || {
    name: "James Mitchell",
    email: "james.m@email.com",
    phone: "+44 7911 123456",
    country: "UK",
    joinDate: "2026-01-15",
    status: "Active",
    type: "User",
  };

  const isClubOwner = displayUser.type === "Club Owner";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none rounded-[24px] gap-0 [&>button]:hidden">
        <DialogHeader className="p-6 pb-0 relative">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://i.pravatar.cc/150?u=james" alt={displayUser.name} />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <DialogTitle className="text-xl font-bold text-foreground m-0">
                {displayUser.name}
              </DialogTitle>
              <span className="text-sm text-muted-foreground">{displayUser.email}</span>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 h-8 w-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <div className="px-6 border-b border-border">
            <TabsList className="bg-transparent h-auto p-0 gap-6">
              <TabsTrigger 
                value="overview"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none pb-3 px-0 font-medium"
              >
                Overview
              </TabsTrigger>
              
              {isClubOwner ? (
                <>
                  <TabsTrigger 
                    value="clubs"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none pb-3 px-0 font-medium"
                  >
                    Clubs
                  </TabsTrigger>
                  <TabsTrigger 
                    value="events"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none pb-3 px-0 font-medium"
                  >
                    Events
                  </TabsTrigger>
                </>
              ) : (
                <TabsTrigger 
                  value="bookings"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none pb-3 px-0 font-medium"
                >
                  Bookings history
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto relative">
            <TabsContent value="overview" className="m-0 space-y-6 outline-none">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">{isClubOwner ? "Club Hosted" : "Club Bookings"}</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">12</span>
                </div>
                <div className="bg-muted/50 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <PartyPopper className="h-4 w-4" />
                    <span className="text-sm">{isClubOwner ? "Event Hosted" : "Event Bookings"}</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">24</span>
                </div>
              </div>

              {/* Info List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">Phone</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{displayUser.phone}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Country</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{displayUser.country}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">Email</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{displayUser.email}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Joined</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{displayUser.joinDate}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-sm">Status</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{displayUser.status}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary/5 transition-colors font-medium text-sm">
                  <UserX className="h-4 w-4" />
                  Suspend
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-50 transition-colors font-medium text-sm">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </TabsContent>

            {!isClubOwner && (
              <TabsContent value="bookings" className="m-0 space-y-4 outline-none">
                <h4 className="text-base font-bold text-foreground mb-4">Recent Bookings</h4>
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="bg-muted/30 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{booking.name}</span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{booking.date}</span>
                        <span className="font-bold text-foreground">{booking.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            {isClubOwner && (
              <>
                <TabsContent value="clubs" className="m-0 space-y-4 outline-none">
                  <div className="space-y-3">
                    {recentClubs.map((club) => (
                      <div key={club.id} className="bg-muted/30 rounded-2xl p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground text-base">{club.name}</span>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-medium text-sm text-foreground">{club.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="text-sm">{club.location}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{club.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary/5 transition-colors font-medium text-sm">
                      <UserX className="h-4 w-4" />
                      Suspend
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-50 transition-colors font-medium text-sm">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </TabsContent>

                <TabsContent value="events" className="m-0 space-y-4 outline-none">
                  <div className="space-y-3">
                    {recentEvents.map((event) => (
                      <div key={event.id} className="bg-muted/30 rounded-2xl p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground text-base">{event.name}</span>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-medium text-sm text-foreground">{event.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{event.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary/5 transition-colors font-medium text-sm">
                      <UserX className="h-4 w-4" />
                      Suspend
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-50 transition-colors font-medium text-sm">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </TabsContent>
              </>
            )}

          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
