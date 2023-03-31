import { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import { sortRows, filterRows, paginateRows } from "./helpers";
import { Pagination } from "./Pagination";
import "./TableComponent.css";

export const TableComponent = ({ columns, rows }) => {
   const [activePage, setActivePage] = useState(1);
   const [filters, setFilters] = useState({});
   const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
   const rowsPerPage = 15;

   const filteredRows = useMemo(
      () => filterRows(rows, filters),
      [rows, filters]
   );
   const sortedRows = useMemo(
      () => sortRows(filteredRows, sort),
      [filteredRows, sort]
   );
   const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

   const count = filteredRows.length;
   const totalPages = Math.ceil(count / rowsPerPage);

   const handleSearch = (value, accessor) => {
      setActivePage(1);

      if (value) {
         setFilters((prevFilters) => ({
            ...prevFilters,
            [accessor]: value,
         }));
      } else {
         setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            delete updatedFilters[accessor];

            return updatedFilters;
         });
      }
   };

   const handleSort = (accessor) => {
      setActivePage(1);
      setSort((prevSort) => ({
         order:
            prevSort.order === "asc" && prevSort.orderBy === accessor
               ? "desc"
               : "asc",
         orderBy: accessor,
      }));
   };

   const clearAll = () => {
      setSort({ order: "asc", orderBy: "id" });
      setActivePage(1);
      setFilters({});
   };

   return (
      <>
         <table>
            <thead>
               <tr>
                  {columns.map((column) => {
                     const sortIcon = () => {
                        if (column.accessor === sort.orderBy) {
                           if (sort.order === "asc") {
                              return "⬆️";
                           }
                           return "⬇️";
                        } else {
                           return "️↕️";
                        }
                     };
                     return (
                        <th key={column.accessor}>
                           {/* <span>{column.label}</span> */}
                           <Button
                              variant="outlined"
                              sx={{
                                 textTransform: "capitalize",
                                 margin: 0,
                                 // minHeight: "5rem",
                              }}
                              fullWidth
                              fullHeight
                              onClick={() => handleSort(column.accessor)}
                           >
                              {column.label}
                              {sortIcon()}
                           </Button>
                           {/* <button onClick={() => handleSort(column.accessor)}>
                              {sortIcon()}
                           </button> */}
                        </th>
                     );
                  })}
               </tr>
               <tr>
                  {columns.map((column) => {
                     return (
                        <th>
                           <input
                              key={`${column.accessor}-search`}
                              className="searchField"
                              type="search"
                              placeholder=""
                              value={filters[column.accessor]}
                              onChange={(event) =>
                                 handleSearch(
                                    event.target.value,
                                    column.accessor
                                 )
                              }
                           />
                        </th>
                     );
                  })}
               </tr>
            </thead>
            <tbody>
               {calculatedRows.map((row) => {
                  return (
                     <tr key={row.id}>
                        {columns.map((column) => {
                           if (column.format) {
                              return (
                                 <td key={column.accessor}>
                                    {column.format(row[column.accessor])}
                                 </td>
                              );
                           }
                           return (
                              <td key={column.accessor}>
                                 {row[column.accessor]}
                              </td>
                           );
                        })}
                     </tr>
                  );
               })}
            </tbody>
         </table>
         <br />
         {count > 0 ? (
            <Pagination
               activePage={activePage}
               count={count}
               rowsPerPage={rowsPerPage}
               totalPages={totalPages}
               setActivePage={setActivePage}
            />
         ) : (
            <p>Ничего не найдено</p>
         )}

         <div>
            <p>
               <Button
                  variant="contained"
                  component="label"
                  sx={{ margin: "10px", fontSize: "0.75rem" }}
                  onClick={clearAll}
               >
                  Сбросить фильтры
               </Button>
            </p>
         </div>
      </>
   );
};
