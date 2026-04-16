import { useMemo, useState } from "react";
// Corrigido: caminho do JSON (removido os .. extras se estiver em src/components)
import QUESTOES from "../../public/data/perguntas.json"; 
import "./fases.css"; // Corrigido: falta do "./"

import IconGrid from "./IconGrid";

export default function Fases() {
    const [selecionada, setSelecionada] = useState(null); // Corrigido: nome da variável
    const [trancada, setTrancada] = useState(0);
    const [resolvidas, setResolvidas] = useState(() => new Set());

    const total = QUESTOES.length;

    const handleOpen = (q) => setSelecionada(q);
    const handleClose = () => setSelecionada(null);

    const handleCorrect = (id) => {
        setResolvidas((prev) => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });

        const idx = QUESTOES.findIndex((q) => q.id === id);
        // Corrigido: index/idx e lógica de destrancar
        if (idx > -1 && idx < QUESTOES.length - 1) {
            setTrancada((prev) => Math.max(prev, idx + 1));
        }
    };

    const progresso = useMemo(() => {
        const perguntasResolvidas = resolvidas.size;
        const porcentagem = Math.round((perguntasResolvidas / total) * 100) || 0; // Corrigido: Math.round

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
        </main>
    );
}
