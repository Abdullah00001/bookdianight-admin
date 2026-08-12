import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  ChevronDown,
} from "lucide-react";
import logoImage from "@/assets/auth-pages-logo.png";

const mainMenuLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { 
    name: "Accounts", 
    href: "/accounts", 
    icon: User, 
    hasSubmenu: true,
    submenu: [
      { name: "Users", href: "/accounts/users" },
      { name: "Club Owner", href: "/accounts/club-owners" },
    ]
  },
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
  const location = useLocation();
  const navigate = useNavigate();
  const [isAccountsOpen, setIsAccountsOpen] = useState(
    location.pathname.startsWith("/accounts")
  );

  // Sync state if navigation happens outside sidebar
  useEffect(() => {
    if (location.pathname.startsWith("/accounts")) {
      setIsAccountsOpen(true);
    } else {
      setIsAccountsOpen(false);
    }
  }, [location.pathname]);

  const toggleAccounts = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAccountsOpen) {
      // If opening, redirect to default accounts page
      navigate("/accounts/users");
    }
    setIsAccountsOpen(!isAccountsOpen);
  };

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
            {mainMenuLinks.map((link) => {
              const isAccountsActive = link.name === "Accounts" && location.pathname.startsWith("/accounts");
              
              if (link.hasSubmenu) {
                return (
                  <li key={link.name}>
                    <button
                      onClick={toggleAccounts}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors relative z-10 border ${
                        isAccountsActive
                          ? "text-foreground border-primary bg-white"
                          : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <link.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="text-muted-foreground">{link.name}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isAccountsOpen ? "" : "-rotate-90"}`} />
                    </button>
                    
                    {/* Submenu */}
                    {isAccountsOpen && (
                      <div className="mt-2 ml-[22px] relative space-y-2 pb-1">
                        {link.submenu?.map((subItem, index) => {
                          const isLast = index === link.submenu!.length - 1;
                          const isSubItemActive = location.pathname === subItem.href;
                          
                          return (
                            <li key={subItem.name} className="relative pl-6 list-none">
                              {/* Straight gold spine segment for this item */}
                              {/* For the last item, it stops exactly where the 12px curve begins so it doesn't poke out! */}
                              <div 
                                className={`absolute left-0 w-[2px] bg-primary z-10 ${!isLast ? 'top-[-12px] bottom-[-12px]' : 'top-[-12px]'}`}
                                style={isLast ? { bottom: "calc(50% + 11px)" } : {}}
                              ></div>
                              
                              {/* Curved branch emerging from behind the gold spine */}
                              <div className={`absolute left-0 top-0 bottom-1/2 w-6 border-l-[2px] border-b-[2px] rounded-bl-xl border-t-0 border-r-0 z-0 ${isSubItemActive ? 'border-primary' : 'border-[#CBD5E1]'}`}></div>
                              
                              <NavLink
                                to={subItem.href}
                                className={({ isActive }) =>
                                  `block px-4 py-2.5 text-sm font-medium rounded-xl transition-all relative z-10 border ${
                                    isActive
                                      ? "bg-[#F1F5F9] text-slate-700 shadow-none border-transparent"
                                      : "bg-white text-slate-600 shadow-sm border-slate-100 hover:bg-slate-50"
                                  }`
                                }
                              >
                                {subItem.name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={link.name}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors border ${
                        isActive
                          ? "text-primary border-primary bg-primary/5 shadow-[0_0_10px_rgba(235,178,115,0.2)]"
                          : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted"
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="h-5 w-5" />
                      {link.name}
                    </div>
                  </NavLink>
                </li>
              );
            })}
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
                    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors border ${
                      isActive
                        ? "text-primary border-primary bg-primary/5"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted"
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
