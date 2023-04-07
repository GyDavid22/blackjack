"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function newDeck(count = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${count}`)
            .then((r) => r.json()).catch(() => errorMessageDeckOfCardsApi());
    });
}
class Game {
    constructor(deck) {
        this.userHand = new Array();
        this.dealerHand = new Array();
        this.cardCount = 0;
        this.showFirst = false;
        this.deck = deck;
        this.remaining = deck.remaining;
        this.hidden = document.createElement("img");
        this.hiddenCard = {};
        this.start();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.putCardToContainer("PLAYER", 2);
            yield this.putCardToContainer("DEALER", 2);
            $("#hit-button").removeAttr("disabled");
            $("#stand-button").removeAttr("disabled");
        });
    }
    pickCard(count, hand) {
        return __awaiter(this, void 0, void 0, function* () {
            let cards = new Array();
            yield fetch(`https://deckofcardsapi.com/api/deck/${this.deck.deck_id}/draw/?count=${count}`)
                .then((r) => r.json()).then((r) => {
                if (this.remaining === r.remaining) {
                    throw new Error(); // Probably we got the same response more times, happened during testing
                }
                this.remaining = this.remaining < r.remaining ? this.remaining : r.remaining;
                for (let i = 0; i < r.cards.length; i++) {
                    hand.push(r.cards[i]);
                    cards.push(r.cards[i]);
                }
            }).catch(() => errorMessageDeckOfCardsApi());
            return cards;
        });
    }
    hit() {
        return __awaiter(this, void 0, void 0, function* () {
            $("#hit-button").attr("disabled", "");
            $("#stand-button").attr("disabled", "");
            yield this.putCardToContainer("PLAYER", 1);
            let value = this.getHandValue(this.userHand);
            if (value <= 21) {
                pageDiv.on("animationend", () => {
                    pageDiv.off("animationend");
                    $("#hit-button").removeAttr("disabled");
                    $("#stand-button").removeAttr("disabled");
                });
            }
            else {
                pageDiv.on("animationend", () => {
                    pageDiv.off("animationend");
                    $("#return-button").removeAttr("hidden");
                });
            }
        });
    }
    stand() {
        return __awaiter(this, void 0, void 0, function* () {
            this.showFirst = true;
            this.hidden.src = this.hiddenCard.image;
            $("#hit-button").attr("disabled", "");
            $("#stand-button").attr("disabled", "");
            this.dealerMove();
        });
    }
    dealerMove() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.getHandValue(this.dealerHand) <= this.getHandValue(this.userHand) && this.getHandValue(this.dealerHand) < 21) {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.putCardToContainer("DEALER", 1);
                    let value = this.getHandValue(this.dealerHand);
                    if (value <= 21) {
                        console.log(`Dealer's good: ${value}`);
                    }
                    else {
                        console.log(`Dealer's f*cked: ${value}`);
                    }
                    this.dealerMove();
                }), 1000);
            }
            else {
                console.log("Time to evaluate");
                pageDiv.on("animationend", () => {
                    pageDiv.off("animationend");
                    $("#return-button").removeAttr("hidden");
                });
            }
        });
    }
    putCardToContainer(container, count) {
        return __awaiter(this, void 0, void 0, function* () {
            let hand;
            let animation;
            switch (container) {
                case "DEALER":
                    hand = this.dealerHand;
                    animation = "fadeInUp";
                    break;
                case "PLAYER":
                    hand = this.userHand;
                    animation = "fadeInDown";
                    break;
                default:
                    return;
            }
            let musthide = false;
            if (!this.showFirst && this.dealerHand.length === 0 && container === "DEALER") {
                musthide = true;
            }
            let cards = yield this.pickCard(count, hand);
            let loadedCount = 0;
            let cardImgs = new Array();
            for (let i = 0; i < cards.length; i++) {
                let cardImg = new Image();
                cardImg.src = cards[i].image;
                cardImg.classList.add("animate__animated", `animate__${animation}`);
                cardImg.id = `card_${this.cardCount}`;
                cardImg.title = `${cards[i].value} of ${cards[i].suit}`;
                if (musthide) {
                    cardImg.src = "https://deckofcardsapi.com/static/img/back.png";
                    cardImg.title = "";
                    this.hidden = cardImg;
                    this.hiddenCard = cards[i];
                    musthide = false;
                }
                cardImgs.push(cardImg);
                let myContainer = $(`#${container.toLowerCase()}_container`);
                let me = $(cardImg);
                me.on("load", () => {
                    loadedCount++;
                    if (loadedCount === cards.length) {
                        for (let j = 0; j < cardImgs.length; j++) {
                            myContainer.append(cardImgs[j]);
                        }
                    }
                });
                me.on("animationend", () => {
                    me.off();
                    me.removeClass(`animate__animated animate__${animation}`);
                });
                this.cardCount++;
            }
            if (container === "DEALER") {
                $("#dealer-value").text(`/\\ ${this.getHandValue(this.dealerHand)}`);
            }
            else {
                $("#user-value").text(`\\/ ${this.getHandValue(this.userHand)}`);
            }
        });
    }
    getHandValue(hand) {
        let sumValue = 0;
        let aces = 0;
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].value === "KING" || hand[i].value === "QUEEN" || hand[i].value === "JACK") {
                sumValue += 10;
            }
            else if (hand[i].value === "ACE") {
                sumValue += 11;
                aces++;
            }
            else {
                sumValue += Number.parseInt(hand[i].value);
            }
            if (!this.showFirst && hand === this.dealerHand && i === 0) {
                sumValue = 0;
            }
        }
        if (sumValue > 21) {
            let i = 0;
            while (sumValue > 21 && i < aces) {
                sumValue -= 10;
                i++;
            }
        }
        return sumValue;
    }
}
let gameDebug;
function gameScreen() {
    let gameScreenText = `<div class="h-100 d-flex justify-content-center align-items-end card-container" id="dealer_container">
</div>
<div class="h-auto d-flex justify-content-center align-items-center my-2 control-container">
<p id="dealer-value"></p>
<button type="button" class="btn btn-primary" id="hit-button" disabled>Hit</button>
<button type="button" class="btn btn-primary" id="return-button" hidden>Return</button>
<button type="button" class="btn btn-primary" id="stand-button" disabled>Stand</button>
<p id="user-value"></p>
</div>
<div class="h-100 d-flex justify-content-center align-items-start card-container" id="player_container">
</div>`;
    pageDiv.append(gameScreenText);
    newDeck(1).then((r) => {
        gameDebug = new Game(r);
        $("#hit-button").on("click", () => {
            gameDebug.hit();
        });
        $("#stand-button").on("click", () => {
            gameDebug.stand();
        });
    });
    $("#return-button").on("click", () => {
        screenSwitch(mainScreen);
    });
}
class LanguageTexts {
    constructor() {
        this.language = "Language";
        this.english = "English";
        this.hungarian = "Hungarian";
        this.changelog = "Changelog";
        this.wip = "Work in progress";
        this.github = "GitHub";
        this.author = "David Gyenes";
        this.year = "2023";
        this.lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in pellentesque sem. Vestibulum semper purus sed nunc ultrices ullamcorper. Nullam blandit, lorem non rutrum volutpat, lacus magna dapibus ante, in tincidunt odio eros nec purus. Ut mattis rhoncus enim, quis ultrices mauris blandit ut. Proin hendrerit dictum egestas. Integer nec quam vel dui consectetur tempor sed sit amet est. Maecenas id libero non mi volutpat posuere a quis nisi. Maecenas eleifend semper nibh fringilla lobortis. Nulla hendrerit congue lorem, non facilisis nunc tempor ac. Duis at laoreet augue, at luctus leo. Sed libero ligula, posuere et arcu in, varius molestie ante. Vivamus porttitor suscipit ultrices. Fusce dapibus arcu a libero efficitur, ut commodo leo vulputate. Etiam et nisl sed dui tempor elementum. Mauris sit amet sapien mattis, finibus lacus scelerisque, venenatis erat. In vitae magna fringilla, varius nulla ac, cursus est. Proin luctus augue eget erat condimentum pharetra. Curabitur pharetra dui ut efficitur semper. Vestibulum metus nunc, tempus vel blandit at, maximus rutrum erat. Morbi dui ante, dapibus finibus ante vel, volutpat scelerisque libero. Duis non dapibus urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec tempor lorem a mauris consequat, cursus condimentum nunc dapibus. Aenean fermentum ex in felis tincidunt luctus. Etiam hendrerit enim sit amet pulvinar consectetur. Donec blandit venenatis posuere. Morbi tincidunt, ante eu tempor semper, felis dolor accumsan sapien, sed ornare ligula elit nec dolor. Cras vestibulum ipsum sed felis fringilla facilisis. Curabitur et fringilla est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae tincidunt augue. Suspendisse ultrices luctus dolor nec egestas. Aliquam vehicula efficitur purus ut sodales. Quisque volutpat turpis id augue interdum, quis cursus diam rutrum. In nec nunc libero. Vestibulum nec pellentesque eros, in viverra odio. Aliquam a ultrices dolor. Donec interdum nisi nec lectus tincidunt maximus. Nunc quis ligula vitae urna pulvinar interdum. Ut iaculis quis leo at posuere. Vivamus leo eros, egestas eget finibus non, ultrices non mauris. Nam lacinia velit elit, non interdum massa sagittis pulvinar. Mauris vel lorem massa. Aliquam condimentum nisl non ipsum interdum venenatis sit amet ac massa. Nulla facilisi. Aliquam at est lectus. In imperdiet, sapien id vehicula commodo, dui elit aliquet mi, vitae blandit felis odio at erat. Pellentesque quis fermentum nibh. Etiam sit amet scelerisque metus, eu aliquam lorem. Pellentesque gravida mollis ligula sed maximus. Fusce eu tempor est, ac congue libero. Fusce aliquam semper aliquet. Suspendisse sollicitudin in nisl vel eleifend.";
        this.ok = "Ok";
        this.startGame = "Start game";
        this.errorDeckOfCardsAPI = "There was an error in communicating with Deck of Cards API. Please try again and see if the issue persist.";
        this.errorModalTitle = "Error";
    }
}
class English extends LanguageTexts {
}
class Hungarian extends LanguageTexts {
    constructor() {
        super(...arguments);
        this.language = "Nyelv";
        this.english = "Angol";
        this.hungarian = "Magyar";
        this.changelog = "Változásnapló";
        this.wip = "Fejlesztés alatt";
        this.author = "Gyenes Dávid";
        this.startGame = "Játék";
        this.errorDeckOfCardsAPI = "Hiba történt a Deck of Cards API-val való kommunikáció során. Kérlek, próbáld újra, és ellenőrizd, hogy a hiba továbbra is fennáll-e.";
        this.errorModalTitle = "Hiba";
    }
}
function mainScreen() {
    let mainScreenHtml = `<header class="d-flex flex-column flex-md-row h-auto w-100">
<div class="col-12 col-md-1 d-flex align-items-center justify-content-center justify-content-md-start p-1 p-md-0"><a href="#" data-bs-toggle="modal" data-bs-target="#changelog-modal" id="changelog-text">${language.changelog}</a></div>
<div class="col-12 col-md-10 banner-text d-flex align-items-center justify-content-center p-1 p-md-0">
    <h1>♠ Blackjack ♠</h1>
</div>
<div class="col-12 col-md-1 d-flex align-items-center justify-content-center justify-content-md-end p-1 p-md-0" id="langselector">
    <select class="form-select-sm" id="lang" title="language">
        <option disabled="" selected="">${language.language}</option>
        <option value="en">${language.english}</option>
        <option value="hu">${language.hungarian}</option>
    </select>
</div>
</header>
<div class="flex-grow-1 d-flex justify-content-center align-items-center">
<button type="button" class="btn btn-primary" id="start-game-button">${language.startGame}</button>
</div>
<footer class="d-flex h-auto w-100">
<div class="col-6 d-flex align-items-center"><a href="https://github.com/GyDavid22/blackjack">${language.github}</a></div>
<div class="col-6 d-flex align-items-center justify-content-end">${language.author}, ${language.year}</div>
</footer>
<div class="modal fade" tabindex="-1" id="changelog-modal">
<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">${language.changelog}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>${language.lipsum}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">${language.ok}</button>
        </div>
    </div>
</div>
</div>`;
    pageDiv.append(mainScreenHtml);
    let lang = $("#lang");
    lang.on("change", (e) => __awaiter(this, void 0, void 0, function* () {
        lang.off();
        let select = e.target;
        setLanguage(select.value);
        pageDiv.empty();
        mainScreen();
    }));
    $("#changelog-text").on("click", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
    }));
    let startGameButton = $("#start-game-button");
    startGameButton.on("click", (e) => __awaiter(this, void 0, void 0, function* () {
        startGameButton.off(); // To prevent multiple clicks until the animation isn't finished
        screenSwitch(gameScreen);
    }));
}
let language;
const pageDiv = $("#page");
getLanguage();
function setLanguage(code) {
    switch (code) {
        case "en":
            language = new English();
            break;
        case "hu":
            language = new Hungarian();
            break;
        default:
            language = new English();
            code = "en";
            break;
    }
    localStorage.setItem("language", code);
}
function getLanguage() {
    let setLang = localStorage.getItem("language");
    if (setLang == null) {
        setLanguage(navigator.language);
    }
    else {
        setLanguage(setLang);
    }
}
function screenSwitch(nextScreen, justIn = false) {
    $(".modal-backdrop").remove();
    if (justIn) {
        fadeIn();
        nextScreen();
    }
    else {
        fadeOutAndNext(nextScreen);
    }
}
function fadeIn() {
    pageDiv.addClass("animate__animated animate__fadeIn");
    pageDiv.on("animationend", () => {
        pageDiv.off();
        pageDiv.removeClass("animate__animated animate__fadeIn");
    });
}
function fadeOutAndNext(nextScreen) {
    pageDiv.addClass("animate__animated animate__fadeOut");
    pageDiv.on("animationend", () => {
        pageDiv.off();
        pageDiv.empty();
        pageDiv.removeClass("animate__animated animate__fadeOut");
        fadeIn();
        nextScreen();
    });
}
function errorMessageDeckOfCardsApi() {
    let errorModal = `<div id="error-modal-container">
    <button data-bs-toggle="modal" data-bs-target="#error-modal" id="hidden-opener" hidden></button>
    <div class="modal fade" tabindex="-1" id="error-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${language.errorModalTitle}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>${language.errorDeckOfCardsAPI}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"
                        data-bs-dismiss="modal">${language.ok}</button>
                </div>
            </div>
        </div>
    </div>
</div>`;
    pageDiv.append(errorModal);
    document.getElementById("hidden-opener").click();
    let errorModalDiv = $("#error-modal-container");
    errorModalDiv.on("hidden.bs.modal", () => {
        errorModalDiv.off();
        errorModalDiv.remove();
    });
}
screenSwitch(mainScreen, true);
