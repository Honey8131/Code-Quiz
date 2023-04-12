document.addEventListener("DOMContentLoaded", function () {
    const highScoresText = document.querySelector('#high-scores');
    let highScoresTag = '';

Object.keys(localStorage).forEach((key) => {
    const data = localStorage.getItem(key);
    const highScoreData = JSON.parse(data);
    highScoresTag = highScoresTag.concat('</br><div id="high-scores">' + highScoreData.initials + " "+"-"+" " + highScoreData.score +'</div>');
});

    highScoresText.innerHTML = highScoresTag;
});
