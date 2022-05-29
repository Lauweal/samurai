import { render } from "@testing-library/react";
import { Item } from "./item";

describe('Tabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Item icon={<div>1</div>} />);
    expect(baseElement).toBeTruthy();
  });
});
