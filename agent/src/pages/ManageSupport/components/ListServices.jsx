import React from 'react';
import ServiceCard from './ServiceCard';

function ListServices({ onSelect }) {
    return (
        <div
            className="
                grid grid-cols-1
                sm:grid-cols-1
                md:grid-cols-3
                lg:grid-cols-3
                gap-4
            "
        >
            <ServiceCard onClick={() => onSelect(true)} title="Nạp tiền" />
            <ServiceCard onClick={() => onSelect(true)} title="Rút tiền" />
            <ServiceCard onClick={() => onSelect(true)} title="Mua hàng" />
        </div>
    );
}

export default ListServices;
