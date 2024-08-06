import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products',{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Container>
      <h1>Product Management</h1>
      <ProductForm selectedProduct={selectedProduct} refreshProducts={refreshProducts} />
      <ProductList products={products} selectProduct={selectProduct} refreshProducts={refreshProducts} />
    </Container>
  );
};

export default UpdateProduct;
