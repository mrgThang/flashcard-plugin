import React, { useState } from "react";
import LoginView from "./pages/login"
import DeckView from "./pages/deck"
import CreateDeckView from "./pages/create_deck"
import DeckDetailView from "./pages/deck_detail"

type View =
  | "login"
  | "signup"
  | "deck"
  | "deck-detail"
  | "create-deck"
  | "create-card"
  | "learn";

export default function App() {
  const [view, setView] = useState<View>("login");
  const [deckId, setDeckId] = useState<number>();

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
        />
      )}
      {view === "deck-detail" && (
        <DeckDetailView
          deckId={deckId}
          onClickBack={() => setView("deck")}
          onClickAddCard={() => setView("create-card")}
          onClickLearn={() => setView("learn")}
          onClickEditDeck={() => setView("create-deck")}
        />
      )}
      {view === "create-deck" && (
        <CreateDeckView
          onSubmit={() => setView("deck")}
          onCancel={() => setView("deck")}
        />
      )}
      {view === "create-card" && (
        <CreateCardView
          onBackToDeckDetail={() => setView("deck-detail")}
        />
      )}
      {view === "learn" && (
        <LearnView onGoToDeckDetail={() => setView("deck-detail")} />
      )}
    </>
  );
}