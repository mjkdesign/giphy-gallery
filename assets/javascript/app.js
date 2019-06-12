var buttons = ["penguin", "goose", "raven", "tortoise"];



// creates new buttons and assigns them a class and custom data time
function renderButtons() {

    $("#buttons-view").empty();

    for ( var i = 0; i < buttons.length; i++) {
        var newBtn = $("<button>");
        newBtn.text(buttons[i]);
        newBtn.attr("class", "animalBtn");
        newBtn.attr("data-animalname", buttons[i]);
        $("#buttons-view").append(newBtn);
    }

}

// on click event that adds gifs
$(document).on("click", ".animalBtn", function(event) {
    // alert("clicked");
    // console.log(this);

    $(".giphy-view").empty();

    var animalNam = $(this).attr("data-animalname");
    console.log(animalNam);

    var apiKey = "LzvJf5Qsthm2cMqcRRI7z4TRzFQmdQUP";

    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + apiKey + "&tag=" + animalNam;

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalNam + "&api_key=" + apiKey + "&limit=10";



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        // console.log(response.data.fixed_width_small_still_url);
        // console.log(response.data.fixed_width_small_url);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            
            var gifDiv = $("<div>")
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var img = $("<img>");

            img.attr("src", results[i].images.fixed_height_still.url);
            img.attr("data-animate", results[i].images.fixed_height.url);
            img.attr("data-still", results[i].images.fixed_height_still.url);

            gifDiv.append(p);
            gifDiv.append(img);

            $(".giphy-view").prepend(gifDiv);
        }

    })
});

// add new buttons to our array
$("#add-button").on("click", function(event){

    event.preventDefault();

    var userAnimal = $("#animal-input").val();
    console.log(userAnimal);
    buttons.push(userAnimal);

    renderButtons();
})


renderButtons();