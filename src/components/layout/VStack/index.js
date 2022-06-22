import React from 'react';
import Flexbox from '@/components/layout/Flexbox';
import Container from '@/components/container/Container'


/**
 * 
 * @param spacing 间隔
 * 
 */

export default function VStack(props) {


    const { children, spacing, ...data } = props;

    return (
        <Container>
            <Flexbox direction='column' spacing={spacing} {...data}>
                {children}
            </Flexbox>
        </Container>
    )
}