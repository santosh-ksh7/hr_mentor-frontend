import { useState } from "react";
import "./Search.css"

function Search() {
  // This is to keep track of the userInput in search bar
  const[track, setTrack] = useState(null);
  // This is to store the result of the fetch call to backend
  const[response, setResponse] = useState(null)

  return (
    <div>
        <h2>Hello, start searching by Brand name, Primary text or headline</h2>
        <input placeholder="Enter here..." type="text" onChange={(e)=> setTrack(e.target.value)} />
        <button 
          onClick={() => {
            if(track){
              fetch(`https://hrmentorstudents.herokuapp.com/search/${track}`).then((data)=> data.json()).then((data) => {
                if(data.msg){
                  alert("No matching data found. try again")
                }else{
                  setResponse(data)
                }
              })
            }else{
              alert("search input can't be empty")
            }
          }}
        >Search</button>
        <div className="resullt_container">
          {response ? <div className="all_ads">
            {response.map((ele, index) => <DisplayAd obj={ele} key={index} />)}
          </div> : "No Matching result found. Start searching again"}
        </div>
    </div>
  )
}

function DisplayAd({obj}){
  return(
    <div className="single_add_container">
      <h2>Brand Name:-{obj.name}</h2>
      <h3>{obj.product_detail.headline}</h3>
      <img sx={{width: "200px", height: "200px", objectFit: "cover"}} src={obj.product_detail.imageUrl} alt={obj.name} />
      {/* Given the anchor tag to display the image in a new tab. Dont know why the image is not dispalyed here */}
      <p><a rel="noreferrer" href={obj.product_detail.imageUrl} target="blank">Reveal Poster</a></p>
      <p>{obj.product_detail.primaryText}</p>
      <p style={{color: "grey"}}>{obj.product_detail.description ? obj.product_detail.description : null}</p>
      <p><a rel="noreferrer" href={obj.url} target="_blank">Click to go to website</a></p>
      <button style={{padding: "5px"}}>{obj.product_detail.cta}</button>
    </div>
  )
}

export default Search