import React from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4 bg-black bg-opacity-75 text-white rounded-lg">
      <h1 className="text-4xl font-bold">Game Over!</h1>
      <p className="text-2xl">Oops! Looks like you ran out of lives.</p>
      <p className="text-xl">Your final score: <span className="text-yellow-400 font-semibold">{score}</span></p>
      
      <div className="text-center">
        <p className="text-lg">But do not worry, champions never give up!</p>
        <p className="text-lg">Get ready to try again and set a new high score!</p>
      </div>
      
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-indigo-500 text-white rounded-md text-lg font-semibold hover:bg-indigo-600 transition"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
