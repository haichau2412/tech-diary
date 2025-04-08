import Info from "./Info";
import SectionContainer from "./SectionContainer";
const TechTag = ({ text }: { text: string }) => {
  return (
    <span className="mx-1 inline-block cursor-default rounded-sm bg-amber-50 px-0.5 text-center text-xs text-gray-900 md:px-1 md:py-0.5 lg:text-sm">
      {text}
    </span>
  );
};

const TECH = [
  {
    title: "Frontend",
    tag: [
      "ReactJS",
      "NextJS",
      "Vanilla JS",
      "Typescript",
      "Tailwind CSS",
      "Tanstack-query",
      "Jest",
    ],
  },
  {
    title: "Backend",
    tag: ["Express"],
  },
  {
    title: "Related topics",
    tag: [
      "Service worker",
      "RESTful API",
      "WCAG",
      "Optimization",
      "Testing",
      "Web worker",
      "Git",
    ],
  },
  {
    title: "Learning plan",
    tag: ["Effect-TS", "AWS", "GraphQL", "Material-UI"],
  },
];

const Introduction = () => {
  return (
    <SectionContainer
      title="About me"
      subTitle="Employment identification card"
      additionalStyle="lg:w-[450px]"
    >
      <div>
        <Info />
        <div
          className={`customScrollBarGreen h-[400px] overflow-y-scroll bg-neutral-900`}
        >
          <div className="p-3 px-5 text-center">
            <div className="text-stone-100">
              <h2 className="text-6xl font-bold uppercase">My skills</h2>
              <ul className="mt-3 flex flex-col items-start text-start">
                {TECH.map(({ title, tag }) => (
                  <li className="mt-2 first:mt-0" key={title}>
                    <p>
                      {title}:{" "}
                      {tag.map((t, i) => (
                        <TechTag key={i} text={t} />
                      ))}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="playgroundText top-[50px] mt-[50px] [animation-range:0px_400px]">
              Here at ChauTechDiary, I am building a playground for myself to
              test out new features and ideas. These projects are not meant to
              be perfect, but they are meant to be a learning experience. I hope
              you enjoy your stay here.
            </p>

            <div className="h-[500px]"></div>
            <p className="playgroundText top-[200px] [animation-range:200px_500px]">
              If you are interested in the code, and want me to become a coding
              partner, you can contact me{" "}
              <a
                target="_blank"
                rel="noopener"
                href="https://www.linkedin.com/in/chau-luu-0a3378179/"
                className="lack cursor-pointer text-white underline"
              >
                Linkedin
              </a>
              .
            </p>
            <div className="h-[500px]"></div>
            <p className="playgroundText top-[300px] [animation-range:800px_1000px]">
              Now, let&apos;s see what &quot;Games&quot; we have here.
            </p>

            <div className="h-[400px]"></div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Introduction;
