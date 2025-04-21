import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ComicZone = () => {
  const sectionRef = useRef<HTMLElement>(null);
  //   const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const targets = gsap.utils.toArray(".panel");

    if (sectionRef.current) {
      gsap.to(targets, {
        xPercent: -100 * (targets.length - 1),
        ease: "none",
        duration: 6,
        scrollTrigger: {
          scroller: ".playgroundContainer",
          trigger: sectionRef.current,
          start: "top 50%",
          scrub: true,
          //   markers: true,
          end: `+=${sectionRef.current.offsetWidth / 2}`,
        },
      });
    }
  });

  return (
    <article ref={sectionRef} className="px-8">
      <div className="flex h-[50px] overflow-hidden border-4 border-t-0 border-green-950 text-center text-white">
        <div className="panel min-w-[1000px] bg-red-800 py-5"></div>
        <div className="panel min-w-[1000px] bg-blue-800 py-5"></div>
        <div className="panel min-w-[1000px] bg-orange-800 py-5"></div>
        <div className="panel min-w-[1000px] bg-green-800 py-5"></div>
        <div className="panel min-w-[1000px] bg-violet-800 py-5"></div>
      </div>
    </article>
  );
};

export default ComicZone;
