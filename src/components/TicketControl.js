import { connect } from 'react-redux';
import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import PropTypes from "prop-types";
import * as a from './../actions';
import { formatDistanceToNow } from 'date-fns';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        console.log("\nProps:\n", props)
        this.state = {
            // formVisibleOnPage: false,
            // mainTicketList: [], // We are letting ticketControl handle local state, Redux handles the shared state
            selectedTicket: null,
            editing: false,
        };
    }

    componentDidMount() {
        this.waitTimeUpdateTimer = setInterval(() =>
            this.updateTicketElapsedWaitTime(),
            60000
        );
    } 
    // Unlike handleEVents wich have an inner function (function luteral), component functions are ran immediately and are active in the dom
    // This events are react owns functions

    // componentDidUpdate() {
    //     console.log("component updated!");
    // }

    componentWillUnmount() {
        console.log("component unmounted!");
        clearInterval(this.waitTimeUpdateTimer);
    }

    updateTicketElapsedWaitTime = () => {
        const {dispatch} = this.props;
        Object.values(this.props.mainTicketList).forEach(ticket => {
            const newFormattedTime = formatDistanceToNow(ticket.timeOpen, {
                addSuffix: true
            });
            const action = a.updateTime(ticket.id, newFormattedTime)
            dispatch(action);
        });
    }

    handleClick = () => {                               // This function uses parentheses () around the object returned by the arrow function. 
        if (this.state.selectedTicket != null) {        // This syntax indicates an implicit return, meaning that the object inside the parentheses is the return value of the arrow function.
            this.setState({
                // formVisibleOnPage: false,
                selectedTicket: null,
                editing: false
            });
        } else {
            // this.setState(prevState => ({
            //     formVisibleOnPage: !prevState.formVisibleOnPage,
            // }));

            const { dispatch } = this.props;
            const action = a.toggleForm()
            dispatch(action);
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
        const action = a.addTicket(newTicket)
        dispatch(action);

        // this.setState({ formVisibleOnPage: false });

        const action2 = a.toggleForm()
        dispatch(action2);
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
        const { dispatch } = this.props;
        const action = a.deleteTicket(id)

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
        const action = a.addTicket(ticketToEdit)
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
        else if (this.props.formVisibleOnPage) {
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
    mainTicketList: PropTypes.object,
    formVisibleOnPage: PropTypes.bool,
};

// const mapStateToProps = state => {
//     return {
//         mainTicketList: state
//     }
// };

const mapStateToProps = state => {
    return {
        mainTicketList: state.mainTicketList, // state is now an object with two other objects. We call their keys (mainTicketList, formVisibleOnPage)
        formVisibleOnPage: state.formVisibleOnPage
    }
}

// Note: we are now passing mapStateToProps into the connect() function.

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;