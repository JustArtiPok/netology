export default function extractSpecialAttacks({ special }) {
  if (!Array.isArray(special)) {
    return [];
  }

  return special.map(({
    id,
    name,
    icon,
    description = 'Описание недоступно',
  }) => ({
    id,
    name,
    icon,
    description,
  }));
}