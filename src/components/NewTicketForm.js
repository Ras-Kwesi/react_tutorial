import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import ReusableForm from "./ReusableForm";

function NewTicketForm(props) {


    function handleNewTicketFormSubmission(event) {
        event.preventDefault();
        props.onNewTicketCreation({
            names: event.target.names.value,
            location: event.target.location.value,
            issue: event.target.issue.value,
            id: v4(),
            // numberOfStudents: parseInt(event.target.numberOfStudents.value) // How to parse numeric data
        });

    }


    return (
        <React.Fragment>
            <React.Fragment>
                <ReusableForm
                    formSubmissionHandler={handleNewTicketFormSubmission}
                    buttonText="Help!" />
            </React.Fragment>
        </React.Fragment>
    );
}

NewTicketForm.propTypes = {
    onNewTicketCreation: PropTypes.func,
    // func1: PropTypes.func,
}

export default NewTicketForm;