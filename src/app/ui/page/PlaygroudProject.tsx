import SectionContainer from "./SectionContainer";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePageTransition } from "@/app/shared/transition/transitionContext";

const ProjectShowcase = () => {
  const { setShow } = usePageTransition();

  return (
    <SectionContainer
      title="Personal Project"
      subTitle="For enhance technical skill"
      additionalStyle="lg:w-[450px]"
    >
      <div className="relative mx-auto mt-4 w-fit">
        <Link
          onClick={(event) => {
            event.preventDefault();
            console.log("dffdf");
            setShow(true);
          }}
          href={"/playground"}
        >
          <h2 className="bgGradient animate-gradient-text bg-gradient-to-tl from-green-700 to-violet-950 bg-clip-text text-6xl font-bold text-transparent uppercase hover:from-red-500 hover:to-yellow-500">
            Playground
          </h2>
        </Link>
        {/* <ArrowDown className="animate-bounce-down absolute -top-12 left-1/2 h-10 w-10 -translate-x-1/2 text-green-700" /> */}
        {/* <ArrowUp className="animate-bounce-up absolute -bottom-12 left-1/2 h-10 w-10 -translate-x-1/2 text-red-700" /> */}
        <ArrowLeft className="animate-bounce-left absolute top-1/2 -right-12 h-10 w-10 -translate-y-1/2 text-blue-700" />
        <ArrowRight className="animate-bounce-right absolute top-1/2 -left-12 h-10 w-10 -translate-y-1/2 text-yellow-700" />
      </div>
      <p>Click to join the playground</p>
    </SectionContainer>
  );
};

export default ProjectShowcase;
