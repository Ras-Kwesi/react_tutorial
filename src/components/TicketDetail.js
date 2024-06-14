import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../context/theme-context";

function TicketDetail(props) {
    const { ticket, onClickingDelete, onClickingEdit } = props; //new code
    const theme = useContext(ThemeContext)

    const styles = {
        backgroundColor: theme.buttonBackground,
        color: theme.textColor
    }

    if (!theme) {
        throw new Error("ThemeContext must be used within a ThemeContext.Provider!");
    }

    return (
        <React.Fragment>
            <h1>Ticket Detail</h1>
            <h3>{ticket.location} - {ticket.names}</h3>
            <p><em>{ticket.issue}</em></p>
            <button style={styles} onClick={props.onClickingEdit}>Update Ticket</button>
            {/* On Edit doesn't need a parameter so we call the function while Delete needs parameter so we use a function literal */}
            <button style={styles} onClick={() => onClickingDelete(ticket.id)}>Close Ticket</button>
            <hr />
        </React.Fragment>
    );
}

TicketDetail.propTypes = {
    ticket: PropTypes.object,
    onClickingDelete: PropTypes.func,
    onClickingEdit: PropTypes.func,
};

export default TicketDetail;