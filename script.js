const imageContainer = document.getElementById("image-container");
const loader = document.getElementById('loader');

let imagesArray = [];

// Unsplash Api 
const count = 10;
const apiKey = 'TyxR5q3_f5nWCC7HyZw4W46sNQR9NkWcdh4g1U2uQ8M';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;




// Helper function to set attributes on dom element 
function setAttributes(element , attributes){
    for (const key in attributes){
        element.setAttribute(key , attributes[key])
    }
}


// Create Elements for links && Images , Add to Dom

function displayImages(){
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
        })
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
        console.log(imagesArray)
    } catch (err) {

    }
}


// On load
getImages();

