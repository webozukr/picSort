function showFullScr(imgId) {
    var newsrc = imgId.getAttribute('src');
    var fromPos = newsrc.indexOf("=");
    document.getElementsByClassName('fullscr')[0].classList.remove('invisible-blk');
    newsrc = (newsrc === "img/empty.jpg") ? "img/sorry.jpg" : "https://unsplash.it/1280?image=" + newsrc.slice(fromPos + 1);
    document.getElementById('imgFullScr').setAttribute('src', newsrc);
}
function closePic() {
    document.getElementsByClassName('fullscr')[0].classList.add('invisible-blk');
}
