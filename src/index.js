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
    img.dataset.id = `${data[i]['id']}`

    if(i == 0){
      // Have a default ramen up when the DOM loads
      // Get the default picture src 
      let defaultImage = document.getElementById("ramen-detail").getElementsByClassName("detail-image")[0];    
      // Change the default picture src
      defaultImage.src = data[i]['image'];
      defaultImage.id = data[i]['id'];
      
      // Display the image's name 
      let defaultName = document.getElementById("ramen-detail").getElementsByClassName("name")[0]; 
      defaultName.innerText = data[i]['name']

      // Display the image's restaurant 
      let defaultRestaurant = document.getElementById("ramen-detail").getElementsByClassName("restaurant")[0]; 
      defaultRestaurant.innerText = data[i]['restaurant']
      
      // Display the meal's rating 
      let defaultRating = document.querySelector("p")
      defaultRating.innerText = `${data[i]['rating']} / 10 `

      // Display the customer's comment
      let defaultComment = document.getElementById("comment-display")
      defaultComment.innerText = data[i]['comment']

    }

    else {
      continue;
    }
  }

};

// Handle clicks to the existing images of ramen
const handleClick = (ramen) => {
  // ramen is what is currently clicked on 
  // Get the main picture src 
  let mainImage = document.getElementById("ramen-detail").getElementsByClassName("detail-image")[0];    
  // Change the main picture src
  mainImage.src = ramen.target.src;
  mainImage.id = ramen.target.dataset.id;
  
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

// Add ability to update form
const addUpdateListener = (e) => {
  e.preventDefault();
  let getDetails = document.getElementById("ramen-detail");
  let idDetails = getDetails.querySelector("img").id;
  let updateObj = {
    rating: e.target.children[2].value,
    comment: e.target.children[4].value,
  }

  // Post request for new ramen (add it to database)
  function updateRamen(){

    fetch(`http://localhost:3000/ramens/${idDetails}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateObj)
    })
    .then(response => response.json())
    
  }

  updateRamen(updateObj);
}

// Add ability to delete 
const addDeleteListener = (e) => {
  e.preventDefault();
  let getDetails = document.getElementById("ramen-detail");
  let idDetails = getDetails.querySelector("img").id;

  // Delete request for new ramen (delete it from database)
  fetch(`http://localhost:3000/ramens/${idDetails}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
}

// Use ramen data for all actions 
const main = (data) => {
  
  displayRamens(data);

  // Get a list of the img elements in the ramen menu 
  let ramenMenua = document.getElementById("ramen-menu");
  let bannerPhotos = ramenMenua.querySelectorAll("img");

  // Add event listener for each ramen photo 
  bannerPhotos.forEach((item)=>item.addEventListener("click", handleClick))

  // Get inputs from form 
  let form = document.getElementById("new-ramen");

  // Take action when the form is filled out 
  form.addEventListener("submit", addSubmitListener)

  // Get update form 
  let update = document.getElementById("edit-ramen");

  // Take action when the update is filled out 
  update.addEventListener("submit", addUpdateListener);

  // Get delete button 
  let bye = document.getElementById("delete-ramen");

  // Take action when the delete is clicked
  bye.addEventListener("submit", addDeleteListener);

}

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

document.addEventListener("DOMContentLoaded", main)