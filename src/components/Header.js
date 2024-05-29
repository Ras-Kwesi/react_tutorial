import React from 'react';
import ticketsImage from './../img/tickets-image-c1addb252b0e58560cb15ffa2b317560.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HelpQueueHeader = styled.h1`
    font-size: 24px;
    text-align: center;
    color: white;
    background-color: purple;
`;

function Header() {
    return (
        <React.Fragment>
            <HelpQueueHeader>
                Help Queue
            </HelpQueueHeader>
            <img src={ticketsImage} alt='Tickets' />
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/sign-in">Sign In</Link>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default Header;