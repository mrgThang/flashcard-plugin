import '../../styles.css';
import { ItemView } from "obsidian";
import { DECK_PANEL } from "../constants";

export class DeckPanelView extends ItemView {
    getViewType(): string {
        return DECK_PANEL;
    }

    getDisplayText(): string {
        return "Deck Panel";
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        renderDeckView(container);
    }

    async onClose() {
        // Optional cleanup logic
    }
}

export function renderDeckView(container: HTMLElement) {
    // Dashboard header
    const header = container.createDiv({ cls: "deck-dashboard-header" });
    header.createEl("h2", { text: "Dashboard" });

    // Action buttons
    const actions = container.createDiv({ cls: "deck-dashboard-actions" });
    const newCard = actions.createDiv({ cls: "deck-action-card" });
    newCard.createEl("div", { text: "New Card", cls: "deck-action-label" });

    const newDeck = actions.createDiv({ cls: "deck-action-deck" });
    newDeck.createEl("div", { text: "New Deck", cls: "deck-action-label" });

    // My Decks header and search
    const decksHeader = container.createDiv({ cls: "deck-list-header" });
    decksHeader.createEl("h3", { text: "My Decks" });

    // Decks list
    const decksList = container.createDiv({ cls: "deck-list" });

    // Example decks (replace with your data)
    const decks = [
        {
            title: "Spanish Verbs",
            lastStudied: "Mar 12",
            cardCount: 24,
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=64&h=64",
        },
        {
            title: "German Verbs",
            lastStudied: "Mar 3",
            cardCount: 32,
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=64&h=64",
        },
        {
            title: "Interview Questions",
            lastStudied: "Feb 16",
            cardCount: 16,
            image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=64&h=64",
        },
        {
            title: "Egypt Trivia",
            lastStudied: "Feb 7",
            cardCount: 12,
            image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=64&h=64",
        },
    ];

    for (const deck of decks) {
        const card = decksList.createDiv({ cls: "deck-card" });

        // const avatar = card.createDiv({ cls: "deck-card-avatar" });
        // avatar.createEl("img", { attr: { src: deck.image, alt: deck.title } });

        // const info = card.createDiv({ cls: "deck-card-info" });
        // info.createEl("div", { text: deck.title, cls: "deck-card-title" });
        // info.createEl("div", { text: `Last Studied ${deck.lastStudied}`, cls: "deck-card-date" });
        // info.createEl("div", { text: `${deck.cardCount} cards`, cls: "deck-card-count" });

        // const actions = card.createDiv({ cls: "deck-card-actions" });
        // actions.createEl("button", { text: "🗑️", cls: "deck-card-delete" });
    }

    // Optionally, add event listeners for actions, search, etc.
}