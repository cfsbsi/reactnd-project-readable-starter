import React from 'react';
import {Navbar, Nav, MenuItem, NavDropdown} from 'react-bootstrap'

const MenuComponent = function ({categories}) {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">Readable-Udacity</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavDropdown eventKey={1} title="Post" id="basic-nav-dropdown">
                        <MenuItem eventKey={1.1} href="/posts/create">
                            Create Post
                        </MenuItem>
                    </NavDropdown>
                    <NavDropdown eventKey={2} title="Categories" id="basic-nav-dropdown">
                        {categories.map((category, index) => (
                            <MenuItem key={index} eventKey={`2.${index}`} href={`/${category.name}`}>
                                {category.name}
                            </MenuItem>
                            ))}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MenuComponent