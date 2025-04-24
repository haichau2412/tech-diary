import Link from "next/link";

const NotFound = () => {
  return (
    <main className="fixed flex h-full w-full items-center justify-center">
      <article>
        <Link href="/" className="text-7xl underline">
          404
        </Link>
      </article>
    </main>
  );
};

export default NotFound;
