import React, { useState, useEffect } from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';
import { db, auth } from './../firebase.js';
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc, setDoc } from "firebase/firestore";


function TicketControl() {
    
    // Business Logic
    const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
    const [mainTicketList, setMainTicketList] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        const unSubscribe = onSnapshot(
            collection(db, "tickets"),
            (collectionSnapshot) => {
                const tickets = [];
                // const tickets = collectionSnapshot.docs.map((doc) => {  Provides array to map through
                // return {
                collectionSnapshot.forEach((doc) => {  //Querysnapshot.forEach() [ object, not list ] - not array such as array.prototype.forEach
                    tickets.push({
                        // ... doc.data(), // Spread operator in use!
                        // id: doc.id makes a copy of ticket list into mainticket without need to loop
                        names: doc.data().names, // doc is a DocumentSnapshot object - firebase syntax
                        location: doc.data().location,  // .data() is javascript object
                        issue: doc.data().issue, // issue is a property
                        id: doc.id
                    });
                });
                setMainTicketList(tickets);
            },
            (error) => {
                setError(error.message)
            }
        );

        return () => unSubscribe(); // Cleanup function
    }, []); // Ensures componentdidmount runs once, at the start, not on every re-render of a list like mainticketlist

    const handleClick = () => {
        if (selectedTicket != null) {
            setFormVisibleOnPage(false);
            setSelectedTicket(null);
            setEditing(false);
        } else {
            setFormVisibleOnPage(!formVisibleOnPage);
        }
    }

    const handleDeletingTicket = async (id) => {
        try { await deleteDoc(doc(db, 'tickets', id)) }
        catch (error) {
            console.log(error);
            setError(error)
        };
        setSelectedTicket(null);
    }

    const handleEditClick = () => {
        setEditing(true);
    }

    const handleEditingTicketInList = async (ticketToEdit) => {
        try {
            const ticket = await doc(db, 'tickets', ticketToEdit.id);
            updateDoc(ticket, ticketToEdit);
            setEditing(false);
            setSelectedTicket(false);
        }
        catch (err) {
            console.log(err)
            setError(error.message)
        };
    }

    // const handleAddingNewTicketToList = async (newTicketData) => {
    //     const collectionRef = collection(db, "tickets");
    //     await addDoc(collectionRef, newTicketData);
    //     setFormVisibleOnPage(false);
    // }

    // const handleAddingNewTicketToList = async (newTicketData) => {  // Uses uuid to create personal ids
    //     await setDoc(doc(db, "tickets", v4()), newTicketData);
    //     setFormVisibleOnPage(false);
    // }


    const handleAddingNewTicketToList = async (newTicketData) => {
        console.log("Run 1")
        try {
            console.log("Try 1");
            await addDoc(collection(db, "tickets"), newTicketData);
            console.log("Try 2");
            setFormVisibleOnPage(false);
        } catch (err) {
            console.error("Failed:", err)
        }
    }

    const handleChangingSelectedTicket = (id) => {
        const selection = mainTicketList.filter(ticket => ticket.id === id)[0];
        setSelectedTicket(selection);
    }

    // Interface Logic
    let currentlyVisibleState = null;
    let buttonText = null;
    
    if (auth.currentUser == null) {
        return (
            <React.Fragment>
                <h1>You must be signed in to access the queue.</h1>
            </React.Fragment>
        )
    } else if (auth.currentUser != null) {

        // let currentlyVisibleState = null;
        // let buttonText = null;

        if (error) {
            currentlyVisibleState = <h1>There was an error: <span>{error}</span></h1>
        } else if (editing) {
            currentlyVisibleState =
                <EditTicketForm
                    ticket={selectedTicket}
                    onEditTicket={handleEditingTicketInList} />;
            buttonText = "Return to Ticket List";
        } else if (selectedTicket != null) {
            currentlyVisibleState =
                <TicketDetail
                    ticket={selectedTicket}
                    onClickingDelete={handleDeletingTicket}
                    onClickingEdit={handleEditClick} />;
            buttonText = "Return to Ticket List";
        } else if (formVisibleOnPage) {
            currentlyVisibleState =
                <NewTicketForm
                    onNewTicketCreation={handleAddingNewTicketToList} />;
            buttonText = "Return to Ticket List";
        } else {
            currentlyVisibleState =
                <TicketList
                    onTicketSelection={handleChangingSelectedTicket}
                    ticketList={mainTicketList} />;
            buttonText = "Add Ticket";
        }
    }

    return (
        <React.Fragment>
            {currentlyVisibleState}
            {error ? null : <button onClick={handleClick}>{buttonText}</button>}
        </React.Fragment>
    );
}

export default TicketControl;