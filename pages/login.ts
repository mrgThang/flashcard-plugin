import '../styles.css'

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
			message.setText("✅ Login successful!");
		} else {
			message.setText("❌ Invalid credentials");
		}
	};
}
