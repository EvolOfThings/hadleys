import React from 'react';
import AddForm from './AddForm';

class Inventory extends React.Component {
render() {
    return (
        <div className="inventory">Inventory
            <h2>Inventory</h2>
            <AddForm addFish={this.props.addFish} />
        </div>
    );
}
}

export default Inventory;