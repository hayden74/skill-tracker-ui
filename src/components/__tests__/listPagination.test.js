import { render, screen } from '@testing-library/react'
import ListPagination from '../ListPagination'

it('renders pagination correctly', async () => {
  render(<ListPagination maxPerPage={2} count={10} currentPage={2}/>)
  const items = await screen.findAllByRole('button')
  expect(items).toHaveLength(4)
})
