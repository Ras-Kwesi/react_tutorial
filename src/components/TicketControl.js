import { connect } from 'react-redux';
import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import PropTypes from "prop-types";

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: false,
            // mainTicketList: [], // We are letting ticketControl handle local state, Redux handles the shared state
            selectedTicket: null,
            editing: false,
        };
    }

    // handleClick = () => {
    //     this.setState(prevState => ({  // This function uses parentheses () around the object returned by the arrow function. This syntax indicates an implicit return, meaning that the object inside the parentheses is the return value of the arrow function.
    //         formVisibleOnPage: !prevState.formVisibleOnPage
    //     }))
    // }

    handleClick = () => {                               // This function uses parentheses () around the object returned by the arrow function. 
        if (this.state.selectedTicket != null) {        // This syntax indicates an implicit return, meaning that the object inside the parentheses is the return value of the arrow function.
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

    // handleAddingNewTicketToList = (newTicket) => {
    //     const newMainTicketList = this.state.mainTicketList.concat(newTicket); // .concat creates a duplicate, .push doesnt
    //     this.setState({
    //         mainTicketList: newMainTicketList,
    //         formVisibleOnPage: false,
    //     });
    // }

    handleAddingNewTicketToList = (newTicket) => {
        const { dispatch } = this.props;
        const { id, names, location, issue } = newTicket;
        const action = {
            type: 'ADD_TICKET',
            id: id,
            names: names,
            location: location,
            issue: issue,
        }
        dispatch(action);
        this.setState({ formVisibleOnPage: false });
    }

    handleChangingSelectedTicket = (id) => {
        // const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
        const selectedTicket = this.props.mainTicketList[id]; // Mainticketlist is an object - id's hold each ticket object (object holding other objects), not list. Filter not used
        this.setState({ selectedTicket: selectedTicket })
    }

    // handleDeletingTicket = (id) => {
    //     const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    //     // Creates a new list by ommiting the ticket we closed

    //     this.setState({
    //         mainTicketList: newMainTicketList,
    //         selectedTicket: null
    //     });
    // }

    handleDeletingTicket = (id) => {
        const {dispatch} = this.props;
        const action = {
            type: 'DELETE_TICKET',
            id : id,
        }

        dispatch(action)
        this.setState({
            selectedTicket: null,
        })
    }

    handleEditClick = () => {
        console.log("handleEditClick reached!");
        this.setState({ editing: true });
    }

    // handleEditingTicketInList = (ticketToEdit) => {
    //     const editedMainTicketList = this.state.mainTicketList
    //         .filter(ticket => ticket.id !== this.state.selectedTicket.id)
    //         .concat(ticketToEdit);
    //     this.setState({
    //         mainTicketList: editedMainTicketList,
    //         editing: false,
    //         selectedTicket: null
    //     });
    // }

    handleEditingTicketInList = (ticketToEdit) => {
        const { dispatch } = this.props;
        const { id, names, location, issue } = ticketToEdit;
        const action = {
            type: 'EDIT_TICKET',
            id: id,
            names: names,
            location: location,
            issue: issue,
        }
        dispatch(action);
        this.setState({ 
            editing: false,
            selectedTicket: null,
        });
    }

    render() {
        let currentVisibleState = null;
        let buttonText = null;

        if (this.state.editing) {
            currentVisibleState = <EditTicketForm ticket={this.state.selectedTicket} onEditTicket={this.handleEditingTicketInList} />
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
            currentVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />
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

TicketControl.propTypes = {
    mainTicketList: PropTypes.object
};  

const mapStateToProps = state => {
    return {
        mainTicketList: state
    }
};
  
// Note: we are now passing mapStateToProps into the connect() function.
  
TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;