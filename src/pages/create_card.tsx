import React, { useEffect, useState } from "react";
import { marked } from "marked";
import "../../styles.css";
import { CreateCardHandler, UpdateCardHandler } from "src/requests/request";
import { ShowError } from "src/helpers/notify";
import { CardItem } from "src/interfaces/card";

interface CreateCardProps {
  oldCard?: CardItem
  deckId: number
  onBackToDeckDetail: () => void;
}

export default function CreateCardView({ oldCard, deckId, onBackToDeckDetail }: CreateCardProps) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [isOldCardSet, SetIsOldCardSet] = useState(Boolean)

  useEffect(() => {
    if (oldCard && !isOldCardSet) {
        setBack(`${oldCard.back}`)
        setFront(`${oldCard.front}`)
        SetIsOldCardSet(true)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (front == "" || back == "") {
        ShowError(new Error("Must fill all front and back"))
        return
    }
    if (oldCard) {
        UpdateCardHandler({"front": front, "back": back, "deckId": deckId, "id": oldCard.id}).then(
            () => {
                onBackToDeckDetail()
            }
        )
        return
    }
    CreateCardHandler({"front": front, "back": back, "deckId": deckId}).then(
        () => {
            onBackToDeckDetail()
        }
    )
  };

  return (
    <div>
      {/* Header Row */}
      <div className="header-row">
        <div className="back-icon" onClick={onBackToDeckDetail}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </div>
        <h2>Create new card</h2>
      </div>

      <form className="create-card-form" onSubmit={handleSubmit}>
        {/* Front */}
        <h4>Front</h4>
        <textarea
          className="create-card-editbox"
          id="card-front"
          rows={2}
          cols={100}
          placeholder="Type Markdown here..."
          value={front}
          onChange={e => setFront(e.target.value)}
        />
        <div
          className="create-card-preview"
          id="card-front-preview"
          dangerouslySetInnerHTML={{ __html: marked.parse(front) }}
        />

        {/* Back */}
        <h4>Back</h4>
        <textarea
          className="create-card-editbox"
          id="card-back"
          rows={2}
          cols={100}
          placeholder="Type Markdown here..."
          value={back}
          onChange={e => setBack(e.target.value)}
        />
        <div
          className="create-card-preview"
          id="card-back-preview"
          dangerouslySetInnerHTML={{ __html: marked.parse(back) }}
        />

        {/* Actions */}
        <div className="create-card-row">
          <button type="submit" className="mod-cta">{oldCard ? "Update" : "Create"}</button>
          <button type="button" onClick={onBackToDeckDetail}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
