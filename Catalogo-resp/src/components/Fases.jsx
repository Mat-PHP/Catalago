import { useMemo, useState } from "react"
import QUESTOES from "../..public/data/perguntas.json"
import "fases.css"

export default function Fases(){

    const [selcionada,setselecionada]=useState(null);
    const [trancada,settrancadas]=useState(0);
    const[resolvidas,setresolvidas]= useState(() => new Set())

    const total =QUESTOES.length

    const handleopen = (q) => selcionada(q);
    const handleclose = () => selcionada(null);


    const handleCorrect = (id) => {
        setresolvidas(prev) => {
            const next = new Set(prev);
            next.add(id);
            return next
        });
        const idx = QUESTOES.findIndex((q)=>
     q.id === id)
        if (idex > - 1 && idx <QUESTOES.length - 1){
            settrancadas((prev => Math.max(prev,idx +1)))

        }
    }
const progresso = useMemo(() =>{
    const perguntasResolvidas = resolvidas.size


    const porcentagem = match.round(  (perguntasResolvidas/total) *100)

    return{
        resolvidas: perguntasResolvidas,
        total: total,
        porcentagem:porcentagem
    }
}, [resolvidas, total])

return{
    <main className= "questoes">
    <header> className =" q-header">
    <h1 className="q-title" > Caça Morango~</h1>
    <p className="q-subtitle"> Toque no icone para abrir  a perguntas
    </p>


    <div className="perigos">
    </div
         className="progresso-bar"
         role = "progressbar'
         aria-valuemin={0}
         aria- valuemax= {100}
         aria- valuenow= {progresso.porcentagem}
         aria-label= {'progresso: ${progresso.resolvida} de
            ${progresso.total} resolvida'}
            style= {{width: ${progresso.porcentagem}%'}}/>



            <span>className="progress-label"
                {progresso.resolvidas} /
                {progresso.total}
            </span>
    
    
    </header>
}


})

}