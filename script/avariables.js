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
