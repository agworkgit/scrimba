// Style Sheets

import './style/App.css';
import './style/Header.css';
import './style/Form.css';

// Imported Components

import Header from './components/Header';
import Main from './components/Main';
import Form from './components/Form';

// Current Component

export default function App() {
    return (
        <>
            <Header />
            <Main>
                <Form />
            </Main>
        </>
    );
}
