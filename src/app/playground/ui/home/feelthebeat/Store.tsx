"use client";

import { useState } from "react";

interface StoreNavProps {
  items: {
    title: string;
    id: string;
  }[];
  selectedId: string;
}

const StoreNav = ({ items, selectedId }: StoreNavProps) => {
  const [_selectedId, setSelectedId] = useState(selectedId);

  return (
    <div className="nav">
      <menu>
        {items.map(({ title, id }) => (
          <li
            key={id}
            id={`${_selectedId === id ? "selectedMenu" : ""}`}
            className={` ${_selectedId === id ? "selected" : ""}`}
            onClick={() => {
              setSelectedId(id);
            }}
          >
            <button className="relative">
              {title}

              {_selectedId === id ? (
                <div className="absolute top-0 left-0 w-full max-w-full">
                  <div className="selectedElement">
                    <div className="idicator">{title}</div>
                  </div>
                </div>
              ) : null}
            </button>
          </li>
        ))}
      </menu>
    </div>
  );
};

interface StoreItemProps {
  des: string;
  id: string;
  name: string;
}

export const StoreItem = ({ name }: StoreItemProps) => {
  return <div>{name}</div>;
};

interface StoreContainerProps {
  show: boolean;
}

const StoreContainer = () => {
  return <div className="grid"></div>;
};

const Store = ({ show }: StoreContainerProps) => {
  const cls = [
    "store",
    "absolute",
    "top-full",
    "z-10",
    "flex",
    "h-full",
    "w-full",
    "overflow-hidden",
    "bg-black",
  ];

  if (show) {
    cls.push("show");
  }

  return (
    <div className={`${cls.join(" ")}`}>
      <StoreNav
        items={[
          { title: "Hat", id: "Store1" },
          { title: "Accessory", id: "Store2" },
          { title: "Shirt", id: "Store3" },
        ]}
        selectedId="Store1"
      />
      <StoreContainer />
    </div>
  );
};

export default Store;
