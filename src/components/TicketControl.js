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
        let buttonText = null;

        if(this.state.formVisibleOnPage){
            currentVisibleState = <NewTicketForm/>
            buttonText="Return to Ticket List"
        } else {
            currentVisibleState = <TicketList/>
            buttonText="Add Ticket"
        }

        return (
            <React.Fragment>
                {currentVisibleState}
                <button onClick={this.handleClick}>{buttonText}</button>
            </React.Fragment>
        );
    }

}

export default TicketControl;