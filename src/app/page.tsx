import { Rye } from "next/font/google";

const rye = Rye({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const Home = () => {
  return (
    <div
      className={`flex h-full flex-col items-center justify-center bg-green-900`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 20"
        className={`${rye.className} h-[100px] w-full translate-y-[20px]`}
      >
        <path
          id="curve"
          d="M 0 20 Q 60 -10 120 20"
          fill="none"
          stroke="none"
          strokeMiterlimit="10"
        />
        <text textAnchor="middle">
          <textPath
            href="#curve"
            startOffset="50%"
            letterSpacing=".05em"
            className="fill-slate-50 text-[7px] sm:text-[6px]"
          >
            The journey to this page
          </textPath>
        </text>
      </svg>
      <div className="max-w-[600px] px-2 text-left text-white sm:mt-8 sm:text-xl">
        <p>I am Chau, a frontend dev with 4 years of experience.</p>
        <p>I made the toughest decision: to quit my job at my first company.</p>
        <p>I felt the need to find a new environment to advance my career.</p>
        <p>
          When I applied for jobs, I got rejected a lot during CV screening.
        </p>
        <p>
          Even though I used to work dedicatedly on my last project,which is now
          used by a large number of people.
        </p>
        <p>I know my work ethic, I know I can get things done.</p>
        <p>But how can I make people trust ME ?</p>
        <p>
          They can&apos;t blindlessly trust me. They need to see{" "}
          <a className="underline" href="http://chautechdiary.tech/">
            PROOF
          </a>
          .
        </p>
        <p>And that is how I created this project !</p>
        <p className="mt-2 text-center">Nov 27, 2024.</p>
      </div>
    </div>
  );
};

export default Home;
