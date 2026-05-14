import { useEffect, useState, useId, useRef } from "react";

export default function QuestionDialog({
    questao, // Alterado de questoes para questao (singular, pois é um objeto único)
    index,
    total,
    onClose,
    onCorrect,
}) {
    const titleId = useId();

    const dialogRef = useRef(null);
    const closeBtn = useRef(null);
    const prevFocus = useRef(null);

    const [resposta, setResposta] = useState("");
    const [feedback, setFeedback] = useState({ type: "info", msg: "" });
    const [isCorrect, setIsCorrect] = useState(false);

    // Função de normalização de strings para validação sem acentos ou caracteres especiais
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

        if (!resposta.trim()) {
            setFeedback({ type: "info", msg: "Por favor, digite uma resposta." });
            return;
        }

        const user = normalize(resposta);
        const ok = (questao.resposta || []).some(
            (resp) => normalize(resp) === user
        );

        if (ok) {
            setIsCorrect(true);
            setFeedback({
                type: "success",
                msg: "Resposta correta! Próxima liberada.",
            });

            if (onCorrect) {
                onCorrect();
            }
        } else {
            setIsCorrect(false);
            setFeedback({
                type: "error",
                msg: "Não foi dessa vez, tente de novo!",
            });
        }
    };

    useEffect(() => {
        // Guarda o elemento que estava focado antes de abrir o diálogo (Acessibilidade)
        prevFocus.current = document.activeElement;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        
        // Joga o foco inicial para o botão de fechar
        closeBtn.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }

            // Implementação de Focus Trap básico (Mantém o foco dentro do modal ao usar Tab)
            if (event.key === "Tab" && dialogRef.current) {
                const focusableElements = dialogRef.current.querySelectorAll(
                    'button, input, [tabindex="0"]'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", handleKeyDown);

            // Devolve o foco para onde estava antes do modal abrir
            if (prevFocus.current instanceof HTMLElement) {
                prevFocus.current.focus();
            }
        };
    }, [onClose]);

    return (
        <div className="dialog-overlay"> {/* Camada de fundo escuro comumente necessária */}
            <div
                id={`dialog-${questao.id}`}
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
                        {questao.titulo}
                    </h2>

                    <button
                        ref={closeBtn}
                        type="button"
                        className="dialog-close"
                        aria-label={`Fechar pergunta: ${questao.titulo}`}
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </header>

                <div className="dialog-body">
                    <p className="dialog-question-text">{questao.pergunta}</p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={resposta}
                            onChange={(e) => setResposta(e.target.value)}
                            placeholder="Digite sua resposta"
                            disabled={isCorrect} // Desabilita o input se já acertou

                        />

                        <div
                        className={'question-feedback

                        question- feedback--${feedback.type}'}

                        <button type="submit" disabled={isCorrect}>
                            Verificar
                        </button>
                    </form>

                    {feedback.msg && (
                        <p className={`feedback ${feedback.type}`} role="alert">
                            {feedback.msg}
                        </p>
                    )}

                    {isCorrect && (
                        <button type="button" className="btn-continue" onClick={onClose}>
    Continuar
</button>

<section className="dialog-content" tabIndex={-1}>
    <form onSubmit={handleSubmit}>
        <label className="question-label" htmlFor="resposta">
            Sua resposta
        </label>

        <input
            id="resposta"
            className="question-input"
            type="text"
            autoComplete="off"
            aria-describedby={feedback?.type === "error" ? "error-message" : undefined}
        />
    </form>
</section>
