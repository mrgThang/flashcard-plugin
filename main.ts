import { Plugin, ItemView } from "obsidian";
import { renderLoginView } from "./pages/login";

const VIEW_TYPE_LOGIN = "login-panel";

class LoginPanelView extends ItemView {
	getViewType(): string {
		return VIEW_TYPE_LOGIN;
	}

	getDisplayText(): string {
		return "Login Panel";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		renderLoginView(container);
	}

	async onClose() {
		// Optional cleanup logic
	}
}

export default class LoginPlugin extends Plugin {
	async onload() {
		this.registerDomEvent(document, "DOMContentLoaded", () => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = this.app.vault.adapter.getResourcePath(this.manifest.dir + "/styles.css");
            document.head.appendChild(link);
        });
		
		this.registerView(VIEW_TYPE_LOGIN, (leaf) => new LoginPanelView(leaf));

		this.addCommand({
			id: "open-login-panel",
			name: "Open Login Panel",
			callback: () => this.activateLoginPanel(),
		});
	}

	async activateLoginPanel() {
		const leaf = this.app.workspace.getRightLeaf(false);
		await leaf.setViewState({
			type: VIEW_TYPE_LOGIN,
			active: true,
		});
		this.app.workspace.revealLeaf(leaf);
	}

	onunload() {
		this.app.workspace.getLeavesOfType(VIEW_TYPE_LOGIN).forEach((leaf) => leaf.detach());
	}
}
