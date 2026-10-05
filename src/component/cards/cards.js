import './cards.scss';
import { modalWindow } from '../feature/modal-window/modal-window.js';

import capvincible from '../../assets/invincible-variants/capvincible.jpeg';
import gogglesvincible from '../../assets/invincible-variants/gogglesvincible.jpeg';
import hairvincible from '../../assets/invincible-variants/hairvincible.jpeg';
import hoodvincible from '../../assets/invincible-variants/hoodvincible.jpeg';
import movincihawk from '../../assets/invincible-variants/movincihawk.jpeg';
import mustachible from '../../assets/invincible-variants/mustachible.jpeg';
import wolfcutible from '../../assets/invincible-variants/wolfcutible.jpeg';
import omnivincible from '../../assets/invincible-variants/omnivincible.jpeg';

export function renderCards() {
  const existingCards = document.querySelector('.cards');
  if (existingCards) {
    existingCards.remove();
  }

  const invincibleVariables = [
    capvincible,
    gogglesvincible,
    hairvincible,
    hoodvincible,
    movincihawk,
    mustachible,
    wolfcutible,
    omnivincible,
  ];

  const doubledInvincibleVariants = [
    ...invincibleVariables,
    ...invincibleVariables,
  ].sort(() => 0.5 - Math.random());

  const scoreDisplay = document.querySelector('#score');
  if (scoreDisplay) {
    scoreDisplay.textContent = 'счет: 0';
  }

  const attemptDisplay = document.querySelector('#attempts');
  if (attemptDisplay) {
    attemptDisplay.textContent = 'попыток: 0';
  }

  let score = 0;
  let movesCount = 0;
  let firstCard = null;
  let lockBoard = false;
  let matchesFound = 0;
  const totalPairs = invincibleVariables.length;

  const mainElement = document.createElement('main');
  mainElement.className = 'cards';

  const cardsBoard = document.createElement('div');
  cardsBoard.className = 'cards__board';

  doubledInvincibleVariants.forEach((imgUrl) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.image = imgUrl;

    const imgElement = document.createElement('img');
    imgElement.className = 'card__image';
    imgElement.style.display = 'none';
    card.appendChild(imgElement);

    card.onclick = () => revealCard(card);
    cardsBoard.appendChild(card);
  });

  function revealCard(card) {
    if (lockBoard || card === firstCard || card.classList.contains('matched')) {
      return;
    }

    const cardImg = card.querySelector('.card__image');
    card.classList.add('revealed');
    cardImg.src = card.dataset.image;
    cardImg.style.display = 'block';

    if (!firstCard) {
      firstCard = card;
      return;
    }

    movesCount++;
    if (attemptDisplay) {
      attemptDisplay.textContent = `попыток: ${movesCount}`;
    }

    lockBoard = true;

    if (firstCard.dataset.image === card.dataset.image) {
      firstCard.classList.add('matched');
      card.classList.add('matched');
      score++;
      matchesFound++;

      if (scoreDisplay) {
        scoreDisplay.textContent = `счет: ${score}`;
      }

      if (matchesFound === totalPairs) {
        setTimeout(() => {
          const renderModal = modalWindow(movesCount, () => renderCards());
          document.body.append(renderModal);
        }, 200);
      }
      resetTurn();
    } else {
      setTimeout(() => {
        const firstImg = firstCard.querySelector('.card__image');

        firstCard.classList.remove('revealed');
        card.classList.remove('revealed');

        firstImg.style.display = 'none';
        cardImg.style.display = 'none';
        firstImg.src = '';
        cardImg.src = '';

        resetTurn();
      }, 800);
    }
  }

  function resetTurn() {
    [firstCard, lockBoard] = [null, false];
  }

  const newGameButton = document.querySelector('#new-button');
  if (newGameButton) {
    newGameButton.onclick = () => renderCards();
  }

  mainElement.append(cardsBoard);
  document.body.append(mainElement);
}

renderCards();
