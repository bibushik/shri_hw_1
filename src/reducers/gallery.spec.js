import { expect } from 'chai';
import {gallery} from './gallery';

describe.only('Reducer:Gallery', function(){
    it('returns images (empty array), loading(false) if state is undefined', function(){
        // setup
        const state = null;
        const expectedNewState = {
            images: [],
            loading: false,
        };

        // execute
        const newState = gallery(state, { type: 'unknown' });

        // verify
        expect(newState).to.deep.equal(expectedNewState);
    });
    it('on IMAGES_LOADED returns new state with loaded images', () => {
        // setup
        const state =
            {
                images: [{ name: '1image' }, { name: '2image' }, { name: '3image' }],
                loading: true,
                gridRender: true,
            };
        const newImages = [{name: '4image'}];
        const next = {
            page: 2,
            count: 666
        };
        const action = {
            type: 'IMAGES_LOADED',
            images: newImages,
            next: next
        };
        const expectedNewState =
            {
                images: [{ name: '1image' }, { name: '2image' }, { name: '3image' }, { name: '4image' }],
                loading: false,
                gridRender: true,
                next: {
                    page: 2,
                    count: 666
                }
            };
        // execute

        const newState = gallery(state, action);

        // verify
        expect(newState).to.deep.equal(expectedNewState);
    });
    it('on IMAGES_LOADING returns new state with loading and gridRender', () => {
        // setup
        const state =
            {
                images: [{ name: '1image' }, { name: '2image' }, { name: '3image' }],
                loading: false,
            };
        const action = {
            type: 'IMAGES_LOADING',
            loading: true,
            gridRender: true,
        };
        const expectedNewState =
            {
                images: [{ name: '1image' }, { name: '2image' }, { name: '3image' }],
                loading: true,
                gridRender: true,
            };

        // execute

        const newState = gallery(state, action);

        // verify
        expect(newState).to.deep.equal(expectedNewState);
    });
    it('on IMAGES_LOAD_ERROR returns new state with error', () => {
        // setup
        const state =
            {
                images: [{ name: '1image' }, { name: '2image' }, { name: '3image' }],
                loading: true,
                gridRender: true
            };
        const action = {
            type: 'IMAGES_LOAD_ERROR',
            error: 'Exterminate!'
        };
        const expectedNewState =
            {
                images: [{ name: '1image' }, { name: '2image' }, { name: '3image' }],
                loading: false,
                gridRender: true,
                error: 'Exterminate!'
            };

        // execute

        const newState = gallery(state, action);

        // verify
        expect(newState).to.deep.equal(expectedNewState);
    });
    it('on GRID_RENDER_start returns new state with gridRender true', () => {
        // setup
        const state =
            {
                images: [{ name: '1image' }, { name: '2image' }, { name: '3image' }],
                loading: false,
                gridRender: false,
            };
        const action = {
            type: 'GRID_RENDER_start',
            gridRender: true,
        };
        const expectedNewState =
            {
                images: [{ name: '1image' }, { name: '2image' }, { name: '3image' }],
                loading: false,
                gridRender: true,
            };

        // execute

        const newState = gallery(state, action);

        // verify
        expect(newState).to.deep.equal(expectedNewState);
    });
    it('on GRID_RENDER_END returns new state with gridRender false', () => {
        // setup
        const state =
            {
                images: [{ name: '1image' }, { name: '2image' }, { name: '3image' }],
                loading: false,
                gridRender: true,
            };
        const action = {
            type: 'GRID_RENDER_END',
            gridRender: true,
        };
        const expectedNewState =
            {
                images: [{ name: '1image' }, { name: '2image' }, { name: '3image' }],
                loading: false,
                gridRender: false,
            };

        // execute

        const newState = gallery(state, action);

        // verify
        expect(newState).to.deep.equal(expectedNewState);
    });
});