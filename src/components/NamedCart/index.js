// const React = require('react');
import React from 'react';
// const { forwardRef } = require('react');
// import { forwardRef } from 'react';
// const useLayout = require('@/components/hooks/useLayout');
// import useLayout from 'lib/components/hooks/useLayout';

// const DefaultCartSet = require('../cart');
import { get as DefaultCartSet } from '@/components/config/NamedCartConfig';

// indicator 属于 CART, 这里考虑分开管理
import { get as DefaultIndicatorSet } from '@/components/config/NamedIndicatorConfig';

import OverlaySelector from '@/components/OverlaySelector';


/**
 * NamedCart [,NamedLayout] 负责处理数据传递，具体的Cart[ItemCart, ...] 不负责处理数据传递
 * 区别于 NamedGateway 数据传递由具体的 Gateway 处理
 * @param {string} xname 引用的Cart的名称
 * @param {object} props 引用的Cart的属性
 * @param {xname:'', props:{}} cart 参数格式 car={xname:'Cart', props: {}}
 * @param {xname:'', props:{}} indicator 响应鼠标hover时的Cart的名称
 * @param {xname:'', props:{}} selector  选中的状态的Cart的名称
 * @param {boolean} indicated indicator仅仅作为响应hover的indicator,没有正常状态的indicator
 * indicated
 */
export default function NamedCart({ children, xname, props, cart = { xname, props }, cartSet,  /*multi indicator*/ indicator, selector, unselector, indicatorSet, /* end indicator*/ isSelected, ...rest }) {

  const _CartSet = cartSet ? cartSet : DefaultCartSet()
  const cartName = (typeof cart === 'string') ? cart : cart.xname
  const _Cart = _CartSet[cartName] || tips(cartName);

  //2021-10-28 新增 selector 模块
  const _IndicatorSet = indicatorSet ? indicatorSet : DefaultIndicatorSet()

  // get indicator
  const indicatorName = indicator ? ((typeof indicator === 'string') ? indicator : (typeof indicator === 'object') ? indicator.xname : '') : ''
  const _Indicator  = indicatorName ? _IndicatorSet[indicatorName] : undefined  
  const indicatorProps = (indicator && typeof indicator === 'object') ? indicator.props : {}

  // get selector
  const selectorName =  selector ? ((typeof selector === 'string') ? selector : (typeof selector === 'object') ? selector.xname : '') : ''
  const _Selector  = selectorName ? _IndicatorSet[selectorName] : undefined
  const selectorProps = (indicator && typeof selector === 'object') ? selector.props : {}

  // 2022-11-24 defaultIndicator 更名为 unselector
  // //2021-10-28 新增 defaultIndicator 模块
  // //2022-07-05 不一定需要 defaultIndicator
  // // get defaultIndicator, the same as _Cart
  // const defaultIndicatorName = defaultIndicator ? ((typeof defaultIndicator === 'string') ? defaultIndicator : ((typeof defaultIndicator === 'object') ? defaultIndicator.xname : '')) : ''
  // const _DefaultIndicator  = defaultIndicatorName ? _IndicatorSet[defaultIndicatorName] : undefined
  // const defaultIndicatorProps = (defaultIndicatorName && (typeof defaultIndicator === 'object')) ? defaultIndicator.props : {}
  const unselectorName = unselector ? ((typeof unselector === 'string') ? unselector : ((typeof unselector === 'object') ? unselector.xname : '')) : ''
  const _Unselector  = unselectorName ? _IndicatorSet[unselectorName] : undefined
  const unselectorProps = (unselectorName && (typeof unselector === 'object')) ? unselector.props : {}


  return (
    <>
      {
        (selector) ?  // (indicator || selector) ? only selector require OverlaySelector
        (
            // <_Indicator {...rest}>
            //    <_Cart {...cart.props}>
            //     {React.Children.toArray(children).map(child => {
            //       return React.cloneElement(child, {
            //         ...rest
            //       })
            //     })}
            //   </_Cart>
            // </_Indicator>

            <OverlaySelector defaultIndicator={_Unselector} defaultIndicatorProps={unselectorProps} 
                             selectedIndicator={_Selector}  selectedIndicatorProps = {selectorProps} 
                             hoverIndicator={_Indicator}  hoverIndicatorProps = {indicatorProps}
                 isSelected={isSelected}   {...rest} >
                <_CartModule children={children} Cart={_Cart} props={cart.props} data={rest} /> 
            </OverlaySelector>
        ) : 
        (
            <_CartModule children={children} Cart={_Cart} props={cart.props} data={rest} /> 
        )
      }
    </>
  )
}

function _CartModule({children, Cart, props, data}){
  return (<Cart {...props}>
            {React.Children.toArray(children).map(child => {
              return React.cloneElement(child, {
                ...data
              })
            })}
        </Cart>)
}


function tips(name) {
  return _ => `NamedCart ${name} 未定义`;
}
