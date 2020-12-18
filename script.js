// Run the function when the search button is clicked
$('#searchBtn').on('click', function (event) {
    event.preventDefault();

    // Variables
    let searchInput = $('#search-input').val().trim();

    // Exit the function if the search input is empty
    if (searchInput === '') {
        return;
    }

    console.log(searchInput);

    // API Variables
    let APIKey = '60cfc48a630f93872e74e6d14339f9ce';
    let queryURL = 'https://api.edamam.com/search?q=' + searchInput + '&app_id=cc3b021a&app_key=' + APIKey;

    // AJAX call to retrieve recipe data
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (recipeData) {
        console.log(recipeData);
    })
})