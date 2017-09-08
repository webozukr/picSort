function filter_size_select(elem_id) {
    var elems = document.getElementsByClassName('filter-size-item');
    for (var i = 0; i < elems.length; i++) {
        elems[i].getElementsByTagName('span')[0].style.color = "transparent";
    }
    elem_id.getElementsByTagName('span')[0].style.color = "#000";

    if (serverOk === true) {
        largePicCount = 0;
        mediumPicCount = 0;
        smallPicCount = 0;
        largePic = [];
        mediumPic = [];
        smallPic = [];
        for (var i = 0; i < allData.length; i++) {
            if (allData[i].width >= 1500) {
                largePicCount = largePicCount + 1;
                largePic.push(allData[i]);

            }
            if (allData[i].width >= 800 && allData[i].width <= 1499) {
                mediumPicCount = mediumPicCount + 1;
                mediumPic.push(allData[i]);
            }
            if (allData[i].width <= 799) {
                smallPicCount = smallPicCount + 1;
                smallPic.push(allData[i]);
            }
        }
    }
    data = elem_id.dataset;
    curPage = 1;
    setCurPage();
    setPictures();
}

function setPictures() {
    el_curPage.innerHTML = curPage;
    clearList();
    if (data.filterVal === 'large' && serverOk === true) {
        if (largePicCount > 0) {
            var src = "";
            objAuthors = {};
            amountPages = (largePicCount % 20) ? Math.ceil(largePicCount / 20) : largePicCount / 20;
            for (var i = fromPage; i < toPage; i++) {
                src = (i < largePic.length) ? "https://unsplash.it/150?image=" + largePic[i].id : "img/empty.jpg";
                prevPic[i - fromPage].setAttribute("src", src);
                if (i < largePic.length) {
                    objAuthors[largePic[i].author] = "true";
                }
            }
            updateList();
        }
    }
    if (data.filterVal === 'medium' && serverOk === true) {
        if (mediumPicCount > 0) {
            var src = "";
            objAuthors = {};
            amountPages = (mediumPicCount % 20) ? Math.ceil(mediumPicCount / 20) : mediumPicCount / 20;
            for (var i = fromPage; i < toPage; i++) {
                src = (i < mediumPic.length) ? "https://unsplash.it/150?image=" + mediumPic[i].id : "img/empty.jpg";
                prevPic[i - fromPage].setAttribute("src", src);
                if (i < mediumPic.length) {
                    objAuthors[mediumPic[i].author] = "true";
                }
            }
            updateList();
        }
    }
    if (data.filterVal === 'small' && serverOk === true) {
        if (smallPicCount > 0) {
            var src = "";
            objAuthors = {};
            amountPages = (smallPicCount % 20) ? Math.ceil(smallPicCount / 20) : smallPicCount / 20;
            for (var i = fromPage; i < toPage; i++) {
                src = (i < smallPic.length) ? "https://unsplash.it/150?image=" + smallPic[i].id : "img/empty.jpg";
                prevPic[i - fromPage].setAttribute("src", src);
                if (i < smallPic.length) {
                    objAuthors[smallPic[i].author] = "true";
                }
            }
            updateList();
        }
    }
}

function updateList() {
    for (var i = 0; i < Object.keys(objAuthors).length; i++) {
        newAuthor = document.createElement('li');
        newAuthor.innerHTML = Object.keys(objAuthors)[i];
        document.getElementsByClassName('filter-author')[0].appendChild(newAuthor);
    }
}

function clearList() {
    var list = document.getElementsByClassName('filter-author')[0];
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}
