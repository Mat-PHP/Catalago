import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export default function Mapinha() {
    // Objetos precisam de chaves e valores ou ser arrays para coordenadas
    const centroInicial = { lat: -22.913933, lng: -47.00 };
    const [posicao, setPosicao] = useState(null);
    const [erro, setErro] = useState("");

    const [pontos, setPontos] = useState([]);
    const idRef= useRef(1);

    function calculardistanciaM(alvo,origem){
        if(!origem) return null;

        const a= L.latLng(origem)
        const b= L.latLng(alvo.lat,alvo.lng)
        return a.distanceTo(b);



    }


    function formatarM(metros){
        if (metros== null) return"--"
        if(metros<1000) return ${metros.tofixed(0)} m
        return ${(metros/ 1000).tofixed(2)}km

    }

    function adcionarPonto({lat,lng}{
        const novo={
            id:idRef.current++,
            lat,
            lng,
            distanciaM.calculardistanciaM({lat,lng},local)
        }

        setPontos((prev)=>[...prev,novo] )
    }

    function limparPontos(){
        setPontos([])
        idRef.current=1


    }

    const pontosordenados=[...pontos].sort( (a,b)=>{
        const da = a.distanciaM?? Infinity
        const db= b. distanciaM?? Infinity
        return da - db;

    }

    useEffect(() => {
        
        if (!("geolocation" in navigator)) {
            setErro("Seu navegador não tem suporte para geolocalização!");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosicao({
                    lat: pos.coords.latitude, // Correção: coords.latitude
                    lng: pos.coords.longitude,
                });
            },
            () => {
                setErro("Não foi possível obter sua localização");
            },
            {
                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 0,
            }
        );
    }, []);

    const local = [-22.9137900, -47.068100];
    const zoomInicial = 15;

    function ClickHandler({onAdd}){
        useMapEvent({
            click(e){
                const{lat,lng} = e.lating;
                onAdd({lat,lng});

            },
        });
        return null;
        
        
    }
    return (
        <section className="mapinha">
            <h1>Mapinha :3</h1>

            {erro && <div className="erro">{erro}</div>}


            <section className="painel">
                <div className="painel-topo">
                    <span> Pontos Adicionados</span>
                    <button className="botao"
                    onClick={limparPontos}>
                        limparPontos!
                    </button>

                </div>
            </section>

            <MapContainer
                center={posicao ? [posicao.lat, posicao.lng] : local}
                zoom={zoomInicial}
                scrollWheelZoom={true}
                className="mapa"
                style={{ height: "400px", width: "100%" }} // Leaflet precisa de altura definida
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {posicao && (
                    <Marker position={[posicao.lat, posicao.lng]}>
                        <Popup>Você está aqui!!!</Popup>
                    </Marker>
                )}
            </MapContainer>
        </section>
    );
}
