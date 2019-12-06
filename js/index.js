//var newURL = location.href.split("?")[1];
// window.history.pushState('object', document.title, newURL);

// Remove URL Tag Parameter from Address Bar
if (window.parent.location.href.match(/res=/)){
    if (typeof (history.pushState) != "undefined") {
        var obj = { Title: document.title, Url: window.parent.location.pathname };
        history.pushState(obj, obj.Title, obj.Url);
    } else {
        window.parent.location = window.parent.location.pathname;
    }
}
//alert(obj);