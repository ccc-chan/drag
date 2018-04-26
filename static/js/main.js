$(function(){

    var $toolBar = $(".toolBar");
    var $can = $(".canvasMain");
    var hasImg = null;  //判断画布是否有选择的图
    var z = 1;
    var img,            //
        currentImg;     //当前拖拽


    $('.sticker-group').on('dragstart','img',function(e){
        myDragStart(e.originalEvent, this);
        hasImg = null;
    });


    function myDragStart(event, img){
        var src = img.src;
        var trans = event.dataTransfer;
        trans.setData("text", event.target.src);
    }


    $toolBar.on('dragover',myDragOver);
    $toolBar.on('drop',myDrop1);


    $can.on('dragover',myDragOver);
    $can.on('drop',function(e){

        drawing(e.originalEvent);

    });


    function myDragOver(e) {

        e.originalEvent.preventDefault();

    }


    function myDrop1(e) {

        var trans = e.originalEvent.dataTransfer;
        var src = trans.getData("text");

    }


    function drawing(e){

        var $main = $(".canvas"),
            div = "<div class='box'></div>",
            n = $(".canvas >div").length,
            corner = '<div class="rotateBtn"></div><div class="coor coor1"></div><div class="coor coor2"></div><div class="coor coor3"></div><div class="coor coor4"></div>';
        console.log(e);
        //
        if (!hasImg) {

            var src = e.dataTransfer.getData("text");
            img = new Image();
            img.src = src;


            // currentImg赋值
            $(img).bind('mousedown',  function(e) {
                currentImg = e.originalEvent.target;
            });

            var oL = $(".canvas").offset().left;
            var w = $(".canvas").width();
            var iW = img.width;

            if( e.clientX+iW < oL || (e.clientX-iW/2)>(oL+w)){
                 return false;
            }


            $main.append(div);
            $(".canvas>div").eq(n).append(corner,img);


            // hasImg赋值
            $(img).bind('dragstart',  function(e) {
                hasImg = e.originalEvent.target;
            });

            z++;

            $(".canvas>div").eq(n).css({
                "position":"absolute",
                "left":e.clientX-$(".canvasMain").offset().left-iW/2+"px",
                "top":e.clientY-$(".canvasMain").offset().top-img.height/2+"px",
                "width": iW,
                "height": img.height+1,
                "border": "2px dashed transparent ",
                "z-index":z+1
            });


        } else {

            var l = e.clientX-$(".canvas").offset().left-currentImg.width/2+"px";
            var t = e.clientY-$(".canvas").offset().top-currentImg.width/2+"px";
            //move
            $(currentImg).parent().css({
                "position":"absolute",
                "left":e.clientX-$(".canvas").offset().left-currentImg.width/2+"px",
                "top":e.clientY-$(".canvas").offset().top-currentImg.height/2+"px",
                "width":iW+1,
                "height": currentImg.height+1,
                "border": "2px dashed #ddd "
            });
        }
    }

    $(".canvas").on("mousedown",".coor1,.coor2,.coor3,.coor4",function(e) {

        e.preventDefault();
        reSize($(this).parent(".box"),$(this),e);

    });

    //放大缩小
    function reSize(obj,obj1,e){

        var w,h
            minW = obj.width()/5, //最小宽度
            minH = obj.height()/5;//最小高度


        $(".canvas").on('mousemove', function(e) {

            if(obj1.hasClass('coor1')){

                w = e.clientX-obj.offset().left;
                h = e.clientY-obj.offset().top;
                obj.css({
                    "width": Math.max(minW,w),
                    "height": Math.max(minH,h)
                });
                obj.children("img").css({
                    "width": Math.max(minW,w),
                    "height": Math.max(minH,h)
                });
                obj.children(".edit").css({
                    "width": '100%',
                    "height": '100%'
                });

            }else if(obj1.hasClass('coor2')){

                w = e.clientX-obj.offset().left;
                h = e.clientY-obj.offset().top;
                var wrapperTop = $(".canvas").offset().top;
                var top = e.clientY - wrapperTop;
                var h1 = obj.height();
                var h2 = obj.offset().top - $(".canvas").offset().top - top + h1;


                obj.css({
                    "width": Math.max(minW,w),
                    "height": Math.max(minH,h2),
                    "top": Math.max(0,top),
                });
                obj.children("img").css({
                    "width": '100%',
                    "height": '100%'
                });

            }else if(obj1.hasClass('coor3')){

                var wrapperTop = $(".canvas").offset().top,
                    top = e.clientY - wrapperTop,
                    wrapperLeft = $(".canvasMain").offset().left,
                    left = e.clientX - wrapperLeft,
                    h1 = obj.height(),
                    h2 = obj.offset().top - $(".canvas").offset().top - top + h1,
                    w1 = obj.width(),
                    w2 = obj.offset().left - $(".canvas").offset().left - left + w1;

                obj.css({
                    "width": Math.max(minW,w2),
                    "height": Math.max(minH,h2),
                    "top": Math.max(0,top),
                    "left": Math.max(0,left)
                });
                obj.children("img").css({
                    "width": '100%',
                    "height": '100%'
                });

            }else if(obj1.hasClass('coor4')){

                var wrapperLeft = $(".canvas").offset().left,
                    left = e.clientX - wrapperLeft,
                    w1 = obj.width(),
                    w2 = obj.offset().left - $(".canvas").offset().left - left + w1,
                    h = e.clientY-obj.offset().top;

                obj.css({
                    "width": Math.max(minW,w2),
                    "height": Math.max(minH,h),
                    "left": left
                });
                obj.children("img").css({
                    "width": '100%',
                    "height": '100%'
                });

            }
        });


        $(".canvas").on("mouseup",function(event) {
            $(this).unbind('mousemove');
        });

    }

    //rotate
    $(".canvas").on('mousedown','.rotateBtn',function(e){

        e.stopPropagation();
        rotate($(this),false,null,e);

    });

    function rotate(obj,isDown,oldY,e){

        isDown = true,
        oldY = e.clientY;
        var time = 0;


        var x = obj.parent('.box').offset().left+(obj.parent('.box').width())/2,
            y = obj.parent('.box').offset().top+(obj.parent('.box').height())/2; // 圆心坐标


        $(document).mousemove(function(e) {

            if(isDown) {

                var angle = Math.atan2(e.clientX-x,e.clientY-y)/Math.PI*180
                    obj.parent('.box').css("transform", "rotate(" + -angle + "deg)");

            }

        });
        $(document).mouseup(function(e){

            isDown = false;
            oldY = null;
        });
    }

    //阻止浏览器默认右键点击事件
    $("div").bind("contextmenu", function(){
        return false;
    });

    //自定义右键菜单
    $(".canvasMain").on("mousedown",".box",function(e) {

        e.stopPropagation();
        if (3 == e.which) {

            var $this = $(this);
            console.log()
            var zind = $this.css("z-index");
            var l = e.clientX - $(".canvasMain").offset().left;
            var t = e.clientY - $(".canvasMain").offset().top;
            $(".toolWrapper").css({
                "left":l,
                "top":t,
                "display":"block"
            });
            $(".up").click(function(){
                zind++;
                $this.css("z-index",zind);
                $(".toolWrapper").css("display","none");
            });
            $(".down").click(function(){
                $this.css("z-index",zind-1);
                $(".toolWrapper").css("display","none");
            });
            $(".top").click(function(){
                $this.css("z-index","9999");
                $(".toolWrapper").css("display","none");
            });
            $(".bottom").click(function(){
                $this.css("z-index","1");
                $(".toolWrapper").css("display","none");
            });
            $(".delete").click(function(){
                $this.remove();
                $(".toolWrapper").css("display","none");
            });
        }else if( 1 == e.which){
            $(".toolWrapper").css("display","none");
        }
    });


    //添加文本框
    $(".tool2 h2,.tool2 h4,.tool2 h5").dblclick(function(e){

        var $main = $(".canvas"),
            div = "<div class='box'></div>",
            n = $(".canvas >div").length,
            corner = '<div class="rotateBtn"></div><div class="coor coor1"></div><div class="coor coor2"></div><div class="coor coor3"></div><div class="coor coor4"></div>';

            $main.append(div);
        var edit = "<div class='edit' contentEditable></div>",
            type = $(this).prop("tagName");
            $(".canvas>div").eq(n).append(corner,edit);

        //contentEditable

    });
    $(".edit")./*dblclick(function(){
        e.stopPropagation();
        $(this).attr("contentEditable");
    },function(){
        $(this).attr("contentEditable","false");
    }).*/change(function(){
        if ($(this).height() > $(this).parent().height()) {
            $(this).parent().height($(this).height());
        }
    });

    //拖动滑块
    scale=function (btn,bar,title,obj){
        this.btn=document.getElementById(btn);
        this.bar=document.getElementById(bar);
        this.title=document.getElementById(title);
        this.step=this.bar.getElementsByTagName("DIV")[0];
        this.obj=document.getElementById(obj);
        this.init();
    };
    scale.prototype={
        init:function (){
            var f=this,g=document,b=window,m=Math;
            f.btn.onmousedown=function (e){
                var x=(e||b.event).clientX;
                var l=this.offsetLeft;
                var max=f.bar.offsetWidth-this.offsetWidth;
                g.onmousemove=function (e){
                    var thisX=(e||b.event).clientX;
                    var to=m.min(max,m.max(-2,l+(thisX-x)));
                    f.btn.style.left=to+'px';
                    f.ondrag(m.round(m.max(0,to/max)*100),to);
                    b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
                };
                g.onmouseup=new Function('this.onmousemove=null');
            };
        },
        ondrag:function (pos,x){
            this.step.style.width=Math.max(0,x)+'px';
            this.obj.style.opacity=Math.max(0.1,1-pos/100);
            this.title.innerHTML=pos+'%';
        }
    }
    new scale('btn','bar','title','canvas');
});