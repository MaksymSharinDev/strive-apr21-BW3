import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import {Col, Container, Row} from "react-bootstrap";

import Navbar from "./components/Navbar/Navbar";
import Profile from './Pages/Profile/Profile.jsx'
import Feed from "./Pages/Feed/Feed";

import Sidebar from "./Pages/Profile/Sidebar/SidebarContainer/SidebarContainer";
import Footer from "./components/Footer/Footer";


function App() {
    return (
        <div className="App" style={{backgroundColor: 'darkcyan'}}>

            <Router>
                <Container fluid className={'p-0'}>
                    <nav style={{backgroundColor: "white", borderBottom: "gray"}}>
                        <Container>
                            <Navbar/>
                        </Container>
                    </nav>
                </Container>
                <Container className={"mt-5"}>
                    <Row>
                        <Col xs={8}>
                            <main>
                                <Switch>

                                    <Route exact path="/">
                                        <Profile/>
                                    </Route>
                                    <Route path="/feed">
                                        <Feed/>
                                    </Route>
                                </Switch>
                            </main>
                        </Col>
                        <Col xs={4}>
                            <aside>
                                <Sidebar/>
                            </aside>
                        </Col>
                    </Row>
                </Container>
                <Container fluid style={{backgroundColor: 'white', padding: '5px', marginTop: '10px'}}>
                    <Footer/>
                </Container>
            </Router>
        </div>
    );
}

export default App;
