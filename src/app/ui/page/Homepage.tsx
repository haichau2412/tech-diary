import Introduction from "./Introduction";
import RecentProject from "./RecentProject";

const Homepage = () => {
  return (
    <main className="grow bg-neutral-950">
      <div className="relative flex h-full flex-col gap-10 p-3 px-5 lg:flex-row-reverse lg:gap-4">
        <Introduction />
        <RecentProject />
      </div>
    </main>
  );
};

export default Homepage;
