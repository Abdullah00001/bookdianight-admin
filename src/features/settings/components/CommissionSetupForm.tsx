import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  useCommissionQuery, 
  useUpdateCommissionMutation,
  useServiceChargeQuery,
  useUpdateServiceChargeMutation
} from "@/apis/commission.api";
import { useModalStore } from "@/stores/modal.store";
import { Loader2 } from "lucide-react";

type SetupType = "CLUB" | "EVENT" | "SERVICE_CHARGE";

export function CommissionSetupForm() {
  const [type, setType] = useState<SetupType>("CLUB");
  const [inputValue, setInputValue] = useState("");

  const { data: commissionData, isLoading: isLoadingCommission } = useCommissionQuery();
  const { data: serviceChargeData, isLoading: isLoadingServiceCharge } = useServiceChargeQuery();
  
  const updateCommissionMutation = useUpdateCommissionMutation();
  const updateServiceChargeMutation = useUpdateServiceChargeMutation();
  
  const showModal = useModalStore((state) => state.showModal);

  const isLoading = isLoadingCommission || isLoadingServiceCharge;
  const isPending = updateCommissionMutation.isPending || updateServiceChargeMutation.isPending;

  useEffect(() => {
    if (type === "SERVICE_CHARGE") {
      if (serviceChargeData?.data) {
        setInputValue(String(serviceChargeData.data.amount || ""));
      }
    } else {
      if (commissionData?.data) {
        setInputValue(String(commissionData.data[type]?.chargePercentage || ""));
      }
    }
  }, [commissionData, serviceChargeData, type]);

  const handleSave = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || numValue < 0) {
      showModal("Error", "Please enter a valid positive number.", "error");
      return;
    }

    if (type === "SERVICE_CHARGE") {
      updateServiceChargeMutation.mutate(
        { amount: numValue },
        {
          onSuccess: (res) => {
            showModal("Success", res.message || "Service charge updated successfully.", "success");
          },
          onError: (error: any) => {
            const errorMessage =
              error?.response?.data?.message || error.message || "Failed to update service charge.";
            showModal("Error", errorMessage, "error");
          },
        }
      );
    } else {
      if (numValue > 100) {
        showModal("Error", "Commission percentage cannot exceed 100%.", "error");
        return;
      }
      updateCommissionMutation.mutate(
        { serviceType: type, chargePercentage: numValue },
        {
          onSuccess: (res) => {
            showModal("Success", res.message || "Commission updated successfully.", "success");
          },
          onError: (error: any) => {
            const errorMessage =
              error?.response?.data?.message || error.message || "Failed to update commission.";
            showModal("Error", errorMessage, "error");
          },
        }
      );
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Commission & Fees</h2>
        <p className="text-muted-foreground text-[15px]">
          Manage the platform commission percentage and fixed service charges.
        </p>
      </div>

      <div className="flex bg-muted/30 p-1 rounded-3xl mb-8 w-full relative">
        <button
          onClick={() => setType("CLUB")}
          className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            type === "CLUB"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Club Commission
        </button>
        <button
          onClick={() => setType("EVENT")}
          className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            type === "EVENT"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Event Commission
        </button>
        <button
          onClick={() => setType("SERVICE_CHARGE")}
          className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            type === "SERVICE_CHARGE"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Service Charge
        </button>
      </div>

      <div className="space-y-2 mb-8">
        <label className="text-sm font-medium text-foreground flex items-center">
          {type === "SERVICE_CHARGE" ? "Fixed Service Charge Amount ($)" : "Commission Percentage (%)"}
          {isLoading && <Loader2 className="ml-3 h-3 w-3 animate-spin text-muted-foreground" />}
        </label>
        <Input 
          type="number"
          step="0.01"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading || isPending}
          className="h-12 bg-transparent border-border rounded-xl"
        />
        <p className="text-xs text-muted-foreground pt-1">
          {type === "SERVICE_CHARGE" 
            ? "Platform fixed fee applied to each purchase"
            : `Platform commission percentage from each ${type.toLowerCase()}`
          }
        </p>
      </div>

      <Button 
        onClick={handleSave}
        disabled={isLoading || isPending || inputValue === ""}
        className="w-full h-12 bg-[#E5B869] hover:bg-[#D4A353] text-white font-medium rounded-xl text-base disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </div>
  );
}
