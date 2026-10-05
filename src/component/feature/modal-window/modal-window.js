import './modal-window.scss';

export function modalWindow(movesCount = 0, onRestart) {
  const overlay = document.createElement('div');
  overlay.className = 'modal__overlay';

  const modalElement = document.createElement('div');
  modalElement.className = 'modal';

  const winInfo = document.createElement('div');
  winInfo.className = 'modal__info';
  winInfo.textContent = `Количество ходов: ${movesCount}`;

  const winMessage = document.createElement('div');
  winMessage.className = 'modal__info';
  winMessage.textContent = `Мои поздравления! Ты нашел все одинаковые карточки!`;

  const newButtonModal = document.createElement('button');
  newButtonModal.className = 'modal__button';
  newButtonModal.type = 'button';
  newButtonModal.textContent = 'новая игра';

  newButtonModal.addEventListener('click', () => {
    overlay.remove();
    if (typeof onRestart === 'function') {
      onRestart();
    }
  });

  const closeButton = document.createElement('button');
  closeButton.className = 'modal__button';
  closeButton.type = 'button';
  closeButton.textContent = 'закрыть';

  modalElement.append(winInfo, winMessage, newButtonModal, closeButton);
  overlay.append(modalElement);

  closeButton.addEventListener('click', () => {
    overlay.remove();
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      overlay.remove();
    }
  });
  return overlay;
}
