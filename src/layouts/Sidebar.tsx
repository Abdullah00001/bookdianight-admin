import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  User,
  Globe,
  PartyPopper,
  Wallet,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import logoImage from "@/assets/auth-pages-logo.png";
import { useAuthStore } from "@/stores/auth.store";
import { useModalStore } from "@/stores/modal.store";
import { useLogoutMutation } from "@/apis/auth.api";

const mainMenuLinks = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { 
    key: "accounts", 
    href: "/accounts", 
    icon: User, 
    hasSubmenu: true,
    submenu: [
      { key: "users", href: "/accounts/users" },
      { key: "clubOwner", href: "/accounts/club-owners" },
    ]
  },
  { key: "clubs", href: "/clubs", icon: Globe },
  { key: "events", href: "/events", icon: PartyPopper },
  { key: "earning", href: "/earning", icon: Wallet },
];

const supportLinks = [
  { key: "settings", href: "/settings", icon: Settings },
  { key: "logout", href: "#", icon: LogOut, action: "logout" },
];

export function SidebarContent({ onClickItem }: { onClickItem?: () => void }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  
  const [isAccountsOpen, setIsAccountsOpen] = useState(
    location.pathname.startsWith("/accounts")
  );

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
      navigate("/accounts/users");
    }
    setIsAccountsOpen(!isAccountsOpen);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearAuth();
        navigate("/login");
        useModalStore.getState().showModal("Logged Out", "You have successfully logged out.", "success");
      },
      onError: (err) => {
        console.error("Logout failed:", err);
        clearAuth();
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] w-full">
      <div className="flex items-center justify-center h-24 mt-4 mb-6">
        <img
          src={logoImage}
          alt="BookDianight Logo"
          className="h-20 w-auto object-contain"
        />
      </div>

      <div className="flex-1 px-4">
        <div className="mb-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">
            {t("sidebar.mainMenu")}
          </p>
          <ul className="space-y-2">
            {mainMenuLinks.map((link) => {
              const isAccountsActive = link.key === "accounts" && location.pathname.startsWith("/accounts");
              
              if (link.hasSubmenu) {
                return (
                  <li key={link.key}>
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
                        <span className="text-muted-foreground">{t(`sidebar.${link.key}`)}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isAccountsOpen ? "" : "-rotate-90"}`} />
                    </button>
                    
                    {isAccountsOpen && (
                      <div className="mt-2 ml-[22px] relative space-y-2 pb-1">
                        {link.submenu?.map((subItem, index) => {
                          const isLast = index === link.submenu!.length - 1;
                          const isSubItemActive = location.pathname === subItem.href;
                          
                          return (
                            <li key={subItem.key} className="relative pl-6 list-none">
                              <div 
                                className={`absolute left-0 w-[2px] bg-primary z-10 ${!isLast ? 'top-[-12px] bottom-[-12px]' : 'top-[-12px]'}`}
                                style={isLast ? { bottom: "calc(50% + 11px)" } : {}}
                              ></div>
                              
                              <div className={`absolute left-0 top-0 bottom-1/2 w-6 border-l-[2px] border-b-[2px] rounded-bl-xl border-t-0 border-r-0 z-0 ${isSubItemActive ? 'border-primary' : 'border-[#CBD5E1]'}`}></div>
                              
                              <NavLink
                                to={subItem.href}
                                onClick={onClickItem}
                                className={({ isActive }) =>
                                  `block px-4 py-2.5 text-sm font-medium rounded-xl transition-all relative z-10 border ${
                                    isActive
                                      ? "bg-[#F1F5F9] text-slate-700 shadow-none border-transparent"
                                      : "bg-white text-slate-600 shadow-sm border-slate-100 hover:bg-slate-50"
                                  }`
                                }
                              >
                                {t(`sidebar.${subItem.key}`)}
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
                <li key={link.key}>
                  <NavLink
                    to={link.href}
                    onClick={onClickItem}
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
                      {t(`sidebar.${link.key}`)}
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">
            {t("sidebar.support")}
          </p>
          <ul className="space-y-2">
            {supportLinks.map((link) => (
              <li key={link.key}>
                {link.action === "logout" ? (
                  <button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors border text-red-500 border-transparent hover:text-red-600 hover:bg-red-50"
                  >
                    <link.icon className={`h-5 w-5 ${logoutMutation.isPending ? "opacity-50" : ""}`} />
                    {logoutMutation.isPending ? t("sidebar.loggingOut") : t(`sidebar.${link.key}`)}
                  </button>
                ) : (
                  <NavLink
                    to={link.href}
                    onClick={onClickItem}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors border ${
                        isActive
                          ? "text-primary border-primary bg-primary/5"
                          : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted"
                      }`
                    }
                  >
                    <link.icon className="h-5 w-5" />
                    {t(`sidebar.${link.key}`)}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={`w-64 h-screen bg-[#FAFAFA] border-r border-border fixed left-0 top-0 overflow-y-auto z-20 ${className || ''}`}>
      <SidebarContent />
    </div>
  );
}
