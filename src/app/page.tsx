import Introduction from "./ui/page/Introduction";
import RecentProject from "./ui/page/RecentProject";

const Home = () => {
  return (
    <main className="grow bg-neutral-950 text-stone-200">
      <div className="relative flex h-full flex-col gap-10 py-3 lg:flex-row-reverse lg:gap-4 lg:px-5">
        <Introduction />
        <RecentProject />
      </div>
    </main>
  );
};

export default Home;
