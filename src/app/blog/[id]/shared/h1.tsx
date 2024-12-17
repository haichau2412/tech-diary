import { Rye } from "next/font/google";

const rye = Rye({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const H1 = ({ children }: { children: string }) => {
  return (
    <h1
      className={`${rye.className} customBorder mb-4 text-center text-2xl font-bold uppercase text-blue-950 sm:text-4xl`}
    >
      {children}
    </h1>
  );
};

export default H1;
