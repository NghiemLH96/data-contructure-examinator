import React from 'react'

export default function TimeStamp({ timestamp }) {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString();
    return (
        <span>{formattedDate}</span>
    );
}
