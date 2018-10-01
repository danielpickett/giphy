$("#search-input").focus();

let query;
let result;
let offset = 0;

document.getElementById('search-input').addEventListener('keyup', function(event){
  event.preventDefault();
  if ( event.keyCode === 13 ) {
    query = document.getElementById('search-input').value;
    query = query.split(' ').join('+');
    console.log(query);
    getGifs();
    $('#output').html('');
  }
});


function getGifs(){
  let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=z2aAdK0B5G97BdECKFeHRER9OBWFlcNb&limit=30&sort=relevant&offset=" + offset;
  console.log(queryUrl);

  var xhr = $.get(queryUrl);
  xhr.done(function(data) { 
    
    console.log(data);
    for (item of data.data) {
      let html = '<div class="img-wrapper"><img width="' + item.images.fixed_height.width + '" height="' + item.images.fixed_height.height + '" src="' + item.images.fixed_height.url + '">';
      if (item.images.original.height > (parseInt(item.images.fixed_height.height) + parseInt(15))) {
        //console.log(item.images.original.height + ' > ' + (parseInt(item.images.fixed_height.height) + parseInt(15)));
        html = html + '<span onclick="openLightbox(\'' + item.images.original.url + '\', \'' + item.images.original.width + '\', \'' + item.images.original.height + '\');">+</span>';
      }
      
      html = html + '</div>';

      $('#output').append(html);
      
    }
    $('#load-more').show();
    offset = offset + 30;
  });
}

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

