import useSWR from 'swr';
import Error from 'next/error'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';

//const fetcher = (url) => fetch(url).then((res) => res.json()); 

export default function ArtworkCardDetail({objectID}) {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    const [showAdded, setShowAdded] = useState();

    useEffect(() => {
        if (favouritesList.includes(objectID)) {
            setShowAdded(true);
        } else {
            setShowAdded(false);
        }
    }, [favouritesList, objectID]); 

    function favouritesClicked (){
        if (showAdded) {
            setFavouritesList(current => current.filter(fav => fav != objectID));
            setShowAdded(false);
        }
        else {
            setFavouritesList(current => [...current, objectID]);
            setShowAdded(true);
        }
    }

    // console.log("objectID:", objectID);

    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
    
    if(error) {
        return <Error statusCode={404} />
    }

    if(!data) {
        return null;
    }

    const imageUrl = data?.primaryImage;
    const title = data?.title || 'N/A';
    const objectDate = data?.objectDate || 'N/A';
    const classification = data?.classification || 'N/A';
    const medium = data?.medium || 'N/A';
    const artistName = data?.artistDisplayName || 'N/A';
    const creditLine = data?.creditLine || 'N/A';
    const dimensions = data?.dimensions || 'N/A';



    return (
        <>
        <Card>
            <>
                {imageUrl && <Card.Img variant="top" src={imageUrl} />}
            </>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate}
                    <br/>
                    <strong>Classification:</strong> {classification}
                    <br/>
                    <strong>Medium:</strong> {medium}
                    <br />
                    <br />
                    <strong>Artist:</strong> {artistName}
                    {data?.artistDisplayName && (
                        <>
                            {" "}( <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a> )
                        </>
                    )}               
                    <br/>
                    <strong>Credit Line:</strong> {creditLine}
                    <br/>
                    <strong>Dimensions:</strong> {dimensions}
                    <br /><br />
                    <Button variant={showAdded ? 'primary' : 'outline-primary'} 
                        onClick={e=>favouritesClicked()}>
                            {showAdded ? '+ Favourite (added)' : '+ Favourite'}</Button>
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    );
}
    
