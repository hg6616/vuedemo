<template>
     <div class="dialog" >
                <div class="header">1</div>
                <div class="content">
                    <p class="desc">使用该卡券</p>
                    <div class="img"><span class="text">免费保养一次</span></div>
                </div>
                <div class="footer">
                    <div class="btnText">
                        取消
                    </div>
                    <div class="btnText" >
                        确定
                    </div>
                </div>
            </div>
</template>

<script type=""> 
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
    name: 'dialog',
    data() {
        return {
           
        }
    },
    props:['config'], 
}
</script>

<style lang="stylus" > 
  
</style>