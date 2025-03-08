import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useState } from "react";

export default function Maps(){
    
    const position: [number, number] = [2.9234, -75.2819];
    const [markers, setMarkers] = useState<[number, number][]>([]);

    function MapClick(){
        useMapEvents({
            click(e){
                const newMarker : [number, number] = [e.latlng.lat, e.latlng.lng];
                setMarkers(prevMarkers=>[...prevMarkers, newMarker]);
            }
        })
    }

    return(
        <>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ width: "100%", height: "500px" }}>
                <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker}>
                        <Popup> {position} </Popup>
                    </Marker>
                ))}
                <Marker position={position}>
                    <Popup>Pitalito, Huila</Popup>
                </Marker>
            </MapContainer>
        </>
    )
}