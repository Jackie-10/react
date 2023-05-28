import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getError } from '../Utils'
import axios from 'axios'
import { Store } from '../Store'
import Form from 'react-bootstrap/Form'


export default function ForgotPasswordScreen() {

    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    // const { userInfo } = state;


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/users/forgot_password', { email });
            console.log(email + "-- " + data.email)
            // ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            // localStorage.setItem('userInfo', JSON.stringify(data));
            // setValidEmail(email)
            navigate('/new_password');
        } catch (err) {
            console.log(email)
            toast.error(getError(err));
        }
    };


    return (
        <Container className="small-container" style={{ color: "white" }}>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>
            <h1 className="my-3">Forgot Password</h1>
 
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Enter Your Email</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <div className="mb-3">
                    <Button type="submit">Send email</Button>
                </div>
            </Form>
        </Container>
    )
}
