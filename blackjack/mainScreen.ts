function mainScreen(): void {
    let mainScreenHtml: string =
`<header class="d-flex flex-column flex-md-row h-auto w-100">
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
    $("#lang").on("change", async (e) => {
        $("#lang").off();
        let select = e.target as HTMLSelectElement;
        setLanguage(select.value);
        $("#page").empty();
        mainScreen();
    });
    $("#changelog-text").on("click", async (e) => {
        e.preventDefault();
    });
    $("#start-game-button").on("click", async (e) => {
        screenSwitch(gameScreen);
    });
}