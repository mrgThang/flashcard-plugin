import '../../styles.css';
import { marked } from "marked";

export function renderCreateCardView(
    container: HTMLElement,
    onSubmit: (card: { front: string[]; back: string[] }) => void,
    onCancel: () => void
) {
    container.empty();

    // Header Row
    const headerRow = container.createDiv({ cls: "header-row" });
    const backIcon = headerRow.createDiv({ cls: "back-icon" });
    backIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;
    backIcon.onclick = () => onCancel();
    headerRow.createEl("h2", { text: "Create new card" });

    // Form
    const form = container.createEl("form", { cls: "create-card-form" });

    // Front (list format)
        // --- Block 1: Textarea ---
    const frontRow = form.createDiv({ cls: "create-card-row" });
    const frontLabel = frontRow.createEl("label", { text: "Front", attr: { for: "card-front" } });
    const frontInput = frontRow.createEl("textarea", {
        cls: "create-card-editbox",
        attr: { id: "card-front", rows: "5", placeholder: "Type Markdown here..." }
    });

    // --- Block 2: Markdown Preview ---
    const previewRow = form.createDiv({ cls: "create-card-row" });
    const previewLabel = previewRow.createEl("label", { text: "Preview", attr: { for: "card-front-preview" } });
    const previewDiv = previewRow.createDiv({ cls: "create-card-preview", attr: { id: "card-front-preview" } });

    // Live update preview
    frontInput.addEventListener("input", () => {
        previewDiv.innerHTML = marked.parse(frontInput.value);
    });

    // Initial preview
    previewDiv.innerHTML = marked.parse(frontInput.value);

    // Back (list format)
    const backRow = form.createDiv({ cls: "create-card-row" });
    const backLabel = backRow.createEl("label", { text: "Back", attr: { for: "card-back" } });
    const backList = backRow.createEl("ul", { cls: "create-card-list", attr: { id: "card-back" } });
    const backInput = backRow.createEl("input", { type: "text", attr: { placeholder: "Add back item and press Enter" }, cls: "create-card-input" });

    // Store items
    const frontItems: string[] = [];
    const backItems: string[] = [];

    // Helper to add item to list
    function addItem(list: HTMLUListElement, items: string[], value: string) {
        if (!value.trim()) return;
        items.push(value.trim());
        const li = list.createEl("li", { text: value.trim(), cls: "create-card-list-item" });
        // Add remove button
        const removeBtn = li.createSpan({ text: "✕", cls: "create-card-remove" });
        removeBtn.onclick = () => {
            items.splice(items.indexOf(value.trim()), 1);
            li.remove();
        };
    }

    // Front input handler
    frontInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addItem(frontList, frontItems, frontInput.value);
            frontInput.value = "";
        }
    });

    // Back input handler
    backInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addItem(backList, backItems, backInput.value);
            backInput.value = "";
        }
    });

    // Actions
    const actions = form.createDiv({ cls: "create-card-row" });
    const submitBtn = actions.createEl("button", { type: "submit", text: "Create", cls: "mod-cta" });
    const cancelBtn = actions.createEl("button", { type: "button", text: "Cancel" });

    cancelBtn.onclick = (e) => {
        e.preventDefault();
        onCancel();
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        onSubmit({
            front: [...frontItems],
            back: [...backItems],
        });
    };
}
