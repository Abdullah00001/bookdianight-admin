import { useState } from "react";
import { RequestCodeForm } from "./RequestCodeForm";
import { VerifyCodeForm } from "./VerifyCodeForm";
import { ResetPasswordForm } from "./ResetPasswordForm";

type TStep = "request" | "verify" | "reset";

export function ForgotPasswordFlow() {
  const [step, setStep] = useState<TStep>("request");
  const [email, setEmail] = useState("");

  const handleRequestSuccess = (requestedEmail: string) => {
    setEmail(requestedEmail);
    setStep("verify");
  };

  const handleVerifySuccess = () => {
    setStep("reset");
  };

  return (
    <>
      {step === "request" && (
        <RequestCodeForm onSuccess={handleRequestSuccess} />
      )}
      {step === "verify" && (
        <VerifyCodeForm email={email} onSuccess={handleVerifySuccess} />
      )}
      {step === "reset" && (
        <ResetPasswordForm />
      )}
    </>
  );
}
