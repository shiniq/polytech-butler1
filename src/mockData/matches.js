export const mockMatches = [
  {
    id: 1,
    Hero1: { Name: 'Juggernaut', HP: 100, BaseDamage: 25, Evasion: 5 },
    Hero2: { Name: 'Phantom Assassin', HP: 90, BaseDamage: 30, Evasion: 15 },
    Bets: [
      { BetType: 'winner', Option: 'Hero1', Coefficient: 1.2 },
      { BetType: 'winner', Option: 'Hero2', Coefficient: 4.5 },
      { BetType: 'hits', Option: '<10', Coefficient: 2.0 },
      // ...
    ],
  },
  // ещё пара записей...
];
