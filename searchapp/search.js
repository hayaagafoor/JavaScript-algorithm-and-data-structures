const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const creatureWeight = document.getElementById('weight');
const creatureHeight = document.getElementById('height');
const creatureTypes = document.getElementById('types');
const creatureHp = document.getElementById('hp');
const creatureAttack = document.getElementById('attack');
const creatureDefense = document.getElementById('defense');
const creatureSpecialAttack = document.getElementById('special-attack');
const creatureSpecialDefense = document.getElementById('special-defense');
const creatureSpeed = document.getElementById('speed');

function clearFields() {
  creatureName.textContent = '';
  creatureId.textContent = '';
  creatureWeight.textContent = '';
  creatureHeight.textContent = '';
  creatureTypes.innerHTML = '';
  creatureHp.textContent = '';
  creatureAttack.textContent = '';
  creatureDefense.textContent = '';
  creatureSpecialAttack.textContent = '';
  creatureSpecialDefense.textContent = '';
  creatureSpeed.textContent = '';
}

function fillStats(statsArr) {
  for (const stat of statsArr) {
    switch (stat.name) {
      case 'hp':
        creatureHp.textContent = stat.base_stat;
        break;
      case 'attack':
        creatureAttack.textContent = stat.base_stat;
        break;
      case 'defense':
        creatureDefense.textContent = stat.base_stat;
        break;
      case 'special-attack':
        creatureSpecialAttack.textContent = stat.base_stat;
        break;
      case 'special-defense':
        creatureSpecialDefense.textContent = stat.base_stat;
        break;
      case 'speed':
        creatureSpeed.textContent = stat.base_stat;
        break;
    }
  }
}

async function searchCreature() {
  const value = searchInput.value.trim();
  if (!value) return;

  clearFields();

  try {
    const query = isNaN(value) ? value.toLowerCase() : value;
    const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`);

    if (!res.ok) throw new Error();

    const data = await res.json();

    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;
    creatureWeight.textContent = data.weight ? `Weight: ${data.weight}` : '';
    creatureHeight.textContent = data.height ? `Height: ${data.height}` : '';

    creatureTypes.innerHTML = '';
    data.types.forEach(typeObj => {
      const typeName = typeObj.type ? typeObj.type.name : typeObj.name;
      const div = document.createElement('div');
      div.textContent = typeName.toUpperCase();
      creatureTypes.appendChild(div);
    });

    fillStats(data.stats);

  } catch (e) {
    clearFields();
    alert('Creature not found');
  }
}

searchButton.addEventListener('click', searchCreature);
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') searchCreature();
});