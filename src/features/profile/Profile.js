import ProfileList from './ProfilesList'
import { useGetProfilesQuery } from '../../api/apiSlice'
import DefaultSpinner from '../../components/DefaultSpinner'
import { Alert } from 'react-bootstrap'
import SearchForm from './SearchForm'

function Profile () {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProfilesQuery()

  let content

  if (isLoading) {
    content = <DefaultSpinner text="Loading..."/>
  } else if (isSuccess) {
    content = <ProfileList profiles={data.profiles}/>
  } else if (isError) {

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
