import { useEffect, useState, useId, useRef } from "react";

export default function Questiondialog({
    questoes,
    index,
    total, 
    onclose,
    onCorrect,
}){

    const titleId = useId();

    const dialogRef = useRef(null);
    const closeBtn = useRef(null);
    const prevFocus = useRef(null);

    const [resposta, setresposta] = useState("");
    // Correção: Adicionado parêntese '(' que faltava antes da chave
    const [feedback, setfeedback] = useState({ type: "info", msg: "" }); 
    // Correção: Nome da função de estado estava escrito com 'l' (setlscorrect)
    const [iscorrect, setiscorrect] = useState(false); 

    const normalize = (s) =>
        (s ?? "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,;:!?()\"'´^~]/g, "")
        .trim()
        // Correção: O método correto é toLowerCase (faltava o 'r')
        .toLowerCase(); 

    // O componente continua aqui...
}
