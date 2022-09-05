import SearchForm from './SearchForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfiles, loadedProfiles } from './profileSlice'
import { useEffect } from 'react'
import DefaultSpinner from '../../components/DefaultSpinner'
import ProfileList from './ProfilesList'
import { Alert } from 'react-bootstrap'
import ListPagination from '../../components/ListPagination'

export const searchProfiles = (options) => (dispatch) => {
  dispatch(fetchProfiles(options))
}

function Profile () {
  const dispatch = useDispatch()
  const profiles = useSelector(loadedProfiles)

  const profilesStatus = useSelector(state => state.profiles.status)
  const totalItems = useSelector(state => state.profiles.totalItems)
  const activePage = useSelector(state => state.profiles.activePage)
  const searchCriteria = useSelector(state => state.profiles.searchCriteria)
  const error = useSelector(state => state.profiles.error)

  useEffect(() => {
    if (profilesStatus === 'idle') {
      searchProfiles({ page: 0, size: 5, criteria: 'skill', keyword: 'AWS' })(dispatch)
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
      <h2>Admin view</h2>
      <SearchForm dispatch={dispatch}/>
      <ListPagination
        maxPerPage={5}
        count={totalItems}
        currentPage={activePage}
        onSetPage={(page) => {
          const pageNo = parseInt(page.text, 10)
          const { criteria, keyword } = searchCriteria
          searchProfiles({ page: pageNo - 1, size: 5, criteria, keyword })(dispatch)
        }}/>
      {content}
    </>
  )
}

export default Profile
