import React from 'react';
import * as Adapter from '../../utils/setupTests';
import { expect } from '../../utils/chai';
import { shallow } from 'enzyme';

import {GalleryImagePreview} from './GalleryImagePreview';

describe('GalleryImagePreview', function () {
    it('GalleryImagePreview renders', () => {
        const expectedImg = 'https://test_link.com';
        const img = {src: "https://test_link.com"};

        const wrapper = shallow(<GalleryImagePreview currentImage={img} />);
        debugger;
        expect(wrapper.find('img').prop('src')).to.equal(expectedImg);
    });
});
