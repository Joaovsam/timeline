import { format } from "date-fns";
import { useTheme } from "../context/ThemeContext";

const TimeLineHeader = ({ dateRange, cellWidth }) => {
  const { theme } = useTheme();

  const months = [];
  let currentMonth = null;

  dateRange.days.forEach((day) => {
    const monthKey = format(day, "yyyy-MM");

    if (!currentMonth || currentMonth.key !== monthKey) {
      currentMonth = {
        key: monthKey,
        label: format(day, "MMMM yyyy"),
        days: [],
      };
      months.push(currentMonth);
    }

    currentMonth.days.push(day);
  });

  return (
    <div className="sticky top-0 z-10">
      <div className="flex border-b">
        {months.map((month) => (
          <div
            key={month.key}
            className={`text-center text-sm font-medium border-r py-1  ${
              theme === "dark" ? "bg-[#6638fe]" : "bg-[#00FFFF]"
            }`}
            style={{
              width: `${month.days.length * cellWidth}px`,
              minWidth: `${month.days.length * cellWidth}px`,
              flexShrink: 0,
            }}
          >
            {month.label}
          </div>
        ))}
      </div>

      <div className="flex">
        {dateRange.days.map((date) => (
          <div
            key={date.toISOString()}
            className="text-center text-xs border-r-2 p-1 bg-white"
            style={{
              width: `${cellWidth}px`,
              minWidth: `${cellWidth}px`,
              flexShrink: 0,
            }}
          >
            {format(date, "dd")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeLineHeader;
