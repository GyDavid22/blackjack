let language: LanguageTexts;
getLanguage();

function main(): void {
    mainScreen();
}

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

main();