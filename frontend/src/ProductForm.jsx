import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container,  } from 'react-bootstrap';

const FormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
     id? window.location.replace(`https://ameerku83-cred-app.onrender.com/edit/${id}`):window.location.replace(`https://ameerku83-cred-app.onrender.com/create`)

  React.useEffect(() => {
    if (id) {
      axios.get(`https://ameerku-cred-app.onrender.com/products/${id}`,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      }).then((response) => {
        const product = response.data;
        setValue('title', product.title);
        setValue('description', product.description);
        setValue('price', product.price);
        setValue('image', product.image);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('image', data.image[0]);

    if (id) {
      try {
        await axios.put(`https://ameerku-cred-app.onrender.com/products/${id}`, formData,{
          headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
        });
       alert("product updated")
      } catch (error) {
        console.log(error);
       
      }
      
    } else {
      try {
        await axios.post('https://ameerku-cred-app.onrender.com/products', formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        alert("product added")
      } catch (error) {
        console.log(error);
       
      }
    
    }

    navigate('/');
  };

  return (
    <Container >
    <Form className='mx-5'  onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" {...register('title')} required />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3}  {...register('description')} required />
      </Form.Group>

      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" {...register('price')} required />
      </Form.Group>

    {
      id? <Form.Group controlId="image">
      <Form.Label>Image</Form.Label>
      <Form.Control type="file" {...register('image')}   />
    </Form.Group> :
     <Form.Group controlId="image">
     <Form.Label>Image</Form.Label>
     <Form.Control type="file" {...register('image')} required  />
   </Form.Group>
    } 

      <Button variant="primary mt-2" type="submit">
        {id? "update":"add product"}
      </Button>
    </Form>
    </Container>
    
  );
};

export default FormPage;
