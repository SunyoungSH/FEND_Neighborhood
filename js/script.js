
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

    var nytUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityStr+'&sort=newest&api-key=8d8b437dc9e94dc2a9d342a548c2b517';
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

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+cityStr+'&format=json&callback=wikiCallback';
    $.ajax({
      url: wikiUrl,
      data: queryData,
      dataType: 'jsonp',
      done: function(data){
        var articleList = data[1];
        for(i = 0; i<articleList.length; i++){
        articleStr = articleList[i];
        var url='http://en.wikipedia.org/wiki/'+articleStr;
        $wikiElem.append('<li><a href="+url+">'+articleStr+'</a></li>');
      }
      }
    })
    return false;
};

$('#form-container').submit(loadData);
