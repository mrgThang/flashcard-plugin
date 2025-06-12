# Flashcard Plugin for Obsidian

A simple flashcard management and learning plugin for Obsidian.

## Features

- Create, edit, and delete flashcard decks.
- Add, edit, and remove cards in each deck.
- Study/learn mode for reviewing cards.
- User authentication (login/signup).
- Modern React-based UI.

## Installation

1. Download or clone this repository.
2. Build the plugin:
   ```sh
   npm install
   npm run build
   ```
3. Check the [build a plugin on obsidian](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)

## Usage

- Open the Flashcard panel from the command palette or ribbon icon.
- Manage decks and cards from the panel UI.
- Use the "Learn" feature to review cards using spaced repetition.

## Development

- Requires Node.js v16 or later.
- Install dependencies:
  ```sh
  npm install
  ```
- Start development mode (auto-rebuild on changes):
  ```sh
  npm run dev
  ```
- Source code is in the `src/` directory.
- The backend repo is [here](https://github.com/mrgThang/flashcard-be)

## Contributing

Pull requests and suggestions are welcome!

## License

MIT
