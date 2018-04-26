<template>
	<div id="wrapper">
		<Zheader></Zheader>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import Zheader from './components/header/header'
export default {
  	components:{
	  	Zheader : Zheader
	  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "./common/stylus/base.stylus";
    #wrapper
        width 100%
        height 100%
</style>
