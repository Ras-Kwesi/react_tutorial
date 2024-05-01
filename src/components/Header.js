import React from 'react';
import ticketsImage from './../img/tickets-image-c1addb252b0e58560cb15ffa2b317560.png'

function Header(){
    return (
        <div>
        <h1>Help Queue</h1>
        <img src={ticketsImage} alt='Tickets Image' />
        </div>
    );
}

export default Header;