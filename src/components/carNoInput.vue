<template>
    <span>
                <select v-model="selectedProvice" @change="changeCarNo">
                    <option  v-for="x in provice"  :value="x">{{x}}</option>
                </select>
                 <select v-model="selectedAlpha" @change="changeCarNo">
                    <option v-for="x in alpha"   :value="x">{{x}}</option>
                </select>
                <input type="text" max="5" v-model="no" @change="changeCarNo" placeholder="请填入车牌号">
            </span>
</template>

<script> 
export default {
    data() {
        return {
            selectedProvice: '京',
            selectedAlpha: 'A',
            no: ''
        }
    },
    props: ['callback'],
    computed: {
        //todo 车牌规则有待完善
        provice() {
            var str = '京,津,冀,晋,蒙,辽,吉,黑,沪,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,桂,琼,川,贵,云,渝,藏,陕,甘,青,宁,新,港,澳,台';
            return str.split(',');
        },
        alpha() {
            var str = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z';
            return str.split(',')
        }
    }
    , methods: {
        changeCarNo() {
            //校验
            var carNo = this.selectedProvice + this.selectedAlpha + this.no;
            if (this.no.length != 5) {
                carNo = '';
            }
            this.callback(carNo)
        }
    }
}
</script>

<style lang="stylus" scoped> 
      
</style>