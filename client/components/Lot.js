import React, { Component } from 'react'
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Spinner } from 'reactstrap';
import { getLot, updateLot } from '../client';

export default class Lot extends Component {

    state = {
        lotCode: null,
        volume: null,
        description: null,
        tankCode: null,
        productState: null
    }

    componentDidMount() {
        getLot(this.props.code)
            .then(res => this.setState({ 
                ...res.data,
                description: res.data.description ? res.data.description : '',
                productState: res.data.productState ? res.data.productState : '',
            })
        );
    }

    componentDidUpdate() {
        if (this.props.code !== this.state.lotCode) {
            getLot(this.props.code)
                .then(res => this.setState({ 
                    ...res.data,
                    description: res.data.description ? res.data.description : '',
                    productState: res.data.productState ? res.data.productState : '',
                })
            );
        }
    }

    onInputChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        updateLot(this.state);
    }

    render() {
        if (this.state.lotCode == null) {
            return <center><Spinner style={{ width: '3rem', height: '3rem' }} /></center>
        }
        return (
            <Container>
                <br />
                <Form onSubmit={this.onSubmit}>
                    <FormGroup row>
                        <Label for="lotCode" sm={2}>Code</Label>
                        <Col sm={10}>
                            <Input 
                                readOnly 
                                type="text" 
                                name="lotCode" 
                                id="lotCode" 
                                placeholder={this.state.lotCode} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="lotDesc" sm={2}>Description</Label>
                        <Col sm={10}>
                            <Input 
                                type="textarea" 
                                name="description" 
                                id="lotDesc" 
                                onChange={this.onInputChange}
                                value={this.state.description} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="volume" sm={2}>Volume</Label>
                        <Col sm={10}>
                            <Input 
                                type="number" 
                                name="volume" 
                                id="volume" 
                                onChange={this.onInputChange}
                                value={this.state.volume} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="tankCode" sm={2}>Tank</Label>
                        <Col sm={10}>
                            <Input 
                                readOnly 
                                type="text" 
                                name="tankCode" 
                                id="tankCode" 
                                placeholder={this.state.tankCode} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="productState" sm={2}>State</Label>
                        <Col sm={10}>
                            <Input 
                                type="text" 
                                name="productState" 
                                id="productState" 
                                onChange={this.onInputChange}
                                value={this.state.productState} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="ownerName" sm={2}>Owner</Label>
                        <Col sm={10}>
                            <Input 
                                readOnly 
                                type="text" 
                                name="ownerName" 
                                id="ownerName" 
                                placeholder={this.state.ownerName} />
                        </Col>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>            
            </Container>
        )
    }
}
