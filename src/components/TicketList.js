import React from 'react';
import Ticket from './Ticket';
import PropTypes from 'prop-types';


function TicketList(props) {
    return (
        <React.Fragment>
            <hr />
            {/* We now need to map over the values of an object, not an array. */}

            {/* {props.ticketList.map((ticket) => */}
            {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values   => Explains Object.values*/}
            {/* https://fidgetechcode.org/react/functional-programming-with-javascript/4-1-0-11-map-reduce-and-filter  +> Explains .map */}
            {Object.values(props.ticketList).map((ticket) => // Object.values creates an iterable(list) of the properties in the key: property pairs. Here we get a list of each ticket in the list
                <Ticket                                     // We then take each ticket and map applies a function to each object in a list. 
                    whenTicketClicked={props.onTicketSelection}     // Here we organise each ticket to the Ticket component through .map to define how its displayed
                    names={ticket.names}
                    location={ticket.location}
                    issue={ticket.issue}
                    formattedWaitTime={ticket.formattedWaitTime}
                    id={ticket.id}
                    key={ticket.id} />
            )}
            {/* Don't forget to add the curly brace above — otherwise there will be a syntax error. */}
        </React.Fragment>
    );
}

TicketList.propTypes = {
    // ticketList: PropTypes.array,
    ticketList: PropTypes.object,
    onTicketSelection: PropTypes.func,
};

export default TicketList;