import { Component } from 'react';
import { Alert } from 'reactstrap';
import NavBar from '../components/NavBar';
import Lot from '../components/Lot';
import { getAllLotCodes } from '../client'
import Breakdown from '../components/Breakdown';

class Index extends Component {

    state = {
        lotCodes: [],
        activeLot: null
    }

    componentDidMount() {
        getAllLotCodes()
            .then(res => this.setState({ lotCodes: res.data }));
    }

    setActiveLot = (lotCode) => {
        this.setState({ activeLot: lotCode });
    }

    render() {
        let lotInfo = null;
        if (this.state.activeLot == null) {
            lotInfo = <Alert color="primary">
                Please, select a Lot from main Menu
            </Alert>
        } else {
            lotInfo = 
                <div>
                    <Lot code={this.state.activeLot} />
                    <Breakdown code={this.state.activeLot} limit={5} />
                </div>
        }
        return (
            <>
                <NavBar lotCodes={this.state.lotCodes} onItemSelect={this.setActiveLot} />
                {lotInfo}
            </>
        )
    }
}

export default Index;