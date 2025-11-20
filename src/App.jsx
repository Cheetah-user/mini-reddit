import SearchResult from './components/search/searchresults'
import './App.css'
import SubReddit from './components/subreddits/subreddits'
import { useState } from 'react'

function App() {
  const [selectedSub, setSelectedSub] = useState(null);
  return (
   <>
    <SearchResult subreddit = {selectedSub}/>
    <SubReddit setSelectedSub = {setSelectedSub}/>
   </>
  )
}

export default App;
