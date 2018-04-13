import React from 'react';
import './GalleryImage.css'

export function GalleryImage (props) {
        if (!props){
            return null;
        }
        // const imageName = props.image.filename;
        // const imageSrc = require(`../../img/${imageName}`);

        const imageSrc = props.image.images.original.url;

        return (
            <img src={imageSrc}/>
        )

}
