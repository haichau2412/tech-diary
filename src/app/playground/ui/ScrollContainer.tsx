function ScrollContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="customScrollBarGreen h-full overflow-y-scroll">
      {children}
    </div>
  );
}

export default ScrollContainer;
