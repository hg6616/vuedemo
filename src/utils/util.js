import { MessageBox } from 'mint-ui'
export default {
    //有几个页面加载前要判断是否绑定车主,没有则提示
    ifRedirectAfterLoadPage(cb) {
        this.GET_USER_INFO({})
            .then(() => {
                var binded = this.$store.getters.carOwner.binded;
                console.log(binded);
                if (binded) {
                    if (cb) {
                        cb();
                    } 
                }
                else {
                    MessageBox({
                        title: '提示',
                        message: '该服务需绑定车辆，请前往绑定',
                        showCancelButton: true,
                        confirmButtonText: '前往'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$router.push('./bindOwner')
                        }
                        else if (action == 'cancel') {
                            //  console.log('cancel')
                        }
                    });
                }
            })
    }
}