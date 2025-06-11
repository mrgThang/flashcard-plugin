import React, { useEffect, useState } from "react";
import { marked } from "marked";
import "../../styles.css";
import { CardItem } from "src/interfaces/card";
import { GetCardsHandler, StudyCardHandler } from "src/requests/request";

interface LearnViewProps {
  onGoToDeckDetail: () => void;
  deckId: number;
}

export default function LearnView({ onGoToDeckDetail, deckId }: LearnViewProps) {
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [currentCard, setCurrentCard] = useState<CardItem>()
  const [remainingCards, setRemainingCards] = useState<number>(0)

  const fetchCards = () => {
    GetCardsHandler({
      "deckId": deckId,
      "isForStudy": true,
      "page": 1,
      "pageSize": 1,
    }).then(resp => {
      setRemainingCards(resp.pagination.totalItems)
      if (resp.pagination.totalItems > 0) {
        setCurrentCard(resp.cards[0])
      }
    })
  }

  useEffect(() => {
    fetchCards()
  }, []);

  const handleFlip = () => {
    setFlipped(f => !f);
  };

  const handleNext = (q: number) => {
    StudyCardHandler({"cardId": currentCard.id, "qualityOfResponse": q}).then(
      () => {
        setAnimating(true);
        setTimeout(() => {
          setAnimating(false);
          setFlipped(false);
        }, 300);
        fetchCards()
      }
    )
  };

  return (
    <div>
      {/* Header Row */}
      <div className="header-row">
        <div className="back-icon" onClick={onGoToDeckDetail}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </div>
        <h2>Learn</h2>
      </div>

      {/* Remain container */}
      <div className="learn-remain-container">
        <h4>Remaining cards: {remainingCards}</h4>
      </div>

      {/* Card container */}
      {remainingCards > 0 && <div className="learn-card-container">
        <div
          className={`learn-flashcard${flipped ? " flipped" : ""}${animating ? " fade-out" : ""}`}
          onClick={handleFlip}
        >
          <div className="learn-flashcard-inner">
            <div className="learn-flashcard-front" dangerouslySetInnerHTML={{ __html: marked.parse(currentCard?currentCard.front:"") }} />
            <div className="learn-flashcard-back" dangerouslySetInnerHTML={{ __html: marked.parse(currentCard?currentCard.back:"") }} />
          </div>
        </div>
      </div>}

      {/* Options */}
      { remainingCards > 0 && <div className="learn-options-grid">
        <div className="learn-options-row">
          <div className="learn-option learn-option-forgot" onClick={() => handleNext(1)}>
            <div className="learn-option-label">Forgot</div>
            <div className="learn-option-days">{currentCard?.estimatedTime[0]} days</div>
          </div>
          <div className="learn-option learn-option-struggled" onClick={() => handleNext(2)}>
            <div className="learn-option-label">Struggled</div>
            <div className="learn-option-days">{currentCard?.estimatedTime[1]} days</div>
          </div>
        </div>
        <div className="learn-options-row">
          <div className="learn-option learn-option-almost" onClick={() => handleNext(3)}>
            <div className="learn-option-label">Almost there</div>
            <div className="learn-option-days">{currentCard?.estimatedTime[2]} days</div>
          </div>
          <div className="learn-option learn-option-gotit" onClick={() => handleNext(4)}>
            <div className="learn-option-label">Got it!</div>
            <div className="learn-option-days">{currentCard?.estimatedTime[3]} days</div>
          </div>
        </div>
      </div>}
    </div>
  );
}
