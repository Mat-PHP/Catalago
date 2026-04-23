import { useMemo, useState } from "react";
import QUESTOES from "../../public/data/perguntas.json"; 
import "./fases.css";

import IconGrid from "./IconGrid";
import Questiondialog from "./Questiondialog";

export default function Fases() {
    const [selecionada, setSelecionada] = useState(null);
    const [trancada, setTrancada] = useState(0);
    const [resolvidas, setResolvidas] = useState(() => new Set());

    const total = QUESTOES.length;

    const handleOpen = (q) => setSelecionada(q);
    const handleClose = () => setSelecionada(null); // Corrigido para bater com a chamada abaixo

    const handleCorrect = (id) => {
        setResolvidas((prev) => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });

        const idx = QUESTOES.findIndex((q) => q.id === id);
        if (idx > -1 && idx < QUESTOES.length - 1) {
            setTrancada((prev) => Math.max(prev, idx + 1));
        }
    };

    const progresso = useMemo(() => {
        const perguntasResolvidas = resolvidas.size;
        const porcentagem = Math.round((perguntasResolvidas / total) * 100) || 0;

        return {
            resolvidas: perguntasResolvidas,
            total: total,
            porcentagem: porcentagem
        };
    }, [resolvidas, total]);

    return (
        <main className="questoes">
            <header className="q-header">
                <h1 className="q-title">Caça Morango~</h1>
                <p className="q-subtitle">Toque no ícone para abrir a pergunta</p>

                <div className="perigos">
                    <div
                        className="progresso-bar"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progresso.porcentagem}
                        aria-label={`progresso: ${progresso.resolvidas} de ${progresso.total} resolvidas`}
                        style={{ width: `${progresso.porcentagem}%` }}
                    />
                    <span className="progress-label">
                        {progresso.resolvidas} / {progresso.total}
                    </span>
                </div>
            </header>

            <IconGrid
                questoes={QUESTOES}
                onOpen={handleOpen}
                modalOpen={Boolean(selecionada)}
                trancada={trancada}
                resolvidas={resolvidas}
            />

            {selecionada && (
                <Questiondialog
                    questoes={selecionada}
                    // Correção: Adicionadas chaves {} e corrigida a sintaxe da arrow function
                    index={QUESTOES.findIndex((q) => q.id === selecionada.id)}
                    total={total}
                    // Correção: Nome da função estava "hundleClose" (com u)
                    onclose={handleClose} 
                    onCorrect={handleCorrect}
                /> // Correção: Fechamento correto da tag
            )}
        </main>
    );
}
