import { createRoot } from 'react-dom/client';
import './index.css';

// Organising components and importing back
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';

const root = createRoot(document.getElementById('root'));

root.render(<Page />);

export function Page() {
    return (
        <>
            <Header />
            <MainContent />
            <Footer />
        </>
    );
}
