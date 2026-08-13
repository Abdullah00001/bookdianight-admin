import type { AppNotification } from "../types";

interface NotificationCardProps {
  notification: AppNotification;
}

export function NotificationCard({ notification }: NotificationCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-2">
      <h3 className="text-lg font-bold text-foreground">{notification.title}</h3>
      <p className="text-[15px] text-muted-foreground">{notification.description}</p>
      <span className="text-xs text-muted-foreground mt-2">{notification.date}</span>
    </div>
  );
}
