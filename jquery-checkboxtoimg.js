/**
 * Created by zyt on 2014/7/27.
 */

(function() {
    var IMG_CLS = 'img-check';
    var IMG_ON = 'img-check-on';
    var IMG_OFF = 'img-check-off';

    (function($, window, document) {
        var Plugin, defaults, pluginName;

        defaults = {

        };
        pluginName = "checkboxtoimg";

        Plugin = (function() {

            function Plugin(element, options) {
                this.element = element;
                this.options = $.extend(true, {}, defaults, options);
                this._defaults = defaults;
                this._name = pluginName;
                this.init();
            }

            return Plugin;

        })();

        $.extend(Plugin.prototype, {
            init: function() {
                this.parentEl = $(this.element).parents();
                this.imgEl = $('<div class="' + IMG_CLS + '"></div>');
                this.imgEl.insertBefore($(this.element));

                this.cal();

                this.updateImg();
                this.bindChangeEvent();
                this.bindImgElEvent();
            },

            updateImg: function () {
                var value = this.element.checked;
                if (value) {
                    this.imgEl.addClass(IMG_ON);
                    this.imgEl.removeClass(IMG_OFF);
                } else {
                    this.imgEl.addClass(IMG_OFF);
                    this.imgEl.removeClass(IMG_ON);
                }
            },

            cal: function () {
                var left = 0,
                    top = 0;
                this.parentRect = this.parentEl.get(0).getBoundingClientRect();
                this.rect = this.element.getBoundingClientRect();

                left = this.rect.left - this.parentRect.left - 4 /* 默认有4px的margin-left */;
                top = this.rect.top - this.parentRect.top - 3 /* 默认有3px的margin-top */;

                var pos = this.parentEl.css('position');
                if (!pos || pos === 'static') {
                    this.parentEl.css({
                        position: 'relative'
                    });
                }

                this.imgEl.css({
                    left: left,
                    top: top
                });
            },

            bindChangeEvent: function () {
                var me = this;
                $(this.element).change(function () {
                    me.updateImg();
                });
            },

            bindImgElEvent: function () {
                var me = this;
                me.imgEl.click(function () {
                    if (me.imgEl.hasClass(IMG_ON)) {
                        me.element.checked = false;
                    } else {
                        me.element.checked = true;
                    }
                    me.updateImg();
                });
            }
        });

        return $.fn[pluginName] = function(options) {
            return this.each(function() {
                if (!$.data(this, "plugin_" + pluginName)) {
                    return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
                }
            });
        };
    })(jQuery, window, document);

}).call(this);