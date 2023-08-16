function Validator(option) {
    function getParent (inputElement,selector){
         while(inputElement.parentElement){
            if(inputElement.parentElement.matches(selector)){
                return inputElement.parentElement;
            }
            inputElement = inputElement.parentElement;
         }
    }
    var selectorRules = {};
    function error(inputElement) {
        var errorElement = getParent(inputElement,option.formGroup).querySelector(option.errorSelector);
        return errorElement;
    }
    function clearerror(inputElement) {
        var errorElement = error(inputElement);

        errorElement.innerText = '';
        getParent(inputElement,option.formGroup).classList.remove('invalid');
    }
    function validate(inputElement, rule) {
        var errorElement = error(inputElement)
        var errorMessage;
        var rules = selectorRules[rule.selector];
        for (var i = 0; i < rules.length; ++i) {
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));
                    
                    break;
                default:
                                errorMessage = rules[i](inputElement.value);

            }
            if (errorMessage) break;
        }
        
        if (errorMessage) {

            errorElement.innerText = errorMessage;
            getParent(inputElement,option.formGroup).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement,option.formGroup).classList.remove('invalid');
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
                        switch(input.type){
                            case 'radio':
                                value[input.name] =formElement.querySelector('input[name="' +input.name+'"]:checked').value;
                                break;
                                case 'checkbox':
                                    if(!input.matches(':checked'))return value;
                                    // {
                                    //     value[input.name]='';
                                    //     return value
                                    // } 
                                    if(!Array.isArray(value[input.name] )){
                                        value[input.name]=[];
                                    }
                                    value[input.name].push(input.value);
                                break;
                            case 'file':
                                value[input.name] = input.files;
                                break;
                            default:
                                value[input.name] = input.value;
                        }
                        return  value;
                    },{});
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
            Array.from(inputElements).forEach(function(inputElement){
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

Validator.isRequired = function (selector,message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim(' ') ? undefined : message || 'type this! please'
        }
    }
}
Validator.isRequiredCheckbox = function (selector,message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'type this! please'
        }
    }
}
Validator.isEmail = function (selector,message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'please type to correct email!'
        }
    }
}
Validator.minLength = function (selector, min,message) {
    return {
        selector: selector,
        test: function (value) {

            return value.length >= min ? undefined : message || `please type ${min} characters`;
        }
    }
}
Validator.isConfirmed = function (selector, getConfirmValue,message) {
    return {
        selector: selector,
        test: function (value) {

            return value === getConfirmValue() ? undefined : message || 'Not look like password typed';
        }
    }
}
//------validator2
function Validator2(option){
    var formRules = {};
    var formElement= document.querySelector(option);
    if (formElement){
        var inputs = formElement.querySelectorAll('[name][rules]');

        console.log(inputs);
        for (var input of inputs){
            console.log(input.getAttribute('rules'));
            formRules[input.name] = input.getAttribute('rules');
        }
    }

}