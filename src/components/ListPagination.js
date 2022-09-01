import React from 'react'
import { Pagination } from 'react-bootstrap'

const ListPagination = props => {
  const maxPerPage = props.maxPerPage
  if (props.count <= maxPerPage) {
    return null
  }

  const setPage = page => props.onSetPage(page)

  let items = []
  for (let number = 0; number < Math.ceil(props.count / maxPerPage); ++number) {
    items.push(
      <Pagination.Item key={number} active={number === props.currentPage}
                       onClick={(event) => setPage(event.target)}>
        {number + 1}
      </Pagination.Item>,
    )
  }

  return (
    <Pagination>{items}</Pagination>
  )
}

export default ListPagination