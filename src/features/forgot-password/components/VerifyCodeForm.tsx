import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema, type TVerifyRequest } from "../types/forgot-password.types";
import { useVerifyCodeMutation } from "../api/forgot-password.api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerifyCodeFormProps {
  email: string;
  onSuccess: (code: string) => void;
}

export function VerifyCodeForm({ email, onSuccess }: VerifyCodeFormProps) {
  const mutation = useVerifyCodeMutation();

  const form = useForm<TVerifyRequest>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data: TVerifyRequest) => {
    mutation.mutate(data, {
      onSuccess: () => {
        onSuccess(data.code);
      },
    });
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Recover Password
        </h2>
        <p className="text-sm text-muted-foreground">
          Please provide the verification code sent to <strong>{email}</strong> to reset your password.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex justify-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="gap-2 sm:gap-4">
                      {/* Using 6 individual slots mapping to the screenshot */}
                      <InputOTPSlot index={0} className="!rounded-full w-12 h-12 !border border-input" />
                      <InputOTPSlot index={1} className="!rounded-full w-12 h-12 !border border-input" />
                      <InputOTPSlot index={2} className="!rounded-full w-12 h-12 !border border-input" />
                      <InputOTPSlot index={3} className="!rounded-full w-12 h-12 !border border-input" />
                      <InputOTPSlot index={4} className="!rounded-full w-12 h-12 !border border-input" />
                      <InputOTPSlot index={5} className="!rounded-full w-12 h-12 !border border-input" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-center w-full block mt-2" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full text-primary-foreground text-md font-semibold py-6"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
