"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

interface WarningTextProps extends React.ComponentPropsWithRef<"p"> {
  message: string;
  visible?: boolean;
}

const WarningText: React.FC<WarningTextProps> = ({
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
      className="my-4 inline-block h-[30px] w-fit rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-600"
      {...props}
    >
      {message}
    </p>
  );
};

export default WarningText;
