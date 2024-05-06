import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";

function NewTicketForm(props) {
    function handleNewTicketFormSubmission(event) {
        event.preventDefault();
        props.OnNewTicketCreation({
            names: event.target.names.value,
            location: event.target.location.value,
            issue: event.target.issue.value,
            id: v4(),
            // numberOfStudents: parseInt(event.target.numberOfStudents.value) // How to parse numeric data
        });
        console.log(event.target.names.value);
        console.log(event.target.location.value);
        console.log(event.target.issue.value);
    }
    return (
        <React.Fragment>
            <form onSubmit={handleNewTicketFormSubmission}>
                <input
                    type='text'
                    name='names'
                    placeholder='Pair Names' />
                <input
                    type='text'
                    name='location'
                    placeholder='Location' />
                <textarea
                    name='issue'
                    placeholder='Describe your issue.' />
                <button type='submit'>Help!</button>
            </form>
        </React.Fragment>
    );
}

NewTicketForm.propTypes = {
    OnNewTicketCreation: PropTypes.func,
}

export default NewTicketForm;