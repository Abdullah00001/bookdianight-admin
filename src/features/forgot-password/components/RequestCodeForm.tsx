import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestSchema, type TRequestRequest } from "../types/forgot-password.types";
import { useRequestCodeMutation } from "../api/forgot-password.api";

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

interface RequestCodeFormProps {
  onSuccess: (email: string) => void;
}

export function RequestCodeForm({ onSuccess }: RequestCodeFormProps) {
  const mutation = useRequestCodeMutation();

  const form = useForm<TRequestRequest>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: TRequestRequest) => {
    mutation.mutate(data, {
      onSuccess: () => {
        onSuccess(data.email);
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
          Please provide the email address associated with your account, and we'll send you a verification code to reset your password.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" type="email" {...field} />
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
            {mutation.isPending ? "Sending..." : "Send Code"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
