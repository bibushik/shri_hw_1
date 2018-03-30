import React, {Component} from 'react';
import {GalleryImage} from '../GalleryImage/GalleryImage';
import {GalleryImagePreview} from "../GalleryImagePreview/GalleryImagePreview";
import './Gallery.css';

export class Gallery extends Component{

    state = {
        loading: true,
        preview: false,
    };

     imagesLoaded(parentNode) {
        const imgElements = [...parentNode.querySelectorAll("img")];
        for (let i = 0; i < imgElements.length; i += 1) {
            const img = imgElements[i];
            if (!img.complete) {
                return false;
            }
        }
        return true;
    }

    handleImageChange = () => {
        this.setState({
            loading: !this.imagesLoaded(this.galleryElement)
        });
    };

    renderSpinner() {
        if (!this.state.loading) {
            this.renderGrid();
            return null;
        }
        return <span className="spinner" />;
    }

    componentDidMount() {
        const gallery = this.galleryElement;
        const galleryItems = gallery.getElementsByClassName('gallery__item');
        for (let i = 0; i < galleryItems.length; i++){
            galleryItems[i].getElementsByTagName('img')[0].addEventListener('load', this.handleImageChange);
            galleryItems[i].getElementsByTagName('img')[0].addEventListener('click', this.togglePreview);
        }

        window.addEventListener("resize", this.renderGrid);
    }

    componentWillUnmount(){
        const gallery = this.galleryElement;
        const galleryItems = gallery.getElementsByClassName('gallery__item');
        for (let i = 0; i < galleryItems.length; i++){
            galleryItems[i].getElementsByTagName('img')[0].removeEventListener('click', this.togglePreview);
        }

        window.removeEventListener("resize", this.renderGrid);
    }

    renderGrid() {
        const gallery = document.getElementsByClassName("gallery")[0];
        const blocks = document.getElementsByClassName("gallery__item");//[0].children;
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let cols = 1;
        if (width > 1500){
            cols = 4;
        } else if (width >= 992) {
            cols = 3;
        } else if (width >= 768) {
            cols = 2;
        } else {
            cols = 1;
        }

        let heights = [];
        if (cols > 1){
            for (let i = 0; i < cols; i++) {
                heights.push(0);
            }

            for (let block of blocks) {

                /*
                * get the shortest column
                * get img height
                * add img height to the shortest column height
                * set order to img = the shortest column index + 1
                * */


                let shortColHeight = Math.min(...heights);
                let shortColIndex = heights.indexOf(shortColHeight);
                let imgHeight = block.clientHeight;
                // heights[shortColIndex] += imgHeight;
                heights[shortColIndex] = shortColHeight + imgHeight;
                block.setAttribute('style', `order: ${shortColIndex + 1};`);
            }

            const longColHeight = Math.max(...heights);
            gallery.setAttribute('style', `max-height: ${longColHeight+5}px;`);
        }

    }

    togglePreview = (e) => {
        let curImage = this.state.curImage;

        if (!this.state.preview){
            curImage = e.target;
        }

        this.setState({
            preview: !this.state.preview,
            curImage: curImage
        });
    }

    getPrev = () => {
        if(this.state.curImage){
            console.log('this curImage is:', this.state.curImage);
            const prevGalleryItem = this.state.curImage.parentElement.previousElementSibling;
            console.log('this prevGalleryItem is:', prevGalleryItem);
            let prevImage;
            if(prevGalleryItem){
                prevImage = prevGalleryItem.firstChild;
            } else {
                const galleryItems = this.galleryElement.getElementsByClassName('gallery__item');
                prevImage = galleryItems[galleryItems.length-1].firstChild;
            }
            this.setState({
                curImage: prevImage
            });
        }
    }
    getNext = () => {
        if(this.state.curImage){
            let nextGalleryItem = this.state.curImage.parentElement.nextElementSibling;
            let nextImage;
            const galleryItems = this.galleryElement.getElementsByClassName('gallery__item');

            if(nextGalleryItem){
                if (nextGalleryItem.classList.contains('GalleryImagePreview')){
                    nextImage = galleryItems[0].firstChild;
                } else {
                    nextImage = nextGalleryItem.firstChild;
                }
            } else {
                nextImage = galleryItems[0].firstChild;
            }
            this.setState({
                curImage: nextImage
            });
        }
    }



    render (){
        const imageElements = this.props.images.map((image, index) =>
            <div key={image.id} className='gallery__item'>
                <GalleryImage image={image}/>
            </div>
        );

        return (
            <div className="gallery" ref={element => {this.galleryElement = element}}>
                {imageElements}
                {this.renderSpinner()}
                {this.state.preview ?
                    <GalleryImagePreview togglePreview={this.togglePreview} currentImage={this.state.curImage}
                    getPrev={this.getPrev} getNext={this.getNext}
                    /> :
                    null
                }
            </div>

        )
    }
}

