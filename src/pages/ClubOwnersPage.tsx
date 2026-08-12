import { ClubOwnersTable } from "@/features/accounts/components/ClubOwnersTable";

export default function ClubOwnersPage() {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-heading mb-2">Club Owner Overview</h1>
        <p className="text-muted-foreground">
          View and manage all user accounts, track active users, and monitor business registrations for a seamless platform experience.
        </p>
      </div>

      <ClubOwnersTable />
    </div>
  );
}
