el_curPage.innerHTML = curPage;

function incrPage() {
    if (data.filterVal === 'large' && largePicCount > 0) {
        curPage++;
        if (curPage >= amountPages) {
            curPage = amountPages;
        }
        setCurPage();
        setPictures();
    }
    if (data.filterVal === 'medium' && mediumPicCount > 0) {
        curPage++;
        if (curPage >= amountPages) {
            curPage = amountPages;
        }
        setCurPage();
        setPictures();
    }
    if (data.filterVal === 'small' && smallPicCount > 0) {
        curPage++;
        if (curPage >= amountPages) {
            curPage = amountPages;
        }
        setCurPage();
        setPictures();
    }
}

function decrPage() {
    if (data.filterVal === 'large' && largePicCount > 0) {
        curPage--;
        if (curPage <= 1) {
            curPage = 1;
        }
        setCurPage();
        setPictures();
    }
    if (data.filterVal === 'medium' && mediumPicCount > 0) {
        curPage--;
        if (curPage <= 1) {
            curPage = 1;
        }
        setCurPage();
        setPictures();
    }
    if (data.filterVal === 'small' && smallPicCount > 0) {
        curPage--;
        if (curPage <= 1) {
            curPage = 1;
        }
        setCurPage();
        setPictures();
    }
}

function setCurPage() {
    el_curPage.innerHTML = curPage;
    fromPage = curPage * 20 - 20;
    toPage = curPage * 20;    
}
