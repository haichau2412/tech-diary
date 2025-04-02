import Image from "next/image";
import criminalPic from "@/assets/human.png";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Chau Hai Luu",
    jobTitle: "Frontend Developer",
    address: "Ho Chi Minh City, Vietnam",
    description: "Chau's portfolio",
  },
};

const Home2 = () => {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-tr from-violet-950 to-green-900 px-5 sm:mx-5 sm:mb-5 sm:pl-[50px] sm:text-lg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col items-baseline justify-between gap-10 pt-[50px] sm:flex-row">
        <div className="text-stone-300 sm:w-1/3">
          <p>
            I am a frontend developer, who loves to create useful and creative
            websites, on my journey to become a fullstack developer. In my
            perspective, a website should be esthetical to the eyes while
            serving its greatest purpose: cater to the users&apos; needs.
          </p>
          <p>A team player, a friend in disguise.</p>
        </div>

        <div className="text-stone-100 sm:mr-[100px]">
          <h2 className="sm:text-2xl">My tech stacks</h2>
          <ul>
            <li>
              Frontend: React (to v.18), Redux, Next.js, Tailwind CSS, SASS
            </li>
            <li>Backend: Express, Restful</li>
            <li>Common: Vanilla JS, Jest</li>
            <li>Others: Git, CI/CD</li>
            <li>Upper-intermediate English level in Speaking/Writing</li>
            <li>Upcomming techs: GraphQL, AWS, React v19</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="relative mt-[60px] text-9xl leading-none font-bold text-white uppercase sm:mt-[50px] sm:leading-tight sm:tracking-wide">
          Chau Hai Luu
          <div className="absolute -top-[40px] left-[150px] sm:-top-[50px]">
            <div className="relative aspect-[370/470] w-[80px] shadow-lg shadow-blue-500">
              <Image
                priority={false}
                className="bg-slate-400"
                src={criminalPic}
                fill={true}
                alt="Developer's potrait"
              />
            </div>
          </div>
        </h2>
      </div>
    </div>
  );
};

export default Home2;
