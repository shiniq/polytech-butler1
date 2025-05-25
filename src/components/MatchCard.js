import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MatchCard({ match }) {
  const nav = useNavigate();
  return (
    <div
      className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 cursor-pointer hover:scale-105 transform transition"
      onClick={() => nav(`/bet/${match.id}`, { state: { match } })}
    >
      <h2 className="text-xl font-semibold">Матч #{match.id}</h2>
      <div className="flex justify-between mt-2">
        <span>{match.Hero1.Name}</span>
        <span>vs</span>
        <span>{match.Hero2.Name}</span>
      </div>
    </div>
  );
}
