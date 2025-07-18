import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function MainNav() {
    
    const [searchField, setSearchField] =useState('');
    const [isExpanded, setIsExpanded] = useState(true);
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    function submitForm(e) {
        e.preventDefault(); // prevent the browser from automatically submitting the form
        setIsExpanded(false);
        if (searchField.trim() !== '') {
            router.push(`/artwork?title=true&q=${encodeURIComponent(searchField)}`) // encodeURIComponent: correctly handles special characters
            setSearchHistory(current => [...current, `title=true&q=${encodeURIComponent(searchField)}`]);
        }
        setSearchField('');        
    }

    return (
        <>
        <Navbar expand="lg" className="fixed-top" bg="dark" data-bs-theme="dark" expanded={isExpanded} >   {/* Controlled by state  */}
        <Container fluid>
            <Navbar.Brand>Daniel Choi</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" onClick={() => setIsExpanded(!isExpanded)}/>
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Link href="/" legacyBehavior passHref onClick={() => setIsExpanded(false)}><Nav.Link active={router.pathname === "/"}>Home</Nav.Link></Link>
                <Link href="/search" legacyBehavior passHref onClick={() => setIsExpanded(false)}><Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
            </Nav>
            <Form className="d-flex --bs-body-bg" onSubmit={submitForm}>
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 bg-white text-dark"
                aria-label="Search"
                value={searchField} 
                onChange={(e) => setSearchField(e.target.value)}
                />
                <Button type="submit" variant="success">Search</Button>
            </Form>
            <Nav>
                <NavDropdown title="User Name" id="basic-nav-dropdown">
                    <Link href="/favourites" legacyBehavior passHref onClick={() => setIsExpanded(false)}>
                        <NavDropdown.Item active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                    </Link>   
                    <Link href="/history" legacyBehavior passHref onClick={() => setIsExpanded(false)}>
                        <NavDropdown.Item active={router.pathname === "/history"}>Search History</NavDropdown.Item>
                    </Link>      
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <br /><br />
        </>
    );
}


