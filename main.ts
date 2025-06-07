import { Plugin } from "obsidian";
import { activatePanel } from "./src/helpers";
import { ItemView } from "obsidian";
import { renderLoginView } from "./src/pages/login"
import { renderSignupView } from "./src/pages/signup";
import { renderDeckView } from "src/pages/deck";
import { renderDeckDetailView } from "src/pages/deck_detail";
import { renderCreateDeckView } from "src/pages/create_deck";
import { renderCreateCardView } from "src/pages/create_card";

export const FLASHCARD_PANEL = "flashcard-panel";

export class FlashcardPanelView extends ItemView {
    currentView = "create-card";

    getViewType(): string {
        return FLASHCARD_PANEL;
    }

    getDisplayText(): string {
        return "Flashcard";
    }

    async onOpen() {
        this.renderCurrentView();
    }

    renderCurrentView() {
        const container = this.containerEl.children[1] as HTMLElement;
        container.empty();
        if (this.currentView === "login") renderLoginView(container, () => this.switchView("deck"), () => this.switchView("signup"));
        else if (this.currentView === "signup") renderSignupView(container, () => this.switchView("login"));
        else if (this.currentView === "deck") renderDeckView(container, () => this.switchView("deck-detail"), () => this.switchView("create-deck"));
        else if (this.currentView === "deck-detail") renderDeckDetailView(container, () => this.switchView("deck"));
        else if (this.currentView === "create-deck") renderCreateDeckView(container, () => this.switchView("deck"), () => this.switchView("deck"));
        else if (this.currentView === "create-card") renderCreateCardView(container, () => {}, () => {});
    }

    switchView(view: string) {
        this.currentView = view;
        this.renderCurrentView();
    }
}

export default class FlashCardPlugin extends Plugin {
	async onload() {
		this.registerDomEvent(document, "DOMContentLoaded", () => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = this.app.vault.adapter.getResourcePath(this.manifest.dir + "/styles.css");
            document.head.appendChild(link);
        });
		
		this.registerView(FLASHCARD_PANEL, (leaf) => new FlashcardPanelView(leaf));
		this.addCommand({
			id: "open-flashcard-panel",
			name: "Open Flashcard Panel",
			callback: () => activatePanel(FLASHCARD_PANEL),
		});
	}

	onunload() {
		this.app.workspace.getLeavesOfType(FLASHCARD_PANEL).forEach((leaf) => leaf.detach());
	}
}
