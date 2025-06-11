import React, { useState } from "react";
import LoginView from "./pages/login"
import DeckView from "./pages/deck"
import CreateDeckView from "./pages/create_deck"
import DeckDetailView from "./pages/deck_detail"
import CreateCardView from "./pages/create_card"
import LearnView from "./pages/learn"
import SignupView from "./pages/signup"
import { CardItem } from "./interfaces/card"

type View =
  | "login"
  | "signup"
  | "deck"
  | "deck-detail"
  | "create-deck"
  | "create-card"
  | "learn";

export default function App() {
  const [view, setView] = useState<View>("deck");
  const [deckId, setDeckId] = useState<number>(0);
  const [oldCard, setOldCard] = useState<CardItem>()

  return (
    <>
      {view === "login" && (
        <LoginView
          onLoginSuccess={() => setView("deck")}
          onClickSignUp={() => setView("signup")}
        />
      )}
      {view === "signup" && (
        <SignupView onSignupSuccess={() => setView("login")} />
      )}
      {view === "deck" && (
        <DeckView
          onClickDeckDetail={(deckId: number) => {
            setDeckId(deckId)
            setView("deck-detail");
          }}
          onClickAddDeck={() => setView("create-deck")}
          onExpireToken={() => setView("login")}
        />
      )}
      {view === "deck-detail" && (
        <DeckDetailView
          deckId={deckId}
          onClickBack={() => setView("deck")}
          onClickAddCard={() => setView("create-card")}
          onClickLearn={() => setView("learn")}
          onClickEditDeck={() => setView("create-deck")}
          onClickDetailCard={(card: CardItem) => {
            setOldCard(card)
            setView("create-card")
          }}
        />
      )}
      {view === "create-deck" && (
        <CreateDeckView
          oldDeckId={deckId}
          onSubmit={() => setView("deck")}
          onCancel={() => setView("deck")}
        />
      )}
      {view === "create-card" && (
        <CreateCardView
          oldCard={oldCard}
          deckId={deckId}
          onBackToDeckDetail={
            () => {
              setView("deck-detail")
              setOldCard(undefined)
            }
          }
        />
      )}
      {view === "learn" && (
        <LearnView deckId={deckId} onGoToDeckDetail={() => setView("deck-detail")} />
      )}
    </>
  );
}