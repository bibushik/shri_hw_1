import React from 'react';
import * as Adapter from '../../utils/setupTests';
import { expect } from '../../utils/chai';
import { shallow } from 'enzyme';

import {GalleryImage} from './GalleryImage';

describe('GalleryImage', function () {
    it('GalleryImage renders', () => {
        const expectedImg = 'https://test_link.com';
        const img = {
            "webformatURL": "https://test_link.com"
        };
        const wrapper = shallow(<GalleryImage image={img} />);
        expect(wrapper.find('img').prop('src')).to.equal(expectedImg);
    });
});
