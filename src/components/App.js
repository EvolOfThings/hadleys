import React from 'react';
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
    // mirroring the state for firebase db
    componentDidMount() {
        const { params } = this.props.match;
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes" //syncing fishes state
        });
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
    }

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
        />
        <Inventory 
            addFish={this.addFish} 
            loadSampleFishes={this.loadSampleFishes}/>
        </div>
    )
}
}

export default App;