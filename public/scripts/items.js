$(document).ready(function () {

  console.log("Ready");

  // Change heart colour when favourited and submit favourite
  // TODO Need to be restrict favouriting to 1 time and unfavourite
  $(".favHeart").on("click", function() {
    this.submit();
    $(".fa-heart").toggleClass("favourited");
  });



  });




