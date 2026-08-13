import type { EarningTransaction } from "../types";
import imageSrc from "@/assets/auth-pages-image.png";

export const mockEarnings: EarningTransaction[] = Array.from({ length: 20 }).map((_, i) => {
  const isCanceled = i % 3 === 2;
  return {
    id: `trn-${i}`,
    name: "Sky Garden Rooftop",
    image: imageSrc,
    createdBy: "Ahmad Zain",
    date: "01-06-2026",
    time: "9:30 AM",
    location: "UK",
    price: isCanceled ? "0" : "$250",
    commission: isCanceled ? "0" : "10%",
    earning: isCanceled ? "0" : "$25",
    status: isCanceled ? "Canceled" : "Completed",
    type: i % 2 === 0 ? "clubs" : "events",
  };
});
