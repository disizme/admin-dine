import React, { Component } from 'react'
import brandlogo from './../../../assets/img/brand/brand.png'
import './logo.css'
export default class BrandLogo extends Component {
    render() {
        return (
                <img src={brandlogo} className='reseller-logo' alt='Brand Logo'/>
        )
    }
}
