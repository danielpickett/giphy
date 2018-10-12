
let $output = $('#output');
let $input = $('#search-input');
//$input.focus();

let query;
let result;
let offset = 0;
let counter = 0;

$input.on('keyup', function(event){
  event.preventDefault();
  if ( event.keyCode === 13 ) {
    query = $input.val();
    query = query.split(' ').join('+');
    console.log(query);
    $output.html('');
    getGifs();
    
  }
});





function getGifs(){

  let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=z2aAdK0B5G97BdECKFeHRER9OBWFlcNb&limit=30&sort=relevant&offset=" + offset;
  console.log(queryUrl);

  var xhr = $.get(queryUrl);
  xhr.done(function(response) {
    //loadImage(response, 0);
    console.log(response);
    buildSkeleton(response);
  });
}

function buildSkeleton(imageCollection) {
  console.log(imageCollection)
  for (let i = 0; i < imageCollection.data.length; i++) {
    $output.append('<div class="img-wrapper" id="' + imageCollection.data[i].id + '" style="height:' + imageCollection.data[i].images.fixed_height.height + 'px; width: ' + imageCollection.data[i].images.fixed_height.width + 'px;" data-img-loaded="false"></div>');
  }
  loadingSweep();
}

function loadingSweep() {
  let $arr = $('.img-wrapper[data-img-loaded=false]');
  for (let i = 0; i < $arr.length; i++) {
    console.log($arr[i]);
    let img = document.createElement('img');
    img.src = 'https://media0.giphy.com/media/' + $arr[i].id + '/200.gif';
    img.onload = function() {
      console.log(this);
      this.parentElement.setAttribute('data-img-loaded', 'true');
    };
    $arr[i].append(img);
    $arr[i].setAttribute('data-load-status', 'loading');
  }
}

function cancel() {
  window.stop();
  $('.img-wrapper[data-img-loaded=false] img').remove('');
}







function loadImage(imageCollection, $imgWrapperArr, i){
  console.log('running loadImage');
  let img = document.createElement('img');
  img.src = imageCollection.data[i].images.fixed_height.url;
  img.onload = function() {
    loadImage(imageCollection, $('.img-wrapper[data-load-status=empty]'), ++i);
  };
  $imgWrapperArr[i].append(img);
  $imgWrapperArr[i].setAttribute('data-load-status', 'loading');
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