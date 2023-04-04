class Game {
    private deck: DeckResponse;
    private userHand: Array<Card> = new Array<Card>();;
    private dealerHand: Array<Card> = new Array<Card>();;
    private remaining: number;
    private cardCount: number = 0;

    public constructor(deck: DeckResponse) {
        this.deck = deck;
        this.remaining = deck.remaining;
        this.putCardToContainer("PLAYER", 2);
        this.putCardToContainer("DEALER", 2);
    }

    private async pickCard(count: Number, hand: Array<Card>): Promise<Array<Card>> {
        let cards = new Array<Card>();
        await fetch(`https://deckofcardsapi.com/api/deck/${this.deck.deck_id}/draw/?count=${count}`)
            .then((r) => r.json() as Promise<CardResponse>).then((r) => {
                this.remaining = this.remaining < r.remaining ? this.remaining : r.remaining;
                for (let index = 0; index < r.cards.length; index++) {
                    hand.push(r.cards[index]);
                    cards.push(r.cards[index]);
                }
            }).catch(() => errorMessageDeckOfCardsApi());
        return cards;
    }

    public async putCardToContainer(container: "DEALER" | "PLAYER", count: number) {
        let hand: Array<Card>;
        let animation: string;
        switch (container) {
            case "DEALER":
                hand = this.dealerHand;
                animation = "fadeInUp";
                break;
            case "PLAYER":
                hand = this.userHand;
                animation = "fadeInDown";
                break;
            default:
                hand = new Array<Card>();
                animation = "";
                break;
        }
        let cards = await this.pickCard(count, hand);
        for (let index = 0; index < cards.length; index++) {
            $(`#${container.toLowerCase()}_container`).append(`<img src="${cards[index].image}" class="animate__animated animate__${animation}" id="card_${this.cardCount}">`);
            let myCount = this.cardCount;
            let myAnimation = animation;
            $(`#card_${this.cardCount}`).on("animationend", () => {
                $(`#card_${myCount}`).off();
                $(`#card_${myCount}`).removeClass(`animate__animated animate__${myAnimation}`);
                console.log(`#card_${myCount} animate__animated animate__${myAnimation}`);
            });
            this.cardCount++;
        }
    }
}