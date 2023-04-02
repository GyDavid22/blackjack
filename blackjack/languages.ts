abstract class LanguageTexts {
    language: string = "Language";
    english: string = "English";
    hungarian: string = "Hungarian";
    changelog: string = "Changelog";
    wip: string = "Work in progress";
    github: string = "Github";
    author: string = "David Gyenes";
    year: string = "2023";
    static lipsum: string = "";
    ok: string = "Ok";
}

class English extends LanguageTexts {
}

class Hungarian extends LanguageTexts {
    language: string = "Nyelv";
    english: string = "Angol";
    hungarian: string = "Magyar";
    changelog: string = "Változásnapló";
    wip: string = "Fejlesztés alatt";
    author: string = "Gyenes Dávid";
}

LanguageTexts.lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in pellentesque sem. Vestibulum semper purus sed nunc ultrices ullamcorper. Nullam blandit, lorem non rutrum volutpat, lacus magna dapibus ante, in tincidunt odio eros nec purus. Ut mattis rhoncus enim, quis ultrices mauris blandit ut. Proin hendrerit dictum egestas. Integer nec quam vel dui consectetur tempor sed sit amet est. Maecenas id libero non mi volutpat posuere a quis nisi. Maecenas eleifend semper nibh fringilla lobortis. Nulla hendrerit congue lorem, non facilisis nunc tempor ac. Duis at laoreet augue, at luctus leo. Sed libero ligula, posuere et arcu in, varius molestie ante. Vivamus porttitor suscipit ultrices. Fusce dapibus arcu a libero efficitur, ut commodo leo vulputate. Etiam et nisl sed dui tempor elementum. Mauris sit amet sapien mattis, finibus lacus scelerisque, venenatis erat. In vitae magna fringilla, varius nulla ac, cursus est. Proin luctus augue eget erat condimentum pharetra. Curabitur pharetra dui ut efficitur semper. Vestibulum metus nunc, tempus vel blandit at, maximus rutrum erat. Morbi dui ante, dapibus finibus ante vel, volutpat scelerisque libero. Duis non dapibus urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec tempor lorem a mauris consequat, cursus condimentum nunc dapibus. Aenean fermentum ex in felis tincidunt luctus. Etiam hendrerit enim sit amet pulvinar consectetur. Donec blandit venenatis posuere. Morbi tincidunt, ante eu tempor semper, felis dolor accumsan sapien, sed ornare ligula elit nec dolor. Cras vestibulum ipsum sed felis fringilla facilisis. Curabitur et fringilla est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae tincidunt augue. Suspendisse ultrices luctus dolor nec egestas. Aliquam vehicula efficitur purus ut sodales. Quisque volutpat turpis id augue interdum, quis cursus diam rutrum. In nec nunc libero. Vestibulum nec pellentesque eros, in viverra odio. Aliquam a ultrices dolor. Donec interdum nisi nec lectus tincidunt maximus. Nunc quis ligula vitae urna pulvinar interdum. Ut iaculis quis leo at posuere. Vivamus leo eros, egestas eget finibus non, ultrices non mauris. Nam lacinia velit elit, non interdum massa sagittis pulvinar. Mauris vel lorem massa. Aliquam condimentum nisl non ipsum interdum venenatis sit amet ac massa. Nulla facilisi. Aliquam at est lectus. In imperdiet, sapien id vehicula commodo, dui elit aliquet mi, vitae blandit felis odio at erat. Pellentesque quis fermentum nibh. Etiam sit amet scelerisque metus, eu aliquam lorem. Pellentesque gravida mollis ligula sed maximus. Fusce eu tempor est, ac congue libero. Fusce aliquam semper aliquet. Suspendisse sollicitudin in nisl vel eleifend.";