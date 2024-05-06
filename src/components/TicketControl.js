import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: false,
            mainTicketList: [],
            slectedTicket: null,
        };
    }

    // handleClick = () => {
    //     this.setState(prevState => ({  // This function uses parentheses () around the object returned by the arrow function. This syntax indicates an implicit return, meaning that the object inside the parentheses is the return value of the arrow function.
    //         formVisibleOnPage: !prevState.formVisibleOnPage
    //     }))
    // }

    handleClick = () => {
        if (this.state.selectedTicket != null) {
            this.setState({
                formVisibleOnPage: false,
                selectedTicket: null,
            });
        } else {
            this.setState(prevState => ({
                formVisibleOnPage: !prevState.formVisibleOnPage,
            }));
        }
    }

    handleAddingNewTicketToList = (newTicket) => {
        const newMainTicketList = this.state.mainTicketList.concat(newTicket); // .concat creates a duplicate, .push doesnt
        this.setState({
            mainTicketList: newMainTicketList,
            formVisibleOnPage: false,
        })
    }

    handleChangingSelectedTicket = (id) => {
        const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
        this.setState({ selectedTicket: selectedTicket })
    }

    render() {
        let currentVisibleState = null;
        let buttonText = null;

        if (this.state.selectedTicket != null) {
            currentVisibleState = <TicketDetail ticket={this.state.selectedTicket} />
            buttonText = "Return to Ticket List"
        }
        else if (this.state.formVisibleOnPage) {
            currentVisibleState = <NewTicketForm
                onNewTicketCreation={this.handleAddingNewTicketToList}
            />
            buttonText = "Return to Ticket List";
        }
        else {
            currentVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />
            buttonText = "Add Ticket"
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