import { useEffect, useRef, useState } from "react";
import { getDateRange } from "../utils/utils.js";
import timelineItems from "../timelineItems";
import TimeLineHeader from "./TimeLineHeader";
import LanesContainer from "./LanesContainer";
import { useTheme } from "../context/ThemeContext.jsx";

const TimeLineContainer = () => {
  const dateRange = getDateRange(timelineItems);
  const [cellWidth, setCellWidth] = useState(40);
  const timelineRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timeline = timelineRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDownHandler = (e) => {
      if (e.target.closest(".draggable-item")) return;

      isDown = true;
      timeline.classList.add("dragging");
      startX = e.pageX - timeline.offsetLeft;
      scrollLeft = timeline.scrollLeft;
    };

    const mouseLeaveHandler = () => {
      isDown = false;
      timeline.classList.remove("dragging");
    };

    const mouseUpHandler = () => {
      isDown = false;
      timeline.classList.remove("dragging");
    };

    const mouseMoveHandler = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - timeline.offsetLeft;
      const walk = (x - startX) * 1.5;
      timeline.scrollLeft = scrollLeft - walk;
    };

    timeline.addEventListener("mousedown", mouseDownHandler);
    timeline.addEventListener("mouseleave", mouseLeaveHandler);
    timeline.addEventListener("mouseup", mouseUpHandler);
    timeline.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      timeline.removeEventListener("mousedown", mouseDownHandler);
      timeline.removeEventListener("mouseleave", mouseLeaveHandler);
      timeline.removeEventListener("mouseup", mouseUpHandler);
      timeline.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  const handleWheel = (event) => {
    if (event.ctrlKey) {
      event.preventDefault();

      const timeline = timelineRef.current;
      if (!timeline) return;

      // Calculate the horizontal position of the mouse relative to the timeline (mouseX).
      // Store the current horizontal scroll position of the timeline (scrollLeft).
      const rect = timeline.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const scrollLeft = timeline.scrollLeft;

      // Adjust the cell width based on the scroll direction:
      // Clamp the value between 20 (minimum zoom) and 150 (maximum zoom) to prevent it from becoming too small or too large.
      const oldCellWidth = cellWidth;
      let newCellWidth = event.deltaY > 0 ? oldCellWidth - 5 : oldCellWidth + 5;
      newCellWidth = Math.min(Math.max(newCellWidth, 20), 150);

      const zoomFactor = newCellWidth / oldCellWidth;

      const newScrollLeft = (scrollLeft + mouseX) * zoomFactor - mouseX;

      timeline.scrollLeft = newScrollLeft;
      setCellWidth(newCellWidth);
    }
  };

  useEffect(() => {
    const preventZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", preventZoom, { passive: false });
    return () => {
      window.removeEventListener("wheel", preventZoom);
    };
  }, []);
  return (
    <>
      <div
        className="overflow-x-auto min-h-[90vh] relative p-4"
        onWheel={handleWheel}
        ref={timelineRef}
      >
        <div className="flex flex-row">
          <h1 className="text-5xl">Sprint</h1>
          <button className="ml-44 text-5xl" onClick={toggleTheme}>
            Change theme to {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
        <div className="mt-4 ">
          <TimeLineHeader cellWidth={cellWidth} dateRange={dateRange} />
          <LanesContainer cellWidth={cellWidth} dateRange={dateRange} />
        </div>
      </div>
    </>
  );
};

export default TimeLineContainer;
