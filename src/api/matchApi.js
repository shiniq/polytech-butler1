const USE_MOCK = true;

const heroes = [
  { name: 'Juggernaut', HP: 550, BaseDamage: 24, Evasion: 10, Mana: 75 },
  { name: 'PhantomAssassin', HP: 500, BaseDamage: 26, Evasion: 20, Mana: 75 },
  { name: 'CrystalMaiden', HP: 450, BaseDamage: 18, Evasion: 5, Mana: 300 },
  { name: 'Axe', HP: 600, BaseDamage: 29, Evasion: 5, Mana: 75 },
];

const items = [
  'BlinkDagger', 'BlackKingBar', 'MantaStyle',
  'BootsOfSpeed', 'MagicWand', 'AghanimScepter'
];

export async function fetchMatch() {
  if (USE_MOCK) {
    const [h1, h2] = heroes.sort(() => Math.random() - 0.5).slice(0, 2);
    // слоты
    const pickItems = () => {
      const sel = items.sort(() => Math.random() - 0.6).slice(0, 6);
      return [...sel];
    };
    const coef1 = +(1 + Math.random() * 1).toFixed(2);
    const coef2 = +(1 + Math.random() * 2).toFixed(2);
    return {
      Hero1: { ...h1 },
      Hero2: { ...h2 },
      Hero1Items: pickItems(),
      Hero2Items: pickItems(),
      Bets: [
        { BetType: 'winner', Option: 'Hero1', Coefficient: coef1 },
        { BetType: 'winner', Option: 'Hero2', Coefficient: coef2 }
      ]
    };
  }
  // здесь будет реальный fetch('/api/match/generate')
  throw new Error("REAL API not implemented");
}
export const itemDetails = {
  BlinkDagger: {
    name: "Blink Dagger",
    bonuses: { Damage: 0, Mana: 0, Evasion: 0 },
    description: "Мгновенно перемещает на небольшое расстояние."
  },
  BlackKingBar: {
    name: "Black King Bar",
    bonuses: { Damage: 10, Mana: 0, Evasion: 0 },
    description: "Дает невосприимчивость к магии."
  },
  MantaStyle: {
    name: "Manta Style",
    bonuses: { Damage: 5, Mana: 50, Evasion: 5 },
    description: "Создает иллюзии и увеличивает ловкость."
  },
  BootsOfSpeed: {
    name: "Boots of Speed",
    bonuses: { Damage: 0, Mana: 0, Evasion: 3 },
    description: "Увеличивает скорость передвижения."
  },
  MagicWand: {
    name: "Magic Wand",
    bonuses: { Damage: 0, Mana: 100, Evasion: 0 },
    description: "Восстанавливает здоровье и ману."
  },
  AghanimScepter: {
    name: "Aghanim's Scepter",
    bonuses: { Damage: 15, Mana: 150, Evasion: 0 },
    description: "Улучшает ультимативные способности."
  }
};
export async function simulateMatch(matchDto, placedBets) {
  if (USE_MOCK) {
    // победитель определение
    const win = Math.random() < 0.5 ? 'Hero1' : 'Hero2';
    const totalWin = placedBets
      .filter(b => b.Option === win)
      .reduce((s, b) => s + b.Amount * b.Coefficient, 0);
return {
  WinningBets: placedBets.filter(b => b.Option === win),
  TotalWin: +totalWin.toFixed(2),
  NewBalance: +(1000 - placedBets.reduce((s,b)=>s+b.Amount,0) + totalWin).toFixed(2),
  HeroStats: {
    Hero1: {
      Name: matchDto.Hero1.name,
      Hits: Math.floor(10 + Math.random() * 10),
      Dodges: Math.floor(1 + Math.random() * 5)
    },
    Hero2: {
      Name: matchDto.Hero2.name,
      Hits: Math.floor(10 + Math.random() * 10),
      Dodges: Math.floor(1 + Math.random() * 5)
    }
  }
};

  }
  // fetch('/api/match/simulate', ...)
  throw new Error("REAL API not implemented");
}
