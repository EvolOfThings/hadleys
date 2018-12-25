import  React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    myInput = React.createRef();
    static propTypes = {
        history: PropTypes.object
    };

    goToStore = event => {
        //1. Stop the form from submitting
        event.preventDefault();

        //2. get the txt from input
        //console.log(this,`"this" now refers to the component`);
        //console.log(this.myInput.current.value);
        const storeName = this.myInput.current.value;

        //3. Change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`);
    }
    
    render() {
        return (
            <Fragment>
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input 
                    type="text" 
                    ref={this.myInput}
                    required 
                    placeholder="Store Name"
                    defaultValue={getFunName()}
                />
                <button type="submit">Visit Store &rarr;</button>
            </form>
            </Fragment>   
        );    
    }
}
export default StorePicker;