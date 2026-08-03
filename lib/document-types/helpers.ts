export const todayStr = () => new Date().toISOString().split('T')[0];

export const nowTime = () => {
  const n = new Date();
  return `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}`;
};

export const uid = () => Math.random().toString(36).slice(2, 8).toUpperCase();
