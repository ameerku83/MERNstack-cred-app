import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Root = () => {
 const navigate=useNavigate()
  const toLogout = ()=>{
    localStorage.removeItem("token12345678765!@#$%^&^%$##$(*&^^&")
    navigate('/login')

  }
  return (
    <div>
        <header>
        <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end active">
          <Navbar.Text style={{fontSize:18,fontWeight:600,backgroundColor:"#a3e74a",borderRadius:10,padding:4,cursor:"pointer"}}  onClick={toLogout}>
            Log out
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </header>
        <Outlet/>
        <footer>footer</footer>
    </div>
  )
}

export default Root