import { X, Phone, MapPin, Mail, Calendar, ShieldCheck, Globe, PartyPopper, UserX, UserCheck, Trash2, Star, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSuspendUserMutation, useDeleteUserMutation } from "@/apis/users.api";
import type { TUser } from "@/apis/users.api";
import { format } from "date-fns";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: TUser | null;
}





export function UserDetailsModal({ isOpen, onClose, user }: UserDetailsModalProps) {
  const suspendMutation = useSuspendUserMutation();
  const deleteMutation = useDeleteUserMutation();

  if (!user) return null;

  const isClubOwner = user.accountRole === "CLUB_OWNER";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
      case "Confirmed":
      case "PAID":
        return "bg-green-100 text-green-700";
      case "Completed":
      case "PENDING_PAYMENT":
        return "bg-blue-100 text-blue-700";
      case "BLOCKED":
      case "Cancelled":
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleSuspend = () => {
    suspendMutation.mutate(user.id, {
      onSuccess: () => onClose()
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(user.id, {
      onSuccess: () => onClose()
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none rounded-[24px] gap-0 [&>button]:hidden">
        <DialogHeader className="p-6 pb-0 relative">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.profile?.profileAvatar || ""} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <DialogTitle className="text-xl font-bold text-foreground m-0">
                {user.name}
              </DialogTitle>
              <span className="text-sm text-muted-foreground">{user.email}</span>
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

          <div className="p-6 h-[460px] overflow-y-auto relative">
            <TabsContent value="overview" className="m-0 space-y-6 outline-none">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">{isClubOwner ? "Club Hosted" : "Club Bookings"}</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">{isClubOwner ? (user.clubHostedCount ?? "-") : (user.clubBookingsCount ?? "-")}</span>
                </div>
                <div className="bg-muted/50 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <PartyPopper className="h-4 w-4" />
                    <span className="text-sm">{isClubOwner ? "Event Hosted" : "Event Bookings"}</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">{isClubOwner ? (user.eventHostedCount ?? "-") : (user.eventBookingsCount ?? "-")}</span>
                </div>
              </div>

              {/* Info List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">Phone</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{user.phoneNumber || "-"}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Country</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{user.country || "-"}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">Email</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{user.email}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Joined</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{user.createdAt ? format(new Date(user.createdAt), "dd MMM, yyyy") : "-"}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-sm">Status</span>
                  </div>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${getStatusColor(user.accountStatus)}`}>{user.accountStatus}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button 
                  onClick={handleSuspend}
                  disabled={suspendMutation.isPending}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors font-medium text-sm disabled:opacity-50 ${
                    user.accountStatus === "BLOCKED" 
                      ? "border-green-500 text-green-600 hover:bg-green-50" 
                      : "border-primary text-primary hover:bg-primary/5"
                  }`}
                >
                  {suspendMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (user.accountStatus === "BLOCKED" ? <UserCheck className="h-4 w-4" /> : <UserX className="h-4 w-4" />)}
                  {user.accountStatus === "BLOCKED" ? "Activate" : "Suspend"}
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-50 transition-colors font-medium text-sm disabled:opacity-50"
                >
                  {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  Delete
                </button>
              </div>
            </TabsContent>

            {!isClubOwner && (
              <TabsContent value="bookings" className="m-0 space-y-4 outline-none">
                <h4 className="text-base font-bold text-foreground mb-4">Recent Bookings</h4>
                <div className="space-y-3">
                  {user.recentBookings?.length ? (
                    user.recentBookings.map((booking) => (
                      <div key={booking.id} className="bg-muted/30 rounded-2xl p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">{booking.name}</span>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status.replace("_", " ")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{booking.date ? format(new Date(booking.date), "dd MMM, yyyy") : "-"}</span>
                          <span className="font-bold text-foreground">£{booking.amount}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-sm text-muted-foreground">
                      No recent bookings found.
                    </div>
                  )}
                </div>
              </TabsContent>
            )}

            {isClubOwner && (
              <>
                <TabsContent value="clubs" className="m-0 space-y-4 outline-none">
                  <div className="space-y-3">
                    {user.recentClubs?.length ? (
                      user.recentClubs.map((club) => (
                        <div key={club.id} className="bg-muted/30 rounded-2xl p-4 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground text-base">{club.name}</span>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                              <span className="font-medium text-sm text-foreground">{club.rating || "0.0"}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              <span className="text-sm max-w-[200px] truncate">{club.location || "-"}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{club.price} {club.currency}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-sm text-muted-foreground">
                        No clubs hosted yet.
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="events" className="m-0 space-y-4 outline-none">
                  <div className="space-y-3">
                    {user.recentEvents?.length ? (
                      user.recentEvents.map((event) => (
                        <div key={event.id} className="bg-muted/30 rounded-2xl p-4 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground text-base">{event.name}</span>
                            {/* Rating removed from Event */}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              <span className="text-sm max-w-[200px] truncate">{event.location || "-"}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{event.price} {event.currency}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-sm text-muted-foreground">
                        No events hosted yet.
                      </div>
                    )}
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
