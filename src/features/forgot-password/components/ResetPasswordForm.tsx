import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema, type TResetRequest } from "../types/forgot-password.types";
import { useResetPasswordMutation } from "../api/forgot-password.api";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ResetPasswordForm() {
  const mutation = useResetPasswordMutation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<TResetRequest>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: TResetRequest) => {
    mutation.mutate(data, {
      onSuccess: () => {
        // Show success modal instead of immediate redirect
        setShowSuccess(true);
      },
    });
  };

  const handleModalClose = () => {
    setShowSuccess(false);
    navigate("/login");
  };

  return (
    <>
      <div className="w-full mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Reset Password
          </h2>
          <p className="text-sm text-muted-foreground">
            Set your new password to regain access to your account.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="**********" type={showPassword ? "text" : "password"} className="pr-10" {...field} />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="**********" type={showConfirmPassword ? "text" : "password"} className="pr-10" {...field} />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full text-primary-foreground text-md font-semibold py-6"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="sm:max-w-[425px] flex flex-col items-center p-8 sm:p-10 rounded-[24px] gap-6 border-none">
          <div className="bg-[#EAF6F0] rounded-[24px] p-4 flex items-center justify-center">
            <CheckCircle2 strokeWidth={1.5} className="w-10 h-10 text-[#54B689]" />
          </div>
          
          <AlertDialogHeader className="flex flex-col items-center gap-2">
            <AlertDialogTitle className="text-2xl font-semibold text-center text-heading m-0">
              Success
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base text-muted-foreground m-0">
              Your password has been reset successfully! You can now log in with your new password.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="w-full sm:justify-center mt-2">
            <AlertDialogAction 
              onClick={handleModalClose} 
              className="w-full bg-[#54B689] hover:bg-[#439c73] text-white rounded-xl py-6 text-lg font-medium"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
