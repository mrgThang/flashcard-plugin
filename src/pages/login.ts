import { LoginHandler } from 'src/requests/request';
import '../../styles.css'
import { LoginRequest } from 'src/interfaces/login';

export function renderLoginView(
	container: HTMLElement, 
	onLoginSuccess: () => void, 
	onClickSignUp: () => void
) {
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
	button.onclick = async () => {
		const username = usernameInput.value;
		const password = passwordInput.value;
		const loginRequest: LoginRequest = {
			"username": username,
			"password": password
		}
		try {
			await LoginHandler(loginRequest)
			onLoginSuccess()
		} catch (err) {
			message.textContent = "Login failed. Please check your credentials."
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
		onClickSignUp();
	};
}
