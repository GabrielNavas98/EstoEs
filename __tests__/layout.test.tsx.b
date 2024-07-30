import { render, screen } from '@testing-library/react'
import {describe, expect, test} from '@jest/globals';
import { AppProps } from 'next/app';
import RootLayout from '@/app/layout';

describe('Layout', () => {
  it('renders a navbar', () => {
    render(<RootLayout modal={undefined} children={undefined} {...{} as AppProps}/>)

    const navbar = screen.getByTestId('navbarComponent')

    expect(navbar).toBeInTheDocument()
  })
})
test('renders children', () => {
  const mockChildren = <div data-testid="mock-children">Hello, children!</div>;
  render(<RootLayout children={mockChildren} modal={undefined} />);

  const children = screen.getByTestId('mock-children');

  expect(children).toBeInTheDocument();
});