import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CommissionSetupForm() {
  const [type, setType] = useState<"club" | "event">("club");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Commission Percentage</h2>
        <p className="text-muted-foreground text-[15px]">
          Manage the commission percentage applied to club and event earnings.
        </p>
      </div>

      <div className="flex bg-muted/30 p-1 rounded-3xl mb-8 w-full max-w-sm">
        <button
          onClick={() => setType("club")}
          className={`flex-1 px-8 py-2 rounded-full text-sm font-semibold transition-all ${
            type === "club"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Club
        </button>
        <button
          onClick={() => setType("event")}
          className={`flex-1 px-8 py-2 rounded-full text-sm font-semibold transition-all ${
            type === "event"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Event
        </button>
      </div>

      <div className="space-y-2 mb-8">
        <label className="text-sm font-medium text-foreground">
          Commission Percentage (%)
        </label>
        <Input 
          defaultValue="20" 
          className="h-12 bg-transparent border-border rounded-xl"
        />
        <p className="text-xs text-muted-foreground pt-1">
          Platform commission from each {type}
        </p>
      </div>

      <Button className="w-full h-12 bg-[#E5B869] hover:bg-[#D4A353] text-white font-medium rounded-xl text-base">
        Save Changes
      </Button>
    </div>
  );
}
