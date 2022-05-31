import React, { useState, useEffect } from 'react';
import { Spinner, CheckboxGroup, Checkbox, SimpleGrid } from "@chakra-ui/react";
import { useForceUpdate } from '@/components/hooks/lifeCycle';
const promiseAjax = require('@/components/utils/request');

export default function CheckboxFetch(props) {

    const { field, register, defaultValue, options, saveData, onChange, props: optProps, rules } = props;
    const { api: optionAPI, label, value, itemField } = options;

    const [listData, setListData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')

    const forceUpdate = useForceUpdate()


    useEffect(_ => {
        formatDefaultValue()
        getList()
    }, [])

    function formatDefaultValue() {
        if (defaultValue) {
            const list = []
            defaultValue.map(item => {
                list.push(item[itemField])
            })
            // console.log('list == ', list)
            // setSelectedValue(list)
            if (onChange) {
                handleChange(list)
            }
        }
    }

    //获取复选框数据
    function getList() {

        const api = `${optionAPI}`;
        const queryData = {};
        setLoading(true)
        promiseAjax(api, queryData).then(resp => {
            if (resp && resp.code === 200) {
                setListData(resp.data.records)
                // if(onChange){
                //     onChange(resp.data.records)
                // }
            } else {
                console.error("select 获取数据失败")
            }
        }).finally(_ => {
            setLoading(false)
            forceUpdate()
        });
    }



    const handleChange = (value) => {
        console.log('e === ', value)
        const mapList = []
        if (value && value.length > 0) {
            if (itemField) {
                value.map(item => {
                    const mapItem = {}
                    mapItem[itemField] = item
                    if (saveData) {
                        Object.keys(saveData).map(key => {
                            listData.map(listItem => {
                                if (listItem.id == item) {
                                    mapItem[key] = listItem[saveData[key]]
                                }
                            })
                        })
                    }
                    mapList.push(mapItem)
                })
            } else {
                mapList = value
            }

        }
        setSelectedValue(value)
        if (onChange) {
            const postData = {}
            postData[field] = mapList
            
            console.log('postData === ', postData)
            onChange(postData)
        }
    }


    // <Select bgColor="gray.50" placeholder={optProps.placeholder ? optProps.placeholder : `请选择`} id={field}
    //     value={selectedValue || defaultValue}
    //     {...register(field,
    //         rules && rules.isRequired && optProps ? {
    //             required: optProps.placeholder ? optProps.placeholder : `请选择`
    //         } : {}
    //     )}
    //     autoFocus
    //     onChange={selectedChange}
    // >
    //     {data && data.length > 0 && data.map((item, index) => (
    //         <option key={`${index}_option`} value={item[value]}>{item[label]}</option>
    //     ))}
    // </Select>

    return (
        <>
            {loading ? <Spinner /> : (

                <CheckboxGroup colorScheme='green' defaultValue={selectedValue || defaultValue} bgColor="gray.50" id={field}
                    {...register(field,
                        rules && rules.isRequired && optProps ? {
                            required: optProps.placeholder ? optProps.placeholder : `请选择`
                        } : {}
                    )}
                    onChange={handleChange}
                >
                    <SimpleGrid columns={3} spacingX='20px' spacingY='20px'>
                        {listData && listData.length > 0 && listData.map((item, index) => (
                            <Checkbox value={item[value]} key={`${index}_checkbox`} ref={register(field).ref}>{item[label]}</Checkbox>
                        ))}
                    </SimpleGrid>
                </CheckboxGroup>
            )}
        </>
    )


}