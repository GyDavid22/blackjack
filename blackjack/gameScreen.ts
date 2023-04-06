let gameDebug: Game;

function gameScreen(): void {
    let gameScreenText: string =
`<div class="h-auto d-flex justify-content-center align-items-center" id="dealer_container">
</div>
<div class="h-100 d-flex justify-content-center align-items-center">
<button type="button" class="btn btn-primary" id="return-button">Return</button>
</div>
<div class="h-auto d-flex justify-content-center align-items-center" id="player_container">
</div>`;
    pageDiv.append(gameScreenText);
    
    newDeck(1).then((r) => gameDebug = new Game(r));
    $("#return-button").on("click", () =>{
        screenSwitch(mainScreen);
    })
}