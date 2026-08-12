import { LoginForm } from "./LoginForm";
import bgImage from "@/assets/auth-pages-image.png";
import logoImage from "@/assets/auth-pages-logo.png";

export function LoginLayout() {
  return (
    <div className="flex min-h-screen min-w-full bg-background overflow-hidden">
      {/* Left side: Background Image */}
      <div className="hidden lg:block lg:w-[800px] lg:shrink-0 relative p-4 lg:p-6">
        <div className="w-full h-full relative rounded-[2rem] overflow-hidden shadow-lg">
          <img
            src={bgImage}
            alt="BookDianight Night Scene"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full flex-1 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-[545px] mx-auto">
          <div className="bg-card shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)] rounded-[20px] p-[40px] flex flex-col gap-[56px]">
            {/* Logo */}
            <div className="flex justify-center">
              <img
                src={logoImage}
                alt="BookDianight Logo"
                className="h-28 w-auto object-contain"
              />
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
