import React from 'react';

export default function BetOptions({ bets, onChange }) {
  return (
    <div className="space-y-4">
      {bets.map((b, i) => (
        <div key={i} className="flex justify-between items-center">
          <span>{b.BetType} — {b.Option} (x{b.Coefficient})</span>
          <input
            type="number"
            min="0"
            placeholder="ставка"
            className="w-20 px-2 py-1 bg-zinc-800 rounded"
            onChange={(e) => onChange(i, +e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
