import { Card } from 'react-bootstrap';
import useSWR from 'swr';
import Error from "next/error";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));
    //https://collectionapi.metmuseum.org/public/collection/v1/objects/
    function favouritesClicked() {
        if (showAdded) {
            setFavouritesList((current) => current.filter((fav) => fav != objectID));
            setShowAdded(false);
        } else {
            setFavouritesList((current) => [...current, objectID]);
            setShowAdded(true);
        }
    }
    if (error) {
        return <Error statusCode={404} />;
    }
    if (data) {
        if (data.length == 0) {
            return null;
        } else {
            return (
                <>
                    <Card>
                        {data.primaryImage && (<Card.Img variant="top" src={data.primaryImage} />)}
                        <Card.Body>
                            <Card.Title>{data.title || 'N/A'}</Card.Title>
                            <Card.Text>
                                <strong>Date:</strong> {data.objectDate || 'N/A'}<br />
                                <strong>Classification:</strong> {data.classification || 'N/A'}<br />
                                <strong>Medium:</strong> {data.medium || 'N/A'}<br /><br />
                                <strong>Artist:</strong> {data.artistDisplayName || 'N/A'}
                                &nbsp;(&nbsp;
                                {data.artistDisplayName && (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>)}&nbsp;)<br />
                                <strong>Credit Line:</strong> {data.creditLine || 'N/A'}<br />
                                <strong>Dimensions:</strong> {data.dimensions || 'N/A'}<br /> <br />
                                <Button
                                    variant={showAdded ? "primary" : "outline-primary"}
                                    onClick={favouritesClicked}
                                >
                                    {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                                </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card></>
            );
        }
    }
}
