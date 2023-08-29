function Validator(option) {
    function getParent(inputElement, selector) {
        while (inputElement.parentElement) {
            if (inputElement.parentElement.matches(selector)) {
                return inputElement.parentElement;
            }
            inputElement = inputElement.parentElement;
        }
    }
    var selectorRules = {};
    function error(inputElement) {
        var errorElement = getParent(inputElement, option.formGroup).querySelector(option.errorSelector);
        return errorElement;
    }
    function clearerror(inputElement) {
        var errorElement = error(inputElement);

        errorElement.innerText = '';
        getParent(inputElement, option.formGroup).classList.remove('invalid');
    }
    function validate(inputElement, rule) {
        var errorElement = error(inputElement)
        var errorMessage;

        var rules = selectorRules[rule.selector];
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));
                    console.log(rule.selector);
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);

            }
            if (errorMessage) break;
        }

        if (errorMessage) {

            errorElement.innerText = errorMessage;
            getParent(inputElement, option.formGroup).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, option.formGroup).classList.remove('invalid');
        }
        return !errorMessage;
    }

    var formElement = document.querySelector(option.form)

    if (formElement) {
        //get data from submit
        formElement.onsubmit = function (e) {
            e.preventDefault();
            var isValidform = true;
            option.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isValidform = false;
                }

            });


            if (isValidform) {
                if (typeof option.onsubmit === 'function') {
                    var enable = formElement.querySelectorAll('[name]')
                    var formValue = Array.from(enable).reduce(function (value, input) {
                        switch (input.type) {
                            case 'radio':
                                value[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) return value;
                                // {
                                //     value[input.name]='';
                                //     return value
                                // } 
                                if (!Array.isArray(value[input.name])) {
                                    value[input.name] = [];
                                }
                                value[input.name].push(input.value);
                                break;
                            case 'file':
                                value[input.name] = input.files;
                                break;
                            default:
                                value[input.name] = input.value;
                        }
                        return value;
                    }, {});
                    option.onsubmit(formValue)
                }

            }

        }


        //loop ever rule and handle
        option.rules.forEach(rule => {
            //save rules
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function (inputElement) {
                inputElement.onblur = function () {

                    validate(inputElement, rule);
                }

                inputElement.oninput = function () {
                    clearerror(inputElement);
                }
            })




        });
    }

}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim(' ') ? undefined : message || 'type this! please'
        }
    }
}
Validator.isRequiredCheckbox = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'type this! please'
        }
    }
}
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'please type to correct email!'
        }
    }
}
Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {

            return value.length >= min ? undefined : message || `please type ${min} characters`;
        }
    }
}
Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {

            return value === getConfirmValue() ? undefined : message || 'Not look like password typed';
        }
    }
}
//------validator2

function Validator2(option) {
    var _this = this

    var formRules = {};
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }

    }

    var formElement = document.querySelector(option);
    var validatorRules = {
        required: function (value) {
            return value ? undefined : 'please type this';
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'please type to correct email!'
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `please type ${min} characters`;
            }
        },
        confirm: function (selector) {
            return function (value) {

                return value === formElement.querySelector(selector).value ? undefined : 'Mật khẩu nhập lại không chính xác'
            }
        },
        hasToChecked: function (attribute) {
            return attribute === 'checked' ? undefined : 'Vui lòng chọn ít nhất một tùy chọn'
        }
    }

    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');

        for (var input of inputs) {

            var rules = input.getAttribute('rules').split('|')

            for (var rule of rules) {
                var ruleFunc = validatorRules[rule]
                var isRuleHasValue = rule.includes(':')

                if (isRuleHasValue) {
                    var ruleInfo = rule.split(':')

                    ruleFunc = validatorRules[ruleInfo[0]]
                    ruleFunc = ruleFunc(ruleInfo[1])
                }
                

                

                if (Array.isArray(formRules[input.name])) {
                    if (formRules[input.name].every(func => func !== ruleFunc)){
                        formRules[input.name].push(ruleFunc)
                    }
                    
                }
                else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }
    }
    function handleValidate(event) {
        var rules = formRules[event.target.name];

        var errorMessage;
        // console.log(event.target.type);
        for (var rule of rules) {
            switch (event.target.type) {
                case 'checkbox':
                case 'radio':

                    errorMessage = rule(event.target.checked);


                    break
                default:
                    errorMessage = rule(event.target.value)

            }

            if (errorMessage) break;
        }


        if (errorMessage) {
            var formGroup = getParent(event.target, '.form-group');
            if (formGroup) {
                formGroup.classList.add('invalid')
                var formMessage = formGroup.querySelector('.form-message')

                if (formMessage) {
                    formMessage.innerText = errorMessage;

                }
            }

        }
        return errorMessage;
    }
    function handleClearError(event) {
        var formGroup = getParent(event.target, '.form-group');
        if (formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid');
        }
        var formMessage = formGroup.querySelector('.form-message')
        if (formMessage) {
            formMessage.innerText = '';
        }


    }
    // console.log(formRules);
    formElement.onsubmit = function (event) {
        event.preventDefault();
        var inputs = formElement.querySelectorAll('[name][rules]');

        var isValid = true;
        for (var [index, input] of inputs.entries()) {

            if (input.type === 'checkbox' || input.type === 'radio') {
                
                if (index > 0 && isValid === true && input.name === inputs[--index].name) {
                    
                    continue
                }
                if (!handleValidate({ target: input })) {
                   isValid = true;
                    handleClearError({ target: input });
                    
                    
                }
            }
                if (handleValidate({ target: input })) {
                isValid = false
            }
            
            ;
        };
        // console.log(isValid);
        if (isValid) {
            var enable = formElement.querySelectorAll('[name]')
            var formValue = Array.from(enable).reduce(function (value, input) {
                switch (input.type) {
                    case 'radio':
                        if (input.matches(':checked')) value[input.name] = input.value
                        break
                    case 'checkbox':
                        if (!Array.isArray(value[input.name])) {
                            value[input.name] = [];
                        }
                        if (input.matches(':checked')) value[input.name].push(input.value);
                        break;
                    case 'file':
                        value[input.name] = input.files;
                        break;
                    default:
                        value[input.name] = input.value;
                }
                return value;
            }, {});
            
            console.log(formValue)

        }
    }
}

