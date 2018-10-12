$('#loading-text').remove();

let initialHtml = '<div id="lightbox" style="display: none;"></div><div id="input"><input type="text" id="search-input" value="" placeholder="search gifs"></div><div id="output"></div><div id="load-more" onclick="getGifs()"><span>Load more</span></div>';
$(document.body).prepend(initialHtml);

let $output = $('#output');
let $input = $('#search-input');
$input.focus();

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
    console.log(response);
    buildSkeleton(response);
  }); 
}

function buildSkeleton(imageCollection) {
  console.log(imageCollection)
  for (let i = 0; i < imageCollection.data.length; i++) {
    let data = imageCollection.data[i];
    let images = data.images;
    let html = '<div class="img-wrapper" id="' + data.id + '" style="height:' + images.fixed_height.height + 'px; width: ' + images.fixed_height.width + 'px;" data-img-loaded="false">'
    
    if (images.original.height > (parseInt(images.fixed_height.height) + parseInt(15))) {
      console.log(images.original.height + ' > ' + (parseInt(images.fixed_height.height) + parseInt(15)));
      html = html + '<span onclick="openLightbox(\'' + images.original.url + '\', \'' + images.original.width + '\', \'' + images.original.height + '\');">+</span>';
    }
    html = html + '</div>'
    $output.append(html);
  }
  loadingSweep();
  $('#load-more').show();
  offset = offset + 30;
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
    $arr[i].setAttribute('data-img-loaded', 'loading');

  }
}

function cancel() {
  window.stop();
  console.log('window stopped');
  $('.img-wrapper[data-img-loaded=loading]').attr('data-img-loaded', 'false');
  $('.img-wrapper[data-img-loaded=false] img').remove('');
}



// LIGHTBOX FUNCTIONS
function openLightbox(imgUrl, imgWidth, imgHeight) {
  cancel();
  let html = '<div class="lightbox-img-wrapper"></div>';
  let lightbox = document.getElementById('lightbox');
  lightbox.innerHTML = html;
  lightbox.style.display = 'flex';

  let img = document.createElement('img');
  img.src = imgUrl;
  img.height = imgHeight;
  img.width = imgWidth;
  img.onload = function(){
    loadingSweep();
  };
  $('.lightbox-img-wrapper').append(img);
  document.querySelector('#lightbox img').addEventListener('click', (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
  });
}

function closeLightbox() {
  cancel();
  document.getElementById('lightbox').innerHTML = '';
  document.getElementById('lightbox').style.display = 'none';
  loadingSweep();
}

document.getElementById('lightbox').addEventListener('click', () => {
  closeLightbox();
});