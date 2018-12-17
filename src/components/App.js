import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };
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
render() {
    return (
        <div className="catch-of-the-day">
        <div className="menu">
        <Header tagline="As Organic as Mother Nature" />
        </div>
        <Order />
        <Inventory addFish={this.addFish}/>
        </div>
    )
}
}

export default App;