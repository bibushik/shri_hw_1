import React from 'react';
import './GalleryImage.css'

export function GalleryImage (props) {
        if (!props){
            return null;
        }
        const imageName = props.image.filename;
        const imageSrc = require(`../../img/${imageName}`);

        return (
            <img src={imageSrc}/>
        )

}
