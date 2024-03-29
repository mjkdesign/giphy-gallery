// BUTTON ARRAY VARIABLE
// ---------------------------------------------------------------

var buttons = ["penguin", "goose", "raven", "tortoise"];


// RENDER BUTTONS
// ---------------------------------------------------------------

function renderButtons() {

    $("#buttons-view").empty();

    for ( var i = 0; i < buttons.length; i++) {
        var newBtn = $("<button>");
        newBtn.text(buttons[i]);
        newBtn.attr("class", "animalBtn btn btn-primary mr-2 mt-2");
        newBtn.attr("data-animalname", buttons[i]);
        $("#buttons-view").append(newBtn);
    }

}

// AJAX CALL + DISPLAY GIFS 
// ---------------------------------------------------------------

$(document).on("click", ".animalBtn", function(event) {
    // alert("clicked");
    // console.log(this);

    $(".giphy-view").empty();

    var animalNam = $(this).attr("data-animalname");
    // console.log(animalNam);

    var apiKey = "LzvJf5Qsthm2cMqcRRI7z4TRzFQmdQUP";

    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + apiKey + "&tag=" + animalNam;

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalNam + "&api_key=" + apiKey + "&limit=10";



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response);
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
            img.attr("data-state", "still");
            img.attr("class", "gif mb-5");

            gifDiv.append(p);
            gifDiv.append(img);

            $(".giphy-view").prepend(gifDiv);
        }

    })
});

// ADD BUTTONS
// ---------------------------------------------------------------

$("#add-button").on("click", function(event){

    event.preventDefault();

    var userAnimal = $("#animal-input").val();
    // console.log(userAnimal);
    buttons.push(userAnimal);

    renderButtons();

    $("#animal-input").val('');

    // Found this on stackoverflow, ended up finding the right thing above 
    // $('#animal-input').focus(function(){
    //     $(this).val('');
    //   });
    
});


// START + STOP GIFS
// ---------------------------------------------------------------

$(document).on("click", ".gif", function(event) {
    console.log("clicked");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

renderButtons();