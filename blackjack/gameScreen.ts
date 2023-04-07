let gameDebug: Game;

function gameScreen(): void {
    let gameScreenText: string =
`<div class="h-100 d-flex justify-content-center align-items-end card-container" id="dealer_container">
</div>
<div class="h-auto d-flex justify-content-center align-items-center my-2 control-container">
<p id="dealer-value"></p>
<button type="button" class="btn btn-primary" id="hit-button" disabled>Hit</button>
<button type="button" class="btn btn-primary" id="return-button" hidden>Return</button>
<button type="button" class="btn btn-primary" id="stand-button" disabled>Stand</button>
<p id="user-value"></p>
</div>
<div class="h-100 d-flex justify-content-center align-items-start card-container" id="player_container">
</div>`;
    pageDiv.append(gameScreenText);
    
    newDeck(1).then((r) => {
        gameDebug = new Game(r)
        $("#hit-button").on("click", () => {
            gameDebug.hit();
        });
        $("#stand-button").on("click", () => {
            gameDebug.stand();
        });
    });
    $("#return-button").on("click", () =>{
        screenSwitch(mainScreen);
    })
}