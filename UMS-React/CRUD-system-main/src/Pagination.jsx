/* eslint-disable jsx-a11y/accessible-emoji */

export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
    const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
    const end = activePage === totalPages ? count : beginning + rowsPerPage - 1
  
    return (
      <>
        <div className="pagination">
        <div className="page">
        <div className="number">
        <p>
          Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
        <p>
          Page {activePage} of {totalPages}
        </p>
        </div>
        </div>
          <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
          <box-icon name='chevrons-left'></box-icon>
          </button>
          <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
          <box-icon name='chevron-left'></box-icon>
          </button>
          <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
          <box-icon name='chevron-right'></box-icon>
          </button>
          <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
          <box-icon name='chevrons-right'></box-icon>
          </button>
        
        
        </div>
      </>
    )
  }
  