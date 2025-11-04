const VerticalGrid = ({ dateRange, cellWidth }) => {
  const days =
    (new Date(dateRange.max) - new Date(dateRange.min)) /
      (1000 * 60 * 60 * 24) +
    1;

  return (
    <div className="absolute top-22 left-4 w-full h-full pointer-events-none">
      {Array.from({ length: days }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 h-full border-l-2 border-[#191919]"
          style={{
            left: `${i * cellWidth}px`,
          }}
        />
      ))}
    </div>
  );
};

export default VerticalGrid;
