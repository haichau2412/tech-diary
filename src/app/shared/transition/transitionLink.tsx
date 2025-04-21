import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { usePageTransition } from "./transitionContext";

interface TransitionLinkProps extends React.ComponentProps<"a">, LinkProps {
  children: React.ReactNode;
  pageName?: string;
  href: string;
}

export const TransitionLink = ({
  children,
  href,
  pageName = "",
  ...props
}: TransitionLinkProps) => {
  const { setShow, setMouseLocation, setPageName } = usePageTransition();
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setPageName(pageName);
    setMouseLocation({ mouseX: clientX, mouseY: clientY });
    setShow(true);

    await new Promise((r) => setTimeout(r, 1000));
    router.push(href);
  };
  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};
