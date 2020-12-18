// Run the function when the search button is clicked
$('#searchBtn').on('click', function (event) {
    event.preventDefault();

    let searchInput = $('#search-input').val().trim();

    // Exit the function if the search input is empty
    if (searchInput === '') {
        return;
    }

    console.log(searchInput);
})