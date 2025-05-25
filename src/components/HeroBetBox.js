import React from 'react';

export default function HeroBetBox({ heroName, coefficient, onBet }) {
  return (
    <div className="mt-4 bg-white/5 border border-zinc-700 rounded-lg p-4 text-center">
      <div className="text-lg font-medium">{heroName}</div>
      <div className="text-2xl font-bold text-accent">{coefficient.toFixed(2)}</div>
      <button
        onClick={() => onBet(heroName, coefficient)}
        className="mt-2 px-4 py-1 border border-accent rounded hover:bg-accent/20 transition"
      >
        BET
      </button>
    </div>
  );
}
