import { useState, useEffect, useMemo } from 'react'
import { sortRows, filterRows, paginateRows } from './helper'
import { Pagination } from './Pagination';
import { editEmployee, getListEmployees } from './service/localstorage';
import { useForm } from './hooks/useForm';
import { removeEmployee } from './service/localstorage';
import './Table.css'
import Item from './Item';

export const Table = ({ columns, rows, setEmployees, fetchData }) => {

  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
  const rowsPerPage = 3

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

  const count = filteredRows.length
  const totalPages = Math.ceil(count / rowsPerPage)

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

  const handleSort = (accessor) => {
    setActivePage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters({})
  }

  return (
    <>
    <div className="nav">
            <div className="left">
                <div className="icon">
      <box-icon type='solid' color='blue' size='lg' name='group'></box-icon>
      </div>
      <div className="heading">User Details</div>
      </div>
      <div className="right">
                  <input
                  className='search'
                  style={{margin:"2rem"}}
                    key={`name-search`}
                    type="search"
                    placeholder={`Search Name`}
                    value={filters["name"]}
                    onChange={(event) => handleSearch(event.target.value, "name")}
                  />
                  
      </div>
      </div>
              
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return (<box-icon size='xs' name='up-arrow-alt'></box-icon>)
                  }
                  return (<box-icon size='xs' name='down-arrow-alt'></box-icon>)
                } else {
                  return '️↕️'
                }
              }
              return (
                  
                <th key={column.accessor}>
                  <span>{column.label}</span>
                  {(column.accessor == "name" || column.accessor == "address") &&
                  <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>}
                </th>
            
                
              )
            })}
          </tr>
          {/* <tr>
            {columns.map((column) => {
              return (
                <th>
                  <input
                    key={`${column.accessor}-search`}
                    type="search"
                    placeholder={`Search ${column.label}`}
                    value={filters[column.accessor]}
                    onChange={(event) => handleSearch(event.target.value, column.accessor)}
                  />
                </th>
              )
            })}
          </tr> */}
        </thead>
        <tbody>
          {calculatedRows.map((row) => {
            return (
            <Item row={row} key={row.id} columns={columns} fetchData={fetchData} setEmployees={setEmployees}/>
            )
          })}
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p className='nodata'>No data found</p>
      )}

      {/* <div>
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      </div> */}

          
    </>
  )
}
