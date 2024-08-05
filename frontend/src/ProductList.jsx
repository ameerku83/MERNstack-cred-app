import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiProduct } from './api';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        apiProduct.getProducts()
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await apiProduct.deleteProduct(id, token);
            setProducts(products.filter(product => product._id !== id));
            alert('Product deleted successfully');
        } catch (err) {
            console.error(err);
            alert('Failed to delete product');
        }
    };
   if(products.length===0)return( <button> <h3><Link to={'/create'} >add product</Link>  </h3></button> )
    return (
        <div  >
        <Table striped bordered hover className='mt-5 shadow text-center'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product._id}>
                        <td style={{maxWidth:200,overflow:"auto"}} >{product.title}</td>
                        <td>Rs:{product.price}/-</td>
                        <td>{product.quantity}</td>
                        <td><img src={`https://ameerku-cred-app.onrender.com/${product.image}`} alt={product.title} style={{ width: '100px' }} /></td>
                        <td >
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>

                            <Button variant="primary" size="sm" as={Link} to="/create">Add Product</Button>
                            <Link to={`/edit/${product._id}`} className="btn btn-success btn-sm">Edit</Link> 
                            <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
    );
};

export default ProductList;
