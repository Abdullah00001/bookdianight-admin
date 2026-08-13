import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-24 bg-card border-b border-border flex items-center justify-between px-4 xl:px-8 sticky top-0 z-10 gap-4">
      {/* Search Bar & Mobile Menu */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <Button variant="ghost" size="icon" className="xl:hidden shrink-0" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search anything..."
          className="w-full pl-10 bg-background border-border h-11 rounded-xl"
        />
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="Lorenzo" />
          <AvatarFallback>LO</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground leading-tight">
            Lorenzo
          </span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>
      </div>
    </header>
  );
}
