import React from 'react';

const CommentTable = ({ comments }) => {
  return (
    <table className="comment-table">
      <thead>
        <tr>
          <th>Post ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((item) => (
          <tr key={item.uniqueId}>
            <td>{item.postId}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommentTable;
