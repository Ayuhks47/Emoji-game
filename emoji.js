const emojiDetails = [
    { description: "Smiling face with sunglasses", emoji: '😎' },
    { description: "Thumbs up", emoji: "👍" },
    { description: "Heart eyes", emoji: "😍" },
    { description: "Crying face", emoji: "😢" },
    { description: "Party popper", emoji: "🎉" },
    // Add more emoji descriptions here
  ];
  
  let currentEmojiIndex = 0;
  let score = 0;
  let seconds = 30;
  let timer;
  
  const timerElement = document.getElementById("timer");
  const guessInput = document.getElementById("guess-input");
  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  const restartButton = document.getElementById("restart-button");
  
  function displayEmoji() {
    const descriptionElement = document.getElementById("description");
    descriptionElement.innerHTML = emojiDetails[currentEmojiIndex].emoji;
    timerElement.textContent = `Time: ${seconds}s`;
  }
  
  function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    const correctEmoji = emojiDetails[currentEmojiIndex].description.trim().toLowerCase();
  
    if (guess === correctEmoji) {
      resultElement.textContent = "Correct!";
      score++;
    } else {
      resultElement.textContent = "Wrong!";
    }
  
    scoreElement.textContent = `Score: ${score}`;
    guessInput.value = "";
    guessInput.focus();
    nextEmoji();
  }
  
  function nextEmoji() {
    currentEmojiIndex++;
    setTimeout(() => {
      resultElement.textContent = "";
    }, 1000);
  
    if (currentEmojiIndex === emojiDetails.length) {
      currentEmojiIndex = 0;
      score = 0;
    }
  
    displayEmoji();
  }
  
  document.getElementById("guess-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkGuess();
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    shuffleEmojis();
    displayEmoji();
    startTimer();
  });
  
  function startTimer() {
    timer = setInterval(() => {
      seconds--;
      timerElement.textContent = `Time: ${seconds}s`;
  
      if (seconds <= 0) {
        endGame();
      }
    }, 1000);
  }
  
  function endGame() {
    clearInterval(timer);
    guessInput.disabled = true;
    timerElement.textContent = "Time's up!";
    restartButton.style.display = "inline-block";
  }
  
  function restartGame() {
    currentEmojiIndex = 0;
    score = 0;
    seconds = 30;
    guessInput.disabled = false;
    guessInput.value = "";
    resultElement.textContent = "";
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${seconds}s`;
    restartButton.style.display = "none";
    shuffleEmojis();
    displayEmoji();
    startTimer();
  }
  
  function shuffleEmojis() {
    for (let i = emojiDetails.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [emojiDetails[i], emojiDetails[j]] = [emojiDetails[j], emojiDetails[i]];
    }
  }
  