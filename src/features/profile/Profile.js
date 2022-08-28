import { useSelector } from 'react-redux'
import { selectAllProfiles } from './profileSlice'
import ProfileList from './ProfilesList'

function Profile () {
  const profiles = useSelector(selectAllProfiles)

  return (
    <>
      <h2>Profiles home</h2>
      <ProfileList profiles={profiles}/>
    </>
  )
}

export default Profile
