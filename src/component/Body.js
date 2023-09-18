import { restrauntList } from "../config";
import RestrauntCard from "./RestrauntCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

function filterData(searchText, restaurants) {
  return restaurants.filter((restaurant) =>
    restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );
}

const Body = () => {
  // at given time -> page should show filteredRestuarant
  //when my page loads, filteredRestuarant should have allRestaurants

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    //API call
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.29844139999999&lng=77.99313599999999&page_type=DESKTOP_WEB_LISTING"
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4177867&lng=77.0627653&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }

  //not render component (Early Return)
  if (!allRestaurants) return null;

  {
    /*if (filteredRestaurants?.length === 0)
return <h1>No Restuarant matches your filter</h1>;*/
  }
  //Conditional REndering
  //if restaurants is empty => upload shimmer ui
  //if restaurants has data => upload actual data UI

  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          //takes a callback function taking an e event. So whenever input is changed, this function will be called.
          //this e is provided by JS. e.target.value

          //whenever
        />
        <button
          className="search-btn"
          onClick={() => {
            //need to filter the data from restraunt-list and then update this restraunt-list using state variable because i cannot do it directly.
            const data = filterData(searchText, allRestaurants);
            //update the state (state = restaurant variable)
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
      <div className="restraunt-list">
        {/*you have to write logic for No restuarant font here */}
        {filteredRestaurants.map((restaurant) => {
          return (
            <Link to={"/restaurant/"+restaurant.data.id}>
              <RestrauntCard {...restaurant.data} key={restaurant.data.id} />
            </Link>
            
          );
        })}
      </div>
    </>
  );
};

export default Body;

/* 
fetch
promises
async await function
when you call swiggy api, why is it not happening? who is blocking it? -> our browser
plugin -> cors
what is cors??


*/
