
import { useEffect, useState } from "react";
import "./features.css"

export default function Features() {
    
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/data/personagens.json")
      .then(res => res.json())
      .then(setItems);
    console.log(items)
  }, []);


  return (
    <section className="features" >
      <h2>Personagens</h2>
      <div className="grid">
        {items.map((i) => (
          <article className="card" key={i.name}>
            <h3>{i.name}</h3>
            <p>{i.genero}</p>
            
            <figure>
                <img src={i.imga} alt={i.name} />
            </figure>

            <h3>{i.origin}</h3>
            <p>{i.categoria}</p>
          </article>
        ))}
      </div>
    </section>
  );
}