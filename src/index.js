// index.js

// Fetch images  
fetch(`http://localhost:3000/ramens`)
.then((resp)=> resp.json())
.then(data => main(data))

// Callbacks

// Render db ramen images on the top of DOM
const displayRamens = (data) => {

  // Get the div where the ramen images will go 
  let ramenMenu = document.getElementById("ramen-menu");
  let img;
  // Each img contain a src for a ramen photo and its data
  // Create and append img items to the div ramen-menu with all data

  for(let i=0; i<data.length; i++){
   
    img = document.createElement("img");
    ramenMenu.appendChild(img);
    img.src = `${data[i]['image']}`
    img.dataset.name = `${data[i]['name']}`
    img.dataset.store = `${data[i]['restaurant']}`
    img.dataset.rating = `${data[i]['rating']}`
    img.dataset.comment = `${data[i]['comment']}`
  }
};

// Handle clicks to the existing images of ramen
const handleClick = (ramen) => {
  // ramen is what is currently clicked on 
  // Get the main picture src 
  let mainImage = document.getElementById("ramen-detail").getElementsByClassName("detail-image")[0];    
  // Change the main picture src
  mainImage.src = ramen.target.src
  
  // Display the image's name 
  let mainName = document.getElementById("ramen-detail").getElementsByClassName("name")[0]; 
  mainName.innerText = ramen.target.dataset.name

  // Display the image's restaurant 
  let mainRestaurant = document.getElementById("ramen-detail").getElementsByClassName("restaurant")[0]; 
  mainRestaurant.innerText = ramen.target.dataset.store
  
  // Display the meal's rating 
  let mainRating = document.querySelector("p")
  mainRating.innerText = `${ramen.target.dataset.rating} / 10 `

  // Display the customer's comment
  let mainComment = document.getElementById("comment-display")
  mainComment.innerText = ramen.target.dataset.comment

};

const addSubmitListener = (e) => {
  e.preventDefault();
  let ramenObj = {
    name: e.target[0].value,
    restaurant: e.target[1].value,
    image: e.target[2].value,
    rating: e.target[3].value,
    comment: e.target[4].value,
  }

  // Post request for new ramen (add it to database)
  function addNewRamen(){

    fetch('http://localhost:3000/ramens', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ramenObj)
    })
    .then(response => response.json())
    .then(newThing => console.log(newThing))
  }

  // Add ramen image to DOM menu
  function amendMenu(){
    imgNew = document.createElement("img");
    document.getElementById("ramen-menu").appendChild(imgNew);
    imgNew.src = `${ramenObj['image']}`
    imgNew.dataset.name = `${ramenObj['name']}`
    imgNew.dataset.store = `${ramenObj['restaurant']}`
    imgNew.dataset.rating = `${ramenObj['rating']}`
    imgNew.dataset.comment = `${ramenObj['comment']}`
  }

  addNewRamen(ramenObj);
  amendMenu(ramenObj);
}



// Use ramen data for all actions 
const main = (data) => {
  
  displayRamens(data);

  // // Get a list of the img elements in the ramen menu 
  let ramenMenua = document.getElementById("ramen-menu");
  let bannerPhotos = ramenMenua.querySelectorAll("img");

  // // Add event listener for each ramen photo 
  bannerPhotos.forEach((item)=>item.addEventListener("click", handleClick))

  // // Get inputs from form 
  let form = document.getElementById("new-ramen");

  // // Take action when the form is filled out 
  form.addEventListener("submit", addSubmitListener)
}

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

document.addEventListener("DOMContentLoaded", main)