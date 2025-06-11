import React, { useState, useEffect } from "react";
import "../../styles.css";
import { DeckItem } from "src/interfaces/deck";
import { GetCardsHandler, GetDeckDetailHandler } from "src/requests/request";
import { CardItem, GetCardsResponse } from "src/interfaces/card";
import { DEFAULT_IMAGE_URL } from "src/constant/constant";

interface DeckDetailProps {
  deckId: number | undefined;
  onClickBack: () => void;
  onClickAddCard: () => void;
  onClickLearn: () => void;
  onClickEditDeck: () => void;
  onDeleteCard?: (cardIndex: number) => void;
  onClickDetailCard: (card: CardItem) => void;
}

export default function DeckDetailView({
    deckId,
    onClickBack,
    onClickAddCard,
    onClickLearn,
    onClickEditDeck,
    onDeleteCard,
    onClickDetailCard,
}: DeckDetailProps) {
    const [deck, setDeck] = useState<DeckItem>();
    const [cards, setCards] = useState<CardItem[]>([]);
    
    if (deckId) {
        useEffect(() => {
            GetDeckDetailHandler(deckId).then(resp => setDeck(resp));
        }, []);

        useEffect(() => {
            GetCardsHandler({"deckId": deckId, "page": 1, "pageSize": 10}).then(
                (resp: GetCardsResponse) => {
                    setCards(resp.cards)
                }
            )
        }, [])
    }


    return deck && (
        <div>
        {/* Header Row */}
        <div className="header-row">
            <div className="back-icon" onClick={onClickBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
            </div>
            <h2>{deck.name}</h2>
        </div>

        {/* Deck Info Section */}
        <div className="deck-detail-info">
            <div className="deck-detail-avatar" onClick={onClickEditDeck} style={{ position: "relative", cursor: "pointer" }}>
                <img src={deck.imageUrl ? deck.imageUrl : DEFAULT_IMAGE_URL}/>
            <div className="avatar-edit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c0c0c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
            </div>
        </div>
            <div>
            <div>{deck.description}</div>
            <div className="deck-detail-total-cards">Total cards: {deck.totalCards}</div>
            <div className="deck-detail-need-to-learn">Need to learn: {deck.cardsLeft}</div>
            </div>
            <div className="add-button" onClick={onClickAddCard}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7952eebb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </div>
        </div>
        <div className="deck-detail-button-start" onClick={onClickLearn}>
            Start learning
        </div>

        {/* Cards List */}
        <div className="deck-detail-cards-list">
            <h3>Cards</h3>
            {(!cards || cards.length === 0) ? (
            <div>No cards in this deck.</div>
            ) : (
            cards.map((card, idx) => (
                <div className="deck-detail-card" key={idx} onClick={() => onClickDetailCard(card)}>
                    <div className="deck-detail-card-front">{card.front}</div>
                    <div
                        className="trash-icon"
                        title="Delete card"
                        onClick={e => {
                        e.stopPropagation();
                        if (window.confirm("Are you sure you want to delete this card?")) {
                            onDeleteCard && onDeleteCard(idx);
                        }
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e93146" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </div>
                </div>
            ))
            )}
        </div>
        </div>
    );
}
