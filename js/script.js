
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    // YOUR CODE GOES HERE!
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;
    $greeting.text('So, you want to live at '+address+'?');
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address;
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    var nytUrl = "";
    $.getJSON(nytUrl, function(data) {
      $nytHeaderElem.text('New York Times articles about '+cityStr);
      articles = data.response.docs;
      for (i = 0; i<articles.length ;i++){
        var article = articles[i];
        $nytElem.append('<li class="article">'+'<a href="+article.web_url+">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
      };
    }).error(function(e){
      $nytHeaderElem.text('Page could not be loaded');
    })

    return false;
};

$('#form-container').submit(loadData);
