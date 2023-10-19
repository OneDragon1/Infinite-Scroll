const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
//Helper functions to set Attributes on jDOM Elements//
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//check if all images were loaded//
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready =", ready);
  }
}

//Create elements for links & photos, add to the DOM//
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  //run funtion for each object in hootsarray
  photosArray.forEach((photo) => {
    //Create anchor element to link to Unsplash//
    const item = document.createElement("a");
    //item.setAttribute("href", photo.links.html);//
    //item.setAttribute("target", "_blank");//
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create image for photo//
    const img = document.createElement("img");
    //img.setAttribute("src", photo.urls.regular);//
    //img.setAttribute("alt", photo.alt_description);//
    //img.setAttribute("title", photo.alt_description);//
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event Listener, check when each is finished loading//
    img.addEventListener("load", imageLoaded);
    //put image inside anchor element, then put both inside imagecontainer element//
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Unsplash API//
const count = 30;
const apiKey = "w1f5McydeIUh61WWX7uONdEwxydWamO2MgdMl_wlRgI";
const apiurl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get photos from unsplash API//
async function getPhotos() {
  try {
    const response = await fetch(apiurl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Camtch Error Here//
  }
}

//check to see if scrolling near bottom of page, load more photos//
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//On Load//
getPhotos();
