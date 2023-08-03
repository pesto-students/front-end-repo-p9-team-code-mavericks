import Container from 'react-bootstrap/Container';
import "../css/bookmarks.css";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import BookmarkItem from './BookmarkItem';

const BookmarksListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const token = Cookies.get('token');

      const response = await fetch('http://127.0.0.1:3000/users/bookmarklist', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }

      setBookmarks(data.bookmarks);
      for (let i = 0; i < bookmarks.length; i)
        setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching feeds:', error);
    }

  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <Container>
      <div className="bookmark-grid">
        {bookmarks.map((bookmark, index) => (
          <BookmarkItem key={index} bookmark={bookmark} />
        ))}
      </div>
    </Container>
  );
}

export default BookmarksListPage;