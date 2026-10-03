import { Search, Menu, Languages } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth.store";
import { useTranslation } from "react-i18next";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { adminData } = useAuthStore();
  const { t, i18n } = useTranslation();

  const name = adminData?.name || "Admin";
  // Capitalize the first letter of the role and lowercase the rest (e.g. "ADMIN" -> "Admin")
  const rawRole = adminData?.accountRole || "Admin";
  const role = rawRole.charAt(0).toUpperCase() + rawRole.slice(1).toLowerCase();
  const avatarUrl = adminData?.profile?.profileAvatar || "";
  const fallback = name.substring(0, 2).toUpperCase();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="h-24 bg-card border-b border-border flex items-center justify-between px-4 xl:px-8 sticky top-0 z-10 gap-4">
      {/* Search Bar & Mobile Menu */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden shrink-0"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="flex items-center gap-2 bg-muted rounded-full p-1 border border-border/50">
          <Languages className="w-4 h-4 ml-2 text-muted-foreground hidden sm:block" />
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${i18n.language.startsWith('en') ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage('it')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${i18n.language.startsWith('it') ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            IT
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-border/50">
          <Avatar className="h-10 w-10">
            {avatarUrl && (
              <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
            )}
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-sm font-semibold text-foreground leading-tight">
              {name}
            </span>
            <span className="text-xs text-muted-foreground">{role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
