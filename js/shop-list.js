/*店舗一覧 */

// 東京駅
// lat=35.680930
// lng=139.766863

let dataSet = [];
let changeVal = false; // indexとlist-pageを分ける
let rangeM = [0, 300, 500, 1000, 2000, 3000]; // range 0, 1, 2, 3, 4, 5
var isFirstPage = false;
function search_restaurant() {
  // when the button clicked
  $(".search-button").click(function () {
    let range = $("#range2 option:selected").val(); //選択されたoptionのvalueを読み込む
    let lat; // latitude
    let lng; // longitude
    if (latlng == undefined) {
      let urlParams = new URLSearchParams(window.location.search);
      lat = urlParams.get("lat");
      lng = urlParams.get("lng");
    } else {
      lat = latlng.lat;
      lng = latlng.lng;
    }

    let startNum = 1;

    // 詳細条件
    let card = $('input:checkbox[id="card_check"]').is(":checked") ? 1 : 0; // カード決済
    let child = $('input:checkbox[id="child_check"]').is(":checked") ? 1 : 0; // 子供連れ
    let pet = $('input:checkbox[id="pet_check"]').is(":checked") ? 1 : 0; // ペット連れ
    let parking = $('input:checkbox[id="parking_check"]').is(":checked")
      ? 1
      : 0; // 駐車空間

    window.close();

    let openUrl = `list-page.html?lat=${lat}&lng=${lng}&range=${range}&card=${card}&child=${child}&pet=${pet}&parking=${parking}`;
    window.open(openUrl);
  });
}

function doAjax(url, startNum) {
  $.ajax({
    url: url,
    async: false, //同期通信
    data: {
      start: startNum,
    },
    dataType: "jsonp",
  });
}

// result of getting restaurant
function successCall(data) {
  let shops = data.results.shop;
  let cnt = data.results.results_available;
  dataSet.push.apply(dataSet, shops);

  if (changeVal) {
    /* list-page.htmlで見せる*/
    let urlParams = new URLSearchParams(window.location.search);
    let lat = urlParams.get("lat");
    let lng = urlParams.get("lng");
    let card = urlParams.get("card");
    let child = urlParams.get("child");
    let pet = urlParams.get("pet");
    let parking = urlParams.get("parking");
    let range = $("#range").val();

    let startNum = parseInt($("#startNum").text()) + 100; // 1 ~ 100, 101 ~ 200, 201 ~ 300, .... 100以上　全ての情報を呼び出す
    let url =
      "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=" +
      lat +
      "&lng=" +
      lng +
      "&format=jsonp" +
      "&callback=successCall&count=100" +
      "&card=" +
      card +
      "&child=" +
      child +
      "&pet=" +
      pet +
      "&parking=" +
      parking +
      "&range=" +
      range;

    $("#startNum").text(startNum);

    // データパースの進行度を表す
    if (parseInt((startNum / cnt) * 100) < 100) {
      $("#loading").text("Loading..." + parseInt((startNum / cnt) * 100) + "%");
      $("#total").text(
        rangeM[range] + "m 以内に" + cnt + "個の飲食店が見つかりました。"
      );
    }

    // startNumがデータの総個数(results_available)を超えないように
    if (parseInt(startNum / 100) != parseInt(cnt / 100) + 1) {
      doAjax(url, startNum);
    } else {
      pagination(dataSet);
      $("#loading").text("Loading...100%");
      $("#total").text(
        rangeM[range] + "m 以内に" + cnt + "個の飲食店が見つかりました。"
      );
      return;
    }
  } else {
    /*index.htmlの近いレストラン紹介の部分*/
    let content = "";
    if (shops != undefined) {
      $.each(shops, function (i, s) {
        let shopObj = JSON.stringify(s);
        content = `<div class="shop-info" onclick='shopDetail(${shopObj});'>
   <div class="shop-img"><img src="${s.photo.pc.l}"></div>
  <div class="shop-title">${s.name}</div>
  </div>`;
        $("#search-list").append(content);
      });
      $("#search-list").css("display", "flex");
      $("#search-list").css("flex-wrap", "wrap");
      $("#search-list").css("justify-content", "center");
    }
  }
}

/* list-page.html & ページング処理*/
function pagination(data) {
  let list = $("#pagination");
  list.pagination({
    dataSource: data,
    callback: function (data, pagination) {
      let dataHtml = "";
      if (data.length != 0) {
        dataHtml = `<div class="search-result-page">
        <div class="container">
          <!-- tab menu 上段始まり -->
          <ul class="tabs">
          <li class="tab-link current" data-tab="tab-1" onclick="tabMenu()"><strong>近い順</strong></li>
          <li class="tab-link" data-tab="tab-2" onclick="tabMenu()"><strong>評価順</strong></li>
          <li class="tab-link" data-tab="tab-3" onclick="tabMenu()"><strong>投稿順</strong></li>
          </ul>
          <!-- tab menu 上段終わり -->`;

        $.each(data, function (i, s) {
          let shopObj = JSON.stringify(s);
          dataHtml += `
          <!-- tab menu 内容始まり -->
          <div class="tab-content current tab-1">
          <div class="bookmark"><button id="bookmark-btn" class="bookmark-btn-class" onclick="favoriteShop(this);">★</button></div>
            <div class='shop-list' onclick='shopDetail(${shopObj});'>
              <div class="shop-img"><img src="${s.photo.pc.l}"></div>
              <div class="textBox">
                <div class="shop-title">${s.name}</div>
                <div class="shop-info">
                  <div class="shop-access">${s.access}</div>
                  <hr />
                  <div class="shop-intro">
                    ~${s.catch}~
                  </div>
                  <table class="list-shop-table">
                    <tr class="shop-adress">
                      <td class="list-shop-table-title"><strong>住所</strong></td>
                      <td>${s.address}</td>
                    </tr>
                    <tr class="shop-budget">
                      <td class="list-shop-table-title"><strong>予算</strong></td>
                      <td>${s.budget.name}</td>
                    </tr>
                    <tr class="shop-card">
                      <td class="list-shop-table-title"><strong>カード決済</strong></td>
                      <td>${s.card}</td>
                    </tr>
                  </table>
                  <div class="shop-starPoint">★★★★☆ ( ? / 5.0)</div>
                  <div class="shop-reviewCount">レビュー   <strong>0</strong>件</div>
                </div>
              </div>
            </div>
          </div>`;
        });

        dataHtml += `<div class="tab-content tab-2">
        <div>評価順はまだ準備中です。少々お待ちください。</div>
      </div>
      <div class="tab-content tab-3">
      <div>投稿順はまだ準備中です。少々お待ちください。</div>
      </div>
      <!-- tab menu 内容終わり --></div></div>`;
        $("#search-list").html(dataHtml);
      }
    },
  });
}
