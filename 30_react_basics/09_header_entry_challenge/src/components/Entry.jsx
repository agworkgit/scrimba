import '../index.css';

export default function Entry(props) {
    return (
        <>
            <article className='entry-container'>
                <div className='card-image-wrapper'>
                    <img
                        className='card-image'
                        src={props.img.src}
                        alt={props.img.alt}
                    />
                </div>
                <div className='entry-details'>
                    <div className='entry-marker'>
                        <img
                            className='marker-icon'
                            src='./src/assets/gps.png'
                            alt='map marker icon'
                        />
                        <span className='entry-location'>{props.country}</span>
                        <a href={props.googleMapsLink} target='_blank'>
                            View on Google Maps
                        </a>
                    </div>
                    <h2 className='entry-title'>{props.title}</h2>
                    <p className='entry-dates'>{props.dates}</p>
                    <p className='entry-text'>{props.text}</p>
                </div>
            </article>
            <div className='entry-border'></div>
        </>
    );
}
