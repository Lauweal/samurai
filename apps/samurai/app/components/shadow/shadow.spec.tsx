import React from 'react';
import { render } from '@testing-library/react-native';

import Shadow from './shadow';

describe('Shadow', () => {
  it('should render successfully', () => {
    const { container } = render(< Shadow />);
    expect(container).toBeTruthy();
  });
});
