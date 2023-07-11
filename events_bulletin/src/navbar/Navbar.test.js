import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar.js'

describe('Navbar', () => {
  it('Renders the navbar', () => {
    const navbar = render(<Navbar />)
    expect(screen.getByText('Home')).toBeInTheDocument();
  })
})