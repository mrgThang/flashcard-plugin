import '../../styles.css'
import { ItemView } from "obsidian";
import { DECK_PANEL, LOGIN_PANEL, SIGNUP_PANEL } from "../constants";
import { activatePanel } from 'src/helpers';

export class LoginPanelView extends ItemView {
	getViewType(): string {
		return LOGIN_PANEL;
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

export function renderLoginView(container: HTMLElement) {
	container.createEl("h2", { text: "Flashcard" });

	const form = container.createDiv({ cls: "login-form" });

	// Username field
	const usernameRow = form.createDiv({ cls: "login-row" });
	usernameRow.createEl("label", { text: "Username" });
	const usernameInput = usernameRow.createEl("input", {
		type: "text",
		placeholder: "Enter username",
	});

	// Password field
	const passwordRow = form.createDiv({ cls: "login-row" });
	passwordRow.createEl("label", { text: "Password" });
	const passwordInput = passwordRow.createEl("input", {
		type: "password",
		placeholder: "Enter password",
	});

	// Message display
	const message = container.createEl("div", { cls: "login-message" });

	// Login button
	const button = form.createEl("button", { text: "Login" });
	button.onclick = () => {
		const username = usernameInput.value;
		const password = passwordInput.value;

		// Dummy auth check
		if (username === "admin" && password === "1234") {
			activatePanel(DECK_PANEL);
		} else {
			message.setText("❌ Invalid credentials");
		}
	};

	const signupLink = form.createEl("div", { cls: "login-signup-link" });
	signupLink.createEl("span", { text: "Don't have an account? " });
	const signupAnchor = signupLink.createEl("a", {
		text: "Sign up",
		href: "#signup",
		cls: "signup-link"
	});
	signupAnchor.onclick = (event) => {
		activatePanel(SIGNUP_PANEL);
	};
}
