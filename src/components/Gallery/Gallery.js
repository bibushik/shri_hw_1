import React, {Component} from 'react';
import {GalleryImage} from '../GalleryImage/GalleryImage';
import {GalleryImagePreview} from "../GalleryImagePreview/GalleryImagePreview";
import './Gallery.css';

export class Gallery extends Component{

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         heights: [],
    //         loading: true,
    //         preview: false
    //     };
    //
    //     // This binding is necessary to make `this` work in the callback
    //    // this.onGalleryImageClick = this.onGalleryImageClick.bind(this);
    //}

    state = {
        //heights: [],
        loading: true,
        preview: false,
        curImage: null,
        //vertical: true

    };

     imagesLoaded(parentNode) {
        //console.log("imagesLoaded is called");
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
        //console.log("handleImageChange is called");
        //console.log('this is:', this);
        this.setState({
            loading: !this.imagesLoaded(this.galleryElement)
        });
    };

    renderSpinner() {
        //console.log("renderSpinner is called");
        //console.log('this is:', this);
        if (!this.state.loading) {
            this.renderGrid();
            return null;
        }
        return <span className="spinner" />;
    }

    componentDidMount() {
        //console.log("componentDidMount is called");
        //console.log('this is:', this);
        const gallery = this.galleryElement;
        const galleryItems = gallery.getElementsByClassName('gallery__item');
        for (let i = 0; i < galleryItems.length; i++){
            galleryItems[i].getElementsByTagName('img')[0].addEventListener('load', this.handleImageChange);
            galleryItems[i].getElementsByTagName('img')[0].addEventListener('click', this.togglePreview);
        }

        window.addEventListener("resize", this.renderGrid);
        //window.addEventListener("orientationChange", this.handleOrientationChange);
    }

    componentWillUnmount(){
        const gallery = this.galleryElement;
        const galleryItems = gallery.getElementsByClassName('gallery__item');
        for (let i = 0; i < galleryItems.length; i++){
            galleryItems[i].getElementsByTagName('img')[0].removeEventListener('click', this.togglePreview);
        }

        window.removeEventListener("resize", this.renderGrid);
        //window.removeEventListener("orientationChange", this.handleOrientationChange);
    }

    // handleOrientationChange = () => {
    //     console.log("the orientation of the device is now " + window.orientation.angle);
    //    alert("the orientation of the device is now " + window.orientation.angle);
    //     document.getElementsByTagName('body')[0].style.backgroundColor = "red";
    // }

    renderGrid() {
        //console.log('renderGrid is called');
        //console.log('this is:', this);
        const blocks = document.getElementsByClassName("gallery")[0].children;
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
        let newleft, newtop;
        for(let i = 1; i < blocks.length; i++){
            if (i % cols === 0) {
                newtop = (blocks[i-cols].offsetTop + blocks[i-cols].offsetHeight);
                blocks[i].style.top = newtop+"px";
            } else {
                if(blocks[i-cols]){
                    newleft = (blocks[i-cols].offsetTop + blocks[i-cols].offsetHeight);
                    blocks[i].style.top = newleft+"px";
                }
                newleft = (blocks[i-1].offsetLeft + blocks[i-1].offsetWidth);
                blocks[i].style.left = newleft+"px";
            }
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
        //console.log("getPrev is called");
        //console.log('this is:', this);
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
        //console.log("getNext is called");
        //console.log('this is:', this);
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
        // console.log("render is called");
        // console.log('this curImage is:', this.state.curImage);
        //console.log('this is:', this);

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

