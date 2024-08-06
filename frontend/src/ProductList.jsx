import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const ProductListPage = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://ameerku-cred-app.onrender.com/products',{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then((response) => {
      setProducts(response.data);
    });
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`https://ameerku-cred-app.onrender.com/products/${id}`,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div>
      <h1>Product List</h1>
      <Link to="/create">
        <Button variant="primary my-3">Add Product</Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <img src={`https://ameerku-cred-app.onrender.com/${product.image}`} alt={product.title} width="90" />
              </td>
              <td  >
                

                
                <Link to={`/edit/${product._id}`}>
                  <Button variant="warning">Edit</Button>
                </Link> <br />
                <Button className='mt-2' variant="danger" onClick={() => deleteProduct(product._id)}>
                  Delete
                </Button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductListPage;
