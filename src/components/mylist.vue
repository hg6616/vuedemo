<template>
    <div>
          <ul>
              <li  v-for="x in list" @click="check(x.name)">
                  {{x.name}}
              </li>
          </ul>
    </div>
</template>

<script type=""> 
    export default{
      data(){
          return {
          
          }
      },
      props:['list','callback'] ,
      methods:{
          check(name){
                 this.callback(name);
          }
      }
    } 
</script>

<style lang="stylus" > 
        li{
            padding:1rem;
        }
</style>