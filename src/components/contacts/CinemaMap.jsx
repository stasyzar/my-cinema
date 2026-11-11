import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CINEMA_COORDS = [50.449767, 30.521369];

export default function CinemaMap() {
  useEffect(() => {
    const map = L.map('cinema-map', {
      scrollWheelZoom: false,
    }).setView(CINEMA_COORDS, 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    L.marker(CINEMA_COORDS)
      .addTo(map)
      .bindPopup('<b>Кінотеатр MYCINEMA</b><br>вул. Хрещатик, 24')
      .openPopup();
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="contacts-map-block">
      <div className="block-header">
        <h2>Ми на мапі міста</h2>
      </div>
      <div id="cinema-map" className="map-container" />
    </div>
  );
}