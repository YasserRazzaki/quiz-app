"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LeafletMouseEvent } from 'leaflet';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../globals.css'; // Assurez-vous d'avoir un fichier CSS pour les styles globaux
import { saveUserScore } from '../lib/actions'; // Importez la fonction saveUserScore

const worldGeoJSON = require('../data/world.geo.json-master/world.geo.json-master/countries.geo.json');

function isGeoJSONLayer(layer: L.Layer): layer is L.GeoJSON<any> {
  return (layer as L.GeoJSON<any>).feature !== undefined;
}

interface InteractiveMapProps {
  geojsonData: any;
  lockedCountries: string[];
  setLockedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  gameStarted: boolean;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ geojsonData, lockedCountries, setLockedCountries, gameStarted }) => {
  const map = useMap();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (!gameStarted) return;

    const geojsonLayer = L.geoJSON(geojsonData, {
      style: {
        fillColor: 'white',
        color: '#666',
        weight: 1,
        fillOpacity: 1
      },
      onEachFeature: (feature: Feature<Geometry, GeoJsonProperties>, layer) => {
        const countryName = feature.properties?.name;

        if (countryName && lockedCountries.includes(countryName)) {
          (layer as L.Path).setStyle({ fillColor: 'green', fillOpacity: 1 });
        }

        layer.on({
          mouseover: (e: LeafletMouseEvent) => highlightFeature(e),
          mouseout: (e: LeafletMouseEvent) => resetHighlight(e),
          click: async () => {
            const { value: enteredName } = await MySwal.fire({
              title: 'Enter the country name:',
              input: 'text',
              inputPlaceholder: 'Country name',
              showCancelButton: true,
            });

            if (enteredName && countryName) {
              if (enteredName.toLowerCase() === countryName.toLowerCase()) {
                MySwal.fire('Correct!', '', 'success');
                (layer as L.Path).setStyle({ fillColor: 'green', fillOpacity: 1 });
                setLockedCountries((prev) => [...prev, countryName]);
                layer.off('click');
              } else {
                MySwal.fire('Incorrect!', 'Try again.', 'error');
              }
            }
          }
        });
      }
    }).addTo(map);

    function highlightFeature(e: LeafletMouseEvent) {
      const layer = e.target as L.Path;

      if (isGeoJSONLayer(layer)) {
        const feature = layer.feature as Feature<Geometry, GeoJsonProperties>;
        const countryName = feature.properties?.name;

        if (countryName && lockedCountries.includes(countryName)) {
          return;
        }
      }

      layer.setStyle({
        weight: 2,
        color: '#666',
        fillOpacity: 0.7
      });
    }

    function resetHighlight(e: LeafletMouseEvent) {
      const layer = e.target as L.Path;

      if (isGeoJSONLayer(layer)) {
        const feature = layer.feature as Feature<Geometry, GeoJsonProperties>;
        const countryName = feature.properties?.name;

        if (countryName && lockedCountries.includes(countryName)) {
          layer.setStyle({ fillColor: 'green', fillOpacity: 1 });
          return;
        }
      }

      geojsonLayer.resetStyle(layer);
    }

    return () => {
      map.removeLayer(geojsonLayer);
    };
  }, [geojsonData, lockedCountries, map, setLockedCountries, gameStarted]);

  return null;
};

const MapComponent: React.FC = () => {
  const [lockedCountries, setLockedCountries] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [playerName, setPlayerName] = useState<string>('');
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [gameStarted, timeLeft]);

  const startGame = () => {
    if (!playerName) {
      MySwal.fire('Error', 'Please enter your name to start the game.', 'error');
      return;
    }
    setTimeLeft(5); // Reset the timer when the game starts
    setLockedCountries([]); // Reset locked countries
    setGameStarted(true);
  };

  const endGame = async () => {
    setGameStarted(false);
    console.log('Game ended, saving score...');

    const result = await saveUserScore(playerName, lockedCountries.length);
    console.log('Save result:', result);
    MySwal.fire({
      title: 'Game Over!',
      text: `You discovered ${lockedCountries.length} countries.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Rejouer',
      cancelButtonText: 'Quitter',
    }).then((result) => {
      if (result.isConfirmed) {
        startGame();
      }
    });
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          boxShadow: '0px 2px 5px rgba(0,0,0,0.3)'
        }}
      />
      <button
        onClick={startGame}
        style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0px 2px 5px rgba(0,0,0,0.3)'
        }}
      >
        Start Quiz
      </button>
      <div
        style={{
          position: 'absolute',
          top: '90px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333'
        }}
      >
        Time Left: {timeLeft}
      </div>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        minZoom={1}
        maxZoom={12}
        style={{ height: '768px', width: '1024px', margin: '0 auto', marginTop: '150px' }}
        maxBounds={[
          [-90, -180],
          [90, 180]
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="http://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <InteractiveMap
          geojsonData={worldGeoJSON}
          lockedCountries={lockedCountries}
          setLockedCountries={setLockedCountries}
          gameStarted={gameStarted}
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
