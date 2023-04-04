function gameScreen(): void {
    let gameScreenText: string =
`<div class="h-auto d-flex justify-content-center align-items-center" id="dealer_container">
</div>
<div class="h-100 d-flex justify-content-center align-items-center">
    <p id=countdown></p>
</div>
<div class="h-auto d-flex justify-content-center align-items-center" id="player_container">
</div>`;
    $("#page").append(gameScreenText);
    newDeck(1).then((r) => new Game(r));
    for (let index = 0; index < 5; index++) {
        setTimeout(() => {
            $("#countdown").text(`${5 - index}`);
        }, 1000 * index);
    }
    setTimeout(() => {screenSwitch(mainScreen);}, 5000);
}