import { createRoot } from 'react-dom/client';
import { Fragment } from 'react'; // allows us to insert what we wrote instead of our code being nested into a div
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(<Page />);

export function Page() {
    return (
        // <Fragment>
        <>
            {/* These also represent a Fragment but without having to manually import */}
            <main>
                <header>
                    {/* <img src='' alt='react logo' /> */}
                    <svg
                        width='5%'
                        height='5%'
                        viewBox='-10.5 -9.45 21 18.9'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <circle
                            cx='0'
                            cy='0'
                            r='2'
                            fill='rgb(88, 196, 220)'
                        ></circle>
                        <g
                            stroke='rgb(88, 196, 220)'
                            stroke-width='1'
                            fill='none'
                        >
                            <ellipse rx='10' ry='4.5'></ellipse>
                            <ellipse
                                rx='10'
                                ry='4.5'
                                transform='rotate(60)'
                            ></ellipse>
                            <ellipse
                                rx='10'
                                ry='4.5'
                                transform='rotate(120)'
                            ></ellipse>
                        </g>
                    </svg>
                </header>

                <section>
                    <h1>Reasons I'm excited to learn React</h1>
                    <ol>
                        <li>It has a large community</li>
                        <li>It is regularly maintained and updated</li>
                        <li>It increases employability</li>
                        <li>It is adpots a declarative way of writing code</li>
                        <li>
                            It can be used for both web and native development
                        </li>
                        <li>
                            It is composable and can make a larger project easy
                            to work on
                        </li>
                    </ol>
                </section>

                <footer>
                    © 2025 Alex Grigore development. All rights reserved.
                </footer>
            </main>
        </>
        // </Fragment>
    );
}
