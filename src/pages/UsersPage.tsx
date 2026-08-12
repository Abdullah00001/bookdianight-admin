import { UsersTable } from "@/features/accounts/components/UsersTable";

export default function UsersPage() {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-heading mb-2">Users Overview</h1>
        <p className="text-muted-foreground">
          View and manage all user accounts, track active users, and monitor business registrations for a seamless platform experience.
        </p>
      </div>

      <UsersTable />
    </div>
  );
}
