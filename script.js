const imageContainer = document.getElementById("image-container");
const loader = document.getElementById('loader');

// ready for indicator to fetch again afer all images loaded
let ready = false;
// how many images loaded
let imagesLoaded = 0;
// totalImages 
let totalImages = 0;
let imagesArray = [];

// Unsplash Api 
const count = 30;
const apiKey = 'TyxR5q3_f5nWCC7HyZw4W46sNQR9NkWcdh4g1U2uQ8M';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;



// check if all images were loaded 
function imageLoaded(){
    console.log('image load');
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready)
    }

}


// Helper function to set attributes on dom element 
function setAttributes(element , attributes){
    for (const key in attributes){
        element.setAttribute(key , attributes[key])
    }
}


// Create Elements for links && Images , Add to Dom

function displayImages(){
    imagesLoaded = 0;
    totalImages = imagesArray.length;
    console.log(totalImages)
    imagesArray.forEach(image => {
        // create <a> to unsplash
        const item = document.createElement('a');
        setAttributes(item , {
            href: image.links.html,
            target: '_blank'
        })
        // create image <img> for Photo
        const img = document.createElement('img');
        setAttributes(img , {
            src : image.urls.regular,
            alt : image.alt_description,
            title: image.alt_description
        });
        // event listener 
        img.addEventListener('load' , imageLoaded)

        // put img inside <a> element put both in image container
        item.appendChild(img);
        imageContainer.appendChild(item); 

    })
}


// Fetch images 
async function getImages(){
    try {
      const response = await fetch(apiUrl);
      imagesArray = await response.json();
        displayImages();
    } catch (err) {

    }
}

// Check if page is scrolling and fetch more images 
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        console.log('load more');
        getImages();
    }
})




// On load
getImages();

