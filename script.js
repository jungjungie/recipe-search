// Run the function when the search button is clicked
$('#searchBtn').on('click', function (event) {
    event.preventDefault();

    // HTML Variables
    let searchInput = $('#search-input').val().trim();
    let healthSelections = $('.health-selections');
    let healthSelectionsArr = [];

    for (let i = 0; i < healthSelections.length; i++) {
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

        // Loop through the data and create a new recipe card for each recipe
        for (let i = 0; i < recipe.length; i++) {
            let ingredientsArr = recipe[i].recipe.ingredients;

            // Create new divs
            let recipeCardDiv = $("<div>");
            let infoDiv = $("<div>");
            let ingredientsDiv = $("<div>");
            let instructionsDiv = $("<div>");

            // Set classes for new divs
            recipeCardDiv.attr("class", "card col-12 col-md-5 col-lg-3");
            infoDiv.attr("class", "card-body");
            ingredientsDiv.attr("class", "card-body pt-0");
            instructionsDiv.attr("class", "card-body d-flex justify-content-center align-items-center p-0");

            // Create image for recipe
            let recipeImage = $("<img>").attr("src", recipe[i].recipe.image);
            recipeImage.attr("class", "card-img-top");

            recipeCardDiv.append(recipeImage, infoDiv, ingredientsDiv, instructionsDiv);

            // Create new elements for recipe information
            let recipeName = $("<h5>").attr("class", "card-title").text(recipe[i].recipe.label);
            let cookTime = $("<p>").attr("class", "card-text m-0").text("Cook Time: " + recipe[i].recipe.totalTime);
            let cookYield = $("<p>").attr("class", "card-text").text("Yield: " + recipe[i].recipe.yield);
            let healthOptions = $("<p>");

            // Create a health-icon and append it to the healthOptions
            let healthOptionsIcon = $("<i>").attr("class", "fa fa-leaf health-icons");
            healthOptions.attr("aria-hidden", "true");
            healthOptions.append(healthOptionsIcon);

            let healthLabels = recipe[i].recipe.healthLabels;

            healthOptions.append(healthLabels.join(", "));

            // Append recipe information to the infoDiv
            infoDiv.append(recipeName, cookTime, cookYield, healthOptions);

            // Create unordered lists for ingredients and append to the ingredientsDiv
            let ingredientsTitle = $("<p>").attr("class", "card-text strong m-0").text("Ingredients:");
            let ingredientsUL = $("<ul>");

            for (let i = 0; i < ingredientsArr.length; i++) {
                ingredientsUL.append($("<li>").text(ingredientsArr[i].text));
            }

            ingredientsDiv.append(ingredientsTitle, ingredientsUL);

            // Create new button linking to cooking instructions and append it to the instructionsDiv
            let instructionsBtn = $("<a>").attr("href", recipe[i].recipe.url).text("Instructions");
            instructionsBtn.attr("class", "btn instructions-btns mb-5");
            instructionsBtn.attr("target", "_blank");
            instructionsDiv.append(instructionsBtn);

            // Append the new recipe card to the #search-results section
            $("#search-results").append(recipeCardDiv);
        }
    })
})

// Left to do:
// Clear search box after each search
// Empty div when new search starts
// Change recipe card columns to go to max of 3 cards per row
// Edit styling for spacing within recipe cards
// Add functionality to filters for health options