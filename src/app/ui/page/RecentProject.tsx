import SectionContainer from "./SectionContainer";

const List = ({ data }: { data: string[] }) => {
  return (
    <ul className="list-disc pl-4">
      {data.map((text, i) => {
        return <li key={i}>{text}</li>;
      })}
    </ul>
  );
};

const ANNE_TASK = [
  "Worked closely with teams to implement new features.",
  "Component Development: Contributed to the project&apos;s internal UI library, such as canvas chart, drag-and-drop, custom widget and reducer store.",
  "Reviewed teammate&apos;s code to prevent potential side effects and maintain code quality.",
  "Assisted colleagues with their issues before they escalated them to the client.",
  "Managed codebase with Git and Jira.",
];

const ANNE_ACHIVEMENT = [
  "Implement UI & business logic for controlling: Monitors, Headset.",
  "Migrated UI codebase to fit new API of new architecture.",
  "Developed and maintained background pages (written in pure TypeScript) for the device detection flow and installation process.",
  "Collaborated with the backend team to implement the app rating feature.",
  "Built data migration feature (UI & logic) to transfer data from old app schema to new system, including developing/integrating converter libraries.",
];

const Anne = () => {
  return (
    <details open className="group [--text-color:#44d62c]">
      <summary className="cursor-pointer list-none">
        <div className="w-full rounded-md bg-neutral-900 p-3 group-open:rounded-b-none hover:bg-neutral-800">
          <p className="text-[var(--text-color)] uppercase">
            ANNE - Razer Synapse 4
          </p>
          <p>A web application for controlling gaming peripherals</p>
          <a
            target="_blank"
            href={"https://www.razer.com/synapse-4"}
            className="hover:underline"
          >
            To Razer Synapse 4
          </a>
        </div>
      </summary>
      <ul className="w-full rounded-b-md bg-stone-100 p-2 text-start text-neutral-900">
        <li className="ml-2">
          <span className="font-bold">Responsibilities:</span>
          <List data={ANNE_TASK} />
        </li>

        <li className="ml-2">
          <span className="font-bold">Achievements: </span>
          Play a important role for some featues of the released product:{" "}
          <List data={ANNE_ACHIVEMENT} />
        </li>
      </ul>
    </details>
  );
};

const ALISHA_TASK = [
  "Fixed issues based on user feedback.",
  "Updated codebase to accommodate API changes from streaming platforms (Twitch, Streamlabs).",
  "Implemented UI and business code for 4 new devices, including update UI for lighting effect previews on Canvas and ensuring UI data compatibility with the backend API.",
];

const Alisha = () => {
  return (
    <details open className="group [--text-color:#44d62c]">
      <summary className="cursor-pointer list-none">
        <div className="w-full rounded-md bg-neutral-900 p-3 group-open:rounded-b-none hover:bg-neutral-800">
          <p className="text-[var(--text-color)] uppercase">
            Alisha - Streamer companion app
          </p>
          <p>A web application for controlling gaming peripherals</p>
          <a
            target="_blank"
            href={"https://www.razer.com/streamer-companion-app"}
            className="hover:underline"
          >
            Streamer Companion App
          </a>
        </div>
      </summary>
      <ul className="w-full rounded-b-md bg-stone-100 p-2 text-start text-neutral-900">
        <li className="ml-2">
          <span className="font-bold">Responsibilities:</span>

          <List data={ALISHA_TASK} />
        </li>
      </ul>
    </details>
  );
};
const RecentProject = () => {
  return (
    <SectionContainer
      title="My recent work"
      subTitle="These are projects that I worked for S3 corp"
      additionalStyle="grow"
    >
      <Anne />
      <Alisha />
    </SectionContainer>
  );
};

export default RecentProject;
