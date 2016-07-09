function resetadd() {
    $('.submit-con1').css('display', 'block');
    $('.submit-con2').css('display', 'none');
}
function addnext() {
    // var industrytype = $('#industrytype').find('li a.hover').attr('value');
    // var giftfeature = $('#giftfeature').find('li a.hover').attr('value');
    // var budget = $('#budget').find('li a.hover').attr('value');
    // var quantity = $('#clientnumber').find('li a.hover').attr('value');
    // var mobile = $('#mobilenew').val();

    var industrytype = $('#industrytype').find('li a.hover').html();
    var giftfeature = $('#giftfeature').find('li a.hover').html();;
    var budget = $('#budget').find('li a.hover').html();
    var quantity = $('#clientnumber').find('li a.hover').html();
    var mobile = $('#mobilenew').val();

    if (industrytype == undefined) {
        $('#industrytype').parent().find('cite').css({
            'color': '#fd3235'
        });
    } else {
        $('#industrytype').parent().find('cite').css({
            'color': '#666'
        });
    };
//    if (Scenario == undefined) {
//        $('#Scenario').parent().find('cite').css({
//            'color': '#fd3235'
//        });
//    } else {
//        $('#Scenario').parent().find('cite').css({
//            'color': '#666'
//        });
//    };
    if (giftfeature == undefined) {
        $('#giftfeature').parent().find('cite').css({
            'color': '#fd3235'
        });
    } else {
        $('#giftfeature').parent().find('cite').css({
            'color': '#666'
        });
    };
    if (budget == undefined) {
        $('#budget').parent().find('cite').css({
            'color': '#fd3235'
        });
    } else {
        $('#budget').parent().find('cite').css({
            'color': '#666'
        });
    };
    if (quantity == undefined) {
        $('#clientnumber').parent().find('cite').css({
            'color': '#fd3235'
        });
    } else {
        $('#clientnumber').parent().find('cite').css({
            'color': '#666'
        });
    };
    if (mobile != '') {
//        if (isNaN(mobile)) {
//            $('#mobilenew').val('');
//            $('#mobilenew').addClass('newClass');
//            $('#mobilenew').attr('placeholder', '手机号填写有误');
//            return false;
//        }
//        if (mobile.length != 11) {
//            $('#mobilenew').val('');
//            $('#mobilenew').addClass('newClass');
//            $('#mobilenew').attr('placeholder', '手机号填写有误');
//            return false;
//        }
    }else{
    	$('#mobilenew').addClass('newClass');
        $('#mobilenew').attr('placeholder', '请输入联系方式');
        return false;
    }

    if (industrytype !== undefined &&  giftfeature !== undefined && budget !== undefined && quantity !== undefined && mobile !== undefined) { //Scenario !== undefined &&
//        $('.submit-con1').css('display', 'none');
//        $('.submit-con3').css('display', 'block');
        submit_customize_requirement(industrytype,giftfeature,quantity,budget,mobile);
        // alert("提交成功!")
    };
}
/**
 * [submit_customize_requirement description]
 * @param  String usage    [description]
 * @param  String category [description]
 * @param  int quantity [description]
 * @param  int budget   [description]
 * @param  String mobile   [description]
 * @return {[type]}          [description]
 */
function submit_customize_requirement(usage,category,quantity,budget,mobile) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "git_customize_requirement.php",
        data: JSON.stringify({ usage: usage, category: category, quantity: quantity, budget: budget, mobile: mobile }),
        success: function(resp) {
            console.log(resp);
            if(resp.result) {
                alert("您的定制信息已经成功提交！");
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            //alert(textStatus.error + " " + errorThrown);
            if(XMLHttpRequest.status == 403 && errorThrown == "Forbidden") {
                window.location.reload();
            } else {
                console.log(textStatus.error + "" + errorThrown);
            }
        },
        dataType : "json"
    });
}




function addnextnew() {
    $('.submit-con3').css('display', 'none');
    $('.submit-con1').css('display', 'block');
}
function addclientneed() {
    var industrytype = $('#industrytype').find('li a.hover').attr('value');
    var Scenario = $('#Scenario').find('li a.hover').attr('value');
    var giftfeature = $('#giftfeature').find('li a.hover').attr('value');
    var budget = $('#budget').find('li a.hover').attr('value');
    var quantity = $('#clientnumber').find('li a.hover').attr('value');
    var mobile = $('#mobilenew').val();
    var qq = $('#qqnew').val();
    if (mobile != '') {
        if (isNaN(mobile)) {
            $('#mobilenew').val('');
            $('#mobilenew').addClass('newClass');
            $('#mobilenew').attr('placeholder', '手机号填写有误');
            return false;
        }
        if (mobile.length != 11) {
            $('#mobilenew').val('');
            $('#mobilenew').addClass('newClass');
            $('#mobilenew').attr('placeholder', '手机号填写有误');
            return false;
        }
    }
    if (mobile == '' && qq == '') {
        $('#mobilenew').addClass('newClass');
        $('#qqnew').addClass('newClass');
        $('#mobilenew').attr('placeholder', '请填写您的手机号！');
        $('#qqnew').attr('placeholder', '请填写您的QQ号！');
        return false;
    }

//    $.post('http://www.youlipin.com/industry/ajax.php', {
//        'act': 'addNeed',
//        'mobile': mobile,
//        'qq': qq,
//        'industrytype': industrytype,
//        'Scenario': Scenario,
//        'giftfeature': giftfeature,
//        'budget': budget,
//        'quantity': quantity
//    }, function (data) {
//        if (data == 1) {
//            $('.submit-con3').css('display', 'none');
//            $('.submit-con2').css('display', 'block');
//        }
//    });
}
function visitornum() {
    $.post('http://www.youlipin.com/industry/ajax.php', {
        'act': 'getvisitnum'
    }, function (data) {
        $('#visitornum').html(1234);
        return;
    });
}
$(function () {
// visitornum();
    $('#visitornum').text('542');

    var lazyheightnew = 0;
    function navloadnewo() {
        lazyheightnew = parseFloat($(window).scrollTop());
        if (lazyheightnew > 100) {
            $('.tt-list-dingzhi').css({
                'position': 'fixed',
                'bottom': '0px'
            })
        } else {
            $('.tt-list-dingzhi').css({
                'position': 'fixed',
                'bottom': '0px'
            })
        };
    };
    var lazyheightseach = 0;
    function navloadseach() {
        lazyheightseach = parseFloat($(window).scrollTop());
        if (lazyheightseach > 100) {
            $('.suspen').css({
                'position': 'fixed',
                'top': '0px',
                'display': 'block'
            });
        } else {
            $('.suspen').css({
                'position': 'static',
                'display': 'none'
            });
        };
    };
// $(window).bind('scroll', function () {
// navloadnewo();
// // navloadseach();
// });

    var con ='<div class="tt-list-dingzhi clearfix"><div class="submit-con1"><img src="images/suspension-img3.png">' +
    '<span class="close-suspension"><img src="images/suspension-close.png"></span>' +
           '<div  class="fr">   <!--p class="p-num">今天已有 <span id="visitornum">573</span> 人成功获取礼品方案</p-->  <form action=""><div class="divselect" class="hover"><cite>礼品用途</cite>'+
                       '<p>请选择</p>' +
                       '<ul class="content mCustomScrollbar" id="industrytype"> '+
                           '<li><a value="1">日常商务礼赠</a></li><li><a value="2">促销赠品</a></li><li><a value="3">周年庆典</a></li><li><a value="4">活动纪念</a></li> <li><a value="5">员工福利</a></li> <li><a value="6">其他</a></li>' +
                       '</ul><div class="big-bg"></div></div> '+
                  '<div class="divselect" class="hover"><cite>礼品品类</cite><p>请选择</p><ul class="content mCustomScrollbar" id="giftfeature"> <li><a value="1">丝巾</a></li> <li><a value="2">围巾</a></li> <li><a value="3">皮具</a></li> <li><a value="4">伞</a></li> <li><a value="5">领带</a></li><li><a value="6">箱包</a></li> <li><a value="7">配件</a></li><li><a value="8">其他</a></li></ul><div class="big-bg"></div></div> ' +
                  '<div class="divselect" class="hover"><cite>定制数量</cite><p>请选择</p><ul class="content mCustomScrollbar" id="clientnumber"><li><a value="2">50-100</a></li> <li><a value="3">100-300</a></li> <li><a value="4">300-500</a></li> <li><a value="5">500-1000</a></li> <li><a value="6">1000以上</a></li></ul><div class="big-bg"></div></div> ' +
                   '<div class="divselect" class="hover"><cite>单位预算</cite><p>请选择</p><ul class="content mCustomScrollbar" id="budget"> <li><a value="1">50-100</a></li> <li><a value="2">100-300</a></li> <li><a value="3">300-500</a></li> <li><a value="4">500-1000</a></li> <li><a value="5">1000以上</a></li></ul><div class="big-bg"></div></div> ' +
                   ' <!-- div class="divselect" class="hover"><cite>礼品品类</cite><p>请选择</p><ul class="content mCustomScrollbar" id="Scenario"> <li><a value="1">客户维系</a></li> <li><a value="2">广告促销</a></li> <li><a value="3">商务公关</a></li> <li><a value="4">会议礼赠</a></li> <li><a value="5">展会</a></li> <li><a value="6">福利</a></li> <li><a value="7">地推活动</a></li> <li><a value="8">网络活动</a></li> <li><a value="9">教育培训</a></li> <li><a value="10">企业耗材</a></li> <li><a value="11">员工使用</a></li> <li><a value="12">节日庆祝</a></li> <li><a value="13">外事出国</a></li> <li><a value="14">周年庆</a></li> <li><a value="15">开业典礼</a></li> <li><a value="16">其他</a></li></ul><div class="big-bg"></div></div --> '+
                   '<input type="text" class="divselect phone-ipt" id="mobilenew" placeholder="联系方式" value="">' +
                   '<input class="submit-btn" type="button" value="提交" onclick="addnext();">' +
               '</form></div></div>' +
               '<div class="submit-con3" style="display:none;"><form>' +
                   '<img src="images/suspension-img.png">' +
                   '<span class="close-suspension"><img src="images/suspension-close.png"></span>' +
                   '<span class="return-btn" onclick="addnextnew()">返回</span>' +
                   '<input class="submit-btn" type="button" value="提交" onclick="addclientneed()">' +
                   '<div class="submit-con3-con fr">' +
                       '<p class="p1">请输入有效联系方式，便于与您答复方案</p>' +
                       '<p><input type="text" class="phone-ipt" id="mobilenew" placeholder="请填写您的手机号" value=""><input type="text" class="qq-ipt" id="qqnew" placeholder="请填写您的QQ号" value=""></p>' +
                   '</form></div>' +
               '</div>' +
       '<div class="submit-con2" style="display:none;"><span class="close-suspension"><img src="images/suspension-close.png"></span><p>您的定制需求已成功提交，优礼品客服会在10分钟内与您联系！<span>（周一至周五8:30~6:30）</span></p><input class="submit-btn" type="button" value="重新提交"  onclick="resetadd();"></div></div>';
       var imgCon = '<span class="program-con"><img src="images/program-img.png"></span>';

    $('body').append(imgCon);
    $('.welcome_bg').append(con);
    $('.tt-list-dingzhi .submit-con1 .close-suspension').click(function () {
        $(this).parent().parent().css('overflow', 'hidden');
        $(this).parent().parent().animate({
            'height': '0px'
        }, 500);
        $('.program-con').animate({
            'left': '0px'
        }, 500);
        $('.welcome_bg').animate({
            'marginTop': '0px'
        });
    })
    $('.tt-list-dingzhi .submit-con2 .close-suspension').click(function () {
        $(this).parent().parent().parent().css('overflow', 'hidden');
        $(this).parent().parent().parent().animate({
            'height': '0px'
        }, 500);
        $('.program-con').animate({
            'left': '0px'
        }, 500);
        $('.welcome_bg').animate({
            'marginTop': '0px'
        });
    })
    $('.tt-list-dingzhi .submit-con3 .close-suspension').click(function () {
        $(this).parent().parent().parent().css('overflow', 'hidden');
        $(this).parent().parent().parent().animate({
            'height': '0px'
        }, 500);
        $('.program-con').animate({
            'left': '0px'
        }, 500);
        $('.welcome_bg').animate({
            'marginTop': '0px'
        });
    })
    $('.program-con').click(function () {
        $(this).animate({
            'left': '-100%'
        }, 500);
        $('.tt-list-dingzhi').css('overflow', '');
        $('.tt-list-dingzhi').animate({
            'height': '100px'
        }, 500);
    })
    $('.tt-list-dingzhi ul li a').click(function () {
        $(this).parent().siblings().find('a').removeClass('hover');
        $(this).addClass('hover');
    })
    $('.tt-list-dingzhi .divselect ul li').click(function () {
        var txt = $(this).text();
        $(this).parent().parent().parent().parent().find('cite').text(txt);
    });
    $('.tt-list-dingzhi .divselect').click(function(){
    	$(this).children("ul").toggle();
    });
// $(' .tt-list-dingzhi .divselect').toggle(function () {
// $(this).find('ul').show();
// $(this).find('.big-bg').show();
// } , function () {
// $(this).find('ul').hide();
// $(this).find('.big-bg').hide();
// })
})

