import React, {Component} from 'react';
import {GalleryImage} from '../GalleryImage/GalleryImage'
import './GalleryGrid.css'

export class GalleryGrid extends Component{

    render (){
        console.log("GalleryGrid render is called");

        const imageElements = this.props.images.map((image, index) =>
            <div key={image.id} className='gallery__item'>
                <GalleryImage image={image}/>
            </div>
        );

        return (
            <div className="gallery" ref={element => {this.galleryElement = element}}>
                {imageElements}
            </div>

        )
    }
}

