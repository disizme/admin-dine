import React from 'react'
import MainLogo from '../../../shared/diners/logo/MainLogo'

export default function TopHeader() {
    return <div className="top-menu container-fluid">
        <h1 className="color-normal">
            <MainLogo className="d-inline-block mr-2 my-1" />
            <span className="brand-color">Dine</span>Mate
    </h1>
        {/* <div className="info-card">
    <div>
        <FaPhoneAlt className="mr-1" /> 11111111
            </div>
    <div>
        <FaMapMarkerAlt className="mr-1" /> Adelaide, Australia
            </div>
    </div> */}
    </div>
}