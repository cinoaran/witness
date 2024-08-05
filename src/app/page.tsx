import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <section>
      <h2>Home Page</h2>
    </section>
  );
}
