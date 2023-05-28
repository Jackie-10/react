import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getError } from '../Utils';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Store } from '../Store';


export default function NewPasswordScreen() {

    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [tmpPassword, setTmpPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Password does not match');
            return;
        }

        try {
            const { data } = await axios.post('/api/users/new_password', {

                password,
            });
            // console.log(data.password)
            // ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            // localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/profile');
        } catch (err) {
            toast.error(getError(err));
        }
    }

    return (
        <Container className="small-container" style={{ color: "white" }}>
            <Helmet>
                <title>New Passoword</title>
            </Helmet>
            <h1 className="my-3">Enter new password</h1>
            <Form onSubmit={submitHandler}>
             
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Enter the password sent</Form.Label>
                    <Form.Control onChange={(e) => setTmpPassword(e.target.value)} required />
                </Form.Group>
                
                <Form.Group className="mb-3 e-input" controlId="password">
                    <Form.Label>Enter New Password</Form.Label>
                    <Form.Control disabled={true} type="password" required onChange={(e) => setPassword(e.target.value)} />
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </Form.Group>
                </Form.Group>
     
                <div className="mb-3">
                    <Button type="submit">Update</Button>
                </div>
            </Form>
        </Container>
    )
}
