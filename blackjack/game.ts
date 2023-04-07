class Game {
    private deck: DeckResponse;
    private userHand: Array<Card> = new Array<Card>();
    private dealerHand: Array<Card> = new Array<Card>();
    private remaining: number;
    private cardCount: number = 0;
    private showFirst: boolean = false;
    private hidden: HTMLImageElement;
    private hiddenCard: Card;

    public constructor(deck: DeckResponse) {
        this.deck = deck;
        this.remaining = deck.remaining;
        this.hidden = document.createElement("img") as HTMLImageElement;
        this.hiddenCard = {} as Card;
        this.start();
    }

    private async start() {
        this.putCardToContainer("PLAYER", 2);
        await this.putCardToContainer("DEALER", 2);
        $("#hit-button").removeAttr("disabled");
        $("#stand-button").removeAttr("disabled");
    }

    private async pickCard(count: Number, hand: Array<Card>): Promise<Array<Card>> {
        let cards = new Array<Card>();
        await fetch(`https://deckofcardsapi.com/api/deck/${this.deck.deck_id}/draw/?count=${count}`)
            .then((r) => r.json() as Promise<CardResponse>).then((r) => {
                if (this.remaining === r.remaining) {
                    throw new Error(); // Probably we got the same response more times, happened during testing
                }
                this.remaining = this.remaining < r.remaining ? this.remaining : r.remaining;
                for (let i = 0; i < r.cards.length; i++) {
                    hand.push(r.cards[i]);
                    cards.push(r.cards[i]);
                }
            }).catch(() => errorMessageDeckOfCardsApi());
        return cards;
    }

    public async hit() {
        $("#hit-button").attr("disabled", "");
        $("#stand-button").attr("disabled", "");
        await this.putCardToContainer("PLAYER", 1);
        let value = this.getHandValue(this.userHand);
        if (value <= 21) {
            pageDiv.on("animationend", () => {
                pageDiv.off("animationend");
                $("#hit-button").removeAttr("disabled");
                $("#stand-button").removeAttr("disabled");
            });
        } else {
            pageDiv.on("animationend", () => {
                pageDiv.off("animationend");
                $("#return-button").removeAttr("hidden");
            });
        }
    }

    public async stand() {
        this.showFirst = true;
        this.hidden.src = this.hiddenCard.image;
        $("#hit-button").attr("disabled", "");
        $("#stand-button").attr("disabled", "");
        this.dealerMove();
    }

    public async dealerMove() {
        if (this.getHandValue(this.dealerHand) <= this.getHandValue(this.userHand) && this.getHandValue(this.dealerHand) < 21) {
            setTimeout(async () => {
                await this.putCardToContainer("DEALER", 1);
                let value = this.getHandValue(this.dealerHand);
                if (value <= 21) {
                    console.log(`Dealer's good: ${value}`);
                } else {
                    console.log(`Dealer's f*cked: ${value}`);
                }
                this.dealerMove();
            }, 1000);
        } else {
            console.log("Time to evaluate");
            pageDiv.on("animationend", () => {
                pageDiv.off("animationend");
                $("#return-button").removeAttr("hidden");
            });
        }
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
        let musthide = false;
        if (!this.showFirst && this.dealerHand.length === 0 && container === "DEALER") {
            musthide = true;
        }
        let cards = await this.pickCard(count, hand);
        let loadedCount = 0;
        let cardImgs = new Array<HTMLImageElement>();
        for (let i = 0; i < cards.length; i++) {
            let cardImg = new Image();
            cardImg.src = cards[i].image;
            cardImg.classList.add("animate__animated", `animate__${animation}`);
            cardImg.id = `card_${this.cardCount}`;
            cardImg.title = `${cards[i].value} of ${cards[i].suit}`;
            if (musthide) {
                cardImg.src = "https://deckofcardsapi.com/static/img/back.png";
                cardImg.title = "";
                this.hidden = cardImg;
                this.hiddenCard = cards[i];
                musthide = false;
            }
            cardImgs.push(cardImg);
            let myContainer = $(`#${container.toLowerCase()}_container`);
            let me = $(cardImg);
            me.on("load", () => {
                loadedCount++
                if (loadedCount === cards.length) {
                    for (let j = 0; j < cardImgs.length; j++) {
                        myContainer.append(cardImgs[j]);
                    }
                }
                this.organize();
            });
            me.on("animationend", () => {
                me.off();
                me.removeClass(`animate__animated animate__${animation}`);
            });
            this.cardCount++;
        }
        if (container === "DEALER") {
            $("#dealer-value").text(`/\\ ${this.getHandValue(this.dealerHand)}`);
        } else {
            $("#user-value").text(`\\/ ${this.getHandValue(this.userHand)}`);
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
            if (!this.showFirst && hand === this.dealerHand && i === 0) {
                sumValue = 0;
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

    private organize() {
        let playerContainer = $("#player_container");
        for (let i = 0; i < playerContainer.children().length; i++) {
            (playerContainer.children()[i] as HTMLImageElement).setAttribute("style", `transform: translateX(-${i/(playerContainer.children().length + 1)* 100}%);`)
        }
    }
}