import list from './LinkedList.js';
// var list exists
// https://stackoverflow.com/questions/43551210/how-do-i-pass-constructor-parameters-to-imported-class-in-ecmascript-6

$(function() {
  
  $('#search').on('submit', function(e) {
    e.preventDefault();
    $('#add').empty();

    var query = $('#query').val();
    console.log('queried', query);

    $.ajax({
      url: 'https://itunes.apple.com/search',
      type: 'GET',
      dataType: 'json',
      data: {
        term: query,
        country: 'US'
      }
    })
    .done(function(res) {
      console.log(res);

      $('#add').append(`
        <input type="submit" value="ADD TO PLAYLIST">
      `);
      var results = res.results;
      results.forEach(function(el, i) {
        $('#add').append(`
          <div class="result">
            <input type="checkbox" name="id" value="${i}">
            <img class="section" src="${el.artworkUrl100}">
            <div class="section">
              <p>name: ${el.artistName}</p>
              <p>title: ${el.trackCensoredName}</p>
              <p>genre: ${el.primaryGenreName}</p>
              <audio controls>
                <source src="${el.previewUrl}">
              </audio>
            </div>
          </div>
        `);
      });
    })
    .fail(function(err) {
      console.log(err);
    });
  });

  $('#add').on('submit', function(e) {
    e.preventDefault();

    var $songs = $('input:checked').parent();
    var songs = jQuery.makeArray($songs);
    console.log(songs);
    songs.forEach(function(el) {
      list.append(el);
    });

    $('#add').empty();
    for (let i = 0; i < list.size; i++) {
      $('#add').append(list.get(i));
    }
    $('input:checked').css('visibility','hidden');
  });

});
