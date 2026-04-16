export default function ButtonQuestion({ questoes, onOpen, bloqueada, solu }) {
    const queID = `dialog-${questoes.id}`;
    
    const baseIcon = questoes.icon ?? "cute.png";

    const icon = bloqueada 
        ? "padlock.png" 
        : solu 
            ? "check.png" 
            : baseIcon;

    const aria = bloqueada
        ? `${questoes.titulo} (bloqueada, resolva a anterior)`
        : solu
            ? `${questoes.titulo} (resolvida)`
            : `${questoes.titulo} (disponível)`;

    return (
        <li className="icon-grid-item">
            <button
                type="button"
                className={`icon-button ${bloqueada ? "icon-button--locked" : ""} ${solu ? "icon-button--solved" : ""}`}
                aria-haspopup="dialog"
                aria-controls={queID}
                aria-label={aria}
                aria-disabled={bloqueada || undefined}
                onClick={() => onOpen(questoes)}
                disabled={bloqueada}
            >
                <img 
                    className="icon-button-img" 
                    aria-hidden="true" 
                    src={`/icons/${icon}`} 
                    alt="" 
                />
            </button>
        </li>
    )
}
