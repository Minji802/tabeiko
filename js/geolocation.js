// 東京駅
// lat=35.680930
// lng=139.766863

var latlng;
function getUserLocation() {
  // Geolocation APIにアクセスできるかどうかを確認
  if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition() - ユーザーの現在地をリクエスト
    navigator.geolocation.getCurrentPosition(function (pos) {
      $("#latitude").html(pos.coords.latitude); // latitude
      $("#longitude").html(pos.coords.longitude); // longitude
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;

      latlng = { lat: lat, lng: lng }; // real one
      // latlng = { lat: 35.68093, lng: 139.766863 }; // set Tokyo for testing

      setMainShops(latlng);
    });
  } else {
    alert("このブラウザではGeolocationができません");
  }
}
