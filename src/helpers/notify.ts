import { Notice } from "obsidian";

export function ShowError(error: Error) {
    new Notice("❌ Error: " + error.message, 3000);
}

export function ShowInfo(message: string) {
    new Notice(message, 3000);
}
