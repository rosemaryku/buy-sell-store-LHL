$(() => {

  console.log("Ready");

  $(".favHeart").one("click", function() {
    this.submit();
    $(".fa-heart").addClass("favourited");
  });

  $(".delete-fav").on("click", function() {
    this.submit();
  });


  $(".nav-logout").on("click", function() {
    console.log("logging out");
    req.session["user_id"] = null;
  });


});




