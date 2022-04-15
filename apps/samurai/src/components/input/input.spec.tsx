import React from 'react';
import { render } from '@testing-library/react-native';

import Input from './input';

describe('Input', () => {
  it('should render successfully', () => {
    const { container } = render(< Input />);
    expect(container).toBeTruthy();
  });
});
