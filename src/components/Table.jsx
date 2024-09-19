import React, { useState } from "react";
import "./table.css";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../utils/apiRequests";
import SearchBar from "./SearchBar";
import { columns } from "../constants";
import useFetchUsers from "../hooks/useFetchUsers";

const HeaderCell = ({ column, sorting, sortTable }) => {
  const isDescSorting = sorting.column === column && sorting.order === "desc";
  const isAscSorting = sorting.column === column && sorting.order === "asc";
  const setSortingOrder = isDescSorting ? "asc" : "desc";
  return (
    <th
      key={column}
      className="employees-table-cell"
      style={{ fontWeight: "bold" }}
      onClick={() => sortTable({ column, order: setSortingOrder })}
    >
      {column}
      {isDescSorting && <span>🔽</span>}
      {isAscSorting && <span>🔼</span>}
    </th>
  );
};

const Header = ({ columns, sorting, sortTable }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return (
            <HeaderCell
              column={column}
              sorting={sorting}
              key={column}
              sortTable={sortTable}
            />
          );
        })}
      </tr>
    </thead>
  );
};

const Content = ({ entries, columns }) => {
  const token = JSON.parse(sessionStorage.getItem("data")).token;
  return (
    <tbody>
      {entries?.map((entry) => {
        return (
          <tr key={entry._id}>
            {columns.map((column) => {
              return (
                <td key={column} className="employees-table-cell">
                  {column === "image" ? (
                    <img
                      src={require(`../images/${entry[column].split("\\")[3]}`)}
                      alt="img"
                      className="employee-image"
                    />
                  ) : column === "created_date" ? (
                    new Date(entry[column]).toLocaleDateString()
                  ) : // entry[column].toISOString()
                  column === "action" ? (
                    <div className="links">
                      <Link to="/edit-employee" state={{ employee: entry }}>
                        <button>Edit</button>
                      </Link>
                      <button
                        className="delete"
                        onClick={() => deleteEmployee(entry._id, token)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    entry[column]
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

const Pagination = ({ page, totalPages, selectPage }) => {
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      selectPage(selectedPage);
    }
  };
  return (
    <div className="pagination">
      <span
        onClick={() => selectPageHandler(page - 1)}
        className={page > 1 ? "" : "pagination__disable"}
      >
        ◀️
      </span>

      {[...Array(totalPages)].map((_, i) => {
        return (
          <span
            key={i}
            className={page === i + 1 ? "pagination__selected" : ""}
            onClick={() => selectPageHandler(i + 1)}
          >
            {i + 1}
          </span>
        );
      })}

      <span
        onClick={() => selectPageHandler(page + 1)}
        className={page < totalPages ? "" : "pagination__disable"}
      >
        ▶️
      </span>
    </div>
  );
};

const Table = () => {
  const [sorting, setSorting] = useState({ column: "_id", order: "asc" });
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  const sortTable = (newSorting) => {
    setSorting(newSorting);
  };
  const searchTable = (newSearchValue) => {
    setSearchValue(newSearchValue);
  };

  const selectPage = (newSelectPage) => {
    setPage(newSelectPage);
  };

  const { loading, error, employees, totalEmployees, totalPages } =
    useFetchUsers(page, sorting, searchValue);

  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center" }}>Error!! Failed to Fetch Data</div>
    );
  }

  return (
    <>
      <div className="employees-table-top">
        <SearchBar searchTable={searchTable} />
        <div className="employees-table-top-right">
          <div>Total Employees: {totalEmployees || 0}</div>
          <Link to="/create-employee">
            <button>Create Employee</button>
          </Link>
        </div>
      </div>
      {totalEmployees !== 0 ? (
        <>
          <div className="table-wrapper">
            <table className="employees-table">
              <Header
                columns={columns}
                sorting={sorting}
                sortTable={sortTable}
              />
              <Content entries={employees} columns={columns} />
            </table>
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            selectPage={selectPage}
          />
        </>
      ) : (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          No data to Fetch
        </div>
      )}
    </>
  );
};

export default Table;
