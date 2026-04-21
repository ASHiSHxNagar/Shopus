"use client";

import { useSession } from "next-auth/react";
import { trpc } from "../../lib/trpc";

export default function Page() {
  const { data: session, status } = useSession();
  const usersQuery = trpc.user.getAll.useQuery();
  const sessionQuery = trpc.user.getMe.useQuery();

  if (usersQuery.isLoading || sessionQuery.isLoading || status === "loading") {
    return <p>Loading...</p>;
  }

  if (usersQuery.error) {
    return <p>Error: {usersQuery.error.message}</p>;
  }

  if (sessionQuery.error) {
    return <p>Error: {sessionQuery.error.message}</p>;
  }

  return (
    <>
      <pre>{JSON.stringify(usersQuery.data, null, 2)}</pre>
      <pre>{JSON.stringify(sessionQuery.data, null, 2)}</pre>
      <div>
        <h1>session logged here </h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </>
  );
}