import { getAuthSession } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardPage() {
  const session = await getAuthSession();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
        <p className="text-zinc-400">Logged in user:</p>
        <pre className="mt-3 text-sm">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <LogoutButton />
    </div>
  );
}