import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NotificationCard } from "@/features/notifications/components/NotificationCard";
import { mockNotifications } from "@/features/notifications/api/mock";

export default function NotificationsPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-3">Notifications</h1>
        <p className="text-muted-foreground text-[15px] max-w-2xl leading-relaxed">
          Stay informed with updates on your activity, platform news, and important
          alerts. Customize your notification preferences to suit your needs
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {mockNotifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pb-8">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Show result:</span>
          <Select defaultValue="5">
            <SelectTrigger className="w-[80px] bg-muted/50 border-transparent rounded-lg">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-sm font-bold hover:bg-muted text-foreground shrink-0">
            &lt;
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-sm font-bold text-foreground shrink-0">
            1
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-sm font-bold hover:bg-muted text-foreground shrink-0">
            2
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-sm font-bold hover:bg-muted text-foreground shrink-0">
            3
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-sm font-bold hover:bg-muted text-muted-foreground shrink-0 pointer-events-none">
            ...
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-sm font-bold hover:bg-muted text-foreground shrink-0">
            13
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-sm font-bold hover:bg-muted text-foreground shrink-0">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
