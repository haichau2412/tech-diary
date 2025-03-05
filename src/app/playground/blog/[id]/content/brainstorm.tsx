import H1 from "../shared/h1";
import Image from "next/image";
import utubePic from "@/assets/utube.avif";

const Home = () => {
  return (
    <div className="blog customScrollBar blue">
      <H1>Chau Tech Brainstorming</H1>
      <h2>Ideas for the portfolio:</h2>
      <div className="custokmm"></div>
      <p>
        I need to build a portfolio page to showcase my tech skills. It will
        serve as a playground where I can invent new things and experiment with
        the latest tech topics.
      </p>
      <p>
        The essence of this project is personal brand building. By looking
        through the portfolio, people can quickly get to know about the person
        behind the page - his personality and competencies.
      </p>
      <h2>Choosing tech:</h2>
      <p>
        For UI, NextJS is currently a popular framework because it uses React
        internally and supports Server-Side Rendering (SSR) & and Search Engine
        Optimization (SEO). I&apos;ve chosen it as my next target for learning.
        Even though my portfolio doesn&apos;t need SSR, since it relies heavily
        on JS and user interaction, I still choose it to gain experience and
        deepen my knowledge. This decision is focused on improving my skills on
        the frontend side.
      </p>
      <p>
        For the backend, I want to start with something standard, so I&apos;ve
        chosen Express. Initially, I intend to opt out framework when starting
        to learning BE. Although this approach may take a longer time to
        implement things, it helps in the long run, as it forces me to
        thoroughly understand BE key concepts and integrate them into my BE
        manually, rather than relying on boilerplate code provided by
        frameworks.
      </p>
      <p>
        For testing, for now, I&apos;m opting out testing at the early stages
      </p>
      <h2>Hosting flatform:</h2>
      <p>
        Vercel provides a very intuitive UI for deploying and monitoring
        applications. I don&apos;t want to focus too much on DevOps right now so
        this is good enough.
      </p>
      <h2>Ideas for features:</h2>
      <ul>
        <li>
          <h3 className="!text-red-900">Youtube note</h3>
          <p>
            Not Facebook, not Tiktok - Youtube is the flatform where I spend a
            lot of the time in a day. It always meets my need for both
            entertainment and learning.
          </p>
          <p>
            When it comes to learning English, I often need to write down some
            notes for the vocabularies (words have specific meaning in a
            context) for a specific moment in a video and keep it for later
            revision. However, I found this a bit inconvinient. I want all of
            them, the video and my notes stay at the same place. Moreover, I
            would like a feature that allows me to attach a note to a specific
            time in the video, and lets the video plays from the moment whenever
            I want to review my note.
          </p>

          <Image
            role="presentation"
            priority={false}
            className="mx-auto mt-2"
            src={utubePic}
            width={1000}
            alt="Feature thumbnail"
          />
        </li>
      </ul>

      <p className="mt-5 text-center font-bold uppercase">Period</p>
    </div>
  );
};

export default Home;
