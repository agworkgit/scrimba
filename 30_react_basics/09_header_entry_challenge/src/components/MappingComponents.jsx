import Entry from './Entry';
import data from '../data/data';

export default function MappedEntry() {
    const mappedArray = data.map((item) => {
        return (
            <Entry
                key={item.id}
                // React property spread operator, same as writing named props i.e img={item.img} etc... but more concise
                {...item}
            />
        );
    });
    console.log(mappedArray);
    return <main className='container'>{mappedArray}</main>;
}
