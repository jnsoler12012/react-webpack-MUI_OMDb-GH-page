import React from 'react'
import Image1 from 'Images/Logo.PNG';
import Button from 'MUI_Material/Button';

export default function () {
    return (
        <div>Abecedario
            <img src={Image1} alt="" />
            <Button variant="contained">Hello world</Button>;
        </div>
    )
}