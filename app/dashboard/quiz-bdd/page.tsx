"use client";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapComponent = dynamic(() => import('../../components/MapComponent'), { ssr: false });

const Home = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div><h1 className='text-2xl font-bold mb-4 mt-4 flex items-center justify-center'>Guess the Country</h1>
      <MapComponent />
    </div></div>
  );
};

export default Home;
