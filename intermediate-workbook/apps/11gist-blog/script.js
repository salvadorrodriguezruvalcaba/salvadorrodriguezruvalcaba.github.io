'use strict';

$(document).ready(function() {

    // You code here
    // "https://api.github.com/users/salvadorrodriguezruvalcaba/gists"
    // 'http://localhost:8080/apps/11gist-blog/api/gists.json'
    $.ajax("https://api.github.com/users/salvadorrodriguezruvalcaba/gists", {
      success: function(objects) {

        console.log(objects);
        objects.forEach(function(gist){

          if ( gist.description.indexOf("#post") === 0 ) {
              var $li = $('<li><a>'+gist.description.slice(5)+'</a></li>');
              $('#posts').append($li);

              var url = gist.url;
              $li.find("a").attr("href", "#");
              $li.find("a").attr("data-url", url);
          };

        }) // for each

      $("li > a").on("click", function(event) {
              event.preventDefault();
              // $.data('url')
              var url =  $(this).data('url');

              $.ajax(url, {
               success: function(post) {

                 var $content = $('<li style="list-style-type:none">'+marked(post.files['post.md'].content)+'</li>');
                //  $('#post').append($content);
                 $('div#post').html($content);

                 var comments_url = post.comments_url;

                 $('ul#comments').html(null);

                 $.ajax(comments_url, {
                   success: function(comment_returned) {

                      comment_returned.forEach(function(comment){
                          // console.log(comment.user.login);
                           var $liUser = $('<li>'+comment.user.login+'</li>');
                           $('ul#comments').append($liUser);
                      }) // for each

                     }  // success
                   });  // Ajax users

               }     // success
              } ) ;  // Ajax


        } ); // Click


      }  // success
    });  // Ajax users

});
