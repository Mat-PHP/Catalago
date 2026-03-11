import "./banner.css"

export default function Banner() {
    return (
        <section className="topinho" id="sobre">
            <div className="topinho-conteudo">
                <h1>Personagens Favs</h1>
                <p>
                Exemplo se sitezinhno com meus personagens favoritos, just for fun, vocês vão poder cololcar o que quiser, mas lembrem que é só um exercicio sz'
                </p>
                <div className="topinho-botoes">
                    <a className="btn btn-primary" href="#cat_btn">Categorias</a>
                </div>
            </div>

            <article className="topinho-card">
                <div className="top-cardzinho">
                    <hgroup>
                        <h2 className="cardzinho-titulo">Destaque do day</h2>
                        <p className="cardzinho-text">Tomoe - Kamisama Kiss</p>
                    </hgroup>
                    
                    <figure className="cardzinho-img">
                        <img src="https://preview.redd.it/im-a-voice-impressionist-ill-record-a-free-voice-message-as-v0-0ax7ojzvmwdc1.jpeg?width=640&crop=smart&auto=webp&s=388f0352c059cd551fcf3d351e0cf6bdf8eb77bd" alt="Tomoe"/>
                    </figure>
                </div>
            </article>
        </section>
    );
}