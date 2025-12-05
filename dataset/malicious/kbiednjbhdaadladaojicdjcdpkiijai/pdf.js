String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var GETval = {};
if(document.location.toString().indexOf('?') !== -1) {
    var query = document.location
                   .toString()
                   .replace(/^.*?\?/, '')
                   .replace(/#.*$/, '')
                   .split('&');

    for(var i=0, l=query.length; i<l; i++) {
       var aux = decodeURIComponent(query[i]).split('=');
       GETval[aux[0]] = aux[1];
    }
}

if (GETval['page']) {
    switch(GETval['page']) {
        case "1":
            $("li").removeClass("active");
            $(".convert-btn").addClass("active");
            $(".common").removeClass("disabled-el");
            $(".common").not(".convert-container").addClass("disabled-el");
            break;
        case "2":
            $("li").removeClass("active");
            $(".merge-btn").addClass("active");
            $(".common").removeClass("disabled-el");
            $(".common").not(".merge-container").addClass("disabled-el");
            break;
        case "3":
            $("li").removeClass("active");
            $(".append-btn").addClass("active");
            $(".common").removeClass("disabled-el");
            $(".common").not(".append-container").addClass("disabled-el");
            break;
        case "4":
            $("li").removeClass("active");
            $(".pdfs-btn").addClass("active");
            $(".common").removeClass("disabled-el");
            $(".common").not(".pdfs-container").addClass("disabled-el");
            break;
    }
}

$(".convert-btn").click(function() {
    $("li").removeClass("active");
    $(".convert-btn").addClass("active");

    $(".common").removeClass("disabled-el");
    $(".common").not(".convert-container").addClass("disabled-el");
});

$(".merge-btn").click(function() {
    $("li").removeClass("active");
    $(".merge-btn").addClass("active");

    $(".common").removeClass("disabled-el");
    $(".common").not(".merge-container").addClass("disabled-el");
});

$(".append-btn").click(function() {
    $("li").removeClass("active");
    $(".append-btn").addClass("active");

    $(".common").removeClass("disabled-el");
    $(".common").not(".append-container").addClass("disabled-el");
});

$(".pdfs-btn").click(function() {
    $("li").removeClass("active");
    $(".pdfs-btn").addClass("active");

    $(".common").removeClass("disabled-el");
    $(".common").not(".pdfs-container").addClass("disabled-el");
});

// input form events
$("#convert-input").change(function(e) {
    $('.convert-container label h1').text("");
    $('.convert-container label h1').eq(0).text(e.target.files.length > 0 ? e.target.files[0].name : "Select your file");
});


$("#merge-input-1").change(function(e) {
    $('.merge-container .first-merge h1').text(e.target.files.length > 0 ? e.target.files[0].name : "Select first PDF");
    $('.merge-container .first-merge h1').css("color", "#5F6595");
});

$("#merge-input-2").change(function(e) {
    $('.merge-container .second-merge h1').text(e.target.files.length > 0 ? e.target.files[0].name : "Select second PDF");
    $('.merge-container .second-merge h1').css("color", "#5F6595");
});


$("#append-input-1").change(function(e) {
    $('.append-container .first-append h1').text(e.target.files.length > 0 ? e.target.files[0].name : "Select PDF file");
    $('.append-container .first-append h1').css("color", "#5F6595");
});

$("#append-input-2").change(function(e) {
    $('.append-container .second-append h1').text(e.target.files.length > 0 ? e.target.files[0].name : "Select image file");
    $('.append-container .second-append h1').css("color", "#5F6595");
});


// Base logic

function readFile(file){
    return new Promise((resolve, reject) => {
        var fr = new FileReader();  
        fr.onload = () => {
          resolve(fr.result)
        };
        fr.readAsArrayBuffer(file);
    });
}


let convertProcessing = 0;
function chainError(err) {
    $("#convert-input").val('');
    $('.convert-container label h1').eq(0).text("Select or drop here your file");
    $('.convert-container label h1').eq(1).text("Error happened.");
    $('.convert-container label h1').eq(1).css("color", "red");
    $(".convert-container button").css("filter", "grayscale(0)");
    return Promise.reject(err)
  };

async function convertDocument(file) {
    formData = new FormData();
    formData.append("document", file);
    fetch('https://pdf-rm4spcosuq-ue.a.run.app/api/pdf/convert', {method: "POST", body: formData})
    .then(response => {
        if (response.status === 200) {
            return response.blob();
        } else {
            return chainError(new Error("400"));
        }
    }, chainError)
    .catch((res) => {})
    .then(function(blob) {
        const pdfUrl = URL.createObjectURL(blob);
        chrome.downloads.download({url: pdfUrl});

        $("#convert-input").val('');
        $('.convert-container label h1').eq(0).text("Select or drop here your file");
        $('.convert-container label h1').eq(1).text("(.doc, .docx, .rtf...)");
        $('.convert-container label h1').eq(1).css("color", "#5F6595");

        $(".convert-container button").css("filter", "grayscale(0)");
        convertProcessing = 0;
    }, chainError)
    .catch((res) => {convertProcessing = 0});
}
$(".convert-container button").click(function() {
    if (!convertProcessing) {
        file = $("#convert-input").prop('files');
        if (Array.from(file).length) {
            convertProcessing = 1;
            $(".convert-container button").css("filter", "grayscale(1)");
            $('.convert-container label h1').eq(1).text("We're processing your request...");
            $('.convert-container label h1').eq(1).css("color", "#5F6595");
            convertDocument(file[0]);
        }
    }
});

let mergeProcessing = 0;

function restoreMerge() {
    $("#merge-input-1, #merge-input-2").val('');
    $(".merge-container label").css("display", "flex");
    $(".merge-container .processing").css("display", "none");
    mergeProcessing = 0;
    $(".merge-container button").css("filter", "grayscale(0)");
}

$(".merge-container button").click(async function() {
    if (!mergeProcessing) {
        firstPDf = $("#merge-input-1").prop('files');
        secondPDf = $("#merge-input-2").prop('files');
    
        if (Array.from(firstPDf).length && Array.from(secondPDf).length) {
            if (firstPDf[0].type === "application/pdf" && secondPDf[0].type === "application/pdf") {
                
                $(".merge-container label").css("display", "none");
                $(".merge-container .processing").css("display", "flex");

                $(".processing-1").text(firstPDf[0].name);
                $(".processing-2").text(secondPDf[0].name);

                $('.merge-container .first-merge h1').text("Select first PDF");
                $('.merge-container .second-merge h1').text("Select second PDF");
                mergeProcessing = 1;
                $(".merge-container button").css("filter", "grayscale(1)");

                var PDFs = [];

                var promise = Promise.resolve();
                [firstPDf[0], secondPDf[0]].map(file => promise.then(() => readFile(file))
                .then((file) => {
                    PDFs.push(file);
                })
                .then(async function() {
                    try {
                        if (PDFs.length == 2) {
                            let mergedPdf = await PDFLib.PDFDocument.create();
        
                            let pdf1 = await PDFLib.PDFDocument.load(PDFs[0], {ignoreEncryption: true});
                            let pdf2 = await PDFLib.PDFDocument.load(PDFs[1], {ignoreEncryption: true});
                    
                            for (let pdf of [pdf1, pdf2]) {
                                let copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                                copiedPages.forEach((page) => {
                                    mergedPdf.addPage(page);
                                })
                            }
                    
                            const pdfUrl = URL.createObjectURL(
                                new Blob([await mergedPdf.save()], { type: 'application/pdf' }),
                            );
                            chrome.downloads.download({url: pdfUrl});
                            restoreMerge();
                        }
                    } catch(e) {
                        $('.merge-container .first-merge h1').text("Error happened.");
                        $('.merge-container .second-merge h1').text("Error happened");
            
                        $('.merge-container .first-merge h1').css("color", "red");
                        $('.merge-container .second-merge h1').css("color", "red");

                        restoreMerge();
                    }
                }));
            }
        }
    }
});


let appendProcessing = 0;

function restoreAppend() {
    appendProcessing = 0;
    $("#append-input-1, #append-input-2").val('');
    $(".append-container button").css("filter", "grayscale(0)");

    $(".append-container label").css("display", "flex");
    $(".append-container .processing").css("display", "none");
}

$(".append-container button").click(function() {
    if (!appendProcessing) {
        pdf = $("#append-input-1").prop('files');
        image = $("#append-input-2").prop('files');
        format = "";

        if (Array.from(pdf).length && Array.from(image).length) {
            if (pdf[0].type === "application/pdf" && String(image[0].type).includes("image/")) {
                $(".append-container label").css("display", "none");
                $(".append-container .processing").css("display", "flex");

                $('.append-container .first-append h1').text("Select PDF file");
                $('.append-container .second-append h1').text("Select image file");

                $(".processing-1").text(pdf[0].name);
                $(".processing-2").text(image[0].name);

                $('.append-container .first-append h1').text("Select PDF file");
                $('.append-container .second-append h1').text("Select image file");
                appendProcessing = 1;
                $(".append-container button").css("filter", "grayscale(1)");

                if (image[0].type === "image/jpg" || image[0].type === "image/jpeg") {
                    format = "jpg";
                } else {
                    format = "png";
                }
                const start = $("input[type='radio'][name='imagePos']:checked")[0].id === "toBegin" ? true : false;

                var PDFs = [];

                var promise = Promise.resolve();
                [pdf[0], image[0]].map(file => promise.then(() => readFile(file))
                .then((file) => {
                    PDFs.push(file);
                })
                .then(async function() {
                    try {
                        let loadedPdf = await PDFLib.PDFDocument.load(PDFs[0]);
        
                        const pages = loadedPdf.getPages();
                        const targetPage = pages[start ? 0 : pages.length-1];
                    
                        const {width, height} = targetPage.getSize();
                    
                        let newPage = start ? loadedPdf.insertPage(0, [width, height]) : loadedPdf.addPage([width, height]);
            
                        const embeddedImg = format === "png" ? await loadedPdf.embedPng(PDFs[1]) : await loadedPdf.embedJpg(PDFs[1]);
                    
                        let scale = 1;
                        if ((embeddedImg.width > width) || (embeddedImg.height > height)) {
                            scale = Math.min(width / embeddedImg.width, height / embeddedImg.height)
                        }
            
                        let imgDims = embeddedImg.scale(scale);
                
                        newPage.drawImage(embeddedImg, {width: imgDims.width, height: imgDims.height});
                        const pdfUrl = URL.createObjectURL(
                            new Blob([await loadedPdf.save()], { type: 'application/pdf' }),
                        );
                        chrome.downloads.download({url: pdfUrl});
                        restoreAppend();
                    } catch(e) {
                        $('.append-container .first-append h1').text("Error happened.");
                        $('.append-container .second-append h1').text("Error happened");
            
                        $('.append-container .first-append h1').css("color", "red");
                        $('.append-container .second-append h1').css("color", "red");
                        restoreAppend();
                    }
                }));
            }
        }
    }
});


async function execute() {
    tabs = await new Promise((resolve, reject)=>chrome.tabs.query({}, resolve));
    execAll = tabs.map((tab) => new Promise((resolve, reject)=> {chrome.tabs.executeScript(tab.id, {
        code: "[...new Set([...[...[...document.getElementsByTagName('object')].map((e)=>e.data),...[...document.getElementsByTagName('embed'), ...document.getElementsByTagName('iframe')].map((e)=>e.src)].filter((src)=>{try { return new URL(src).pathname.endsWith('.pdf') } catch(e) {} return false;}),...[...document.querySelectorAll('embed[type*=" + '"/pdf"' + "]')].map((e)=>e.src).filter((src)=>{try { return ['http','https','ftp','file'].contains(new URL(src).protocol) } catch(e) {} return false;})])]"
    }, (res)=>
    { 
        _=chrome.runtime.lastError;
        return resolve(res) 
    }
    )}));
    res = await Promise.all(execAll)
    res = res.filter((e) => Array.isArray(e)).flat(depth=2)

    res2 = tabs.map((tab)=>tab.url).filter((url)=>url.split("#")[0].split("?")[0].endsWith(".pdf"))

    result = [...new Set(res.concat(res2))];
    $(".download-pdf-count").text(`${result.length} PDFs opened in your tabs`);

    result.map(function(item) {
        var div = document.createElement("div");
        div.classList = "pdf-element";

        p = document.createElement("p");
        p.innerText = item;
        div.appendChild(p);

        pdfImg = document.createElement("div");
        pdfImg.classList = "pdf-download";
        img = document.createElement("img");
        img.src = "img/pdfDownload.png";
        pdfImg.appendChild(img);

        pdfImg.addEventListener("click", function() {
            chrome.downloads.download({url: item});
        })

        div.appendChild(pdfImg);
        $(".pdfs-wrapper").append(div);
    });
}

execute();