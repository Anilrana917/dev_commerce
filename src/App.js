import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Auth from "./components/Auth";
import { Provider } from "react-redux";
import "./App.css";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import store from "./redux/store";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
              <Link className='anchor-tags' to='/'>
                <h3>DevEcommerce</h3>
              </Link>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse
                id='basic-navbar-nav'
                className='justify-content-between'
              >
                <Nav className='mr-auto'>
                  <Link className='anchor-tags' to='/'>
                    Home
                  </Link>
                  <Link className='anchor-tags' to='/login'>
                    Login
                  </Link>
                </Nav>
                <Form className='d-flex'>
                  <FormControl
                    type='text'
                    placeholder='Type here...'
                    className='mr-sm-2'
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Button variant='outline-info'>Search</Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Container className='mt-4'>
            <Switch>
              <Route
                path='/'
                exact
                render={(props) => (
                  <ProductList searchTerm={searchTerm} {...props} />
                )}
              />
              <Route path='/login' component={Auth} />
            </Switch>
          </Container>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
