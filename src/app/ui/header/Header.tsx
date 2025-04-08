// import Link from "next/link";
import SocialLink from "./Social";
import Link from "next/link";
import OwnerStatus from "./OwnerStatus";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-gray-50 px-[10px] py-1 font-bold">
      <SocialLink />
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 transform">
        <h1 className="text-green-700 uppercase lg:text-3xl">
          Chau Tech Diary
        </h1>
      </Link>
      <OwnerStatus />
    </header>
  );
};

export default Header;
