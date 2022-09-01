import ProfileCard from './ProfileCard'
import { Alert, Stack } from 'react-bootstrap'

function ProfileList ({ profiles }) {
  const content = profiles.map(profile => (
    <ProfileCard key={profile.id} profile={profile}/>
  ))
  return (
    <>
      {profiles.length === 0 && <Alert key={'warning'} variant={'warning'}>
        <strong>No records found</strong>
      </Alert>}
      <Stack gap={3}>
        {content}
      </Stack>
    </>
  )
}

export default ProfileList
