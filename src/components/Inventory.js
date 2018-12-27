import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase'
import AddForm from './AddForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';


class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user });
            }
        });
    }

    authHandler = async authData => {
        //console.log(authData);
        //1. look up the current store in the firebase db
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store);
        //2. claim it if there is no owner
        if (!store.owner) {
            //save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        //3. set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    };

    //authoProvider for whivh they want to sign in with
    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`](); //usually it's this way => firebase.auth.GithubAuthProvider()
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
        };

        logout =  async () => {
            console.log('Logging out!');
            await firebase.auth().signOut();
            this.setState({ uid: null });
        }

render() {
    const logout = <button onClick={this.logout}>Log Out!</button>

    // 1. check if they are logged in
    if (!this.state.uid) {
        return <Login authenticate={this.authenticate}/>;
    }

    //2. check if they are no the owner of the store
    if (this.state.uid !== this.state.owner) {
        return (
        <div>
            <p>Sorry you are not the owner!</p>
            {logout}
        </div>
        );
    }

    //3. they must be the owner, just render the inventory
    return (
        <div className="inventory">
            <h2>Inventory</h2>
            {logout}
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