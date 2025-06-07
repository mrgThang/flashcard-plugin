import { addIcon, setIcon } from 'obsidian';
import '../../styles.css';

const deck = {
    title: "Interview question",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=64&h=64",
    cardCount: 5,
    cardNeedToLearn: 3,
    cards: [
        {
            front: "OOP là gì?",
        },
        {
            front: "REST API là gì?"
        },
        {
            front: "Sự khác biệt giữa synchronous và asynchronous"
        },
        {
            front: "Ưu và nhược điểm của microservice architecture"
        },
        {
            front: "Garbage Collector trong Java hoạt động như thế nào?"
        }
    ]
}

export function renderDeckDetailView(
    container: HTMLElement,
    onClickBack: () => void
) {
    // Header Row (flex container)
    const headerRow = container.createDiv({ cls: "header-row" });
    // Back Icon
    const backIcon = headerRow.createDiv( {cls: "back-icon"} );
    backIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>`;
    backIcon.onclick = (event) => {
        onClickBack()
    }
    // Header
    headerRow.createEl("h2", { text: deck.title });

    // Deck info section
    const infoSection = container.createDiv({ cls: "deck-detail-info" });
    const avatar = infoSection.createDiv({ cls: "deck-detail-avatar" });
    avatar.createEl("img", { attr: { src: deck.image, alt: deck.title } });
    // Deck stats
    const stats = infoSection.createDiv({});
    stats.createDiv( { cls: "deck-detail-total-cards", text: `Total cards: ${deck.cardCount}` });
    stats.createDiv( { cls: "deck-detail-need-to-learn", text: `Need to learn: ${deck.cardNeedToLearn}` });
    // Add card button
    const addButton = infoSection.createDiv({ cls: "add-button" });
    addButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7952eebb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`

    // Cards list
    const cardsList = container.createDiv({ cls: "deck-detail-cards-list" });
    cardsList.createEl("h3", { text: "Cards" });

    if (!deck.cards || deck.cards.length === 0) {
        cardsList.createEl("div", { text: "No cards in this deck." });
    } else {
        for (const card of deck.cards) {
            const cardDiv = cardsList.createDiv({ cls: "deck-detail-card" });
            cardDiv.createEl("div", { text: card.front, cls: "deck-detail-card-front" });
            const trashIcon = cardDiv.createDiv( {cls: "trash-icon"} );
            trashIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e93146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;
        }
    }
}