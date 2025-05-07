const gameOutput = document.getElementById("game-output");
const playerInput = document.getElementById("player-input");
const submitBtn = document.getElementById("submit-btn");

let gameState = {
  currentLevel: 1,
  inventory: [],
  health: 100,
};

const levels = {
  1: {
    description: "You are standing in a dark forest. Paths lead to the north and east.",
    actions: {
      north: "You find a river. You drink some water and recover health.",
      east: "You encounter a goblin! Fight or run?",
      fight: "You defeat the goblin and find a mystical key.",
      run: "You escape but lose some health.",
    },
    nextLevel: 2,
  },
  2: {
    description: "You arrive at a cave entrance. It's dark inside.",
    actions: {
      enter: "You find treasure but encounter a sleeping dragon. Sneak or attack?",
      sneak: "You successfully steal some treasure without waking the dragon.",
      attack: "The dragon wakes up and breathes fire. You barely escape with your life.",
    },
    nextLevel: 3,
  },
  3: {
    description: "You reach the Mystic Temple. A guardian blocks your way.",
    actions: {
      showKey: "The guardian lets you pass. You win!",
      fight: "The guardian defeats you easily. Game over.",
    },
    nextLevel: null,
  },
};

function updateGameOutput(text) {
  const p = document.createElement("p");
  p.textContent = text;
  gameOutput.appendChild(p);
  gameOutput.scrollTop = gameOutput.scrollHeight;
}

function processInput(input) {
  const currentLevel = levels[gameState.currentLevel];
  const action = currentLevel.actions[input.toLowerCase()];

  if (action) {
    updateGameOutput(action);
    if (input.toLowerCase() === "fight" && gameState.currentLevel === 1) {
      gameState.inventory.push("Mystical Key");
    }
    if (input.toLowerCase() === "showKey" && gameState.inventory.includes("Mystical Key")) {
      gameState.currentLevel = currentLevel.nextLevel;
      updateGameOutput("You have completed the Quest of the Mystic Realms!");
    } else if (currentLevel.nextLevel) {
      gameState.currentLevel = currentLevel.nextLevel;
    }
  } else {
    updateGameOutput("Invalid action. Try again.");
  }
}

submitBtn.addEventListener("click", () => {
  const input = playerInput.value.trim();
  if (input) {
    processInput(input);
    playerInput.value = "";
  }
});

updateGameOutput(levels[gameState.currentLevel].description);