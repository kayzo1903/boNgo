import React from "react";

interface NumberPadProps {
  onNumberClick: (number: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

const NumberPad: React.FC<NumberPadProps> = ({
  onNumberClick,
  onDelete,
  onClear,
}) => {
  const buttons = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "Del", "0", "Clr"
  ];

  return (
    <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => {
            if (button === "Del") onDelete();
            else if (button === "Clr") onClear();
            else onNumberClick(button);
          }}
          className={`bg-gray-800 text-white text-xl p-4 rounded-md ${
            button === "Del" || button === "Clr"
              ? "col-span-1"
              : "col-span-1"
          }`}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default NumberPad;
