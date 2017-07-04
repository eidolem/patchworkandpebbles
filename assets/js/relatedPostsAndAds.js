   // In order to grab random posts with the same tags as this post:

        function getTagsRelatedPostsTags(data) {
            var result = data.posts[0].tags;
            var tags = [];
            $(result).each(function(i, tag) {
                tags.push(tag.slug);
            });
            getRelatedPosts(tags);
            populateSidebarAd(tags);
            populateBottomBannerAd(tags);
        }

        function getRelatedPosts(tags) {
            $.get(
                ghost.url.api('posts', {limit: 'all', filter: "tags:[" + tags.join(',') + "]+id:-{{id}}"})
            ).done(renderRelatedPosts)
        }
 
        function renderRelatedPosts(data) {
            // list-of-posts is on related-posts-card
            var result = $('#list-of-posts');
            // Randomize array
            var sortedPosts = shuffleArray(data.posts);
            // If there's less than 6 posts with this tag, only take the total number of posts 
            if ( sortedPosts.length < 6){
                var displayPosts = sortedPosts.slice(0, sortedPosts.length);
            }
            // Else pull max 6
            else {
                var displayPosts = sortedPosts.slice(0, 6);
            }

            // Insert at bottom of post list
            $.each(displayPosts, function (i, post) {
                result.append(
                    '<div class="row post">'
                        + '<a href="' + post.url + '" class="valign-wrapper">'
                        + '<div class="image col s4 m4 l4" style="background-image: url(' + post.image + ')"></div>'
                        + '<div class="title col s8 m8 l8">' + post.title + '</div>'
                        + '</a></div>'
                );
            });

            // list-of-posts-wide is on related-posts-card-wide
            var result2 = $('#list-of-posts-wide');
            // If there's less than 6 posts with this tag, only pull the total number
            if ( sortedPosts.length < 6){
                var displayPosts2 = sortedPosts.slice(0, sortedPosts.length);
            }
            // Else pull max 6, but don't take the same 6 as was in the sidebar related posts card
            else {
                var displayPosts2 = sortedPosts.slice(7, 13);
            }
            // Insert at end of post list
            $.each(displayPosts2, function (i, post) {
                result2.append(
                        '<a href="' + post.url + '" class="post col m2 l2">'
                        + '<div class="image" style="background-image: url(' + post.image + ')"></div>'
                        + '<div class="title">' + post.title + '</div>'
                        + '</a>'
                );
            });
        }

        // Function to randomize an array
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }


        function populateSidebarAd(tags) {
            var channel = 'generic';
            switch(tags[0]) {
                case 'sewing':
                    channel = '3320972548';
                    break;
                case 'career-gender-equality':
                    channel = '6274438942';
                    break;
                case 'sports':
                    channel = '9227905344';
                    break;
                case 'travel':
                    channel = '6414039748';
                    break;
                case 'climbing':
                    channel = '9367506147';
                    break;
                case 'diy-projects':
                    channel = '3181371748';
                    break;
                default: 
                    channel = 'generic';
            }

            var adUnit = $('#my-google-ads');
            adUnit.html(
                '<ins class="adsbygoogle"'
                + 'style="display:block"'
                + 'data-ad-client="ca-pub-2599762387787801"'
                + 'data-ad-slot' + channel
                + 'data-ad-format="auto"></ins>'
            );

            //(adsbygoogle = window.adsbygoogle || []).push({});


        }

        function populateBottomBannerAd(tags) {

        }

     