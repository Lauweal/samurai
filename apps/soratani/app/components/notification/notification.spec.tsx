import React from 'react';
import { render } from '@testing-library/react-native';

import Notification from './notification';

describe('Notification', () => {
  it('should render successfully', () => {
    const { container } = render(< Notification />);
    expect(container).toBeTruthy();
  });
});
