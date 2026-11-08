import Magician from './js/Magician';
import Daemon from './js/Daemon';

const magician = new Magician('Gandalf', 100);
magician.attack = 2;
console.log('Magician attack (2 cells):', magician.attack);

magician.stoned = true;
console.log('Magician stoned attack (2 cells):', magician.attack);

const daemon = new Daemon('Azazel', 100);
daemon.attack = 5;
console.log('Daemon attack (5 cells):', daemon.attack);