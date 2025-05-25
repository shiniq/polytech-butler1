import React, { useEffect, useState } from 'react';
import { fetchMatches } from '../api/matchApi';
import { useMatch } from '../context/MatchContext';
import MatchCard from '../components/MatchCard';
import Loader from '../components/Loader';

export default function MatchmakingPage() {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const { setCurrentMatch } = useMatch();

  useEffect(() => {
    fetchMatches().then(ms => {
      setMatches(ms);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map(m => (
        <MatchCard key={m.id} match={m} />
      ))}
    </div>
  );
}
