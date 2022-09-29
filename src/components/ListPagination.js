import React from 'react'
import { Pagination } from 'react-bootstrap'

const ListPagination = props => {
  const maxPerPage = props.maxPerPage
  if (props.count <= maxPerPage) {
    return null
  }

  const setPage = page => props.onSetPage(page)
  let noPages = Math.ceil(props.count / maxPerPage)
  let items = []
  for (let number = 0; number < noPages; ++number) {
    items.push(
      <Pagination.Item key={number} active={number === props.currentPage}
                       onClick={(event) => setPage(event.target)}>
        <div className={`${number === noPages - 1 ? 'last' : 'none'}`}>{number + 1}</div>
      </Pagination.Item>,
    )
  }

  return (
    <Pagination>{items}</Pagination>
  )
}

export default ListPagination