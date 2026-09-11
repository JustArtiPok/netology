export default function orderByProps(obj, order) {
  const result = [];
  const usedKeys = new Set();

  for (const key of order) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push({ key, value: obj[key] });
      usedKeys.add(key);
    }
  }

  const remaining = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !usedKeys.has(key)) {
      remaining.push({ key, value: obj[key] });
    }
  }

  remaining.sort((a, b) => a.key.localeCompare(b.key));

  return [...result, ...remaining];
}