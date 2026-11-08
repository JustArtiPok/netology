import GameSavingLoader from './js/GameSavingLoader';

(async () => {
  try {
    const saving = await GameSavingLoader.load();
    console.log('GameSaving loaded:', saving);
  } catch (error) {
    console.error('Error loading GameSaving:', error);
  }
})();