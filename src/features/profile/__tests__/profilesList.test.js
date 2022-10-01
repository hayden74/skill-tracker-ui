import { render, screen } from '@testing-library/react'
import data from '../../../app/data.json'
import ProfilesList from '../ProfilesList'

describe('List profiles', () => {
  it('renders profileList correctly', async () => {
    render(<ProfilesList profiles={data}/>)
    // eslint-disable-next-line testing-library/no-debugging-utils
    //screen.debug()
    const profiles = screen.getAllByRole('row')
    expect(profiles).toHaveLength(110)
  })

  it('renders empty profileList correctly', () => {
    render(<ProfilesList profiles={[]}/>)
    expect(screen.getByText('No records found')).toBeInTheDocument()
  })
})
