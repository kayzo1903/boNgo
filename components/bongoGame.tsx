"use client";
import React, { useState, useEffect } from "react";
import StartGame from "./startGame";
import NumberPad from "./Numberpad";

const BoNgoGame = () => {
  const [win, setWin] = useState(false);
  const [digits, setDigits] = useState<number[]>([]);
  const [inputDigits, setInputDigits] = useState<number[]>([]);
  const [gameState, setGameState] = useState<
    "start" | "memorize" | "recall" | "result"
  >("start");
  const [timer, setTimer] = useState<number>(5);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [digitFig, setDigitFig] = useState<number>(3);

  //celebration&boooo
  const playCerebration = () => {
   const audio = new Audio('/sounds/yeah.mp3')
   audio.play();

   setTimeout(() => {
    audio.pause();
    audio.currentTime = 0; // Reset the audio to the beginning
  }, 2000); // 2000 milliseconds = 2 seconds
  }

  const booplayer = () => {
    const audio = new Audio('/sounds/boo.mp3')
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Reset the audio to the beginning
    }, 2000); // 2000 milliseconds = 2 seconds
  }

  // Function to generate random digits
  const generateDigits = (length: number) => {
    const newDigits = Array.from({ length }, () =>
      Math.floor(Math.random() * 10)
    );
    setDigits(newDigits);
  };

  // Start the game
  const startGame = () => {
    generateDigits(digitFig);
    setGameState("memorize");

    // Adjust timer based on level for the memorize phase
    let newTimer = 5;
    if (level >= 4 && level < 7) {
      newTimer = 7; // Levels 4 to 6
    } else if (level >= 7 && level < 10) {
      newTimer = 9; // Levels 7 to 9
    } else if (level >= 10 && level < 13) {
      newTimer = 11; // Levels 10 to 12
    } else if (level >= 13 && level <= 15) {
      newTimer = 13; // Levels 13 to 15
    }
    setTimer(newTimer);
  };

  // Handle clear and delete of the input digits
  const handleDelete = () => {
    setInputDigits((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInputDigits([]);
  };

  // Handle timer countdown and game state transitions
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      if (gameState === "memorize") {
        setGameState("recall");

        // Reset timer for recall phase
        let recallTimer = 5;
        if (level >= 4 && level < 7) {
          recallTimer = 7;
        } else if (level >= 7 && level < 10) {
          recallTimer = 9;
        } else if (level >= 10 && level < 13) {
          recallTimer = 11;
        } else if (level >= 13 && level <= 15) {
          recallTimer = 13;
        }
        setTimer(recallTimer);
      } else if (gameState === "recall") {
        setGameState("result");
      }
    }
  }, [timer, gameState]);

  // Handle input change
  const handleChange = (number: number) => {
    setInputDigits((prev) => [...prev, number]);
  };

  // Check the user's input against the generated digits
  const checkResults = () => {
    if (JSON.stringify(digits) === JSON.stringify(inputDigits)) {
      setWin(true);
      setScore(score + level); // Increment score by current level
      playCerebration()
      if (level < 15) { // Level up only if less than 15 digits
        setLevel(level + 1);
        setDigitFig(digitFig + 2); // Increase digit length by 2
      }
    } else {
      setWin(false);
      booplayer()
    }
  };

  useEffect(() => {
    if (gameState === "result") {
      checkResults();
      setInputDigits([]);
    }
  }, [gameState]);

  return (
    <div className="min-h-screen space-y-4 bg-homeimage bg-cover  bg-no-repeat">
      <h1 className="text-center text-gray-800 text-5xl md:text-7xl font-extrabold pt-8">
        bo<span className="text-red-700">N</span>go
      </h1>
      <div className="flex justify-center gap-16 flex-nowrap px-2">
        <span className="text-gray-700 font-semibold text-2xl md:text-3xl">
          Level: {level.toString().padStart(2, "0")}
        </span>
        <span className="text-gray-700 font-semibold text-2xl md:text-3xl">
          Score: {score.toString().padStart(2, "0")}
        </span>
      </div>
      {gameState === "start" && (
        <div className="px-4 flex flex-col justify-center items-center space-y-8">
          <StartGame />
          <button
            onClick={startGame}
            className="bg-gray-800 text-gray-50 px-8 py-2 rounded-md md:w-96 w-full"
          >
            Play
          </button>
        </div>
      )}

      {gameState === "memorize" && (
        <div className="mx-auto max-w-screen-md">
          <p className="text-2xl text-gray-800 leading-relaxed text-center w-full px-2 justify-center">
            Memorize these digits:
          </p>
          <h2 className="text-3xl font-extrabold text-gray-800 leading-relaxed text-center w-full px-2 justify-center">
            {digits.join(" ")}
          </h2>
          <p className="text-2xl text-gray-800 leading-relaxed text-center w-full px-2 justify-center">
            Time left: <span className="text-red-600">{timer} seconds</span>
          </p>
        </div>
      )}

      {gameState === "recall" && (
        <div className="mx-auto max-w-screen-md">
          <p className="text-2xl text-gray-800 leading-relaxed text-center w-full px-2 justify-center">
            Enter the digits you remember
          </p>
          <h2 className="text-3xl font-extrabold text-gray-800 leading-relaxed text-center w-full px-2 justify-center">
            {inputDigits.length <= 0 ? "- - - - -" : inputDigits.join(" ")}
          </h2>
          <p className="text-2xl text-gray-800 leading-relaxed text-center w-full px-2 justify-center">
            Time left: <span className="text-red-600">{timer} seconds</span>
          </p>
          <NumberPad onNumberClick={handleChange} onClear={handleClear} onDelete={handleDelete} />
        </div>
      )}

      {gameState === "result" && (
        <div className="max-w-screen-md mx-auto px-4 flex flex-col justify-center items-center gap-48">
          <div className="text-2xl text-gray-800 leading-relaxed text-center w-full px-2 justify-center">
            {win ? "😎😎😎 Correct!" : "😛😛😛 Wrong!"}
          </div>
          <button
            onClick={startGame}
            className="bg-gray-800 text-gray-50 px-8 py-2 rounded-md md:w-96 w-full"
          >
            {win ? "Next Level" : "Play Again"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BoNgoGame;
