$.noty.layouts.topCenterAuto = {
    name: "topCenterAuto",
    options: {},
    container: {
        object: '<ul id="noty_topCenter_layout_container" />',
        selector: "ul#noty_topCenter_layout_container",
        style: function() {
            var that = this;
            setTimeout(function() {
                $(that).css({
                    top: 20,
                    left: 0,
                    position: "fixed",
                    width: "auto",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), $(that).css({
                    left: ($(window).width() - $(that).outerWidth(!1)) / 2 + "px"
                })
            }, 10);
        }
    },
    parent: {
        object: "<li />",
        selector: "li",
        css: {}
    },
    css: {
        display: "none",
        width: "auto"
    },
    addClass: ""
}