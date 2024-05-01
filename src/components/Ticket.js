import React from 'react';
import PropTypes from 'prop-types';

function Ticket(props) {
    return (
        <React.Fragment>
            <h3>{props.location} - {props.names}</h3>
            <p><em>{props.issue}</em></p>
            {/* This is a JSX comment. */}
            <hr />
        </React.Fragment>
    );
}

Ticket.propTypes = {
    names: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    // exampleArrayOfStrings: PropTypes.arrayOf(PropTypes.string), // declare that a prop is an array full of a specific type of entries
    // exampleClassTypeProp: PropTypes.instanceOf(ExampleClassName), // We can also declare that a prop is an instance of a class:
    issue: PropTypes.string
};

export default Ticket;