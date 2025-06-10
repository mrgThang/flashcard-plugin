import { ItemView, Plugin } from "obsidian";
import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import App from "src/app";

export const FLASHCARD_PANEL = "flashcard-panel";

export class FlashcardPanelView extends ItemView {
    root: Root | null = null;

    getViewType(): string {
        return FLASHCARD_PANEL;
    }

    getDisplayText(): string {
        return "Flashcard";
    }

    async onOpen() {
        // Create a container for React if it doesn't exist
        let container = this.containerEl.querySelector(".flashcard-react-root") as HTMLElement;
        if (!container) {
            container = document.createElement("div");
            container.className = "flashcard-react-root";
            this.containerEl.appendChild(container);
        }
        // Mount React app
        this.root = createRoot(container);
        this.root.render(React.createElement(App));
    }

    async onClose() {
        // Unmount React app
        if (this.root) {
            this.root.unmount();
            this.root = null;
        }
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

async function activatePanel(viewType: string) {
    const leaf = this.app.workspace.getRightLeaf(false);
    await leaf.setViewState({
        type: viewType,
        active: true,
    });
    this.app.workspace.revealLeaf(leaf);
}
