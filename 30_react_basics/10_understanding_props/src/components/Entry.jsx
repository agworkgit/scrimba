/**
 * Challenge: Build out the Entry component and render 1 instance of it
 * to the App
 *
 * For now, just hard-code in the data, which you can find in
 * japan.md so you don't have to type it all out manually :)
 *
 * Notes:
 * – Only render 1 instance of this Entry component for now
 * – I've pulled in marker.png for the little map marker icon
 *   that goes next to the location name
 * – The main purpose of this challenge is to show you where our limitations
 *   currently are, so don't worry about the fact that you're hard-coding all
 *   this data into the component.
 */

import catData from '../data/catData';

function RenderCats(props) {
    return (
        <article className='card-wrapper'>
            <div className='card'>
                <div className='card-image-wrapper'>
                    <img src={props.img} className='card-image' />
                </div>
                <div className='card-details'>
                    <h2 className='card-title'>{props.name}</h2>
                    <span className='card-info'>
                        {props.phone} - {props.email}
                    </span>
                    <p className='card-description'>{props.description}</p>
                </div>
            </div>
            <div className='card-border'></div>
        </article>
    );
}

export default function Entry() {
    const catMap = catData.map((cat) => {
        return (
            <RenderCats
                img={cat.image}
                name={cat.name}
                phone={cat.phone}
                email={cat.email}
                description={cat.description}
            />
        );
    });
    return <main className='entry-container'>{catMap}</main>;
}
