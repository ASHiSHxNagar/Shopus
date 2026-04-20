"use client";

import { trpc } from "../lib/trpc";

export default function Page() {

  const usersQuery = trpc.user.getAll.useQuery();
const sessionQuery = trpc.user.getMe.useQuery();

if (usersQuery.isLoading || sessionQuery.isLoading) {
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
  </>
);
}