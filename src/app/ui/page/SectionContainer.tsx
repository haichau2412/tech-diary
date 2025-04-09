import React from "react";
import { twMerge } from "tailwind-merge";

interface SectionContainerProps extends React.ComponentPropsWithRef<"section"> {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  additionalStyle?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  title,
  subTitle,
  additionalStyle,
  ...props
}) => {
  return (
    <section
      className={twMerge(
        `flex flex-col gap-2 text-center text-stone-50 ${additionalStyle || ""}`,
      )}
      {...props}
    >
      <h2 className="text-3xl font-bold uppercase">{title}</h2>
      <p className="text-xl">{subTitle}</p>
      {children}
    </section>
  );
};

export default SectionContainer;
