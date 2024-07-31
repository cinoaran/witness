import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <section>
      <h2>Home Page</h2>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.id}</p>
    </section>
  );
}
