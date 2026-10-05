import './header.scss';

export function renderHeader() {
  const headerElement = document.createElement('header');
  headerElement.className = 'header';

  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'header__wrapper';

  const newGameButton = document.createElement('button');
  newGameButton.className = 'header__button';
  newGameButton.id = 'new-button';
  newGameButton.type = 'button';
  newGameButton.innerText = 'новая игра';

  const tableButton = document.createElement('button');
  tableButton.className = 'header__button';
  tableButton.type = 'button';
  tableButton.innerText = 'таблица лидеров';

  const score = document.createElement('div');
  score.className = 'header__score';
  score.type = 'button';
  score.innerText = 'счет: 0';

  buttonWrapper.append(newGameButton, tableButton);
  headerElement.append(buttonWrapper, score);
  document.body.append(headerElement);
}

renderHeader();
