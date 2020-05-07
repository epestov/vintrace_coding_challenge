import { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

class NavBar extends Component {

    state = {
        isOpen: false
    }

    onItemSelect(lotCode) {
        this.props.onItemSelect(lotCode);
        this.toggle();
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {

        const navItems = this.props.lotCodes.map(c => (
            <NavItem key={c} onClick={() => {this.onItemSelect(c)}}>
                <NavLink href="#">{c}</NavLink>
            </NavItem>
        ));

        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="https://www.winery-software.com/">vintrace</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {navItems}
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default NavBar;