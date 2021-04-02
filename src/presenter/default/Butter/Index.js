import React from 'react';

require('./index.less');

export default function Butter(props) {
    return (
        <section className="color" id="butter">
            <h2 className="name">Butter</h2>
            <ul className="details">
                <li>{props.color}</li>
                <li>{props.reg}</li>
            </ul>
        </section>
    )
}