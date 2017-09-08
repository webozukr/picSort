var xhr = new XMLHttpRequest();
var serverOk = false;
var allData = [];
var largePic = [];
var mediumPic = [];
var smallPic = [];
var objAuthors={};

var newAuthor="";

var largePicCount = 0;
var mediumPicCount = 0;
var smallPicCount = 0;
var prevPic = document.getElementsByClassName('previewPic');

var curPage = 1;
var amountPages = 0;
var fromPage = 0;
var toPage = 0;
var el_curPage = document.getElementById('cur-page');

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

    xhr.open('GET', 'https://unsplash.it/list', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            serverAnswer();
            serverOk = true;
            console.log("Server Ok");
            var firstClick = document.getElementsByClassName('filter-size-item')[0].click();
        } else {
            serverOk = false;            
        }
    }
function serverAnswer() {
    allData = JSON.parse(xhr.responseText);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF2YXJpYWJsZXMuanMiLCJmaWx0ZXIuanMiLCJmdWxsc2NycGljLmpzIiwicGFnaW5hdGlvbi5qcyIsInNlbmRSZXEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG52YXIgc2VydmVyT2sgPSBmYWxzZTtcclxudmFyIGFsbERhdGEgPSBbXTtcclxudmFyIGxhcmdlUGljID0gW107XHJcbnZhciBtZWRpdW1QaWMgPSBbXTtcclxudmFyIHNtYWxsUGljID0gW107XHJcbnZhciBvYmpBdXRob3JzPXt9O1xyXG5cclxudmFyIG5ld0F1dGhvcj1cIlwiO1xyXG5cclxudmFyIGxhcmdlUGljQ291bnQgPSAwO1xyXG52YXIgbWVkaXVtUGljQ291bnQgPSAwO1xyXG52YXIgc21hbGxQaWNDb3VudCA9IDA7XHJcbnZhciBwcmV2UGljID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJldmlld1BpYycpO1xyXG5cclxudmFyIGN1clBhZ2UgPSAxO1xyXG52YXIgYW1vdW50UGFnZXMgPSAwO1xyXG52YXIgZnJvbVBhZ2UgPSAwO1xyXG52YXIgdG9QYWdlID0gMDtcclxudmFyIGVsX2N1clBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VyLXBhZ2UnKTtcclxuIiwiZnVuY3Rpb24gZmlsdGVyX3NpemVfc2VsZWN0KGVsZW1faWQpIHtcclxuICAgIHZhciBlbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZpbHRlci1zaXplLWl0ZW0nKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBlbGVtc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdLnN0eWxlLmNvbG9yID0gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgZWxlbV9pZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdLnN0eWxlLmNvbG9yID0gXCIjMDAwXCI7XHJcblxyXG4gICAgaWYgKHNlcnZlck9rID09PSB0cnVlKSB7XHJcbiAgICAgICAgbGFyZ2VQaWNDb3VudCA9IDA7XHJcbiAgICAgICAgbWVkaXVtUGljQ291bnQgPSAwO1xyXG4gICAgICAgIHNtYWxsUGljQ291bnQgPSAwO1xyXG4gICAgICAgIGxhcmdlUGljID0gW107XHJcbiAgICAgICAgbWVkaXVtUGljID0gW107XHJcbiAgICAgICAgc21hbGxQaWMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFsbERhdGFbaV0ud2lkdGggPj0gMTUwMCkge1xyXG4gICAgICAgICAgICAgICAgbGFyZ2VQaWNDb3VudCA9IGxhcmdlUGljQ291bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgbGFyZ2VQaWMucHVzaChhbGxEYXRhW2ldKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFsbERhdGFbaV0ud2lkdGggPj0gODAwICYmIGFsbERhdGFbaV0ud2lkdGggPD0gMTQ5OSkge1xyXG4gICAgICAgICAgICAgICAgbWVkaXVtUGljQ291bnQgPSBtZWRpdW1QaWNDb3VudCArIDE7XHJcbiAgICAgICAgICAgICAgICBtZWRpdW1QaWMucHVzaChhbGxEYXRhW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYWxsRGF0YVtpXS53aWR0aCA8PSA3OTkpIHtcclxuICAgICAgICAgICAgICAgIHNtYWxsUGljQ291bnQgPSBzbWFsbFBpY0NvdW50ICsgMTtcclxuICAgICAgICAgICAgICAgIHNtYWxsUGljLnB1c2goYWxsRGF0YVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkYXRhID0gZWxlbV9pZC5kYXRhc2V0O1xyXG4gICAgY3VyUGFnZSA9IDE7XHJcbiAgICBzZXRDdXJQYWdlKCk7XHJcbiAgICBzZXRQaWN0dXJlcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQaWN0dXJlcygpIHtcclxuICAgIGVsX2N1clBhZ2UuaW5uZXJIVE1MID0gY3VyUGFnZTtcclxuICAgIGNsZWFyTGlzdCgpO1xyXG4gICAgaWYgKGRhdGEuZmlsdGVyVmFsID09PSAnbGFyZ2UnICYmIHNlcnZlck9rID09PSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKGxhcmdlUGljQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzcmMgPSBcIlwiO1xyXG4gICAgICAgICAgICBvYmpBdXRob3JzID0ge307XHJcbiAgICAgICAgICAgIGFtb3VudFBhZ2VzID0gKGxhcmdlUGljQ291bnQgJSAyMCkgPyBNYXRoLmNlaWwobGFyZ2VQaWNDb3VudCAvIDIwKSA6IGxhcmdlUGljQ291bnQgLyAyMDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGZyb21QYWdlOyBpIDwgdG9QYWdlOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHNyYyA9IChpIDwgbGFyZ2VQaWMubGVuZ3RoKSA/IFwiaHR0cHM6Ly91bnNwbGFzaC5pdC8xNTA/aW1hZ2U9XCIgKyBsYXJnZVBpY1tpXS5pZCA6IFwiaW1nL2VtcHR5LmpwZ1wiO1xyXG4gICAgICAgICAgICAgICAgcHJldlBpY1tpIC0gZnJvbVBhZ2VdLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCBsYXJnZVBpYy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpBdXRob3JzW2xhcmdlUGljW2ldLmF1dGhvcl0gPSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1cGRhdGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGRhdGEuZmlsdGVyVmFsID09PSAnbWVkaXVtJyAmJiBzZXJ2ZXJPayA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGlmIChtZWRpdW1QaWNDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNyYyA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9iakF1dGhvcnMgPSB7fTtcclxuICAgICAgICAgICAgYW1vdW50UGFnZXMgPSAobWVkaXVtUGljQ291bnQgJSAyMCkgPyBNYXRoLmNlaWwobWVkaXVtUGljQ291bnQgLyAyMCkgOiBtZWRpdW1QaWNDb3VudCAvIDIwO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZnJvbVBhZ2U7IGkgPCB0b1BhZ2U7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3JjID0gKGkgPCBtZWRpdW1QaWMubGVuZ3RoKSA/IFwiaHR0cHM6Ly91bnNwbGFzaC5pdC8xNTA/aW1hZ2U9XCIgKyBtZWRpdW1QaWNbaV0uaWQgOiBcImltZy9lbXB0eS5qcGdcIjtcclxuICAgICAgICAgICAgICAgIHByZXZQaWNbaSAtIGZyb21QYWdlXS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpIDwgbWVkaXVtUGljLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iakF1dGhvcnNbbWVkaXVtUGljW2ldLmF1dGhvcl0gPSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1cGRhdGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGRhdGEuZmlsdGVyVmFsID09PSAnc21hbGwnICYmIHNlcnZlck9rID09PSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHNtYWxsUGljQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzcmMgPSBcIlwiO1xyXG4gICAgICAgICAgICBvYmpBdXRob3JzID0ge307XHJcbiAgICAgICAgICAgIGFtb3VudFBhZ2VzID0gKHNtYWxsUGljQ291bnQgJSAyMCkgPyBNYXRoLmNlaWwoc21hbGxQaWNDb3VudCAvIDIwKSA6IHNtYWxsUGljQ291bnQgLyAyMDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGZyb21QYWdlOyBpIDwgdG9QYWdlOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHNyYyA9IChpIDwgc21hbGxQaWMubGVuZ3RoKSA/IFwiaHR0cHM6Ly91bnNwbGFzaC5pdC8xNTA/aW1hZ2U9XCIgKyBzbWFsbFBpY1tpXS5pZCA6IFwiaW1nL2VtcHR5LmpwZ1wiO1xyXG4gICAgICAgICAgICAgICAgcHJldlBpY1tpIC0gZnJvbVBhZ2VdLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCBzbWFsbFBpYy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpBdXRob3JzW3NtYWxsUGljW2ldLmF1dGhvcl0gPSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1cGRhdGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaXN0KCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhvYmpBdXRob3JzKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG5ld0F1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgbmV3QXV0aG9yLmlubmVySFRNTCA9IE9iamVjdC5rZXlzKG9iakF1dGhvcnMpW2ldO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZpbHRlci1hdXRob3InKVswXS5hcHBlbmRDaGlsZChuZXdBdXRob3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckxpc3QoKSB7XHJcbiAgICB2YXIgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZpbHRlci1hdXRob3InKVswXTtcclxuICAgIHdoaWxlIChsaXN0Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgIGxpc3QucmVtb3ZlQ2hpbGQobGlzdC5maXJzdENoaWxkKTtcclxuICAgIH1cclxufVxyXG4iLCJmdW5jdGlvbiBzaG93RnVsbFNjcihpbWdJZCkge1xyXG4gICAgdmFyIG5ld3NyYyA9IGltZ0lkLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICB2YXIgZnJvbVBvcyA9IG5ld3NyYy5pbmRleE9mKFwiPVwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Z1bGxzY3InKVswXS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUtYmxrJyk7XHJcbiAgICBuZXdzcmMgPSAobmV3c3JjID09PSBcImltZy9lbXB0eS5qcGdcIikgPyBcImltZy9zb3JyeS5qcGdcIiA6IFwiaHR0cHM6Ly91bnNwbGFzaC5pdC8xMjgwP2ltYWdlPVwiICsgbmV3c3JjLnNsaWNlKGZyb21Qb3MgKyAxKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWdGdWxsU2NyJykuc2V0QXR0cmlidXRlKCdzcmMnLCBuZXdzcmMpO1xyXG59XHJcbmZ1bmN0aW9uIGNsb3NlUGljKCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnVsbHNjcicpWzBdLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZS1ibGsnKTtcclxufVxyXG4iLCJlbF9jdXJQYWdlLmlubmVySFRNTCA9IGN1clBhZ2U7XHJcblxyXG5mdW5jdGlvbiBpbmNyUGFnZSgpIHtcclxuICAgIGlmIChkYXRhLmZpbHRlclZhbCA9PT0gJ2xhcmdlJyAmJiBsYXJnZVBpY0NvdW50ID4gMCkge1xyXG4gICAgICAgIGN1clBhZ2UrKztcclxuICAgICAgICBpZiAoY3VyUGFnZSA+PSBhbW91bnRQYWdlcykge1xyXG4gICAgICAgICAgICBjdXJQYWdlID0gYW1vdW50UGFnZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldEN1clBhZ2UoKTtcclxuICAgICAgICBzZXRQaWN0dXJlcygpO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGEuZmlsdGVyVmFsID09PSAnbWVkaXVtJyAmJiBtZWRpdW1QaWNDb3VudCA+IDApIHtcclxuICAgICAgICBjdXJQYWdlKys7XHJcbiAgICAgICAgaWYgKGN1clBhZ2UgPj0gYW1vdW50UGFnZXMpIHtcclxuICAgICAgICAgICAgY3VyUGFnZSA9IGFtb3VudFBhZ2VzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRDdXJQYWdlKCk7XHJcbiAgICAgICAgc2V0UGljdHVyZXMoKTtcclxuICAgIH1cclxuICAgIGlmIChkYXRhLmZpbHRlclZhbCA9PT0gJ3NtYWxsJyAmJiBzbWFsbFBpY0NvdW50ID4gMCkge1xyXG4gICAgICAgIGN1clBhZ2UrKztcclxuICAgICAgICBpZiAoY3VyUGFnZSA+PSBhbW91bnRQYWdlcykge1xyXG4gICAgICAgICAgICBjdXJQYWdlID0gYW1vdW50UGFnZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldEN1clBhZ2UoKTtcclxuICAgICAgICBzZXRQaWN0dXJlcygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWNyUGFnZSgpIHtcclxuICAgIGlmIChkYXRhLmZpbHRlclZhbCA9PT0gJ2xhcmdlJyAmJiBsYXJnZVBpY0NvdW50ID4gMCkge1xyXG4gICAgICAgIGN1clBhZ2UtLTtcclxuICAgICAgICBpZiAoY3VyUGFnZSA8PSAxKSB7XHJcbiAgICAgICAgICAgIGN1clBhZ2UgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRDdXJQYWdlKCk7XHJcbiAgICAgICAgc2V0UGljdHVyZXMoKTtcclxuICAgIH1cclxuICAgIGlmIChkYXRhLmZpbHRlclZhbCA9PT0gJ21lZGl1bScgJiYgbWVkaXVtUGljQ291bnQgPiAwKSB7XHJcbiAgICAgICAgY3VyUGFnZS0tO1xyXG4gICAgICAgIGlmIChjdXJQYWdlIDw9IDEpIHtcclxuICAgICAgICAgICAgY3VyUGFnZSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldEN1clBhZ2UoKTtcclxuICAgICAgICBzZXRQaWN0dXJlcygpO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGEuZmlsdGVyVmFsID09PSAnc21hbGwnICYmIHNtYWxsUGljQ291bnQgPiAwKSB7XHJcbiAgICAgICAgY3VyUGFnZS0tO1xyXG4gICAgICAgIGlmIChjdXJQYWdlIDw9IDEpIHtcclxuICAgICAgICAgICAgY3VyUGFnZSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldEN1clBhZ2UoKTtcclxuICAgICAgICBzZXRQaWN0dXJlcygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDdXJQYWdlKCkge1xyXG4gICAgZWxfY3VyUGFnZS5pbm5lckhUTUwgPSBjdXJQYWdlO1xyXG4gICAgZnJvbVBhZ2UgPSBjdXJQYWdlICogMjAgLSAyMDtcclxuICAgIHRvUGFnZSA9IGN1clBhZ2UgKiAyMDsgICAgXHJcbn1cclxuIiwiICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly91bnNwbGFzaC5pdC9saXN0JywgdHJ1ZSk7XHJcbiAgICB4aHIuc2VuZCgpO1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHNlcnZlckFuc3dlcigpO1xyXG4gICAgICAgICAgICBzZXJ2ZXJPayA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VydmVyIE9rXCIpO1xyXG4gICAgICAgICAgICB2YXIgZmlyc3RDbGljayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZpbHRlci1zaXplLWl0ZW0nKVswXS5jbGljaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlcnZlck9rID0gZmFsc2U7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5mdW5jdGlvbiBzZXJ2ZXJBbnN3ZXIoKSB7XHJcbiAgICBhbGxEYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxufSJdfQ==
