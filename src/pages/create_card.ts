import '../../styles.css';
import { marked } from "marked";

export function renderCreateCardView(
    container: HTMLElement,
    onBackToDeckDetail: () => void,
) {
    container.empty();

    // Header Row
    const headerRow = container.createDiv({ cls: "header-row" });
    const backIcon = headerRow.createDiv({ cls: "back-icon" });
    backIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;
    backIcon.onclick = () => onBackToDeckDetail();
    headerRow.createEl("h2", { text: "Create new card" });

    // Form
    const form = container.createEl("form", { cls: "create-card-form" });

    // Front
    form.createEl("h4", { text: "Front" })
    // Front input
    const frontInput = form.createEl("textarea", {
        cls: "create-card-editbox",
        attr: { id: "card-front", rows: "2", cols: "100", placeholder: "Type Markdown here..." }
    });
    // font preview
    const frontPreview = form.createDiv({ cls: "create-card-preview", attr: { id: "card-front-preview" } });
    frontInput.addEventListener("input", () => {
        frontPreview.innerHTML = marked.parse(frontInput.value);
    });
    frontPreview.innerHTML = marked.parse(frontInput.value);

    // back
    form.createEl("h4", { text: "Back" })
    // back input
    const backInput = form.createEl("textarea", {
        cls: "create-card-editbox",
        attr: { id: "card-back", rows: "2", cols: "100", placeholder: "Type Markdown here..." }
    });
    // font preview
    const backPreview = form.createDiv({ cls: "create-card-preview", attr: { id: "card-back-preview" } });
    backInput.addEventListener("input", () => {
        backPreview.innerHTML = marked.parse(backInput.value);
    });
    backPreview.innerHTML = marked.parse(backInput.value);

    // Actions
    const actions = form.createDiv({ cls: "create-card-row" });
    const submitBtn = actions.createEl("button", { type: "submit", text: "Create", cls: "mod-cta" });
    const cancelBtn = actions.createEl("button", { type: "button", text: "Cancel" });

    cancelBtn.onclick = (e) => {
        e.preventDefault();
        onBackToDeckDetail();
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        onBackToDeckDetail()
    };
}
