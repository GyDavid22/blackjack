"use strict";
class LanguageTexts {
    constructor() {
        this.language = "Language";
        this.english = "English";
        this.hungarian = "Hungarian";
        this.changelog = "Changelog";
        this.wip = "Work in progress";
        this.github = "Github";
        this.author = "David Gyenes";
        this.year = "2023";
        this.ok = "Ok";
    }
}
LanguageTexts.lipsum = "";
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
    }
}
LanguageTexts.lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in pellentesque sem. Vestibulum semper purus sed nunc ultrices ullamcorper. Nullam blandit, lorem non rutrum volutpat, lacus magna dapibus ante, in tincidunt odio eros nec purus. Ut mattis rhoncus enim, quis ultrices mauris blandit ut. Proin hendrerit dictum egestas. Integer nec quam vel dui consectetur tempor sed sit amet est. Maecenas id libero non mi volutpat posuere a quis nisi. Maecenas eleifend semper nibh fringilla lobortis. Nulla hendrerit congue lorem, non facilisis nunc tempor ac. Duis at laoreet augue, at luctus leo. Sed libero ligula, posuere et arcu in, varius molestie ante. Vivamus porttitor suscipit ultrices. Fusce dapibus arcu a libero efficitur, ut commodo leo vulputate. Etiam et nisl sed dui tempor elementum. Mauris sit amet sapien mattis, finibus lacus scelerisque, venenatis erat. In vitae magna fringilla, varius nulla ac, cursus est. Proin luctus augue eget erat condimentum pharetra. Curabitur pharetra dui ut efficitur semper. Vestibulum metus nunc, tempus vel blandit at, maximus rutrum erat. Morbi dui ante, dapibus finibus ante vel, volutpat scelerisque libero. Duis non dapibus urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec tempor lorem a mauris consequat, cursus condimentum nunc dapibus. Aenean fermentum ex in felis tincidunt luctus. Etiam hendrerit enim sit amet pulvinar consectetur. Donec blandit venenatis posuere. Morbi tincidunt, ante eu tempor semper, felis dolor accumsan sapien, sed ornare ligula elit nec dolor. Cras vestibulum ipsum sed felis fringilla facilisis. Curabitur et fringilla est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae tincidunt augue. Suspendisse ultrices luctus dolor nec egestas. Aliquam vehicula efficitur purus ut sodales. Quisque volutpat turpis id augue interdum, quis cursus diam rutrum. In nec nunc libero. Vestibulum nec pellentesque eros, in viverra odio. Aliquam a ultrices dolor. Donec interdum nisi nec lectus tincidunt maximus. Nunc quis ligula vitae urna pulvinar interdum. Ut iaculis quis leo at posuere. Vivamus leo eros, egestas eget finibus non, ultrices non mauris. Nam lacinia velit elit, non interdum massa sagittis pulvinar. Mauris vel lorem massa. Aliquam condimentum nisl non ipsum interdum venenatis sit amet ac massa. Nulla facilisi. Aliquam at est lectus. In imperdiet, sapien id vehicula commodo, dui elit aliquet mi, vitae blandit felis odio at erat. Pellentesque quis fermentum nibh. Etiam sit amet scelerisque metus, eu aliquam lorem. Pellentesque gravida mollis ligula sed maximus. Fusce eu tempor est, ac congue libero. Fusce aliquam semper aliquet. Suspendisse sollicitudin in nisl vel eleifend.";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let language;
getLanguage();
function main() {
    mainScreen();
}
function mainScreen() {
    $("#page").empty();
    const mainScreenHtml = `<header class="d-flex flex-column flex-md-row h-auto w-100">
<div class="col-12 col-md-1 d-flex align-items-center justify-content-center justify-content-md-start p-1 p-md-0"><a href="#" data-bs-toggle="modal" data-bs-target="#changelog-modal" id="changelog-text">${language.changelog}</a></div>
<div class="col-12 col-md-10 banner-text d-flex align-items-center justify-content-center p-1 p-md-0">
    <h1>♠ Black Jack ♠</h1>
</div>
<div class="col-12 col-md-1 d-flex align-items-center justify-content-center justify-content-md-end p-1 p-md-0" id="langselector">
    <select class="form-select-sm" id="lang" title="language">
        <option disabled="" selected="">${language.language}</option>
        <option value="en">${language.english}</option>
        <option value="hu">${language.hungarian}</option>
    </select>
</div>
</header>
<div class="h-100 d-flex justify-content-center align-items-center">${language.wip} 🛠️</div>
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
            <p>${LanguageTexts.lipsum}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">${language.ok}</button>
        </div>
    </div>
</div>
</div>`;
    $("#page").append(mainScreenHtml);
    $("#lang").on("change", (e) => {
        let select = e.target;
        setLanguage(select.value);
        mainScreen();
    });
    $("#changelog-text").on("click", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
    }));
}
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
main();
