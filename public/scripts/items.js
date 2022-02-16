$(() => {

  console.log("Ready");

  // Change heart colour when favourited and submit favourite
  $(".favHeart").one("dblclick", function() {
    this.submit();
    $(".fa-heart").addClass("favourited");
  });

  $(".delete-fav").on("click", function() {
    this.submit();
  });

  $("favHeart").on("dblclick", function(event) {
    event.presentDefault();
  })


});




