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
//#region src/assets/invincible-variants/capvincible.jpeg
var capvincible_default = new URL("capvincible-Bx66WAXt.jpeg", import.meta.url).href;
//#endregion
//#region src/assets/invincible-variants/gogglesvincible.jpeg
var gogglesvincible_default = new URL("gogglesvincible-CBQOFkuD.jpeg", import.meta.url).href;
//#endregion
//#region src/assets/invincible-variants/hairvincible.jpeg
var hairvincible_default = new URL("hairvincible-DiHTYDV0.jpeg", import.meta.url).href;
//#endregion
//#region src/assets/invincible-variants/hoodvincible.jpeg
var hoodvincible_default = new URL("hoodvincible-B-z5rv7e.jpeg", import.meta.url).href;
//#endregion
//#region src/assets/invincible-variants/movincihawk.jpeg
var movincihawk_default = new URL("movincihawk-BxqXD4Pw.jpeg", import.meta.url).href;
//#endregion
//#region src/assets/invincible-variants/mustachible.jpeg
var mustachible_default = new URL("mustachible-B7ptGuGj.jpeg", import.meta.url).href;
//#endregion
//#region src/assets/invincible-variants/wolfcutible.jpeg
var wolfcutible_default = new URL("wolfcutible-i1f5XWwe.jpeg", import.meta.url).href;
//#endregion
//#region src/assets/invincible-variants/omnivincible.jpeg
var omnivincible_default = new URL("omnivincible-CC4aYptd.jpeg", import.meta.url).href;
//#endregion
//#region src/component/cards/cards.js
function renderCards() {
	const existingCards = document.querySelector(".cards");
	if (existingCards) existingCards.remove();
	const invincibleVariables = [
		capvincible_default,
		gogglesvincible_default,
		hairvincible_default,
		hoodvincible_default,
		movincihawk_default,
		mustachible_default,
		wolfcutible_default,
		omnivincible_default
	];
	const doubledInvincibleVariants = [...invincibleVariables, ...invincibleVariables].sort(() => .5 - Math.random());
	const scoreDisplay = document.querySelector("#score");
	if (scoreDisplay) scoreDisplay.textContent = "счет: 0";
	const attemptDisplay = document.querySelector("#attempts");
	if (attemptDisplay) attemptDisplay.textContent = "попыток: 0";
	let score = 0;
	let movesCount = 0;
	let firstCard = null;
	let lockBoard = false;
	let matchesFound = 0;
	const totalPairs = invincibleVariables.length;
	const mainElement = document.createElement("main");
	mainElement.className = "cards";
	const cardsBoard = document.createElement("div");
	cardsBoard.className = "cards__board";
	doubledInvincibleVariants.forEach((imgUrl) => {
		const card = document.createElement("div");
		card.className = "card";
		card.dataset.image = imgUrl;
		const imgElement = document.createElement("img");
		imgElement.className = "card__image";
		imgElement.style.display = "none";
		card.appendChild(imgElement);
		card.onclick = () => revealCard(card);
		cardsBoard.appendChild(card);
	});
	function revealCard(card) {
		if (lockBoard || card === firstCard || card.classList.contains("matched")) return;
		const cardImg = card.querySelector(".card__image");
		card.classList.add("revealed");
		cardImg.src = card.dataset.image;
		cardImg.style.display = "block";
		if (!firstCard) {
			firstCard = card;
			return;
		}
		movesCount++;
		if (attemptDisplay) attemptDisplay.textContent = `попыток: ${movesCount}`;
		lockBoard = true;
		if (firstCard.dataset.image === card.dataset.image) {
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
			const firstImg = firstCard.querySelector(".card__image");
			firstCard.classList.remove("revealed");
			card.classList.remove("revealed");
			firstImg.style.display = "none";
			cardImg.style.display = "none";
			firstImg.src = "";
			cardImg.src = "";
			resetTurn();
		}, 800);
	}
	function resetTurn() {
		[firstCard, lockBoard] = [null, false];
	}
	const newGameButton = document.querySelector("#new-button");
	if (newGameButton) newGameButton.onclick = () => renderCards();
	mainElement.append(cardsBoard);
	document.body.append(mainElement);
}
renderCards();
//#endregion

//# sourceMappingURL=index-D0yQF8Va.js.map