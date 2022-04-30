import React from 'react';
import { render } from '@testing-library/react-native';

import Icons from './icons';

describe('Icons', () => {
  it('should render successfully', () => {
    const { container } = render(< Icons />);
    expect(container).toBeTruthy();
  });
});
