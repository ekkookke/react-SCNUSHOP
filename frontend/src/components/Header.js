import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from '../components/SearchBox';
import { Route } from 'react-router-dom'

function Header() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin//登陆成功了才会有userInfo
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout());
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelec>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>SCNUshop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* render:取出参数传给component*/}
                        <Route render={({ history }) => <SearchBox history={history} />} />

                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>
                                    购物车
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>用户信息</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>退出登录</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i>
                                        登录
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='管理员权限' id='adminmenu'>
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>用户管理</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>商品管理</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>订单管理</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    );
}
export default Header
