import { createRoot } from 'react-dom/client';
import './index.css';

import Map from './components/Map';
import Arrays from './components/ReactAndArrays';
import MappedEntry from './components/MappingComponents';

import Header from './components/Header';
import Entry from './components/Entry';

createRoot(document.getElementById('root')).render(
    <>
        {/* <Map /> */}
        {/* <Arrays /> */}
        {/* <MapComp /> */}
        <Header />
        <MappedEntry />
    </>
);
