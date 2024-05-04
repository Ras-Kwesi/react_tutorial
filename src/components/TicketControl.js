import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: false
        };
    }

    handleClick = () => {
        this.setState(prevState => ({  // This function uses parentheses () around the object returned by the arrow function. This syntax indicates an implicit return, meaning that the object inside the parentheses is the return value of the arrow function.
            formVisibleOnPage: !prevState.formVisibleOnPage
        }))
    }

    render() {
        let currentVisibleState= null;
        let addTicketbutton = null;

        if(this.state.formVisibleOnPage){
            currentVisibleState = <NewTicketForm/>
        } else {
            currentVisibleState = <TicketList/>
            addTicketbutton= <button onClick={this.handleClick}>Add Ticket</button>
        }

        return (
            <React.Fragment>
                {currentVisibleState}
                {addTicketbutton}
            </React.Fragment>
        );
    }

}

export default TicketControl;