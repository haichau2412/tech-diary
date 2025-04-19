import WheelProvider from "./wheelContext";
import WheelSetup from "./WheelSetup";
import WheelCanvas from "./WheelCanvas";

const Wheel = () => {
  return (
    <WheelProvider>
      <article className="px-8">
        <div className="border-4 border-t-0 border-green-950 py-5">
          <h2 className="mx-auto w-fit bg-white px-3 py-2 text-center text-4xl font-extrabold text-red-800 uppercase">
            Wheel of fortune
          </h2>
          <div className="flex items-center px-10">
            <WheelCanvas />
            <WheelSetup />
          </div>
        </div>
      </article>
    </WheelProvider>
  );
};

export default Wheel;
