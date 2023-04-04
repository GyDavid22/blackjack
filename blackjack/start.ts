let language: LanguageTexts;
getLanguage();

function setLanguage(code: string | null) {
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
    } else {
        setLanguage(setLang);
    }
}

function screenSwitch(nextScreen: Function, justIn: Boolean = false): void {
    if (justIn) {
        fadeIn();
        nextScreen();
    } else {
        fadeOutAndNext(nextScreen);
    }
}

function fadeIn(): void {
    $("#page").addClass("animate__animated animate__fadeIn");
    $("#page").on("animationend", () => {
        $("#page").off();
        $("#page").removeClass("animate__animated animate__fadeIn");
    });
}

function fadeOutAndNext(nextScreen: Function): void {
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
    let errorModal = 
`<div class="modal fade" tabindex="-1" id="error-modal">
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
`
    $("#page").append(errorModal);
    $("#hidden-opener").click();
    $("#error-modal").on("hidden.bs.modal", () => {
        $("#error-modal").off();
        $("#error-modal").remove();
    })
}

screenSwitch(mainScreen, true);