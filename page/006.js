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
var prdname = '';
var playName = '';
var scalePage = 1;
var buildElement = [];
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
    fetch("http://59.127.185.48:5050/007.json")
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
        else if(jsondata.objects[i].type == "triangle"){
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
        else if(jsondata.objects[i].type == "rect"){
            var id1 = makeid(5);
            prdname += "<div id=icon"+id1+" style=\"position: absolute; z-index:2; left:"+moveLeft+"px; top:"+moveTop+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\"><img style=\"width:100%; height: 100%;\" src=\"../icon/rect.png\"></div>";
            // prdname += "<div id=icon"+id1+" style=\"position: absolute; z-index:2; left:"+300+"px; top:"+300+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\"><img style=\"width:100%; height: 100%;\" src=\"../icon/rect.png\"></div>";
            buildElement.push("icon"+id1);
            // alert("rect"+ moveLeft);
        }
        else if(jsondata.objects[i].type == "circle"){
            var id1 = makeid(5);
            // prdname += "<div style=\"position: absolute; z-index:2; left:"+moveLeft+"px; top:"+moveTop+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\"><img style=\"width:100%; height: 100%;\" src=\"../icon/circle.jpg\"></div>";
            prdname += "<div id=icon"+id1+" style=\"position: absolute; z-index:2; left:"+moveLeft+"px; top:"+moveTop+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\"><video controls=\"\" autoplay=\"false\" name=\"media\"><source src=\"http://59.127.185.48:5050/audio/songs.mp3\" type=\"audio/mpeg\"></video></div>"
            // prdname += "<div id=icon"+id1+" style=\"position: absolute; z-index:2; left:"+500+"px; top:"+500+"px; width:"+iconWidth+"px; height: "+iconHight+"px;\"><video controls=\"\" autoplay=\"false\" name=\"media\"><source src=\"http://59.127.185.48:5050/audio/songs.mp3\" type=\"audio/mpeg\"></video></div>"
            buildElement.push("icon"+id1);
            // alert("circle");
        }
        
        }
        console.log(buildElement);
        mainImage.innerHTML += prdname;
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
function showMouseButton() {
    switch (event.button){
        case 0:
        alert("你用滑鼠左鍵！"+" X:"+event.pageX+" Y:"+event.pageY);
        break;
        case 1:
        // deHight = deHight * 0.8;
        // deWidth = deWidth * 0.8;
        // alert("你用滑鼠中鍵！"+" X:"+event.pageX+" Y:"+event.pageY+'A:'+deHight+'B:'+deWidth);
        // mainImage.style = 'width:'+deWidth+'px; height: '+deHight+'px;';
        scalePage = scalePage * 0.8;
        // alert("你用滑鼠中鍵！"+" X:"+event.pageX+" Y:"+event.pageY+'A:'+scalePage);
        reLoad(scalePage);
        break;
        case 2:
        // deHight = deHight / 0.8;
        // deWidth = deWidth / 0.8;
        // alert("你用滑鼠右鍵！"+" X:"+event.pageX+" Y:"+event.pageY);
        // mainImage.style = 'width:'+deWidth+'px; height: '+deHight+'px;';
        scalePage = scalePage / 0.8;
        // alert("你用滑鼠右鍵！"+" X:"+event.pageX+" Y:"+event.pageY+'A:'+scalePage);
        reLoad(scalePage);
        break;
        default:
        alert("未知的滑鼠鍵！"+event.button);
        break;
    }
}