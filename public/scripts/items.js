$(document).ready(function () {

  console.log("Ready");

  // Change heart colour when favourited and submit favourite
  $(".favHeart").one("dblclick", function() {
    this.submit();
    $(".fa-heart").addClass("favourited");
  });



});




