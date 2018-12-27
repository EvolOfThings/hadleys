import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };
    // mirroring the state for firebase db
    componentDidMount() {
        const { params } = this.props.match;
        //first reinstate our localstorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes" //syncing fishes state
        });
    }

    componentDidUpdate () {
        //console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        //console.log("adding a fish");
        //1. take a copy of existing state
        const fishes = { ...this.state.fishes };

        //2. add our new fish to that fishes var
        fishes[`fish${Date.now()}`] = fish;

        //3. set the new fishes obj to state
        this.setState({
            fishes: fishes
        });
    };

    //for passing data from editfishform to the state in App, upstream data
    updateFish = (key, updatedFish) => {
        //1. take a copy of current state
        const fishes = {...this.state.fishes};
        //2. update that state
        fishes[key] = updatedFish;
        //3. Set that to state
        this.setState({fishes});
    };

    deleteFish = (key) => {
        //1. take a copy of state
        const fishes = {...this.state.fishes};
        //2. update the state
        fishes[key] = null;
        //3. update the state
        this.setState({fishes});
    }

    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    };

    addToOrder = (key) => {
        //1. take a copy of state
        const order = { ...this.state.order };
        //2. either add to the order, or update the number in our order if it's same product
        order[key] = order[key] + 1 || 1; 
        //3. call sestate to update our obj
        this.setState({order});
    };

    removeFromOrder = key => {
        //1. take a copy of state
        const order = { ...this.state.order };
        //2. remove from order
        delete order[key]; 
        //3. call sestate to update our obj
        this.setState({order});
    };

render() {
    return (
        <div className="catch-of-the-day">
        <div className="menu">
        <Header tagline="As Organic as Mother Nature" />
        <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
                <Fish 
                    key={key} 
                    index = {key} 
                    details={this.state.fishes[key]} 
                    addToOrder={this.addToOrder} />
            ))}
        </ul>
        </div>
        <Order 
            fishes={this.state.fishes}
            order={this.state.order}
            deleteFish={this.deleteFish} 
            removeFromOrder ={this.removeFromOrder}
        />
        <Inventory 
            addFish={this.addFish} 
            updateFish={this.updateFish} 
            deleteFish={this.deleteFish} 
            loadSampleFishes={this.loadSampleFishes}
            fishes={this.state.fishes}
            storeId={this.props.match.params.storeId}/>
        </div>
    )
}
}

export default App;