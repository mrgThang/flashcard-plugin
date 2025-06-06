export async function activatePanel(viewType) {
    const leaf = this.app.workspace.getRightLeaf(false);
    await leaf.setViewState({
        type: viewType,
        active: true,
    });
    this.app.workspace.revealLeaf(leaf);
}
