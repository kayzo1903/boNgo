"use client";
import React, { useState, useEffect } from "react";
import StartGame from "./startGame";
import NumberPad from "./Numberpad";
import Boo from "./Boo";
import Cerebrations from "./cerebrationsGPHY";
import GameOver from "./Gameover";

const BoNgoGame = () => {
  const [win, setWin] = useState(false);
  const [digits, setDigits] = useState<number[]>([]);
  const [inputDigits, setInputDigits] = useState<number[]>([]);
  const [gameState, setGameState] = useState<
    "start" | "memorize" | "recall" | "result" | "gameOver"
  >("start");
  const [timer, setTimer] = useState<number>(5);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [digitFig, setDigitFig] = useState<number>(3);
  const [lives, setLives] = useState<number>(3); // New lives state

  //celebration&boooo
  const playCerebration = () => {
    const audio = new Audio("/sounds/yeah.mp3");
    audio.preload = "auto";
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 2000);
  };

  const booplayer = () => {
    const audio = new Audio("/sounds/boo.mp3");
    audio.preload = "auto";
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 2000);
  };

  //generates a digits
  const generateDigits = (length: number) => {
    const newDigits = Array.from({ length }, () =>
      Math.floor(Math.random() * 10)
    );
    setDigits(newDigits);
  };

  //start-game logics
  const startGame = () => {
    if (gameState === "gameOver") {
      // Reset everything on Game Over
      setLevel(1);
      setScore(0);
      setLives(3); // Reset lives
      setDigitFig(3); // Reset digit figure
    } else if (win) {
      // Only reset lives when moving to the next level
      setLives(3);
    }

    generateDigits(digitFig);
    setGameState("memorize");

    let newTimer = 5;
    if (level >= 4 && level < 7) newTimer = 7;
    else if (level >= 7 && level < 10) newTimer = 9;
    else if (level >= 10 && level < 13) newTimer = 11;
    else if (level >= 13 && level <= 15) newTimer = 13;
    setTimer(newTimer);
  };

  const handleDelete = () => {
    setInputDigits((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInputDigits([]);
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      if (gameState === "memorize") {
        setGameState("recall");
        let recallTimer = 5;
        if (level >= 4 && level < 7) recallTimer = 7;
        else if (level >= 7 && level < 10) recallTimer = 9;
        else if (level >= 10 && level < 13) recallTimer = 11;
        else if (level >= 13 && level <= 15) recallTimer = 13;
        setTimer(recallTimer);
      } else if (gameState === "recall") {
        setGameState("result");
      }
    }
  }, [timer, gameState]);

  const handleChange = (number: number) => {
    setInputDigits((prev) => [...prev, number]);
  };


  //cgheck results
  const checkResults = () => {
    if (JSON.stringify(digits) === JSON.stringify(inputDigits)) {
      setWin(true);
      setScore(score + level);
      playCerebration();
      if (level < 15) {
        setLevel(level + 1);
        setDigitFig(digitFig + 2);
      }
    } else {
      setWin(false);
      booplayer();
      setLives(lives - 1); // Reduce a life when the player gets it wrong
      if (lives === 1) {
        setGameState("gameOver")
        setDigitFig((digitFig - digitFig) + 3)
      }
    }
  };

  useEffect(() => {
    if (gameState === "result") {
      checkResults();
      setInputDigits([]);
    }
  }, [gameState]);

  return (
    <div className="min-h-screen space-y-4 bg-homeigame3 bg-cover  bg-no-repeat px-2">
      <h1 className="text-center text-gray-100 text-5xl md:text-7xl font-extrabold pt-8">
        bo<span className="text-red-700">N</span>go
      </h1>
      <div className="flex justify-center gap-16 flex-nowrap px-2">
        <span className="text-yellow-100 font-semibold  text-xl md:text-3xl">
          level {level.toString().padStart(2, "0")}
        </span>
        <span className="text-yellow-100 font-semibold text-xl md:text-3xl">
          score {score.toString().padStart(2, "0")}
        </span>
        <span className="text-yellow-100 font-semibold text-xl md:text-3xl">
          lives {lives.toString().padStart(2, "0")}
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
          <p className="text-2xl text-gray-100 leading-relaxed text-center w-full px-2 justify-center">
            Memorize these digits:
          </p>
          <h2 className="text-3xl font-extrabold text-gray-100 leading-relaxed text-center w-full px-2 justify-center">
            {digits.join(" ")}
          </h2>
          <p className="text-2xl text-gray-100 leading-relaxed text-center w-full px-2 justify-center">
            Time left: <span className="text-yellow-100">{timer} seconds</span>
          </p>
        </div>
      )}

      {gameState === "recall" && (
        <div className="mx-auto max-w-screen-md">
          <p className="text-2xl text-gray-100 leading-relaxed text-center w-full px-2 justify-center">
            Enter the digits you remember
          </p>
          <h2 className="text-3xl font-extrabold text-gray-100 leading-relaxed text-center w-full px-2 justify-center">
            {inputDigits.length <= 0 ? "- - - - -" : inputDigits.join(" ")}
          </h2>
          <p className="text-2xl text-gray-100 leading-relaxed text-center w-full px-2 justify-center">
            Time left: <span className="text-yellow-100">{timer} seconds</span>
          </p>
          <NumberPad
            onNumberClick={handleChange}
            onClear={handleClear}
            onDelete={handleDelete}
          />
        </div>
      )}

      {gameState === "result" && (
        <div className="max-w-screen-md mx-auto px-4 flex flex-col justify-center items-center gap-48">
          <div className="text-2xl text-gray-100 leading-relaxed text-center w-full px-2 justify-center">
            {win ? <Cerebrations /> : <Boo />}
          </div>
          <button
            onClick={startGame}
            className="bg-gray-800 text-gray-50 px-8 py-2 rounded-md md:w-96 w-full"
          >
            {win ? "Next Level" : "Play Again"}
          </button>
        </div>
      )}

      {gameState === "gameOver" && (
        <GameOver onRestart={startGame} score={score} />
      )}
    </div>
  );
};

export default BoNgoGame;
