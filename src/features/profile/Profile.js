import { useDispatch, useSelector } from 'react-redux'
import { fetchProfiles, selectAllProfiles } from './profileSlice'
import ProfileList from './ProfilesList'
import { useEffect } from 'react'

function Profile () {
  const dispatch = useDispatch()
  const profiles = useSelector(selectAllProfiles)
  const profileStatus = useSelector(state => state.profiles.status)
  useEffect(() => {
    if (profileStatus === 'idle') {
      dispatch(fetchProfiles())
    }
  }, [profileStatus, dispatch])

  return (
    <>
      <h2>Profiles home</h2>
      <ProfileList profiles={profiles}/>
    </>
  )
}

export default Profile
