import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
const Search = () => {
    const history=useHistory();
    const [keyword, setKeyword] = useState(' ')
    const searchHandler=(e)=>{
        e.preventDefault()
        if(keyword){
            history.push(`/search/${keyword}`)
        }
        else{
            history.push(`/`)
          
        }
    }
    return (
       
            <form action="" className='searchBox' onSubmit={searchHandler}>
           <input
            type="text"
            id="search_field"
            className="searchInput"
            placeholder="Enter Product Name ..."
            onChange={(e)=> setKeyword(e.target.value)}
            required
          />
           
        
            <button className="searchButton">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
        
          
          </form>
         
    )
}

export default Search
