import '../../styles.css';

export function renderCreateDeckView(
    container: HTMLElement,
    onSubmit: () => void,
    onCancel: () => void
) {
    // Header Row (flex container)
    const headerRow = container.createDiv({ cls: "header-row" });
    // Back Icon
    const backIcon = headerRow.createDiv( {cls: "back-icon"} );
    backIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>`;
    backIcon.onclick = (event) => {
        onCancel()
    }
    // Header
    headerRow.createEl("h2", { text: "Create new deck" });

    // Create form
    const form = container.createEl("form", { cls: "create-deck-form" });

    // Title
    const nameRow = form.createDiv({ cls: "create-deck-row" });
    const nameLabel = nameRow.createEl("label", { text: "Deck Name", attr: { for: "deck-name" } });
    const nameInput = nameRow.createEl("input", { type: "text", attr: { id: "deck-name", required: "true", placeholder: "Enter deck name" } });

    // Image
    const imageRow = form.createDiv({cls: "create-deck-row"})
    const imageLabel = imageRow.createEl("label", { text: "Image URL", attr: { for: "deck-image" } });
    const fileContent = imageRow.createDiv()
    const fileInput = fileContent.createEl("input", { type: "file", attr: { accept: "image/*" }, cls: "mod-cta" });
    const preview = fileContent.createEl("img", { cls: "create-deck-image" });

    // Handle file upload
    fileInput.onchange = async () => {
        const file = fileInput.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target?.result as string;
                preview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    };

    // Description
    const descRow = form.createDiv({cls: "create-deck-row"})
    const descLabel = descRow.createEl("label", { text: "Description", attr: { for: "deck-desc" } });
    const descInput = descRow.createEl("textarea", { attr: { id: "deck-desc", rows: "3", placeholder: "Describe your deck..." } });

    // Actions
    const actions = form.createDiv({ cls: "create-deck-row" });
    const submitBtn = actions.createEl("button", { type: "submit", text: "Create", cls: "mod-cta" });
    const cancelBtn = actions.createEl("button", { type: "button", text: "Cancel" });

    cancelBtn.onclick = (e) => {
        e.preventDefault();
        onCancel();
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };
}
