import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import DraggableItem from "./DraggableItem.jsx";
import timelineItems from "../timelineItems.js";
import { shiftDate } from "../utils/utils.js";
import { assignLanes } from "../utils/assignLanes.js";
import VerticalGrid from "./VerticalGrid.jsx";

const LanesContainer = ({ cellWidth, dateRange }) => {
  const [items, setItems] = useState(timelineItems);

  const handleDragEnd = (event) => {
    const { delta, active } = event;
    const itemId = active.id;

    const daysMoved = Math.round(delta.x / cellWidth);
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              start: shiftDate(item.start, daysMoved),
              end: shiftDate(item.end, daysMoved),
            }
          : item
      )
    );
  };

  const handleNameChange = (itemId, newName) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, name: newName } : item
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <VerticalGrid cellWidth={cellWidth} dateRange={dateRange} />
      {assignLanes(items).map((lane, i) => (
        <div key={i} className="flex relative h-30 ">
          {lane.map((item) => (
            <DraggableItem
              key={item.id}
              item={item}
              minDate={dateRange.min}
              CELL_WIDTH={cellWidth}
              onNameChange={handleNameChange}
            />
          ))}
        </div>
      ))}
    </DndContext>
  );
};

export default LanesContainer;
