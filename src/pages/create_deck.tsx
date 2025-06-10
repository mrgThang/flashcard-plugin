import React, { useRef, useState } from "react";
import "../../styles.css";
import { CreateDeckHandler } from "src/requests/request";

interface CreateDeckProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export default function CreateDeckView({ onSubmit, onCancel }: CreateDeckProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target?.result as string);
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    CreateDeckHandler({
        "name": name,
        "description": description,
        "imageUrl": image
    }).then(() => {
        onSubmit()
    })
  };

  return (
    <div>
      {/* Header Row */}
      <div className="header-row">
        <div className="back-icon" onClick={onCancel}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
        </div>
        <h2>Create new deck</h2>
      </div>

      <form className="create-deck-form" onSubmit={handleSubmit}>
        {/* Deck Name */}
        <div className="create-deck-row">
          <label htmlFor="deck-name">Deck Name</label>
          <input
            id="deck-name"
            type="text"
            required
            placeholder="Enter deck name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        {/* Image */}
        <div className="create-deck-row">
          <label htmlFor="deck-image">Image URL</label>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="mod-cta"
              onChange={handleFileChange}
            />
            {preview && (
              <img src={preview} alt="Preview" className="create-deck-image" style={{ display: "block", marginTop: "8px" }} />
            )}
          </div>
        </div>

        {/* Description */}
        <div className="create-deck-row">
          <label htmlFor="deck-desc">Description</label>
          <textarea
            id="deck-desc"
            rows={3}
            cols={100}
            placeholder="Describe your deck..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="create-deck-row">
          <button type="submit" className="mod-cta">Create</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
