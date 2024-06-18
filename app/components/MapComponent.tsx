"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LeafletMouseEvent } from 'leaflet';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';

// Importez le fichier GeoJSON avec require
const worldGeoJSON = require('../data/world.geo.json-master/world.geo.json-master/countries.geo.json');

// Fonction de vérification de type personnalisée
function isGeoJSONLayer(layer: L.Layer): layer is L.GeoJSON<any> {
  return (layer as L.GeoJSON<any>).feature !== undefined;
}

const MapComponent = () => {
  const [lockedCountries, setLockedCountries] = useState<string[]>([]);

  useEffect(() => {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('http://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const geojsonLayer = L.geoJSON(worldGeoJSON, {
      onEachFeature: (feature: Feature<Geometry, GeoJsonProperties>, layer) => {
        const countryName = feature.properties?.name;

        // Vérifiez si le pays est verrouillé lors de la création de la couche
        if (countryName && lockedCountries.includes(countryName)) {
          (layer as L.Path).setStyle({ fillColor: 'green' });
        }

        layer.on({
          mouseover: (e: LeafletMouseEvent) => highlightFeature(e),
          mouseout: (e: LeafletMouseEvent) => resetHighlight(e),
          click: () => {
            const enteredName = prompt("Enter the country name:");
            if (enteredName && countryName) {
              if (enteredName.toLowerCase() === countryName.toLowerCase()) {
                alert("Correct!");
                (layer as L.Path).setStyle({ fillColor: 'green' });
                setLockedCountries((prev) => [...prev, countryName]);
                // Lock the country (make it unclickable)
                layer.off('click');
              } else {
                alert("Incorrect!");
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

        // Ne changez pas le style si le pays est verrouillé
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

        // Ne réinitialisez pas le style si le pays est verrouillé
        if (countryName && lockedCountries.includes(countryName)) {
          layer.setStyle({ fillColor: 'green' });
          return;
        }
      }

      geojsonLayer.resetStyle(layer);
    }

    return () => {
      map.remove();
    };
  }, [lockedCountries]);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default MapComponent;
