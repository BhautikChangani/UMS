import React, { useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';

const SearchBar = () => {
    const [filters, setFilters] = useState({});
    const [activePage, setActivePage] = useState(1)
    const handleSearch = (value, accessor) => {
        setActivePage(1)
    
        if (value) {
          setFilters((prevFilters) => ({
            ...prevFilters,
            [accessor]: value,
          }))
        } else {
          setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters }
            delete updatedFilters[accessor]
    
            return updatedFilters
          })
        }
      }
  return (
    <div className='d-flex justify-content-between p-2'>
        <span className='d-flex gap-3'>
      {/* <GroupIcon /> */}
      <span>User Detail</span>
      </span>
      <span>
      <input  className='search'
                  style={{margin:"2rem"}}
                    key={`name-search`}
                    type="search"
                    placeholder={`Search Name`}
                    value={filters["name"]}
                    onChange={(event) => handleSearch(event.target.value, "name")} />
      </span>
    </div>
  )
}

export default SearchBar
