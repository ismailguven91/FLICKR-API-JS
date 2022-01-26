// - Ett sökfält där användaren får ange ett sökord.
// - Alla error ska hanteras med ett användarvänligt meddelande till användaren på webbsidan.
// - Den första bilden i sökresultatet ska visas i en img-tagg - Endast en bild i taget ska visas. Görs en ny sökning ska bilden från den gamla sökningen tas bort.


const KEY = "0ac7e90073e329a5810febb98baf950c";

const userInput = document.querySelectorAll("input")

const btn = document.querySelector('button');
console.log(btn);

//Hämtar datan (sökord och antal) från användaren.
btn.addEventListener( 'click', function(event){
    let userInput = document.querySelector('input');
    console.log(userInput.value);


    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${userInput.value}&format=json&nojsoncallback=1&per_page=1&page=1&sort=relevance
    `;


fetch(url).then(
    function(response){
        console.log(response);
        if(response.status>=200 && response.status<300){
            return response.json();
        
        }
        else{
            throw 'Invalid input. Please search for something else...';
            
        
        }
    }
).then(
    function(data){
        console.log(data);
        //Vi hämtar första bilden
        getImageUrl(data.photos.photo[0]);
    }
).catch(
    function(error){
        console.log(error);
        alert("We could not match your serch. Please try something else.");
    }
);
})

//här ska vi pussla ihop bild-urlen
function getImageUrl(photoObject){
    let photo = photoObject;
    let size = 'z';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    // console.log(imgUrl);
    clearImages();

    displayImg(imgUrl);
}

//för att visa bilden
function displayImg(url){

    let img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}

function clearImages(){
    const images = document.querySelectorAll('img');
    console.log(images);

    for(const img of images){
        img.remove();
    }
}
