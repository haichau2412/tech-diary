"use client";

import "./global.css";
import AddDishForm from "./ui/AddItem";
import AddCondiment from "./ui/AddCondiment";
import CategoryBar from "./ui/CategoryBar";

function Menu() {
  return (
    <div className="customScrollBarGreen h-full flex-grow overflow-y-scroll">
      <CategoryBar
        items={[
          {
            id: "11",
            content: {
              en: "jdjd",
              vn: "sdsn",
            },
          },
          {
            id: "22",
            content: {
              en: "jdjd",
              vn: "sdsn",
            },
          },
          {
            id: "33",
            content: {
              en: "jdjd",
              vn: "sdsn",
            },
          },
        ]}
        onItemClick={(i) => {
          console.log(i);
        }}
      />
      <AddCondiment />
      <AddDishForm />
    </div>
  );
}

export default Menu;
