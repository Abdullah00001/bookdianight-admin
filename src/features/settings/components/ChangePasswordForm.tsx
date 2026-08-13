import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ChangePasswordForm() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Change Password</h2>
        <p className="text-muted-foreground text-[15px]">
          Your password must be 8-10 character long.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Current Password</label>
          <Input 
            type="password"
            placeholder="*************" 
            className="h-12 bg-transparent border-border rounded-xl placeholder:tracking-widest placeholder:text-muted-foreground"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">New Password</label>
          <Input 
            type="password"
            placeholder="*************" 
            className="h-12 bg-transparent border-border rounded-xl placeholder:tracking-widest placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Confirm Password</label>
          <Input 
            type="password"
            placeholder="*************" 
            className="h-12 bg-transparent border-border rounded-xl placeholder:tracking-widest placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <Button className="w-full h-12 bg-[#E5B869] hover:bg-[#D4A353] text-white font-medium rounded-xl text-base">
        Save Changes
      </Button>
    </div>
  );
}
