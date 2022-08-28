import ProfileCard from './ProfileCard'
import { Stack } from 'react-bootstrap'

function ProfileList ({ profiles }) {
  const content = profiles.map(profile => (
    <ProfileCard key={profile.id} profile={profile}/>
  ))
  return (
    <>
      <Stack gap={3}>
        {content}
      </Stack>
    </>
  )
}

export default ProfileList
