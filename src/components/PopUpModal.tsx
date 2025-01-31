import React, { useState } from 'react'
import { FC } from 'react'

type ModalProps = {
    modalText: string,
    modalHTML: any,
    modalColor: any,
    modalActive: boolean|any,
    closeModal: boolean|any,
}

const PopUpModal:FC<ModalProps> = (props) => {

    return (
        <div id="popup" className={`${props.modalActive ? "active": null}`}>
            <h2 id="popup-img" style={{ color: props.modalColor }}>{props.modalHTML}</h2>
            <p id="popup-text" style={{ color: props.modalColor }}>{props.modalText}</p>
            <br />
            <button className="btn" onClick={()=>props.closeModal(false)}>Go Back...</button>
        </div>
    )
}

export default PopUpModal