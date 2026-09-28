import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, Trash2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  updateAdminProfileSchema,
  useUpdateProfileMutation,
} from "@/apis/auth.api";
import type { TUpdateAdminProfileRequest } from "@/apis/auth.api";
import { uploadMedia, deleteMedia } from "@/apis/media.api";
import { useAuthStore } from "@/stores/auth.store";
import { useModalStore } from "@/stores/modal.store";

export function EditProfileForm() {
  const { adminData, setAuth, csrfToken } = useAuthStore();
  const showModal = useModalStore((state) => state.showModal);
  const updateProfileMutation = useUpdateProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarUrl, setAvatarUrl] = useState<string>(
    adminData?.profile?.profileAvatar || ""
  );
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<TUpdateAdminProfileRequest>({
    resolver: zodResolver(updateAdminProfileSchema),
    defaultValues: {
      name: adminData?.name || "",
      phoneNumber: adminData?.phoneNumber || "",
      profileAvatar: adminData?.profile?.profileAvatar || null,
    },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadMedia(file);
      setAvatarUrl(url);
      form.setValue("profileAvatar", url, { shouldDirty: true });
    } catch (error) {
      showModal("Error", "Failed to upload image. Please try again.", "error");
    } finally {
      setIsUploading(false);
      // Reset input value so same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setIsUploading(true);
      if (avatarUrl && avatarUrl.startsWith("http")) {
        await deleteMedia(avatarUrl).catch(() => {
          // Ignore delete errors, just remove from UI
        });
      }
      setAvatarUrl("");
      form.setValue("profileAvatar", null, { shouldDirty: true });
    } catch (error) {
      showModal("Error", "Failed to remove image.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data: TUpdateAdminProfileRequest) => {
    updateProfileMutation.mutate(data, {
      onSuccess: (res) => {
        // Update Zustand store so the Header updates immediately
        if (csrfToken && res.data) {
          setAuth(res.data, csrfToken);
        }
        showModal("Success", res.message || "Profile updated successfully.", "success");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          "An error occurred while updating profile.";
        showModal("Error", errorMessage, "error");
      },
    });
  };

  const nameFallback = (adminData?.name || "Admin").substring(0, 2).toUpperCase();
  const rawRole = adminData?.accountRole || "Admin";
  const roleDisplay = rawRole.charAt(0).toUpperCase() + rawRole.slice(1).toLowerCase();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Edit Profile</h2>
        <p className="text-muted-foreground text-[15px] max-w-lg">
          Update your personal details, profile picture, and account settings to keep your information accurate and up-to-date.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative group">
          <Avatar className="h-16 w-16 border border-border">
            {avatarUrl && <AvatarImage src={avatarUrl} className="object-cover" />}
            <AvatarFallback>{nameFallback}</AvatarFallback>
          </Avatar>
          
          <button 
            type="button"
            onClick={avatarUrl ? handleDeleteAvatar : handleAvatarClick}
            disabled={isUploading}
            className={`absolute bottom-0 right-0 h-7 w-7 rounded-full flex items-center justify-center border-[2px] border-white cursor-pointer transition-colors shadow-sm disabled:opacity-50 ${
              avatarUrl 
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "bg-foreground text-background hover:bg-muted-foreground"
            }`}
          >
            {isUploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : avatarUrl ? (
              <Trash2 className="h-3.5 w-3.5" />
            ) : (
              <Camera className="h-3.5 w-3.5" />
            )}
          </button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*"
            className="hidden" 
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            {adminData?.name?.split(" ")[0] || "Admin"}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">{roleDisplay}</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="h-12 bg-transparent border-border rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    className="h-12 bg-transparent border-border rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2" title="Email address cannot be changed.">
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <Input 
              type="email"
              value={adminData?.email || ""}
              readOnly
              className="h-12 bg-transparent border-border rounded-xl opacity-70 cursor-not-allowed focus-visible:ring-0"
            />
            <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
          </div>

          <Button
            type="submit"
            disabled={updateProfileMutation.isPending || isUploading}
            className="w-full h-12 bg-[#E5B869] hover:bg-[#D4A353] text-white font-medium rounded-xl text-base"
          >
            {updateProfileMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
