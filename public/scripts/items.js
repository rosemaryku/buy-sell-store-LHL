$(document).ready(function () {

  console.log("Ready");

  // Change heart colour when favourited
  $(".fa-heart").on("click", () => {
    $(".fa-heart").toggleClass("favourited");
  });


  });


