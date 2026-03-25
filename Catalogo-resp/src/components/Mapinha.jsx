import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import L from "leaflet"; // Importe o L para usar latLng e distanceTo

export default function Mapinha() {
    const localInicial = [-22.913933, -47.00]; // Coordenadas padrão
    const [posicao, setPosicao] = useState(null);
    const [erro, setErro] = useState("");
    const [pontos, setPontos] = useState([]);
    const idRef = useRef(1);

    // Funções de utilidade
    function calculardistanciaM(alvo, origem) {
        if (!origem) return null;
        const a = L.latLng(origem);
        const b = L.latLng(alvo.lat, alvo.lng);
        return a.distanceTo(b);
    }

    function formatarM(metros) {
        if (metros == null) return "--";
        if (metros < 1000) return `${metros.toFixed(0)} m`;
        return `${(metros / 1000).toFixed(2)} km`;
    }

    function adcionarPonto({ lat, lng }) {
        const novo = {
            id: idRef.current++,
            lat,
            lng,
            distanciaM: calculardistanciaM({ lat, lng }, posicao || localInicial)
        };
        setPontos((prev) => [...prev, novo]);
    }

    function limparPontos() {
        setPontos([]);
        idRef.current = 1;
    }

    const pontosOrdenados = [...pontos].sort((a, b) => {
        const da = a.distanciaM ?? Infinity;
        const db = b.distanciaM ?? Infinity;
        return da - db;
    });

    // Efeito para pegar a localização do usuário
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setErro("Seu navegador não tem suporte para geolocalização!");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosicao({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            () => setErro("Não foi possível obter sua localização"),
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
        );
    }, []);

    // Componente interno para capturar o clique no mapa
    function ClickHandler({ onAdd }) {
        useMapEvent({
            click(e) {
                const { lat, lng } = e.latlng;
                onAdd({ lat, lng });
            },
        });
        return null;
    }

    return (
        <section className="mapinha" style={{ padding: "20px" }}>
            <h1>Mapinha :3</h1>

            {erro && <div style={{ color: "red" }}>{erro}</div>}

            <section className="painel" style={{ marginBottom: "20px" }}>
                <div className="painel-topo">
                    <strong>Pontos Adicionados </strong>
                    <button onClick={limparPontos}>Limpar Pontos</button>
                </div>

                {pontos.length === 0 ? (
                    <p>Nenhum ponto adicionado. Clique no mapa!</p>
                ) : (
                    <ul className="lista-pontos">
                        {pontosOrdenados.map((p) => (
                            <li key={p.id}>
                                {p.lat.toFixed(5)}, {p.lng.toFixed(5)} | 
                                <strong> {formatarM(p.distanciaM)}</strong>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <MapContainer
                center={posicao ? [posicao.lat, posicao.lng] : localInicial}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {posicao && (
                    <Marker position={[posicao.lat, posicao.lng]}>
                        <Popup>Você está aqui!</Popup>
                    </Marker>
                )}

                {pontos.map((p) => (
                    <Marker key={p.id} position={[p.lat, p.lng]}>
                        <Popup>
                            <strong>Ponto #{p.id}</strong>
                            <br />
                            Distância: {formatarM(p.distanciaM)}
                        </Popup>
                    </Marker>
                ))}

                <ClickHandler onAdd={adcionarPonto} />
            </MapContainer>
        </section>
    );
}