import { fireEvent, screen, waitFor } from '@testing-library/react'
import SingleProfile from '../SingleProfile'
import { renderWithProviders } from '../../../utils/test-utils'
import data from '../../../app/data.json'
import userEvent from '@testing-library/user-event'
import { server } from '../../../mocks/server'
import 'whatwg-fetch'

describe('Add, Edit and view profile', () => {
  const user = userEvent.setup()
  beforeAll(() => {
    server.listen({
      onUnhandledRequest (req) {
        console.error(
          'Found an unhandled %s request to %s',
          req.method,
          req.url.href,
        )
      },
    })
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('add a profile correctly', async () => {
    renderWithProviders(<SingleProfile/>, {
      preloadedState: {
        profiles: { profile: null }
      }
    })

    await user.type(screen.getByLabelText(/Name/i), 'Hayden Adams')
    await user.type(screen.getByLabelText(/Associate ID/i), 'CTS123456')
    await user.type(screen.getByLabelText(/Email/i), 'marry.smith@cognizant.com')
    await user.type(screen.getByLabelText(/Mobile/i), '0402471000')

    // Tech skills
    await user.type(screen.getByLabelText(/HTML_CSS_JAVASCRIPT/i), '12')
    await user.type(screen.getByLabelText(/HTML_CSS_JAVASCRIPT/i), '15')
    await user.type(screen.getByLabelText(/AWS/i), '15')
    await user.type(screen.getByLabelText(/ANGULAR/i), '15')
    await user.type(screen.getByLabelText(/REACT/i), '15')
    await user.type(screen.getByLabelText(/SPRING/i), '15')
    await user.type(screen.getByLabelText(/RESTFUL/i), '15')
    await user.type(screen.getByLabelText(/HIBERNATE/i), '15')
    await user.type(screen.getByLabelText(/GIT/i), '15')
    await user.type(screen.getByLabelText(/DOCKER/i), '15')
    await user.type(screen.getByLabelText(/JENKINS/i), '15')

    // Non Tech skills
    await user.type(screen.getByLabelText(/SPOKEN/i), '15')
    await user.type(screen.getByLabelText(/COMMUNICATION/i), '15')
    await user.type(screen.getByLabelText(/ATTITUDE/i), '15')

    await user.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(screen.getByText('Hayden Adams')).toBeInTheDocument()
      expect(screen.getByText('CTS123456')).toBeInTheDocument()
      expect(screen.getByText('marry.smith@cognizant.com')).toBeInTheDocument()
      expect(screen.getByText('0402471000')).toBeInTheDocument()
    })
  })

  it('renders view profile correctly', async () => {
    renderWithProviders(<SingleProfile/>, {
      preloadedState: {
        profiles: { profile: data[0] }
      }
    })
    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug()
    expect(screen.getByText('f327eb8a-8aff-4bb6-be53-635bcafa448a')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('0402471001')).toBeInTheDocument()
    expect(screen.getByText('john.smith@cognizant.com')).toBeInTheDocument()
    expect(screen.getByText('CTS2020100')).toBeInTheDocument()
    expect(screen.getByText('SPRING')).toBeInTheDocument()

  })

  it('edits profile correctly', async () => {
    renderWithProviders(<SingleProfile/>, {
      preloadedState: {
        profiles: { profile: data[0] }
      }
    })
    const user = userEvent.setup()
    fireEvent.click(screen.getByText('Edit Profile'))
    await user.clear(screen.getByLabelText(/Email/i))
    await user.type(screen.getByLabelText(/Email/i), 'hayden.adams@cognizant.com')
    await user.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(screen.getByText('hayden.adams@cognizant.com')).toBeInTheDocument()
    })
  })

  it('shows errors when submitting new profile', async () => {
    renderWithProviders(<SingleProfile/>, {
      preloadedState: {
        profiles: { profile: null }
      }
    })

    await user.click(screen.getByRole('button', { name: /Submit/i }))
    await waitFor(() => {
      ['name', 'email', 'associateId', 'mobile'].forEach(field => {
        expect(screen.getByText(`${field} is a required field`)).toBeInTheDocument()
      })
      expect(screen.getAllByText('Enter a value between 0 and 20')).toHaveLength(13)
    })
  })

})