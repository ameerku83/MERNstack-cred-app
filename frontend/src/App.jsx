


import React from 'react';


import { BrowserRouter as Router, Route, Routes, createBrowserRouter, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AuthForm from './AuthForm';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import Root from './Root';
import { ErrorPage } from './ErrorPage';


// const App = () => {
//     return (
//         <Router>
//             <Container>
//                 <Routes>
//                 <Route path="/login"  element={<AuthForm type="login" />} />
//                 <Route path="/signup" element={<AuthForm type="signup" />} /> 
//                 <Route path="/create" element={<ProductForm />   }/>
//                 <Route path="/edit/:id" element={<ProductForm />}/>
//                 <Route path="/" element={ <ProductList />}/>
                       
              
//                 </Routes>
//             </Container>
//         </Router>
//     );
// };

const PrivetRoute =({children}) => {
  const isAuth= localStorage.getItem("token12345678765!@#$%^&^%$##$(*&^^&",)
return isAuth ? children : <Navigate to="/login" />;
};


const router=createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"/",
        element: <PrivetRoute><ProductList /></PrivetRoute> 
      },
      {
        path:"/edit/:id",
         element: <PrivetRoute><ProductForm /></PrivetRoute>
      },
      {
        path:"/signup",
         element:<AuthForm type="signup" />
      },
      {
        path:"/login",
         element:<AuthForm type="login" />
      },
      {
         path:"/create",
         element:  <PrivetRoute><ProductForm/></PrivetRoute>
      }
      
    ]
  }
])
export default router