var mainServer = "https://localhost:44344/files";
var bookIsbn = "24525245010";
var bookPage = "0";

var triH = 30;
var triW = 30;
var maTriH = 30/2008;
var maTriW = 30/2717; 

var deHight = 200;
var deWidth = 200;
var topPos = 10;
var topLeft = 10;
var mainImgScr = "";
var mainImage = document.getElementById('mainImage');
var audioPlayer =  document.getElementById('mainAudio');
var mainIconFunc =  document.getElementById('mainIconFunc');
var prdname = '';
var playName = '';
var scalePage = 0.2;
var buildElement = [];

window.addEventListener('message', (e) =>{
    // console.log('iframe='+ e.data);
    if(e.data=='zoomOUT'){
        zoomOut();
    }
    else if(e.data=='zoomIN'){
        zoomIn();
    }
}, false);

function zoomOut(){
    // alert("zooom");
    scalePage = scalePage * 0.8;
    reLoad(scalePage);
}
function zoomIn(){
    // alert("zooom");
    scalePage = scalePage / 0.8;
    reLoad(scalePage);
}
function reLoad(scalePage){
    console.log("removeremoveremoveremoveremoveremove");
    console.log(buildElement.length);
    for(i =0; i < buildElement.length; i++){
        const element = document.getElementById(buildElement[i]);
        console.log(element+"remove??");
        element.remove();
        console.log(element.id+"remove");
        console.log(buildElement[i]+"remove");
    }
    buildElement = [];
    load(scalePage);
    prdname = '';
    playName = '';
}
function load(scalePage) {
    // var mydata = JSON.parse(objects);
    // alert(mydata.length);
    console.log(scalePage);
    fetch(mainServer+"/"+bookIsbn+"/page/"+bookPage+"/page.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        console.log(jsondata.objects);
        mainImgScr = jsondata.objects[0].src;
        for (i = 0; i < jsondata.objects.length; i++) {
        var iconHight = jsondata.objects[i].height * jsondata.objects[i].scaleX * scalePage;
        var iconWidth = jsondata.objects[i].width * jsondata.objects[i].scaleY * scalePage;
        var moveTop = (0-topPos+jsondata.objects[i].top) * scalePage;
        var moveLeft = (0-topLeft+jsondata.objects[i].left) * scalePage;
        // alert("Top:"+moveTop+"Left:"+moveLeft);
        var link = jsondata.objects[i].link;
        var url = "";
        // alert(jsondata.objects[i].type);
        // alert(link.enabled + "SSSS");
        // alert(link.url + "AAAA");
        if(link.enabled){
            url = link.url;
        }

        if(jsondata.objects[i].type == "image"){
            // alert("image");
            deHight = jsondata.objects[i].height * scalePage;
            deWidth = jsondata.objects[i].width * scalePage;
            topPos = jsondata.objects[i].top;
            topLeft = jsondata.objects[i].left;
            // mainImage.style.backgroundImage = "url('"+ mainImgScr + "')";
            // mainImage.style.width = deWidth;
            // mainImage.style.height = deHight;
            mainImage.style = "background-image: url('"+mainImgScr+"'); background-size: cover; width:"+deWidth+"px; height: "+deHight+"px";
            // alert("width: "+deWidth+"px; height: "+deHight+"px;");
        }
        else if(jsondata.objects[i].type == "voice"){
            var id1 = makeid(5);
            var id2 = makeid(5);
            prdname += "<button id=icon"+id1+" onclick=\"playAudio('player"+id2+"')\" style=\"position: absolute; z-index:2; left:"+moveLeft+"px; top:"+moveTop+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\"><img style=\"width:100%; height: 100%;\" src=\"../icon/triangle.jpg\"></button>";
            // prdname += "<button id=icon"+id1+" onclick=\"playAudio('player"+id2+"')\" style=\"position: absolute; z-index:2; left:"+100+"px; top:"+100+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\"><img style=\"width:100%; height: 100%;\" src=\"../icon/triangle.jpg\"></button>";
            playName += "<audio id=player"+id2+" src="+url+"></audio>";
            buildElement.push("icon"+id1);
            buildElement.push("player"+id2);
            // alert("triangle" + moveTop);
            // prdname = "<div style=\"position: absolute; z-index:2; left:"+moveLeft+"px; top:"+moveTop+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\"><video controls=\"\" autoplay=\"\" name=\"media\"><source src=\"http://59.127.185.48:5050/audio/songs.mp3\" type=\"audio/mpeg\"></video></div>"
        }
        else if(jsondata.objects[i].type == "hyperlink"){
            var id1 = makeid(5);
            var url = jsondata.objects[i].link.url;
            prdname += "<div id=icon"+id1+" style=\"position: absolute; z-index:2; left:"+moveLeft+"px; top:"+moveTop+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\">"+
                            "<a href=\""+ url +"\"target=\"_blank\">"+
                            "<img style=\"width:100%; height: 100%;\" src=\"../icon/rect.png\">"+
                        "</div>";
            // prdname += "<div id=icon"+id1+" style=\"position: absolute; z-index:2; left:"+300+"px; top:"+300+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\"><img style=\"width:100%; height: 100%;\" src=\"../icon/rect.png\"></div>";
            buildElement.push("icon"+id1);
            // alert("rect"+ moveLeft);
        }
        else if(jsondata.objects[i].type == "vod"){
            var id1 = makeid(5);
            var url = jsondata.objects[i].link.url;
            // prdname += "<div style=\"position: absolute; z-index:2; left:"+moveLeft+"px; top:"+moveTop+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\"><img style=\"width:100%; height: 100%;\" src=\"../icon/circle.jpg\"></div>";
            prdname += "<div id=icon"+id1+" style=\"position: absolute; z-index:2; left:"+moveLeft+"px; top:"+moveTop+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\">"+
                            "<video width="+iconWidth+"px; controls=\"\" autoplay=\"false\" autoplay=\"0\" preload =\"none\" name=\"media\">"+
                                "<source src=\""+url+"\" type=\"video/mp4\">"+
                            "</video>"+
                        "</div>"
            // prdname += "<div id=icon"+id1+" style=\"position: absolute; z-index:2; left:"+500+"px; top:"+500+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\"><video controls=\"\" autoplay=\"false\" name=\"media\"><source src=\"http://59.127.185.48:5050/audio/songs.mp3\" type=\"audio/mpeg\"></video></div>"
            buildElement.push("icon"+id1);
            // alert("circle");
        }
        
        }
        console.log(buildElement);
        mainIconFunc.innerHTML += prdname;
        audioPlayer.innerHTML += playName;
    });
}
function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result;
}
function playAudio(p){
    var playingAudio = document.getElementById(p);
    if (playingAudio.duration > 0 && !playingAudio.paused) {
        //Its playing...do your job
        // alert("pauseAudio");
        playingAudio.pause();
    } else {
        // alert("playAudio");
        playingAudio.play();
    }
}
function test(a){
    alert('test:'+a)
}
function showMouseButton() {
    switch (event.button){
        case 0:
        // alert("你用滑鼠左鍵！"+" X:"+event.pageX+" Y:"+event.pageY+"TW:"+deWidth);
        var sideBarWidth = deWidth / 6;
        if(event.pageX > 5*sideBarWidth){
            hideShowMsg("bodyNext");
            // alert("下一頁！");
        }
        else if(event.pageX < sideBarWidth){
            hideShowMsg("bodyPrev")
            // alert("上一頁！");
        }
        else{
            hideShowMsg("bodyHide")
            // alert("隱藏！");
        }
        break;
        case 1:
        // deHight = deHight * 0.8;
        // deWidth = deWidth * 0.8;
        alert("你用滑鼠中鍵！");
        // mainImage.style = 'width:'+deWidth+'px; height: '+deHight+'px;';
        // scalePage = scalePage * 0.8;
        // alert("你用滑鼠中鍵！"+" X:"+event.pageX+" Y:"+event.pageY+'A:'+scalePage);
        // reLoad(scalePage);
        break;
        case 2:
        // deHight = deHight / 0.8;
        // deWidth = deWidth / 0.8;
        alert("你用滑鼠右鍵！");
        // mainImage.style = 'width:'+deWidth+'px; height: '+deHight+'px;';
        // scalePage = scalePage / 0.8;
        // alert("你用滑鼠右鍵！"+" X:"+event.pageX+" Y:"+event.pageY+'A:'+scalePage);
        // reLoad(scalePage);
        break;
        default:
        alert("未知的滑鼠鍵！"+event.button);
        break;
    }
    function hideShowMsg(m){
        window.parent.postMessage(m, '*');
    }
}