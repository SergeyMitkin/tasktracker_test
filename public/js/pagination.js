// Пагинация
'use strict';

var numberOfItems = $("#row-tasks .list-group").length; // Число страниц
var limitPerPage = 3; // Количество превью на странице
$("#row-tasks .list-group:gt(" + (limitPerPage - 1) + ")").hide(); //
var totalPages = 0;

// Удаляем ссылку для пагинации без JS на кнопке для "предыдущая страница"
var elPreviousA = document.getElementById("previous-page");
elPreviousA.setAttribute("href", "javascript:void(0)");

// Удаляем li с номерами страниц
var elPageNumbers = document.getElementById("li_page_numbers");
elPageNumbers.remove();

// Удаляем li с кнопкой "следующая задача"
var elNextPage = document.getElementById("li_next_page");
elNextPage.remove();

// Определяем количество страниц
if (numberOfItems % limitPerPage == 0){
    totalPages = numberOfItems / limitPerPage;
} else if (numberOfItems % limitPerPage != 0){
    totalPages = Math.floor(numberOfItems / limitPerPage) + 1;
}

$(".pagination").append("<li class='current-page active page-item first-page'>" +
    "<a class='page-link btn' href='javascript:void(0)'>" + 1 + "</a>" +
    "</li>");

for (var i = 2; i <= totalPages; i++){
    $(".pagination").append("<li class='current-page page-item'>" +
        "<a class='page-link btn' href='javascript:void(0)'>" + i + "</a>" +
        "</li>");
}

$(".pagination").append("<li id='next-page' class='page-item'><a class='page-link' href='javascript:void(0)' aria-label='Next'><span aria-hidden='true'>&raquo;</span><span class='sr-only'>Next</span></a></li>");

$(".pagination li.current-page").on("click", function () {
    if ($(this).hasClass("active")){
        return false;
    } else {
        var currentPage = $(this).index();
        //console.log(currentPage);
        $(".pagination li").removeClass("active");
        //console.log($(this));
        $(this).addClass("active");
        $('#row-tasks .list-group').hide();
        var grandTotal = limitPerPage * currentPage;
        
        for (var i = grandTotal - limitPerPage; i < grandTotal; i++){
            var CurrentPageTasks  = new Object();
            CurrentPageTasks = $("#row-tasks .list-group:eq(" + i + ")");
            CurrentPageTasks.show();
            //console.log(CurrentPageTasks);
        }
    }
})

$("#next-page").on("click", function () {
    var currentPage = $(".pagination li.active").index();
    if (currentPage === totalPages){
        return false;
    } else {
        currentPage++;
        $(".pagination li").removeClass("active");
        $('#row-tasks .list-group').hide();

        var grandTotal = limitPerPage * currentPage;

        for (var i = grandTotal - limitPerPage; i < grandTotal; i++){
            $("#row-tasks .list-group:eq(" + i + ")").show();
        }
        $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass("active");

    }
})

$("#previous-page").on("click", function () {
    var elPreviousA = document.getElementById("previous-page");
    elPreviousA.setAttribute("href", "javascript:void(0)");

    var currentPage = $(".pagination li.active").index();
    if (currentPage === 1){
        return false;
    } else {
        currentPage--;
        $(".pagination li").removeClass("active");
        $('#row-tasks .list-group').hide();

        var grandTotal = limitPerPage * currentPage;

        for (var i = grandTotal - limitPerPage; i < grandTotal; i++){
            $("#row-tasks .list-group:eq(" + i + ")").show();
        }
        $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass("active");
    }
})

