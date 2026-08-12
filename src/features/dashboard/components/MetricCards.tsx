import { Euro, Users } from "lucide-react";

export function MetricCards() {
  const metrics = [
    {
      title: "Total Earning",
      value: "€ 15,000",
      icon: Euro,
    },
    {
      title: "Total Users",
      value: "3,285",
      icon: Users,
    },
    {
      title: "Total Club Owner",
      value: "250",
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between shadow-sm"
        >
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </span>
            <span className="text-3xl font-bold text-foreground">
              {metric.value}
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary flex items-center justify-center">
            <metric.icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      ))}
    </div>
  );
}
