/* レビュー投稿 */
function showReviewPage() {
  window.open("review-page.html", "popup", "width=500,height=500");
}

function reviewUpdate() {
  alert("レビュー投稿機能は準備中です。少々お待ちください。");
  window.close("review-page.html");
}

/* Star Point*/
const drawStar = (target) => {
  document.querySelector(`.star span`).style.width = `${target.value * 10}%`;
};

// star pointクリックすると、点数表出
function setStarVal(valInput) {
  let starInput = valInput;
  $("#starVal").text(starInput.value / 2);
}
