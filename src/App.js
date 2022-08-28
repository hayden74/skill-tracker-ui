import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import AppNavbar from './components/AppNavbar'
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap'

function App () {
  return (
    <>
      <AppNavbar/>
      <Container>
        <Row>
          <Col><Outlet/></Col>
        </Row>
      </Container>
    </>
  )
}

export default App
