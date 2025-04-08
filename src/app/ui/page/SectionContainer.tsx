import React from "react";

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
      className={`flex flex-col gap-2 text-center text-stone-100 ${additionalStyle || ""}`}
      {...props}
    >
      <h1 className="text-2xl font-bold uppercase">{title}</h1>
      <h2 className="text-xl">{subTitle}</h2>
      {children}
    </section>
  );
};

export default SectionContainer;
