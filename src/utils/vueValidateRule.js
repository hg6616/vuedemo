import regexRules from './regexRule';
//覆盖原提示
const dictionary = {
    en: {
        messages: {
            email: () => 'Some English Message'
        }
    },
    cn: {
        messages: {
            email: (field) => '请输入正确的邮箱格式'+field,
            required: (field) => '请填入必填字段'+field,
            max: (field,value) =>`${field}最大长度${value}`,
            min: (field) =>`${field}最小长度${value}`,

            
        },
        
    }
};
export default {
    //初始化校验配置
    validateConfig: {
        locale: 'cn',
        // errorBagName: 'errors', // change if property conflicts.
        // fieldsBagName: 'fields', 
        // delay: 0, 
        dictionary: dictionary,
          strict: false, 
        // enableAutoClasses: false, 
        // classNames: {
        //   touched: 'touched', // the control has been blurred
        //   untouched: 'untouched', // the control hasn't been blurred
        //   valid: 'valid', // model is valid
        //   invalid: 'invalid', // model is invalid
        //   pristine: 'pristine', // control has not been interacted with
        //   dirty: 'dirty' // control has been interacted with
        // }
    },
    rules: [
        {
            name: 'mobile',
            fn: {
                getMessage: field =>`'${field}'请输入正确的手机号码`,
                validate: value => /^0{0,1}1(3|4|5|8|7)[0-9]{9}$/.test(value)
            }
        },
        {
            name: 'chn',
            fn: {
                getMessage: field =>`'${field}'请输入中文`,
                validate: value => /^[\u4E00-\u9FA5]{0,25}$/.test(value)
            },
        },
            {
            name: 'positiveInt',
            fn: {
                getMessage: field =>`'${field}'请输入正整数`,
                validate: value => /^\d+$/.test(value)
            },
        }, 
        {
            name: 'specialRule',
            fn: {
                getMessage(field, params, data) {
                    return (data && data.message) || 'Something went wrong';
                },
                validate(value) {
                    return new Promise(resolve => {
                        let valid = true
                        let msg = { message: 'Not this value' };//默认信息
                        if (value == 1 || value == 3 || value == 5) {
                            valid = false;//false触发检验信息
                        }
                        if (value == 1) {
                            msg.message = '你怎么可以输入1'
                        }
                        if (value == 3) {
                            msg.message = '都说了不能输入3'
                        }
                        resolve({
                            valid: valid,
                            data: msg
                        });
                    });
                }
            }
        },
    ]
}

