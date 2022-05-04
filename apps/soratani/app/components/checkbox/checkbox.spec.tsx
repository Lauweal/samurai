import React from 'react';
import { render } from '@testing-library/react-native';

import Checkbox from './checkbox';

describe('Checkbox', () => {
  it('should render successfully', () => {
    const { container } = render(< Checkbox />);
    expect(container).toBeTruthy();
  });
});
