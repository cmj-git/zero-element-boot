import React, { useState } from 'react';
import { ChakraProvider, Flex, Center, Box, Stack, Spacer, VStack, Container, Button  } from "@chakra-ui/react";
import { AutoLayout } from '@/components';
import Loading from '@/components/loading';
const promiseAjax = require('@/components/utils/request');

import layout from './layout';

import StandaloneBody from './StandaloneBody';

export default function Index(props) {

    const { data=[] } = props;

    const [ isShowList, setIsShowList ] = useState(true);
    const [ isShowData, setIsShowData ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showDetail, setDetail ] = useState('');

    let layoutData = '';
    const layoutJsonPath = '';
    const localLayoutJson = layout;

    // let api = '/dev/dependency/decompile/json';
    let api = '/dev/dependency/json';

    if (process.env.NODE_ENV === 'development') {
      api = `http://192.168.3.121:8080${api}`;
    }

    if(layoutJsonPath){
        layoutData = { path: layoutJsonPath};
    }else{
        layoutData = localLayoutJson;
    }

    const config = {
        items: data.length > 0 ? data : [],
        layout: layoutData
    };

    const onJarItemClick = (item) => {
        // document.body.scrollTop = document.documentElement.scrollTop = 0;
        let name = item.value;
        // if(name.indexOf('/') > -1){
        //     const list = name.split('/');
        //     name = list[list.length-1]
        // }
        if(name.indexOf('@') > -1){
            const list = name.split('@');
            name = list[0]
        }
        setDetail([])
        getDetailFetch(name)
    }

    //
    const getDetailFetch = async (name) => {
        // const api = `http://localhost:8080/api/dev/dependency/decompile`;
        setIsShowList(false)
        setIsLoading(true)
        promiseAjax(api, {pattern:name}, {})
            .then(responseData => {
                if (responseData && responseData.code === 200) {
                    let respData = responseData.data;
                    setDetail(respData);
                    setIsShowData(true)
                }else{
                    setIsShowList(true)
                    setIsShowData(false)
                }
                setIsLoading(false)
            })
    }

    //处理返回内容
    function handleContent(data){

        if(typeof data === 'string'){
            return data;
        }if(data instanceof Array && data.length > 0){
            return (
                <Stack spacing='6px'>
                    {
                        data.map((item, index) => {
                            if(item.indexOf("/*") > -1){
                                return <div style={{ whiteSpace: 'pre-wrap'}} key={index}>{item}</div>;
                            }else{
                                return  <Container maxW='container.xl' key={index}>{item}</Container>
                            }
                        })
                    }
                </Stack>
            )
        }else{
            return '';
        }

    }

    function goBack () {
        setIsShowList(true)
        setIsShowData(false)
    }


    return (
        <ChakraProvider>
            <Flex>
                
                <Box>
                    <VStack spacing='6px'>
                        <div style={{minWidth: '500px', width: '100%', height: '60px', lineHeight: '60px', backgroundColor: '#ffffff'}}>
                            <Stack direction={['column', 'row']} w="100%" h="100%" p="10px">
                                <Button colorScheme='blue' onClick={() => goBack()}>Home</Button>
                            </Stack>
                        </div>
                        
                        {
                            isShowList ? (
                                <AutoLayout {...config} onItemClick={null}>
                                    <StandaloneBody  onItemClick={onJarItemClick}/>
                                </AutoLayout>
                            ): <></>
                        }
                        
                        {
                            isLoading ? (
                                    <Loading styles={{marginTop: '60px'}}/>
                            )
                             : isShowData && showDetail ? (
                                <div style={{width: '100%'}}>
                                    <Box flex='1'>
                                        { showDetail && showDetail.length > 0 ? (
                                            <div style={{background:'#ffffff', width:'100%', padding: '10px'}}>
                                                {handleContent(showDetail)}
                                            </div>
                                        ): null}
                                    </Box>
                                </div>
                            ): <></>
                        }
                    </VStack>
                </Box>
            </Flex>
        </ChakraProvider>
    )
}