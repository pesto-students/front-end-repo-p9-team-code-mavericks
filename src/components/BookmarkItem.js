import React from "react";
import "../css/bookmarks.css";


const BookmarkItem = (props) => {
  return (
    <div className="bookmark-item">
      <h3>{props.bookmark.recipe_title}</h3>
      <p>By {props.bookmark.author}</p>
    </div>
  );
};

export default BookmarkItem;