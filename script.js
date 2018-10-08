//$("#search-input").focus();

let query;
let result;
let offset = 0;
let counter = 0;

document.getElementById('search-input').addEventListener('keyup', function(event){
  event.preventDefault();
  if ( event.keyCode === 13 ) {
    query = document.getElementById('search-input').value;
    query = query.split(' ').join('+');
    console.log(query);
    $('#output').html('');
    getGifs();
    
  }
});





function getGifs(){

  let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=z2aAdK0B5G97BdECKFeHRER9OBWFlcNb&limit=30&sort=relevant&offset=" + offset;
  console.log(queryUrl);

  var xhr = $.get(queryUrl);
  xhr.done(function(response) {
    loadImage(response, 0);
  });
}

function loadImage(imageCollection, i){
  let img = document.createElement('img');
  img.src = imageCollection.data[i].images.fixed_height.url;
  img.setAttribute('data-loaded', 'false');
  if ( i < imageCollection.data.length - 1) {
    img.onload = function(){
      this.setAttribute('data-loaded', 'true');
      loadImage(imageCollection, ++i);
    }
    document.getElementById('output').appendChild(img);
  }
  //here's a new note!
}














// LIGHTBOX FUNCTIONS
function openLightbox(imgUrl, imgWidth, imgHeight) {
  let html = '<div class="lightbox-img-wrapper"><img src="' + imgUrl + '" height="' + imgHeight + '" width="' + imgWidth + '"></div>';
  let lightbox = document.getElementById('lightbox');
  lightbox.innerHTML = html;
  lightbox.style.display = 'flex';
  document.querySelector('#lightbox img').addEventListener('click', (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
  });
}

function closeLightbox() {
  document.getElementById('lightbox').innerHTML = '';
  document.getElementById('lightbox').style.display = 'none';
}

document.getElementById('lightbox').addEventListener('click', () => {
  closeLightbox();
});