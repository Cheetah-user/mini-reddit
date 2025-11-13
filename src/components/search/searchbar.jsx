import { fetchSearchResults } from "../../features/searchSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./search.css";


 const SearchBar = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchSearchResults(search));
    }
    
    return (
      <header className="HeaderStyles">
       <h1 className="header-title">RedditMinimal</h1>
        <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={search} 
          onChange={e => setSearch(e.target.value)}
          placeholder="Search reddit"
        />
        <button type="submit" className="SearchButton">Search</button>
      </form>
      </header>
    )
}


export default SearchBar;
