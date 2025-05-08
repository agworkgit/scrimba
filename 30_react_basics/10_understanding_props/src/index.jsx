import { createRoot } from 'react-dom/client';
import './index.css';
import catData from './data/catData';

import Header from './components/Header';
import Entry from './components/Entry';

createRoot(document.getElementById('root')).render(
    <>
        {/* <Map /> */}
        {/* <Arrays /> */}
        {/* <MapComp /> */}
        <Header />
        <Entry
            img={catData.image}
            name={catData.name}
            phone={catData.phone}
            email={catData.email}
        />
    </>
);
