<template>
  	<div class="main">
  			<nav id="nav">
  					<ul>
  						<li @click="toggleTabs(0)" :class="{cur:0 == nowIndex}" >
  							<span>111</span>
  						</li>
  						<li @click="toggleTabs(1)" :class="{cur:1 == nowIndex}">
  							<span>文字</span>
  						</li>
  					</ul>
  			</nav>
  			<div id="toolBar" class="toolBar">
  				<div class="tool1" v-show="nowIndex===0">
            <span class="toolbar-title">111111</span>
            <div class="filter">
              <div class="title-drop">
                标题一
                <i class="iconfont icon-down-copy"></i>
              </div>
              <div class="sticker-group">
                  <div>
                    <div>
                      <img src="../../static/img/1.png" alt="" draggable="true" id="a-1">
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src="../../static/img/5.png" alt="" draggable="true" id="a-2">
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src="../../static/img/2.png" alt="" draggable="true" id="a-3">
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src="../../static/img/1.png" alt="" draggable="true" id="a-4">
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src="../../static/img/2.png" alt="" draggable="true" id="a-5">
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src="../../static/img/2.png" alt=""  raggable="true" id="a-6">
                    </div>
                  </div>
              </div>
              <div class="title-drop">
                标题二
                <i class="iconfont icon-down-copy"></i>
              </div>
              <div class="sticker-group">
                <div>
                  <div>
                    <img src="../../static/img/3.png" alt="" draggable="true" id="b-1">
                  </div>
                </div>
                <div>
                  <div>
                    <img src="../../static/img/3.png" alt="" draggable="true" id="b-2">
                  </div>
                </div>
                <div>
                  <div>
                    <img src="../../static/img/3.png" alt="" draggable="true" id="b-3">
                  </div>
                </div>
                <div>
                  <div>
                    <img src="../../static/img/1.png" alt="" draggable="true" id="b-4">
                  </div>
                </div>
                <div>
                  <div>
                    <img src="../../static/img/2.png" alt="" draggable="true" id="b-5">
                  </div>
                </div>
                <div>
                  <div>
                    <img src="../../static/img/2.png" alt="" draggable="true" id="b-6">
                  </div>
                </div>
              </div>
              <div class="title-drop">
                标题三
                <i class="iconfont icon-down-copy"></i>
              </div>
              <div class="title-drop">
                标题四
                <i class="iconfont icon-down-copy"></i>
              </div>
              <div class="title-drop">
                标题五
                <i class="iconfont icon-down-copy"></i>
              </div>
            </div>
          </div>
          <div class="tool2" v-show="nowIndex===1">
            <span class="toolbar-title"></span>
            <h2 class="">点击添加标题1</h2>
            <h4 class="">点击添加标题2</h4>
            <h5 class="">点击添加标题3</h5>
          </div>
  			</div>
        <div id="scroll" class="canvasWrapper" >
          <!-- panel -->
          <div class="editorPanel">
            <div id="background">
              <div class="bgText">背景</div>
              <div class="bgColor">
                <i></i>
              </div>
              <div class="bgOpacity">
                <i></i>
                <span class="bgTip">透明度</span>
                <div class="opacityPanel">
                  <div class="arrow"></div>
                  <div class="opacityContent">
                    <div class="opacityTitle">
                      <div class="opacityTitleText">透明度</div>
                      <span id="title">0%</span>
                    </div>
                    <div class="opacityScale panelScale">
                      <div class="scale" id="bar">
                        <div></div>
                        <span id="btn"></span>
                      </div> 
                    </div> 
                  </div>
                </div>
              </div>
            </div>

            <!-- <div >
              <select class="font">
                <option value="0">1</option>
                <option value="1">2</option>
              </select>
            </div> -->
          </div>
          
          <div class="canvasMain" id="canvasMain">
            <div class="ruleX">
              <p class="ruleXlin">
                <span class="ruleXlinText">0</span>
              </p><p class="ruleXlin short"></p><p class="ruleXlin">
                <span class="ruleXlinText">100</span>
              </p><p class="ruleXlin short"></p><p class="ruleXlin">
                <span class="ruleXlinText">200</span>
              </p><p class="ruleXlin short"></p><p class="ruleXlin">
                <span class="ruleXlinText">300</span>
              </p><p class="ruleXlin short"></p><p class="ruleXlin">
                <span class="ruleXlinText">400</span>
              </p><p class="ruleXlin short"></p><p class="ruleXlin">
                <span class="ruleXlinText">500</span>
              </p><p class="ruleXlin short"></p><p class="ruleXlin">
                <span class="ruleXlinText">600</span>
              </p><p class="ruleXlin short"></p><p class="ruleXlin">
                <span class="ruleXlinText">700</span>
              </p><p class="ruleXlin short"></p>
            </div>
            <div class="ruleY">
              <p class="ruleYlin">
                <span class="ruleYlinText">0</span>
              </p><p class="ruleYlin short"></p><p class="ruleYlin">
                <span class="ruleYlinText">100</span>
              </p><p class="ruleYlin short"></p><p class="ruleYlin">
                <span class="ruleYlinText">200</span>
              </p><p class="ruleYlin short"></p><p class="ruleYlin">
                <span class="ruleYlinText">300</span>
              </p><p class="ruleYlin short"></p><p class="ruleYlin">
                <span class="ruleYlinText">400</span>
              </p><p class="ruleYlin short"></p><p class="ruleYlin">
                <span class="ruleYlinText">500</span>
              </p><p class="ruleYlin short"></p><p class="ruleYlin">
                <span class="ruleYlinText">600</span>
              </p><p class="ruleYlin short"></p><p class="ruleYlin">
                <span class="ruleYlinText">700</span>
              </p><p class="ruleYlin short"></p><p class="ruleYlin">
                <span class="ruleYlinText">800</span>
              </p><p class="ruleYlin short"></p><p class="ruleYlin">
                <span class="ruleYlinText">900</span>
              </p><p class="ruleYlin short"></p><p class="ruleYlin">
                <span class="ruleYlinText">1000</span>
              </p><p class="ruleYlin short"></p><p class="ruleYlin">
                <span class="ruleYlinText">1100</span>
              </p><p class="ruleYlin short"></p>
            </div>
            <div class="toolWrapper">
              <ul>
                <li class="delete">移除</li>
                <li>复制</li>
                <li class="up">上移一层</li>
                <li class="down">下移一层</li>
                <li class="top">置于顶层</li>
                <li class="bottom">置于底层</li>
              </ul>
            </div>
            <div class="canvas" id="canvas"></div>
          </div>
        </div>  
        <div class="zoomer">
          <div class="zoomBig">
            <i class="iconfont icon-jiahao"></i>
          </div>
          <div class="zoomPercent"><span>100%</span></div>
          <div class="zoomSmall">
            <i class="iconfont icon-jianhao"></i>
          </div>
        </div>
  	</div>
</template>

<script>
export default {
  data(){
    return{
      nowIndex: 0,
      imgArr:[
        'static/img/1.png',
        'static/img/2.png',
        'static/img/3.png',
        'static/img/4.png',
      ]
      
    }
  },
  methods:{
    toggleTabs:function(index){
        this.nowIndex=index;
    },
        
  },
  mounted() {
    
    
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
		@import "index.stylus";
</style>