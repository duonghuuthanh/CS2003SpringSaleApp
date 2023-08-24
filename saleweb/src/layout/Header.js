import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MyUserContext } from "../App";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "./MySpinner";

const Header = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const [categories, setCategories] = useState(null);
    const [kw, setKw] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        const loadCates = async () => {
            let res = await Apis.get(endpoints['categories'])
            setCategories(res.data);
        }

        loadCates();
    }, []);

    const search = (evt) => {
        evt.preventDefault();
        nav(`/?kw=${kw}`);
    }

    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    if (categories === null)
        return <MySpinner />;

    return <>
        
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">E-commerce Website</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/" className="nav-link">Trang chủ</Link>
                    
                    <NavDropdown title="Danh mục sản phẩm" id="basic-nav-dropdown">
                        {categories.map(c => {
                            let h = `/?cateId=${c.id}`;
                            return <Link to={h} className="dropdown-item" key={c.id}>{c.name}</Link>;
                        })}
                        
                    </NavDropdown>
                    {user === null ? <Link to="/login" className="nav-link text-danger">Đăng nhập</Link>:<>
                        <Link to="/login" className="nav-link text-succes">Chào {user.username}!</Link> 
                        <Button variant="secondary" onClick={logout}>Đăng xuất</Button>
                    </>}
                </Nav>
                </Navbar.Collapse>
                <Form inline onSubmit={search}>
                <Row>
                    <Col xs="auto">
                        <Form.Control
                        type="text"
                        value={kw}
                        onChange={e => setKw(e.target.value)}
                        placeholder="Nhập từ khóa..."
                        className=" mr-sm-2"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit">Tìm</Button>
                    </Col>
                </Row>
            </Form>
            </Container>
        </Navbar>
    </>
}

export default Header;