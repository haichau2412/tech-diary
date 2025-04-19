import Brainstorm from "./content/brainstorm";
import About from "./content/about";
import UtubeChangeNote from "./content/utubeChangeNote";
// import TestingStrategy from "./content/testingStrategy";

export const content = [
  {
    id: "brainstorming",
    title: "Portfolio brainstorming",
    content: <Brainstorm />,
  },
  {
    id: "about",
    title: "About",
    content: <About />,
  },
  {
    id: "changeNote",
    title: "Utube change notes",
    content: <UtubeChangeNote />,
  },
  // {
  //   id: "testing",
  //   title: "Personal Testing Strategy",
  //   content: <TestingStrategy />,
  // },
];

export const posts = content.map(({ id, title }) => ({ id, title }));
