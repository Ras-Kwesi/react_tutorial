import React from 'react';
import PropTypes from 'prop-types';


function Ticket(props) {
    return (
        <React.Fragment>
            <div onClick={() => props.whenTicketClicked(props.id)}>
                { /* We add a div with an onClick function to avoid it from running as we need to provide it with props.id parameter. Don't forget to close out the div below! */}
                <h3>{props.location} - {props.names}</h3>
                <p><em>{props.issue}</em></p>
                <hr />
            </div>
        </React.Fragment>
    );
}

Ticket.propTypes = {
    names: PropTypes.string,
    location: PropTypes.string,
    issue: PropTypes.string,
    id: PropTypes.string,
    // exampleArrayOfStrings: PropTypes.arrayOf(PropTypes.string), // declare that a prop is an array full of a specific type of entries
    // exampleClassTypeProp: PropTypes.instanceOf(ExampleClassName), // We can also declare that a prop is an instance of a class:
    whenTicketClicked: PropTypes.func
};
