const tabs = document.querySelectorAll('.tabs li');
const tabsContent = document.querySelectorAll('.tab-content');

// Add click event listener to each tab
tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    // Remove active class from all tabs and tab content
    tabs.forEach(tab => tab.classList.remove('is-active'));
    tabsContent.forEach(tabContent => tabContent.classList.remove('is-active'));

    // Add active class to the clicked tab and its corresponding content
    e.currentTarget.classList.add('is-active');
    tabsContent[getIndex(e.currentTarget)].classList.add('is-active');
  });
});

// Helper function to get the index of the element
function getIndex(el) {
  return [...el.parentElement.children].indexOf(el);
}

// Trigger click event on the first tab to show its content by default
tabs[0].click();

// Get the button element
var fetchImageButton = document.getElementById("fetch-img-btn");
var imageContainer = document.getElementById("image-container");

// Add an event listener to the button
fetchImageButton.addEventListener("click", function () {

  // Change the button text 
  if (firstClick) {
    fetchImageButton.innerText = "Get another Photo!";
    firstClick = false;
  }
  // Check if breed is selected or not
  var selectedBreed = document.getElementById("breed-select").value;
  if (!selectedBreed) {
    alert("Please select a Breed");
    return;
  }
  // Fetch the data from the API
  fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
    .then(response => response.json())
    .then(data => {
      var imageLink = data.message;
      // Create a new image element
      var img = document.createElement("img");

      // Set the source of the image to the link
      img.src = imageLink;

      // Remove previous image if exists
      var previousImage = document.getElementById("dog-image");
      if (previousImage) {
        imageContainer.removeChild(previousImage);
      }

      // Add the new image to the image-container
      img.id = "dog-image";
      imageContainer.appendChild(img);
    })
    .catch(error => console.log(error));
});



var fetchFactButton = document.getElementById("fetch-fact-btn");
var firstClick = true;

fetchFactButton.addEventListener("click", function () {
  if (firstClick) {
    fetchFactButton.innerText = "Get another Fact!";
    firstClick = false;
  }
  fetch("https://dogapi.dog/api/v2/facts?limit=1")
    .then(response => {
      if (!response.ok) {
        throw new Error("error")
      }
      return response.json()

    })
    .then(data => {
      console.log(data.data[0].attributes.body)
      var fact = data.data[0].attributes.body;
      var factContainer = document.getElementById("fact-container");
      var previousFact = document.getElementById("dog-fact");
      if (previousFact) {
        factContainer.removeChild(previousFact);
      }
      var p = document.createElement("p");
      p.innerText = fact;
      p.id = "dog-fact";
      factContainer.appendChild(p);
    })
    .catch(err => console.log(err))
});

