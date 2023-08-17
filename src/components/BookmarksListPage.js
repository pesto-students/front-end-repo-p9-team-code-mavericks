import Container from 'react-bootstrap/Container';
import "../css/bookmarks.css";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import RecipeCard from './RecipeCard';

const BookmarksListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const token = Cookies.get('token');

      const response = await fetch(process.env.REACT_APP_WEBSITE_URL + '/posts/getmybookmarks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }

      setBookmarks(data);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching feeds:', error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <Container className='bookmark-container'>
      <div className="" style={{paddingTop:'1%', display:'flex', flexDirection:'column', gap:'1vh', justifyContent:'space-around', alignItems:'center'}}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          bookmarks.map((bookmark, index) => (
            <RecipeCard key={index} feed={bookmark} />
          ))
        )}
      </div>
    </Container>
  );
}

export default BookmarksListPage;
