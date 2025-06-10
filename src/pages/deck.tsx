import { useEffect, useState } from "react";
import { GetDecksHandler } from "../requests/request";
import { DeckItem } from "../interfaces/deck"

export default function DeckView({ onClickDeckDetail, onClickAddDeck }: { onClickDeckDetail: (deck: any) => void, onClickAddDeck: () => void }) {
  const [decks, setDecks] = useState<DeckItem[]>([]);

  useEffect(() => {
    GetDecksHandler({ page: 1, pageSize: 10 }).then(resp => setDecks(resp.decks));
  }, []);

  return (
    <div>
      <div className="deck-dashboard-header">
        <h2>Deck Management</h2>
      </div>
      <div className="deck-dashboard-actions">
        <div className="add-button" onClick={onClickAddDeck}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7952eebb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus-icon lucide-plus"
            style={{ verticalAlign: "middle" }}
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </div>
      <div className="deck-list">
        {decks.map(deck => (
          <div className="deck-card" key={deck.id} onClick={() => onClickDeckDetail(deck.id)}>
            <div className="deck-card-avatar">
              <img src={deck.imageUrl ? deck.imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/2023_Obsidian_logo.svg/1200px-2023_Obsidian_logo.svg.png"}/>
            </div>
            <div className="deck-card-info">
              <div className="deck-card-title">{deck.name}</div>
              <div className="deck-card-count">{deck.totalCards} total cards</div>
              <div className="deck-card-need-learn">{deck.cardsLeft} need to learn</div>
            </div>
            <div className="deck-card-actions" onClick={e => e.stopPropagation()}>
            <span
                className="trash-icon"
                title="Delete deck"
                onClick={() => {
                    if (window.confirm("Are you sure you want to delete this deck?")) {
                        // Call your delete logic here
                    }
                }}
                style={{ cursor: "pointer", marginLeft: "8px" }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e93146" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}