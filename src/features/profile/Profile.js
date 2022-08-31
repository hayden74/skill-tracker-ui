import SearchForm from './SearchForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfiles, searchProfiles } from './profileSlice'
import { useEffect } from 'react'
import DefaultSpinner from '../../components/DefaultSpinner'
import ProfileList from './ProfilesList'
import { Alert } from 'react-bootstrap'

function Profile () {
  const dispatch = useDispatch()
  const profiles = useSelector(searchProfiles)

  const profilesStatus = useSelector(state => state.profiles.status)
  const error = useSelector(state => state.profiles.error)

  useEffect(() => {
    if (profilesStatus === 'idle') {
      dispatch(fetchProfiles({ page: 0, size: 5, criteria: 'Skill', keyword: 'AWS' }))
    }
  }, [profilesStatus, dispatch])

  let content = ''
  if (profilesStatus === 'loading') {
    content = <DefaultSpinner text="Loading..."/>
  } else if (profilesStatus === 'succeeded') {
    content = <ProfileList profiles={profiles}/>
  } else if (profilesStatus === 'failed') {
    const msg = error.error ? error.error : error.data.message
    content = <Alert key={'warning'} variant={'warning'}>
      <strong>Error occurred:</strong> {msg}
    </Alert>
  }

  return (
    <>
      <h2>Profiles home</h2>
      <SearchForm/>
      {content}
    </>
  )
}

export default Profile
