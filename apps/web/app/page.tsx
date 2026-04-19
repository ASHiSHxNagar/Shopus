"use client";

import { trpc } from "../lib/trpc";

export default function Page() {
  const { data, isLoading, error } = trpc.user.getAll.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}