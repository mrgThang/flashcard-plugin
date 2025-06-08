import '../../styles.css';

export function renderDeckView(container: HTMLElement, onClickDeckDetail: () => void, onClickAddDeck: () => void) {
    // Dashboard header
    const header = container.createDiv({ cls: "deck-dashboard-header" });
    header.createEl("h2", { text: "Deck Management" });

    // Action buttons
    const actions = container.createDiv({ cls: "deck-dashboard-actions" });

    const addButton = actions.createDiv({ cls: "add-button" });
    addButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7952eebb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`
    addButton.onclick = (event) => {
        onClickAddDeck()
    }

    // Decks list
    const decksList = container.createDiv({ cls: "deck-list" });

    // Example decks (replace with your data)
    const decks = [
        {
            title: "Spanish Verbs",
            cardNeedToLearn: 10,
            cardCount: 24,
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=64&h=64",
        },
        {
            title: "German Verbs",
            cardNeedToLearn: 9,
            cardCount: 32,
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=64&h=64",
        },
        {
            title: "Interview Questions",
            cardNeedToLearn: 11,
            cardCount: 16,
            image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=64&h=64",
        },
        {
            title: "Egypt Trivia",
            cardNeedToLearn: 1,
            cardCount: 12,
            image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=64&h=64",
        },
    ];

    for (const deck of decks) {
        const card = decksList.createDiv({ cls: "deck-card" });
        card.onclick = (event) => {
            onClickDeckDetail()
        }

        const avatar = card.createDiv({ cls: "deck-card-avatar" });
        avatar.createEl("img", { attr: { src: deck.image, alt: deck.title } });

        const info = card.createDiv({ cls: "deck-card-info" });
        info.createEl("div", { text: deck.title, cls: "deck-card-title" });
        info.createEl("div", { text: `${deck.cardCount} total cards`, cls: "deck-card-count" });
        info.createEl("div", { text: `${deck.cardNeedToLearn} need to learn`, cls: "deck-card-need-learn" });

        const actions = card.createDiv({ cls: "deck-card-actions" });
        const trashIcon = actions.createDiv( {cls: "trash-icon"} );
        trashIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e93146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;   
        trashIcon.onclick = (event) => {
            event.stopPropagation(); // prevents event from reaching any objects other than the current object
            if (window.confirm("Are you sure you want to delete this deck?")) {
                // Call your delete logic here, e.g. remove the card from deck.cards and re-render
            }
        }
    }

    // Optionally, add event listeners for actions, search, etc.
}