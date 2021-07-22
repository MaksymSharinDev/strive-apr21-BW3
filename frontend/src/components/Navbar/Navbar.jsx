import React, { Component } from "react";
import "./Navbar.css";
import {
  Container,
  Navbar as BNavbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { FaUserFriends } from "react-icons/fa";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import {
  BsFillBriefcaseFill,
  BsFillBellFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import NavbarModalView from "./NavbarModalView";

export default class Navbar extends Component {
  state = {
    profile: {},
    isShown: false,
  };

  componentDidMount() {
    let fetching = async () => {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/60c71dfc291930001560ab9a/",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3MWRmYzI5MTkzMDAwMTU2MGFiOWEiLCJpYXQiOjE2MjM2NjIwNzcsImV4cCI6MTYyNDg3MTY3N30.S-4OzceDjWQt4-jFgqD0QsGS1neM4wsDD60vIc397hg",
          },
        }
      );
      let profileData = await response.json();
      this.setState({
        profile: profileData,
      });
    };
    fetching();
  }
  //TODO CSS Consistency
  render() {
    return (
      <>
        <BNavbar expand="lg">
          <BNavbar.Brand href="#">
            <img
              src="http://pngimg.com/uploads/linkedIn/small/linkedIn_PNG16.png"
              alt="logo"
            />
          </BNavbar.Brand>
          <BNavbar.Toggle aria-controls="navbarScroll" />
          <BNavbar.Collapse id="navbarScroll">
            <div className="searchbar">
              <BiSearchAlt2 />
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="search"
                  className="mr-2"
                  aria-label="Search"
                />
              </Form>
            </div>
            <Nav
              id={"navIconsMenu"}
              className="ml-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div>
                <AiFillHome />
                <Nav.Link href="/feed">Home</Nav.Link>
              </div>
              <div>
                <FaUserFriends />
                <Nav.Link href="#action2">My Network</Nav.Link>
              </div>
              <div>
                <BsFillBriefcaseFill />
                <Nav.Link href="#action3">Jobs</Nav.Link>
              </div>
              <div>
                <AiFillMessage />
                <Nav.Link href="#action4">Messaging</Nav.Link>
              </div>
              <div>
                <BsFillBellFill />
                <Nav.Link href="#action4">Notifications</Nav.Link>
              </div>
              <div className="myprofile">
                <a href={"/"}>
                  <img src={this.state.profile.image} alt="profile" />
                </a>
                <NavDropdown title="Me" id="navbarScrollingDropdown">
                  <NavDropdown.Item
                    onClick={() => this.setState({ isShown: true })}
                  >
                    Change profile picture
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              <div>
                <BsFillGrid3X3GapFill />
                <NavDropdown title="Work" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              <Nav.Link href="#" enable>
                Retry Premium <br />
                Free
              </Nav.Link>
            </Nav>
          </BNavbar.Collapse>
        </BNavbar>
        {this.state.isShown && <NavbarModalView />}
      </>
    );
  }
}
