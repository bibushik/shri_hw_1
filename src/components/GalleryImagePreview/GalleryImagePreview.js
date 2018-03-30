import React, {Component} from 'react';
import './GalleryImagePreview.css';

export class GalleryImagePreview extends Component{

    state = {
        currentImage: this.props.currentImage,
        images: this.props.images
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.currentImage !== this.state.currentImage) {
            this.setState({ currentImage: nextProps.currentImage });
        }
    }

    render (){
        // console.log("GalleryImagePreview render is called");
        // console.log("GalleryImagePreview currentImage is ", this.state.currentImage);

        let img;
        if (this.state.currentImage){
            img = <img className="GalleryImagePreview__img"
                             src={this.state.currentImage.src}/>;
        }


        return(
            <div className="GalleryImagePreview">
                <div className="GalleryImagePreview__overlay">
                    <button className="GalleryImagePreview__close" onClick={this.props.togglePreview}></button>
                    <div className="GalleryImagePreview__popup">
                        <button className="GalleryImagePreview__nav GalleryImagePreview__nav_prev" onClick={this.props.getPrev}></button>
                        {img}
                        <button className="GalleryImagePreview__nav GalleryImagePreview__nav_next" onClick={this.props.getNext}></button>
                    </div>
                </div>
            </div>
        )
    }
}