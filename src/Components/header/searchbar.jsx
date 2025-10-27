import { fetchSearchResults } from "../../features/searchSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";


 const SearchBar = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchSearchResults(search));
    }
    
    return (
        <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={search} 
          onChange={e => setSearch(e.target.value)}
          placeholder="Search reddit"
        />
        <button type="submit">Search</button>
      </form>
    )
}

export default SearchBar;
