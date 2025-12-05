$(function(){
    $.switcher();
});
const joe = colorjoe.rgb("color-picker", "#FFDE31");
joe.on("done", color => {
    let customType = $("#color-picker").attr("data-target");
    $(`.custom-color .bundle .color[data-custom-type="${customType}"] .preview`).css("background", color.hex());
    chrome.storage.local.get(['colors'], function(result) {
        let colors = result.colors;
        colors[customType] = color.hex();
        chrome.storage.local.set({'colors': colors}, function() {
            updateInject();
        });
    });
});

function updateInject() {
    chrome.tabs.query({},function(tabs){     
        tabs.forEach(function(tab){
            let id = tab.id;
            if (tab.url.startsWith("http://") || tab.url.startsWith("https://")) {
                chrome.tabs.executeScript(id, {"code": "try {updateStyles(); updateLikes();} catch(e) {}"});
            }
        });
    });
}

function updateCustom() {
    $(".nav-buttons .btn").removeClass("active");
    $(".custom-btn").addClass("active");

    $(".color-templates").addClass("disabled");
    $(".custom-section").removeClass("disabled");

    chrome.storage.local.get(['colors'], function(result) {
        let colors = result.colors;
        for (const [key, value] of Object.entries(colors)) {
            $(`.custom-color .bundle .color[data-custom-type="${key}"] .preview`).css("background", value);
        }
    });
    chrome.storage.local.set({'custom': 1});
}

$("#ext-status").change(function(e) {
    chrome.storage.local.set({'status': e.target.checked}, function() {
        updateInject();
    });
});

chrome.storage.local.get(['status', 'colors', 'custom', 'avatar-rounded', 'custom-scrollbar', 'hide-r-column', 'auto-hide-l-menu', 'auto-hide-chat'], function(result) {
    if (!result.status) {
        $("#ext-status").prop("checked", false);
    }
    $("#avatar-rounded").prop("checked", result['avatar-rounded']);
    $("#custom-scrollbar").prop("checked", result['custom-scrollbar']);
    $("#hide-r-column").prop("checked", result['hide-r-column']);
    $("#auto-hide-l-menu").prop("checked", result['auto-hide-l-menu']);
    $("#auto-hide-chat").prop("checked", result['auto-hide-chat']);


    let colors = result.colors;
    if (!result.custom) {
        for (const [key, value] of Object.entries(TEMPLATES)) {
            if (value['BG_ONE'] === colors['BG_ONE']) {
                $(`.color-templates .bundle .color[data-color="${key}"]`).addClass("active");
            }
        }
    } else {
        updateCustom();
    }
});

$(".color-templates .color").click(function() {
    $(".color-templates .bundle .active").removeClass("active");
    $(this).addClass("active");
    let colorName = $(this).attr("data-color");
    chrome.storage.local.set({'colors': TEMPLATES[colorName]}, function() {
        updateInject();
    });
    
});


$(".presets-btn").click(function() {
    $(".nav-buttons .btn").removeClass("active");
    $(this).addClass("active");

    $(".color-templates").removeClass("disabled");
    $(".custom-section").addClass("disabled");
    chrome.storage.local.set({'custom': 0});
});

$(".custom-btn").click(function() {
    updateCustom();
});


$(".custom-section .custom-color .bundle .color").click(function(e) {
    let customType = $(this).attr("data-custom-type");
    $("#color-picker").attr("data-target", customType);
    let bg = $(`.custom-color .bundle .color[data-custom-type="${customType}"] .preview`).css("background-color");
    joe.set(bg);

    $("#color-picker").css("display", "inline-block");
    $("#color-picker").css("left", e.pageX);
    $("#color-picker").css("top", e.pageY);
    event.stopPropagation();
});

$(document).click(function(event) {
    if (!$(event.target).closest("#color-picker").length) {
        $("#color-picker").css("display", "none");
    }
})



$("#avatar-rounded, #custom-scrollbar, #hide-r-column, #auto-hide-l-menu, #auto-hide-chat").change(function(e) {
    let id = $(this).attr('id');
    chrome.storage.local.set({[id]: e.target.checked}, function() {
        updateInject();
    });
});