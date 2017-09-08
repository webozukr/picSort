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