import React, { Component } from 'react';
import Link from 'next/link';
import { 
    ListGroup, 
    ListGroupItem, 
    Container, 
    Nav, 
    NavItem, 
    NavLink 
} from 'reactstrap';

import { 
    getYearBreakdown, 
    getRegionBreakdown, 
    getVarietyBreakdown, 
    getYearAndVarietyBreakdown 
} from '../client'

export default class Breakdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            breakdown: null,
            code: this.props.code,
            showAll: false
        }
    }

    componentDidUpdate() {
        if (this.state.code !== this.props.code) {
            this.setState({
                breakdown: null,
                code: this.props.code,
                showAll: false
            });
        }
    }

    byYear = () => {
        getYearBreakdown(this.props.code)
            .then(res => this.setState({ breakdown: res.data, showAll: false }));
    }

    byVariety = () => {
        getVarietyBreakdown(this.props.code)
            .then(res => this.setState({ breakdown: res.data, showAll: false }));
    }

    byRegion = () => {
        getRegionBreakdown(this.props.code)
            .then(res => this.setState({ breakdown: res.data, showAll: false }));
    }

    byYearVariety = () => {
        getYearAndVarietyBreakdown(this.props.code)
            .then(res => this.setState({ breakdown: res.data, showAll: false }));
    }

    showAll = () => {
        this.setState({
            showAll: true
        });
    }

    render() {
        let content = null;
        let showAllLink = null;
        if (this.state.breakdown !== null) {
            content = this.state.breakdown.map(
                info => <ListGroupItem key={info.key}>{info.percentage}% - {info.key}</ListGroupItem>);
            if (!this.state.showAll && content.length > this.props.limit) {
                content = content.slice(0, this.props.limit);
                showAllLink =                 
                    <Nav>
                        <NavItem>
                            <NavLink onClick={this.showAll} href="#">Show More</NavLink>
                        </NavItem>
                    </Nav>
            }
        }
        return (
            <Container>
                <br />
                <Nav>
                    <NavItem>
                        <NavLink onClick={this.byYear} href="#">Year</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.byVariety} href="#">Variety</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.byRegion} href="#">Region</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.byYearVariety} href="#">Year/Variety</NavLink>
                    </NavItem>
                </Nav>
                <ListGroup>{content}</ListGroup>
                {showAllLink}
                <br/><br/>
            </Container>
        )
    }
}
