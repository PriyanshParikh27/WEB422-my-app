import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${searchField}`);
    };
    return (
        <><Navbar className='fixed-top navbar-dark bg-primary' variant="light" expand="lg">
            <Container>
                <Navbar.Brand>Priyansh Parikh</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/search">Advanced Search</Nav.Link>
                    </Nav>

                    <Form className="d-flex" onSubmit={submitForm}>
                        <Form.Control type="search" className="me-2" placeholder="Search" aria-label="Search" value={searchField} onChange={(e) => setSearchField(e.target.value)} />
                        <Button type="submit" variant="success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <br />
            <br /></>
    );
}