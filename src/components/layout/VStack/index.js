import React, {useImperativeHandle, forwardRef} from 'react';
import Flexbox from '@/components/layout/Flexbox';
import Container from '@/components/container/Container';
import NextIndicator from '@/components/NextIndicator';

/**
 * 
 * @param spacing 间隔
 * 
 */

export default forwardRef(function VStack(props, ref) {
    const { children,  __, spacing, ...data } = props;
    const _Container = __ ? NextIndicator : Container

    return (
         <_Container>
            <Flexbox direction='column' spacing={spacing} {...data} ref={ref}>
                {children}
            </Flexbox>
         </_Container>
    )
})
