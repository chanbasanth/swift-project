import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CommentTable from '../components/CommentTable';
import Pagination from '../components/Pagination';
import { saveToStorage, loadFromStorage } from '../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';
import "./Dashboard.css";

const PAGE_SIZE_OPTIONS = [10, 50, 100];

const Dashboard = () => {
  const [allComments, setAllComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch('https://jsonplaceholder.typicode.com/comments');
  //     let data = await res.json();
  //     console.log("Original API data sample:", data.slice(0, 1));
  //     // Add unique ID
  //     data = data.map(item => ({ ...item, uniqueId: uuidv4() }));
  //     console.log("After adding uniqueId sample:", data.slice(0, 1));
  //     setAllComments(data);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
  const fetchData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments');
    let data = await res.json();
    
    // Assign unique IDs starting from 12345678
    let startId = 12345678;
    data = data.map(item => ({
      ...item,
      uniqueId: startId++
    }));

    setAllComments(data);
  };
  fetchData();
}, []);


  // Load saved state
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      setSearchText(saved.searchText || '');
      setSortBy(saved.sortBy || null);
      setSortOrder(saved.sortOrder || null);
      setPageSize(saved.pageSize || 10);
      setCurrentPage(saved.currentPage || 1);
    }
  }, []);

  // Save current state
  useEffect(() => {
    saveToStorage({ searchText, sortBy, sortOrder, pageSize, currentPage });
  }, [searchText, sortBy, sortOrder, pageSize, currentPage]);

  // Filter, Sort, Paginate
  useEffect(() => {
    let result = [...allComments];

    if (searchText) {
      const lower = searchText.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.email.toLowerCase().includes(lower) ||
          item.body.toLowerCase().includes(lower)
      );
    }

    if (sortBy) {
      result.sort((a, b) => {
        const valA = a[sortBy].toString().toLowerCase();
        const valB = b[sortBy].toString().toLowerCase();
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredComments(result);
  }, [allComments, searchText, sortBy, sortOrder]);

  const handleSort = (key) => {
    if (sortBy !== key) {
      setSortBy(key);
      setSortOrder('asc');
    } else {
      if (sortOrder === 'asc') setSortOrder('desc');
      else if (sortOrder === 'desc') {
        setSortBy(null);
        setSortOrder(null);
      } else setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredComments.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredComments.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <Navbar />
      <div className="dashboard">
  
        <div className="controls">
  <div className="sort-buttons">
    <button
      className={`sort ${sortBy === 'postId' ? 'active' : ''}`}
      onClick={() => handleSort('postId')}
    >
      Sort By Id
      <span className="sort-icon">
        {sortBy === 'postId' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
      </span>
    </button>

    <button
      className={`sort ${sortBy === 'name' ? 'active' : ''}`}
      onClick={() => handleSort('name')}
    >
      Sort By Name
      <span className="sort-icon">
        {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
      </span>
    </button>

    <button
      className={`sort ${sortBy === 'email' ? 'active' : ''}`}
      onClick={() => handleSort('email')}
    >
      Sort By Email
      <span className="sort-icon">
        {sortBy === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
      </span>
    </button>
  </div>

  <input
    className="search"
    type="text"
    placeholder="Search name, email, comment..."
    value={searchText}
    onChange={(e) => {
      setSearchText(e.target.value);
      setCurrentPage(1);
    }}
  />
</div>


        <CommentTable comments={currentData} />

        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
          <select
            className="select"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size} / Page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
