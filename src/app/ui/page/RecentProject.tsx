import Link from "next/link";
import SectionContainer from "./SectionContainer";
const Anne = () => {
  return (
    <details open className="group [--text-color:#44d62c]">
      <summary className="cursor-pointer list-none">
        <div className="w-full rounded-md bg-neutral-900 p-3 group-open:rounded-b-none hover:bg-neutral-800">
          <p className="text-[var(--text-color)] uppercase">
            ANNE - Razer Synapse 4
          </p>
          <p>A web application for controlling gaming peripherals</p>
          <Link
            href={"https://www.razer.com/synapse-4"}
            className="hover:underline"
          >
            To Razer Synapse 4
          </Link>
        </div>
      </summary>
      <ol className="w-full rounded-b-md bg-stone-100 p-2 text-start text-neutral-900">
        <li>
          Responsibilities:
          <ul>
            <li>Worked closely with teams to implement new features.</li>
            <li>
              Component Development: Contributed to the project&apos;s internal
              UI library, such as canvas chart, drag-and-drop, custom widget and
              reducer store.
            </li>
            <li>
              Reviewed teammate&apos;s code to prevent potential side effects
              and maintain code quality.
            </li>
            <li>
              Assisted colleagues with their issues before they escalated them
              to the client.
            </li>
            <li>Managed codebase with Git and Jira.</li>
          </ul>
        </li>

        <li>
          Achievements:{" "}
          <ul>
            <li>
              Play a important role for some featues of the released product:{" "}
            </li>
            <ul>
              <li>
                Implement UI & business logic for controlling: Monitors, Headset
              </li>
              <li>Migrated UI codebase to fit new API of new architecture.</li>
              <li>
                Developed and maintained background pages (written in pure
                TypeScript) for the device detection flow and installation
                process.
              </li>
              <li>
                Collaborated with the backend team to implement the app rating
                feature.
              </li>
              <li>
                Built data migration feature (UI & logic) to transfer data from
                old app schema to new system, including developing/integrating
                converter libraries.
              </li>
            </ul>
          </ul>
        </li>
      </ol>
    </details>
  );
};

const Alisha = () => {
  return (
    <details open className="group [--text-color:#44d62c]">
      <summary className="cursor-pointer list-none">
        <div className="w-full rounded-md bg-neutral-900 p-3 group-open:rounded-b-none hover:bg-neutral-800">
          <p className="text-[var(--text-color)] uppercase">
            Alisha - Streamer companion app
          </p>
          <p>A web application for controlling gaming peripherals</p>
          <Link
            href={"https://www.razer.com/streamer-companion-app"}
            className="hover:underline"
          >
            Streamer Companion App
          </Link>
        </div>
      </summary>
      <ol className="w-full rounded-b-md bg-stone-100 p-2 text-start text-neutral-900">
        <li>
          Responsibilities:
          <ul>
            <li>Fixed issues based on user feedback. </li>
            <li>
              Updated codebase to accommodate API changes from streaming
              platforms (Twitch, Streamlabs).
            </li>
            <li>
              Implemented UI and business code for 4 new devices, including
              update UI for lighting effect previews on Canvas and ensuring UI
              data compatibility with the backend API
            </li>
          </ul>
        </li>

        <li>
          Achievements:{" "}
          <ul>
            <li>
              Play a important role for some featues of the released product:{" "}
            </li>
            <ul>
              <li>
                Implement UI & business logic for controlling: Monitors, Headset
              </li>
              <li>Migrated UI codebase to fit new API of new architecture.</li>
              <li>
                Developed and maintained background pages (written in pure
                TypeScript) for the device detection flow and installation
                process.
              </li>
              <li>
                Collaborated with the backend team to implement the app rating
                feature.
              </li>
              <li>
                Built data migration feature (UI & logic) to transfer data from
                old app schema to new system, including developing/integrating
                converter libraries.
              </li>
            </ul>
          </ul>
        </li>
      </ol>
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
