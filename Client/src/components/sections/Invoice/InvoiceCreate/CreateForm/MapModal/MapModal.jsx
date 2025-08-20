import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import styles from './styles.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const MapModal = ({ isOpen, onClose, onAddressSelect }) => {
    const [selectedPosition, setSelectedPosition] = useState(null);

    if (!isOpen) return null;

    const handleMapClick = async (e) => {
        const { lat, lng } = e.latlng;
        setSelectedPosition([lat, lng]);
        
        try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const address = data.display_name || 'Адрес не найден';
        onAddressSelect(address);
        onClose();
        } catch (error) {
        console.error('Ошибка получения адреса:', error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={onClose}>×</button>
            <h3>Select an address on the map</h3>
            <MapContainer
            center={[58.0105, 56.2502]} 
            zoom={13}
            style={{ height: '400px', width: '100%' }}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            <MapClickHandler onClick={handleMapClick} />
            {selectedPosition && <Marker position={selectedPosition} />}
            </MapContainer>
        </div>
        </div>
    );
    };

    function MapClickHandler({ onClick }) {
    useMapEvents({
        click: onClick,
    });
    return null;
    }

export default MapModal;