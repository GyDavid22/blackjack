class Game {
    private deck: DeckResponse;
    private userHand: Array<Card>;
    private dealerHand: Array<Card>;
    private remaining: number;

    public constructor(deck: DeckResponse) {
        this.deck = deck;
        this.userHand = new Array<Card>();
        this.dealerHand = new Array<Card>();
        this.remaining = deck.remaining;
        console.log(deck);
        this.pickCard(2, this.userHand);
        this.pickCard(2, this.dealerHand);
    }

    public async pickCard(count: Number, hand: Array<Card>) {
        fetch(`https://deckofcardsapi.com/api/deck/${this.deck.deck_id}/draw/?count=${count}`)
            .then((r) => r.json() as Promise<CardResponse>).then((r) => {
                this.remaining = this.remaining < r.remaining ? this.remaining : r.remaining;
                for (let index = 0; index < r.cards.length; index++) {
                    hand.push(r.cards[index]);
                    console.log(r.cards[index]);
                }
            }).catch(() => errorMessageDeckOfCardsApi());
    }
}