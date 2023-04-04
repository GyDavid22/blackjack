interface DeckResponse {
    success: boolean;
    deck_id: string;
    shuffled: boolean;
    remaining: number;
}

interface CardResponse {
    success: boolean; 
    deck_id: string;
    cards: Array<Card>;
    remaining: number;
}

interface Card {
    code: string; 
    image: string;
    images: {
        svg: string;
        png: string;
    };
    value: string;
    suit: string;
}

async function newDeck() : Promise<DeckResponse> {
    return fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then((r) => r.json()).catch(() => errorMessageDeckOfCardsApi());;
}