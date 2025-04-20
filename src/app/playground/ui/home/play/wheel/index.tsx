import WheelProvider from "./wheelContext";
import WheelSetup from "./WheelSetup";
import WheelCanvas from "./WheelCanvas";
import RotateH2 from "../../shared/RotateH2";

const Wheel = () => {
  return (
    <WheelProvider>
      <article className="px-8">
        <div className="border-4 border-t-0 border-green-950 py-5">
          <RotateH2
            text="Wheel of fortune"
            scrollerClass=".playgroundContainer"
            additionalStyle="m-2 mx-auto"
          />

          <div className="flex flex-col items-center px-10 md:flex-row">
            <WheelCanvas />
            <WheelSetup />
          </div>
        </div>
      </article>
    </WheelProvider>
  );
};

export default Wheel;
