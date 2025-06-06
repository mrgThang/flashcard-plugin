import { Plugin } from "obsidian";
import { LoginPanelView } from "./src/pages/login";
import { SignupPanelView } from "./src/pages/signup";
import { DECK_PANEL, LOGIN_PANEL, SIGNUP_PANEL } from "./src/constants";
import { activatePanel } from "./src/helpers";
import { DeckPanelView } from "src/pages/deck";

export default class LoginPlugin extends Plugin {
	async onload() {
		this.registerDomEvent(document, "DOMContentLoaded", () => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = this.app.vault.adapter.getResourcePath(this.manifest.dir + "/styles.css");
            document.head.appendChild(link);
        });
		
		this.registerView(LOGIN_PANEL, (leaf) => new LoginPanelView(leaf));
		this.registerView(SIGNUP_PANEL, (leaf) => new SignupPanelView(leaf));
		this.registerView(DECK_PANEL, (leaf) => new DeckPanelView(leaf));

		this.addCommand({
			id: "open-flashcard-panel",
			name: "Open Flashcard Panel",
			callback: () => activatePanel(LOGIN_PANEL),
		});
	}

	onunload() {
		this.app.workspace.getLeavesOfType(LOGIN_PANEL).forEach((leaf) => leaf.detach());
	}
}
