const themes = {
  animals: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🦝",
    "🦋",
    "🐷",
    "🐢",
    "🐘",
    "🐳",
    "🦁",
    "🐠",
  ],
  technology: [
    "💻",
    "📱",
    "🖥",
    "🖨",
    "⌨️",
    "🕹",
    "🔋",
    "🔌",
    "🤖",
    "🎮",
    "💾",
    "🎧",
    "🖱️",
    "💽",
    "📷",
    "🖨️",
  ],
  emojis: [
    "😊",
    "😁",
    "😂",
    "🤣",
    "😃",
    "😄",
    "😅",
    "😆",
    "😉",
    "😙",
    "😏",
    "🤭",
    "🤫",
    "😝",
    "😎",
    "🤪",
  ],
  food: [
    "🍔",
    "🍛",
    "🥧",
    "🧁",
    "🍜",
    "🍕",
    "🥡",
    "🥟",
    "🍣",
    "🌭",
    "🥪",
    "🌯",
    "🧆",
    "🍲",
    "🥗",
    "🍙",
  ],
  sports: [
    "🧗",
    "🤺",
    "🏇",
    "🏂",
    "🏌️",
    "🏄",
    "🚣",
    "🏊",
    "⛹️",
    "🏋️",
    "🚴",
    "🤸",
    "🤼",
    "🤾",
    "🤹",
    "🧘",
  ],
};

const difficulties = {
  "4x4": [4, 4],
  "4x5": [4, 5],
  "4x6": [4, 6],
  "4x7": [4, 7],
  "4x8": [4, 8],
};

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let timer = 0;
let interval;

document.getElementById("startGame").addEventListener("click", startGame);

function startGame() {
  const theme = document.getElementById("theme").value;
  const difficulty = document.getElementById("difficulty").value;
  const [rows, cols] = difficulties[difficulty];
  const totalCards = rows * cols;

  // Selecciona los emojis aleatoriamente según la cantidad necesaria
  const selectedEmojis = themes[theme]
    .sort(() => Math.random() - 0.5)
    .slice(0, totalCards / 2);
  const icons = [...selectedEmojis, ...selectedEmojis]; // Duplicar para hacer las parejas
  icons.sort(() => Math.random() - 0.5);

  cards = icons.map((icon, index) => ({ id: index, icon, matched: false }));
  flippedCards = [];
  matchedPairs = 0;
  score = 0;
  timer = 0;

  document.getElementById("gameBoard").innerHTML = "";
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = timer;
  }, 1000);
  document.getElementById("score").textContent = score;

  document.getElementById(
    "gameBoard"
  ).className = `grid grid-cols-${cols} gap-4`;
  renderBoard();
}

function renderBoard() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add(
      "w-20",
      "h-28",
      "bg-gray-300",
      "flex",
      "justify-center",
      "items-center",
      "text-2xl",
      "font-bold",
      "cursor-pointer",
      "transition",
      "duration-300"
    );
    cardElement.dataset.id = card.id;
    cardElement.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(cardElement);
  });
}

function flipCard(card) {
  if (
    flippedCards.length < 2 &&
    !card.matched &&
    !flippedCards.includes(card)
  ) {
    flippedCards.push(card);
    updateBoard();
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function updateBoard() {
  const gameBoard = document.getElementById("gameBoard").children;
  Array.from(gameBoard).forEach((cardElement, index) => {
    const card = cards[index];
    if (flippedCards.includes(card)) {
      cardElement.textContent = card.icon;
      cardElement.classList.add(
        "bg-white",
        "text-4xl",
        "scale-110",
        "transition-transform",
        "duration-300"
      );
      cardElement.classList.remove("bg-gray-300");
      setTimeout(() => {
        cardElement.classList.remove("scale-110");
      }, 300);
    } else if (card.matched) {
      cardElement.textContent = card.icon;
      cardElement.classList.add("bg-green-300", "text-4xl");
      cardElement.classList.remove("bg-gray-300", "scale-110");
    } else {
      cardElement.textContent = "";
      cardElement.classList.add("bg-gray-300");
      cardElement.classList.remove("bg-white", "text-4xl", "scale-110");
    }
  });
}

function checkMatch() {
  if (flippedCards[0].icon === flippedCards[1].icon) {
    flippedCards.forEach((card) => (card.matched = true));
    matchedPairs++;
    score += 10;
  } else {
    score -= 2;
  }
  flippedCards = [];
  document.getElementById("score").textContent = score;
  updateBoard();
  if (matchedPairs === cards.length / 2) {
    clearInterval(interval);
    alert(`¡Felicidades! Terminaste en ${timer} segundos con ${score} puntos.`);
  }
}
