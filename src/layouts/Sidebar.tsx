import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Globe,
  PartyPopper,
  Wallet,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import logoImage from "@/assets/auth-pages-logo.png";

const mainMenuLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Accounts", href: "/accounts", icon: User, hasArrow: true },
  { name: "Clubs", href: "/clubs", icon: Globe },
  { name: "Events", href: "/events", icon: PartyPopper },
  { name: "Earning", href: "/earning", icon: Wallet },
  { name: "Notifications", href: "/notifications", icon: Bell },
];

const supportLinks = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "/login", icon: LogOut }, // Simplistic logout redirect for now
];

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#FAFAFA] border-r border-border flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center justify-center h-24 mt-4 mb-6">
        <img
          src={logoImage}
          alt="BookDianight Logo"
          className="h-20 w-auto object-contain"
        />
      </div>

      <div className="flex-1 px-4">
        {/* Main Menu */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">
            Main Menu
          </p>
          <ul className="space-y-2">
            {mainMenuLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isActive
                        ? "text-primary border border-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="h-5 w-5" />
                    {link.name}
                  </div>
                  {link.hasArrow && <ChevronRight className="h-4 w-4" />}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">
            Support
          </p>
          <ul className="space-y-2">
            {supportLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isActive
                        ? "text-primary border border-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`
                  }
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
