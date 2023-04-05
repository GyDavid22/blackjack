class Game {
    private deck: DeckResponse;
    private userHand: Array<Card> = new Array<Card>();;
    private dealerHand: Array<Card> = new Array<Card>();;
    private remaining: number;
    private cardCount: number = 0;

    public constructor(deck: DeckResponse) {
        this.deck = deck;
        this.remaining = deck.remaining;
        this.putCardToContainer("PLAYER", 2).then(() => {
            console.log(this.getHandValue(this.userHand));
        });
        this.putCardToContainer("DEALER", 2).then(() => {
            console.log(this.getHandValue(this.dealerHand));
        });
    }

    private async pickCard(count: Number, hand: Array<Card>): Promise<Array<Card>> {
        let cards = new Array<Card>();
        await fetch(`https://deckofcardsapi.com/api/deck/${this.deck.deck_id}/draw/?count=${count}`)
            .then((r) => r.json() as Promise<CardResponse>).then((r) => {
                this.remaining = this.remaining < r.remaining ? this.remaining : r.remaining;
                for (let i = 0; i < r.cards.length; i++) {
                    hand.push(r.cards[i]);
                    cards.push(r.cards[i]);
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
                return;
        }
        let cards = await this.pickCard(count, hand);
        for (let i = 0; i < cards.length; i++) {
            $(`#${container.toLowerCase()}_container`).append(`<img src="${cards[i].image}" class="animate__animated animate__${animation}" id="card_${this.cardCount}">`);
            let me = $(`#card_${this.cardCount}`);
            me.on("animationend", () => {
                me.off();
                me.removeClass(`animate__animated animate__${animation}`);
            });
            this.cardCount++;
        }
    }

    public getHandValue(hand: Array<Card>): number {
        let sumValue = 0;
        let aces = 0;
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].value === "KING" || hand[i].value === "QUEEN" || hand[i].value === "JACK") {
                sumValue += 10;
            } else if (hand[i].value === "ACE") {
                sumValue += 11;
                aces++;
            } else {
                sumValue += Number.parseInt(hand[i].value);
            }
        }
        if (sumValue > 21) {
            let i = 0;
            while (sumValue > 21 && i < aces) {
                sumValue -= 10;
                i++;
            }
        }
        return sumValue;
    }
}