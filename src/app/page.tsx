import Introduction from "./ui/page/Introduction";
import RecentProject from "./ui/page/RecentProject";
import HomeFooter from "./ui/footer";

const Home = () => {
  return (
    <div className="customScrollBar green flex grow flex-col overflow-x-hidden overflow-y-auto">
      <main className="flex grow flex-col bg-neutral-950 px-5 py-10 text-stone-200">
        <div className="relative flex h-full flex-col gap-10 lg:flex-row-reverse lg:gap-4 lg:px-5">
          <Introduction />
          <RecentProject />
        </div>
      </main>
      <HomeFooter />
    </div>
  );
};

export default Home;
