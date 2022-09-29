import { render, screen } from '@testing-library/react'
import DefaultSpinner from '../DefaultSpinner'

it('renders spinner correctly', async () => {
  render(<DefaultSpinner/>)
  expect(screen.getByRole('status')).toBeInTheDocument()
})
