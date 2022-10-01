import { render, screen } from '@testing-library/react'
import ProfileCard from '../ProfileCard'
import data from '../../../app/data.json'

describe('Profile card display', () => {
  it('renders profile card correctly', async () => {
    render(<ProfileCard profile={data[0]}/>)
    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug()
    expect(screen.getByText('f327eb8a-8aff-4bb6-be53-635bcafa448a')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('0402471001')).toBeInTheDocument()
    expect(screen.getByText('john.smith@cognizant.com')).toBeInTheDocument()
    expect(screen.getByText('CTS2020100')).toBeInTheDocument()
    expect(screen.getByText('SPRING')).toBeInTheDocument()

    const skills = screen.getAllByRole('row')
    expect(skills).toHaveLength(22)
  })
})