import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { calculateLeft, calculateWidth } from "../utils/utils.js";
import { useTheme } from "../context/ThemeContext.jsx";

const DraggableItem = ({ item, minDate, CELL_WIDTH, onNameChange }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });
  const { theme } = useTheme();
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleBlur = () => {
    setEditing(false);
    if (newName !== item.name) {
      onNameChange(item.id, newName);
    }
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      ref={setNodeRef}
      className={`absolute p-2.5 rounded m-0.5 shadow-sm cursor-pointer draggable-item ${
        theme === "dark" ? "bg-[#6638fe]" : "bg-[#00FFFF]"
      }`}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, 0, 0)`
          : undefined,
        left: calculateLeft(item.start, minDate, CELL_WIDTH),
        width: calculateWidth(item.start, item.end, CELL_WIDTH),
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...(editing ? {} : listeners)}
      {...(editing ? {} : attributes)}
    >
      {editing ? (
        <input
          type="text"
          className="w-full bg-[#191919]"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
          autoFocus
        />
      ) : (
        <>
          <p
            className="truncate max-w-full cursor-pointer"
            onDoubleClick={() => setEditing(true)}
            title={item.name}
          >
            {item.name}
          </p>
          {showTooltip && (
            <div className="absolute top-full left-0 mt-1 bg-black text-xs px-2 py-1 rounded shadow-lg z-20">
              Double click to edit
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DraggableItem;
