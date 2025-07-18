import useSWR from 'swr';
import Error from 'next/error'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

//const fetcher = (url) => fetch(url).then((res) => res.json()); 

export default function ArtworkCard({objectID}) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
    
    if(error) {
        return <Error statusCode={404} />
    }

    if(!data) {
        return null;
    }

    const imageUrl = data.primaryImageSmall || 'https://placehold.co/280x310?text=Photo+Not+Available';
    const title = data.title || 'N/A';
    const objectDate = data.objectDate || 'N/A';
    const classification = data.classification || 'N/A';
    const medium = data.medium || 'N/A';

    
    return (
        <>
        {/* <Card style={{ width: '18rem' }}> */}
        <Card>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate}
                    <br/>
                    <strong>Classification:</strong> {classification}
                    <br/>
                    <strong>Medium:</strong> {medium}
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Button variant="primary">{objectID}</Button>
                </Link>
            </Card.Body>
        </Card>
        </>
    );
}
    
