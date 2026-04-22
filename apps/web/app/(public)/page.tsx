import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* Hero */}
      <h1 className="text-4xl md:text-6xl font-bold text-center max-w-3xl leading-tight">
        Build Your Wholesale Business
        <span className="text-blue-500"> Faster</span>
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-zinc-400 text-center max-w-xl">
        Manage products, orders, and customers in one powerful SaaS platform.
        Designed for modern wholesale businesses.
      </p>

      {/* CTA */}
      <div className="mt-10 flex gap-4">

        <Link
          href="/auth/register"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
        >
          Get Started
        </Link>

        <Link
          href="/auth/login"
          className="px-6 py-3 border border-zinc-700 hover:border-blue-500 rounded-md"
        >
          Login
        </Link>

      </div>

    </div>
  );
}