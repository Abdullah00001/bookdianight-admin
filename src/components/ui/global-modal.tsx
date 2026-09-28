import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useModalStore } from "@/stores/modal.store";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

export function GlobalModal() {
  const { isOpen, type, title, message, closeModal } = useModalStore();

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-500" />;
      case "error":
        return <XCircle className="h-6 w-6 text-red-600 dark:text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />;
      default:
        return <Info className="h-6 w-6 text-blue-600 dark:text-blue-500" />;
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case "success":
        return "text-green-600 dark:text-green-500";
      case "error":
        return "text-red-600 dark:text-red-500";
      case "warning":
        return "text-yellow-600 dark:text-yellow-500";
      default:
        return "text-blue-600 dark:text-blue-500";
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <AlertDialogTitle className={getTitleColor()}>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base text-foreground font-medium pt-2">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={closeModal}>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
