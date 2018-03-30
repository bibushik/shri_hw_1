import React from 'react'
import {Gallery} from '../Gallery/Gallery';
//import {GalleryFlex} from "../GalleryFlex/GalleryFlex";
//import {GalleryGrid} from "../GalleryGrid/GalleryGrid";
import images from '../../galleryContent';

export function App () {
        return(
            <Gallery images={images}/>
        )
}
