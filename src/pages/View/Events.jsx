import React from 'react';

const Events = ({ events, searchInput }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Events</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.filter((event) =>
                event.eventName.toLowerCase().includes(searchInput.toLowerCase()) ||
                (event.tags && event.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase())))
            ).map((event) => (
                <li key={event.eventID} className="mb-8 p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-2">{event.eventName}</h3>
                    <p className="text-gray-600 mb-2">{event.eventDesc}</p>
                    <p className="text-gray-700">
                        <strong>Location:</strong> {event.location}
                    </p>
                    <p className="text-gray-700">
                        <strong>Event Start:</strong> {new Date(event.eventStart).toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                        <strong>Event End:</strong> {new Date(event.eventEnd).toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                        <strong>Ticket Price:</strong> ${event.ticketPrice}
                    </p>
                    <p className="text-gray-700">
                        <strong>Available Tickets:</strong> {event.availableTicket}
                    </p>
                    <ul>
                        {event.ticketSold.map((ticket) => (
                            <li key={ticket.id} className="mb-2">
                                <strong>Name:</strong> {ticket.name} <strong>Ticket Number:</strong> {ticket.ticketNumber}
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default Events;
