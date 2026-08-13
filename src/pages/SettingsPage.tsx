import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CommissionSetupForm } from "@/features/settings/components/CommissionSetupForm";
import { EditProfileForm } from "@/features/settings/components/EditProfileForm";
import { ChangePasswordForm } from "@/features/settings/components/ChangePasswordForm";
import { SettingsEditorForm } from "@/features/settings/components/SettingsEditorForm";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("commission");

  return (
    <div className="max-w-[1400px] mx-auto pt-2">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-border overflow-x-auto mb-10 pb-0">
          <TabsList className="bg-transparent h-auto p-0 flex gap-8 justify-start min-w-max">
            {[
              { id: "commission", label: "Commission Setup" },
              { id: "profile", label: "Edit Profile" },
              { id: "password", label: "Change Password" },
              { id: "about", label: "About Us" },
              { id: "privacy", label: "Privacy Policy" },
              { id: "terms", label: "Terms & Conditions" },
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
              title="About Us"
              subtitle="View and update your personal information, change passwords for a personalized experience"
              initialValue="<p>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant.</p><p>Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar.</p>"
            />
          </TabsContent>
          <TabsContent value="privacy" className="mt-0 outline-none animate-in fade-in duration-500">
            <SettingsEditorForm 
              title="Privacy Policy"
              subtitle="View and update your personal information, change passwords for a personalized experience"
              initialValue="<p>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant.</p><p>Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar.</p>"
            />
          </TabsContent>
          <TabsContent value="terms" className="mt-0 outline-none animate-in fade-in duration-500">
            <SettingsEditorForm 
              title="Terms & Conditions"
              subtitle="View and update your personal information, change passwords for a personalized experience"
              initialValue="<p>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant.</p><p>Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar.</p>"
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
