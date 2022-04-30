import React from 'react';
import { render } from '@testing-library/react-native';

import Switch from './switch';

describe('Switch', () => {
  it('should render successfully', () => {
    const { container } = render(< Switch />);
    expect(container).toBeTruthy();
  });
});
