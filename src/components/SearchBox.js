import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search');
    }
    return (
        <Form className='d-flex me-auto' onSubmit={submitHandler} style={{ width: '500px' }}> 
            <InputGroup>
                <FormControl
                    type='text'
                    name='q'
                    id='q'
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    aria-label='Search'
                    aria-describedby="button-search">
                </FormControl>
                <Button variant='outline-dark' style={{ backgroundColor: '#F9F871', color: '#985D93', borderColor: 'white' }}type='submit' id='button-search'>
                    <i className="fas fa-search"></i>
                </Button>
            </InputGroup>
        </Form>
    )
}