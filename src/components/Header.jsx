import "./header.css"
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);


  const handleLinkClick = () => setOpen(false);

  return (
    <header className="header">
      <div className="container headerzin">
        <div className="logo">
          <strong>Meus personagens</strong>
        </div>

        {/*sanduba*/}
        <button
          type="button"
          className={`sanduiche ${open ? "aberta" : ""}`}
          onClick={() => setOpen((v) => !v)}
          title={open ? "Fechar menu" : "Abrir menu"}
        >
          <span className="hamburguin" />
          <span className="hamburguin" />
          <span className="hamburguin" />
        </button>

        {/* normale */}
        <nav className={`nav ${open ? "aberta" : ""}`}>
          <a href="#sobre" onClick={handleLinkClick}>Sobre</a>
          <a href="#categorias" onClick={handleLinkClick}>Categorias</a>
          <a href="#genero" onClick={handleLinkClick}>Gênero</a>
        </nav>
      </div>
    </header>
  );
}