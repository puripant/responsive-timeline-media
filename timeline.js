'use strict';

d3.csv("data.csv", function(error, data) {
  var list = document.getElementsByTagName("ul")[0];
  for(var i = 0; i < data.length; i++) {
    var item = document.createElement("li");
    switch(data[i].type) {
      case "สิ่งพิมพ์": item.className = "type1"; break;
      case "วิทยุ": item.className = "type2"; break;
      case "ภาพยนตร์": item.className = "type3"; break;
      case "โทรทัศน์": item.className = "type4"; break;
      case "ภาพยนตร์": item.className = "type5"; break;
      case "ออนไลน์": item.className = "type6"; break;
      default: break;
    }

    var htmlString = "<div>";
    htmlString += "<div class='time'>พ.ศ. " + data[i].time + "</div>";
    htmlString += "<div class='text'>" + data[i].text + "</div>";
    htmlString += "<div class='image-wrapper'><img src='images/" + data[i].image + "' /></div>"
    htmlString += "</div>";
    item.innerHTML = htmlString;

    list.insertAdjacentElement("beforeend", item);
  }

  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    // Check only top and bottom and consider the case that the post's height is longer than the window height
    return (rect.bottom - 100 > 0 && rect.top + 100 < (window.innerHeight || document.documentElement.clientHeight));
  }

  function callbackFunction() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  window.addEventListener("load", callbackFunction);
  window.addEventListener("resize", callbackFunction);
  window.addEventListener("scroll", callbackFunction);
});
