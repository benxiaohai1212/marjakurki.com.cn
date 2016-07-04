Qiao.define('base', [
    'base.dom',
    'base.object',
    'base.string',
    'base.json',
    'base.swf',
    'base.browser',
    'base.event',
    'base.date',
    'base.cookie'
], function (b, a) {
});
Qiao.define('base.dom', [
    'base.browser',
    'base.string'
], function (d, b) {
    var a = d.base.browser.opera,
    e = d.base.browser.ie,
    c = {
        cellpadding: 'cellPadding',
        cellspacing: 'cellSpacing',
        colspan: 'colSpan',
        rowspan: 'rowSpan',
        valign: 'vAlign',
        usemap: 'useMap',
        frameborder: 'frameBorder'
    };
    if (e < 8) {
        c['for'] = 'htmlFor';
        c['class'] = 'className'
    } else {
        c.htmlFor = 'for';
        c.className = 'class'
    }
    b.g = function (f) {
        if (typeof f == 'string') {
            return document.getElementById(f)
        } else {
            return f
        }
    };
    b.q = function (n, k, g) {
        var o = [
        ],
        j = d.base.string.trim,
        m,
        l,
        f,
        h;
        if (!(n = j(n))) {
            return o
        }
        if ('undefined' == typeof k) {
            k = document
        } else {
            k = baidu.dom.g(k);
            if (!k) {
                return o
            }
        }
        g && (g = j(g).toUpperCase());
        if (k.getElementsByClassName) {
            f = k.getElementsByClassName(n);
            m = f.length;
            for (l = 0; l < m; l++) {
                h = f[l];
                if (g && h.tagName != g) {
                    continue
                }
                o[o.length] = h
            }
        } else {
            n = new RegExp('(^|\\s)' + d.base.string.escapeReg(n) + '(\\s|$)');
            f = g ? k.getElementsByTagName(g)  : (k.all || k.getElementsByTagName('*'));
            m = f.length;
            for (l = 0; l < m; l++) {
                h = f[l];
                n.test(h.className) && (o[o.length] = h)
            }
        }
        return o
    };
    b.setAttr = function (g, f, h) {
        g = b.g(g);
        if (f == 'style') {
            g.style.cssText = h
        } else {
            f = c[f] || f;
            g.setAttribute(f, h)
        }
        return g
    };
    b.setAttrs = function (h, f) {
        var g;
        h = b.g(h);
        for (g in f) {
            if (f.hasOwnProperty(g)) {
                b.setAttr(h, g, f[g])
            }
        }
        return h
    };
    b.create = function (g, f) {
        var h = document.createElement(g);
        return b.setAttrs(h, f || {
        })
    };
    b.insertHTML = function (i, f, h) {
        var g,
        j;
        if (typeof i == 'string') {
            i = document.getElementById(i)
        }
        if (i.insertAdjacentHTML && !a) {
            i.insertAdjacentHTML(f, h)
        } else {
            g = i.ownerDocument.createRange();
            f = f.toUpperCase();
            if (f == 'AFTERBEGIN' || f == 'BEFOREEND') {
                g.selectNodeContents(i);
                g.collapse(f == 'AFTERBEGIN')
            } else {
                j = f == 'BEFOREBEGIN';
                g[j ? 'setStartBefore' : 'setEndAfter'](i);
                g.collapse(j)
            }
            g.insertNode(g.createContextualFragment(h))
        }
        return i
    };
    b.hasClass = function (h, i) {
        h = b.g(h);
        if (!h || !h.className) {
            return false
        }
        var g = d.base.string.trim(i).split(/\s+/),
        f = g.length;
        i = h.className.split(/\s+/).join(' ');
        while (f--) {
            if (!(new RegExp('(^| )' + g[f] + '( |$)')).test(i)) {
                return false
            }
        }
        return true
    };
    b.addClass = function (m, n) {
        m = b.g(m);
        var g = n.split(/\s+/),
        f = m.className,
        k = ' ' + f + ' ',
        j = 0,
        h = g.length;
        for (; j < h; j++) {
            if (k.indexOf(' ' + g[j] + ' ') < 0) {
                f += (f ? ' ' : '') + g[j]
            }
        }
        m.className = f;
        return m
    };
    b.removeClass = function (m, n) {
        m = b.g(m);
        var k = m.className.split(/\s+/),
        o = n.split(/\s+/),
        g,
        f = o.length,
        h,
        l = 0;
        for (; l < f; ++l) {
            for (h = 0, g = k.length; h < g; ++h) {
                if (k[h] == o[l]) {
                    k.splice(h, 1);
                    break
                }
            }
        }
        m.className = k.join(' ');
        return m
    }
});
Qiao.define('base.event', [
    'base.dom'
], function (c, a) {
    var b = c.base.dom.g;
    a.EventArg = function (f, h) {
        h = h || window;
        f = f || h.event;
        var g = h.document;
        this.target = (f.target) || f.srcElement;
        this.keyCode = f.which || f.keyCode;
        for (var d in f) {
            var e = f[d];
            if ('function' != typeof e) {
                this[d] = e
            }
        }
        if (!this.pageX && this.pageX !== 0) {
            this.pageX = (f.clientX || 0) + (g.documentElement.scrollLeft || g.body.scrollLeft);
            this.pageY = (f.clientY || 0) + (g.documentElement.scrollTop || g.body.scrollTop)
        }
        this._event = f
    };
    a.EventArg.prototype.preventDefault = function () {
        if (this._event.preventDefault) {
            this._event.preventDefault()
        } else {
            this._event.returnValue = false
        }
        return this
    };
    a.EventArg.prototype.stopPropagation = function () {
        if (this._event.stopPropagation) {
            this._event.stopPropagation()
        } else {
            this._event.cancelBubble = true
        }
        return this
    };
    a.EventArg.prototype.stop = function () {
        return this.stopPropagation().preventDefault()
    };
    a._listeners = a._listeners || [];
    a.get = function (d, e) {
        return new a.EventArg(d, e)
    };
    a.getTarget = function (d) {
        return d.target || d.srcElement
    };
    a.on = function (e, h, j) {
        h = h.replace(/^on/i, '');
        e = b(e);
        var i = function (l) {
            j.call(e, l)
        },
        d = a._listeners,
        g = a._eventFilter,
        k,
        f = h;
        h = h.toLowerCase();
        if (g && g[h]) {
            k = g[h](e, h, i);
            f = k.type;
            i = k.listener
        }
        if (e.addEventListener) {
            e.addEventListener(f, i, false)
        } else {
            if (e.attachEvent) {
                e.attachEvent('on' + f, i)
            }
        }
        d[d.length] = [
            e,
            h,
            j,
            i,
            f
        ];
        return e
    };
    a.preventDefault = function (d) {
        if (d.preventDefault) {
            d.preventDefault()
        } else {
            d.returnValue = false
        }
    };
    a.stopPropagation = function (d) {
        if (d.stopPropagation) {
            d.stopPropagation()
        } else {
            d.cancelBubble = true
        }
    };
    a.un = function (f, i, e) {
        f = b(f);
        i = i.replace(/^on/i, '').toLowerCase();
        var l = a._listeners,
        g = l.length,
        h = !e,
        k,
        j,
        d;
        while (g--) {
            k = l[g];
            if (k[1] === i && k[0] === f && (h || k[2] === e)) {
                j = k[4];
                d = k[3];
                if (f.removeEventListener) {
                    f.removeEventListener(j, d, false)
                } else {
                    if (f.detachEvent) {
                        f.detachEvent('on' + j, d)
                    }
                }
                l.splice(g, 1)
            }
        }
        return f
    }
});
Qiao.define('base.object', null, function (b, a) {
    a.extend = function (e, d) {
        for (var c in d) {
            if (d.hasOwnProperty(c)) {
                e[c] = d[c]
            }
        }
        return e
    }
});
Qiao.define('base.string', null, function (c, a) {
    var b = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)', 'g');
    a.trim = function (d) {
        return String(d).replace(b, '')
    };
    a.encodeHTML = function (d) {
        return String(d).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
    };
    a.decodeHTML = function (d) {
        var e = String(d).replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        return e.replace(/&#([\d]+);/g, function (g, f) {
            return String.fromCharCode(parseInt(f, 10))
        })
    };
    a.escapeReg = function (d) {
        return String(d).replace(new RegExp('([.*+?^=!:${}()|[\\]/\\\\])', 'g'), '\\$1')
    };
    a.format = function (f, d) {
        f = String(f);
        var e = Array.prototype.slice.call(arguments, 1),
        g = Object.prototype.toString;
        if (e.length) {
            e = e.length == 1 ? (d !== null && (/\[object Array\]|\[object Object\]/.test(g.call(d))) ? d : e)  : e;
            return f.replace(/#\{(.+?)\}/g, function (h, j) {
                var i = e[j];
                if ('[object Function]' == g.call(i)) {
                    i = i(j)
                }
                return ('undefined' == typeof i ? '' : i)
            })
        }
        return f
    }
});
Qiao.define('base.json', null, function (d, b) {
    var c = {
        '': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    };
    function a(h) {
        if (/["\\\x00-\x1f]/.test(h)) {
            h = h.replace(/["\\\x00-\x1f]/g, function (i) {
                var j = c[i];
                if (j) {
                    return j
                }
                j = i.charCodeAt();
                return '\\u00' + Math.floor(j / 16).toString(16) + (j % 16).toString(16)
            })
        }
        return '"' + h + '"'
    }
    function f(o) {
        var j = [
            '['
        ],
        k = o.length,
        h,
        m,
        n;
        for (m = 0; m < k; m++) {
            n = o[m];
            switch (typeof n) {
                case 'undefined':
                case 'function':
                case 'unknown':
                    break;
                default:
                    if (h) {
                        j.push(',')
                    }
                    j.push(b.stringify(n));
                    h = 1
            }
        }
        j.push(']');
        return j.join('')
    }
    function e(h) {
        return h < 10 ? '0' + h : h
    }
    function g(h) {
        return '"' + h.getFullYear() + '-' + e(h.getMonth() + 1) + '-' + e(h.getDate()) + 'T' + e(h.getHours()) + ':' + e(h.getMinutes()) + ':' + e(h.getSeconds()) + '"'
    }
    b.parse = function (h) {
        return (new Function('return (' + h + ')')) ()
    };
    b.stringify = function (m) {
        switch (typeof m) {
            case 'undefined':
                return 'undefined';
            case 'number':
                return isFinite(m) ? String(m)  : 'null';
            case 'string':
                return a(m);
            case 'boolean':
                return String(m);
            default:
                if (m === null) {
                    return 'null'
                } else {
                    if (m instanceof Array) {
                        return f(m)
                    } else {
                        if (m instanceof Date) {
                            return g(m)
                        } else {
                            var i = [
                                '{'
                            ],
                            l = b.stringify,
                            h,
                            k;
                            for (var j in m) {
                                if (Object.prototype.hasOwnProperty.call(m, j)) {
                                    k = m[j];
                                    switch (typeof k) {
                                        case 'undefined':
                                        case 'unknown':
                                        case 'function':
                                            break;
                                        default:
                                            if (h) {
                                                i.push(',')
                                            }
                                            h = 1;
                                            i.push(l(j) + ':' + l(k))
                                    }
                                }
                            }
                            i.push('}');
                            return i.join('')
                        }
                    }
                }
            }
    }
});
Qiao.define('base.swf', [
    'base.browser',
    'base.string',
    'base.dom'
], function (d, a) {
    var f = d.base.dom.insertHTML,
    c = d.base.browser,
    e = d.base.string.encodeHTML;
    function b(t) {
        var l,
        j,
        m,
        s,
        g = {
        };
        t = t || {
        };
        for (j in t) {
            if (t.hasOwnProperty(j)) {
                g[j] = t[j]
            }
        }
        t = g;
        var n = t.vars,
        o = [
            'classid',
            'codebase',
            'id',
            'width',
            'height',
            'align'
        ];
        t.align = t.align || 'middle';
        t.classid = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
        t.codebase = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0';
        t.movie = t.url || '';
        delete t.vars;
        delete t.url;
        if ('string' == typeof n) {
            t.flashvars = n
        } else {
            var q = [
            ];
            for (j in n) {
                if (n.hasOwnProperty(j)) {
                    s = n[j];
                    q.push(j + '=' + encodeURIComponent(s))
                }
            }
            t.flashvars = q.join('&')
        }
        var p = [
            '<object '
        ];
        for (l = 0, m = o.length; l < m; l++) {
            s = o[l];
            p.push(' ', s, '="', e(t[s]), '"')
        }
        p.push('>');
        var h = {
            wmode: 1,
            scale: 1,
            quality: 1,
            play: 1,
            loop: 1,
            menu: 1,
            salign: 1,
            bgcolor: 1,
            base: 1,
            allowscriptaccess: 1,
            allownetworking: 1,
            allowfullscreen: 1,
            seamlesstabbing: 1,
            devicefont: 1,
            swliveconnect: 1,
            flashvars: 1,
            movie: 1
        };
        for (j in t) {
            if (t.hasOwnProperty(j)) {
                s = t[j];
                j = j.toLowerCase();
                if (h[j] && (s || s === false || s === 0)) {
                    p.push('<param name="' + j + '" value="' + e(s) + '" />')
                }
            }
        }
        t.src = t.movie;
        t.name = t.id;
        delete t.id;
        delete t.movie;
        delete t.classid;
        delete t.codebase;
        t.type = 'application/x-shockwave-flash';
        t.pluginspage = 'http://www.macromedia.com/go/getflashplayer';
        p.push('<embed');
        var r;
        for (j in t) {
            if (t.hasOwnProperty(j)) {
                s = t[j];
                if (s || s === false || s === 0) {
                    if ((new RegExp('^salign$', 'i')).test(j)) {
                        r = s;
                        continue
                    }
                    p.push(' ', j, '="', e(s), '"')
                }
            }
        }
        if (r) {
            p.push(' salign="', e(r), '"')
        }
        p.push('></embed></object>');
        return p.join('')
    }
    a.create = function (g, i) {
        g = g || {
        };
        var h = b(g) || g.errorMessage || '';
        if (i && 'string' == typeof i) {
            i = document.getElementById(i)
        }
        f(i || document.body, 'beforeEnd', h)
    };
    a.get = function (h) {
        var g = document[h],
        j,
        k;
        if (c.ie == 9 && g) {
            if (!g.length) {
                g = [
                    g
                ]
            }
            for (j = 0; k = g[j]; j++) {
                if (k.tagName.toLowerCase() == 'embed') {
                    break
                }
            }
            g = k ? k : g[0]
        } else {
            if (!g) {
                g = window[h]
            }
        }
        return g
    }
});
Qiao.define('base.browser', null, function (b, a) {
    a.firefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['$1'] : undefined;
    a.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['$1'])  : undefined;
    a.isStrict = document.compatMode == 'CSS1Compat';
    a.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
    a.isWebkit = /webkit/i.test(navigator.userAgent);
    a.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? + (RegExp['$6'] || RegExp['$2'])  : undefined
});
Qiao.define('base.date', null, function (b, a) {
    function c(g, f) {
        var h = '',
        e = (g < 0),
        d = String(Math.abs(g));
        if (d.length < f) {
            h = (new Array(f - d.length + 1)).join('0')
        }
        return (e ? '-' : '') + h + d
    }
    a.format = function (d, h) {
        if ('string' != typeof h) {
            return d.toString()
        }
        function e(n, m) {
            h = h.replace(n, m)
        }
        var i = d.getFullYear(),
        g = d.getMonth() + 1,
        l = d.getDate(),
        j = d.getHours(),
        f = d.getMinutes(),
        k = d.getSeconds();
        e(/yyyy/g, c(i, 4));
        e(/yy/g, c(parseInt(i.toString().slice(2), 10), 2));
        e(/MM/g, c(g, 2));
        e(/M/g, g);
        e(/dd/g, c(l, 2));
        e(/d/g, l);
        e(/HH/g, c(j, 2));
        e(/H/g, j);
        e(/hh/g, c(j % 12, 2));
        e(/h/g, j % 12);
        e(/mm/g, c(f, 2));
        e(/m/g, f);
        e(/ss/g, c(k, 2));
        e(/s/g, k);
        return h
    }
});
Qiao.define('base.cookie', null, function (b, a) {
    a._isValidKey = function (c) {
        return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$')).test(c)
    };
    a.getRaw = function (d) {
        if (a._isValidKey(d)) {
            var e = new RegExp('(^| )' + d + '=([^;]*)(;|$)'),
            c = e.exec(document.cookie);
            if (c) {
                return c[2] || null
            }
        }
        return null
    };
    a.get = function (c) {
        var d = a.getRaw(c);
        if ('string' == typeof d) {
            d = decodeURIComponent(d);
            return d
        }
        return null
    };
    a.setRaw = function (e, f, d) {
        if (!a._isValidKey(e)) {
            return
        }
        d = d || {
        };
        var c = d.expires;
        if ('number' == typeof d.expires) {
            c = new Date();
            c.setTime(c.getTime() + d.expires)
        }
        document.cookie = e + '=' + f + (d.path ? '; path=' + d.path : '') + (c ? '; expires=' + c.toGMTString()  : '') + (d.domain ? '; domain=' + d.domain : '') + (d.secure ? '; secure' : '')
    };
    a.remove = function (d, c) {
        c = c || {
        };
        c.expires = new Date(0);
        a.setRaw(d, '', c)
    };
    a.set = function (d, e, c) {
        a.setRaw(d, encodeURIComponent(e), c)
    }
});
Qiao.define('net', null, function (b, a) {
    a.interfaces = [
        'request',
        'get',
        'post',
        'abort'
    ]
});
Qiao.define('net.flash', [
    'base'
], function (i, h) {
    var j = i.base.dom.g,
    e = i.base.swf.get,
    c = i.base.swf.create,
    b = 'BD_QIAO_NET';
    var d = 0;
    function f(l) {
        var k = e(b + '_FLASH');
        if (k && k.request) {
            l.call(null, k)
        } else {
            setTimeout(function () {
                f(l)
            }, 100)
        }
    }
    function a(m) {
        var k = b + '_FLASH_CONTAINER',
        l = j(k);
        if (!l) {
            l = document.createElement('div');
            l.id = k;
            l.style.height = '1px';
            l.style.width = '1px';
            l.style.lineHeight = '0px';
            l.style.fontSize = '0px';
            document.body.appendChild(l);
            c({
                id: b + '_FLASH',
                url: h.path + '?req=' + (new Date().getTime()),
                width: 1,
                height: 1,
                bgcolor: '#FFF',
                quality: 'high',
                menu: 'false',
                allowscriptaccess: 'always'
            }, l)
        }
        f(m)
    }
    function g(m, l) {
        var o,
        k,
        p,
        n = (new Date()).getTime() + '' + (d++);
        m = encodeURI(m);
        l.method = l.method || 'get';
        l.charset = l.charset || 'utf-8';
        if (l.onsuccess) {
            o = l.onsuccess;
            delete l.onsuccess
        }
        p = Qiao.cb[b];
        p['succ' + n] = function (q) {
            q = unescape(q);
            if (o) {
                o.call(null, null, q)
            }
        };
        if (l.onfailure) {
            k = l.onfailure;
            delete l.onfailure
        }
        p['error' + n] = k || function () {
        };
        a(function (q) {
            q.request(m, l, {
                onsucc: 'Qiao.cb.' + b + '.succ' + n,
                onerror: 'Qiao.cb.' + b + '.error' + n
            })
        });
        return {
            abort: function () {
                h.abort()
            }
        }
    }
    h.path = 'http://qiao.baidu.com/v3/swf/crossdomain.swf';
    h.get = function (m, n, k) {
        var l = {
            method: 'get'
        };
        l.onsuccess = n;
        l.onfailure = k;
        l.data = 'req=' + (new Date().getTime());
        if (m.indexOf('&') >= 0) {
            l.data = '&' + l.data
        }
        return g(m, l)
    };
    h.post = function (m, n, o, k) {
        var l = {
            method: 'post'
        };
        l.onsuccess = o;
        l.onfailure = k;
        l.data = n;
        return g(m, l)
    };
    h.request = g;
    h.abort = function () {
        var k = e(b + '_FLASH');
        if (k && k.abort) {
            k.abort()
        }
    };
    Qiao.cb[b] = Qiao.cb[b] || {
    }
});
Qiao.define('im', [
    'base',
    'im.net',
    'im.message',
    'im.lang'
], function (h, w) {
    var i = h.im.net,
    v = h.im.message,
    r = h.im.editor,
    y = h.im.lang,
    b = h.base.json.parse,
    j = h.base.string.encodeHTML,
    o = {
    },
    k = {
    },
    e = {
        bid: '',
        type: 1,
        subid: '',
        siteid: '',
        ucid: '',
        bridgeTid: 0,
        tid: 0,
        referrer: '',
        location: '',
        title: '',
        coding: 'utf8',
        word: '',
        wordtype: '',
        wordid: '',
        bdclickid: '',
        from: '',
        userName: '',
        csName: y.TEXT.DEFAULT_CSNAME,
        userStatus: 0,
        csNameMap: {
        }
    },
    x = 2000,
    p = 1000,
    d = '',
    f = {
        WAIT: 'wait',
        DROP: 'block'
    },
    t = false;
    function u(B, A) {
        var z;
        for (z in A) {
            if (A.hasOwnProperty(z)) {
                B[z] = A[z]
            }
        }
    }
    function m() {
        var z = Array.prototype.slice.call(arguments),
        A = o[z[0]];
        if (A) {
            A.apply(null, z.slice(1))
        }
    }
    function q() {
        var z = Array.prototype.slice.call(arguments),
        A = k[z[0]];
        if (A) {
            A.apply(null, z.slice(1))
        }
    }
    function a(z) {
        e.session = z.session;
        i.setSession(z.session);
        i.bridgeInit('type=' + e.type + '&chattype=' + e.chattype + '&sub=' + e.subid + '&username=' + encodeURIComponent(e.userName) + '&siteid=' + e.siteid + '&ucid=' + e.ucid + '&bridgetid=' + e.bridgeTid + '&fromsite=' + encodeURIComponent(e.referrer) + '&srcword=' + encodeURIComponent(e.word) + '&wordtype=' + e.wordtype + '&wordid=' + e.wordid + '&region=' + encodeURIComponent(e.from) + '&insite=' + encodeURIComponent(e.location) + '&title=' + encodeURIComponent(e.title) + '&imuss=' + e.bid, s, c)
    }
    function c(z, A) {
        switch (z) {
            case f.WAIT:
                s(A);
                A.autoResponse && (w.fire('info', v.parseMessage(A.autoResponse || []).content));
                e.userStatus = 1;
                break;
            case f.DROP:
                w.fire('stop');
                break;
            default:
                g(z)
        }
    }
    function s(z) {
        if (z.subid) {
            e.subid = z.subid;
            w.fire('changesubid', z.subid)
        }
        switch (e.csNameType) {
            case 2:
                z.subid && (i.getClientName(z.subid, w.updateCSName));
                break;
            case 1:
                e.bridgeTid && (i.getGroupName(e.bridgeTid, w.updateCSName));
                break;
            case 3:
                e.customName && (w.updateCSName({
                    status: 0,
                    data: e.customName
                }));
                break
        }
        e.tid = z.tid;
        i.pick(e.ack, true);
        w.fire('connected', e.session, e.tid, e.subid)
    }
    function g(z) {
        w.fire('error', {
            msg: y.ERROR.INIT
        });
        if (z) {
            i.uploadLog('initerror')
        }
    }
    function l(z) {
        w.fire('error', {
            msg: y.ERROR.INIT
        });
        if (z) {
            i.uploadLog('loginerror')
        }
    }
    function n(A, D) {
        var C;
        if (e.csNameType == 0 || e.csNameType == 3) {
            C = e.customName || '在线客服'
        } else {
            if (e.csNameMap[A]) {
                C = e.csNameMap[A]
            } else {
                var B = e.csNameType == 1 ? '默认分组' : '在线客服';
                var z = e.csNameType == 1 ? i.getGroupName : i.getClientName;
                z(A, function (E) {
                    E.data = E.data.replace(/^.*?:/, '');
                    var F = e.csNameMap[A] = E.status ? B : E.data;
                    if (D) {
                        D.call(null, F)
                    }
                }, true);
                return
            }
        }
        if (C && D) {
            D.call(null, C)
        }
        return C
    }
    o.conflict = function () {
        w.fire('error', {
            msg: y.ERROR.CONFLICT
        })
    };
    o.sendFail = function () {
        w.fire('error', {
            msg: y.ERROR.SEND_FAIL
        })
    };
    o.offline = function () {
        w.fire('error', {
            msg: y.ERROR.OFFLINE
        });
        w.fire('stop')
    };
    o.kicked = function () {
        w.fire('error', {
            msg: y.ERROR.KICKED
        });
        w.fire('stop')
    };
    k.fileUnsupport = function () {
        var z = {
            content: y.TEXT.FILE_UNSUPPORT,
            csName: e.csName,
            time: new Date().getTime()
        };
        w.fire('message', z)
    };
    k.assigntask = function (z) {
        if (z.result) {
            e.tid = z.tid !== undefined ? z.tid : e.tid;
            e.subid = z.subid !== undefined ? z.subid : e.subid;
            e.bridgeTid = z.bridgeid !== undefined ? z.bridgeid : e.bridgeTid;
            z.subid !== undefined && (w.fire('changesubid', z.subid))
        }
        if (e.userStatus) {
            w.fire('info', y.TEXT.ONLINE.replace('#{0}', z.from || ''));
            if (e.csNameType == 2) {
                e.csName = z.from
            }
            e.userStatus = 0
        }
        w.fire('assigntask', z.subid)
    };
    k.offline = function (z) {
        w.fire('stat:offline', z)
    };
    k.taskbegin = function (z) {
        w.fire('taskbegin', z)
    };
    k.kick = function () {
        w.fire('error', {
            msg: y.ERROR.DROP_KICKED
        });
        w.fire('stop');
        i.stopPick();
        w.fire('stat:error', {
            type: 'kick'
        })
    };
    k.chatover = function () {
        w.fire('error', {
            msg: y.ERROR.DROP_CHATOVER
        });
        w.fire('stop');
        i.stopPick();
        w.fire('stat:error', {
            type: 'kick'
        })
    };
    k.transfer = function (z) {
        e.tid = z.new_tid;
        e.subid = z.new_subid;
        e.bridgeTid = z.new_bridgetid;
        w.fire('changesubid', z.new_subid);
        if (e.csNameType == 1) {
            i.getGroupName(e.bridgeTid, w.updateCSName)
        } else {
            if (e.csNameType == 2) {
                i.getClientName(e.subid, w.updateCSName)
            }
        }
        w.fire('info', y.TEXT.TRANSFER);
        w.fire('stat:transfer')
    };
    k.message = function (A, B, z, C) {
        A = v.parseMessage(A);
        A.time = new Date().getTime();
        n(C, function (D) {
            A.csName = D;
            w.fire('message', A, B, z)
        })
    };
    k.input = function () {
        w.fire('input', y.TEXT.INPUT)
    };
    k.customInput = function () {
        w.fire('customInput')
    };
    w.init = function (z, A) {
        u(e, z || {
        });
        i.on('error', m);
        i.on('pick', q);
        i.on('timeupdate', function () {
            w.fire('timeupdate')
        });
        i.init(e.siteid, e.ucid, e.bid, A);
        i.on('stat:visitor', function () {
            w.fire('stat:visitor')
        })
    };
    w.sendText = function (z, A) {
        z = j(z);
        i.communicate(v.parseText(z).xml, {
            tid: e.tid,
            to: e.userName,
            time: A
        })
    };
    w.sendRichText = function (A, z, B) {
        i.communicate(v.parseRichText(A, z).xml, {
            tid: e.tid,
            to: e.userName,
            time: B
        })
    };
    w.sendStatus = function (E, D) {
        var F = v.parseRichText(E, D).xml.replace(/url\s+ref="(.*?)"/, 'text c="$1"').replace(/&#xD;&#xA;/g, '');
        var A;
        var B = 0;
        F = F.match(/<.*?>/g);
        for (var C = 0, z = F.length; C < z; C++) {
            A = F[C].match(/text c="(.*)"/);
            if (!A) {
                continue
            } else {
                if (B > p) {
                    F.splice(C, 1);
                    --C;
                    continue
                }
                A = A[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
                if (B + A.length > p) {
                    F[C] = F[C].replace(/".*?"/, '"' + h.base.encodeHTML(A.slice(0, p - B)) + '..."')
                }
                B += A.length
            }
        }
        var G = F;
        F = F.join('');
        if (F == d || G.length <= 3 || F.length > x) {
            if (F != d) {
                d = F
            }
            return
        } else {
            d = F
        }
        i.writing({
            imuss: e.bid,
            to: e.userName,
            siteid: e.siteid,
            ucid: e.ucid,
            body: F
        })
    };
    w.login = function (z) {
        u(e, z || {
        });
        t = false;
        i.welcome('source=0&imuss=' + e.bid + '&siteid=' + e.siteid + '&ucid=' + e.ucid + '&anonym=true&clienttype=3', a, l)
    };
    w.pick = function (z) {
        i.pick(z || e.ack)
    };
    w.pause = function () {
        var z = i.pause();
        z.session = e.session;
        z.tid = e.tid;
        z.bridgeTid = e.bridgeTid;
        z.subid = e.subid;
        return z
    };
    w.restart = function (z) {
        e.session = z.session || e.session;
        e.tid = z.tid || e.tid;
        i.setSession(e.session);
        i.restart(z.ack, z.seq)
    };
    w.logout = function () {
        if (t) {
            return
        }
        i.logout();
        t = true
    };
    w.getData = function (z) {
        return e[z]
    };
    w.updateCSName = function (z) {
        if (z.status) {
            e.csName = y.TEXT.DEFAULT_CSNAME
        } else {
            e.csName = z.data.replace(/.*?:/, '') || y.TEXT.DEFAULT_CSNAME
        }
    }
});
Qiao.define('im.config', null, function (b, a) {
    a.FACE_ROOT = 'img/face/';
    a.URL = {
        QIAO_ROOT: 'http://qiao.baidu.com/v3/',
        HI_SERVER: 'http://webim.qiao.baidu.com/'
    };
    a.face = {
        '微笑': '1e376a99d4059562772aad9ac065fd71',
        '大笑': 'c5ce7689438e5ee92c5942d4885fc198',
        '偷笑': 'd2ff68289e44c32d61f17e9cfb8f781a',
        '憨笑': '564396330c9e704c27533dd0a9f38d56',
        '得意': '33991a718d98b7bde46d1656acd1d84f',
        '可爱': '1eac4820cb2162ad0ea9050f730701ea',
        '害羞': 'afb7b910b894d8638a5f5f60d66080bb',
        '乖': '6eeeea78151b0d992342b5d974ea9748',
        '淘气': '3567d74d273570047d563a52487b458d',
        '调皮': '17a002956048d2cc3e7136a60995f4c5',
        '流泪': '6d177c2e8caa44b47950afd1c2d94ea1',
        '大哭': 'f2468ad19982b6109525f86e60da0a40',
        '撇嘴': 'f4075f32764665658fe69d475536685f',
        '闭嘴': '97aac5ef30ca5c313f5055d3303a901a',
        '嘘': 'ea12132c217e29cc32a70ef2123baa55',
        '鄙视': '0fd150d82ae7f2d174c9601f9ee09247',
        '傲慢': '8484e2fcd13826ff6d311fa23f6133f1',
        '白眼': '46e7c6b53203f314943f5af66f6b9daf',
        '思考': '8c1066c3a4fc9115b46e3ae72a19e3f4',
        '困': 'fd2bdb138346f328795d068df107ec90',
        '睡': 'd6c03a77dc812595b2f41fdde34d05a6',
        '汗': 'fd2f51cd66989306299d8ad075abbc89',
        '尴尬': 'b143058415f04e4f21302736326fb37c',
        '惊讶': 'c6fbb9628da63dc12c9a1fef25dea934',
        '惊恐': '4a19620c98f2d809ea46900a0b552d7c',
        '疑问': '7e9cbda5e0b325f01d478f8e4adf69b2',
        '晕': '18c3ccd14d992d8e5aa30acfe670d42f',
        '敲打': 'd237de97c3277b7749ce839db39b0649',
        '难过': 'f2e7df81f1e48584a82c82f99d266b7c',
        '委屈': '3ced67ed7484ec180470b6cf8f0e44b3',
        '色': '5c0aacf4ce01a07aa72ced20edfb1fb0',
        '抓狂': 'fd78f2b8f16086a940e90f370b2bb0d4',
        '愤怒': 'c6d1d4982260a4bad13aab943f7799f0',
        '吐': '658d87d64e128385f28a59c15aa8cb91',
        '衰': 'ae2b37bc2c8186a5dad63a583ad278cb',
        '再见': 'b6db7f3a9e8a9c864046eb0eaa15942d',
        '左拥抱': '3890735fdd2f25319367532f660bbcd2',
        '右拥抱': '28a6dcccc96ad6d3082a0ff5554bebd6',
        '闪人': 'eb06e9170d5b470f124d3943f537e714',
        '刀': 'd32893593db6217773e102bd694db4d8',
        '吻': '11d117a72c9cd5ffa2110c31cb4a385b',
        '爱情': '7f73aeabe8ddb4bb23e06de4e6072e40',
        '心碎': 'b5fbcef53bf2d695db6bd48faa326585',
        '鲜花': '5bc342dfc4b92d4c0cad3a4207a99380',
        '枯萎': '9ef7d4c187f298a10953f5096cbe9162',
        '胜利': 'f08d998e04027d92feaf0f8667bb016c',
        OK: 'f143718613f47bb929e7134b2457f260',
        '大拇指': '2f5113cfd0a33bfec485c222051db205',
        '弱': '2ea09b4e887a6871e22d6e52a014179c',
        '握手': 'a21bf8c01f41b9148b81aa1b53fb3a0e',
        '蛋糕': '47198bf11c75a03e6249a1ccc1064bce',
        '咖啡': 'd6bde4b624846fd08500053358e154ae',
        '吃饭': 'e3aac3a4e1e36a02959f62d9bbcab7ac',
        '太阳': '75132ac5d361fd71a0b8acc6d99b7692',
        '月亮': '5bbb83756e3e652b43f9f03d638718b4',
        '星星': 'dcb31cac1b742034e9cdc5254f309d00',
        '便便': '490183579bb95ab6eee1d695cdaef213',
        '猪头': 'ede07ac7f02fbc613381069a77ff1b5c',
        '钱': 'eeb68b5c092155df924e69b2a1de21f9',
        Hi: '33037bedc05c33f5998f875c608d4ba1',
        '男兜': 'd923dbf00b642078c2e3783f6f79b7bc',
        '女兜': 'f054e7cb63e9c3ae6dc92e4f7970b15a',
        '开心': '3984744c44406f9516ac97f14f8f4a94',
        '乖乖': '97a3bc26de5e7d5c578ffcff92784234',
        '偷笑　': 'a75928d0fe98d17c084ac411750da03b',
        '大笑　': 'a2d411f7eb8472b2dc5cb5d0e6cd871d',
        '抽泣': 'eb4e6ddad686dc9a01983ade1c2959c0',
        '大哭　': '1eb8aabfaa423e6fbdfa2e6faedea210',
        '无奈': '480e05a180234b2eed917659ad8bc5b9',
        '滴汗': 'e63b0f3f136ff6f48b214c19b0547a1d',
        '叹气': '01025799c89cb1eb67814b5ef3f102b6',
        '狂晕': '24bdf1f85b7335a2bfdea21aecaa502d',
        '委屈　': 'a8a488035f25ca63530a8a979beb72e5',
        '超赞': 'f6dffd7867799a07b36a6d5d548c8247',
        '囧囧': 'da3c71a49ef9ea18e10b6201d9fb793f',
        '疑问　': '5a68de543ec8c72fb3142c939e2fb2e2',
        '飞吻': '1693bff59ce27d5537f8c1c35bea08f6',
        '天使': '0228e4709bddba1e11e0df49f40b039a',
        '撒花': 'e22e54f7be1e2e999c0a4b10c6c1fd36',
        '生气': 'ce0efd9b1065a9c32120f57cfce01fa7',
        '被砸': '64996975385f3239169de64f0726e351',
        '口水': 'd4696e8fba488cf64b920900eae2474b',
        '泪奔': '865e4984298507c91356f7ea93bb9c91',
        '吓傻': 'a95a3f61f00c3c6a2542c44e5a8c54f1',
        '吐舌头': '4f4dd01413a96ec2982cd318f4b7f317',
        '点头': 'c66071425f7cfffa00acc9c5ae299e77',
        '随意吐': 'f1a07cb1c44d659831dbef7e8d4fa13d',
        '旋转': 'a9a909e49309d8430bd88bedcd213d9f',
        '困困': '0f6c2477050285a33347805d86a94d17',
        '鄙视　': 'c5c3990f843ff99b964dfbc5ce77f3ac',
        '告示': '3c0f70c965fb07a0c92ba6010b115c93',
        '篮球': 'd6c92983218597f1e03374f90b0c8896',
        '狂顶': 'c2cd066e8df775ee02e1f84f4c8febb0',
        '甩头发': '9b7632dc820b2a952e34dff1bee17db1',
        '再见　': '0d98833aee6e63fcd3f1cfc728dad66b',
        '超人　': '6210166e868bfc9747648b62b46cfcc6',
        '过年好': '09689b9307f90b6568340befafe39e5c',
        '红包拿来': 'bf58f8260b994cf6fa07601f5d194e3f',
        '恭喜发财': '399ca36413576124428b2a89c51e6970',
        '欢迎光临': '98b000b5aa8f6f200d4c227bd0406e42',
        '稍等': 'ac7bb47cb022f8215e059573b7a721f5',
        '我在线': '3b225583cb9c3bdd7f4e7d47f3ff98a6',
        '恕不议价': 'e62073630069871b7f8ade45ba13c9a3',
        '库房有货': 'cf8370a69fbdf95f4cf56145687b37cd',
        '货在路上': '64ffe8e7895c8a69bd72d9d5a2a1ed40',
        '微笑 ': '36c7fbde6243e1ab056d26ed04da4626',
        '帅哥': '8173ba953e8b2cba6a9745e798964940',
        '美女': '266fc64ac2949059bc4247ff36c8c72a',
        '老大': '013f44177c9661fa9e9b53a5d7ad810a',
        '哈哈哈': 'ece2d90fabf36d2868d033fe941c2505',
        '奸笑': 'ed27bd44748988b291e3de517000a8ea',
        '傻乐': '9c1abc04d03aef9f13672fcb7c27b5df',
        '飞吻 ': '82f2fac9575da046058dd47e204a2a5f',
        '害羞 ': '29c4befb29a5b1d3856b2812c6426246',
        '花痴': 'd2f1967481629b751c015ddb2897aef5',
        '憧憬': '2d27536e0981cec8f6654f3f638e0cfe',
        '你牛': '07f0eab7fc6e195da290fee8bb61861a',
        '鼓掌': '63ceb8fc549ab868cc2eb588f24805fa',
        '可爱 ': 'f593596553738a8070b15cbe3b453a4b',
        '委屈 ': '6f5cf65eb4860e5b9c161e96334257a5',
        '大哭 ': '4b5649fe0d7ca648e9ef875430726629',
        '泪奔 ': '5231f00f23672f96b49e23b903f51571',
        '寻死': 'ea8dd5a956ba9e59160e9a6a97fd3159',
        '惊讶 ': 'eb2defeb5905451d0d07f1ff466909aa',
        '疑问 ': 'b7c86b2b58cfded752fef914143325bb',
        '鄙视 ': '9b84f79c40188db4771c2577187b154e',
        '大骂': '646ec54dda651d383db0038e925eb601',
        '狂怒': 'e70bf9f4757ae74b4f86471aa0dc72d5',
        '囧': '40ad40f89dce47fc7f020e86cf951750',
        '晕 ': '83128d1230675135df522efa6fdd32e7',
        '呕吐': '4fc9d77ddbc754ee674f0f9c50e2056f',
        '财迷': '97d24895c4d6033ab5d302ebbb72edb6',
        '睡了': '31f561aa78f16cea9e1f02183312b58c',
        '思考 ': '1105a0ae3b17c52432a65833ad825739',
        '汗 ': 'e5744442fa792ea055ad78137f1a1cac',
        '无语': '2d15778775f3c0f76bcf47abc8a375f8',
        '拜': 'fcf60dc85c60f1800d030bd89e07e3f4',
        '鞠躬': '6915fe7dea48ceb50e57296782b423f7',
        '累了': '5e5db52f522182d91051c607be072a37',
        '病了': '47ad9be303e3f1ffe93876051959a787',
        '墙角': '0022cb45e57684b4e87b48783dc12183',
        '超人': 'b26fcee08cea8022c47f75f2a092823f',
        '戳': '6fc208bfaff0d8f40bb0db9196446b12',
        '跳舞': 'd9513f71ad92be76312f665fcb241879',
        '鬼脸': '8006125c59cb94d0f73d5404a25725ae',
        '无聊': 'e23def0114dd74dca485b1c31d59f3f3',
        '撞墙': 'e91b1ccab6f366af693fec4067cdbd7a',
        '顶': '8bf6b90924fe625318b23753915d179b',
        'Hi ': '630df8bd6950c9395b39c611809822fb',
        '饭': '82fa0db5f4ac8e95c7fa97c2f028a411',
        '蛋糕 ': '78703efec3547b13f2e6e5a3dd63286a',
        '礼物': '2e95741468c5cf64bb9d51a12c374646',
        '心': 'a0bed224deffa67327623313cc5c5231',
        '心碎 ': '745e57c9ea78d1c48a030b793a2539af',
        '玫瑰': '4afbd9e87b0e27b98d4620e457a8ac63',
        '炸弹': '5f4fdb939b838fce3f78161d4f5b5a3e',
        '集体舞': 'f0d88e469af4fefd1170c4c85d2bfb99',
        '打人': '5ef9889599d2f0ddfd990746809d6166',
        '拍拍': 'd885a150c3d14aafeaf823fa57a09c68',
        '亲亲': '1aa61038900f78cb8b4f57ca6f00fa17',
        '握手 ': '4c753e16dd5c9dc0da21402374691735',
        '安慰': 'ee8fa5bcbd36241820d14ae1b46648d2',
        '石头': '53cdc51684cc27b688cebd3e8a4801a5',
        '剪刀': '8467ecac043b423891b928f654483156',
        '布': '7b7492097c2fbb7a4c553c254f4a5994',
        '恭喜啦': 'ee79ba86cbf7c888fb05a1284617857d',
        '啵啵': '8916a811f491ddfafd61986375665cc9'
    }
});
Qiao.define('im.lang', null, function (b, a) {
    a.TEXT = {
        WELCOME: '您好！有什么需要帮忙的么？',
        DEFAULT_CSNAME: '在线客服',
        FILE_UNSUPPORT: '[文件]',
        FACE_UNSUPPORT: '[扩展头像]',
        IMG_UNSUPPORT: '[图片]',
        CFACE_UNSUPPORT: '[自定义头像]',
        ONLINE: '客服#{0}已经上线了，您现在可以发起沟通！',
        TRANSFER: '您已被转移给其他客服',
        INPUT: '正在输入...'
    };
    a.ERROR = {
        INIT: '对不起，转接失败，请稍后重试连接',
        CONFLICT: '您输入的内容存在安全隐患，发送失败',
        OFFLINE: '客服已经离线，您目前无法发送消息',
        SEND_FAIL: '消息发送失败，请稍后重试',
        DROP_KICKED: '会话已被客服中止',
        DROP_CHATOVER: '本次沟通已结束，如有问题欢迎再次咨询',
        KICKED: '由于网络原因，您已离线'
    }
});
Qiao.define('im.net', [
    'base',
    'net',
    'im.config'
], function (c, J) {
    var K = 1000;
    var D = c.net,
    x = c.base.cookie,
    q = c.base.json.parse,
    g = c.base.dom.g,
    N = null,
    F = null,
    o = null,
    r = null,
    s = {
    },
    w = {
    },
    e = {
    },
    z = {
    },
    E = {
        seq: 0,
        bid: '',
        siteid: '',
        ucid: '',
        session: '',
        ack: ''
    },
    C = 'BD_QIAO_IM_NET',
    p = {
        GETUSERNAME: C + '_SCRIPT_USERNAME',
        GETGROUPNAME: C + '_SCRIPT_GETGROUPNAME',
        GETCOMPNAME: C + '_SCRIPT_COMPNAME'
    },
    A = c.im.config.URL;
    var v = true;
    function d(Q, O) {
        var P = document.getElementsByTagName('head') [0];
        if (g(Q)) {
            P.removeChild(g(Q))
        }
        if (O.indexOf('_t') < 0) {
            O += (O.indexOf('?') >= 0 ? '&' : '?') + '_t=' + u()
        }
        var G = document.createElement('script');
        G.setAttribute('type', 'text/javascript');
        G.setAttribute('language', 'javascript');
        G.setAttribute('id', Q);
        G.setAttribute('src', O);
        G.setAttribute('charset', 'UTF-8');
        P.appendChild(G)
    }
    function h(S, P, G) {
        var Q = document.getElementsByTagName('head') [0];
        var R = 'jsonp_' + ( + new Date());
        if (g(S)) {
            Q.removeChild(g(S))
        }
        if (P.indexOf('_t') < 0) {
            P += (P.indexOf('?') >= 0 ? '&' : '?') + '_t=' + u()
        }
        if (P.indexOf('callback') < 0) {
            Qiao.cb[R] = function (T) {
                delete Qiao.cb[R];
                G(T)
            };
            P += '&callback=Qiao.cb.' + R
        }
        var O = document.createElement('script');
        O.setAttribute('type', 'text/javascript');
        O.setAttribute('language', 'javascript');
        O.setAttribute('id', S);
        O.setAttribute('src', P);
        O.setAttribute('charset', 'UTF-8');
        Q.appendChild(O)
    }
    function k(Q, R) {
        if (!Q) {
            return
        }
        var O = A.QIAO_ROOT + 'statlog/stat.gif';
        var G = new Image();
        var P = '__IMG_LOG_' + u() + '__';
        O += '?siteid=' + E.siteid + '&ucid=' + E.ucid + '&type=' + Q;
        if (R) {
            O += '&' + R
        }
        O += '&_t=' + u();
        O += '&vis=float';
        window[P] = G;
        G.onload = G.onerror = function () {
            window[P] = null
        };
        G.src = O;
        G = null
    }
    function u() {
        return new Date().getTime().toString(36)
    }
    function b(P, O) {
        var R = O.onsuccess,
        G = O.onfailure,
        Q = O.data || '';
        O.onsuccess = function (T, S) {
            S = q(S);
            if (S.result && S.result.toLowerCase() == 'ok') {
                R && R.call(null, S.content)
            } else {
                G && G.call(null, S.result, S.content)
            }
        };
        O.onfailure = function () {
            G && G.call();
            k('webimneterror', 'url=' + encodeURIComponent(P))
        };
        Q += '&session=' + E.session;
        Q += '&seq=' + E.seq++;
        Q += '&_t=' + u();
        if (Q.charAt(0) == '&') {
            Q = Q.substring(1)
        }
        O.data = Q;
        return D.request(P, O)
    }
    function m(O, P, Q, G) {
        return b(O, {
            method: 'post',
            data: P,
            onsuccess: Q,
            onfailure: G
        })
    }
    function L(O, P, Q, G) {
        return b(O, {
            method: 'get',
            data: P,
            onsuccess: Q,
            onfailure: G
        })
    }
    function M(Q) {
        var O,
        P;
        if (!N) {
            return
        }
        N = null;
        clearTimeout(F);
        J.fire('timeupdate');
        var R = 0;
        var S = 0;
        var G = false;
        if (Q.fields && '[object Array]' == Object.prototype.toString.call(Q.fields)) {
            E.ack = Q.ack || E.ack;
            x.set('BRIDGE_ACK', E.ack, {
                expires: 15 * 1000
            });
            for (O = 0; P = Q.fields[O]; O++) {
                if (s[P.command]) {
                    s[P.command](P)
                }
                if (P.command == 'message' && P.result == 'ok') {
                    R++;
                    if (P.acks) {
                        S += P.acks.split(';').length
                    }
                } else {
                    if (P.command == 'msgacknotify' && P.result == 'ok') {
                        if (P.content && P.content.acks) {
                            S += P.content.acks.split(';').length
                        }
                    }
                }
            }
        } else {
            G = true
        }
        n({
            recMsgNum: R,
            recAckNum: S,
            recEmpty: G
        })
    }
    function i(G, O) {
        if (!N) {
            return
        }
        N = null;
        clearTimeout(F);
        if (G == 'offline') {
            clearInterval(r);
            J.fire('error', 'offline')
        } else {
            if (G == 'kicked') {
                clearInterval(r);
                J.fire('error', 'kicked')
            } else {
                n();
                J.fire('timeupdate')
            }
        }
    }
    function a() {
        clearTimeout(F);
        N.abort();
        N = null;
        n();
        k('picktimeout')
    }
    function n(P) {
        if (N) {
            return
        }
        if (!v) {
            return
        }
        var O = A.HI_SERVER + 'pick';
        var R = [
        ];
        var Q = '';
        if (P && P.recMsgNum) {
            R.push('recmsgs=' + P.recMsgNum)
        }
        if (P && P.recAckNum) {
            R.push('recacks=' + P.recAckNum)
        }
        if (P && P.recEmpty) {
            R.push('recempty=1')
        }
        if (R.length > 0) {
            Q = R.join('&')
        }
        var G = x.get('BRIDGE_ACK');
        N = L(O, Q + '&imuss=' + E.bid + '&siteid=' + E.siteid + '&ucid=' + E.ucid + '&ack=' + (G == null ? E.ack : G), M, i);
        F = setTimeout(a, 40000)
    }
    function H(G, O) {
        J.fire('error', G, O)
    }
    function B() {
        J.fire('stat:visitor')
    }
    function y(G) {
        m(A.HI_SERVER + 'communicate', 'imuss=' + G.bid + '&from=&to=' + G.to + '&tid=' + G.tid + '&siteid=' + G.siteid + '&ucid=' + G.ucid + '&body=' + G.msg + '&time=' + G.time + '&messageid=' + G.id, B, H)
    }
    function I(G) {
        y(G);
        G.resendTick = null;
        G.failTick = setTimeout(function () {
            H('sendFail');
            delete e[G.time];
            k('sendfail')
        }, 30 * 1000)
    }
    function t(Q) {
        var G,
        O,
        P;
        for (G = 0; O = Q[G]; G++) {
            P = e[O];
            if (P) {
                clearTimeout(P.resendTick);
                clearTimeout(P.failTick);
                delete e[O]
            }
        }
    }
    function l(O, G) {
        m(A.HI_SERVER + 'msgack', 'imuss=' + E.bid + '&siteid=' + E.siteid + '&ucid=' + E.ucid + '&from=' + encodeURIComponent(c.im.getData('referrer')) + '&to=' + encodeURIComponent(c.im.getData('userName')) + '&to_sub=' + (G || '0') + '&ackid=' + O)
    }
    function f(R) {
        var P,
        Q,
        O = [
        ],
        G;
        for (P in R) {
            Q = R[P];
            if (Object.prototype.toString.call(Q) == '[object Array]') {
                G = Q.length;
                while (G--) {
                    O.push(P + '=' + encodeURIComponent(Q[G]))
                }
            } else {
                O.push(P + '=' + encodeURIComponent(Q))
            }
        }
        return O.join('&')
    }
    function j(O, P) {
        var G = new Image();
        G.onload = function () {
        };
        O += (O.indexOf('?') > - 1 ? '&' : '?') + '_t=' + (new Date().getTime()).toString(36);
        if (typeof (P) == 'object') {
            P = f(P)
        }
        P += (P.length > 0 ? '&' : '') + 'seq=' + E.seq++;
        if (P.indexOf('&session=') == - 1) {
            P += '&session=' + E.session
        }
        G.src = O + '&' + P
    }
    s.message = function (O) {
        var Q,
        P;
        var G;
        if (O.showOnceType == undefined) {
            G = - 1;
            if (O.time == undefined) {
                J.fire('pick', 'message', O.content, O.time, G, O.from_sub)
            } else {
                Q = O.time;
                l(Q, O.from_sub);
                if (!w[Q]) {
                    w[Q] = true;
                    J.fire('pick', 'message', O.content, O.time, G, O.from_sub)
                }
            }
        } else {
            P = G = O.showOnceType;
            if (P == 1 && O.time != undefined) {
                l(O.time, O.from_sub)
            }
            if (!z[P]) {
                z[P] = true;
                J.fire('pick', 'message', O.content, O.time, G, O.from_sub)
            }
        }
        if (O.acks) {
            t(O.acks.split(';'))
        }
    };
    s.msgacknotify = function (G) {
        t(G.content.acks.split(';'))
    };
    s.scenefocusnotify = function (G) {
        clearInterval(r);
        r = setInterval(function () {
            J.fire('pick', 'customInput')
        }, K)
    };
    s.sceneunfocusnotify = function (G) {
        clearInterval(r)
    };
    s.scenemsgnotify = function (G) {
        J.fire('pick', 'input')
    };
    s.sendfileacknotify = function (G) {
    };
    s.sendfilecancelnotify = function (G) {
    };
    s.sendfilenotify = function (G) {
        G = G.content;
        m(A.HI_SERVER + 'sendfilecancel', 'username=' + G.username + '&siteid=' + E.siteid + '&ucid=' + E.ucid + '&fid=' + encodeURIComponent(G.fid) + '&imuss=' + E.bid);
        J.fire('pick', 'fileUnsupport')
    };
    s.sendfilestatusnotify = function () {
    };
    s.communicatetransfernotify = function (G) {
        J.fire('pick', 'transfer', G.content)
    };
    s.kicknotify = function (G) {
        if (G.content && G.content.type == '1') {
            J.fire('pick', 'kick')
        } else {
            if (G.content && G.content.type == '2') {
                J.fire('pick', 'chatover')
            }
        }
        clearInterval(r);
        v = false
    };
    s.offlinenotify = function (G) {
        J.fire('pick', 'offline', G.content)
    };
    s.assigntaskacknotify = function (G) {
        J.fire('pick', 'assigntask', G.content)
    };
    s.taskbeginnotify = function (G) {
        J.fire('pick', 'taskbegin', G.content)
    };
    J.init = function (P, G, O, Q) {
        E.siteid = P;
        E.ucid = G;
        E.bid = O;
        c.implement(c.net, Q)
    };
    J.setSiteId = function (G) {
        E.siteid = G
    };
    J.setSession = function (G) {
        E.session = G
    };
    J.setBid = function (G) {
        E.bid = G
    };
    J.welcome = function (P, O, G) {
        m(A.HI_SERVER + 'welcome', P, O, G)
    };
    J.bridgeInit = function (P, O, G) {
        m(A.HI_SERVER + 'bridgeinit', P, O, G)
    };
    J.getPrepareWord = function (P, O, G) {
        m(A.HI_SERVER + 'prepare', P, O, G)
    };
    J.pick = function (O, G) {
        if (G) {
            v = G
        }
        E.ack = O || '';
        n()
    };
    J.pause = function () {
        if (N) {
            clearTimeout(F);
            N.abort();
            N = null
        }
        return {
            seq: E.seq,
            ack: E.ack
        }
    };
    J.stopPick = function () {
        if (N) {
            N.abort();
            N = null
        }
        clearTimeout(F)
    };
    J.restart = function (O, G) {
        if (N) {
            return
        }
        v = true;
        E.seq = G || E.seq;
        E.ack = O || E.ack;
        n()
    };
    J.communicate = function (Q, G) {
        var P = G.time || (new Date().getTime()),
        O = {
            bid: E.bid,
            msg: encodeURIComponent(Q),
            tid: G.tid,
            siteid: E.siteid,
            ucid: E.ucid,
            to: encodeURIComponent(G.to)
        };
        O.id = E.seq;
        O.time = P;
        O.resendTick = setTimeout(function () {
            I(O)
        }, 30 * 1000);
        e[P] = O;
        y(O)
    };
    J.logout = function () {
        j(A.HI_SERVER + 'logout', {
            imuss: E.bid,
            siteid: E.siteid,
            ucid: E.ucid
        })
    };
    J.writing = function (G) {
        m(A.HI_SERVER + 'scenemsg', f(G))
    };
    J.getClientName = function (G, P) {
        var O = [
            'siteid=' + E.siteid
        ];
        O.push('ucid=' + E.ucid);
        O.push('subid=' + G);
        h(p.GETUSERNAME, A.QIAO_ROOT + '?module=default&controller=webim&action=getUserName&' + O.join('&'), P)
    };
    J.getGroupName = function (Q, P, G) {
        var O = [
            'siteid=' + E.siteid
        ];
        O.push('ucid=' + E.ucid);
        if (G) {
            O.push('subid=' + Q)
        } else {
            O.push('groupid=' + Q)
        }
        h(p.GETGROUPNAME, A.QIAO_ROOT + '?module=default&controller=webim&action=getGroupName&' + O.join('&'), P)
    };
    J.getCompName = function (G, P) {
        var O = [
            'siteid=' + E.siteid
        ];
        O.push('ucid=' + E.ucid);
        O.push('mainid=' + G);
        h(p.GETCOMPNAME, A.QIAO_ROOT + '?module=default&controller=webim&action=getUserCompName&' + O.join('&'), P)
    };
    J.setURL = function (G) {
        var O;
        for (O in A) {
            if (A.hasOwnProperty(O)) {
                if (G[O]) {
                    A[O] = G[O]
                }
            }
        }
    };
    J.uploadLog = k
});
Qiao.define('im.message', [
    'base',
    'im.config',
    'im.lang'
], function (f, r) {
    var q = f.im.config,
    s = f.im.lang,
    l = q.face,
    p = f.base.browser,
    h = f.base.string.encodeHTML,
    b = f.base.string.decodeHTML,
    a = {
        simpleFace: {
            replacer: function (t) {
                t = t.replace(/\(([^)]+)\)/g, function (v, u) {
                    var w = '(' + u + ')';
                    if (l[u]) {
                        w = 'face ' + u + ''
                    }
                    return w
                });
                return t
            },
            parse: function (u) {
                var t = {
                };
                t.xml = '<face n="' + u + '"/>';
                t.json = '{"type":"face","n":"' + u + '"}';
                return t
            }
        },
        face: {
            replacer: function (t) {
                t = t.replace(/<img([^>]+)>/gi, function (v, u) {
                    var w;
                    if (u.indexOf('data-type="face"') >= 0) {
                        u.replace(/data-name="(.+?)"/, function (y, x) {
                            w = x
                        });
                        if (l[w]) {
                            w = 'face ' + w + ''
                        }
                    } else {
                        w = v
                    }
                    return w
                });
                return t
            },
            parse: function (u) {
                var t = {
                };
                t.xml = '<face n="' + u + '"/>';
                t.json = '{"type":"face","n":"' + u + '"}';
                return t
            }
        },
        url: {
            replacer: function (t) {
                t = t.replace(/<a[^>]+href=(\'|\")([^\'\"\s]+)\1[^>]*>[^<>]+<\/a>/gi, function (v, u, w) {
                    if (w !== '') {
                        return 'url ' + w + ''
                    }
                    return v
                });
                return t
            },
            parse: function (u) {
                var t = {
                };
                t.xml = '<url ref="' + u + '"/>';
                t.json = '{"type":"url","ref":"' + u + '","c":"' + u + '"}';
                return t
            }
        }
    },
    d = {
        n: {
            name: 'fontFamily',
            handle: function (t) {
                return t
            }
        },
        s: {
            name: 'fontSize',
            handle: function (t) {
                return t + 'pt'
            }
        },
        c: {
            name: 'color',
            handle: function (t) {
                return k(t)
            }
        },
        b: {
            name: 'fontWeight',
            handle: function (t) {
                return t == '1' ? 'bold' : 'normal'
            }
        },
        i: {
            name: 'fontStyle',
            handle: function (t) {
                return t == '1' ? 'italic' : 'normal'
            }
        },
        ul: {
            name: 'textDecoration',
            handle: function (t) {
                return t == '1' ? 'underline' : 'none'
            }
        }
    },
    e = {
        text: function (u) {
            var t = h(u.c);
            return t.replace(/\r\n/gi, '<br/>').replace(/&amp;#xD;&amp;#xA;/gi, '<br/>').replace(/%2B/gi, '+')
        },
        voice: function (v) {
            var u = h(v.c);
            var t = u ? '<span class="mess-res-voice">语音转译：</span>' : '<span class="mess-res-voice">语音转译：未能识别语音</span>';
            u = t + u;
            return '<div class="voice-rtf">' + u + '</div>'
        },
        html: function (t) {
            return g(t.c)
        },
        font: function (x) {
            var u,
            w,
            v,
            t = {
            };
            for (u in d) {
                if (d.hasOwnProperty(u)) {
                    w = x[u];
                    v = d[u];
                    t[v.name] = v.handle.call(null, w)
                }
            }
            return t
        },
        face: function (v) {
            var u = l[v.n],
            t = q.URL.QIAO_ROOT + q.FACE_ROOT;
            if (u) {
                return '<img src="' + t + u + '.gif" />'
            } else {
                return s.TEXT.FACE_UNSUPPORT
            }
        },
        img: function (t) {
            return s.TEXT.IMG_UNSUPPORT
        },
        cface: function (t) {
            return s.TEXT.CFACE_UNSUPPORT
        },
        url: function (v) {
            var u = v.ref;
            if (u.search(/^http/) == - 1) {
                u = 'http://' + u
            }
            var t = v.c.replace(/\r\n/gi, '<br>');
            if (v.t) {
                return '<a target="_blank" class="bd-map" href="' + u + '">' + t + '</a>'
            } else {
                return '<a target="_blank" href="' + u + '">' + t + '</a>'
            }
        }
    };
    var i = {
        address: 1,
        blockquote: 1,
        center: 1,
        dir: 1,
        div: 1,
        dl: 1,
        fieldset: 1,
        form: 1,
        h1: 1,
        h2: 1,
        h3: 1,
        h4: 1,
        h5: 1,
        h6: 1,
        hr: 1,
        isindex: 1,
        menu: 1,
        noframes: 1,
        ol: 1,
        p: 1,
        pre: 1,
        table: 1,
        ul: 1
    };
    var c = (p.ie && p.ie == 6) ? '﻿' : '​';
    function g(v) {
        var u = new RegExp(c, 'g'),
        t = v.replace(/[\n\r]/g, '');
        t = t.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(/(\n)?<\/([^>]+)>/g, function (x, w, y) {
            return i[y.toLowerCase()] ? '\n' : w ? w : ''
        }).replace(/<[^>]+>/g, '').replace(/(\n)+/g, '<br />');
        return t.replace(u, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ')
    }
    function k(t) {
        if (isNaN(t)) {
            return '#000000'
        }
        t = new Number(t).toString(16).toUpperCase();
        t = ('000000' + t).substr(t.length);
        return '#' + t.substr(4) + t.substr(2, 2) + t.substr(0, 2)
    }
    function m(t) {
        if (!/^\#[\da-f]{6}$/i.test(t)) {
            return 0
        }
        t = t.substr(5) + t.substr(3, 2) + t.substr(1, 2);
        return parseInt(t, 16)
    }
    function j(v) {
        var t,
        u;
        if (v.indexOf('#') >= 0) {
            return v
        } else {
            if (v.toLowerCase().indexOf('rgb') >= 0) {
                v = v.toLowerCase().replace(/\s*rgb\s*\(/g, '').replace(/\s*\)\s*/g, '');
                v = v.split(/\s*,\s*/);
                for (t = 0; u = v[t]; t++) {
                    v[t] = parseInt(u, 10).toString(16);
                    if (v[t].length <= 1) {
                        v[t] = '0' + v[t]
                    }
                }
                return '#' + v.join('')
            } else {
                return ''
            }
        }
    }
    function o(x) {
        var u = [
            '<font'
        ],
        w = [
        ],
        t,
        v = 10;
        x = x || {
        };
        if (x.fontSize) {
            v = parseInt(x.fontSize, 10)
        }
        x.fontFamily = x.fontFamily ? x.fontFamily.replace(/^"|"$/g, '')  : '';
        u.push(' n="' + (x.fontFamily ? x.fontFamily : 'simsun') + '"');
        u.push(' s="' + v + '"');
        t = j(x.color || '');
        u.push(' c="' + (t ? m(t)  : '0') + '"');
        u.push(' b="' + (x.fontWeight == 'bold' || x.fontWeight == '700' ? 1 : 0) + '"');
        u.push(' i="' + (x.fontStyle == 'italic' ? 1 : 0) + '"');
        u.push(' ul="' + (x.textDecoration == 'underline' ? 1 : 0) + '"');
        u.push('/>');
        w.push('{"type":"font",');
        w.push('"n":"' + (x.fontFamily ? x.fontFamily : 'simsun') + '",');
        w.push('"s":"' + v + '",');
        w.push('"c":"' + (t ? m(t)  : '0') + '",');
        w.push('"b":"' + (x.fontWeight == 'bold' || x.fontWeight == '700' ? 1 : 0) + '",');
        w.push('"i":"' + (x.fontStyle == 'italic' ? 1 : 0) + '",');
        w.push('"ul":"' + (x.textDecoration == 'underline' ? 1 : 0) + '"');
        w.push('}');
        return {
            xml: u.join(''),
            json: w.join('')
        }
    }
    function n(x, t) {
        var v,
        w,
        u = {
        };
        for (v = 0; w = t[v]; v++) {
            w = a[w];
            if (w) {
                x = w.replacer(x)
            }
        }
        x = x.replace(/<br\/?>/gi, '&#xD;&#xA;').replace(/<[^>]+>/gm, '').replace(/\&nbsp;?/g, ' ').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/(\r|\n|\r\n)/g, '&#xD;&#xA;');
        u.json = x.replace(/(^|\x0f)([^\x0f\x0e]+)(\x0f|$)/gm, '$1{"type":"text", "c":"$2"},$3');
        u.xml = x.replace(/(^|\x0f)([^\x0f\x0e]+)(\x0f|$)/gm, '$1<text c="$2"/>$3');
        u.json = u.json.replace(/\x0f\x0e([^\x0f]+)\x0f/g, function (z, y) {
            var A;
            y = y.split(' ');
            A = a[y[0]];
            if (A) {
                return A.parse(y[1]).json + ','
            }
        });
        u.xml = u.xml.replace(/\x0f\x0e([^\x0f]+)\x0f/g, function (z, y) {
            var A;
            y = y.split(' ');
            A = a[y[0]];
            if (A) {
                return A.parse(y[1]).xml
            }
        });
        u.json = u.json.replace(/,\s*$/, '');
        return u
    }
    r.parseText = function (w) {
        var u = [
        ],
        t = [
        ],
        v;
        v = o();
        t.push(v.xml);
        u.push(v.json);
        v = n(w, [
            'simpleFace'
        ]);
        t.push(v.xml);
        u.push(v.json);
        return {
            xml: '<msg>' + t.join('') + '</msg>',
            json: '[' + u.join(',') + ']'
        }
    };
    r.parseRichText = function (x, v) {
        var u = [
        ],
        t = [
        ],
        w;
        w = o(v);
        t.push(w.xml);
        u.push(w.json);
        w = n(x, [
            'face'
        ]);
        t.push(w.xml);
        u.push(w.json);
        return {
            xml: '<msg>' + t.join('') + '</msg>',
            json: '[' + u.join(',') + ']'
        }
    };
    r.parseMessage = function (y) {
        var v = [
        ],
        u,
        x,
        w,
        t = {
        };
        for (u = 0; x = y[u]; u++) {
            w = e[x.type];
            if (w) {
                if (x.type == 'font') {
                    t.style = w(x)
                } else {
                    v.push(w(x))
                }
            }
        }
        t.content = v.join('');
        return t
    }
});
Qiao.define('im.face', [
    'base',
    'im.config'
], function (e, c) {
    var d = e.base.dom,
    j = e.base.event,
    k = d.g,
    a = e.im.config,
    i = j.on,
    h = j.un;
    var f = {
        ROOT: a.URL.QIAO_ROOT + a.FACE_ROOT,
        FACE_TAB: 'FaceTab',
        FACE_GROUP: 'FaceGroup',
        ROW: 6,
        CELL: 12,
        _index: {
        },
        wrap: null,
        curEle: null
    };
    var b = {
        init: function (m, z, x) {
            var t = [
            ],
            n = [
            ],
            s,
            w,
            l,
            p,
            y,
            q,
            r,
            v = f._index,
            o = a.face,
            u = f.ROOT;
            m = k(m);
            z = z || f.ROW;
            x = x || f.CELL;
            t.push('<table cellspacing="0" cellpadding="0">');
            for (s in o) {
                n.push({
                    name: s,
                    md5: o[s]
                })
            }
            for (var q = 0, y = 0; q < z; q++) {
                t.push('<tr>');
                for (var p = 0; p < x; p++) {
                    r = n[y];
                    if (r) {
                        t.push('<td><a href="javascript:;"><img src="' + u + r.md5 + '.gif" title="' + r.name + '" alt="' + r.name + '" class="J-face-item" /></a></td>')
                    } else {
                        t.push('<td><span></span></td>')
                    }
                    y++
                }
                t.push('</tr>')
            }
            t.push('</table>');
            m.innerHTML = t.join('');
            d.addClass(m, 'BD-QIAO-IM-FACE-WRAP');
            f.wrap = m;
            m.style.display = 'none';
            b.bindEvents(m)
        },
        bindEvents: function (l) {
            i(l, 'click', g.clickHandle)
        },
        bindBlankEvent: function () {
            i(document, 'click', g.onBlankClick)
        },
        unbindBlankEvent: function () {
            h(document, 'click', g.onBlankClick)
        },
        hide: function () {
            f.wrap.style.display = 'none';
            c.fire('facehide', f.curEle);
            b.unbindBlankEvent()
        }
    };
    var g = {
        onBlankClick: function (l) {
            var n = l || window.event,
            m = n.target || n.srcElement;
            if (m == f.curEle) {
                return
            }
            b.hide()
        },
        clickHandle: function (l) {
            var n = l || window.event,
            m = n.target || n.srcElement;
            j.stopPropagation(n);
            if (d.hasClass(m, 'J-face-tab')) {
                g.switchTab(n, m)
            } else {
                if (d.hasClass(m, 'J-face-item')) {
                    g.insert(n, m)
                }
            }
        },
        switchTab: function (q, o) {
            j.preventDefault(q);
            d.addClass(o, 'active');
            o.blur();
            var m = k(f.FACE_TAB).getElementsByTagName('a'),
            p = k(f.FACE_GROUP).getElementsByTagName('table'),
            l,
            r;
            for (l = 0, r = m.length; l < r; l++) {
                if (m[l] != o) {
                    d.removeClass(m[l], 'active')
                }
                if (p[l].id + 'Tab' != o.id) {
                    p[l].style.display = 'none'
                } else {
                    p[l].style.display = ''
                }
            }
        },
        insert: function (n, m) {
            j.preventDefault(n);
            b.hide();
            var l = '<img src="' + m.src + '" data-type="face" data-name="' + m.title + '"/>';
            c.fire('faceselect', l)
        }
    };
    c.init = b.init;
    c.show = function (l) {
        f.curEle = l;
        f.wrap.style.display = '';
        c.fire('faceshow');
        b.bindBlankEvent()
    };
    c.hide = b.hide
});
Qiao.define('im.font', [
    'base'
], function (g, d) {
    var e = g.base.dom,
    m = e.g,
    a = g.base.browser,
    l = g.base.event,
    j = l.on;
    var f = [
        '宋体',
        '楷体_GB2312',
        '黑体',
        '隶书',
        'Times New Roman',
        'Arial'
    ],
    k = [
        {
            text: '8',
            value: '8pt'
        },
        {
            text: '9',
            value: '9pt'
        },
        {
            text: '10',
            value: '10pt'
        },
        {
            text: '11',
            value: '11pt'
        },
        {
            text: '12',
            value: '12pt'
        },
        {
            text: '14',
            value: '14pt'
        },
        {
            text: '16',
            value: '16pt'
        },
        {
            text: '18',
            value: '18pt'
        },
        {
            text: '20',
            value: '20pt'
        },
        {
            text: '22',
            value: '22pt'
        },
        {
            text: '24',
            value: '24pt'
        },
        {
            text: '26',
            value: '26pt'
        },
        {
            text: '28',
            value: '28pt'
        },
        {
            text: '36',
            value: '36pt'
        },
        {
            text: '48',
            value: '48pt'
        },
        {
            text: '72',
            value: '72pt'
        }
    ],
    c = '<table border="0" cellspacing="0" cellpadding="0"><tr><td><a href="#"><span style="background-color:#990000"></span></a></td><td><a href="#"><span style="background-color:#ff0000"></span></a></td><td><a href="#"><span style="background-color:#ff9900"></span></a></td><td><a href="#"><span style="background-color:#ffffff"></span></a></td></tr><tr><td><a href="#"><span style="background-color:#ffff00"></span></a></td><td><a href="#"><span style="background-color:#99ff99"></span></a></td><td><a href="#"><span style="background-color:#006600"></span></a></td><td><a href="#"><span style="background-color:#666666"></span></a></td></tr><tr><td><a href="#"><span style="background-color:#99ccff"></span></a></td><td><a href="#"><span style="background-color:#000099"></span></a></td><td><a href="#"><span style="background-color:#990066"></span></a></td><td><a href="#"><span style="background-color:#000000"></span></a></td></tr></table>';
    var h = {
        wrap: null,
        _b: false,
        _i: false,
        _u: false,
        view: {
        }
    };
    var b = {
        init: function (p) {
            var o = document.createDocumentFragment(),
            n = h.view;
            e.addClass(p, 'BD-QIAO-IM-FONT-WRAP');
            n.family = b.createSelect('m-font-family-select', f);
            o.appendChild(n.family);
            n.fontSize = b.createSelect('m-font-size-select', k, '9pt');
            o.appendChild(n.fontSize);
            n.bold = e.create('a', {
                className: 'm-font-bold m-font-btn',
                title: '加粗'
            });
            n.italic = e.create('a', {
                className: 'm-font-italic m-font-btn',
                title: '斜体'
            });
            n.underline = e.create('a', {
                className: 'm-font-underline m-font-btn',
                title: '下划线'
            });
            n.fontColor = e.create('a', {
                className: 'm-font-color m-font-btn',
                title: '字体颜色'
            });
            n.palette = e.create('div', {
                className: 'm-font-palette'
            });
            n.palette.style.display = 'none';
            n.palette.innerHTML = c;
            o.appendChild(n.bold);
            o.appendChild(n.italic);
            o.appendChild(n.underline);
            o.appendChild(n.fontColor);
            o.appendChild(n.palette);
            p.appendChild(o);
            h.wrap = p;
            p.style.display = 'none';
            b.bindEvents()
        },
        createSelect: function (o, u, t) {
            var n = e.create('select', {
                className: o || ''
            }),
            s = Object.prototype.toString,
            r,
            q,
            p = 0;
            for (r = 0; (q = u[r]); r++) {
                if (s.call(q) == '[object Object]') {
                    if (q.value == t) {
                        p = r
                    }
                    n.options.add(new Option(q.text, q.value))
                } else {
                    if (q == t) {
                        p = r
                    }
                    n.options.add(new Option(q, q))
                }
            }
            n.selectedIndex = p;
            return n
        },
        bindEvents: function () {
            var n = h.view;
            j(n.family, 'change', i.setFontFamily);
            j(n.fontSize, 'change', i.setFontSize);
            j(h.wrap, 'click', i.clickHandle);
            j(n.palette, 'click', i.onColorSelect)
        },
        bindBlankEvent: function () {
            j(document, 'click', i.onBlankClick)
        },
        unbindBlankEvent: function () {
            l.un(document, 'click', i.onBlankClick)
        },
        showSelect: function () {
            var n = h.view;
            if (h.wrap.style.display == 'none') {
                return
            }
            if (a.ie) {
                n.family.style.visibility = 'visible';
                n.fontSize.style.visibility = 'visible'
            }
        }
    };
    var i = {
        onColorSelect: function (n) {
            var p = n || window.event,
            o = p.target || p.srcElement;
            if (o.tagName.toLowerCase() == 'span') {
                i.setColor(p, o)
            }
        },
        setFontFamily: function () {
            d.fire('fontfamilychange', this.options[this.selectedIndex].value)
        },
        setFontSize: function () {
            d.fire('fontsizechange', this.options[this.selectedIndex].value)
        },
        onBlankClick: function (n) {
            var p = n || window.event,
            o = p.target || p.srcElement;
            if (o == h.view.palette) {
                return
            }
            i.hidePalette()
        },
        clickHandle: function (n) {
            var p = n || window.event,
            o = p.target || p.srcElement;
            if (e.hasClass(o, 'm-font-bold')) {
                i.setBold(o)
            } else {
                if (e.hasClass(o, 'm-font-italic')) {
                    i.setItalic(o)
                } else {
                    if (e.hasClass(o, 'm-font-underline')) {
                        i.setUnderline(o)
                    } else {
                        if (e.hasClass(o, 'm-font-color')) {
                            i.showPalette(p, o)
                        }
                    }
                }
            }
        },
        setBold: function (n) {
            if (!h._b) {
                e.addClass(n, 'm-font-bold-on');
                h._b = true
            } else {
                e.removeClass(n, 'm-font-bold-on');
                h._b = false
            }
            d.fire('fontboldchange', h._b)
        },
        setItalic: function (n) {
            if (!h._i) {
                e.addClass(n, 'm-font-italic-on');
                h._i = true
            } else {
                e.removeClass(n, 'm-font-italic-on');
                h._i = false
            }
            d.fire('fontitalicchange', h._i)
        },
        setUnderline: function (n) {
            if (!h._u) {
                e.addClass(n, 'm-font-underline-on');
                h._u = true
            } else {
                e.removeClass(n, 'm-font-underline-on');
                h._u = false
            }
            d.fire('fontunderlinechange', h._u)
        },
        showPalette: function (o, n) {
            l.stopPropagation(o);
            n.blur();
            h.view.palette.style.display = '';
            e.addClass(n, 'm-font-color-on');
            b.bindBlankEvent()
        },
        hidePalette: function () {
            var n = h.view;
            n.palette.style.display = 'none';
            e.removeClass(n.fontColor, 'm-font-color-on');
            b.unbindBlankEvent()
        },
        setColor: function (o, n) {
            l.preventDefault(o);
            i.hidePalette();
            d.fire('fontcolorchange', n.style.backgroundColor)
        }
    };
    d.init = b.init;
    d.toggle = function (o) {
        var n = h.wrap;
        o.blur();
        if (n.style.display == '') {
            n.style.display = 'none';
            e.removeClass(o, 'btn-font-active')
        } else {
            n.style.display = '';
            e.addClass(o, 'btn-font-active');
            b.showSelect()
        }
    };
    d.hideSelect = function () {
        var n = h.view;
        if (h.wrap.style.display == 'none') {
            return
        }
        if (a.ie) {
            n.family.style.visibility = 'hidden';
            n.fontSize.style.visibility = 'hidden'
        }
        n.palette.style.display = 'none'
    };
    d.showSelect = b.showSelect
});
Qiao.define('im.editor', [
    'im.face',
    'im.font'
], function (g, e) {
    var f = g.base.dom,
    b = g.base.browser,
    m = f.create,
    k = g.base.event.on,
    i = g.im.face,
    c = g.im.font;
    var a = {
        tool: '<a href="#" class="m-lite-tool-sp-btn btn-export">导出聊天记录</a><a href="#" class="m-lite-tool-btn btn-face"></a><a href="#" class="m-lite-tool-btn btn-font"></a>',
        editor: '<html><head><style type="text/css">html,body{height:100%;padding:0px;margin:0px}p{margin:0px}img{margin:0 2px}</style></head><body style="font-size:9pt;line-height:1.5;cursor:text"></body></html>'
    },
    l = 'CE',
    j = {
    };
    var d = {
        init: function (n) {
            var o;
            j.tool = m('div', {
                className: 'm-lite-tool'
            });
            j.tool.innerHTML = a.tool;
            j.face = m('div', {
                className: 'm-lite-tool-face'
            });
            j.tool.appendChild(j.face);
            j.font = m('div', {
                className: 'm-lite-tool-font'
            });
            j.tool.appendChild(j.font);
            n.appendChild(j.tool);
            j.inputArea = m('div', {
                className: 'm-lite-input-area'
            });
            j.input = m('iframe', {
                frameborder: 0
            });
            j.inputArea.appendChild(j.input);
            n.appendChild(j.inputArea);
            j.wrap = n;
            i.init(j.face, 6, 10);
            c.init(j.font);
            o = j.input.contentWindow.document;
            o.open();
            o.write(a.editor);
            o.close();
            o.designMode = 'on';
            d.bindEvents()
        },
        bindEvents: function () {
            var n = j.input.contentWindow.document;
            k(j.wrap, 'click', h.clickHandle);
            k(n, 'keydown', h.handleInput);
            k(n, 'click', h.clickMontior);
            if (b.ie) {
                k(n, 'click', h.saveRange);
                k(n, 'keyup', h.saveRange);
                k(n, 'select', h.saveRange)
            }
            i.on('faceshow', h.onFaceShow);
            i.on('facehide', h.onFaceHide);
            i.on('faceselect', h.onFaceSelect);
            c.on('fontshow', h.onFontShow);
            c.on('fonthide', h.onFontHide);
            c.on('fontboldchange', h.onFontBoldChange);
            c.on('fontitalicchange', h.onFontItalicChange);
            c.on('fontunderlinechange', h.onFontUnderlineChange);
            c.on('fontfamilychange', h.onFontFamilyChange);
            c.on('fontsizechange', h.onFontSizeChange);
            c.on('fontcolorchange', h.onFontColorChange)
        },
        getEditorBody: function () {
            return j.input.contentWindow.document.body
        },
        editorFocus: function () {
            var o = j.input.contentWindow;
            o.focus();
            if (b.ie) {
                var n = o.range || (o.document.selection.createRange());
                n.select()
            }
        },
        getEditorStyle: function () {
            var o = {
            },
            n,
            q,
            p = d.getEditorBody(),
            r = [
                'fontFamily',
                'fontSize',
                'color',
                'fontWeight',
                'fontStyle',
                'textDecoration'
            ];
            for (n = 0; q = r[n]; n++) {
                if (p.style[q]) {
                    o[q] = p.style[q]
                }
            }
            return o
        }
    };
    var h = {
        clickMontior: function () {
            e.fire('focus')
        },
        clickHandle: function (n) {
            var p = n || window.event,
            o = p.target || p.srcElement;
            if (f.hasClass(o, 'btn-face')) {
                h.showFace(o)
            } else {
                if (f.hasClass(o, 'btn-font')) {
                    h.toggleFont(o)
                } else {
                    if (f.hasClass(o, 'btn-export')) {
                        h.exportHistory()
                    }
                }
            }
        },
        saveRange: function () {
            var n = j.input.contentWindow;
            n.range = n.document.selection.createRange()
        },
        exportHistory: function () {
            e.fire('exporthistory')
        },
        onFontBoldChange: function (n) {
            d.editorFocus();
            var o = d.getEditorBody();
            o.style.fontWeight = n ? 'bold' : 'normal'
        },
        onFontItalicChange: function (n) {
            d.editorFocus();
            var o = d.getEditorBody();
            o.style.fontStyle = n ? 'italic' : 'normal'
        },
        onFontUnderlineChange: function (n) {
            d.editorFocus();
            var o = d.getEditorBody();
            o.style.textDecoration = n ? 'underline' : 'none'
        },
        onFontFamilyChange: function (n) {
            d.editorFocus();
            var o = d.getEditorBody();
            o.style.fontFamily = n ? n : '宋体'
        },
        onFontSizeChange: function (n) {
            d.editorFocus();
            var o = d.getEditorBody();
            o.style.fontSize = n ? n : '9pt'
        },
        onFontColorChange: function (n) {
            d.editorFocus();
            var o = d.getEditorBody();
            o.style.color = n ? n : '#000'
        },
        showFace: function (n) {
            n.blur();
            f.addClass(n, 'btn-face-active');
            i.show(n)
        },
        toggleFont: function (n) {
            c.toggle(n)
        },
        onFaceShow: function () {
            c.hideSelect()
        },
        onFaceHide: function (n) {
            c.showSelect();
            f.removeClass(n, 'btn-face-active')
        },
        onFaceSelect: function (q) {
            var s = j.input.contentWindow;
            var r = s.document;
            s.focus();
            if (b.ie) {
                var o = s.range || (s.document.selection.createRange());
                o.select();
                o.pasteHTML(q);
                o.select();
                var u = r.getElementsByTagName('img');
                var t = u.length;
                for (var p = 0; p < t; p++) {
                    u[p].onresizestart = function () {
                        return false
                    }
                }
            } else {
                r.execCommand('insertHTML', false, q)
            }
        },
        forbid: function (n) {
            if (n.keyCode == 116) {
                if (b.ie) {
                    n.keyCode = 0
                }
                Evt.preventDefault(n);
                return false
            }
            if ((n.ctrlKey && n.keyCode == 82) || (n.altKey && n.keyCode == 39) || (n.altKey && n.keyCode == 37) || (n.shiftKey && n.keyCode == 121)) {
                Evt.preventDefault(n);
                return false
            }
        },
        handleInput: function (n) {
            var o = n || window.event;
            h.forbid(o);
            if (o.keyCode == 83 && o.altKey) {
                Evt.preventDefault(o);
                e.fire('editorsend');
                return
            }
            if (l == 'CE') {
                if (o.keyCode == 13 && o.ctrlKey) {
                    e.fire('editorsend')
                }
            } else {
            }
        }
    };
    e.getStyle = d.getEditorStyle;
    e.getContent = function () {
        return d.getEditorBody().innerHTML
    };
    e.clear = function () {
        d.getEditorBody().innerHTML = ''
    };
    e.isMultilineMode = function () {
        return l == 'CE'
    };
    e.init = d.init
});
Qiao.define('localStorage.html5', [
    'base'
], function (f, d) {
    var g = f.base,
    c = g.json,
    h = g.browser;
    var b = (function () {
        var j = null,
        i = 365,
        k;
        return {
            build: function (m) {
                var l = this;
                m = m || {
                };
                k = m.fileName || location.hostname;
                i = m.expires || i;
                return l
            },
            _setup: function () {
                var l = this;
                if (!j) {
                    try {
                        j = document.createElement('input');
                        j.type = 'hidden';
                        j.addBehavior('#default#userData');
                        document.body.appendChild(j)
                    } catch (m) {
                        return false
                    }
                }
                return true
            },
            setItem: function (m, n) {
                var l = this,
                o = new Date();
                if (!l._setup()) {
                    return
                }
                n = typeof n === 'string' ? n : c.stringfy(n);
                o.setDate(o.getDate() + i);
                j.expires = o.toUTCString();
                j.load(k);
                j.setAttribute(m, n);
                j.save(k)
            },
            getItem: function (m) {
                var l = this;
                if (!l._setup()) {
                    return
                }
                j.load(k);
                return j.getAttribute(m)
            },
            removeItem: function (m) {
                var l = this;
                if (!l._setup()) {
                    return
                }
                j.load(k);
                j.removeAttribute(m);
                j.save(k)
            },
            clear: function () {
                var l = new Date();
                l.setDate(l.getDate() - 1);
                j.expires = l.toUTCString()
            }
        }
    }());
    var a = {
        INTERVAL: 1000,
        ls: null,
        useTimer: h.ie && h.ie < 8,
        timer: null,
        keyEvent: {
        }
    };
    var e = {
        onStorage: function (k, i, l) {
            var j = a.ls.getItem(k);
            l = l || null;
            return function (m) {
                setTimeout(function () {
                    m = m || window.storageEvent;
                    var o = m.key,
                    p = m.newValue;
                    if (!o) {
                        var n = a.ls.getItem(k);
                        if (n != j) {
                            o = k;
                            p = n
                        }
                    }
                    if (o == k) {
                        i && i.call(l, m.oldValue || j, p);
                        j = p
                    }
                }, 0)
            }
        }
    };
    d.init = function (i) {
        if (window.localStorage) {
            a.ls = window.localStorage
        } else {
            a.ls = b;
            a.ls.build(i)
        }
    };
    d.setItem = function (i, j) {
        j = typeof j === 'string' ? j : c.stringify(j);
        return a.ls.setItem(i, j)
    };
    d.getItem = function (i) {
        return a.ls.getItem(i)
    };
    d.removeItem = function (i) {
        return a.ls.removeItem(i)
    };
    d.clear = function () {
        a.ls.clear()
    };
    d.addStorageEvent = function (i, j) {
        var k,
        l;
        if (!a.useTimer) {
            k = e.onStorage(i, j);
            if (document.attachEvent && !h.opera) {
                document.attachEvent('onstorage', k)
            } else {
                window.addEventListener('storage', k, false)
            }
        } else {
            k = e.onStorage(i, j);
            a.timer = setInterval(function () {
                k({
                })
            }, a.INTERVAL)
        }
    };
    d.removeStorageEvent = function (i, j) {
    }
});
Qiao.define('business.pageSync', [
    'base',
    'localStorage.html5'
], function (e, d) {
    var i = e.base.json,
    k = e.base.event,
    j = e.localStorage.html5,
    a = e.base.browser;
    var b = {
        siteid: ''
    };
    var g = {
        pageId: '',
        ls: null,
        keyMap: {
            ACTIVEPAGE: 'baidu_qiao_activePage',
            PAGELIST: 'baidu_qiao_pageList',
            CUSTOMKEY: 'baidu_qiao_page_custom_key',
            COOKIEKEY: 'baidu_qiao_v3_count'
        }
    };
    var f = {
        guid: function (l) {
            l = l || 'qiao';
            return l + '_' + ( + new Date()).toString(16)
        },
        removeArray: function (n, m) {
            var l = n.length;
            while (l--) {
                if (l in n && n[l] === m) {
                    n.splice(l, 1)
                }
            }
            return n
        },
        sleep: function (m) {
            var l = new Date().getTime();
            while (new Date().getTime() - l <= m) {
            }
        },
        indexOfArray: function (p, m, o) {
            var l = p.length,
            n = m;
            o = o | 0;
            if (o < 0) {
                o = Math.max(0, l + o)
            }
            for (; o < l; o++) {
                if (o in p && p[o] === m) {
                    return o
                }
            }
            return - 1
        },
        setCookie: function (l, m) {
            document.cookie = l + '=' + escape(m)
        },
        getCookie: function (m) {
            var l = document.cookie.match(new RegExp('(^| )' + m + '=([^;]*)(;|$)'));
            if (l != null) {
                return unescape(l[2])
            }
            return ''
        }
    };
    var c = {
        checkIfFirst: function () {
            var l = g.keyMap.COOKIEKEY,
            m = f.getCookie(l);
            if (m == '') {
                f.setCookie(l, 1);
                return true
            }
            return false
        },
        setLs: function () {
            var n = g.pageId,
            m = g.ls,
            p = g.keyMap.PAGELIST,
            o = i.parse(m.getItem(p)) || [],
            l = o.length == 0 ? true : false;
            o.push(n);
            m.setItem(p, o);
            h.activePage(l)
        },
        clearLs: function () {
            var l = g.ls,
            n = g.keyMap,
            m;
            l.removeItem(n.ACTIVEPAGE);
            l.removeItem(n.PAGELIST)
        },
        bindEvent: function () {
            var l = g.ls;
            l.addStorageEvent(g.keyMap.ACTIVEPAGE, h.activePageChange);
            k.on(document, 'mousemove', h.activePage);
            k.on(document, 'mouseover', h.activePage);
            k.on(window, 'unload', h.unInstall)
        }
    };
    var h = {
        activePage: function (m) {
            var n = g.pageId,
            o = g.keyMap.ACTIVEPAGE,
            l = g.ls,
            p = l.getItem(o);
            if (p == n) {
                k.un(document, 'mousemove', h.activePage);
                k.un(document, 'mouseover', h.activePage);
                return
            }
            l.setItem(o, n);
            if (typeof m == 'boolean' && m) {
                d.fire('firstEnter')
            }
            d.fire('active', true)
        },
        activePageChange: function (o, q) {
            var n = g.pageId,
            m = g.ls,
            l = g.keyMap.PAGELIST,
            p = i.parse(m.getItem(l)) || [];
            if (q === n) {
                if (f.indexOfArray(p, o) == - 1) {
                    d.fire('active', true)
                }
                return
            }
            if (n !== o) {
                return
            }
            d.fire('active', false);
            k.on(document, 'mousemove', h.activePage);
            k.on(document, 'mouseover', h.activePage)
        },
        unInstall: function (r) {
            k.un(window, 'unload', h.unInstall);
            var n = g.pageId,
            m = g.ls,
            l = g.keyMap.PAGELIST,
            p = g.keyMap.ACTIVEPAGE,
            o = i.parse(m.getItem(l)) || [],
            q = m.getItem(p);
            o = f.removeArray(o, n);
            if (o.length == 0) {
                m.setItem(l, o);
                d.fire('leave');
                f.sleep(250);
                return
            }
            m.setItem(l, o);
            if (n == q) {
                d.fire('active', false);
                m.setItem(p, o[0]);
                f.sleep(250)
            }
        }
    };
    d.init = function (l) {
        var o = (l && l.name) ? 'baidu_qiao_' + l.name : '';
        l && l.siteid && (b.siteid = l.siteid);
        var m = g.keyMap;
        for (var n in m) {
            if (m.hasOwnProperty(n)) {
                m[n] = m[n] + '_' + b.siteid
            }
        }
        j.init({
            fileName: o
        });
        g.ls = j;
        g.pageId = f.guid();
        if (c.checkIfFirst()) {
            c.clearLs()
        }
        c.setLs();
        c.bindEvent()
    };
    d.set = function (m, n) {
        var l = g.ls,
        p = g.keyMap,
        o = i.parse(l.getItem(p.CUSTOMKEY) || '{}');
        m = m + '_' + b.siteid;
        if (!o[m]) {
            o[m] = true;
            l.setItem(p.CUSTOMKEY, i.stringify(o))
        }
        l.setItem(m, n)
    };
    d.get = function (l) {
        l = l + '_' + b.siteid;
        return g.ls.getItem(l)
    };
    d.isActived = function () {
        var m = g.pageId,
        l = g.ls,
        n = g.keyMap.ACTIVEPAGE;
        return m == l.getItem(n)
    }
});
Qiao.define('business.webimlite', [
    'base',
    'im',
    'net.flash',
    'im.editor',
    'business.pageSync'
], function (j, J) {
    var n = j.base.dom.g,
    F = j.base.dom,
    e = j.base.event.on,
    g = j.base.browser,
    R = j.base.dom.insertHTML,
    O = j.base.dom.create,
    o = j.base.object.extend,
    w = j.base.json.stringify,
    b = j.base.string.trim,
    f = j.base.string.format,
    D = j.base.string.encodeHTML,
    E = j.base.date.format,
    s = j.base.json.parse,
    B = j.base.event.preventDefault,
    N = j.business.pageSync,
    x = j.im,
    k = j.im.config;
    Editor = j.im.editor,
    TIMEINTIVAL = 120000,
    config = {
    },
    view = {
    },
    model = {
        messages: [
        ],
        status: 0,
        showType: 'none',
        sendAbled: false,
        reLogin: false,
        showOnce: true,
        firstEnterFlag: false
    },
    clickHandleList = {
    },
    tpl = {
        title: '<a href="#" class="m-lite-title-btn btn-max"></a><a href="#" class="m-lite-title-btn btn-min"></a><span class="m-lite-title-text">在线咨询</span><span class="m-lite-title-notify-text"><em></em>您有未读消息</span>',
        tool: '<div class="m-lite-tool-face"></div><a href="#" class="m-lite-tool-sp-btn btn-export">导出聊天记录</a><a href="#" class="m-lite-tool-btn btn-face"></a><a href="#" class="m-lite-tool-btn btn-font"></a>',
        msg: '<div class="m-lite-msg msg-#{type}"><div class="m-lite-msg-title">#{csName}&nbsp;#{time}</div><div class="m-lite-msg-content">#{content}</div><div class="m-lite-msg-cursor"></div>',
        info: '<div class="m-lite-msg-info">#{content}</div>',
        opt: '<span class="m-lite-logo"></span><span class="m-lite-qiao">百度商桥</span><a href="#" hidefocus="false" title="按Ctrl+Enter发送消息" class="m-lite-opt-btn btn-send"></a>',
        editor: '<html><head><style type="text/css">html,body{height:100%;padding:0px;margin:0px}p{margin:0px}img{margin:0 2px}</style></head><body style="font-size:12px;line-height:1.5;cursor:text;"></body></html>',
        history: '<input type="hidden" name="r" value="" /><input type="hidden" name="t" value="" /><input type="hidden" name="z" value="" /><input type="hidden" name="prefix" value="" />',
        titleBgColor: 'border-color:#{color};background-image:none;background: -webkit-gradient(linear, left top, left bottom, from(#fdfeff), to(#{color})); background: -webkit-linear-gradient(top, #fdfeff, #{color}); background:-moz-linear-gradient(top, #fdfeff, #{color}); background:-o-linear-gradient(top, #fdfeff, #{color}); background:linear-gradient(top bottom, #fdfeff, #{color});'
    },
    text = {
        flashTitle: [
            '【新消息】',
            '【　　　】'
        ]
    };
    var d = {
        from: 0,
        open: 2,
        count: 1
    };
    var y = {
        siteId: '',
        mainId: ''
    };
    var P = BDBridgeStat;
    function M() {
        var W,
        G,
        V;
        var Q = (config.position == 1) ? 'left:0px;right:auto;' : '';
        view.container = O('div', {
            id: 'BD_QIAO_WEBIM_LITE_WRAP',
            className: 'BD-QIAO-WEBIM-LITE-WRAP',
            style: 'display:none;' + Q
        });
        view.title = O('div', {
            className: 'm-lite-title'
        });
        if (config.bgColor) {
            view.title.style.cssText = g.ie ? 'background-image:none;border-color:' + config.bgColor + ';background-color:' + config.bgColor : f(tpl.titleBgColor, {
                color: config.bgColor
            })
        }
        view.title.innerHTML = tpl.title;
        view.container.appendChild(view.title);
        W = view.title.getElementsByTagName('a');
        for (G = 0; V = W[G]; G++) {
            if (V.className.indexOf('btn-min') >= 0) {
                view.minBtn = V
            } else {
                if (V.className.indexOf('btn-max') >= 0) {
                    view.maxBtn = V
                }
            }
        }
        view.content = O('div', {
            className: 'm-lite-content'
        });
        if (config.bgColor) {
            view.content.style.borderColor = config.bgColor
        }
        view.container.appendChild(view.content);
        view.editor = O('div', {
            className: 'm-lite-editor'
        });
        view.container.appendChild(view.editor);
        view.opt = O('div', {
            className: 'm-lite-opt'
        });
        view.opt.innerHTML = tpl.opt;
        view.container.appendChild(view.opt);
        view.widgets = [
            view.content,
            view.editor,
            view.opt
        ];
        if (g.ie <= 6) {
            view.iframe = O('iframe', {
                src: 'about:blank',
                scrolling: 'no',
                frameborder: 0,
                style: 'width:100%;z-index:-1;position:absolute;top:0;left:0;'
            });
            view.container.appendChild(view.iframe);
            view.container.style.position = 'absolute';
            window.attachEvent('onscroll', c);
            window.attachEvent('onresize', c)
        }
        document.body.appendChild(view.container);
        Editor.init(view.editor);
        view.tip = O('div', {
            className: 'm-lite-tip',
            style: 'display:none'
        });
        view.container.appendChild(view.tip)
    }
    function p(Q, V) {
        var G = new Image();
        G.onload = function () {
        };
        G.src = Q + V
    }
    function c() {
        var Q = g.isStrict ? document.documentElement : document.body;
        var G = view.container;
        G.style.top = Q.clientHeight + Q.scrollTop - G.clientHeight + 'px'
    }
    function T() {
        var G = /(^|\s+)btn-([^-]+)(\s+|$)/;
        view.container.onclick = function (V) {
            var Q;
            V = V || window.event;
            Q = V.target || V.srcElement;
            if (Q.tagName.toLowerCase() == 'a' && Q.className.indexOf('btn') >= 0) {
                Q.className.replace(G, function (X, W, aa, Z) {
                    var Y;
                    if (Y = clickHandleList[aa]) {
                        Y.call(null, Q)
                    }
                });
                B(V)
            } else {
                if (Q.tagName.toLowerCase() == 'span' && Q.className.indexOf('m-lite-title-notify-text') >= 0) {
                    C('all')
                }
            }
            r(false)
        };
        Editor.on('focus', function () {
            r(false)
        });
        x.on('message', function (W, V, Q) {
            if (!model.showOnce && Q == 1) {
                return
            }
            W.type = 'server';
            model.messages.push(W);
            U(W);
            if (model.showType == 'none') {
                C('min')
            }
            r(true);
            x.fire('stat:message')
        });
        x.on('connected', function (Z, Y, Q) {
            N.set('imConnected', 'true');
            model.status = 1;
            model.sendAbled = true;
            J.fire('ready');
            var X,
            aa,
            W,
            V;
            if (model.reLogin) {
                model.reLogin = false;
                aa = model.messages = s(N.get('imMessage')) || [];
                view.content.innerHTML = '';
                for (V = 0; (W = aa[V]); V++) {
                    U(W)
                }
                view.content.lastChild && view.content.lastChild.scrollIntoView();
                C('all')
            } else {
                U({
                    content: '转接成功',
                    type: 'info'
                })
            }
            N.set('imLastPickTime', ( + new Date()))
        });
        x.on('info', function (Q) {
            U({
                content: Q,
                type: 'info'
            })
        });
        x.on('input', function (Q) {
            h(D(Q))
        });
        x.on('taskbegin', function (V) {
            var Q = config.SITE_ID;
            x.fire('stat:taskbegin', {
                subId: V.subid,
                siteId: Q,
                chatId: V.sessionid
            })
        });
        x.on('customInput', K);
        x.on('error', function (Q) {
            var V = {
                content: Q.msg,
                type: 'info'
            };
            U(V);
            model.messages.push(V)
        });
        x.on('changesubid', function (Q) {
            if (Q !== undefined && Q !== '') {
                J.fire('changesubid', Q)
            }
        });
        x.on('stop', function () {
            model.sendAbled = false;
            N.set('imConnected', '');
            J.fire('unload')
        });
        x.on('timeupdate', function () {
            N.set('imLastPickTime', ( + new Date()))
        });
        Editor.on('exporthistory', l);
        Editor.on('editorsend', clickHandleList.send);
        u()
    }
    function u() {
        y.siteId = config.SITE_ID;
        y.mainId = config.mainid;
        var G;
        var Q = function () {
            d.chatId = '';
            clearInterval(G)
        };
        var V = function () {
            G = window.setInterval(function () {
                P('REFRESH_IM', y, d)
            }, 10 * 60 * 1000)
        };
        x.on('stat:visitor', function () {
            P('VISITOR_IM', y, d)
        });
        x.on('stat:taskbegin', function (W) {
            d.subId = W.subId;
            d.sessionId = y.siteId + '_' + config.bid;
            d.chatId = W.chatId;
            N.set('stat_subid', W.subId);
            N.set('stat_chatid', W.chatId);
            P('START_IM', y, d);
            V()
        });
        x.on('stat:message', function () {
            if (!d.chatId) {
                return
            }
            P('SERVER_IM', y, d)
        });
        x.on('stat:offline', function () {
            Q()
        });
        x.on('stat:transfer', function (W) {
            Q()
        });
        x.on('stat:error', function (W) {
            if (W.type == 'kick') {
                Q()
            }
        });
        x.on('stat:revert', function (W) {
            y.siteId = W.siteId;
            y.mainId = W.mainId;
            d.subId = N.get('stat_subid');
            d.chatId = N.get('stat_chatid');
            d.sessionId = y.siteId + '_' + config.bid;
            V()
        })
    }
    function i(G) {
        if (model.flashTimer) {
            clearTimeout(model.flashTimer);
            model.flashTimer = null
        }
        G = G % text.flashTitle.length;
        document.title = text.flashTitle[G] + model.pageTitle;
        model.flashTimer = setTimeout(function () {
            i(++G)
        }, 500)
    }
    function r(G) {
        if (G && view.title.className.indexOf('notify') < 0) {
            view.title.className += ' m-lite-title-notify';
            model.pageTitle = document.title;
            i(0)
        } else {
            if (!G && view.title.className.indexOf('notify') >= 0) {
                view.title.className = view.title.className.replace(/\s+m-lite-title-notify/g, '');
                clearTimeout(model.flashTimer);
                model.flashTimer = null;
                document.title = model.pageTitle || document.title
            }
        }
    }
    function h(G) {
        if (model.tiptimer) {
            clearTimeout(model.tiptimer)
        }
        if (model.showType !== 'all') {
            return
        }
        view.tip.innerHTML = G;
        view.tip.style.display = '';
        model.tiptimer = setTimeout(function () {
            view.tip.style.display = 'none'
        }, 3000)
    }
    function q() {
        if (model.tiptimer) {
            clearTimeout(model.tiptimer)
        }
        view.tip.style.display = 'none'
    }
    function l() {
        var X = n('BD_Qiao_History'),
        Q,
        W,
        V,
        G,
        Y;
        if (!X) {
            X = O('form', {
                id: 'BD_Qiao_History',
                method: 'post',
                target: '_blank'
            });
            X.setAttribute('accept-charset', 'utf-8');
            X.setAttribute('action', config.root + 'download_record.php');
            X.style.display = 'none';
            X.innerHTML = tpl.history;
            document.body.appendChild(X)
        }
        Q = X.getElementsByTagName('input');
        for (V = 0, G = Q.length; V < G; V++) {
            W = Q[V];
            switch (W.name) {
                case 'r':
                    W.value = view.content.innerHTML.replace(/\r\n|\n/g, '<br>').replace(/<table.*?zoom_table.*?>.*?<\/table>/gi, '(图片)');
                    break;
                case 't':
                    W.value = config.userGroupName || '';
                    break;
                case 'z':
                    W.value = g.ie ? true : false;
                    break;
                case 'prefix':
                    W.value = config.root;
                    break
            }
        }
        if (g.ie) {
            Y = document.charset;
            document.charset = 'utf-8';
            X.submit();
            document.charset = Y;
            return
        }
        X.submit()
    }
    function U(W) {
        var V = W.type == 'info' ? tpl.info : tpl.msg,
        G = new Date(),
        Q;
        W = o({
        }, W);
        G.setTime(W.time);
        W.time = E(G, 'HH:mm:ss');
        R(view.content, 'beforeend', f(V, W));
        if (W = W.style) {
            V = '';
            for (Q in W) {
                if (W.hasOwnProperty(Q)) {
                    V += Q + ':' + (Q.toLowerCase() == 'color' ? W[Q].toLowerCase()  : W[Q]) + ';'
                }
            }
            view.content.lastChild.children[1].style.cssText = V.replace(/[A-Z]/g, function (X) {
                return '-' + X.toLowerCase()
            })
        }
        view.content.lastChild.scrollIntoView()
    }
    function L() {
        if (view.container) {
            return
        }
        M();
        T();
        x.init({
            bid: config.bid,
            siteid: config.siteid,
            ucid: config.ucid,
            mainid: config.mainid,
            userName: config.userName,
            csNameType: config.csNameType,
            customName: config.customName
        }, j.net.flash)
    }
    function a() {
        var W,
        Y,
        Q,
        G;
        if (!N.isActived()) {
            return
        }
        W = N.get('imStatus');
        if (!W) {
            setTimeout(a, 300);
            return
        }
        W = s(W);
        config.userGroupName = W.userGroupName;
        delete W.userGroupName;
        J.fire('revertsession');
        Y = model.messages = s(N.get('imMessage')) || [];
        view.content.innerHTML = '';
        for (G = 0; Q = Y[G]; G++) {
            U(Q)
        }
        view.content.lastChild && view.content.lastChild.scrollIntoView();
        x.restart(W);
        model.sendAbled = true;
        model.status = 1;
        C('all');
        if (model.firstEnterFlag) {
            var X = config.SITE_ID;
            var V = config.mainid;
            x.fire('stat:revert', {
                siteId: X,
                mainId: V
            })
        }
        N.set('imStatus', '')
    }
    function z() {
        var V;
        var W;
        var G;
        var Q;
        if (!N.isActived()) {
            return
        }
        V = N.get('imStatus');
        if (!V) {
            setTimeout(z, 300);
            return
        }
        W = model.messages = s(N.get('imMessage')) || [];
        view.content.innerHTML = '';
        for (G = 0; Q = W[G]; G++) {
            U(Q)
        }
        view.content.lastChild && view.content.lastChild.scrollIntoView()
    }
    function v() {
        var G;
        G = x.pause();
        G.userGroupName = config.userGroupName;
        G = w(G);
        N.set('imStatus', G);
        N.set('imMessage', w(model.messages))
    }
    function I() {
        var G;
        if (N.get('imConnected')) {
            model.showOnce = false;
            model.reLogin = true;
            G = s(N.get('imStatus'));
            G = o(t(), G);
            L();
            x.login(G);
            N.set('imStatus', '')
        }
    }
    function A() {
        model.firstEnterFlag = true
    }
    function m(G) {
        var X,
        Y,
        V,
        W;
        if (!G && model.status == 1) {
            v();
            model.status = 2
        } else {
            if (G) {
                if (N.get('imConnected')) {
                    var Q = N.get('imLastPickTime');
                    if (( + new Date()) - Q > TIMEINTIVAL) {
                        return
                    }
                    L();
                    a()
                } else {
                    if (model.status == 2) {
                        z();
                        model.sendAbled = false
                    }
                }
            }
        }
    }
    function H() {
        if (model.status == 1) {
            v()
        }
    }
    function S(Q, G) {
        if (G) {
            if (g.ie) {
                Q = Q.replace(/(^<P>|<\/P>$)/gi, '').replace(/<\/P>\s*<P>/gi, '<br>').replace(/\&nbsp;?/g, ' ')
            } else {
                if (g.firefox) {
                    Q = Q.replace(/<br>$/, ' ')
                } else {
                    if (g.opera) {
                        Q = Q.replace(/<br>/gi, ' ').replace(/(^<p>|<\/p>$)/gi, '').replace(/<\/p><p>/gi, '<br>')
                    } else {
                        Q = Q.replace(/<div>/i, '<BR>').replace(/<\/div>$/i, '').replace(/<\/div><div>/gi, '<BR>').replace(/<br>/g, ' ');
                        Q = Q.replace(/<BR>/g, '<br>')
                    }
                }
            }
        } else {
            Q = Q.replace(/<BR>/g, '<br>')
        }
        return Q
    }
    function K() {
        var Q = Editor.getContent();
        var G = Editor.getStyle();
        Q = b(Q);
        if (!Q) {
            return
        }
        Q = S(Q, Editor.isMultilineMode());
        x.sendStatus(Q, G)
    }
    function t() {
        return o({
        }, config.searchInfo)
    }
    function C(Q) {
        var G,
        V;
        if (!view.container) {
            return
        }
        if (Q == 'none') {
            view.container.style.display = 'none';
            model.showType = 'none'
        } else {
            view.container.style.display = '';
            view.title.style.display = '';
            for (G = 0; V = view.widgets[G]; G++) {
                V.style.display = Q == 'all' ? '' : 'none'
            }
            view.minBtn.style.display = Q == 'all' ? '' : 'none';
            view.maxBtn.style.display = Q == 'all' ? 'none' : '';
            model.showType = Q == 'all' ? 'all' : 'min';
            if (Q == 'all') {
                view.content.lastChild && view.content.lastChild.scrollIntoView()
            } else {
                q()
            }
            if (g.ie <= 6) {
                view.iframe.style.height = view.container.clientHeight - 2 + 'px';
                setTimeout(function () {
                    c()
                }, 0)
            }
        }
    }
    clickHandleList.close = function () {
        C('none')
    };
    clickHandleList.max = function (G) {
        C('all')
    };
    clickHandleList.min = function (G) {
        C('min')
    };
    clickHandleList.send = function () {
        var Q = Editor.getContent(),
        G = Editor.getStyle(),
        V;
        if (!model.sendAbled) {
            return
        }
        Q = b(Q);
        if (!Q) {
            return
        }
        Q = S(Q, Editor.isMultilineMode());
        V = {
            content: Q,
            csName: '我',
            type: 'client',
            style: G
        };
        V.time = new Date().getTime();
        x.sendRichText(Q, G, V.time);
        U(V);
        model.messages.push(V);
        Editor.clear();
        x.net.uploadLog('sendmsg')
    };
    J.init = function (V) {
        config.bid = V.bid;
        config.siteid = V.siteid;
        config.ucid = V.ucid;
        config.mainid = V.mainid;
        config.SITE_ID = V.SITE_ID;
        config.userName = V.userName;
        config.offsetTime = parseInt(V.offsetTime, 10);
        config.root = V.root || 'http://qiao.baidu.com/v3/';
        config.bgColor = V.bgColor;
        config.position = V.position;
        config.csNameType = V.csNameType;
        config.customName = V.customName;
        config.searchInfo = V.searchInfo;
        config.imRoot = V.imRoot;
        k.URL.HI_SERVER = config.imRoot;
        k.URL.QIAO_ROOT = config.root;
        if (isNaN(config.offsetTime)) {
            config.offsetTime = 0
        }
        N.on('firstEnter', A);
        N.on('active', m);
        N.on('leave', H);
        var G = {
        };
        G.siteid = config.siteid;
        N.init(G);
        if (N.get('imConnected') == 'true') {
            var Q = N.get('imLastPickTime');
            if (( + new Date()) - Q > TIMEINTIVAL) {
                return
            }
            L();
            a()
        }
        model.firstEnterFlag = false
    };
    J.accept = function (G) {
        if (G.userGroupName) {
            config.userGroupName = G.userGroupName;
            delete G.userGroupName
        }
        G = o(t(), G);
        if (N.isActived()) {
            L();
            x.login(G);
            C('all');
            U({
                content: '正在连接...',
                type: 'info'
            });
            return true
        } else {
            return false
        }
    };
    J.show = function () {
        C('all')
    }
});
