import WheelProvider from "./wheelContext";
import WheelSetup from "./WheelSetup";
import WheelCanvas from "./WheelCanvas";

const Wheel = () => {
  return (
    <WheelProvider>
      <article className="px-8">
        <div className="border-4 border-t-0 border-green-950 py-5">
          <h2 className="mx-auto w-fit bg-white px-3 py-2 text-center text-xl font-extrabold text-red-800 uppercase md:text-4xl">
            Wheel of fortune
          </h2>
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
