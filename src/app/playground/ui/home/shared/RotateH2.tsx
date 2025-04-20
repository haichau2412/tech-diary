import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";
import { ClassValue } from "clsx";

interface RotateH2Props
  extends Omit<React.ComponentPropsWithoutRef<"h2">, "className"> {
  additionalStyle?: ClassValue;
  text: string;
  scrollerClass: string;
}

const RotateH2 = ({
  text,
  additionalStyle,
  scrollerClass,
  ...props
}: RotateH2Props) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        {
          scale: 0.9,
          opacity: 0,
          rotate: "-10deg",
        },
        {
          scale: 1,
          opacity: 1,
          rotate: "-2deg",
          duration: 0.5,
          scrollTrigger: {
            scroller: scrollerClass,
            trigger: ref.current,
            start: "top 90%",
            end: "top 80%",
            once: true,
          },
        },
      );
    },
    {
      dependencies: [text],
    },
  );

  return (
    <h2
      ref={ref}
      className={twMerge(
        `mx-auto w-fit bg-red-800 px-3 py-2 text-center text-xl font-extrabold text-white uppercase md:text-4xl ${additionalStyle || ""}`,
      )}
      {...props}
    >
      {text}
    </h2>
  );
};

export default RotateH2;
