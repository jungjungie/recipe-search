// Run the function when the search button is clicked
$('#searchBtn').on('click', function (event) {
    event.preventDefault();

    // HTML Variables
    let searchInput = $('#search-input').val().trim();
    let healthSelections = $('.health-selections');
    let healthSelectionsArr = [];

    for (let i=0; i < healthSelections.length; i++) {
        if (healthSelections[i].checked) {
            healthSelectionsArr.push(healthSelections[i].value);
        }
    }

    console.log(healthSelectionsArr);

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
        // console.log(recipeData);

        let recipe = recipeData.hits;
        console.log(recipe);

        let recipeName = recipe[i].label;
        let image = recipe[i].image;
        let yield = recipe[i].yield;
        let cookTime = recipe[i].totalTime;
        let ingredients = recipe[i].ingredients;
        let directions = recipe[i].url

    })
})