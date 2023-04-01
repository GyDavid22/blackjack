const mainScreenHtml: string =
`<div class="main-banner h-auto">
    <h1>♠ Black Jack ♠</h1>
</div>
    <div class="game-area h-100 w-100 justify-content-center align-items-center">
    <div class="start-button h-100 w-100 d-flex align-items-center justify-content-center">Strongly WIP</div>
</div>
<div>
    <select class="form-select-sm" id="lang">
        <option disabled selected>Language</option>
        <option value="en">English</option>
        <option value="hu">Hungarian</option>
    </select>
</div>`;

function main(): void {
    $("#page").empty();
    mainScreen();
}

function mainScreen(): void {
    $("#page").append(mainScreenHtml);
    $("#lang").on("change", (event) => {
        console.log("Hello")
    });
}

main();