$(function () {
    var lazyheight = 0;
    function navload() {
        lazyheight = parseFloat($(window).scrollTop());
        if (lazyheight > 230) {
            $('.nav').css({
                'display': 'none'
            });
        } else {
            $('.nav').css({
                'display': 'block'
            });
        };
    };
    $(window).bind('scroll', function () {
        navload();
    });
})
// 底部悬浮代码
!function (a) {
    'function' == typeof define && define.amd ? define(['jquery'], a)  : 'object' == typeof exports ? module.exports = a : a(jQuery)
}(function (a) {
    function b(b) {
        var g = b || window.event,
        h = i.call(arguments, 1),
        j = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
        if (b = a.event.fix(g), b.type = 'mousewheel', 'detail' in g && (m = - 1 * g.detail), 'wheelDelta' in g && (m = g.wheelDelta), 'wheelDeltaY' in g && (m = g.wheelDeltaY), 'wheelDeltaX' in g && (l = - 1 * g.wheelDeltaX), 'axis' in g && g.axis === g.HORIZONTAL_AXIS && (l = - 1 * m, m = 0), j = 0 === m ? l : m, 'deltaY' in g && (m = - 1 * g.deltaY, j = m), 'deltaX' in g && (l = g.deltaX, 0 === m && (j = - 1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, 'mousewheel-line-height');
                j *= q,
                m *= q,
                l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, 'mousewheel-page-height');
                j *= r,
                m *= r,
                l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? 'floor' : 'ceil'](j / f), l = Math[l >= 1 ? 'floor' : 'ceil'](l / f), m = Math[m >= 1 ? 'floor' : 'ceil'](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left,
                p = b.clientY - s.top
            }
            return b.deltaX = l,
            b.deltaY = m,
            b.deltaFactor = f,
            b.offsetX = o,
            b.offsetY = p,
            b.deltaMode = 0,
            h.unshift(b, j, l, m),
            e && clearTimeout(e),
            e = setTimeout(c, 200),
            (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }
    function c() {
        f = null
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && 'mousewheel' === a.type && b % 120 === 0
    }
    var e,
    f,
    g = [
        'wheel',
        'mousewheel',
        'DOMMouseScroll',
        'MozMousePixelScroll'
    ],
    h = 'onwheel' in document || document.documentMode >= 9 ? [
        'wheel'
    ] : [
        'mousewheel',
        'DomMouseScroll',
        'MozMousePixelScroll'
    ],
    i = Array.prototype.slice;
    if (a.event.fixHooks) for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: '3.1.12',
        setup: function () {
            if (this.addEventListener) for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
             else this.onmousewheel = b;
            a.data(this, 'mousewheel-line-height', k.getLineHeight(this)),
            a.data(this, 'mousewheel-page-height', k.getPageHeight(this))
        },
        teardown: function () {
            if (this.removeEventListener) for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
             else this.onmousewheel = null;
            a.removeData(this, 'mousewheel-line-height'),
            a.removeData(this, 'mousewheel-page-height')
        },
        getLineHeight: function (b) {
            var c = a(b),
            d = c['offsetParent' in a.fn ? 'offsetParent' : 'parent']();
            return d.length || (d = a('body')),
            parseInt(d.css('fontSize'), 10) || parseInt(c.css('fontSize'), 10) || 16
        },
        getPageHeight: function (b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind('mousewheel', a)  : this.trigger('mousewheel')
        },
        unmousewheel: function (a) {
            return this.unbind('mousewheel', a)
        }
    })
});
!function (a) {
    'function' == typeof define && define.amd ? define(['jquery'], a)  : 'object' == typeof exports ? module.exports = a : a(jQuery)
}(function (a) {
    function b(b) {
        var g = b || window.event,
        h = i.call(arguments, 1),
        j = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
        if (b = a.event.fix(g), b.type = 'mousewheel', 'detail' in g && (m = - 1 * g.detail), 'wheelDelta' in g && (m = g.wheelDelta), 'wheelDeltaY' in g && (m = g.wheelDeltaY), 'wheelDeltaX' in g && (l = - 1 * g.wheelDeltaX), 'axis' in g && g.axis === g.HORIZONTAL_AXIS && (l = - 1 * m, m = 0), j = 0 === m ? l : m, 'deltaY' in g && (m = - 1 * g.deltaY, j = m), 'deltaX' in g && (l = g.deltaX, 0 === m && (j = - 1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, 'mousewheel-line-height');
                j *= q,
                m *= q,
                l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, 'mousewheel-page-height');
                j *= r,
                m *= r,
                l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? 'floor' : 'ceil'](j / f), l = Math[l >= 1 ? 'floor' : 'ceil'](l / f), m = Math[m >= 1 ? 'floor' : 'ceil'](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left,
                p = b.clientY - s.top
            }
            return b.deltaX = l,
            b.deltaY = m,
            b.deltaFactor = f,
            b.offsetX = o,
            b.offsetY = p,
            b.deltaMode = 0,
            h.unshift(b, j, l, m),
            e && clearTimeout(e),
            e = setTimeout(c, 200),
            (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }
    function c() {
        f = null
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && 'mousewheel' === a.type && b % 120 === 0
    }
    var e,
    f,
    g = [
        'wheel',
        'mousewheel',
        'DOMMouseScroll',
        'MozMousePixelScroll'
    ],
    h = 'onwheel' in document || document.documentMode >= 9 ? [
        'wheel'
    ] : [
        'mousewheel',
        'DomMouseScroll',
        'MozMousePixelScroll'
    ],
    i = Array.prototype.slice;
    if (a.event.fixHooks) for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: '3.1.12',
        setup: function () {
            if (this.addEventListener) for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
             else this.onmousewheel = b;
            a.data(this, 'mousewheel-line-height', k.getLineHeight(this)),
            a.data(this, 'mousewheel-page-height', k.getPageHeight(this))
        },
        teardown: function () {
            if (this.removeEventListener) for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
             else this.onmousewheel = null;
            a.removeData(this, 'mousewheel-line-height'),
            a.removeData(this, 'mousewheel-page-height')
        },
        getLineHeight: function (b) {
            var c = a(b),
            d = c['offsetParent' in a.fn ? 'offsetParent' : 'parent']();
            return d.length || (d = a('body')),
            parseInt(d.css('fontSize'), 10) || parseInt(c.css('fontSize'), 10) || 16
        },
        getPageHeight: function (b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind('mousewheel', a)  : this.trigger('mousewheel')
        },
        unmousewheel: function (a) {
            return this.unbind('mousewheel', a)
        }
    })
});
/*
 * == malihu jquery custom scrollbar plugin == Version: 3.1.3, License: MIT
 * License (MIT)
 */
