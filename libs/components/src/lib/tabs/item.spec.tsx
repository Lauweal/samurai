import { render } from "@testing-library/react";
import { Item } from "./item";

describe('Tabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Item name="1" tab="1" />);
    expect(baseElement).toBeTruthy();
  });
});
