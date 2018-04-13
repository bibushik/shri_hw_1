import React, {Component} from 'react';
import {GalleryImage} from '../GalleryImage/GalleryImage';
import {GalleryImagePreview} from "../GalleryImagePreview/GalleryImagePreview";
import {ConnectedInfinite} from "../Infinite/Infinite";
import { connect } from 'react-redux';
import fetchImages from '../../actions/fetchImages';
import './Gallery.css';

const stateToProps = state => ({
    images: state.gallery.images,
    error: state.gallery.error,
});


export class Gallery extends Component{

    state = {
        preview: false,
        loading: true,
        gridRender: true,
        initialSpinner: true
    };

    constructor(props) {
        super(props);

        this.fetch = this.fetch.bind(this);
        this.addImageHandlers = this.addImageHandlers.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.renderGrid = this.renderGrid.bind(this);
    }

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
    handleImageChange() {
        if (!this.imagesLoaded(this.galleryElement)) {
            return false;
        }
        this.props.dispatch({
            type: 'GRID_RENDER_START'
        });
        this.renderGrid();
        document.getElementsByClassName('gallery__overlay')[0].classList.remove('gallery__overlay_visible');
        document.getElementsByClassName('spinner')[0].classList.remove('spinner_visible');
    };

    componentDidMount() {
        this.fetch()
            .then(() => {
                this.setState({
                    loading: false,
                });
                this.addImageHandlers();
                window.addEventListener("resize", this.renderGrid);
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error,
                });
            });
    }

    addImageHandlers() {
        const gallery = this.galleryElement;
        const galleryItems = gallery.getElementsByClassName('gallery__item');
        for (let i = 0; i < galleryItems.length; i++){

            if(!galleryItems[i].getAttribute('style')){
                galleryItems[i].setAttribute('style', 'opacity: 0; position: absolute;');
            }


            let curImage = galleryItems[i].getElementsByTagName('img')[0];
            curImage.addEventListener('load', this.handleImageChange);
            curImage.addEventListener('click', this.togglePreview);
        }
    }

    fetch() {
        return this.props.dispatch(fetchImages());
    }


     componentWillUnmount(){
        const gallery = this.galleryElement;
        const galleryItems = gallery.getElementsByClassName('gallery__item');
        for (let i = 0; i < galleryItems.length; i++){
            galleryItems[i].getElementsByTagName('img')[0].removeEventListener('load', this.handleImageChange);
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

        for (let block of blocks) {
            block.style.opacity = 1;
            block.style.position = 'inherit';
        }
        this.props.dispatch({
            type: 'GRID_RENDER_END'
        });

    }
    //
    togglePreview (e) {
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

        let {error, images} = this.props,
            loading = this.state.loading;

        if (loading) {
            return (
                <div className="gallery__overlay gallery__overlay_visible">
                    <div className="spinner spinner_visible"/>
                </div>
            );
        }

        if (error) {
            return (
                <div className="gallery__overlay gallery__overlay_visible">
                    <h1>ERROR: {error.message}</h1>
                </div>
            );
        }

        let imageElements = '';
        if (images && images.length) {
            imageElements = images.map((image, index) =>
                <div key={image.id} className='gallery__item'>
                    <GalleryImage image={image}/>
                </div>
            );
        }

        return (
            <ConnectedInfinite fetchNext={this.fetch} afterFetch={this.addImageHandlers}>
                <div className='gallery__overlay gallery__overlay_visible'>
                    <div className="spinner spinner_visible"/>
                </div>
                <div className="gallery" ref={element => {this.galleryElement = element}}>
                    {imageElements}
                    {this.state.preview ?
                        <GalleryImagePreview togglePreview={this.togglePreview} currentImage={this.state.curImage}
                                             getPrev={this.getPrev} getNext={this.getNext}
                        /> :
                        null
                    }
                </div>

            </ConnectedInfinite>
        );
    }
}


export const ConnectedGallery = connect(stateToProps)(Gallery);
