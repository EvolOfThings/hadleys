import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase'
import AddForm from './AddForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import { firebaseApp } from '../base';


class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    authHandler = async authData =. {
        console.log(authData);
    };
    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}authProvider`](); //usually it's this way => firebase.auth.GithubAuthProvider()
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
        };

render() {
    return <Login authenticate={this.authenticate}/>;
    return (
        <div className="inventory">
            <h2>Inventory</h2>
            {Object.keys(this.props.fishes).map(key => (
                <EditFishForm 
                    key={key}
                    index={key} 
                    fish={this.props.fishes[key]} 
                    updateFish={this.props.updateFish}
                    deleteFish={this.props.deleteFish}/> 
            ))}
            <AddForm addFish={this.props.addFish} />
            <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>  
        </div>
    );
}
}

export default Inventory;