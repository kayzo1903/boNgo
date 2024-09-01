import React from 'react';

interface NumberPadProps {
  onNumberClick: (number: number) => void;
}

const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick }) => {
  // Numbers from 9 to 0
  const numbers = Array.from({ length: 10 }, (_, i) => 9 - i);

  return (
    <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
      {numbers.map((number) => (
        <button
          key={number}
          className="w-20 h-20 bg-green-500 text-white font-bold rounded-lg flex items-center justify-center text-xl hover:bg-green-600 transition duration-200"
          onClick={() => onNumberClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default NumberPad;
