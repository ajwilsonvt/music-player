import list from './LinkedList.js';
// var list exists
// https://stackoverflow.com/questions/43551210/how-do-i-pass-constructor-parameters-to-imported-class-in-ecmascript-6

var audios = null;
var previousSong = 0;
var currentSong = 0;

$(function() {
  
  /**
   * Search for song
   */
  $('#search').on('submit', function(e) {
    e.preventDefault();

    $('#add').empty();
    resetAudio();
    
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
        <h3>Playlist</h3>
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

  /**
   * Add to playlist
   */
  $('#add').on('submit', function(e) {
    e.preventDefault();

    resetAudio();

    var $songs = $('input:checked').parent();
    var songs = jQuery.makeArray($songs);
    console.log(songs);
    songs.forEach(function(el) {
      list.prepend(el);
    });

    $('#add').empty();
    $('#add').append(`
        <h3>Playlist</h3>
      `);
    for (let i = 0; i < list.size; i++) {
      $('#add').append(list.get(i));
    }
    $('input:checked').css('visibility','hidden');

    console.log(list);
  });

  /**
   * Music player controls
   */
  
  // play button
  $('#play').on('click', function() {
    if (audios) {
      audios[currentSong].play();
    } else {
      playFirst();
    }
  });

  // previous button
  $('#previous').on('click', function() {
    if (currentSong === 0) return;
    changeSong(-1);
  });

  // next button
  $('#next').on('click', function() {
    if (audios && currentSong === audios.length - 1) return;
    changeSong(1);
  });

  // stop button
  $('#stop').on('click', function() {
    audios[currentSong].pause();
    audios[currentSong].currentTime = 0;
  });

  function playFirst() {
    var $audios = $('audio');
    audios = $audios;
    audios[0].play();
    currentSong = 0;
  }

  function changeSong(val) {
    previousSong = currentSong;
    currentSong += val;
    console.log('previous', previousSong);
    console.log('current', currentSong);

    if (audios) {
      audios[previousSong].pause();
      audios[previousSong].currentTime = 0;
      audios[currentSong].play();
    } else {
      playFirst();
    }
  }

  function resetAudio() {
    if (audios) {
      console.log('resetting', audios);

      for (let i = 0; i < audios.length; i++) {
        audios[i].pause();
        audios[i].currentTime = 0;
      }
    }

    audios = null;
    previousSong = 0;
    currentSong = 0;
  }

});
