import '../../styles.css';

const deck = {
    title: "Interview question",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=64&h=64",
    description: "Practise interview questions of big tech companies",
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
    onClickBack: () => void,
    onClickAddCard: () => void,
    onClickLearn: () => void,
    onClickEditDeck: () => void,
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
    // Add edit icon (hidden by default, shown on hover)
    const editIcon = avatar.createDiv({ cls: "avatar-edit-icon" });
    editIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c0c0c0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`;
    avatar.onclick = (event) => onClickEditDeck();
    // Deck stats
    const desc = infoSection.createDiv({});
    desc.createDiv( { text: `${deck.description}` } )
    desc.createDiv( { cls: "deck-detail-total-cards", text: `Total cards: ${deck.cardCount}` });
    desc.createDiv( { cls: "deck-detail-need-to-learn", text: `Need to learn: ${deck.cardNeedToLearn}` });
    // Add card button
    const addButton = infoSection.createDiv({ cls: "add-button" });
    addButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7952eebb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`
    addButton.onclick = (event) => onClickAddCard()

    // Button start learning
    const buttonStartLearning = container.createDiv({ cls: "deck-detail-button-start", text: "Start learning"});
    buttonStartLearning.onclick = (event) => onClickLearn();

    // Cards list
    const cardsList = container.createDiv({ cls: "deck-detail-cards-list" });
    cardsList.createEl("h3", { text: "Cards" });

    if (!deck.cards || deck.cards.length === 0) {
        cardsList.createEl("div", { text: "No cards in this deck." });
    } else {
        for (const card of deck.cards) {
            const cardDiv = cardsList.createDiv({ cls: "deck-detail-card" });
            cardDiv.createEl("div", { text: card.front, cls: "deck-detail-card-front" });
            cardDiv.onclick = (event) => onClickAddCard();
            const trashIcon = cardDiv.createDiv( {cls: "trash-icon"} );
            trashIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e93146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;
            trashIcon.onclick = (event) => {
                event.stopPropagation(); // prevents event from reaching any objects other than the current object
                if (window.confirm("Are you sure you want to delete this card?")) {
                    // Call your delete logic here, e.g. remove the card from deck.cards and re-render
                }
            }
        }
    }
}