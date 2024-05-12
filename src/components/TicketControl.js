import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: false,
            mainTicketList: [],
            slectedTicket: null,
            editing: false,
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
                editing: false
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
        });
    }

    handleChangingSelectedTicket = (id) => {
        const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
        this.setState({ selectedTicket: selectedTicket })
    }

    handleDeletingTicket = (id) => {
        const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id); 
        // Creates a new list by ommiting the ticket we closed
        
        this.setState({
            mainTicketList: newMainTicketList,
            selectedTicket: null
        });
    }

    handleEditClick = () => {
        console.log("handleEditClick reached!");
        this.setState({ editing: true });
    }

    handleEditingTicketInList = (ticketToEdit) => {
        const editedMainTicketList = this.state.mainTicketList
            .filter(ticket => ticket.id !== this.state.selectedTicket.id)
            .concat(ticketToEdit);
        this.setState({
            mainTicketList: editedMainTicketList,
            editing: false,
            selectedTicket: null
        });
    }

    render() {
        let currentVisibleState = null;
        let buttonText = null;

        if (this.state.editing) {
            currentVisibleState = <EditTicketForm ticket={this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
            buttonText = 'Return to Ticket List';
        }

        else if (this.state.selectedTicket != null) {
            currentVisibleState = <TicketDetail
                ticket={this.state.selectedTicket}
                onClickingDelete={this.handleDeletingTicket}
                onClickingEdit={this.handleEditClick}
            />
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