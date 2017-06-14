import { MessageBox, Toast } from 'mint-ui'
export default {
    //有几个页面加载前要判断是否绑定车主,没有则提示
    ifRedirectAfterLoadPage(cb) {
        var _this = this;
        this.$store.dispatch({
            type: 'GET_USER_INFO',
            data: { dlrCode: this.$store.state.dlrCode }
        })
            .then(() => {
                var binded = this.$store.getters.carOwner.binded;
                console.log(binded);
                if (binded) {
                    if (cb) {
                        cb(_this);
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
    },

    addScrollEvent(cfg) {
        //  obj.addEventListener('scroll', this.onScroll);

        // obj.addEventListener('touchmove', function (event) {
        //     // 如果这个元素的位置内只有一个手指的话 
        //     if (event.targetTouches.length == 1) {
        //         var touch = event.targetTouches[0];
        //         // 把元素放在手指所在的位置 
        //         console.log(touch.pageX + 'px,' + touch.pageY + 'px');
        //     }
        // }, true);
        let fn = cfg.fn;
        let obj = cfg.target;
        let touchDistance = 50;
        let startY = 0;
        obj.addEventListener('touchstart', function (event) {
            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                startY = touch.pageY;
                //  console.log(touch.pageX + 'px,' + touch.pageY + 'px');
            }
        }, false);

        obj.addEventListener('touchend', function (event) {
            var touch = event.changedTouches[0];
            //  console.log(touch.pageX + 'px,' + touch.pageY + 'px');
            //   console.log(startY - touch.pageY);

            var prop = 'documentElement';
            if (document.compatMode == "CSS1Compat") {
                prop = 'documentElement';
            }
            else {
                prop = 'body';
            }

            let scrollTop = document[prop].scrollTop;
            let scrollHeight = document[prop].scrollHeight;
            let clientHeight = document[prop].clientHeight;
            let st = obj.scrollTop;
            let sh = obj.scrollHeight;
            let ch = obj.clientHeight;
            if (scrollTop == 0) {
                scrollTop = document.body.scrollTop;
            }
            let isAtBottom = scrollHeight - scrollTop - clientHeight == 0;
            if (scrollHeight == clientHeight && startY - touch.pageY > 50) {//没有滚动条&&向上滑动
                fn()
            }
            else if (scrollHeight != clientHeight && isAtBottom) {//有滚动条&&滚到底部
                fn()
            }
        }, false);
    },
    getDateStr(cfg) {
        var date = new Date();
        var defCfg = { type: "D", offset: 0, date: dd };
        for (let x in cfg) {
            defCfg[x] = cfg[x];
        }
        cfg = defCfg;
        //    cfg = $.extend({ type: "D", offset: 0 }, cfg);
        var AddDayCount = cfg.offset;
        switch (cfg.type) {
            case "M"://todo 粗略
                AddDayCount = AddDayCount * 30;
                break;
            case "Y":
                AddDayCount = AddDayCount * 365;
                break;
        }
        var dd = defCfg.date;
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1).toString() : (dd.getMonth() + 1).toString()); //获取当前月份的日期
        var d = (dd.getDate() < 10 ? "0" + (dd.getDate()).toString() : (dd.getDate()).toString());
        var r = y + "-" + m + "-" + d;
        switch (cfg.type) {
            case "M":
                r = y + "-" + m
                break;
            case "Y":
                r = y;
                break;
        }
        return r;
    },
    validate(err) {
        let res = true;
        console.log(err);
        if (err && err.errors.length > 0) {
            var msg = '';
            res = false;
            for (let x in err.errors) {
                msg += err.errors[x].msg + ';';
            }
            Toast({
                message: msg,
                // position: 'bottom',
                duration: 2000
            });
        }
        return res;
    }

}