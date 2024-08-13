import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { SlRefresh } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { IoEllipsisVertical } from "react-icons/io5";

function NavbarHead({ handleShow }) {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">
            Home/<span style={{ fontSize: "14px" }}>Dashboard</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex w-50">
              <Form.Control
                type="search"
                placeholder="Search anything"
                className="me-2 "
                aria-label="Search"
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar expand="lg" style={{ backgroundColor: "transparent" }}>
        <Container fluid>
          <Navbar.Brand href="#">CNAPP Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <div className="d-flex">
              <Button className="btn btn-light" style={{ marginRight: "10px" }} onClick={handleShow}>
                Add New Button +
              </Button>
              <Button className="btn btn-light" style={{ marginRight: "10px" }}>
                <SlRefresh />
              </Button>
              <Button className="btn btn-light" style={{ marginRight: "10px" }}>
                <IoEllipsisVertical />
              </Button>
              <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <button type="button" class="btn btn-light   btn btn-outline-primary">
                  <CiClock2 />
                  </button>
                  <button type="button" class="btn btn-light btn btn-outline-primary">
                  Last 2 days
                  </button>
                  
                </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarHead;
