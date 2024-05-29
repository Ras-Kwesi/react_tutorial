import React, { useState, useEffect } from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';
import { db, auth } from './../firebase.js';
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc, query, orderBy } from "firebase/firestore";
import { formatDistanceToNow } from 'date-fns';

function TicketControl() {

    // Business Logic
    const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
    const [mainTicketList, setMainTicketList] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        const queryByTimestamp = query(
            collection(db, "tickets"),
            orderBy('timeOpen')
        );
        const unSubscribe = onSnapshot(
            // new code below!
            queryByTimestamp,
            (querySnapshot) => {
                const tickets = [];
                querySnapshot.forEach((doc) => {
                    const timeOpen = doc.get('timeOpen', { serverTimestamps: "estimate" }).toDate();
                    const jsDate = new Date(timeOpen);
                    tickets.push({
                        names: doc.data().names,
                        location: doc.data().location,
                        issue: doc.data().issue,
                        timeOpen: jsDate,
                        formattedWaitTime: formatDistanceToNow(jsDate),
                        id: doc.id
                    });
                });
                setMainTicketList(tickets);
            },
            (error) => {
                setError(error.message);
            }
        );

        return () => unSubscribe(); // Cleanup function
    }, []); // Ensures componentdidmount runs once, at the start, not on every re-render of a list like mainticketlist

    useEffect(() => {
        function updateTicketElapsedWaitTime() {
            const newMainTicketList = mainTicketList.map(ticket => {
                const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen);
                return { ...ticket, formattedWaitTime: newFormattedWaitTime };
            });
            setMainTicketList(newMainTicketList);
        }

        const waitTimeUpdateTimer = setInterval(() =>
            updateTicketElapsedWaitTime(), // Function calls itself after time is elapsed and time is updated
            60000
        );

        return function cleanup() {
            clearInterval(waitTimeUpdateTimer);
        }
    }, [mainTicketList]) // our effect will get called anytime the mainTicketList state variable updates also.

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