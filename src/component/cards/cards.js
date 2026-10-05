import './cards.scss';
import { modalWindow } from '../feature/modal-window/modal-window.js';

export function renderCards() {
  // const emojis = ['🍎', '🍌', '🍇', '🍒', '🍉', '🍍', '🧐', '💣'];
  const emojis = ['🍎'];
  const doubledEmojis = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
  const scoreDisplay = document.querySelector('.header__score');

  let score = 0;
  let movesCount = 0;
  let firstCard = null;
  let lockBoard = false;
  let matchesFound = 0;
  const totalPairs = emojis.length;

  const mainElement = document.createElement('main');
  mainElement.className = 'cards';

  const cardsBoard = document.createElement('div');
  cardsBoard.className = 'cards__board';

  doubledEmojis.forEach((emoji) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.textContent = '';
    card.onclick = () => revealCard(card);
    cardsBoard.appendChild(card);
  });

  function revealCard(card) {
    if (lockBoard || card === firstCard || card.classList.contains('matched')) {
      return;
    }

    card.classList.add('revealed');
    card.textContent = card.dataset.emoji;

    // Клик по первой карточке
    if (!firstCard) {
      firstCard = card;
      return;
    }
    movesCount++;
    lockBoard = true;

    if (firstCard.dataset.emoji === card.dataset.emoji) {
      firstCard.classList.add('matched');
      card.classList.add('matched');
      score++;
      matchesFound++;

      if (scoreDisplay) {
        scoreDisplay.textContent = `счет: ${score}`;
      }

      if (matchesFound === totalPairs) {
        setTimeout(() => {
          const renderModal = modalWindow(movesCount);
          document.body.append(renderModal);
        }, 200);
      }
      resetTurn();
    } else {
      setTimeout(() => {
        firstCard.classList.remove('revealed');
        card.classList.remove('revealed');
        firstCard.textContent = '';
        card.textContent = '';
        resetTurn();
      }, 800);
    }
  }

  function resetTurn() {
    [firstCard, lockBoard] = [null, false];
  }

  mainElement.append(cardsBoard);
  document.body.append(mainElement);
}

renderCards();
