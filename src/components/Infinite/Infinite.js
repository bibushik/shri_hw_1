import * as React from 'react';
import { connect } from 'react-redux';
import './Infinite.css'

const THRESHOLD = 500;

const stateToProps = state => ({
    gridRender: state.gallery.gridRender,
});

export class Infinite extends React.Component {

    state = {
        loading: false,
    };

    constructor(props) {
        super(props);

        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        let gallery = this.container.getElementsByClassName('gallery');
        if (gallery.length) {
            gallery[0].addEventListener('scroll', this.onScroll, {passive: true});
        }
        document.addEventListener('scroll', this.onScroll, {passive: true});
        document.addEventListener('mousewheel', this.onScroll, {passive: true});
    }

    componentWillUnmount() {
        let gallery = this.container.getElementsByClassName('gallery');
        if (gallery.length) {
            gallery[0].removeEventListener('scroll', this.onScroll, {passive: true});
        }
        document.removeEventListener('scroll', this.onScroll);
        document.removeEventListener('mousewheel', this.onScroll);
    }

    componentWillReceiveProps(props) {
        if (!props.gridRender && this.state.loading) {
            this.setState({
                loading: false
            });
        }
    }

    componentDidUpdate() {
        this.onScroll();
    }

    onScroll() {
        if (!this.container || this.state.loading) {
            return;
        }

        if (window.innerHeight > window.innerWidth || (window.innerWidth >= 768)) {
            /*
            * For portrait && desktop
            */
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
                containerHeight = this.container.clientHeight,
                windowHeight = window.innerHeight;

            if (scrollTop + windowHeight >= containerHeight - THRESHOLD) {
                this.nextPage();
            }
        } else {
            /*
            * For landscape
            */
            let containerWidth = 0;
            let scrollLeft = 0;
            let gallery = this.container.getElementsByClassName('gallery');
            if (gallery.length) {
                let galleryWidth = 0;
                let galleryElements = gallery[0].children;
                for (let i = 0; i < galleryElements.length; i++){
                    galleryWidth += galleryElements[i].offsetWidth;
                }
                containerWidth = galleryWidth;
                scrollLeft = gallery[0].scrollLeft;
            } else {
                containerWidth = this.container.clientWidth;
            }

            let windowWidth = window.innerWidth;

            if (scrollLeft + windowWidth >= containerWidth - THRESHOLD) {
               this.nextPage();
            }
        }

    }

    async nextPage() {
        this.setState({loading: true});

        try {
            console.log('I\'ll try');
            await this.props.fetchNext();
            this.props.afterFetch();
        }
         catch(err) {
            console.error(err);
            this.setState({loading: false});
        }
    }

    render() {
        return (
            <div className="infinite" ref={(container) => this.container = container}>
                {this.props.children}
                {this.state.loading && (
                    <div className="infinite__spinner">
                        <div className="spinner spinner_visible"/>
                    </div>
                )}
            </div>
        );
    }

}

export const ConnectedInfinite = connect(stateToProps)(Infinite);