!function (e) {
    'undefined' != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}(function (e) {
    !function (t) {
        var o = 'function' == typeof define && define.amd,
        a = 'undefined' != typeof module && module.exports,
        n = 'https:' == document.location.protocol ? 'https:' : 'http:',
        i = 'cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js';
        o || (a ? require('jquery-mousewheel') (e)  : e.event.special.mousewheel || e('head').append(decodeURI('%3Cscript src=' + n + '//' + i + '%3E%3C/script%3E'))),
        t()
    }(function () {
        var t,
        o = 'mCustomScrollbar',
        a = 'mCS',
        n = '.mCustomScrollbar',
        i = {
            setTop: 0,
            setLeft: 0,
            axis: 'y',
            scrollbarPosition: 'inside',
            scrollInertia: 950,
            autoDraggerLength: !0,
            alwaysShowScrollbar: 0,
            snapOffset: 0,
            mouseWheel: {
                enable: !0,
                scrollAmount: 'auto',
                axis: 'y',
                deltaFactor: 'auto',
                disableOver: [
                    'select',
                    'option',
                    'keygen',
                    'datalist',
                    'textarea'
                ]
            },
            scrollButtons: {
                scrollType: 'stepless',
                scrollAmount: 'auto'
            },
            keyboard: {
                enable: !0,
                scrollType: 'stepless',
                scrollAmount: 'auto'
            },
            contentTouchScroll: 25,
            documentTouchScroll: !0,
            advanced: {
                autoScrollOnFocus: 'input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable=\'true\']',
                updateOnContentResize: !0,
                updateOnImageLoad: 'auto',
                autoUpdateTimeout: 60
            },
            theme: 'light',
            callbacks: {
                onTotalScrollOffset: 0,
                onTotalScrollBackOffset: 0,
                alwaysTriggerOffsets: !0
            }
        },
        r = 0,
        l = {
        },
        s = window.attachEvent && !window.addEventListener ? 1 : 0,
        c = !1,
        d = [
            'mCSB_dragger_onDrag',
            'mCSB_scrollTools_onDrag',
            'mCS_img_loaded',
            'mCS_disabled',
            'mCS_destroyed',
            'mCS_no_scrollbar',
            'mCS-autoHide',
            'mCS-dir-rtl',
            'mCS_no_scrollbar_y',
            'mCS_no_scrollbar_x',
            'mCS_y_hidden',
            'mCS_x_hidden',
            'mCSB_draggerContainer',
            'mCSB_buttonUp',
            'mCSB_buttonDown',
            'mCSB_buttonLeft',
            'mCSB_buttonRight'
        ],
        u = {
            init: function (t) {
                var t = e.extend(!0, {
                }, i, t),
                o = f.call(this);
                if (t.live) {
                    var s = t.liveSelector || this.selector || n,
                    c = e(s);
                    if ('off' === t.live) return void m(s);
                    l[s] = setTimeout(function () {
                        c.mCustomScrollbar(t),
                        'once' === t.live && c.length && m(s)
                    }, 1500)
                } else m(s);
                return t.setWidth = t.set_width ? t.set_width : t.setWidth,
                t.setHeight = t.set_height ? t.set_height : t.setHeight,
                t.axis = t.horizontalScroll ? 'x' : p(t.axis),
                t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia,
                'object' != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                    enable: !0,
                    scrollAmount: 'auto',
                    axis: 'y',
                    preventDefault: !1,
                    deltaFactor: 'auto',
                    normalizeDelta: !1,
                    invert: !1
                }),
                t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount,
                t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta,
                t.scrollButtons.scrollType = g(t.scrollButtons.scrollType),
                h(t),
                e(o).each(function () {
                    var o = e(this);
                    if (!o.data(a)) {
                        o.data(a, {
                            idx: ++r,
                            opt: t,
                            scrollRatio: {
                                y: null,
                                x: null
                            },
                            overflowed: null,
                            contentReset: {
                                y: null,
                                x: null
                            },
                            bindEvents: !1,
                            tweenRunning: !1,
                            sequential: {
                            },
                            langDir: o.css('direction'),
                            cbOffsets: null,
                            trigger: null,
                            poll: {
                                size: {
                                    o: 0,
                                    n: 0
                                },
                                img: {
                                    o: 0,
                                    n: 0
                                },
                                change: {
                                    o: 0,
                                    n: 0
                                }
                            }
                        });
                        var n = o.data(a),
                        i = n.opt,
                        l = o.data('mcs-axis'),
                        s = o.data('mcs-scrollbar-position'),
                        c = o.data('mcs-theme');
                        l && (i.axis = l),
                        s && (i.scrollbarPosition = s),
                        c && (i.theme = c, h(i)),
                        v.call(this),
                        n && i.callbacks.onCreate && 'function' == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this),
                        e('#mCSB_' + n.idx + '_container img:not(.' + d[2] + ')').addClass(d[2]),
                        u.update.call(null, o)
                    }
                })
            },
            update: function (t, o) {
                var n = t || f.call(this);
                return e(n).each(function () {
                    var t = e(this);
                    if (t.data(a)) {
                        var n = t.data(a),
                        i = n.opt,
                        r = e('#mCSB_' + n.idx + '_container'),
                        l = e('#mCSB_' + n.idx),
                        s = [
                            e('#mCSB_' + n.idx + '_dragger_vertical'),
                            e('#mCSB_' + n.idx + '_dragger_horizontal')
                        ];
                        if (!r.length) return;
                        n.tweenRunning && N(t),
                        o && n && i.callbacks.onBeforeUpdate && 'function' == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this),
                        t.hasClass(d[3]) && t.removeClass(d[3]),
                        t.hasClass(d[4]) && t.removeClass(d[4]),
                        l.css('max-height', 'none'),
                        l.height() !== t.height() && l.css('max-height', t.height()),
                        _.call(this),
                        'y' === i.axis || i.advanced.autoExpandHorizontalScroll || r.css('width', x(r)),
                        n.overflowed = y.call(this),
                        M.call(this),
                        i.autoDraggerLength && S.call(this),
                        b.call(this),
                        T.call(this);
                        var c = [
                            Math.abs(r[0].offsetTop),
                            Math.abs(r[0].offsetLeft)
                        ];
                        'x' !== i.axis && (n.overflowed[0] ? s[0].height() > s[0].parent().height() ? B.call(this)  : (V(t, c[0].toString(), {
                            dir: 'y',
                            dur: 0,
                            overwrite: 'none'
                        }), n.contentReset.y = null)  : (B.call(this), 'y' === i.axis ? k.call(this)  : 'yx' === i.axis && n.overflowed[1] && V(t, c[1].toString(), {
                            dir: 'x',
                            dur: 0,
                            overwrite: 'none'
                        }))),
                        'y' !== i.axis && (n.overflowed[1] ? s[1].width() > s[1].parent().width() ? B.call(this)  : (V(t, c[1].toString(), {
                            dir: 'x',
                            dur: 0,
                            overwrite: 'none'
                        }), n.contentReset.x = null)  : (B.call(this), 'x' === i.axis ? k.call(this)  : 'yx' === i.axis && n.overflowed[0] && V(t, c[0].toString(), {
                            dir: 'y',
                            dur: 0,
                            overwrite: 'none'
                        }))),
                        o && n && (2 === o && i.callbacks.onImageLoad && 'function' == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this)  : 3 === o && i.callbacks.onSelectorChange && 'function' == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this)  : i.callbacks.onUpdate && 'function' == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)),
                        X.call(this)
                    }
                })
            },
            scrollTo: function (t, o) {
                if ('undefined' != typeof t && null != t) {
                    var n = f.call(this);
                    return e(n).each(function () {
                        var n = e(this);
                        if (n.data(a)) {
                            var i = n.data(a),
                            r = i.opt,
                            l = {
                                trigger: 'external',
                                scrollInertia: r.scrollInertia,
                                scrollEasing: 'mcsEaseInOut',
                                moveDragger: !1,
                                timeout: 60,
                                callbacks: !0,
                                onStart: !0,
                                onUpdate: !0,
                                onComplete: !0
                            },
                            s = e.extend(!0, {
                            }, l, o),
                            c = q.call(this, t),
                            d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                            c[0] = Y.call(this, c[0], 'y'),
                            c[1] = Y.call(this, c[1], 'x'),
                            s.moveDragger && (c[0] *= i.scrollRatio.y, c[1] *= i.scrollRatio.x),
                            s.dur = oe() ? 0 : d,
                            setTimeout(function () {
                                null !== c[0] && 'undefined' != typeof c[0] && 'x' !== r.axis && i.overflowed[0] && (s.dir = 'y', s.overwrite = 'all', V(n, c[0].toString(), s)),
                                null !== c[1] && 'undefined' != typeof c[1] && 'y' !== r.axis && i.overflowed[1] && (s.dir = 'x', s.overwrite = 'none', V(n, c[1].toString(), s))
                            }, s.timeout)
                        }
                    })
                }
            },
            stop: function () {
                var t = f.call(this);
                return e(t).each(function () {
                    var t = e(this);
                    t.data(a) && N(t)
                })
            },
            disable: function (t) {
                var o = f.call(this);
                return e(o).each(function () {
                    var o = e(this);
                    if (o.data(a)) {
                        {
                            o.data(a)
                        }
                        X.call(this, 'remove'),
                        k.call(this),
                        t && B.call(this),
                        M.call(this, !0),
                        o.addClass(d[3])
                    }
                })
            },
            destroy: function () {
                var t = f.call(this);
                return e(t).each(function () {
                    var n = e(this);
                    if (n.data(a)) {
                        var i = n.data(a),
                        r = i.opt,
                        l = e('#mCSB_' + i.idx),
                        s = e('#mCSB_' + i.idx + '_container'),
                        c = e('.mCSB_' + i.idx + '_scrollbar');
                        r.live && m(r.liveSelector || e(t).selector),
                        X.call(this, 'remove'),
                        k.call(this),
                        B.call(this),
                        n.removeData(a),
                        K(this, 'mcs'),
                        c.remove(),
                        s.find('img.' + d[2]).removeClass(d[2]),
                        l.replaceWith(s.contents()),
                        n.removeClass(o + ' _' + a + '_' + i.idx + ' ' + d[6] + ' ' + d[7] + ' ' + d[5] + ' ' + d[3]).addClass(d[4])
                    }
                })
            }
        },
        f = function () {
            return 'object' != typeof e(this) || e(this).length < 1 ? n : this
        },
        h = function (t) {
            var o = [
                'rounded',
                'rounded-dark',
                'rounded-dots',
                'rounded-dots-dark'
            ],
            a = [
                'rounded-dots',
                'rounded-dots-dark',
                '3d',
                '3d-dark',
                '3d-thick',
                '3d-thick-dark',
                'inset',
                'inset-dark',
                'inset-2',
                'inset-2-dark',
                'inset-3',
                'inset-3-dark'
            ],
            n = [
                'minimal',
                'minimal-dark'
            ],
            i = [
                'minimal',
                'minimal-dark'
            ],
            r = [
                'minimal',
                'minimal-dark'
            ];
            t.autoDraggerLength = e.inArray(t.theme, o) > - 1 ? !1 : t.autoDraggerLength,
            t.autoExpandScrollbar = e.inArray(t.theme, a) > - 1 ? !1 : t.autoExpandScrollbar,
            t.scrollButtons.enable = e.inArray(t.theme, n) > - 1 ? !1 : t.scrollButtons.enable,
            t.autoHideScrollbar = e.inArray(t.theme, i) > - 1 ? !0 : t.autoHideScrollbar,
            t.scrollbarPosition = e.inArray(t.theme, r) > - 1 ? 'outside' : t.scrollbarPosition
        },
        m = function (e) {
            l[e] && (clearTimeout(l[e]), K(l, e))
        },
        p = function (e) {
            return 'yx' === e || 'xy' === e || 'auto' === e ? 'yx' : 'x' === e || 'horizontal' === e ? 'x' : 'y'
        },
        g = function (e) {
            return 'stepped' === e || 'pixels' === e || 'step' === e || 'click' === e ? 'stepped' : 'stepless'
        },
        v = function () {
            var t = e(this),
            n = t.data(a),
            i = n.opt,
            r = i.autoExpandScrollbar ? ' ' + d[1] + '_expand' : '',
            l = [
                '<div id=\'mCSB_' + n.idx + '_scrollbar_vertical\' class=\'mCSB_scrollTools mCSB_' + n.idx + '_scrollbar mCS-' + i.theme + ' mCSB_scrollTools_vertical' + r + '\'><div class=\'' + d[12] + '\'><div id=\'mCSB_' + n.idx + '_dragger_vertical\' class=\'mCSB_dragger\' style=\'position:absolute;\' oncontextmenu=\'return false;\'><div class=\'mCSB_dragger_bar\' /></div><div class=\'mCSB_draggerRail\' /></div></div>',
                '<div id=\'mCSB_' + n.idx + '_scrollbar_horizontal\' class=\'mCSB_scrollTools mCSB_' + n.idx + '_scrollbar mCS-' + i.theme + ' mCSB_scrollTools_horizontal' + r + '\'><div class=\'' + d[12] + '\'><div id=\'mCSB_' + n.idx + '_dragger_horizontal\' class=\'mCSB_dragger\' style=\'position:absolute;\' oncontextmenu=\'return false;\'><div class=\'mCSB_dragger_bar\' /></div><div class=\'mCSB_draggerRail\' /></div></div>'
            ],
            s = 'yx' === i.axis ? 'mCSB_vertical_horizontal' : 'x' === i.axis ? 'mCSB_horizontal' : 'mCSB_vertical',
            c = 'yx' === i.axis ? l[0] + l[1] : 'x' === i.axis ? l[1] : l[0],
            u = 'yx' === i.axis ? '<div id=\'mCSB_' + n.idx + '_container_wrapper\' class=\'mCSB_container_wrapper\' />' : '',
            f = i.autoHideScrollbar ? ' ' + d[6] : '',
            h = 'x' !== i.axis && 'rtl' === n.langDir ? ' ' + d[7] : '';
            i.setWidth && t.css('width', i.setWidth),
            i.setHeight && t.css('height', i.setHeight),
            i.setLeft = 'y' !== i.axis && 'rtl' === n.langDir ? '989999px' : i.setLeft,
            t.addClass(o + ' _' + a + '_' + n.idx + f + h).wrapInner('<div id=\'mCSB_' + n.idx + '\' class=\'mCustomScrollBox mCS-' + i.theme + ' ' + s + '\'><div id=\'mCSB_' + n.idx + '_container\' class=\'mCSB_container\' style=\'position:relative; top:' + i.setTop + '; left:' + i.setLeft + ';\' dir=' + n.langDir + ' /></div>');
            var m = e('#mCSB_' + n.idx),
            p = e('#mCSB_' + n.idx + '_container');
            'y' === i.axis || i.advanced.autoExpandHorizontalScroll || p.css('width', x(p)),
            'outside' === i.scrollbarPosition ? ('static' === t.css('position') && t.css('position', 'relative'), t.css('overflow', 'visible'), m.addClass('mCSB_outside').after(c))  : (m.addClass('mCSB_inside').append(c), p.wrap(u)),
            w.call(this);
            var g = [
                e('#mCSB_' + n.idx + '_dragger_vertical'),
                e('#mCSB_' + n.idx + '_dragger_horizontal')
            ];
            g[0].css('min-height', g[0].height()),
            g[1].css('min-width', g[1].width())
        },
        x = function (t) {
            var o = [
                t[0].scrollWidth,
                Math.max.apply(Math, t.children().map(function () {
                    return e(this).outerWidth(!0)
                }).get())
            ],
            a = t.parent().width();
            return o[0] > a ? o[0] : o[1] > a ? o[1] : '100%'
        },
        _ = function () {
            var t = e(this),
            o = t.data(a),
            n = o.opt,
            i = e('#mCSB_' + o.idx + '_container');
            if (n.advanced.autoExpandHorizontalScroll && 'y' !== n.axis) {
                i.css({
                    width: 'auto',
                    'min-width': 0,
                    'overflow-x': 'scroll'
                });
                var r = Math.ceil(i[0].scrollWidth);
                3 === n.advanced.autoExpandHorizontalScroll || 2 !== n.advanced.autoExpandHorizontalScroll && r > i.parent().width() ? i.css({
                    width: r,
                    'min-width': '100%',
                    'overflow-x': 'inherit'
                })  : i.css({
                    'overflow-x': 'inherit',
                    position: 'absolute'
                }).wrap('<div class=\'mCSB_h_wrapper\' style=\'position:relative; left:0; width:999999px;\' />').css({
                    width: Math.ceil(i[0].getBoundingClientRect().right + 0.4) - Math.floor(i[0].getBoundingClientRect().left),
                    'min-width': '100%',
                    position: 'relative'
                }).unwrap()
            }
        },
        w = function () {
            var t = e(this),
            o = t.data(a),
            n = o.opt,
            i = e('.mCSB_' + o.idx + '_scrollbar:first'),
            r = ee(n.scrollButtons.tabindex) ? 'tabindex=\'' + n.scrollButtons.tabindex + '\'' : '',
            l = [
                '<a href=\'#\' class=\'' + d[13] + '\' oncontextmenu=\'return false;\' ' + r + ' />',
                '<a href=\'#\' class=\'' + d[14] + '\' oncontextmenu=\'return false;\' ' + r + ' />',
                '<a href=\'#\' class=\'' + d[15] + '\' oncontextmenu=\'return false;\' ' + r + ' />',
                '<a href=\'#\' class=\'' + d[16] + '\' oncontextmenu=\'return false;\' ' + r + ' />'
            ],
            s = [
                'x' === n.axis ? l[2] : l[0],
                'x' === n.axis ? l[3] : l[1],
                l[2],
                l[3]
            ];
            n.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next('.mCSB_scrollTools').prepend(s[2]).append(s[3])
        },
        S = function () {
            var t = e(this),
            o = t.data(a),
            n = e('#mCSB_' + o.idx),
            i = e('#mCSB_' + o.idx + '_container'),
            r = [
                e('#mCSB_' + o.idx + '_dragger_vertical'),
                e('#mCSB_' + o.idx + '_dragger_horizontal')
            ],
            l = [
                n.height() / i.outerHeight(!1),
                n.width() / i.outerWidth(!1)
            ],
            c = [
                parseInt(r[0].css('min-height')),
                Math.round(l[0] * r[0].parent().height()),
                parseInt(r[1].css('min-width')),
                Math.round(l[1] * r[1].parent().width())
            ],
            d = s && c[1] < c[0] ? c[0] : c[1],
            u = s && c[3] < c[2] ? c[2] : c[3];
            r[0].css({
                height: d,
                'max-height': r[0].parent().height() - 10
            }).find('.mCSB_dragger_bar').css({
                'line-height': c[0] + 'px'
            }),
            r[1].css({
                width: u,
                'max-width': r[1].parent().width() - 10
            })
        },
        b = function () {
            var t = e(this),
            o = t.data(a),
            n = e('#mCSB_' + o.idx),
            i = e('#mCSB_' + o.idx + '_container'),
            r = [
                e('#mCSB_' + o.idx + '_dragger_vertical'),
                e('#mCSB_' + o.idx + '_dragger_horizontal')
            ],
            l = [
                i.outerHeight(!1) - n.height(),
                i.outerWidth(!1) - n.width()
            ],
            s = [
                l[0] / (r[0].parent().height() - r[0].height()),
                l[1] / (r[1].parent().width() - r[1].width())
            ];
            o.scrollRatio = {
                y: s[0],
                x: s[1]
            }
        },
        C = function (e, t, o) {
            var a = o ? d[0] + '_expanded' : '',
            n = e.closest('.mCSB_scrollTools');
            'active' === t ? (e.toggleClass(d[0] + ' ' + a), n.toggleClass(d[1]), e[0]._draggable = e[0]._draggable ? 0 : 1)  : e[0]._draggable || ('hide' === t ? (e.removeClass(d[0]), n.removeClass(d[1]))  : (e.addClass(d[0]), n.addClass(d[1])))
        },
        y = function () {
            var t = e(this),
            o = t.data(a),
            n = e('#mCSB_' + o.idx),
            i = e('#mCSB_' + o.idx + '_container'),
            r = null == o.overflowed ? i.height()  : i.outerHeight(!1),
            l = null == o.overflowed ? i.width()  : i.outerWidth(!1),
            s = i[0].scrollHeight,
            c = i[0].scrollWidth;
            return s > r && (r = s),
            c > l && (l = c),
            [
                r > n.height(),
                l > n.width()
            ]
        },
        B = function () {
            var t = e(this),
            o = t.data(a),
            n = o.opt,
            i = e('#mCSB_' + o.idx),
            r = e('#mCSB_' + o.idx + '_container'),
            l = [
                e('#mCSB_' + o.idx + '_dragger_vertical'),
                e('#mCSB_' + o.idx + '_dragger_horizontal')
            ];
            if (N(t), ('x' !== n.axis && !o.overflowed[0] || 'y' === n.axis && o.overflowed[0]) && (l[0].add(r).css('top', 0), V(t, '_resetY')), 'y' !== n.axis && !o.overflowed[1] || 'x' === n.axis && o.overflowed[1]) {
                var s = dx = 0;
                'rtl' === o.langDir && (s = i.width() - r.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)),
                r.css('left', s),
                l[1].css('left', dx),
                V(t, '_resetX')
            }
        },
        T = function () {
            function t() {
                r = setTimeout(function () {
                    e.event.special.mousewheel ? (clearTimeout(r), R.call(o[0]))  : t()
                }, 100)
            }
            var o = e(this),
            n = o.data(a),
            i = n.opt;
            if (!n.bindEvents) {
                if (I.call(this), i.contentTouchScroll && D.call(this), E.call(this), i.mouseWheel.enable) {
                    var r;
                    t()
                }
                L.call(this),
                P.call(this),
                i.advanced.autoScrollOnFocus && z.call(this),
                i.scrollButtons.enable && H.call(this),
                i.keyboard.enable && U.call(this),
                n.bindEvents = !0
            }
        },
        k = function () {
            var t = e(this),
            o = t.data(a),
            n = o.opt,
            i = a + '_' + o.idx,
            r = '.mCSB_' + o.idx + '_scrollbar',
            l = e('#mCSB_' + o.idx + ',#mCSB_' + o.idx + '_container,#mCSB_' + o.idx + '_container_wrapper,' + r + ' .' + d[12] + ',#mCSB_' + o.idx + '_dragger_vertical,#mCSB_' + o.idx + '_dragger_horizontal,' + r + '>a'),
            s = e('#mCSB_' + o.idx + '_container');
            n.advanced.releaseDraggableSelectors && l.add(e(n.advanced.releaseDraggableSelectors)),
            n.advanced.extraDraggableSelectors && l.add(e(n.advanced.extraDraggableSelectors)),
            o.bindEvents && (e(document).add(e(!W() || top.document)).unbind('.' + i), l.each(function () {
                e(this).unbind('.' + i)
            }), clearTimeout(t[0]._focusTimeout), K(t[0], '_focusTimeout'), clearTimeout(o.sequential.step), K(o.sequential, 'step'), clearTimeout(s[0].onCompleteTimeout), K(s[0], 'onCompleteTimeout'), o.bindEvents = !1)
        },
        M = function (t) {
            var o = e(this),
            n = o.data(a),
            i = n.opt,
            r = e('#mCSB_' + n.idx + '_container_wrapper'),
            l = r.length ? r : e('#mCSB_' + n.idx + '_container'),
            s = [
                e('#mCSB_' + n.idx + '_scrollbar_vertical'),
                e('#mCSB_' + n.idx + '_scrollbar_horizontal')
            ],
            c = [
                s[0].find('.mCSB_dragger'),
                s[1].find('.mCSB_dragger')
            ];
            'x' !== i.axis && (n.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children('a')).css('display', 'block'), l.removeClass(d[8] + ' ' + d[10]))  : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css('display', 'none'), l.removeClass(d[10]))  : (s[0].css('display', 'none'), l.addClass(d[10])), l.addClass(d[8]))),
            'y' !== i.axis && (n.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children('a')).css('display', 'block'), l.removeClass(d[9] + ' ' + d[11]))  : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css('display', 'none'), l.removeClass(d[11]))  : (s[1].css('display', 'none'), l.addClass(d[11])), l.addClass(d[9]))),
            n.overflowed[0] || n.overflowed[1] ? o.removeClass(d[5])  : o.addClass(d[5])
        },
        O = function (t) {
            var o = t.type,
            a = t.target.ownerDocument !== document ? [
                e(frameElement).offset().top,
                e(frameElement).offset().left
            ] : null,
            n = W() && t.target.ownerDocument !== top.document ? [
                e(t.view.frameElement).offset().top,
                e(t.view.frameElement).offset().left
            ] : [
                0,
                0
            ];
            switch (o) {
                case 'pointerdown':
                case 'MSPointerDown':
                case 'pointermove':
                case 'MSPointerMove':
                case 'pointerup':
                case 'MSPointerUp':
                    return a ? [
                        t.originalEvent.pageY - a[0] + n[0],
                        t.originalEvent.pageX - a[1] + n[1],
                        !1
                    ] : [
                        t.originalEvent.pageY,
                        t.originalEvent.pageX,
                        !1
                    ];
                case 'touchstart':
                case 'touchmove':
                case 'touchend':
                    var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
                    r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
                    return t.target.ownerDocument !== document ? [
                        i.screenY,
                        i.screenX,
                        r > 1
                    ] : [
                        i.pageY,
                        i.pageX,
                        r > 1
                    ];
                default:
                    return a ? [
                        t.pageY - a[0] + n[0],
                        t.pageX - a[1] + n[1],
                        !1
                    ] : [
                        t.pageY,
                        t.pageX,
                        !1
                    ]
            }
        },
        I = function () {
            function t(e) {
                var t = m.find('iframe');
                if (t.length) {
                    var o = e ? 'auto' : 'none';
                    t.css('pointer-events', o)
                }
            }
            function o(e, t, o, a) {
                if (m[0].idleTimer = u.scrollInertia < 233 ? 250 : 0, n.attr('id') === h[1]) var i = 'x',
                r = (n[0].offsetLeft - t + a) * d.scrollRatio.x;
                 else var i = 'y',
                r = (n[0].offsetTop - e + o) * d.scrollRatio.y;
                V(l, r.toString(), {
                    dir: i,
                    drag: !0
                })
            }
            var n,
            i,
            r,
            l = e(this),
            d = l.data(a),
            u = d.opt,
            f = a + '_' + d.idx,
            h = [
                'mCSB_' + d.idx + '_dragger_vertical',
                'mCSB_' + d.idx + '_dragger_horizontal'
            ],
            m = e('#mCSB_' + d.idx + '_container'),
            p = e('#' + h[0] + ',#' + h[1]),
            g = u.advanced.releaseDraggableSelectors ? p.add(e(u.advanced.releaseDraggableSelectors))  : p,
            v = u.advanced.extraDraggableSelectors ? e(!W() || top.document).add(e(u.advanced.extraDraggableSelectors))  : e(!W() || top.document);
            p.bind('mousedown.' + f + ' touchstart.' + f + ' pointerdown.' + f + ' MSPointerDown.' + f, function (o) {
                if (o.stopImmediatePropagation(), o.preventDefault(), Z(o)) {
                    c = !0,
                    s && (document.onselectstart = function () {
                        return !1
                    }),
                    t(!1),
                    N(l),
                    n = e(this);
                    var a = n.offset(),
                    d = O(o) [0] - a.top,
                    f = O(o) [1] - a.left,
                    h = n.height() + a.top,
                    m = n.width() + a.left;
                    h > d && d > 0 && m > f && f > 0 && (i = d, r = f),
                    C(n, 'active', u.autoExpandScrollbar)
                }
            }).bind('touchmove.' + f, function (e) {
                e.stopImmediatePropagation(),
                e.preventDefault();
                var t = n.offset(),
                a = O(e) [0] - t.top,
                l = O(e) [1] - t.left;
                o(i, r, a, l)
            }),
            e(document).add(v).bind('mousemove.' + f + ' pointermove.' + f + ' MSPointerMove.' + f, function (e) {
                if (n) {
                    var t = n.offset(),
                    a = O(e) [0] - t.top,
                    l = O(e) [1] - t.left;
                    if (i === a && r === l) return;
                    o(i, r, a, l)
                }
            }).add(g).bind('mouseup.' + f + ' touchend.' + f + ' pointerup.' + f + ' MSPointerUp.' + f, function (e) {
                n && (C(n, 'active', u.autoExpandScrollbar), n = null),
                c = !1,
                s && (document.onselectstart = null),
                t(!0)
            })
        },
        D = function () {
            function o(e) {
                if (!$(e) || c || O(e) [2]) return void (t = 0);
                t = 1,
                b = 0,
                C = 0,
                d = 1,
                y.removeClass('mCS_touch_action');
                var o = I.offset();
                u = O(e) [0] - o.top,
                f = O(e) [1] - o.left,
                z = [
                    O(e) [0],
                    O(e) [1]
                ]
            }
            function n(e) {
                if ($(e) && !c && !O(e) [2] && (T.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!C || b) && d)) {
                    g = G();
                    var t = M.offset(),
                    o = O(e) [0] - t.top,
                    a = O(e) [1] - t.left,
                    n = 'mcsLinearOut';
                    if (E.push(o), R.push(a), z[2] = Math.abs(O(e) [0] - z[0]), z[3] = Math.abs(O(e) [1] - z[1]), B.overflowed[0]) var i = D[0].parent().height() - D[0].height(),
                    r = u - o > 0 && o - u > - (i * B.scrollRatio.y) && (2 * z[3] < z[2] || 'yx' === T.axis);
                    if (B.overflowed[1]) var l = D[1].parent().width() - D[1].width(),
                    h = f - a > 0 && a - f > - (l * B.scrollRatio.x) && (2 * z[2] < z[3] || 'yx' === T.axis);
                    r || h ? (U || e.preventDefault(), b = 1)  : (C = 1, y.addClass('mCS_touch_action')),
                    U && e.preventDefault(),
                    w = 'yx' === T.axis ? [
                        u - o,
                        f - a
                    ] : 'x' === T.axis ? [
                        null,
                        f - a
                    ] : [
                        u - o,
                        null
                    ],
                    I[0].idleTimer = 250,
                    B.overflowed[0] && s(w[0], A, n, 'y', 'all', !0),
                    B.overflowed[1] && s(w[1], A, n, 'x', L, !0)
                }
            }
            function i(e) {
                if (!$(e) || c || O(e) [2]) return void (t = 0);
                t = 1,
                e.stopImmediatePropagation(),
                N(y),
                p = G();
                var o = M.offset();
                h = O(e) [0] - o.top,
                m = O(e) [1] - o.left,
                E = [
                ],
                R = [
                ]
            }
            function r(e) {
                if ($(e) && !c && !O(e) [2]) {
                    d = 0,
                    e.stopImmediatePropagation(),
                    b = 0,
                    C = 0,
                    v = G();
                    var t = M.offset(),
                    o = O(e) [0] - t.top,
                    a = O(e) [1] - t.left;
                    if (!(v - g > 30)) {
                        _ = 1000 / (v - p);
                        var n = 'mcsEaseOut',
                        i = 2.5 > _,
                        r = i ? [
                            E[E.length - 2],
                            R[R.length - 2]
                        ] : [
                            0,
                            0
                        ];
                        x = i ? [
                            o - r[0],
                            a - r[1]
                        ] : [
                            o - h,
                            a - m
                        ];
                        var u = [
                            Math.abs(x[0]),
                            Math.abs(x[1])
                        ];
                        _ = i ? [
                            Math.abs(x[0] / 4),
                            Math.abs(x[1] / 4)
                        ] : [
                            _,
                            _
                        ];
                        var f = [
                            Math.abs(I[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]),
                            Math.abs(I[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1])
                        ];
                        w = 'yx' === T.axis ? [
                            f[0],
                            f[1]
                        ] : 'x' === T.axis ? [
                            null,
                            f[1]
                        ] : [
                            f[0],
                            null
                        ],
                        S = [
                            4 * u[0] + T.scrollInertia,
                            4 * u[1] + T.scrollInertia
                        ];
                        var y = parseInt(T.contentTouchScroll) || 0;
                        w[0] = u[0] > y ? w[0] : 0,
                        w[1] = u[1] > y ? w[1] : 0,
                        B.overflowed[0] && s(w[0], S[0], n, 'y', L, !1),
                        B.overflowed[1] && s(w[1], S[1], n, 'x', L, !1)
                    }
                }
            }
            function l(e, t) {
                var o = [
                    1.5 * t,
                    2 * t,
                    t / 1.5,
                    t / 2
                ];
                return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3]
            }
            function s(e, t, o, a, n, i) {
                e && V(y, e.toString(), {
                    dur: t,
                    scrollEasing: o,
                    dir: a,
                    overwrite: n,
                    drag: i
                })
            }
            var d,
            u,
            f,
            h,
            m,
            p,
            g,
            v,
            x,
            _,
            w,
            S,
            b,
            C,
            y = e(this),
            B = y.data(a),
            T = B.opt,
            k = a + '_' + B.idx,
            M = e('#mCSB_' + B.idx),
            I = e('#mCSB_' + B.idx + '_container'),
            D = [
                e('#mCSB_' + B.idx + '_dragger_vertical'),
                e('#mCSB_' + B.idx + '_dragger_horizontal')
            ],
            E = [
            ],
            R = [
            ],
            A = 0,
            L = 'yx' === T.axis ? 'none' : 'all',
            z = [
            ],
            P = I.find('iframe'),
            H = [
                'touchstart.' + k + ' pointerdown.' + k + ' MSPointerDown.' + k,
                'touchmove.' + k + ' pointermove.' + k + ' MSPointerMove.' + k,
                'touchend.' + k + ' pointerup.' + k + ' MSPointerUp.' + k
            ],
            U = void 0 !== document.body.style.touchAction;
            I.bind(H[0], function (e) {
                o(e)
            }).bind(H[1], function (e) {
                n(e)
            }),
            M.bind(H[0], function (e) {
                i(e)
            }).bind(H[2], function (e) {
                r(e)
            }),
            P.length && P.each(function () {
                e(this).load(function () {
                    W(this) && e(this.contentDocument || this.contentWindow.document).bind(H[0], function (e) {
                        o(e),
                        i(e)
                    }).bind(H[1], function (e) {
                        n(e)
                    }).bind(H[2], function (e) {
                        r(e)
                    })
                })
            })
        },
        E = function () {
            function o() {
                return window.getSelection ? window.getSelection().toString()  : document.selection && 'Control' != document.selection.type ? document.selection.createRange().text : 0
            }
            function n(e, t, o) {
                d.type = o && i ? 'stepped' : 'stepless',
                d.scrollAmount = 10,
                F(r, e, t, 'mcsLinearOut', o ? 60 : null)
            }
            var i,
            r = e(this),
            l = r.data(a),
            s = l.opt,
            d = l.sequential,
            u = a + '_' + l.idx,
            f = e('#mCSB_' + l.idx + '_container'),
            h = f.parent();
            f.bind('mousedown.' + u, function (e) {
                t || i || (i = 1, c = !0)
            }).add(document).bind('mousemove.' + u, function (e) {
                if (!t && i && o()) {
                    var a = f.offset(),
                    r = O(e) [0] - a.top + f[0].offsetTop,
                    c = O(e) [1] - a.left + f[0].offsetLeft;
                    r > 0 && r < h.height() && c > 0 && c < h.width() ? d.step && n('off', null, 'stepped')  : ('x' !== s.axis && l.overflowed[0] && (0 > r ? n('on', 38)  : r > h.height() && n('on', 40)), 'y' !== s.axis && l.overflowed[1] && (0 > c ? n('on', 37)  : c > h.width() && n('on', 39)))
                }
            }).bind('mouseup.' + u + ' dragend.' + u, function (e) {
                t || (i && (i = 0, n('off', null)), c = !1)
            })
        },
        R = function () {
            function t(t, a) {
                if (N(o), !A(o, t.target)) {
                    var r = 'auto' !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor)  : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100,
                    d = i.scrollInertia;
                    if ('x' === i.axis || 'x' === i.mouseWheel.axis) var u = 'x',
                    f = [
                        Math.round(r * n.scrollRatio.x),
                        parseInt(i.mouseWheel.scrollAmount)
                    ],
                    h = 'auto' !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.width() ? 0.9 * l.width()  : f[0],
                    m = Math.abs(e('#mCSB_' + n.idx + '_container') [0].offsetLeft),
                    p = c[1][0].offsetLeft,
                    g = c[1].parent().width() - c[1].width(),
                    v = t.deltaX || t.deltaY || a;
                     else var u = 'y',
                    f = [
                        Math.round(r * n.scrollRatio.y),
                        parseInt(i.mouseWheel.scrollAmount)
                    ],
                    h = 'auto' !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.height() ? 0.9 * l.height()  : f[0],
                    m = Math.abs(e('#mCSB_' + n.idx + '_container') [0].offsetTop),
                    p = c[0][0].offsetTop,
                    g = c[0].parent().height() - c[0].height(),
                    v = t.deltaY || a;
                    'y' === u && !n.overflowed[0] || 'x' === u && !n.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = - v), i.mouseWheel.normalizeDelta && (v = 0 > v ? - 1 : 1), (v > 0 && 0 !== p || 0 > v && p !== g || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), t.deltaFactor < 2 && !i.mouseWheel.normalizeDelta && (h = t.deltaFactor, d = 17), V(o, (m - v * h).toString(), {
                        dir: u,
                        dur: d
                    }))
                }
            }
            if (e(this).data(a)) {
                var o = e(this),
                n = o.data(a),
                i = n.opt,
                r = a + '_' + n.idx,
                l = e('#mCSB_' + n.idx),
                c = [
                    e('#mCSB_' + n.idx + '_dragger_vertical'),
                    e('#mCSB_' + n.idx + '_dragger_horizontal')
                ],
                d = e('#mCSB_' + n.idx + '_container').find('iframe');
                d.length && d.each(function () {
                    e(this).load(function () {
                        W(this) && e(this.contentDocument || this.contentWindow.document).bind('mousewheel.' + r, function (e, o) {
                            t(e, o)
                        })
                    })
                }),
                l.bind('mousewheel.' + r, function (e, o) {
                    t(e, o)
                })
            }
        },
        W = function (e) {
            var t = null;
            if (e) {
                try {
                    var o = e.contentDocument || e.contentWindow.document;
                    t = o.body.innerHTML
                } catch (a) {
                }
                return null !== t
            }
            try {
                var o = top.document;
                t = o.body.innerHTML
            } catch (a) {
            }
            return null !== t
        },
        A = function (t, o) {
            var n = o.nodeName.toLowerCase(),
            i = t.data(a).opt.mouseWheel.disableOver,
            r = [
                'select',
                'textarea'
            ];
            return e.inArray(n, i) > - 1 && !(e.inArray(n, r) > - 1 && !e(o).is(':focus'))
        },
        L = function () {
            var t,
            o = e(this),
            n = o.data(a),
            i = a + '_' + n.idx,
            r = e('#mCSB_' + n.idx + '_container'),
            l = r.parent(),
            s = e('.mCSB_' + n.idx + '_scrollbar .' + d[12]);
            s.bind('mousedown.' + i + ' touchstart.' + i + ' pointerdown.' + i + ' MSPointerDown.' + i, function (o) {
                c = !0,
                e(o.target).hasClass('mCSB_dragger') || (t = 1)
            }).bind('touchend.' + i + ' pointerup.' + i + ' MSPointerUp.' + i, function (e) {
                c = !1
            }).bind('click.' + i, function (a) {
                if (t && (t = 0, e(a.target).hasClass(d[12]) || e(a.target).hasClass('mCSB_draggerRail'))) {
                    N(o);
                    var i = e(this),
                    s = i.find('.mCSB_dragger');
                    if (i.parent('.mCSB_scrollTools_horizontal').length > 0) {
                        if (!n.overflowed[1]) return;
                        var c = 'x',
                        u = a.pageX > s.offset().left ? - 1 : 1,
                        f = Math.abs(r[0].offsetLeft) - 0.9 * u * l.width()
                    } else {
                        if (!n.overflowed[0]) return;
                        var c = 'y',
                        u = a.pageY > s.offset().top ? - 1 : 1,
                        f = Math.abs(r[0].offsetTop) - 0.9 * u * l.height()
                    }
                    V(o, f.toString(), {
                        dir: c,
                        scrollEasing: 'mcsEaseInOut'
                    })
                }
            })
        },
        z = function () {
            var t = e(this),
            o = t.data(a),
            n = o.opt,
            i = a + '_' + o.idx,
            r = e('#mCSB_' + o.idx + '_container'),
            l = r.parent();
            r.bind('focusin.' + i, function (o) {
                var a = e(document.activeElement),
                i = r.find('.mCustomScrollBox').length,
                s = 0;
                a.is(n.advanced.autoScrollOnFocus) && (N(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = i ? (s + 17) * i : 0, t[0]._focusTimeout = setTimeout(function () {
                    var e = [
                        te(a) [0],
                        te(a) [1]
                    ],
                    o = [
                        r[0].offsetTop,
                        r[0].offsetLeft
                    ],
                    i = [
                        o[0] + e[0] >= 0 && o[0] + e[0] < l.height() - a.outerHeight(!1),
                        o[1] + e[1] >= 0 && o[0] + e[1] < l.width() - a.outerWidth(!1)
                    ],
                    c = 'yx' !== n.axis || i[0] || i[1] ? 'all' : 'none';
                    'x' === n.axis || i[0] || V(t, e[0].toString(), {
                        dir: 'y',
                        scrollEasing: 'mcsEaseInOut',
                        overwrite: c,
                        dur: s
                    }),
                    'y' === n.axis || i[1] || V(t, e[1].toString(), {
                        dir: 'x',
                        scrollEasing: 'mcsEaseInOut',
                        overwrite: c,
                        dur: s
                    })
                }, t[0]._focusTimer))
            })
        },
        P = function () {
            var t = e(this),
            o = t.data(a),
            n = a + '_' + o.idx,
            i = e('#mCSB_' + o.idx + '_container').parent();
            i.bind('scroll.' + n, function (t) {
                (0 !== i.scrollTop() || 0 !== i.scrollLeft()) && e('.mCSB_' + o.idx + '_scrollbar').css('visibility', 'hidden')
            })
        },
        H = function () {
            var t = e(this),
            o = t.data(a),
            n = o.opt,
            i = o.sequential,
            r = a + '_' + o.idx,
            l = '.mCSB_' + o.idx + '_scrollbar',
            s = e(l + '>a');
            s.bind('mousedown.' + r + ' touchstart.' + r + ' pointerdown.' + r + ' MSPointerDown.' + r + ' mouseup.' + r + ' touchend.' + r + ' pointerup.' + r + ' MSPointerUp.' + r + ' mouseout.' + r + ' pointerout.' + r + ' MSPointerOut.' + r + ' click.' + r, function (a) {
                function r(e, o) {
                    i.scrollAmount = n.scrollButtons.scrollAmount,
                    F(t, e, o)
                }
                if (a.preventDefault(), Z(a)) {
                    var l = e(this).attr('class');
                    switch (i.type = n.scrollButtons.scrollType, a.type) {
                        case 'mousedown':
                        case 'touchstart':
                        case 'pointerdown':
                        case 'MSPointerDown':
                            if ('stepped' === i.type) return;
                            c = !0,
                            o.tweenRunning = !1,
                            r('on', l);
                            break;
                        case 'mouseup':
                        case 'touchend':
                        case 'pointerup':
                        case 'MSPointerUp':
                        case 'mouseout':
                        case 'pointerout':
                        case 'MSPointerOut':
                            if ('stepped' === i.type) return;
                            c = !1,
                            i.dir && r('off', l);
                            break;
                        case 'click':
                            if ('stepped' !== i.type || o.tweenRunning) return;
                            r('on', l)
                    }
                }
            })
        },
        U = function () {
            function t(t) {
                function a(e, t) {
                    r.type = i.keyboard.scrollType,
                    r.scrollAmount = i.keyboard.scrollAmount,
                    'stepped' === r.type && n.tweenRunning || F(o, e, t)
                }
                switch (t.type) {
                    case 'blur':
                        n.tweenRunning && r.dir && a('off', null);
                        break;
                    case 'keydown':
                    case 'keyup':
                        var l = t.keyCode ? t.keyCode : t.which,
                        s = 'on';
                        if ('x' !== i.axis && (38 === l || 40 === l) || 'y' !== i.axis && (37 === l || 39 === l)) {
                            if ((38 === l || 40 === l) && !n.overflowed[0] || (37 === l || 39 === l) && !n.overflowed[1]) return;
                            'keyup' === t.type && (s = 'off'),
                            e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), a(s, l))
                        } else if (33 === l || 34 === l) {
                            if ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), 'keyup' === t.type) {
                                N(o);
                                var f = 34 === l ? - 1 : 1;
                                if ('x' === i.axis || 'yx' === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = 'x',
                                m = Math.abs(c[0].offsetLeft) - 0.9 * f * d.width();
                                 else var h = 'y',
                                m = Math.abs(c[0].offsetTop) - 0.9 * f * d.height();
                                V(o, m.toString(), {
                                    dir: h,
                                    scrollEasing: 'mcsEaseInOut'
                                })
                            }
                        } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), 'keyup' === t.type)) {
                            if ('x' === i.axis || 'yx' === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = 'x',
                            m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1))  : 0;
                             else var h = 'y',
                            m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1))  : 0;
                            V(o, m.toString(), {
                                dir: h,
                                scrollEasing: 'mcsEaseInOut'
                            })
                        }
                }
            }
            var o = e(this),
            n = o.data(a),
            i = n.opt,
            r = n.sequential,
            l = a + '_' + n.idx,
            s = e('#mCSB_' + n.idx),
            c = e('#mCSB_' + n.idx + '_container'),
            d = c.parent(),
            u = 'input,textarea,select,datalist,keygen,[contenteditable=\'true\']',
            f = c.find('iframe'),
            h = [
                'blur.' + l + ' keydown.' + l + ' keyup.' + l
            ];
            f.length && f.each(function () {
                e(this).load(function () {
                    W(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], function (e) {
                        t(e)
                    })
                })
            }),
            s.attr('tabindex', '0').bind(h[0], function (e) {
                t(e)
            })
        },
        F = function (t, o, n, i, r) {
            function l(e) {
                u.snapAmount && (f.scrollAmount = u.snapAmount instanceof Array ? 'x' === f.dir[0] ? u.snapAmount[1] : u.snapAmount[0] : u.snapAmount);
                var o = 'stepped' !== f.type,
                a = r ? r : e ? o ? p / 1.5 : g : 1000 / 60,
                n = e ? o ? 7.5 : 40 : 2.5,
                s = [
                    Math.abs(h[0].offsetTop),
                    Math.abs(h[0].offsetLeft)
                ],
                d = [
                    c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y,
                    c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x
                ],
                m = 'x' === f.dir[0] ? s[1] + f.dir[1] * d[1] * n : s[0] + f.dir[1] * d[0] * n,
                v = 'x' === f.dir[0] ? s[1] + f.dir[1] * parseInt(f.scrollAmount)  : s[0] + f.dir[1] * parseInt(f.scrollAmount),
                x = 'auto' !== f.scrollAmount ? v : m,
                _ = i ? i : e ? o ? 'mcsLinearOut' : 'mcsEaseInOut' : 'mcsLinear',
                w = e ? !0 : !1;
                return e && 17 > a && (x = 'x' === f.dir[0] ? s[1] : s[0]),
                V(t, x.toString(), {
                    dir: f.dir[0],
                    scrollEasing: _,
                    dur: a,
                    onComplete: w
                }),
                e ? void (f.dir = !1)  : (clearTimeout(f.step), void (f.step = setTimeout(function () {
                    l()
                }, a)))
            }
            function s() {
                clearTimeout(f.step),
                K(f, 'step'),
                N(t)
            }
            var c = t.data(a),
            u = c.opt,
            f = c.sequential,
            h = e('#mCSB_' + c.idx + '_container'),
            m = 'stepped' === f.type ? !0 : !1,
            p = u.scrollInertia < 26 ? 26 : u.scrollInertia,
            g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
            switch (o) {
                case 'on':
                    if (f.dir = [
                        n === d[16] || n === d[15] || 39 === n || 37 === n ? 'x' : 'y',
                        n === d[13] || n === d[15] || 38 === n || 37 === n ? - 1 : 1
                    ], N(t), ee(n) && 'stepped' === f.type) return;
                    l(m);
                    break;
                case 'off':
                    s(),
                    (m || c.tweenRunning && f.dir) && l(!0)
            }
        },
        q = function (t) {
            var o = e(this).data(a).opt,
            n = [
            ];
            return 'function' == typeof t && (t = t()),
            t instanceof Array ? n = t.length > 1 ? [
                t[0],
                t[1]
            ] : 'x' === o.axis ? [
                null,
                t[0]
            ] : [
                t[0],
                null
            ] : (n[0] = t.y ? t.y : t.x || 'x' === o.axis ? null : t, n[1] = t.x ? t.x : t.y || 'y' === o.axis ? null : t),
            'function' == typeof n[0] && (n[0] = n[0]()),
            'function' == typeof n[1] && (n[1] = n[1]()),
            n
        },
        Y = function (t, o) {
            if (null != t && 'undefined' != typeof t) {
                var n = e(this),
                i = n.data(a),
                r = i.opt,
                l = e('#mCSB_' + i.idx + '_container'),
                s = l.parent(),
                c = typeof t;
                o || (o = 'x' === r.axis ? 'x' : 'y');
                var d = 'x' === o ? l.outerWidth(!1)  : l.outerHeight(!1),
                f = 'x' === o ? l[0].offsetLeft : l[0].offsetTop,
                h = 'x' === o ? 'left' : 'top';
                switch (c) {
                    case 'function':
                        return t();
                    case 'object':
                        var m = t.jquery ? t : e(t);
                        if (!m.length) return;
                        return 'x' === o ? te(m) [1] : te(m) [0];
                    case 'string':
                    case 'number':
                        if (ee(t)) return Math.abs(t);
                        if ( - 1 !== t.indexOf('%')) return Math.abs(d * parseInt(t) / 100);
                        if ( - 1 !== t.indexOf('-=')) return Math.abs(f - parseInt(t.split('-=') [1]));
                        if ( - 1 !== t.indexOf('+=')) {
                            var p = f + parseInt(t.split('+=') [1]);
                            return p >= 0 ? 0 : Math.abs(p)
                        }
                        if ( - 1 !== t.indexOf('px') && ee(t.split('px') [0])) return Math.abs(t.split('px') [0]);
                        if ('top' === t || 'left' === t) return 0;
                        if ('bottom' === t) return Math.abs(s.height() - l.outerHeight(!1));
                        if ('right' === t) return Math.abs(s.width() - l.outerWidth(!1));
                        if ('first' === t || 'last' === t) {
                            var m = l.find(':' + t);
                            return 'x' === o ? te(m) [1] : te(m) [0]
                        }
                        return e(t).length ? 'x' === o ? te(e(t)) [1] : te(e(t)) [0] : (l.css(h, t), void u.update.call(null, n[0]))
                }
            }
        },
        X = function (t) {
            function o() {
                return clearTimeout(f[0].autoUpdate),
                0 === l.parents('html').length ? void (l = null)  : void (f[0].autoUpdate = setTimeout(function () {
                    return c.advanced.updateOnSelectorChange && (s.poll.change.n = i(), s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n, void r(3))  : c.advanced.updateOnContentResize && (s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth, s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n, void r(1))  : !c.advanced.updateOnImageLoad || 'auto' === c.advanced.updateOnImageLoad && 'y' === c.axis || (s.poll.img.n = f.find('img').length, s.poll.img.n === s.poll.img.o) ? void ((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o())  : (s.poll.img.o = s.poll.img.n, void f.find('img').each(function () {
                        n(this)
                    }))
                }, c.advanced.autoUpdateTimeout))
            }
            function n(t) {
                function o(e, t) {
                    return function () {
                        return t.apply(e, arguments)
                    }
                }
                function a() {
                    this.onload = null,
                    e(t).addClass(d[2]),
                    r(2)
                }
                if (e(t).hasClass(d[2])) return void r();
                var n = new Image;
                n.onload = o(n, a),
                n.src = t.src
            }
            function i() {
                c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = '*');
                var e = 0,
                t = f.find(c.advanced.updateOnSelectorChange);
                return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function () {
                    e += this.offsetHeight + this.offsetWidth
                }),
                e
            }
            function r(e) {
                clearTimeout(f[0].autoUpdate),
                u.update.call(null, l[0], e)
            }
            var l = e(this),
            s = l.data(a),
            c = s.opt,
            f = e('#mCSB_' + s.idx + '_container');
            return t ? (clearTimeout(f[0].autoUpdate), void K(f[0], 'autoUpdate'))  : void o()
        },
        j = function (e, t, o) {
            return Math.round(e / t) * t - o
        },
        N = function (t) {
            var o = t.data(a),
            n = e('#mCSB_' + o.idx + '_container,#mCSB_' + o.idx + '_container_wrapper,#mCSB_' + o.idx + '_dragger_vertical,#mCSB_' + o.idx + '_dragger_horizontal');
            n.each(function () {
                J.call(this)
            })
        },
        V = function (t, o, n) {
            function i(e) {
                return s && c.callbacks[e] && 'function' == typeof c.callbacks[e]
            }
            function r() {
                return [c.callbacks.alwaysTriggerOffsets || w >= S[0] + y,
                c.callbacks.alwaysTriggerOffsets || - B >= w]
            }
            function l() {
                var e = [
                    h[0].offsetTop,
                    h[0].offsetLeft
                ],
                o = [
                    x[0].offsetTop,
                    x[0].offsetLeft
                ],
                a = [
                    h.outerHeight(!1),
                    h.outerWidth(!1)
                ],
                i = [
                    f.height(),
                    f.width()
                ];
                t[0].mcs = {
                    content: h,
                    top: e[0],
                    left: e[1],
                    draggerTop: o[0],
                    draggerLeft: o[1],
                    topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(a[0]) - i[0])),
                    leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(a[1]) - i[1])),
                    direction: n.dir
                }
            }
            var s = t.data(a),
            c = s.opt,
            d = {
                trigger: 'internal',
                dir: 'y',
                scrollEasing: 'mcsEaseOut',
                drag: !1,
                dur: c.scrollInertia,
                overwrite: 'all',
                callbacks: !0,
                onStart: !0,
                onUpdate: !0,
                onComplete: !0
            },
            n = e.extend(d, n),
            u = [
                n.dur,
                n.drag ? 0 : n.dur
            ],
            f = e('#mCSB_' + s.idx),
            h = e('#mCSB_' + s.idx + '_container'),
            m = h.parent(),
            p = c.callbacks.onTotalScrollOffset ? q.call(t, c.callbacks.onTotalScrollOffset)  : [
                0,
                0
            ],
            g = c.callbacks.onTotalScrollBackOffset ? q.call(t, c.callbacks.onTotalScrollBackOffset)  : [
                0,
                0
            ];
            if (s.trigger = n.trigger, (0 !== m.scrollTop() || 0 !== m.scrollLeft()) && (e('.mCSB_' + s.idx + '_scrollbar').css('visibility', 'visible'), m.scrollTop(0).scrollLeft(0)), '_resetY' !== o || s.contentReset.y || (i('onOverflowYNone') && c.callbacks.onOverflowYNone.call(t[0]), s.contentReset.y = 1), '_resetX' !== o || s.contentReset.x || (i('onOverflowXNone') && c.callbacks.onOverflowXNone.call(t[0]), s.contentReset.x = 1), '_resetY' !== o && '_resetX' !== o) {
                if (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i('onOverflowY') && c.callbacks.onOverflowY.call(t[0]), s.contentReset.x = null), !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i('onOverflowX') && c.callbacks.onOverflowX.call(t[0]), s.contentReset.x = null), c.snapAmount) {
                    var v = c.snapAmount instanceof Array ? 'x' === n.dir ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount;
                    o = j(o, v, c.snapOffset)
                }
                switch (n.dir) {
                    case 'x':
                        var x = e('#mCSB_' + s.idx + '_dragger_horizontal'),
                        _ = 'left',
                        w = h[0].offsetLeft,
                        S = [
                            f.width() - h.outerWidth(!1),
                            x.parent().width() - x.width()
                        ],
                        b = [
                            o,
                            0 === o ? 0 : o / s.scrollRatio.x
                        ],
                        y = p[1],
                        B = g[1],
                        T = y > 0 ? y / s.scrollRatio.x : 0,
                        k = B > 0 ? B / s.scrollRatio.x : 0;
                        break;
                    case 'y':
                        var x = e('#mCSB_' + s.idx + '_dragger_vertical'),
                        _ = 'top',
                        w = h[0].offsetTop,
                        S = [
                            f.height() - h.outerHeight(!1),
                            x.parent().height() - x.height()
                        ],
                        b = [
                            o,
                            0 === o ? 0 : o / s.scrollRatio.y
                        ],
                        y = p[0],
                        B = g[0],
                        T = y > 0 ? y / s.scrollRatio.y : 0,
                        k = B > 0 ? B / s.scrollRatio.y : 0
                }
                b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [
                    0,
                    0
                ] : b[1] >= S[1] ? b = [
                    S[0],
                    S[1]
                ] : b[0] = - b[0],
                t[0].mcs || (l(), i('onInit') && c.callbacks.onInit.call(t[0])),
                clearTimeout(h[0].onCompleteTimeout),
                Q(x[0], _, Math.round(b[1]), u[1], n.scrollEasing),
                (s.tweenRunning || !(0 === w && b[0] >= 0 || w === S[0] && b[0] <= S[0])) && Q(h[0], _, Math.round(b[0]), u[0], n.scrollEasing, n.overwrite, {
                    onStart: function () {
                        n.callbacks && n.onStart && !s.tweenRunning && (i('onScrollStart') && (l(), c.callbacks.onScrollStart.call(t[0])), s.tweenRunning = !0, C(x), s.cbOffsets = r())
                    },
                    onUpdate: function () {
                        n.callbacks && n.onUpdate && i('whileScrolling') && (l(), c.callbacks.whileScrolling.call(t[0]))
                    },
                    onComplete: function () {
                        if (n.callbacks && n.onComplete) {
                            'yx' === c.axis && clearTimeout(h[0].onCompleteTimeout);
                            var e = h[0].idleTimer || 0;
                            h[0].onCompleteTimeout = setTimeout(function () {
                                i('onScroll') && (l(), c.callbacks.onScroll.call(t[0])),
                                i('onTotalScroll') && b[1] >= S[1] - T && s.cbOffsets[0] && (l(), c.callbacks.onTotalScroll.call(t[0])),
                                i('onTotalScrollBack') && b[1] <= k && s.cbOffsets[1] && (l(), c.callbacks.onTotalScrollBack.call(t[0])),
                                s.tweenRunning = !1,
                                h[0].idleTimer = 0,
                                C(x, 'hide')
                            }, e)
                        }
                    }
                })
            }
        },
        Q = function (e, t, o, a, n, i, r) {
            function l() {
                S.stop || (x || m.call(), x = G() - v, s(), x >= S.time && (S.time = x > S.time ? x + f - (x - S.time)  : x + f - 1, S.time < x + 1 && (S.time = x + 1)), S.time < a ? S.id = h(l)  : g.call())
            }
            function s() {
                a > 0 ? (S.currVal = u(S.time, _, b, a, n), w[t] = Math.round(S.currVal) + 'px')  : w[t] = o + 'px',
                p.call()
            }
            function c() {
                f = 1000 / 60,
                S.time = x + f,
                h = window.requestAnimationFrame ? window.requestAnimationFrame : function (e) {
                    return s(),
                    setTimeout(e, 0.01)
                },
                S.id = h(l)
            }
            function d() {
                null != S.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(S.id)  : clearTimeout(S.id), S.id = null)
            }
            function u(e, t, o, a, n) {
                switch (n) {
                    case 'linear':
                    case 'mcsLinear':
                        return o * e / a + t;
                    case 'mcsLinearOut':
                        return e /= a,
                        e--,
                        o * Math.sqrt(1 - e * e) + t;
                    case 'easeInOutSmooth':
                        return e /= a / 2,
                        1 > e ? o / 2 * e * e + t : (e--, - o / 2 * (e * (e - 2) - 1) + t);
                    case 'easeInOutStrong':
                        return e /= a / 2,
                        1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, o / 2 * ( - Math.pow(2, - 10 * e) + 2) + t);
                    case 'easeInOut':
                    case 'mcsEaseInOut':
                        return e /= a / 2,
                        1 > e ? o / 2 * e * e * e + t : (e -= 2, o / 2 * (e * e * e + 2) + t);
                    case 'easeOutSmooth':
                        return e /= a,
                        e--,
                        - o * (e * e * e * e - 1) + t;
                    case 'easeOutStrong':
                        return o * ( - Math.pow(2, - 10 * e / a) + 1) + t;
                    case 'easeOut':
                    case 'mcsEaseOut':
                    default:
                        var i = (e /= a) * e,
                        r = i * e;
                        return t + o * (0.499999999999997 * r * i + - 2.5 * i * i + 5.5 * r + - 6.5 * i + 4 * e)
                }
            }
            e._mTween || (e._mTween = {
                top: {
                },
                left: {
                }
            });
            var f,
            h,
            r = r || {
            },
            m = r.onStart || function () {
            },
            p = r.onUpdate || function () {
            },
            g = r.onComplete || function () {
            },
            v = G(),
            x = 0,
            _ = e.offsetTop,
            w = e.style,
            S = e._mTween[t];
            'left' === t && (_ = e.offsetLeft);
            var b = o - _;
            S.stop = 0,
            'none' !== i && d(),
            c()
        },
        G = function () {
            return window.performance && window.performance.now ? window.performance.now()  : window.performance && window.performance.webkitNow ? window.performance.webkitNow()  : Date.now ? Date.now()  : (new Date).getTime()
        },
        J = function () {
            var e = this;
            e._mTween || (e._mTween = {
                top: {
                },
                left: {
                }
            });
            for (var t = [
                'top',
                'left'
            ], o = 0; o < t.length; o++) {
                var a = t[o];
                e._mTween[a].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[a].id)  : clearTimeout(e._mTween[a].id), e._mTween[a].id = null, e._mTween[a].stop = 1)
            }
        },
        K = function (e, t) {
            try {
                delete e[t]
            } catch (o) {
                e[t] = null
            }
        },
        Z = function (e) {
            return !(e.which && 1 !== e.which)
        },
        $ = function (e) {
            var t = e.originalEvent.pointerType;
            return !(t && 'touch' !== t && 2 !== t)
        },
        ee = function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        te = function (e) {
            var t = e.parents('.mCSB_container');
            return [e.offset().top - t.offset().top,
            e.offset().left - t.offset().left]
        },
        oe = function () {
            function e() {
                var e = [
                    'webkit',
                    'moz',
                    'ms',
                    'o'
                ];
                if ('hidden' in document) return 'hidden';
                for (var t = 0; t < e.length; t++) if (e[t] + 'Hidden' in document) return e[t] + 'Hidden';
                return null
            }
            var t = e();
            return t ? document[t] : !1
        };
        e.fn[o] = function (t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1))  : 'object' != typeof t && t ? void e.error('Method ' + t + ' does not exist')  : u.init.apply(this, arguments)
        },
        e[o] = function (t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1))  : 'object' != typeof t && t ? void e.error('Method ' + t + ' does not exist')  : u.init.apply(this, arguments)
        },
        e[o].defaults = i,
        window[o] = !0,
        e(window).load(function () {
            e(n) [o](),
            e.extend(e.expr[':'], {
                mcsInView: e.expr[':'].mcsInView || function (t) {
                    var o,
                    a,
                    n = e(t),
                    i = n.parents('.mCSB_container');
                    if (i.length) return o = i.parent(),
                    a = [
                        i[0].offsetTop,
                        i[0].offsetLeft
                    ],
                    a[0] + te(n) [0] >= 0 && a[0] + te(n) [0] < o.height() - n.outerHeight(!1) && a[1] + te(n) [1] >= 0 && a[1] + te(n) [1] < o.width() - n.outerWidth(!1)
                },
                mcsOverflow: e.expr[':'].mcsOverflow || function (t) {
                    var o = e(t).data(a);
                    if (o) return o.overflowed[0] || o.overflowed[1]
                }
            })
        })
    })
});
