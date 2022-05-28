import { render } from '@testing-library/react';

import Appbar from './appbar';

describe('Appbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Appbar />);
    expect(baseElement).toBeTruthy();
  });
});
