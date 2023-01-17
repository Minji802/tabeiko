/*List Page */

/* headerとfooter */
$(window).on("load", function () {
  $("header").load("header.html");
  $("footer").load("footer.html");
});

$(function () {
  changeVal = true;
  setTimeout(function () {
    let urlParams = new URLSearchParams(window.location.search);
    let lat = urlParams.get("lat");
    let lng = urlParams.get("lng");
    let range = urlParams.get("range");
    let card = urlParams.get("card");
    let child = urlParams.get("child");
    let pet = urlParams.get("pet");
    let parking = urlParams.get("parking");
    $("#range").val(range);

    $("#range2").val(range).prop("selected", true);
    let url =
      "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=" +
      lat +
      "&lng=" +
      lng +
      "&format=jsonp" +
      "&callback=successCall&count=100&card=" +
      card +
      "&child=" +
      child +
      "&pet=" +
      pet +
      "&parking=" +
      parking +
      "&range=" +
      range;
    doAjax(url, 1);
  }, 100);

  search_restaurant();
});

// tab menu
function tabMenu() {
  $("ul.tabs li").click(function () {
    var tab_id = $(this).attr("data-tab");

    $("ul.tabs li").removeClass("current");
    $(".tab-content").removeClass("current");

    $(this).removeClass("bookmark");
    $(this).addClass("current");
    $("." + tab_id).addClass("current");
  });
}

// shop bookmark　機能
function favoriteShop(obj) {
  $(obj).css("color", "#ff5c5d");

  alert("ブックマーク機能は準備中です。少々お待ちください。");
}

// filter search　機能
function filterSearch() {
  $(".search-button").trigger("click");
}
