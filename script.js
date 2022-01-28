// - Ett sökfält där användaren får ange ett sökord.
// - Alla error ska hanteras med ett användarvänligt meddelande till användaren på webbsidan.
// - Den första bilden i sökresultatet ska visas i en img-tagg - Endast en bild i taget ska visas. Görs en ny sökning ska bilden från den gamla sökningen tas bort.


const KEY = "0ac7e90073e329a5810febb98baf950c";


const btn = document.querySelector('button');
console.log(btn);

btn.addEventListener( 'click', function(event){
    let userInput = document.querySelector('input');
    let userNumbInput = document.getElementById("myNumbInput");

    console.log(userInput.value);
    console.log(userNumbInput.value);



    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${userInput.value}&format=json&nojsoncallback=1&per_page=${userNumbInput.value}&page=1&sort=relevance
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
        console.log(data.photos.photo);
        //Vi hämtar första bilden
        getImageUrl(data.photos.photo);

    }
).catch(
    function(error){
        console.log(error);
        alert("We couldn't match your serch. Please try something else.");
    }
);
})

//här ska vi pussla ihop bild-urlen
function getImageUrl(photoObject){
    let photo = photoObject;
    let size = 'z';

    console.log(photo);

    clearImages();

    for (let i =0; i < photo.length; i++ ){

        let imgUrl = `https://live.staticflickr.com/${photo[i].server}/${photo[i].id}_${photo[i].secret}_${size}.jpg`;

        displayImg(imgUrl);
    }
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
