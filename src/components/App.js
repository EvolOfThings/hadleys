import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

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
    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    };
render() {
    return (
        <div className="catch-of-the-day">
        <div className="menu">
        <Header tagline="As Organic as Mother Nature" />
        <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
                <Fish key={key}  details={this.state.fishes[key]}/>
            ))}
        </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
        </div>
    )
}
}

export default App;