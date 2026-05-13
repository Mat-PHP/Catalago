import { useEffect, useState, useId, useRef } from "react";

export default function Questiondialog({
    questoes,
    index,
    total,
    onclose,
    onCorrect,
}) {

    const titleId = useId();

    const dialogRef = useRef(null);
    const closeBtn = useRef(null);
    const prevFocus = useRef(null);

    const [resposta, setresposta] = useState("");
    const [feedback, setfeedback] = useState({ type: "info", msg: "" });
    const [iscorrect, setiscorrect] = useState(false);

    const normalize = (s) =>
        (s ?? "")
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[.,;:!?()"´'^~]/g, "")
            .trim()
            .toLowerCase();

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = normalize(resposta);
        const ok = (questoes.resposta || []).some(
            (resp) => normalize(resp) === user
        );

        if (ok) {
            setiscorrect(true);
            setfeedback({
                type: "success",
                msg: "Resposta correta! Proxima liberada",
            });

            if (onCorrect) {
                onCorrect();
            }
        } else {
            setiscorrect(false);
            setfeedback({
                type: "error",
                msg: "Nao foi dessa vez tenta de novo",
            });
        }
    };

    useEffect(() => {
        prevFocus.current = document.activeElement;

        const prevOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";
        closeBtn.current?.focus();

        const onkey = (event) => {
            if (event.key === "Escape") onclose();
        };

        window.addEventListener("keydown", onkey);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onkey);

            if (prevFocus.current instanceof HTMLElement) {
                prevFocus.current.focus();
            }
        };
    }, [onclose]);

    return (
        <div
            id={`dialog-${questoes.id}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="dialogo"
            ref={dialogRef}
        >
            <header className="dialog-header">
                <p className="dialog-subtitle">
                    Pergunta {index + 1} de {total}
                </p>

                <h2 id={titleId} className="dialog-title">
                    {questoes.titulo}
                </h2>

                <button
                    ref={closeBtn}
                    type="button"
                    className="dialog-close"
                    aria-label={`Fechar pergunta: ${questoes.titulo}`}
                    onClick={onclose}
                >
                    Fechar
                </button>
            </header>

            <div className="dialog-body">
                <p>{questoes.pergunta}</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={resposta}
                        onChange={(e) => setresposta(e.target.value)}
                        placeholder="Digite sua resposta"
                    />

                    <button type="submit">
                        Verificar
                    </button>
                </form>

                {feedback.msg && (
                    <p className={`feedback ${feedback.type}`}>
                        {feedback.msg}
                    </p>
                )}

                {iscorrect && (
                    <button type="button" onClick={onclose}>
                        Continuar
                    </button>
                )}
            </div>
        </div>
    );
}