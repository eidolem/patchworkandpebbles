// In order to grab random posts with the same tags as this post:

//1. Make an array with the tags from this post (passed in thru data)
function getTagsRelatedPostsTags(data) {
    var result = data.posts[0].tags;
    var tags = [];
    $(result).each(function(i, tag) {
        tags.push(tag.slug);
    });
    getRelatedPosts(tags);
}

//2. Get all posts with any of these tags
function getRelatedPosts(tags) {
    $.get(
        ghost.url.api('posts', {limit: 'all', filter: "tags:[" + tags.join(',') + "]+id:-{{id}}"})
    ).done(renderRelatedPosts)
}

//3. Pull random posts from list and append markup to where #list-of-posts
function renderRelatedPosts(data) { 
    var result = $('#list-of-posts');
    // Randomize array
    var sortedPosts = shuffleArray(data.posts);
    // If there's less than 6 posts with this tag, only take the total number of posts 
    if ( sortedPosts.length <= 6){
        var displayPosts = sortedPosts.slice(0, sortedPosts.length);
    }
    // Else pull max 6
    else {
        var displayPosts = sortedPosts.slice(0, 6);
    }

    $.each(displayPosts, function (i, post) {
        result.append(
            '<a href="' + post.url + '" class="related-post">'
                + '<div class="related-post-image" style="background-image: url(' + post.image + ')"></div>'
                + '<div class="related-post-title">' + post.title + '</div>'
                + '</a></div>'
        );
    });

    // list-of-posts-wide is on related-posts-card-wide
    var result2 = $('#list-of-posts-wide');
    // If there's less than 6 posts with this tag, only pull the total number
    if ( sortedPosts.length <= 6){
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

     