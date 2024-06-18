"use client";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapComponent = dynamic(() => import('../../components/MapComponent'), { ssr: false });

const Home = () => {
  return (
    <div>
      <h1>Guess the Country</h1>
      <MapComponent />
    </div>
  );
};

export default Home;
