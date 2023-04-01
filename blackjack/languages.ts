abstract class LanguageTexts {
    static language: string = "Language";
    static english: string = "English";
    static hungarian: string = "Hungarian";
}

class English extends LanguageTexts {
}

class Hungarian extends LanguageTexts {
    static language: string = "Nyelv";
    static english: string = "Angol";
    static hungarian: string = "Magyar";
}