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

screenSwitch(mainScreen, true);