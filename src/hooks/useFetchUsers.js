import { useEffect, useState } from "react";

export default function useFetchUsers(page, sorting, searchValue) {
  const [employees, setEmployees] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const url = `http://localhost:2222/api/employee/get?page=${page}&limit=5&sortField=${
    sorting?.column
  }&sortOrder=${sorting?.order}&name=${searchValue || ""}`;

  const token = JSON.parse(sessionStorage.getItem("data")).token;
  const headers = {
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Make the fetch request
        const response = await fetch(url, { headers });

        // Parse the JSON data
        const result = await response.json();

        setEmployees(result.data.employees);
        setTotalPages(result.data.totalPages);
        setTotalEmployees(result.data.totalEmployees);
        setLoading(false);
      } catch (error) {
        // Handle any errors that occur during the fetch
        setError(true);
      }
    }

    // Call the function with a URL
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, searchValue, page]);

  return { loading, error, employees, totalEmployees, totalPages };
}
