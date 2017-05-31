/*!
 * jQuery Validation Plugin v1.14.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2015 Jörn Zaefferer
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {

    $.extend($.fn, {
        // http://jqueryvalidation.org/validate/
        validate: function (options) {

            // if nothing is selected, return nothing; can't chain anyway
            if (!this.length) {
                if (options && options.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.");
                }
                return;
            }

            // check if a validator for this form was already created
            var validator = $.data(this[0], "validator");
            if (validator) {
                return validator;
            }

            // Add novalidate tag if HTML5.
            this.attr("novalidate", "novalidate");

            validator = new $.validator(options, this[0]);
            $.data(this[0], "validator", validator);

            if (validator.settings.onsubmit) {

                this.on("click.validate", ":submit", function (event) {
                    if (validator.settings.submitHandler) {
                        validator.submitButton = event.target;
                    }

                    // allow suppressing validation by adding a cancel class to the submit button
                    if ($(this).hasClass("cancel")) {
                        validator.cancelSubmit = true;
                    }

                    // allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                    if ($(this).attr("formnovalidate") !== undefined) {
                        validator.cancelSubmit = true;
                    }
                });

                // validate the form on submit
                this.on("submit.validate", function (event) {
                    if (validator.settings.debug) {
                        // prevent form submit to be able to see console output
                        event.preventDefault();
                    }
                    function handle() {
                        var hidden, result;
                        if (validator.settings.submitHandler) {
                            if (validator.submitButton) {
                                // insert a hidden input as a replacement for the missing submit button
                                hidden = $("<input type='hidden'/>")
                                    .attr("name", validator.submitButton.name)
                                    .val($(validator.submitButton).val())
                                    .appendTo(validator.currentForm);
                            }
                            result = validator.settings.submitHandler.call(validator, validator.currentForm, event);
                            if (validator.submitButton) {
                                // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                                hidden.remove();
                            }
                            if (result !== undefined) {
                                return result;
                            }
                            return false;
                        }
                        return true;
                    }

                    // prevent submit for invalid forms or custom submit handlers
                    if (validator.cancelSubmit) {
                        validator.cancelSubmit = false;
                        return handle();
                    }
                    if (validator.form()) {
                        if (validator.pendingRequest) {
                            validator.formSubmitted = true;
                            return false;
                        }
                        return handle();
                    } else {
                        validator.focusInvalid();
                        return false;
                    }
                });
            }

            return validator;
        },
        // http://jqueryvalidation.org/valid/
        valid: function () {
            var valid, validator, errorList;

            if ($(this[0]).is("form")) {
                valid = this.validate().form();
            } else {
                errorList = [];
                valid = true;
                validator = $(this[0].form).validate();
                this.each(function () {
                    valid = validator.element(this) && valid;
                    errorList = errorList.concat(validator.errorList);
                });
                validator.errorList = errorList;
            }
            return valid;
        },

        // http://jqueryvalidation.org/rules/
        rules: function (command, argument) {
            var element = this[0],
                settings, staticRules, existingRules, data, param, filtered;

            if (command) {
                settings = $.data(element.form, "validator").settings;
                staticRules = settings.rules;
                existingRules = $.validator.staticRules(element);
                switch (command) {
                    case "add":
                        $.extend(existingRules, $.validator.normalizeRule(argument));
                        // remove messages from rules, but allow them to be set separately
                        delete existingRules.messages;
                        staticRules[element.name] = existingRules;
                        if (argument.messages) {
                            settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
                        }
                        break;
                    case "remove":
                        if (!argument) {
                            delete staticRules[element.name];
                            return existingRules;
                        }
                        filtered = {};
                        $.each(argument.split(/\s/), function (index, method) {
                            filtered[method] = existingRules[method];
                            delete existingRules[method];
                            if (method === "required") {
                                $(element).removeAttr("aria-required");
                            }
                        });
                        return filtered;
                }
            }

            data = $.validator.normalizeRules(
                $.extend(
                    {},
                    $.validator.classRules(element),
                    $.validator.attributeRules(element),
                    $.validator.dataRules(element),
                    $.validator.staticRules(element)
                ), element);

            // make sure required is at front
            if (data.required) {
                param = data.required;
                delete data.required;
                data = $.extend({required: param}, data);
                $(element).attr("aria-required", "true");
            }

            // make sure remote is at back
            if (data.remote) {
                param = data.remote;
                delete data.remote;
                data = $.extend(data, {remote: param});
            }

            return data;
        }
    });

// Custom selectors
    $.extend($.expr[":"], {
        // http://jqueryvalidation.org/blank-selector/
        blank: function (a) {
            return !$.trim("" + $(a).val());
        },
        // http://jqueryvalidation.org/filled-selector/
        filled: function (a) {
            return !!$.trim("" + $(a).val());
        },
        // http://jqueryvalidation.org/unchecked-selector/
        unchecked: function (a) {
            return !$(a).prop("checked");
        }
    });

// constructor for validator
    $.validator = function (options, form) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
        this.currentForm = form;
        this.init();
    };

// http://jqueryvalidation.org/jQuery.validator.format/
    $.validator.format = function (source, params) {
        if (arguments.length === 1) {
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply(this, args);
            };
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor !== Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                return n;
            });
        });
        return source;
    };

    $.extend($.validator, {

        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "f-error",
            validClass: "valid",
            errorElement: "span",
            focusCleanup: false,
            focusInvalid: true,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function (element) {
                this.lastActive = element;

                // Hide error label and remove error class on focus if enabled
                if (this.settings.focusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.hideThese(this.errorsFor(element));
                }
            },
            onfocusout: function (element) {
                if (!this.checkable(element) && ( element.name in this.submitted || !this.optional(element) )) {
                    this.element(element);
                }
            },
            onkeyup: function (element, event) {
                // Avoid revalidate the field when pressing one of the following keys
                // Shift       => 16
                // Ctrl        => 17
                // Alt         => 18
                // Caps lock   => 20
                // End         => 35
                // Home        => 36
                // Left arrow  => 37
                // Up arrow    => 38
                // Right arrow => 39
                // Down arrow  => 40
                // Insert      => 45
                // Num lock    => 144
                // AltGr key   => 225
                var excludedKeys = [
                    16, 17, 18, 20, 35, 36, 37,
                    38, 39, 40, 45, 144, 225
                ];

                if (event.which === 9 && this.elementValue(element) === "" || $.inArray(event.keyCode, excludedKeys) !== -1) {
                    return;
                } else if (element.name in this.submitted || element === this.lastElement) {
                    this.element(element);
                }
            },
            onclick: function (element) {
                // click on selects, radiobuttons and checkboxes
                if (element.name in this.submitted) {
                    this.element(element);

                    // or option elements, check parent select in that case
                } else if (element.parentNode.name in this.submitted) {
                    this.element(element.parentNode);
                }
            },
            highlight: function (element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        },

        // http://jqueryvalidation.org/jQuery.validator.setDefaults/
        setDefaults: function (settings) {
            $.extend($.validator.defaults, settings);
        },

        messages: {
            required: "请填写",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format("Please enter no more than {0} characters."),
            minlength: $.validator.format("Please enter at least {0} characters."),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format("Please enter a value less than or equal to {0}."),
            min: $.validator.format("Please enter a value greater than or equal to {0}.")
        },

        autoCreateRanges: false,

        prototype: {

            init: function () {
                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();

                var groups = ( this.groups = {} ),
                    rules;
                $.each(this.settings.groups, function (key, value) {
                    if (typeof value === "string") {
                        value = value.split(/\s/);
                    }
                    $.each(value, function (index, name) {
                        groups[name] = key;
                    });
                });
                rules = this.settings.rules;
                $.each(rules, function (key, value) {
                    rules[key] = $.validator.normalizeRule(value);
                });

                function delegate(event) {
                    var validator = $.data(this.form, "validator"),
                        eventType = "on" + event.type.replace(/^validate/, ""),
                        settings = validator.settings;
                    if (settings[eventType] && !$(this).is(settings.ignore)) {
                        settings[eventType].call(validator, this, event);
                    }
                }

                $(this.currentForm)
                    .on("focusin.validate focusout.validate keyup.validate",
                    ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
                    "[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
                    "[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
                    "[type='radio'], [type='checkbox']", delegate)
                    // Support: Chrome, oldIE
                    // "select" is provided as event.target when clicking a option
                    .on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate);

                if (this.settings.invalidHandler) {
                    $(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
                }

                // Add aria-required to any Static/Data/Class required fields before first validation
                // Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
                $(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
            },

            // http://jqueryvalidation.org/Validator.form/
            form: function () {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                if (!this.valid()) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                }
                this.showErrors();
                return this.valid();
            },

            checkForm: function () {
                this.prepareForm();
                for (var i = 0, elements = ( this.currentElements = this.elements() ); elements[i]; i++) {
                    this.check(elements[i]);
                }
                return this.valid();
            },

            // http://jqueryvalidation.org/Validator.element/
            element: function (element) {
                var cleanElement = this.clean(element),
                    checkElement = this.validationTargetFor(cleanElement),
                    result = true;

                this.lastElement = checkElement;

                if (checkElement === undefined) {
                    delete this.invalid[cleanElement.name];
                } else {
                    this.prepareElement(checkElement);
                    this.currentElements = $(checkElement);

                    result = this.check(checkElement) !== false;
                    if (result) {
                        delete this.invalid[checkElement.name];
                    } else {
                        this.invalid[checkElement.name] = true;
                    }
                }
                // Add aria-invalid status for screen readers
                $(element).attr("aria-invalid", !result);

                if (!this.numberOfInvalids()) {
                    // Hide error containers on last error
                    this.toHide = this.toHide.add(this.containers);
                }
                this.showErrors();
                return result;
            },

            // http://jqueryvalidation.org/Validator.showErrors/
            showErrors: function (errors) {
                if (errors) {
                    // add items to error list and map
                    $.extend(this.errorMap, errors);
                    this.errorList = [];
                    for (var name in errors) {
                        this.errorList.push({
                            message: errors[name],
                            element: this.findByName(name)[0]
                        });
                    }
                    // remove items from success list
                    this.successList = $.grep(this.successList, function (element) {
                        return !( element.name in errors );
                    });
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList);
                } else {
                    this.defaultShowErrors();
                }
            },

            // http://jqueryvalidation.org/Validator.resetForm/
            resetForm: function () {
                if ($.fn.resetForm) {
                    $(this.currentForm).resetForm();
                }
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                var i, elements = this.elements()
                    .removeData("previousValue")
                    .removeAttr("aria-invalid");

                if (this.settings.unhighlight) {
                    for (i = 0; elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i],
                            this.settings.errorClass, "");
                    }
                } else {
                    elements.removeClass(this.settings.errorClass);
                }
            },

            numberOfInvalids: function () {
                return this.objectLength(this.invalid);
            },

            objectLength: function (obj) {
                /* jshint unused: false */
                var count = 0,
                    i;
                for (i in obj) {
                    count++;
                }
                return count;
            },

            hideErrors: function () {
                this.hideThese(this.toHide);
            },

            hideThese: function (errors) {
                errors.not(this.containers).text("");
                this.addWrapper(errors).hide();
            },

            valid: function () {
                return this.size() === 0;
            },

            size: function () {
                return this.errorList.length;
            },

            focusInvalid: function () {
                if (this.settings.focusInvalid) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                            .filter(":visible")
                            .focus()
                            // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                            .trigger("focusin");
                    } catch (e) {
                        // ignore IE throwing errors when focusing hidden elements
                    }
                }
            },

            findLastActive: function () {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function (n) {
                        return n.element.name === lastActive.name;
                    }).length === 1 && lastActive;
            },

            elements: function () {
                var validator = this,
                    rulesCache = {};

                // select all valid inputs inside the form (no submit or reset buttons)
                return $(this.currentForm)
                    .find("input, select, textarea")
                    .not(":submit, :reset, :image, :disabled")
                    .not(this.settings.ignore)
                    .filter(function () {
                        if (!this.name && validator.settings.debug && window.console) {
                            console.error("%o has no name assigned", this);
                        }

                        // select only the first element for each name, and only those with rules specified
                        if (this.name in rulesCache || !validator.objectLength($(this).rules())) {
                            return false;
                        }

                        rulesCache[this.name] = true;
                        return true;
                    });
            },

            clean: function (selector) {
                return $(selector)[0];
            },

            errors: function () {
                var errorClass = this.settings.errorClass.split(" ").join(".");
                return $(this.settings.errorElement + "." + errorClass, this.errorContext);
            },

            reset: function () {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
                this.currentElements = $([]);
            },

            prepareForm: function () {
                this.reset();
                this.toHide = this.errors().add(this.containers);
            },

            prepareElement: function (element) {
                this.reset();
                this.toHide = this.errorsFor(element);
            },

            elementValue: function (element) {
                var val,
                    $element = $(element),
                    type = element.type;

                if (type === "radio" || type === "checkbox") {
                    return this.findByName(element.name).filter(":checked").val();
                } else if (type === "number" && typeof element.validity !== "undefined") {
                    return element.validity.badInput ? false : $element.val();
                }

                val = $element.val();
                if (typeof val === "string") {
                    return val.replace(/\r/g, "");
                }
                return val;
            },

            check: function (element) {
                element = this.validationTargetFor(this.clean(element));

                var rules = $(element).rules(),
                    rulesCount = $.map(rules, function (n, i) {
                        return i;
                    }).length,
                    dependencyMismatch = false,
                    val = this.elementValue(element),
                    result, method, rule;

                for (method in rules) {
                    rule = {method: method, parameters: rules[method]};
                    try {

                        result = $.validator.methods[method].call(this, val, element, rule.parameters);

                        // if a method indicates that the field is optional and therefore valid,
                        // don't mark it as valid when there are no other rules
                        if (result === "dependency-mismatch" && rulesCount === 1) {
                            dependencyMismatch = true;
                            continue;
                        }
                        dependencyMismatch = false;

                        if (result === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(element));
                            return;
                        }

                        if (!result) {
                            this.formatAndAdd(element, rule);
                            return false;
                        }
                    } catch (e) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
                        }
                        if (e instanceof TypeError) {
                            e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
                        }

                        throw e;
                    }
                }
                if (dependencyMismatch) {
                    return;
                }
                if (this.objectLength(rules)) {
                    this.successList.push(element);
                }
                return true;
            },

            // return the custom message for the given element and validation method
            // specified in the element's HTML5 data attribute
            // return the generic message if present and no method specific message is present
            customDataMessage: function (element, method) {
                return $(element).data("msg" + method.charAt(0).toUpperCase() +
                        method.substring(1).toLowerCase()) || $(element).data("msg");
            },

            // return the custom message for the given element name and validation method
            customMessage: function (name, method) {
                var m = this.settings.messages[name];
                return m && ( m.constructor === String ? m : m[method]);
            },

            // return the first defined argument, allowing empty strings
            findDefined: function () {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined) {
                        return arguments[i];
                    }
                }
                return undefined;
            },

            defaultMessage: function (element, method) {
                return this.findDefined(
                    this.customMessage(element.name, method),
                    this.customDataMessage(element, method),
                    // title is never undefined, so handle empty string as undefined
                    !this.settings.ignoreTitle && element.title || undefined,
                    $.validator.messages[method],
                    "<strong>Warning: No message defined for " + element.name + "</strong>"
                );
            },

            formatAndAdd: function (element, rule) {
                var message = this.defaultMessage(element, rule.method),
                    theregex = /\$?\{(\d+)\}/g;
                if (typeof message === "function") {
                    message = message.call(this, rule.parameters, element);
                } else if (theregex.test(message)) {
                    message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
                }
                this.errorList.push({
                    message: message,
                    element: element,
                    method: rule.method
                });

                this.errorMap[element.name] = message;
                this.submitted[element.name] = message;
            },

            addWrapper: function (toToggle) {
                if (this.settings.wrapper) {
                    toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
                }
                return toToggle;
            },

            defaultShowErrors: function () {
                var i, elements, error;
                for (i = 0; this.errorList[i]; i++) {
                    error = this.errorList[i];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.showLabel(error.element, error.message);
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers);
                }
                if (this.settings.success) {
                    for (i = 0; this.successList[i]; i++) {
                        this.showLabel(this.successList[i]);
                    }
                }
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements(); elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show();
            },

            validElements: function () {
                return this.currentElements.not(this.invalidElements());
            },

            invalidElements: function () {
                return $(this.errorList).map(function () {
                    return this.element;
                });
            },

            showLabel: function (element, message) {
                var place, group, errorID,
                    error = this.errorsFor(element),
                    elementID = this.idOrName(element),
                    describedBy = $(element).attr("aria-describedby"),
                    _dc = $(element).attr("error-direction");
                $info = '';
                var $dui = '';
                if (error.length) {
                    // refresh error/success class
                    error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    // replace message on existing label
                    //error.find('.u-icon-dui').addClass('z-act');
                    $info += '\n   '
                    if(_dc=='bottom'){
                        $info += ' <div class="m-info z-bottom">'
                        $info += ' <span class="u-arrow-top"></span> <span class="u-info">'
                    }else{
                        $info += ' <div class="m-info">'
                        $info += ' <span class="u-arrow-left"></span> <span class="u-info">'
                    }
                    
                    
                    $info += message || "";
                    $info += '</span>'
                    $info += '  </div>';
                    error.append($info);
                    error.find('.m-info').show()
                } else {
                    // create error element xg-this
                    $info += '\n   '
                    if(_dc=='bottom'){
                        $info += ' <div class="m-info z-bottom">'
                        $info += ' <span class="u-arrow-top"></span> <span class="u-info">'
                    }else{
                        $info += ' <div class="m-info">'
                        $info += ' <span class="u-arrow-left"></span> <span class="u-info">'
                    }
                    $info += message || "";
                    $info += '</span>'
                    $info += '  </div>';

                    error = $('<span></span>')
                        .attr("id", elementID + "-error")
                        .addClass(this.settings.errorClass)
                    error.append($info);
                    //console.log(error)

                    /*error = $( "<" + this.settings.errorElement + ">" )
                     .attr( "id", elementID + "-error" )
                     .addClass( this.settings.errorClass )
                     .html( message || "" );*/


                    // Maintain reference to the element to be placed into the DOM
                    place = error;
                    if (this.settings.wrapper) {
                        // make sure the element is visible, even in IE
                        // actually showing the wrapped element is handled elsewhere
                        place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    }
                    /*$( element ).parent().find('.u-info').remove();
                     $( element ).after(place);
                     $(element).next('.u-info').on('mouseover',function(){

                     $(element).next('.u-info').find('.u-info-tips').show();
                     })
                     $(element).next('.u-info').on('mouseout',function(){

                     $(element).next('.u-info').find('.u-info-tips').hide();
                     })*/
                    if (this.labelContainer.length) {
                        this.labelContainer.append(place);
                    } else if (this.settings.errorPlacement) {
                        this.settings.errorPlacement(place, $(element));
                    } else {
                        place.insertAfter(element);
                    }

                    // Link error back to the element
                    if (error.is("label")) {
                        // If the error is a label, then associate using 'for'
                        error.attr("for", elementID);
                    } else if (error.parents("label[for='" + elementID + "']").length === 0) {
                        // If the element is not a child of an associated label, then it's necessary
                        // to explicitly apply aria-describedby

                        errorID = error.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1");
                        // Respect existing non-error aria-describedby
                        if (!describedBy) {
                            describedBy = errorID;
                        } else if (!describedBy.match(new RegExp("\\b" + errorID + "\\b"))) {
                            // Add to end of list if not already present
                            describedBy += " " + errorID;
                        }
                        $(element).attr("aria-describedby", describedBy);

                        // If this element is grouped, then assign to all elements in the same group
                        group = this.groups[element.name];
                        if (group) {
                            $.each(this.groups, function (name, testgroup) {
                                if (testgroup === group) {
                                    $("[name='" + name + "']", this.currentForm)
                                        .attr("aria-describedby", error.attr("id"));
                                }
                            });
                        }
                    }
                }
                if (!message && this.settings.success) {
                    error.text("");
                    if (typeof this.settings.success === "string") {
                        error.addClass(this.settings.success);
                    } else {
                        this.settings.success(error, element);
                    }
                }
                console.log(error)
                this.toShow = this.toShow.add(error);
            },

            errorsFor: function (element) {
                var name = this.idOrName(element),
                    describer = $(element).attr("aria-describedby"),
                    selector = "label[for='" + name + "'], label[for='" + name + "'] *";

                // aria-describedby should directly reference the error element
                if (describer) {
                    selector = selector + ", #" + describer.replace(/\s+/g, ", #");
                }
                return this
                    .errors()
                    .filter(selector);
            },

            idOrName: function (element) {
                return this.groups[element.name] || ( this.checkable(element) ? element.name : element.id || element.name );
            },

            validationTargetFor: function (element) {

                // If radio/checkbox, validate first element in group instead
                if (this.checkable(element)) {
                    element = this.findByName(element.name);
                }

                // Always apply ignore filter
                return $(element).not(this.settings.ignore)[0];
            },

            checkable: function (element) {
                return ( /radio|checkbox/i ).test(element.type);
            },

            findByName: function (name) {
                return $(this.currentForm).find("[name='" + name + "']");
            },

            getLength: function (value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case "select":
                        return $("option:selected", element).length;
                    case "input":
                        if (this.checkable(element)) {
                            return this.findByName(element.name).filter(":checked").length;
                        }
                }
                return value.length;
            },

            depend: function (param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            },

            dependTypes: {
                "boolean": function (param) {
                    return param;
                },
                "string": function (param, element) {
                    return !!$(param, element.form).length;
                },
                "function": function (param, element) {
                    return param(element);
                }
            },

            optional: function (element) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
            },

            startRequest: function (element) {
                if (!this.pending[element.name]) {
                    this.pendingRequest++;
                    this.pending[element.name] = true;
                }
            },

            stopRequest: function (element, valid) {
                this.pendingRequest--;
                // sometimes synchronization fails, make sure pendingRequest is never < 0
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0;
                }
                delete this.pending[element.name];
                if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    $(this.currentForm).submit();
                    this.formSubmitted = false;
                } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false;
                }
            },

            previousValue: function (element) {
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                        old: null,
                        valid: true,
                        message: this.defaultMessage(element, "remote")
                    });
            },

            // cleans up all forms and elements, removes validator-specific events
            destroy: function () {
                this.resetForm();

                $(this.currentForm)
                    .off(".validate")
                    .removeData("validator");
            }

        },

        classRuleSettings: {
            required: {required: true},
            email: {email: true},
            url: {url: true},
            date: {date: true},
            dateISO: {dateISO: true},
            number: {number: true},
            digits: {digits: true},
            creditcard: {creditcard: true}
        },

        addClassRules: function (className, rules) {
            if (className.constructor === String) {
                this.classRuleSettings[className] = rules;
            } else {
                $.extend(this.classRuleSettings, className);
            }
        },

        classRules: function (element) {
            var rules = {},
                classes = $(element).attr("class");

            if (classes) {
                $.each(classes.split(" "), function () {
                    if (this in $.validator.classRuleSettings) {
                        $.extend(rules, $.validator.classRuleSettings[this]);
                    }
                });
            }
            return rules;
        },

        normalizeAttributeRule: function (rules, type, method, value) {

            // convert the value to a number for number inputs, and for text for backwards compability
            // allows type="date" and others to be compared as strings
            if (/min|max/.test(method) && ( type === null || /number|range|text/.test(type) )) {
                value = Number(value);

                // Support Opera Mini, which returns NaN for undefined minlength
                if (isNaN(value)) {
                    value = undefined;
                }
            }

            if (value || value === 0) {
                rules[method] = value;
            } else if (type === method && type !== "range") {

                // exception: the jquery validate 'range' method
                // does not test for the html5 'range' type
                rules[method] = true;
            }
        },

        attributeRules: function (element) {
            var rules = {},
                $element = $(element),
                type = element.getAttribute("type"),
                method, value;

            for (method in $.validator.methods) {

                // support for <input required> in both html5 and older browsers
                if (method === "required") {
                    value = element.getAttribute(method);

                    // Some browsers return an empty string for the required attribute
                    // and non-HTML5 browsers might have required="" markup
                    if (value === "") {
                        value = true;
                    }

                    // force non-HTML5 browsers to return bool
                    value = !!value;
                } else {
                    value = $element.attr(method);
                }

                this.normalizeAttributeRule(rules, type, method, value);
            }

            // maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                delete rules.maxlength;
            }

            return rules;
        },

        dataRules: function (element) {
            var rules = {},
                $element = $(element),
                type = element.getAttribute("type"),
                method, value;

            for (method in $.validator.methods) {
                value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
                this.normalizeAttributeRule(rules, type, method, value);
            }
            return rules;
        },

        staticRules: function (element) {
            var rules = {},
                validator = $.data(element.form, "validator");

            if (validator.settings.rules) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
        },

        normalizeRules: function (rules, element) {
            // handle dependency check
            $.each(rules, function (prop, val) {
                // ignore rule when param is explicitly false, eg. required:false
                if (val === false) {
                    delete rules[prop];
                    return;
                }
                if (val.param || val.depends) {
                    var keepRule = true;
                    switch (typeof val.depends) {
                        case "string":
                            keepRule = !!$(val.depends, element.form).length;
                            break;
                        case "function":
                            keepRule = val.depends.call(element, element);
                            break;
                    }
                    if (keepRule) {
                        rules[prop] = val.param !== undefined ? val.param : true;
                    } else {
                        delete rules[prop];
                    }
                }
            });

            // evaluate parameters
            $.each(rules, function (rule, parameter) {
                rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
            });

            // clean number parameters
            $.each(["minlength", "maxlength"], function () {
                if (rules[this]) {
                    rules[this] = Number(rules[this]);
                }
            });
            $.each(["rangelength", "range"], function () {
                var parts;
                if (rules[this]) {
                    if ($.isArray(rules[this])) {
                        rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                    } else if (typeof rules[this] === "string") {
                        parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                        rules[this] = [Number(parts[0]), Number(parts[1])];
                    }
                }
            });

            if ($.validator.autoCreateRanges) {
                // auto-create ranges
                if (rules.min != null && rules.max != null) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max;
                }
                if (rules.minlength != null && rules.maxlength != null) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }

            return rules;
        },

        // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
        normalizeRule: function (data) {
            if (typeof data === "string") {
                var transformed = {};
                $.each(data.split(/\s/), function () {
                    transformed[this] = true;
                });
                data = transformed;
            }
            return data;
        },

        // http://jqueryvalidation.org/jQuery.validator.addMethod/
        addMethod: function (name, method, message) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
            if (method.length < 3) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name));
            }
        },

        methods: {

            // http://jqueryvalidation.org/required-method/
            required: function (value, element, param) {
                // check if dependency is met
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                if (element.nodeName.toLowerCase() === "select") {
                    // could be an array for select-multiple or a string, both are fine this way
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if (this.checkable(element)) {
                    return this.getLength(value, element) > 0;
                }
                return value.length > 0;
            },

            // http://jqueryvalidation.org/email-method/
            email: function (value, element) {
                // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
                // Retrieved 2014-01-14
                // If you have a problem with this implementation, report a bug against the above spec
                // Or use custom methods to implement your own email validation
                return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },

            // http://jqueryvalidation.org/url-method/
            url: function (value, element) {

                // Copyright (c) 2010-2013 Diego Perini, MIT licensed
                // https://gist.github.com/dperini/729294
                // see also https://mathiasbynens.be/demo/url-regex
                // modified to allow protocol-relative URLs
                return this.optional(element) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
            },

            // http://jqueryvalidation.org/date-method/
            date: function (value, element) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
            },

            // http://jqueryvalidation.org/dateISO-method/
            dateISO: function (value, element) {
                return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
            },

            // http://jqueryvalidation.org/number-method/
            number: function (value, element) {
                return this.optional(element) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },

            // http://jqueryvalidation.org/digits-method/
            digits: function (value, element) {
                return this.optional(element) || /^\d+$/.test(value);
            },

            // http://jqueryvalidation.org/creditcard-method/
            // based on http://en.wikipedia.org/wiki/Luhn_algorithm
            creditcard: function (value, element) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }
                // accept only spaces, digits and dashes
                if (/[^0-9 \-]+/.test(value)) {
                    return false;
                }
                var nCheck = 0,
                    nDigit = 0,
                    bEven = false,
                    n, cDigit;

                value = value.replace(/\D/g, "");

                // Basing min and max length on
                // http://developer.ean.com/general_info/Valid_Credit_Card_Types
                if (value.length < 13 || value.length > 19) {
                    return false;
                }

                for (n = value.length - 1; n >= 0; n--) {
                    cDigit = value.charAt(n);
                    nDigit = parseInt(cDigit, 10);
                    if (bEven) {
                        if (( nDigit *= 2 ) > 9) {
                            nDigit -= 9;
                        }
                    }
                    nCheck += nDigit;
                    bEven = !bEven;
                }

                return ( nCheck % 10 ) === 0;
            },

            // http://jqueryvalidation.org/minlength-method/
            minlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length >= param;
            },

            // http://jqueryvalidation.org/maxlength-method/
            maxlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length <= param;
            },

            // http://jqueryvalidation.org/rangelength-method/
            rangelength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || ( length >= param[0] && length <= param[1] );
            },

            // http://jqueryvalidation.org/min-method/
            min: function (value, element, param) {
                return this.optional(element) || value >= param;
            },

            // http://jqueryvalidation.org/max-method/
            max: function (value, element, param) {
                return this.optional(element) || value <= param;
            },

            // http://jqueryvalidation.org/range-method/
            range: function (value, element, param) {
                return this.optional(element) || ( value >= param[0] && value <= param[1] );
            },

            // http://jqueryvalidation.org/equalTo-method/
            equalTo: function (value, element, param) {
                // bind to the blur event of the target in order to revalidate whenever the target field is updated
                // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
                var target = $(param);
                if (this.settings.onfocusout) {
                    target.off(".validate-equalTo").on("blur.validate-equalTo", function () {
                        $(element).valid();
                    });
                }
                return value === target.val();
            },

            // http://jqueryvalidation.org/remote-method/
            remote: function (value, element, param) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }

                var previous = this.previousValue(element),
                    validator, data;

                if (!this.settings.messages[element.name]) {
                    this.settings.messages[element.name] = {};
                }
                previous.originalMessage = this.settings.messages[element.name].remote;
                this.settings.messages[element.name].remote = previous.message;

                param = typeof param === "string" && {url: param} || param;

                if (previous.old === value) {
                    return previous.valid;
                }

                previous.old = value;
                validator = this;
                this.startRequest(element);
                data = {};
                data[element.name] = value;
                $.ajax($.extend(true, {
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    context: validator.currentForm,
                    success: function (response) {
                        var valid = response === true || response === "true",
                            errors, message, submitted;

                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        if (valid) {
                            submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            delete validator.invalid[element.name];
                            validator.showErrors();
                        } else {
                            errors = {};
                            message = response || validator.defaultMessage(element, "remote");
                            errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                            validator.invalid[element.name] = true;
                            validator.showErrors(errors);
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }, param));
                return "pending";
            }
        }

    });

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

    var pendingRequests = {},
        ajax;
