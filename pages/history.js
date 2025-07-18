import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import styles from '@/styles/History.module.css';

export default function History() {

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const router = useRouter();
    
    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, index){
        e.preventDefault(); 
        router.push(`artwork?${searchHistory[index]}`)
    }

    function removeHistoryClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1)
            return x;
        });
    } 

    if (parsedHistory.length === 0) {
        return (
            <Card>
                <Card.Body>
                    <h4>Nothing Here</h4>
                    Try searching for some artwork.
                </Card.Body>
            </Card>
        );
    }


    return (
        <ListGroup className="mt-4">
            {parsedHistory.map((historyItem, index) => (
                <ListGroup.Item className={styles.historyListItem} key={index} action onClick={e => historyClicked(e, index)}>
            {Object.entries(historyItem).map(([key, val]) => (
            <span key={key}>
              {key}: <strong>{val}</strong>&nbsp;
            </span>
            ))}

            <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={e => removeHistoryClicked(e, index)}
            >
                &times;
            </Button>
            </ListGroup.Item>
            ))}
        </ListGroup>
    )
}