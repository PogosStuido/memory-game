//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/component/header/header.js
function renderHeader() {
	const headerElement = document.createElement("header");
	headerElement.className = "header";
	const buttonWrapper = document.createElement("div");
	buttonWrapper.className = "header__wrapper";
	const newGameButton = document.createElement("button");
	newGameButton.className = "header__button";
	newGameButton.id = "new-button";
	newGameButton.type = "button";
	newGameButton.innerText = "новая игра";
	const tableButton = document.createElement("button");
	tableButton.className = "header__button";
	tableButton.type = "button";
	tableButton.innerText = "таблица лидеров";
	const score = document.createElement("div");
	score.className = "header__score";
	score.id = "score";
	score.type = "button";
	score.innerText = "счет: 0";
	const attempts = document.createElement("div");
	attempts.className = "header__score";
	attempts.id = "attempts";
	attempts.type = "button";
	attempts.innerText = "попыток: 0";
	buttonWrapper.append(newGameButton, tableButton, attempts, score);
	headerElement.append(buttonWrapper);
	document.body.append(headerElement);
}
renderHeader();
//#endregion
//#region src/component/feature/modal-window/modal-window.js
function modalWindow(movesCount = 0, onRestart) {
	const overlay = document.createElement("div");
	overlay.className = "modal__overlay";
	const modalElement = document.createElement("div");
	modalElement.className = "modal";
	const winInfo = document.createElement("div");
	winInfo.className = "modal__info";
	winInfo.textContent = `Количество ходов: ${movesCount}`;
	const winMessage = document.createElement("div");
	winMessage.className = "modal__info";
	winMessage.textContent = `Мои поздравления! Ты нашел все одинаковые карточки!`;
	const newButtonModal = document.createElement("button");
	newButtonModal.className = "modal__button";
	newButtonModal.type = "button";
	newButtonModal.textContent = "новая игра";
	newButtonModal.addEventListener("click", () => {
		overlay.remove();
		if (typeof onRestart === "function") onRestart();
	});
	const closeButton = document.createElement("button");
	closeButton.className = "modal__button";
	closeButton.type = "button";
	closeButton.textContent = "закрыть";
	modalElement.append(winInfo, winMessage, newButtonModal, closeButton);
	overlay.append(modalElement);
	closeButton.addEventListener("click", () => {
		overlay.remove();
	});
	overlay.addEventListener("click", (event) => {
		if (event.target === overlay) overlay.remove();
	});
	return overlay;
}
//#endregion
//#region src/component/cards/cards.js
function renderCards() {
	const existingCards = document.querySelector(".cards");
	if (existingCards) existingCards.remove();
	const emojis = [
		"🍎",
		"🍌",
		"🍇",
		"🍒",
		"🍉",
		"🍍",
		"🧐",
		"💣"
	];
	const doubledEmojis = [...emojis, ...emojis].sort(() => .5 - Math.random());
	const scoreDisplay = document.querySelector("#score");
	if (scoreDisplay) scoreDisplay.textContent = "счет: 0";
	const attemptDisplay = document.querySelector("#attempts");
	if (attemptDisplay) attemptDisplay.textContent = "попыток: 0";
	let score = 0;
	let movesCount = 0;
	let firstCard = null;
	let lockBoard = false;
	let matchesFound = 0;
	const totalPairs = emojis.length;
	const mainElement = document.createElement("main");
	mainElement.className = "cards";
	const cardsBoard = document.createElement("div");
	cardsBoard.className = "cards__board";
	doubledEmojis.forEach((emoji) => {
		const card = document.createElement("div");
		card.className = "card";
		card.dataset.emoji = emoji;
		card.textContent = "";
		card.onclick = () => revealCard(card);
		cardsBoard.appendChild(card);
	});
	function revealCard(card) {
		if (lockBoard || card === firstCard || card.classList.contains("matched")) return;
		card.classList.add("revealed");
		card.textContent = card.dataset.emoji;
		if (!firstCard) {
			firstCard = card;
			return;
		}
		movesCount++;
		if (attemptDisplay) attemptDisplay.textContent = `попыток: ${movesCount}`;
		lockBoard = true;
		if (firstCard.dataset.emoji === card.dataset.emoji) {
			firstCard.classList.add("matched");
			card.classList.add("matched");
			score++;
			matchesFound++;
			if (scoreDisplay) scoreDisplay.textContent = `счет: ${score}`;
			if (matchesFound === totalPairs) setTimeout(() => {
				const renderModal = modalWindow(movesCount, () => renderCards());
				document.body.append(renderModal);
			}, 200);
			resetTurn();
		} else setTimeout(() => {
			firstCard.classList.remove("revealed");
			card.classList.remove("revealed");
			firstCard.textContent = "";
			card.textContent = "";
			resetTurn();
		}, 800);
	}
	function resetTurn() {
		[firstCard, lockBoard] = [null, false];
	}
	document.querySelector("#new-button").addEventListener("click", () => {
		renderCards();
	});
	mainElement.append(cardsBoard);
	document.body.append(mainElement);
}
renderCards();
//#endregion

//# sourceMappingURL=index-BNu4tfHN.js.map