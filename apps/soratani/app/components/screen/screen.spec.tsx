import React from 'react';
import { render } from '@testing-library/react-native';

import { Screen } from './screen';

describe('Screen', () => {
  it('should render successfully', () => {
    const { container } = render(< Screen />);
    expect(container).toBeTruthy();
  });
});
