function gameScreen(): void {
    let gameScreenText: string =
`<div class="h-auto d-flex justify-content-center align-items-center" id="dealer_container">
</div>
<div class="h-100 d-flex justify-content-center align-items-center">
    <p id=countdown></p>
</div>
<div class="h-auto d-flex justify-content-center align-items-center" id="player_container">
</div>`;
    pageDiv.append(gameScreenText);
    newDeck(1).then((r) => new Game(r));
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            $("#countdown").text(`${5 - i}`);
        }, 1000 * i);
    }
    setTimeout(() => {screenSwitch(mainScreen);}, 5000);
}