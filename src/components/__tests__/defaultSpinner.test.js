import { render, screen } from '@testing-library/react'
import DefaultSpinner from '../DefaultSpinner'

describe('Spinner', () => {
  it('renders spinner correctly', async () => {
    render(<DefaultSpinner/>)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})