// Use a prefilter if available (1.5+)
    if ($.ajaxPrefilter) {
        $.ajaxPrefilter(function (settings, _, xhr) {
            var port = settings.port;
            if (settings.mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = xhr;
            }
        });
    } else {
        // Proxy ajax
        ajax = $.ajax;
        $.ajax = function (settings) {
            var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
                port = ( "port" in settings ? settings : $.ajaxSettings ).port;
            if (mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = ajax.apply(this, arguments);
                return pendingRequests[port];
            }
            return ajax.apply(this, arguments);
        };
    }

}));

$.extend({
    //验证组
    validate: function (object) {
        var result = true;
        var Group = object.ValidationGroup;
        if (Group == undefined) {
            return true;
        }

        jQuery('input[dataType],textarea[dataType],select[dataType]').each(function () {
            if (this.ValidationGroup != undefined && this.ValidationGroup.indexOf(Group) >= 0) {
                if ($(this).attr('validatein') == undefined || $(this).attr('validatein') != 'Server') {
                    var msg = true;
                    msg = $.isValidator(this);
                    if (!msg) {
                        $(this).removeClass('tooltipinputok').addClass('tooltipinputerr');
                        result = false;
                    }
                    else {
                        $(this).removeClass('tooltipinputerr').addClass('tooltipinputok');
                    }
                }
            }
        })
        if (!result) {
            AlertMessage(errMsg);
            errMsg = "";
        }
        return result;
    },
    //验证单个控件
    isValidator: function (object) {
        var dataType = $(object).attr("dataType");
        var _require = $(object).attr("require");
        //var _maxLength = $(object).attr("maxlength");
        var _msg = $(object).attr("msg");
        if (_require == undefined) {
            _require = "false";
        }
        else {
            _require = _require.toLowerCase();
        }
        if (dataType == undefined) {
            dataType = "empty";
        }
        else {
            dataType = dataType.toLowerCase();
        }
        //alert(_require);
        //是否为空验证
        var msg = true;
        var tempmsg = "";
        if (dataType != undefined) {
            //if(dataType != "Group" && _require != "false" && object.value.length <= 0)
            //  return false;//没有内容且不是组验证
            switch (dataType) {
                case "empty": //无验证
                    if (_require == "false") {
                        msg = true;
                    }
                    break;
                case "chinese": //中文
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isChinese(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入中文！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "english": //英文
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isEnglish(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入英文！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "number": //数字（正整数）
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isNumber(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入数字！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "integer": //整数（正整数和负整数）
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isInteger(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入整数！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "double": //实数（小数）
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isDouble(object);
                        if (!msg) {
                            tempmsg = _msg + "请输入数字！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "unnegative": //非负数实数（小数）
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        if ((object.value.replace(",", "").indexOf(".") < 0 && object.value.replace(",", "").length > 10) || object.value.replace(",", "").indexOf(".") > 9) {
                            tempmsg = _msg + "最长只可以输入10位实数！<br>";
                            msg = false;
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                        else {
                            msg = $.isUnNegative(object);
                            if (!msg) {
                                tempmsg = _msg + "只可以输入大于或等于零的实数！<br>";
                                if (errMsg.indexOf(tempmsg) < 0) {
                                    errMsg += tempmsg;
                                }
                            }
                        }
                    }
                    break;
                case "code": //编码（数字，字母或符号）
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isValidCode(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入数字或英文字母！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "currency": //货币格式
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isCurrency(object);
                        if (!msg) {
                            //tempmsg = _msg + "只可以输入货币金额(可以是正负的数字)！<br>";
                            tempmsg = _msg + "只可以输入货币金额(只可以是正数的数字)！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "qq": //QQ
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isQQ(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入QQ号码！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "date": //Date
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isDate(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入日期！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "email": //邮箱地址
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isEmail(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入邮箱地址！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "url": //Url地址
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isURL(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入Url地址！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "ip": //IP地址
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isIpAddress(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入IP地址！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "zip": //邮编
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isPostalCode(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入邮编！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "idcard": //身份证
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isIDCard(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入身份证！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "phone": //电话号话
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isPhoneCall(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入电话号码！如:0755-83349047 <br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "multphone": //电话号话
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isMultPhoneCall(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入电话号码！如:0755-83349047，如有多个请用\"/\"分隔! <br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "fax": //传真号话
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isPhoneCall(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入传真号码！如:0755-83349047 <br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "phoneormobile": //电话或者手机号码
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isPhoneCall(object) || $.isMobile(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入电话号码或者手机号码 <br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "mobile": //手机号码
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isMobile(object);
                        if (!msg) {
                            tempmsg = _msg + "只可以输入手机号码！如:13500000000<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "username": //用户名，长度在1-50之间的，只包含字母，数字和下划线
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isValidUserName(object);
                        if (!msg) {
                            tempmsg = _msg + "：长度在1-50之间的，只包含字母，数字和下划线！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "password": //密码，长度在6-20之间
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isValidPass(object);
                        if (!msg) {
                            tempmsg = _msg + "：长度至少6位,字母和数字及特殊字符组合！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                    }
                    break;
                case "repeat": //重复输入
                    msg = $.isRepeat(object);
                    if (!msg) {
                        tempmsg = _msg;
                        if (errMsg.indexOf(tempmsg) < 0) {
                            errMsg += tempmsg;
                        }
                    }
                    break;
                case "compare": //关系比较
                    msg = $.isCompare(object);
                    //alert(msg);
                    break;
                case "range": //输入范围
                    if (_require == "true" || (_require == "false" && object.value.length > 0)) {
                        msg = $.isDouble(object);
                        if (!msg) {
                            tempmsg = _msg + "只可输入数字！<br>";
                            if (errMsg.indexOf(tempmsg) < 0) {
                                errMsg += tempmsg;
                            }
                        }
                        else {
                            msg = $.isRange(object);
                            if (!msg) {
                                var min = $(object).attr('min');
                                var max = $(object).attr('max');
                                tempmsg = _msg + "必须在" + min + "-" + max + "之间！<br>";
                                if (errMsg.indexOf(tempmsg) < 0) {
                                    errMsg += tempmsg;
                                }
                            }
                        }
                    }
                    break;
                case "limit": //限制输入长度
                    msg = $.isLimit(object);
                    break;
                case "limitb": //限制输入的字节长度
                    msg = $.isLimitB(object);
                    break;
                case "group": //验证单/多选按钮组
                    msg = $.isGroup(object);
                    if (!msg) {
                        tempmsg = _msg + "必须选择！<br>";
                        if (errMsg.indexOf(tempmsg) < 0) {
                            errMsg += tempmsg;
                        }
                    }
                    break;
                case "select":
                    msg = $.isSelect(object);
                    break;
                case "custom":
                    var resultMsg = $.Custom(object);
                    if (resultMsg == undefined) {
                        msg = false;
                        errMsg += object.id + '验证失败！<br>';
                        break;
                    }
                    if (resultMsg.length > 0) {
                        msg = false;
                        tempmsg = resultMsg;
                        if (errMsg.indexOf(tempmsg) < 0) {
                            errMsg += tempmsg;
                        }
                    }
                    else {
                        msg = true;
                    }
                    break;
            }
        }

        var test = /\s*/;
        if (_require == "true" && object.value.replace(test, "").length <= 0) {
            errMsg += _msg + "不可以为空！<br>";
            msg = false;
        }
        //文本长度验证
        if (object.value.length > object.maxlength) {
            errMsg += _msg + "超过长度限制！最大长度为" + object.maxlength + "个字符。<br>";
            msg = false;
        }
        return msg;
    },
    isValidatorAsync: function (object) {
        var dataType = $(object).attr("dataType");
        var _require = $(object).attr("require");
        if (_require == undefined) {
            _require = "true"
        }
        var msg = true;
        if (dataType != undefined) {
            switch (dataType) {
                case "UserName": //必填
                    $.serverValidate(object,
                        function (data) {
                            if (data == "success") {
                                //  $(object).removeClass('tooltipinputloading').addClass('tooltipinputok');
                            }
                            else {
                                //  $(object).removeClass('tooltipinputloading').addClass('tooltipinputerr');
                            }
                        },
                        function (data, statu) {
                            //  $(object).removeClass('tooltipinputloading').addClass('tooltipinputerr');
                        });
                    break;
            }
        }
        return msg;
    },
    getWidth: function (object) {
        return object.offsetWidth;
    },
    getLeft: function (object) {
        var go = object;
        var oParent, oLeft = go.offsetLeft;
        while (go.offsetParent != null) {
            oParent = go.offsetParent;
            oLeft += oParent.offsetLeft;
            go = oParent;
        }
        return oLeft;
    },
    getTop: function (object) {
        var go = object;
        var oParent, oTop = go.offsetTop;
        while (go.offsetParent != null) {
            oParent = go.offsetParent;
            oTop += oParent.offsetTop;
            go = oParent;
        }
        return oTop + 22;
    },
    //去除左边的空格
    ltrim: function (_str) {
        return _str.replace(/(^\s*)/g, "");
    },
    //去除右边的空格
    rtrim: function (_str) {
        return _str.replace(/(\s*$)/g, "");
    },
    //因为jquery本身已经有了trim方法,故这里不再重新定义
    //计算字符串长度，一个双字节字符长度计2，ASCII字符计1
    lengthw: function (_str) {
        return _str.replace(/[^\x00-\xff]/g, "rr").length;
    },
    //转换为大写
    toUpper: function (_str) {
        return _str.toUpperCase();
    },
    //转换为小写
    toLower: function (_str) {
        return _str.toLowerCase();
    },
    //15位身份证转换为18位,如果参数字符串中有非数字字符,则返回"#"表示参数不正确
    idCardUpdate: function (_str) {
        var idCard18;
        var regIDCard15 = /^(\d){15}$/;
        if (regIDCard15.test(_str)) {
            var nTemp = 0;
            var ArrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var ArrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            _str = _str.substr(0, 6) + '1' + '9' + _str.substr(6, _str.length - 6);
            for (var i = 0; i < _str.length; i++) {
                nTemp += parseInt(_str.substr(i, 1)) * ArrInt[i];
            }
            _str += ArrCh[nTemp % 11];
            idCard18 = _str;
        }
        else {
            idCard18 = "#";
        }
        return idCard18;
    },
    //是否为空字符串
    isEmpty: function (_str) {
        var tmp_str = jQuery.trim(_str);
        return tmp_str.length == 0;
    },
    //是否中文
    isChinese: function (object) {
        return /^[\u4E00-\u9FA5]{0,25}$/.test(object.value);
    },
    //是否英文
    isEnglish: function (object) {
        return /^[A-Za-z \.]+$/.test(object.value);
    },
    //数字（正整数）
    isNumber: function (object) {
        return /^\d+$/.test(object.value);
    },
    //整数（正整数和负整数）
    isInteger: function (object) {
        return /^[-\+]?\d+$/.test(object.value);
    },
    //实数（小数）
    isDouble: function (object) {
        return ((/^[-\+]?(\d){1,3}(,\d{3})*(\.\d+)?$/.test(object.value)) || (/^[-\+]?\d+(\.\d+)?$/.test(object.value)));
        //return ((/^[\+]?(\d){1,3}(,\d{3})*(\.\d+)?$/.test(object.value)) || (/^[\+]?\d+(\.\d+)?$/.test(object.value)));
    },
    //非负数（小数）
    isUnNegative: function (object) {
        return ((/^[\+]?(\d){1,3}(,\d{3})*(\.\d+)?$/.test(object.value)) || (/^[\+]?\d+(\.\d+)?$/.test(object.value)));
    },
    //QQ
    isQQ: function (object) {
        return /^[1-9]\d{3,11}$/.test(object.value);
    },
    //是否为合法电子邮件地址
    isEmail: function (object) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(object.value);
    },
    //是否合法url地址
    isURL: function (object) {
        var regTextUrl = /^(file|http|https|ftp|mms|telnet|news|wais|mailto):\/\/(.+)$/;
        return regTextUrl.test(object.value);
    },
    //是否为合法ip地址
    isIpAddress: function (object) {
        reVal = /^(\d{1}|\d{2}|[0-1]\d{2}|2[0-4]\d|25[0-5])\.(\d{1}|\d{2}|[0-1]\d{2}|2[0-4]\d|25[0-5])\.(\d{1}|\d{2}|[0-1]\d{2}|2[0-4]\d|25[0-5])\.(\d{1}|\d{2}|[0-1]\d{2}|2[0-4]\d|25[0-5])$/;
        return (reVal.test(object.value));
    },
    //是否为合法日期
    isDate: function (object) {
        reVal = /^(\d{4})(-|\/|年)(0?\d{1}|1[0-2])(-|\/|月)(0?\d{1}|[12]\d{1}|3[01])日?$/;
        return (reVal.test(object.value));
    },
    //是否邮政编码(中国)
    isPostalCode: function (object) {
        var regTextPost = /^(\d){6}$/;
        return regTextPost.test(object.value);
    },
    //是否是有效中国身份证
    isIDCard: function (object) {
        var iSum = 0;
        var info = "";
        var sId;
//            var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
        //如果输入的为15位数字,则先转换为18位身份证号
        if (object.value.length == 15)
            sId = jQuery.idCardUpdate(object.value);
        else
            sId = object.value;

        if (!/^\d{17}(\d|x)$/i.test(sId)) {
            return false;
        }
        sId = sId.replace(/x$/i, "a");
//            //非法地区
//            if (aCity[parseInt(sId.substr(0, 2))] == null) {
//                return false;
//            }
        var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"))
        //非法生日
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
            return false;
        }
        for (var i = 17; i >= 0; i--) {
            iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
        }
        if (iSum % 11 != 1) {
            return false;
        }
        return true;
    },
    //是否有效的多行电话号码(中国)以“/”分隔
    isMultPhoneCall: function (object) {
        var phones = new Array;
        phones = object.value.split("/");
        for (var i = 0; i < phones.length; i++) {
            if (!/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{7,8}$)|(^[0-9]{10,12}$)|(^[0-9]{3,4}\-[0-9]{7,8}\-[0-9]{1,5}$)|(^\([0-9]{3,4}\)[0-9]{7,8}([0-9]{1,5})$)/.test(jQuery.trim(phones[i]))) {
                return false
            }
        }
        return true;
    },

    //是否有效的电话号码(中国)
    isPhoneCall: function (object) {
        return /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{7,8}$)|(^[0-9]{10,12}$)|(^[0-9]{3,4}\-[0-9]{7,8}\-[0-9]{1,5}$)|(^\([0-9]{3,4}\)[0-9]{7,8}([0-9]{1,5})$)/.test(object.value);
    },
    //是否有效的手机号码(最新的手机号码段可以是15开头的
    isMobile: function (object) {
        return /^0{0,1}1(3|4|5|8|7)[0-9]{9}$/.test(jQuery.trim(object.value));
    },
    //是否有效用户名,长度在1-50之间的，只包含字母，数字和下划线
    isValidUserName: function (object) {
        return /^\w{1,50}$/.test(object.value);
    },
    //货币格式（小数及有正负）
    isCurrency: function (object) {
        // return /^[-\+]?\d+(\.\d+)?$/.test(object.value);
        //return /^\d+(\.\d+)?$/.test(object.value);
        return /^\d+(\.\d+)?$/.test(object.value);
    },
    //是否有效密码,长度至少6位,字母和数字及特殊字符组合
    isValidPass: function (object) {
        var result = true;
        //包含至少1个特殊字符
        result &= /(^(?=.*\W).{1,}$)|(_).{1,}/.test(object.value);
        //包含至少1个数字
        result &= /^(?=.*\d).{1,}$/.test(object.value);
        //包含至少1个非数字
        result &= /^(?=.*[a-zA-Z]).{1,}$/.test(object.value);
        //包含至少8位
        result &= /^.{6,}$/.test(object.value);
        return result;
    },
    //重复输入
    isRepeat: function (object) {
        var to_obj = document.getElementsByName($(object).attr('to'))[0];
        if (to_obj == undefined) {
            to_obj = document.getElementsById($(object).attr('to'))[0];
        }
        if (to_obj == undefined) {
            return true;
        }
        else {
            if (to_obj == undefined) {
                return true;
            }
            else {
                if (to_obj.value == object.value) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    },
    //关系比较
    isCompare: function (object) {
        var operator = $(object).attr('operator');
        if (operator == undefined) {
            return true;
        }
        else {
            $.compare(object.value, operator, $(object).attr('to'));
        }
    },
    //输入范围
    isRange: function (object) {
        return (new Number($(object).attr('min'))).valueOf() <= (new Number(object.value)).valueOf() && (new Number(object.value)).valueOf() <= (new Number($(object).attr('max'))).valueOf();
    },
    //编码（数字，字母或符号）
    isValidCode: function (object) {
        return /^(\w|-)*$/.test(object.value);
    },
    //限制输入长度
    isLimit: function (object) {
        var min = $(object).attr('min');
        var max = $(object).attr('max');
        var len = object.value.length;
        min = min || 0;
        max = max || Number.MAX_VALUE;
        return min <= len && len <= max;
    },
    //限制输入的字节长度
    isLimitB: function (object) {
        var min = $(object).attr('min');
        var max = $(object).attr('max');
        var len = $.lengthw(object.value);
        min = min || 0;
        max = max || Number.MAX_VALUE;
        return min <= len && len <= max;
    },
    //自定义正则表达式验证
    isCustom: function (object) {
        return new RegExp($(object).attr('regexp'), "g").test(object.value);
    },
    //验证单/多选按钮组
    isGroup: function (object) {
        var tmp = false;
        $('input[ClientName="' + object.ClientName + '"]').each(function () {
            if (this.checked == true) {
                tmp = true;
            }
        })

        return tmp;
    },
    //列表框是否有选择
    isSelect: function (object) {
        if ($(object).val() == "") {
            return false;
        }
        return true;
    },
    //自定义脚本验证
    Custom: function (object) {
        try {
            return eval(($(object).attr('CustomScript')));
        }
        catch (e) {
            return undefined;
        }
    },
    //比较op1和op2的值，operator为比较类型
    compare: function (op1, operator, op2) {
        switch (operator) {
            case "NotEqual":
                return (op1 != op2);
            case "GreaterThan":
                return (op1 > op2);
            case "GreaterThanEqual":
                return (op1 >= op2);
            case "LessThan":
                return (op1 < op2);
            case "LessThanEqual":
                return (op1 <= op2);
            default:
                return (op1 == op2);
        }
    },
    //服务器端验证
    serverValidate: function (obj, successCallback, errorCallBack) {
        var result = false;
        $.ajax({
            type: "GET",
            url: "validateEmail.ashx",
            data: {'param': obj.value},
            success: function (data) {
                successCallback(data);
            },
            error: function (data, status) {
                errorCallBack(data, status);
            }
        });
        return result;
    },

    onsubmit: true
});
//自定义规则
var valRules = [
    {
        name: "chrnum"
        , fn: function (value, element) {
        var chrnum = /^([a-zA-Z0-9]+)$/;
        return this.optional(element) || (chrnum.test(value));
    }
        , msg: "只能输入数字和字母(字符A-Z, a-z, 0-9)"
    }
    , {
        name: "idcard"
        , fn: function (value, element) {
            return this.optional(element) || ($.isIDCard({value:value}) );
        }
        , msg: "请输入合法的身份证号码"
    }
    , {
        name: "isDate"
        , fn: function (value, element) {
            return this.optional(element) || ($.isDate({value:value}) );
        }
        , msg: "请输入合法的"+"日期"
    }
    , {
        name: "mobile"
        , fn: function (value, element) {
            return this.optional(element) || ($.isMobile({value:value}) );
        }
        , msg: "请输入合法的"+"手机"
    }
    , {
        name: "tel"
        , fn: function (value, element) {
            return this.optional(element) || ($.isPhoneCall({value:value}) );
        }
        , msg: "请输入合法的"+"电话"
    }
    , {
        name: "chn"
        , fn: function (value, element) {
            return this.optional(element) || ($.isChinese({value:value}) );
        }
        , msg: "只能输入"+"中文"
    }
    , {
        name: "eng"
        , fn: function (value, element) {
            return this.optional(element) || ($.isEnglish({value:value}) );
        }
        , msg: "只能输入"+"英文"
    }
    , {
        name: "zipcode"
        , fn: function (value, element) {
            return this.optional(element) || ($.isPostalCode({value:value}) );
        }
        , msg: "请输入合法的"+"邮编"
    }
    , {
        name: "validCode"
        , fn: function (value, element) {
            return this.optional(element) || ($.isValidCode({value:value}) );
        }
        , msg: "请输入合法的"+"证件号码"
    }

]

for (var i = 0; i < valRules.length; i++) {
    jQuery.validator.addMethod(valRules[i].name, valRules[i].fn, valRules[i].msg);
}
// 中文字两个字节
jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
    var length = value.length;
    for(var i = 0; i < value.length; i++){
        if(value.charCodeAt(i) > 127){
            length++;
        }
    }
  return this.optional(element) || ( length >= param[0] && length <= param[1] );   
}, $.validator.format("超出长度限制"));