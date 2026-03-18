import{MapContainer,Tilelayer,Marker,Popuo} from"react-leaflet";

import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react";

export default function Mapinha(){
    const centroInicial= {-22.913933, -47.00};

    const[posicao,setposicao] = useState(null);
    const[erro,setErro] =useState("");


    useEffect(() =>{

        if(!("gelocation" in navigator)){
            setErro9("Seu Navegador nao tem suporte para geocalizacao!")
            return;
        }

        navigator.gelocation.getCurrentPosition(
            (pos) => {
                setposicao({

                    lat: pos.coors.lattide,
                    lng: pos.coords.longitude,
                });

                ),
                () =>{
                    setErro("Nao foi possivel obter sua localizacão")
                },
            {
                enableHighAccuracy: true,
                timeout:8000,
                maximumAge:0,

            }

        );


    }, []);

    const local= [-22.9137900,-47.068100]
    const zoomInicial=local? 15:13;

    return(
        <section className="mapinha"> 
            <h1>Mapinha:3</h1>

            {erro && <div>className="erro">{erro}</div>}


            <MapContainer
            
                    center={posicao? local : centroInicial}
                    zoom={zoomInicial}
                    scrollWheelZoom={true}
                    className="mapa"

            
            
            >
                <Tilelayer
                    atribution"&copy; OpenstreetMap"
                    url= "https://{s}. title.openstreetmap,org/{z}/{x}/{y}
                    png"/>

                    local &&(
                        <marker posicao={local}>
                            <Popuo> voce esta aqui!!!</Popuo>

                        </marker>
                    )

            </MapContainer>


     
            

        </section>
    )



}
