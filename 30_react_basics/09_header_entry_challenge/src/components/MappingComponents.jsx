import Entry from './Entry';
import data from '../data/data';

export default function MappedEntry() {
    const mappedArray = data.map((item) => {
        return (
            <Entry
                key={item.id}
                img={item.img}
                title={item.title}
                country={item.country}
                googleMapsLink={item.googleMapsLink}
                dates={item.dates}
                text={item.text}
            />
        );
    });
    console.log(mappedArray);
    return <main className='container'>{mappedArray}</main>;
}
