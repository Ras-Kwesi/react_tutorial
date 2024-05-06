import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: false,
            mainTicketList: [],
        };
    }

    handleClick = () => {
        this.setState(prevState => ({  // This function uses parentheses () around the object returned by the arrow function. This syntax indicates an implicit return, meaning that the object inside the parentheses is the return value of the arrow function.
            formVisibleOnPage: !prevState.formVisibleOnPage
        }))
    }

    handleAddingNewTicketToList = (newTicket) => {
        const newMainTicketList = this.state.mainTicketList.concat(newTicket); // .concat creates a duplicate, .push doesnt
        this.setState({
            mainTicketList: newMainTicketList,
            formVisibleOnPage: false,
        })
    }

    render() {
        let currentVisibleState= null;
        let buttonText = null;

        if(this.state.formVisibleOnPage){
            currentVisibleState = <NewTicketForm
                onNewTicketCreation = {this.handleAddingNewTicketToList}
            />
            buttonText="Return to Ticket List";
        } else {
            currentVisibleState = <TicketList ticketList={this.state.mainTicketList} />
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