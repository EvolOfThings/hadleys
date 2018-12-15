import  React, { Fragment } from 'react';

class StorePicker extends React.Component {
    myInput = React.createRef();

    goToStore = (event) => {
        //1. Stop the form from submitting
        event.preventDefault();
        //2. get the txt from input
        console.log(this,`"this" now refers to the component`);
        //3. Change the page to /store/whatever-they-entered

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
                />
                <button type="submit">Visit Store &rarr;</button>
            </form>
            </Fragment>   
        );    
    }
}
export default StorePicker;