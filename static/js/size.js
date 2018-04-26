$(function(){

    //菜单栏
    $(".title-drop").click(function(){

        $(this).toggleClass("current").siblings('.title-drop').removeClass("current");
        $(this).next(".sticker-group").slideToggle(500).siblings(".sticker-group").slideUp(500);

    });

    var isChoice = null,
        isHover = null;

    //给选中的对象添加虚线，四角拉伸，以及旋转按钮
    $(".canvas").on('click','.box',function(e){

        e.stopPropagation();

        if(!isChoice){
            $(this).find('.coor').css('display', 'block');
            $(this).find('.rotateBtn').css('display', 'block');
            $(this).css('border','2px dashed #ddd ');
            isChoice = true;
        }
        else{
            $(this).find('.coor').css('display', 'none');
            $(this).find('.rotateBtn').css('display', 'none');
            $(this).css('border','2px dashed transparent');
            isChoice = null;
        }
    });


    $(".canvas").on('mouseover mouseout','.box',function(e){
        e.stopPropagation();
        hover($(this),isHover);
    });

    function hover (obj,str){

        if(!str){
            obj.css('border','2px dashed #ddd');
            isHover = true;
        }else{
            obj.css('border','2px dashed transparent');
            isHover = null;
        }
    }


    //标尺
    ruler();
    function ruler(){
        var wrapperW = $(".canvasMain").width(),
        wrapperH = $(".canvasMain").height();

        var pw = wrapperW/15,
            py = wrapperH/24;

        $(".ruleX p").css('width',pw);
        $(".ruleY p").css('height',py);
    }

    //放大缩小
    $(".zoomBig").click(function(){
        var str = $(".zoomPercent").text().substring(0,$(".zoomPercent").text().length-1)
        zoom("+",str);
    });
    $(".zoomSmall").click(function(){
        var str = $(".zoomPercent").text().substring(0,$(".zoomPercent").text().length-1)
        zoom("-",str);
    });

    function zoom (type,str){

        var w = $(".canvasMain").width();
        var h = $(".canvasMain").height();
        var t = parseInt($(".canvasMain").css('marginTop'));

        if ( type == "+") {
            if (str == "200") { return false; }
            $(".canvasMain").css('width', w*1.25);
            $(".canvasMain").css('height', h*1.25);
            $(".canvasMain").css('marginTop', t*2.5 + 'px');
            $(".zoomPercent").text(parseInt(str)+25+"%");
            ruler();
            $(".canvasMain .box").each(function(i){

                var l = $(".canvasMain .box").eq(i).css('left'),
                    t = $(".canvasMain .box").eq(i).css('top');

                $(".canvasMain .box").eq(i).css({
                    'width': $(".canvasMain .box").eq(i).width()*1.25,
                    'height': $(".canvasMain .box").eq(i).height()*1.25,
                    'left': l*1.5,
                    'top': t*1.25

                });
                $(".canvasMain img").eq(i).css({'width': "100%","height":"100%"});
            });
        }else{
            if (str == "100") { return false; }
            $(".canvasMain").css('width', w/1.25);
            $(".canvasMain").css('height', h/1.25);
            $(".canvasMain").css('marginTop', t/2.5 + 'px');
            $(".zoomPercent").text(parseInt(str)-25+"%");
            ruler();
            $(".canvasMain .box").each(function(i){
                var l = $(".canvasMain .box").eq(i).css('left'),
                    t = $(".canvasMain .box").eq(i).css('top');

                $(".canvasMain .box").eq(i).css({
                    'width': $(".canvasMain .box").eq(i).width()/1.25,
                    'height': $(".canvasMain .box").eq(i).height()/1.25,
                    'left': l/1.25,
                    'top': t/1.25

                });
                $(".canvasMain img").eq(i).css({'width': "100%","height":"100%"});
            });
        }
    }

    //调用调色板
    $(".bgColor").colpick({

        obj:"bgColor",
        layout:'rgbhex',
        color:'#ffffff',
        onSubmit:function(hsb,hex,rgb,el) {

            $(el).css('background-color', '#'+hex);
            $(el).colpickHide();
        }

    }).css('background-color', '#fff');

    //字体
    $(".font").change(function(){
        //console.log($(".font option:selected").val());
        var opt = $(".font option:selected").val();
        if( opt == '0'){
            $(".bgText").css('font-family', 'Microsoft Yahei');
        }
        if( opt == '1'){
           $(".bgText").css('font-family', 'Rammetto One,cursive');
        }
    });

    //
    $(".bgOpacity").bind("mouseenter ",function(){
        $(".bgTip").addClass('hover');
    }).bind("mouseleave",function(){
        $(".bgTip").removeClass('hover');
    });

    $(".bgOpacity").click(function(e){
        e.stopPropagation();
        $(".bgOpacity").unbind('mouseenter');
        $(".bgTip").removeClass('hover');
        $(".opacityPanel").css('display', 'block');
    });

    //close
    $(document).click(function(event) {
        $(".opacityPanel").css('display', 'none');
    });

});