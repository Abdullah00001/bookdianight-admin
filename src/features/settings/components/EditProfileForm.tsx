import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { mockProfile } from "../api/mock";

export function EditProfileForm() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Edit Profile</h2>
        <p className="text-muted-foreground text-[15px] max-w-lg">
          Update your personal details, profile picture, and account settings to keep your information accurate and up-to-date.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <Avatar className="h-16 w-16 border border-border">
            <AvatarImage src={mockProfile.avatar} />
            <AvatarFallback>{mockProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 h-6 w-6 bg-foreground text-background rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:bg-muted-foreground transition-colors shadow-sm">
            <Camera className="h-3 w-3" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{mockProfile.name.split(" ")[0]}</h3>
          <p className="text-sm text-muted-foreground font-medium">{mockProfile.role}</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <Input 
            defaultValue={mockProfile.name} 
            className="h-12 bg-transparent border-border rounded-xl"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <Input 
            type="email"
            defaultValue={mockProfile.email} 
            className="h-12 bg-transparent border-border rounded-xl"
          />
        </div>
      </div>

      <Button className="w-full h-12 bg-[#E5B869] hover:bg-[#D4A353] text-white font-medium rounded-xl text-base">
        Save Changes
      </Button>
    </div>
  );
}
