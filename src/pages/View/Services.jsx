// Services.jsx
import React from 'react';

const Services = ({ services, searchInput }) => {

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Services</h2>
            {services.filter((service) =>
                service.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                service.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase()))
            ).map((service) => (
                <div key={service.serviceID} className="mb-4 border p-4 rounded-md">
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-2">{service.desc}</p>
                    <p className="text-gray-700 mb-2">${service.price.toFixed(2)}</p>
                    <ul>
                        {service.slots.map((slot) => (
                            <li key={slot.date} className="mb-2">
                                <strong>Date:</strong> {new Date(slot.date).toLocaleDateString()}{' '}
                                <strong>Time:</strong> {new Date(slot.time).toLocaleTimeString()}{' '}
                                <strong>Pax:</strong> {slot.pax}
                                <div className="text-gray-700">
                                    <strong>List:</strong> {slot.list.name} <strong>Status:</strong> {slot.list.status}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};


export default Services;
