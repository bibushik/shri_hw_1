import React, {Component} from 'react';
import {GalleryImage} from '../GalleryImage/GalleryImage'
import './GalleryFlex.css'

export class GalleryFlex extends Component{

    state = {
        heights: [],
        loading: true,
        // rebuildingLayout: false
    };

    imagesLoaded(parentNode) {
        console.log("imagesLoaded is called");
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
        console.log("handleImageChange is called");
        this.setState({
            loading: !this.imagesLoaded(this.galleryElement)
        });
    };

    renderSpinner() {
        console.log("renderSpinner is called");
        if (!this.state.loading) {
            this.layout();
            return null;
        }
        return <span className="spinner" />;
    }

    reset = () =>{
        console.log("reset is called");
        this.heights = [];
        const gallery = this.galleryElement;
        const fillers = gallery.querySelectorAll('gallery-pad');

        const galleryItems = gallery.getElementsByClassName('gallery__item');
        for (let i = 0; i < galleryItems.length; i++){
            galleryItems[i].getElementsByTagName('img')[0].removeEventListener('load', this.handleImageChange);
        }
        if (fillers.length) {
            for (let f = 0; f < fillers.length; f++) {
                fillers[f].parentNode.removeChild(fillers[f]);
            }
        }
        gallery.removeAttribute('style');
    };

    calculateColumnHeights = () =>{
        console.log("calculateColumnHeights is called");
        const galleryItems = this.galleryElement.children;
        const heights = this.state.heights;
        for (let i = 0; i < galleryItems.length; i++) {
            const galleryItem = galleryItems[i];
            const { order: cssOrder, msFlexOrder, height } = getComputedStyle(galleryItem);
            const order = cssOrder || msFlexOrder;
            if (!heights[order - 1]) heights[order - 1] = 0;
            heights[order - 1] += parseFloat(height, 10);
        }
        console.log(heights);
    };

    setLayout = () =>{
        console.log("setLayout is called");
        const gallery = this.galleryElement;
        const heights = this.state.heights;
        this.maxHeight = Math.max(...heights);
        gallery.style.height = this.maxHeight + 'px';

        const galleryItems = this.galleryElement.children;
        for (let i = 0; i < galleryItems.length; i++){
            const curGalItem = galleryItems[i];
            const curImg = curGalItem.children[0];
            if(curImg){
                curImg.style.height = curImg.height;
                curImg.setAttribute('height', curImg.height);
                curGalItem.setAttribute('style', `height: ${curImg.height}px`);
            }
        }
        console.log(galleryItems);
    };

    fillOutEmptyBottom = () =>{
        console.log("fillOutEmptyBottom is called");
        const gallery = this.galleryElement;
        const heights = this.state.heights;
        const maxHeight = this.maxHeight;
        heights.map((height, index) => {
            if (height < maxHeight && height > 0) {
                const filler = document.createElement('div');
                filler.className = ('gallery-filler');
                filler.style.height = `${maxHeight - height}px`;
                filler.style.order = index + 1;
                filler.style.msFlexOrder = index + 1;
                gallery.appendChild(filler);
            }
        })
    };

    layout = () =>{
        console.log("layout is called");
        if (this.state.loading){
            return null;
        }
        this.reset();
        this.calculateColumnHeights();
        this.setLayout();
        this.fillOutEmptyBottom();
        // this.state.rebuildingLayout = true;
    };


    componentDidMount() {
        console.log("componentDidMount is called");
        const gallery = this.galleryElement;
        const galleryItems = gallery.getElementsByClassName('gallery__item');
        for (let i = 0; i < galleryItems.length; i++){
            galleryItems[i].getElementsByTagName('img')[0].addEventListener('load', this.handleImageChange);
            //galleryItems[i].getElementsByTagName('img')[0].onload = this.handleImageChange;
        }

        window.addEventListener("resize", this.layout);
    }

    componentDidUpdate() {
        console.log("componentDidUpdate is called");
        if (this.state.loading){
            return null;
        }

        // this.layout();
    }

    // shouldComponentUpdate(){
    //     console.log("shouldComponentUpdate is called");
    //     if (this.state.rebuildingLayout){
    //         return null;
    //     }
    // }

    componentWillUnmount(){
        console.log("componentWillUnmount is called");
        const gallery = this.galleryElement;
        const galleryItems = gallery.getElementsByClassName('gallery__item');
        for (let i = 0; i < galleryItems.length; i++){
            galleryItems[i].getElementsByTagName('img')[0].removeEventListener('load', this.handleImageChange);
        }

       // window.removeEventListener("resize", this.layout);
    }


    render (){
        console.log("render is called");

        const imageElements = this.props.images.map((image, index) =>
            <div key={image.id} className='gallery__item'>
                <GalleryImage image={image}/>
            </div>
        );

        return (
            <div className="gallery" ref={element => {this.galleryElement = element}}>
                {imageElements}
                {this.renderSpinner()}
            </div>

        )
    }
}

