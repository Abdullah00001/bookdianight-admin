import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CommissionSetupForm } from "@/features/settings/components/CommissionSetupForm";
import { EditProfileForm } from "@/features/settings/components/EditProfileForm";
import { ChangePasswordForm } from "@/features/settings/components/ChangePasswordForm";
import { SettingsEditorForm } from "@/features/settings/components/SettingsEditorForm";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("commission");

  return (
    <div className="max-w-[1400px] mx-auto pt-2">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-border overflow-x-auto mb-10 pb-0">
          <TabsList className="bg-transparent h-auto p-0 flex gap-8 justify-start min-w-max">
            {[
              { id: "commission", label: t("settings.commissionSetup") },
              { id: "profile", label: t("settings.editProfile") },
              { id: "password", label: t("settings.changePassword") },
              { id: "about", label: t("settings.aboutUs") },
              { id: "privacy", label: t("settings.privacyPolicy") },
              { id: "terms", label: t("settings.termsAndConditions") },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:text-foreground rounded-none border-b-2 border-transparent px-0 pb-4 pt-2 text-[15px] font-medium text-muted-foreground hover:text-foreground transition-all whitespace-nowrap"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="w-full">
          <TabsContent value="commission" className="mt-0 outline-none">
            <CommissionSetupForm />
          </TabsContent>
          <TabsContent value="profile" className="mt-0 outline-none">
            <EditProfileForm />
          </TabsContent>
          <TabsContent value="password" className="mt-0 outline-none">
            <ChangePasswordForm />
          </TabsContent>
          <TabsContent value="about" className="mt-0 outline-none animate-in fade-in duration-500">
            <SettingsEditorForm 
              title={t("settings.aboutUs")}
              subtitle={t("settings.settingsSubtitle")}
              type="about"
            />
          </TabsContent>
          <TabsContent value="privacy" className="mt-0 outline-none animate-in fade-in duration-500">
            <SettingsEditorForm 
              title={t("settings.privacyPolicy")}
              subtitle={t("settings.settingsSubtitle")}
              type="privacy"
            />
          </TabsContent>
          <TabsContent value="terms" className="mt-0 outline-none animate-in fade-in duration-500">
            <SettingsEditorForm 
              title={t("settings.termsAndConditions")}
              subtitle={t("settings.settingsSubtitle")}
              type="terms"
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
