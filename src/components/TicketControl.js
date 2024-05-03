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

    render() {
        let currentVisibleState= null;

        if(this.state.formVisibleOnPage){
            currentVisibleState = <NewTicketForm/>
        } else {
            currentVisibleState = <TicketList/>
        }

        return (
            <React.Fragment>
                {currentVisibleState}
            </React.Fragment>
        );
    }

}

export default TicketControl;