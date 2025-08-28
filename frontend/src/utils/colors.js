export const themeColors = {
  cyan: 'rgb(34, 211, 238)',
  purple: 'rgb(192, 132, 252)',
  amber: 'rgb(251, 191, 36)',
  green: 'rgb(74, 222, 128)',
  orange: 'rgb(251, 146, 60)',
  background: '#111827', 
  card: '#1f2937', 
  text: '#e5e7eb',      
  textMuted: '#9ca3af', 
  border: 'rgba(255, 255, 255, 0.1)',
};

const userColors = [
  'text-red-400', 'text-orange-400', 'text-amber-400', 'text-yellow-400',
  'text-lime-400', 'text-green-400', 'text-emerald-400', 'text-teal-400',
  'text-cyan-400', 'text-sky-400', 'text-blue-400', 'text-indigo-400',
  'text-violet-400', 'text-purple-400', 'text-fuchsia-400', 'text-pink-400',
  'text-rose-400',
];

const colorCache = {};

export const getUserColor = (username) => {
  if (colorCache[username]) {
    return colorCache[username];
  }
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % userColors.length);
  const color = userColors[index];
  colorCache[username] = color;
  return color;
};