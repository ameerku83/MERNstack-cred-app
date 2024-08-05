import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { apiProduct } from './api';

const ProductForm = () => {
    const { id } = useParams();
    const history = useNavigate();
    const { register, handleSubmit, setValue,formState:{errors} } = useForm();
    

    useEffect(() => {
        if (id) {
            //apiProduct.getProduct(id)
            axios.get("http://localhost:5000/api/products/"+id)
                .then(response => {
                    const { title, price, quantity, image } = response.data;
                    
                    setValue('title', title);
                    setValue('price', price);
                    setValue('quantity', quantity);
                    setValue('image', image);
                })
                .catch(error => console.error(error));
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        if (data.image[0]) {
            formData.append('image', data.image[0]);
        }
        try {
            const token = localStorage.getItem('token');
            if (id) {
                await apiProduct.updateProduct(id, formData, token);
                alert('Product updated successfully');
            } else {
                await apiProduct.createProduct(formData, token);
                alert('Product created successfully');
            }
            history('/');
        } catch (err) {
            console.error(err);
            alert('Failed to save product');
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" {...register('title')} required />
            </Form.Group>
            <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" step="0.01" {...register('price')} required />
            </Form.Group>
            <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" {...register('quantity')} required />
            </Form.Group>
            <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" {...register('image',{required:"choose a file....!!"})}  />
              <span className='text-danger'>{ errors.image?.message}</span>
            </Form.Group>
            <Button className='mt-3' variant={id ? "success": "primary"} type="submit">
                {id ? 'Update Product' : 'Create Product'}
            </Button>
        </Form>
    );
};

export default ProductForm;
