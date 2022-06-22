import React from 'react';


export default function Sekected(props) {

    const { children, ...defaultSelectedStyles } = props;

    const styles = {
        position: 'relative',
        margin: 'auto 10px auto 30px',
        ...defaultSelectedStyles
    }


    return (
        <>
            {
                React.Children.map(children, child => (
                    child
                ))
            }


        </>
    )
}