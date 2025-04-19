"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

interface WinnerToasterProps extends React.ComponentPropsWithRef<"p"> {
  message: string;
  visible?: boolean;
}

const WinnerToaster: React.FC<WinnerToasterProps> = ({
  message,
  visible = true,
  ...props
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (message && ref.current) {
        gsap.fromTo(
          ref.current,
          { x: -5 },
          {
            x: 5,
            duration: 0.1,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 5,
          },
        );
      }
    },
    { dependencies: [message] },
  );

  if (!visible || !message) return null;

  return (
    <p
      ref={ref}
      className="mt-2 h-[20px] w-fit rounded px-2 py-1 text-lg font-medium text-red-600 uppercase"
      {...props}
    >
      {`The chosen one: ${message}`}
    </p>
  );
};

export default WinnerToaster;
