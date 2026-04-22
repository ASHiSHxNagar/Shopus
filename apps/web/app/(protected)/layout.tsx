export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-6">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-4 text-sm">
          <a href="/dashboard" className="hover:text-blue-400">
            Overview
          </a>
          <a href="/dashboard/products" className="hover:text-blue-400">
            Products
          </a>
          <a href="/dashboard/orders" className="hover:text-blue-400">
            Orders
          </a>
          <a href="/dashboard/profile" className="hover:text-blue-400">
            Profile
          </a>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}