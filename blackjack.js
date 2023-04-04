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
function newDeck() {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then((r) => r.json()).catch(() => errorMessageDeckOfCardsApi());
        ;
    });
}
class Game {
    constructor(deck) {
        this.deck = deck;
        this.userHand = new Array();
        this.dealerHand = new Array();
        this.remaining = deck.remaining;
        console.log(deck);
        this.pickCard(2, this.userHand);
        this.pickCard(2, this.dealerHand);
    }
    pickCard(count, hand) {
        return __awaiter(this, void 0, void 0, function* () {
            fetch(`https://deckofcardsapi.com/api/deck/${this.deck.deck_id}/draw/?count=${count}`)
                .then((r) => r.json()).then((r) => {
                this.remaining = this.remaining < r.remaining ? this.remaining : r.remaining;
                for (let index = 0; index < r.cards.length; index++) {
                    hand.push(r.cards[index]);
                    console.log(r.cards[index]);
                }
            }).catch(() => errorMessageDeckOfCardsApi());
        });
    }
}
function gameScreen() {
    let gameScreenText = `<div class="h-100 d-flex justify-content-center align-items-center">
<p id=countdown></p>
</div>`;
    $("#page").empty();
    $("#page").append(gameScreenText);
    newDeck().then((r) => new Game(r));
    for (let index = 0; index < 5; index++) {
        setTimeout(() => {
            $("#countdown").text(`${5 - index}`);
        }, 1000 * index);
    }
    setTimeout(() => { screenSwitch(mainScreen); }, 5000);
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
<div class="h-100 d-flex justify-content-center align-items-center">
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
    $("#page").append(mainScreenHtml);
    $("#lang").on("change", (e) => __awaiter(this, void 0, void 0, function* () {
        $("#lang").off();
        let select = e.target;
        setLanguage(select.value);
        $("#page").empty();
        mainScreen();
    }));
    $("#changelog-text").on("click", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
    }));
    $("#start-game-button").on("click", (e) => __awaiter(this, void 0, void 0, function* () {
        screenSwitch(gameScreen);
    }));
}
let language;
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
    if (justIn) {
        fadeIn();
        nextScreen();
    }
    else {
        fadeOutAndNext(nextScreen);
    }
}
function fadeIn() {
    $("#page").addClass("animate__animated animate__fadeIn");
    $("#page").on("animationend", () => {
        $("#page").off();
        $("#page").removeClass("animate__animated animate__fadeIn");
    });
}
function fadeOutAndNext(nextScreen) {
    $("#page").addClass("animate__animated animate__fadeOut");
    $("#page").on("animationend", () => {
        $("#page").off();
        $("#page").empty();
        $("#page").removeClass("animate__animated animate__fadeOut");
        fadeIn();
        nextScreen();
    });
}
function errorMessageDeckOfCardsApi() {
    let errorModal = `<div class="modal fade" tabindex="-1" id="error-modal">
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
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">${language.ok}</button>
    </div>
</div>
</div>
<button data-bs-toggle="modal" data-bs-target="#error-modal" id="hidden-opener" hidden></button>
</div>
`;
    $("#page").append(errorModal);
    $("#hidden-opener").click();
    $("#error-modal").on("hidden.bs.modal", () => {
        $("#error-modal").off();
        $("#error-modal").remove();
    });
}
screenSwitch(mainScreen, true);
