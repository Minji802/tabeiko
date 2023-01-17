/*Index Page */
var isFirstPage = true;
//headerとfooter
$(window).on("load", function () {
  $("header").load("header.html");
  $("footer").load("footer.html");
});

$(function () {
  getUserLocation();
  slider();
  search_restaurant();
});

function setMainShops(latlng) {
  let url =
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=" +
    latlng.lat +
    "&lng=" +
    latlng.lng +
    "&format=jsonp&callback=successCall&count=5&range=1";
  doAjax(url, 1); // url, startNum
}

// bxslider
function slider() {
  $(".bxslider").bxSlider({
    auto: true, // イメージ回転
    speed: 500, // 次のイメージに変わるのにかかる時間
    pause: 4000, // 一つのイメージが止まって見せる時間
    mode: "fade", // イメージが変わる方式
  });
}
