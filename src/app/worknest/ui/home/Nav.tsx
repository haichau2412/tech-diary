import Link from "next/link";

type NavItemProps = {
  href: string;
  label: string;
  description: string;
  passHref?: boolean;
};

const NAV_ITEMS: NavItemProps[] = [
  {
    href: "/worknest/utube-note",
    label: "Utube Note",
    description: "A note-taking app for YouTube videos.",
  },
  {
    href: "/blog",
    passHref: true,
    label: "Blog & Note",
    description: "A blog and note",
  },
  {
    href: "",
    passHref: true,
    label: "Dummy 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const NavItem = ({ href, label, description, passHref }: NavItemProps) => {
  return (
    <article className="flex flex-col items-center">
      <Link
        passHref={passHref}
        href={href}
        className="text-lg font-semibold text-gray-900"
      >
        <div className="aspect-[3/2] h-[100px] bg-red-800"></div>
      </Link>
      <h2 className="text-lg font-bold uppercase">{label}</h2>
      <p>{description}</p>
    </article>
  );
};

const WorknestNav = () => {
  return (
    <nav className="mx-auto grid grid-cols-1 gap-4 p-10 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
      {NAV_ITEMS.map((item) => {
        return <NavItem key={item.label} {...item} />;
      })}
    </nav>
  );
};

export default WorknestNav;
