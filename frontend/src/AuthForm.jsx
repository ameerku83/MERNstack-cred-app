import axios from 'axios';
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
    const { register, handleSubmit,reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            if (type === 'login') {
                const response = await axios.post('https://ameerku-cred-app.onrender.com/login', data );
                localStorage.setItem('token', response.data.token);
                reset()
                navigate('/');
                
                alert("Login success")
                

            } else {
                await axios.post('https://ameerku-cred-app.onrender.com/signup', data);
                alert('User created successfully');
                reset()
                navigate('/login');
                
            }
        } catch (err) {
            console.error(err);
          alert( "error...."+err.response.data.message);
        }
    };

    return (
        <Container>
           
            <Row className='justify-content-center ' >
            
                <Col lg={4} className=' bg-warning shadow m-3 p-3'>
                <h3 className='text-center'> {type==="signup"?"Sign up":"Log in"} </h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email" className='mt-2'>
                Email
                <Form.Control placeholder='enter email' type="email" {...register('email')} required />
            </Form.Group>
            <Form.Group controlId="password" className='mt-2'>
                Password
                <Form.Control placeholder='enter password' type="password" {...register('password')} required />
            </Form.Group>
            {type === 'signup' && (
                <Form.Group controlId="confirmPassword" className='mt-2'>
                    Confirm Password
                    <Form.Control placeholder='confirm password' type="password" {...register('confirmPassword')} required />
                </Form.Group>
            )}
            <Button variant="primary" type="submit" className='text-center w-100 mt-2'>
                {type === 'login' ? 'Login' : 'Sign Up'}
            </Button> <br/>
        </Form>

        </Col>
        <Link className='text-center w-100'  to={type==="login"?"/signup":'/login'} > { type==="login"? "New? signup now":"Login Now"}</Link>

        </Row>
        </Container>
    );
};

export default AuthForm;


// headers: {
//     'Content-Type': 'multipart/form-data',
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
//   },
