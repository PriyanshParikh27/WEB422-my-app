import { useState } from 'react';
import { Navbar, Nav, Form, Button, Container, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from "next/link";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const submitForm = (e) => {
        e.preventDefault();
        setIsExpanded(false);
        let queryString = `title=true&q=${searchField}`;
        setSearchHistory((current) => [...current, queryString]);
        router.push(`/artwork?title=true&q=${searchField}`);
    };
    return (
        <><Navbar
            className="fixed-top navbar-dark bg-dark"
            expand="lg"
            expanded={isExpanded}
        >
            <Container>
                <Navbar.Brand>Priyansh Parikh</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" onClick={(e) => setIsExpanded((value) => !value)} />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior>
                            <Nav.Link
                                onClick={(e) =>
                                    isExpanded ? setIsExpanded((value) => !value) : null
                                } active={router.pathname === "/"}
                            > Home </Nav.Link>
                        </Link>
                        <Link href="/search" passHref legacyBehavior>
                            <Nav.Link
                                onClick={(e) =>
                                    isExpanded ? setIsExpanded((value) => !value) : null
                                } active={router.pathname === "/search"}
                            > Advanced Search </Nav.Link>
                        </Link>
                    </Nav> &nbsp;
                    <Form className="d-flex" onSubmit={submitForm}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                        />
                        <Button variant="success" type="submit">Search</Button>
                    </Form> &nbsp;
                    <Nav>
                        <NavDropdown title="User Name" id="basic-nav-dropdown">
                            <Link href="/favourites" passHref legacyBehavior>
                                <NavDropdown.Item
                                    onClick={(e) =>
                                        isExpanded ? setIsExpanded((value) => !value) : null
                                    } active={router.pathname === "/favourites"}
                                > Favourites </NavDropdown.Item>
                            </Link>
                            <Link href="/history" passHref legacyBehavior>
                                <NavDropdown.Item
                                    onClick={(e) =>
                                        isExpanded ? setIsExpanded((value) => !value) : null
                                    } active={router.pathname === "/history"}
                                > Search History </NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar><br /><br /></>
    );
}
