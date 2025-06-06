import '../../styles.css'
import { ItemView } from "obsidian";
import { LOGIN_PANEL, SIGNUP_PANEL } from "../constants";
import { activatePanel } from 'src/helpers';

export class SignupPanelView extends ItemView {
    getViewType(): string {
        return SIGNUP_PANEL;
    }

    getDisplayText(): string {
        return "Signup Panel";
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        renderSignupView(container);
    }

    async onClose() {
        // Optional cleanup logic
    }
}

export function renderSignupView(container: HTMLElement) {
    container.createEl("h2", { text: "Flashcard" });

    const form = container.createDiv({ cls: "login-form" });

    const nameRow = form.createDiv({ cls: "login-row" });
    nameRow.createEl("label", { text: "Name" });
    const nameInput = nameRow.createEl("input", {
        type: "text",
        placeholder: "Enter name",
    });

    const emailRow = form.createDiv({ cls: "login-row" });
    emailRow.createEl("label", { text: "Email" });
    const emailInput = emailRow.createEl("input", {
        type: "text",
        placeholder: "Enter email",
    });

    const passwordRow = form.createDiv({ cls: "login-row" });
    passwordRow.createEl("label", { text: "Password" });
    const passwordInput = passwordRow.createEl("input", {
        type: "password",
        placeholder: "Enter password",
    });

    const button = form.createEl("button", { text: "Signup" });
    button.onclick = () => {
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        activatePanel(LOGIN_PANEL);
    };
}
