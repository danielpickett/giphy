$("#search-input").focus();

var query;
var result;
var offset = 0;
var queryUrl; 

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
  
  var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=z2aAdK0B5G97BdECKFeHRER9OBWFlcNb&limit=30&offset=" + offset);
  xhr.done(function(data) { 
    
    console.log("success got data", data);
    for (item of data.data) {
      
      $('#output').append('<div class="img-wrapper"><img width="' + item.images.fixed_height_downsampled.width + '" height="' + item.images.fixed_height_downsampled.height + '" src="' + item.images.fixed_height_downsampled.url + '"></div>');
    }
    $('#load-more').show();
    offset = offset + 30;
  });
}