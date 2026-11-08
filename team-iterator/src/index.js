import Character from './js/Character';
import Team from './js/Team';
import TeamGenerator from './js/TeamGenerator';

const heroData = {
  name: 'Лучник',
  type: 'Bowman',
  health: 50,
  level: 1,
  attack: 40,
  defence: 10,
};

const hero1 = new Character(heroData);
const hero2 = new Character({ ...heroData, name: 'Маг', type: 'Magician' });
const hero3 = new Character({ ...heroData, name: 'Демон', type: 'Daemon' });

const team = new Team();
team.add(hero1).add(hero2).add(hero3);

console.log('Team через for...of:');
for (const member of team) {
  console.log(`  ${member.name} (${member.type})`);
}

console.log('Team через spread:', [...team].map((m) => m.name));

const teamGen = new TeamGenerator();
teamGen.add(hero1).add(hero2).add(hero3);

console.log('TeamGenerator через for...of:');
for (const member of teamGen) {
  console.log(`  ${member.name} (${member.type})`);
}

console.log('TeamGenerator через spread:', [...teamGen].map((m) => m.name));