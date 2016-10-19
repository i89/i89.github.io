void function (e) {
    var t = {}, n = {};
    e.startModule = function (e) {
        require(e).start()
    }, e.define = function (e, n) {
        t[e] = n
    }, e.require = function (e) {
        return/\.js$/.test(e) || (e += ".js"), n[e] ? n[e] : n[e] = t[e]({})
    }
}(this), define("scripts/drawer.js", function (e) {
    var t = require("scripts/lib/ucren"), n = require("scripts/lib/raphael"), r = Math.round, i = function (e) {
        var t = [], n, i = 0, s = "", o = /^%%BoundingBox: 0 0 ([\d\.]+) ([\d\.]+)$/, u = /^([\d\. ]+) ([mc])$/i, a = /([\d\.]+) ([\d\.]+)/, f = function (e, t, n) {
            return r(t) + " " + r(n)
        }, l = function (e) {
            o.test(e) && (n = RegExp.$1 - 0, i = RegExp.$2 - 0);
            if (u.test(e))return RegExp.$2.toUpperCase() + RegExp.$1.replace(a, f)
        };
        return e = e.split(/\r\n|\r|\n/), e.forEach(function (e) {
            e = l(e), e && t.push(e)
        }), t.join("")
    }, s = function () {
        var e = /([\d\.]+)[ ,]([\d\.]+)$/;
        return function (t) {
            return e.test(t) ? [RegExp.$1 - 0, RegExp.$2 - 0] : null
        }
    }(), o = new t.Class(function (e) {
        this.width = e.width, this.height = e.height, this.container = t.Element(e.container), this.timeout = t.isIe ? 60 : 90
    }, {init:function (e) {
        return this.paper = n(this.container.dom, this.width, this.height), this
    }, loadAiFile:function (e, n) {
        t.request(e, function (e) {
            var t = i(e);
            n && n.call(this, t)
        }.bind(this))
    }, drawPath:function (e) {
        return this.paper.path(e)
    }, setData:function (e, t) {
        this.length = e, this.data = t
    }, playAnimation:function (e, t, n, r) {
        var i = 0, o = 0, u = this.length, a, f = this.data, l = 20, c = 0;
        e = e || this.timeout;
        var h = function () {
            o = i, i += l, i > u && (i = u);
            var t = f.shift();
            n && n(s(t)), this.drawPath(t), i != u ? setTimeout(h, e) : r && r()
        }.bind(this);
        t ? t(h) : h()
    }});
    return e.create = function (e) {
        return new o(e)
    }, e
}), define("scripts/lib/ucren.js", function (exports) {
    var Ucren, blankArray = [], slice = blankArray.slice, join = blankArray.join;
    String.prototype.trim || (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/, "")
    }), String.prototype.format = function (e) {
        var t = this, n = {};
        return Ucren.each(e, function (e, n) {
            e = e.toString().replace(/\$/g, "$$$$"), t = t.replace(RegExp("@{" + n + "}", "g"), e)
        }), t.toString()
    }, String.prototype.htmlEncode = function () {
        var e = document.createElement("div");
        return function () {
            var t;
            return e.appendChild(document.createTextNode(this)), t = e.innerHTML, e.innerHTML = "", t
        }
    }(), String.prototype.byteLength = function () {
        return this.replace(/[^\x00-\xff]/g, "  ").length
    }, String.prototype.subByte = function (e, t) {
        var n = this;
        return n.byteLength() <= e ? n : (t = t || "", e -= t.byteLength(), n = n.slice(0, e).replace(/( [^\x00-\xff] )/g, "$1 ").slice(0, e).replace(/[^\x00-\xff]$/, "").replace(/( [^\x00-\xff] ) /g, "$1") + t)
    }, Function.prototype.defer = function (e, t) {
        var n = this, r = function () {
            n.apply(e, arguments)
        };
        return setTimeout(r, t)
    }, Function.prototype.bind || (Function.prototype.bind = function (e) {
        var t = this;
        return function () {
            return t.apply(e, arguments)
        }
    }), Function.prototype.saturate = function (e) {
        var t = this, n = slice.call(arguments, 1);
        return function () {
            return t.apply(e, slice.call(arguments, 0).concat(n))
        }
    }, Array.prototype.indexOf = function (e, t) {
        var n = this.length;
        t || (t = 0), t < 0 && (t = n + t);
        for (; t < n; t++)if (this[t] === e)return t;
        return-1
    }, Array.prototype.every = function (e, t) {
        for (var n = 0, r = this.length; n < r; n++)if (!e.call(t, this[n], n, this))return!1;
        return!0
    }, Array.prototype.filter = function (e, t) {
        var n = [], r;
        for (var i = 0, s = this.length; i < s; i++)(r = this[i], e.call(t, r, i, this)) && n.push(r);
        return n
    }, Array.prototype.forEach = function (e, t) {
        for (var n = 0, r = this.length; n < r; n++)e.call(t, this[n], n, this);
        return this
    }, Array.prototype.map = function (e, t) {
        var n = [];
        for (var r = 0, i = this.length; r < i; r++)n[r] = e.call(t, this[r], r, this);
        return n
    }, Array.prototype.some = function (e, t) {
        for (var n = 0, r = this.length; n < r; n++)if (e.call(t, this[n], n, this))return!0;
        return!1
    }, Array.prototype.invoke = function (e) {
        var t = slice.call(arguments, 1);
        return this.forEach(function (n) {
            n instanceof Array ? n[0][e].apply(n[0], n.slice(1)) : n[e].apply(n, t)
        }), this
    }, Array.prototype.random = function () {
        var e = this.slice(0), t = [], n = e.length;
        while (n--)t.push(e.splice(Ucren.randomNumber(n + 1), 1)[0]);
        return t
    }, Ucren = {isIe:/msie/i.test(navigator.userAgent), isIe6:/msie 6/i.test(navigator.userAgent), isFirefox:/firefox/i.test(navigator.userAgent), isSafari:/version\/[\d\.]+\s+safari/i.test(navigator.userAgent), isOpera:/opera/i.test(navigator.userAgent), isChrome:/chrome/i.test(navigator.userAgent), isStrict:document.compatMode == "CSS1Compat", tempDom:document.createElement("div"), apply:function (e, t, n) {
        return t || (t = {}), n ? Ucren.each(e, function (e, r) {
            if (r in n)return;
            t[r] = e
        }) : Ucren.each(e, function (e, n) {
            t[n] = e
        }), t
    }, appendStyle:function (e) {
        var t;
        arguments.length > 1 && (e = join.call(arguments, "")), document.createStyleSheet ? (t = document.createStyleSheet(), t.cssText = e) : (t = document.createElement("style"), t.type = "text/css", t.appendChild(document.createTextNode(e)), document.getElementsByTagName("head")[0].appendChild(t))
    }, addEvent:function (e, t, n) {
        var r = function () {
            n.apply(e, arguments)
        };
        return e.dom && (e = e.dom), window.attachEvent ? e.attachEvent("on" + t, r) : window.addEventListener ? e.addEventListener(t, r, !1) : e["on" + t] = r, r
    }, delEvent:function (e, t, n) {
        window.detachEvent ? e.detachEvent("on" + t, n) : window.removeEventListener ? e.removeEventListener(t, n, !1) : e["on" + t] == n && (e["on" + t] = null)
    }, Class:function (e, t, n) {
        var r, i;
        return e = e || function () {
        }, t = t || {}, r = n ? function (t, r, i, s, o) {
            var u = new n(t, r, i, s, o);
            for (var a in u)this[a] = u[a];
            this.instanceId = Ucren.id(), e.apply(this, arguments)
        } : function () {
            this.instanceId = Ucren.id(), e.apply(this, arguments)
        }, Ucren.registerClassEvent.call(i = r.prototype), Ucren.each(t, function (e, t) {
            i[t] = typeof e == "function" ? function () {
                var n = e.apply(this, arguments);
                return this.fire(t, slice.call(arguments, 0)), n
            } : e
        }), r
    }, registerClassEvent:function () {
        this.on = function (e, t) {
            return Ucren.dispatch(this.instanceId + e, t.bind(this)), this
        }, this.fire = this.fireEvent = function (e, t) {
            return Ucren.dispatch(this.instanceId + e, t), this
        }
    }, createFuze:function () {
        var e, t, n;
        return e = [], t = function (t) {
            n ? t() : e.push(t)
        }, t.fire = function () {
            while (e.length)e.shift()();
            n = !0
        }, t.extinguish = function () {
            n = !1
        }, t.wettish = function () {
            e.length && e.shift()()
        }, t
    }, dispatch:function () {
        var e = {}, t, n, r;
        return t = function (t, n, r) {
            var i;
            (i = e[t]) && Ucren.each(i, function (e) {
                e.apply(r, n)
            })
        }, n = function (t, n) {
            var r;
            (r = e[t]) ? r.push(n) : e[t] = [n]
        }, r = function (e, r, i) {
            typeof r == "undefined" && (r = []), r instanceof Array ? t.apply(this, arguments) : typeof r == "function" && n.apply(this, arguments)
        }, r.remove = function (t, n) {
            var r, i;
            (r = e[t]) && ~(i = r.indexOf(n)) && r.splice(i, 1)
        }, r
    }(), each:function (e, t) {
        if (e instanceof Array || typeof e == "object" && typeof e[0] != "undefined" && e.length)typeof e == "object" && Ucren.isSafari && (e = slice.call(e)), e.forEach(t); else if (typeof e == "object") {
            var n = {};
            for (var r in e) {
                if (n[r])continue;
                if (t(e[r], r) === !1)break
            }
        } else if (typeof e == "number") {
            for (var r = 0; r < e; r++)if (t(r, r) === !1)break
        } else if (typeof e == "string")for (var r = 0, i = e.length; r < i; r++)if (t(e.charAt(r), r) === !1)break
    }, Element:function (e, t) {
        var n, r;
        return e && e.isUcrenElement ? t ? e.dom : e : (e = typeof e == "string" ? document.getElementById(e) : e, e ? t ? e : (r = e.getAttribute("handleId"), typeof r == "string" ? Ucren.handle(r - 0) : (n = new Ucren.BasicElement(e), r = Ucren.handle(n), e.setAttribute("handleId", r + ""), n)) : null)
    }, Event:function (e) {
        e = e || window.event;
        if (!e) {
            var t = arguments.callee.caller;
            while (t) {
                e = t.arguments[0];
                if (e && typeof e.altKey == "boolean")break;
                t = t.caller, e = null
            }
        }
        return e
    }, fixNumber:function (e, t) {
        return typeof e == "number" ? e : t
    }, fixString:function (e, t) {
        return typeof e == "string" ? e : t
    }, fixConfig:function (e) {
        var t;
        return t = {}, typeof e == "undefined" ? t : typeof e == "function" ? new e : e
    }, handle:function (e) {
        var t, n, r;
        t = arguments.callee, t.cache || (t.cache = {}), typeof t.number == "undefined" && (t.number = 0), n = typeof e;
        if (n == "number")return t.cache[e.toString()];
        if (n == "object" || n == "function")return r = t.number++, t.cache[r.toString()] = e, r
    }, id:function () {
        var e = arguments.callee;
        return e.number = ++e.number || 0, "_" + e.number
    }, loadImage:function (e, t) {
        var n = e.length, r = 0, i = function () {
            r == n && t && t()
        };
        Ucren.each(e, function (e) {
            var t = document.createElement("img");
            t.onload = t.onerror = function () {
                this.onload = this.onerror = null, r++, i()
            }, Ucren.tempDom.appendChild(t), t.src = e
        })
    }, loadScript:function (src, callback) {
        Ucren.request(src, function (text) {
            eval(text), callback && callback(text)
        })
    }, makeElement:function (e, t) {
        var n = document.createElement(e), r = function (e) {
            typeof e == "string" ? n.style.cssText = e : Ucren.apply(e, n.style)
        };
        for (var i in t)i === "class" ? n.className = t[i] : i === "for" ? n.htmlFor = t[i] : i === "style" ? r(t[i]) : n.setAttribute(i, t[i]);
        return n
    }, nul:function () {
        return!1
    }, queryString:function (e, t) {
        var n, r, i;
        return n = t || location.href, r = new RegExp("(\\?|&)" + e + "=([^&#]*)(#|&|$)", "i"), i = n.match(r), i ? i[2] : ""
    }, randomNumber:function (e) {
        return Math.floor(Math.random() * e)
    }, randomWord:function () {
        var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        return function (t, n) {
            var r, i = [];
            return r = n || e, Ucren.each(t, function (e) {
                i[e] = r.charAt(this.randomNumber(r.length))
            }.bind(this)), i.join("")
        }
    }(), request:function (e, t) {
        var n;
        window.XMLHttpRequest ? n = new XMLHttpRequest : n = new ActiveXObject("Microsoft.XMLHTTP"), n.open("GET", e, !0), n.onreadystatechange = function () {
            n.readyState == 4 && n.status == 200 && t(n.responseText)
        }, n.send(null)
    }}, Ucren.BasicDrag = Ucren.Class(function (e) {
        e = Ucren.fixConfig(e), this.type = Ucren.fixString(e.type, "normal");
        var t = this.isTouch = "ontouchstart"in window;
        this.TOUCH_START = t ? "touchstart" : "mousedown", this.TOUCH_MOVE = t ? "touchmove" : "mousemove", this.TOUCH_END = t ? "touchend" : "mouseup"
    }, {bind:function (e, t) {
        e = Ucren.Element(e), t = Ucren.Element(t) || e;
        var n = {};
        return n[this.TOUCH_START] = function (e) {
            return e = Ucren.Event(e), this.startDrag(), e.cancelBubble = !0, e.stopPropagation && e.stopPropagation(), e.returnValue = !1
        }.bind(this), t.addEvents(n), this.target = e, this
    }, getCoors:function (e) {
        var t = [];
        if (e.targetTouches && e.targetTouches.length) {
            var n = e.targetTouches[0];
            t[0] = n.clientX, t[1] = n.clientY
        } else t[0] = e.clientX, t[1] = e.clientY;
        return t
    }, startDrag:function () {
        var e, t, n;
        e = this.target, t = e.draging = {}, this.isDraging = !0, t.x = parseInt(e.style("left"), 10) || 0, t.y = parseInt(e.style("top"), 10) || 0, n = Ucren.Event();
        var r = this.getCoors(n);
        t.mouseX = r[0], t.mouseY = r[1], this.registerDocumentEvent()
    }, endDrag:function () {
        this.isDraging = !1, this.unRegisterDocumentEvent()
    }, registerDocumentEvent:function () {
        var e, t;
        e = this.target, t = e.draging, t.documentSelectStart = Ucren.addEvent(document, "selectstart", function (e) {
            return e = e || event, e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, e.returnValue = !1
        }), t.documentMouseMove = Ucren.addEvent(document, this.TOUCH_MOVE, function (e) {
            var n, r;
            e = e || event, n = Ucren.isIe && e.button != 1, r = !Ucren.isIe && e.button != 0, (n || r) && !this.isTouch && this.endDrag();
            var i = this.getCoors(e);
            return t.newMouseX = i[0], t.newMouseY = i[1], e.stopPropagation && e.stopPropagation(), e.returnValue = !1
        }.bind(this)), t.documentMouseUp = Ucren.addEvent(document, this.TOUCH_END, function () {
            this.endDrag()
        }.bind(this));
        var n, r;
        clearInterval(t.timer), t.timer = setInterval(function () {
            var i, s, o, u;
            t.newMouseX != n && t.newMouseY != r && (n = t.newMouseX, r = t.newMouseY, o = t.newMouseX - t.mouseX, u = t.newMouseY - t.mouseY, i = t.x + o, s = t.y + u, this.type == "calc" ? this.returnValue(o, u, t.newMouseX, t.newMouseY) : e.left(i).top(s))
        }.bind(this), 10)
    }, unRegisterDocumentEvent:function () {
        var e = this.target.draging;
        Ucren.delEvent(document, this.TOUCH_MOVE, e.documentMouseMove), Ucren.delEvent(document, this.TOUCH_END, e.documentMouseUp), Ucren.delEvent(document, "selectstart", e.documentSelectStart), clearInterval(e.timer)
    }, returnValue:function (e, t, n, r) {
    }}), Ucren.Template = Ucren.Class(function () {
        this.string = join.call(arguments, "")
    }, {apply:function (e) {
        return this.string.format(e)
    }}), Ucren.BasicElement = Ucren.Class(function (e) {
        this.dom = e, this.countMapping = {}
    }, {isUcrenElement:!0, attr:function (e, t) {
        return typeof t != "string" ? this.dom.getAttribute(e) : (this.dom.setAttribute(e, t), this)
    }, style:function () {
        var e = Ucren.isIe ? function (e) {
            return this.dom.currentStyle[e]
        } : function (e) {
            var t;
            return t = document.defaultView.getComputedStyle(this.dom, null), t.getPropertyValue(e)
        };
        return function (t, n) {
            if (typeof t == "object")Ucren.each(t, function (e, t) {
                this[t] = e
            }.bind(this.dom.style)); else {
                if (typeof t == "string" && typeof n == "undefined")return e.call(this, t);
                typeof t == "string" && typeof n != "undefined" && (this.dom.style[t] = n)
            }
            return this
        }
    }(), hasClass:function (e) {
        var t = " " + this.dom.className + " ";
        return t.indexOf(" " + e + " ") > -1
    }, setClass:function (e) {
        return typeof e == "string" && (this.dom.className = e.trim()), this
    }, addClass:function (e) {
        var t, n;
        return t = this.dom, n = " " + t.className + " ", n.indexOf(" " + e + " ") == -1 && (n += e, n = n.trim(), n = n.replace(/ +/g, " "), t.className = n), this
    }, delClass:function (e) {
        var t, n;
        return t = this.dom, n = " " + t.className + " ", n.indexOf(" " + e + " ") > -1 && (n = n.replace(" " + e + " ", " "), n = n.trim(), n = n.replace(/ +/g, " "), t.className = n), this
    }, html:function (e) {
        var t = this.dom;
        if (typeof e == "string")t.innerHTML = e; else {
            if (!(e instanceof Array))return t.innerHTML;
            t.innerHTML = e.join("")
        }
        return this
    }, value:function (e) {
        if (typeof e == "undefined")return this.dom.value;
        this.dom.value = e
    }, left:function (e) {
        var t = this.dom;
        return typeof e != "number" ? this.getPos().x : (t.style.left = e + "px", this.fire("infect", [
            {left:e}
        ]), this)
    }, top:function (e) {
        var t = this.dom;
        return typeof e != "number" ? this.getPos().y : (t.style.top = e + "px", this.fire("infect", [
            {top:e}
        ]), this)
    }, width:function (e) {
        var t = this.dom;
        if (typeof e == "number")t.style.width = e + "px", this.fire("infect", [
            {width:e}
        ]); else {
            if (typeof e != "string")return this.getSize().width;
            t.style.width = e, this.fire("infect", [
                {width:e}
            ])
        }
        return this
    }, height:function (e) {
        var t = this.dom;
        if (typeof e == "number")t.style.height = e + "px", this.fire("infect", [
            {height:e}
        ]); else {
            if (typeof e != "string")return this.getSize().height;
            t.style.height = e, this.fire("infect", [
                {height:e}
            ])
        }
        return this
    }, count:function (e) {
        return this.countMapping[e] = ++this.countMapping[e] || 1
    }, display:function (e) {
        var t = this.dom;
        return typeof e != "boolean" ? this.style("display") != "none" : (t.style.display = e ? "block" : "none", this.fire("infect", [
            {display:e}
        ]), this)
    }, first:function () {
        var e = this.dom.firstChild;
        while (e && !e.tagName && e.nextSibling)e = e.nextSibling;
        return e
    }, add:function (e) {
        var t;
        return t = Ucren.Element(e), this.dom.appendChild(t.dom), this
    }, remove:function (e) {
        var t;
        return e ? (t = Ucren.Element(e), t.html(""), this.dom.removeChild(t.dom)) : (t = Ucren.Element(this.dom.parentNode), t.remove(this)), this
    }, insert:function (e) {
        var t;
        return t = this.dom, t.firstChild ? t.insertBefore(e, t.firstChild) : this.add(e), this
    }, addEvents:function (e) {
        var t, n, r;
        return t = {}, r = {}, n = this.dom, Ucren.each(e, function (e, t) {
            r[t] = Ucren.addEvent(n, t, e)
        }), r
    }, removeEvents:function (e) {
        var t, n;
        return t = {}, n = this.dom, Ucren.each(e, function (e, t) {
            Ucren.delEvent(n, t, e)
        }), this
    }, getPos:function () {
        var e, t, n, r, i;
        e = this.dom, n = {};
        if (e.getBoundingClientRect) {
            r = e.getBoundingClientRect(), i = Ucren.isIe ? 2 : 0;
            var s = document, o = Math.max(s.documentElement.scrollTop, s.body.scrollTop), u = Math.max(s.documentElement.scrollLeft, s.body.scrollLeft);
            return{x:r.left + u - i, y:r.top + o - i}
        }
        n = {x:e.offsetLeft, y:e.offsetTop}, t = e.offsetParent;
        if (t != e)while (t)n.x += t.offsetLeft, n.y += t.offsetTop, t = t.offsetParent;
        Ucren.isSafari && this.style("position") == "absolute" && (n.x -= document.body.offsetLeft, n.y -= document.body.offsetTop), e.parentNode ? t = e.parentNode : t = null;
        while (t && t.tagName.toUpperCase() != "BODY" && t.tagName.toUpperCase() != "HTML")n.x -= t.scrollLeft, n.y -= t.scrollTop, t.parentNode ? t = t.parentNode : t = null;
        return n
    }, getSize:function () {
        var e = this.dom, t = this.style("display");
        if (t && t !== "none")return{width:e.offsetWidth, height:e.offsetHeight};
        var n = e.style, r = {visibility:n.visibility, position:n.position, display:n.display}, i = {visibility:"hidden", display:"block"};
        r.position !== "fixed" && (i.position = "absolute"), this.style(i);
        var s = {width:e.offsetWidth, height:e.offsetHeight};
        return this.style(r), s
    }, observe:function (e, t) {
        return e = Ucren.Element(e), e.on("infect", t.bind(this)), this
    }, usePNGbackground:function (e) {
        var t;
        return t = this.dom, /\.png$/i.test(e) && Ucren.isIe6 ? t.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader( src='" + e + "',sizingMethod='scale' );" : t.style.backgroundImage = "url( " + e + " )", this
    }, setAlpha:function () {
        var e = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/;
        return function (t) {
            var n = this.dom, r = n.style;
            return Ucren.isIe ? (n.currentStyle && !n.currentStyle.hasLayout && (r.zoom = 1), e.test(r.filter) ? (t = t >= 99.99 ? "" : "alpha( opacity=" + t + " )", r.filter = r.filter.replace(e, t)) : r.filter += " alpha( opacity=" + t + " )") : r.opacity = t / 100, this
        }
    }(), fadeIn:function (e) {
        typeof this.fadingNumber == "undefined" && (this.fadingNumber = 0), this.setAlpha(this.fadingNumber);
        var t = function () {
            this.setAlpha(this.fadingNumber), this.fadingNumber == 100 ? (clearInterval(this.fadingInterval), e && e()) : this.fadingNumber += 10
        }.bind(this);
        return this.display(!0), clearInterval(this.fadingInterval), this.fadingInterval = setInterval(t, Ucren.isIe ? 20 : 30), this
    }, fadeOut:function (e) {
        typeof this.fadingNumber == "undefined" && (this.fadingNumber = 100), this.setAlpha(this.fadingNumber);
        var t = function () {
            this.setAlpha(this.fadingNumber), this.fadingNumber == 0 ? (clearInterval(this.fadingInterval), this.display(!1), e && e()) : this.fadingNumber -= 10
        }.bind(this);
        return clearInterval(this.fadingInterval), this.fadingInterval = setInterval(t, Ucren.isIe ? 20 : 30), this
    }, useMouseAction:function (e, t) {
        return this.MouseAction || (this.MouseAction = new Ucren.MouseAction({element:this})), this.MouseAction.use(e, t), this
    }}), Ucren.isIe && document.execCommand("BackgroundImageCache", !1, !0);
    for (var i in Ucren)exports[i] = Ucren[i];
    return window.Ucren || (window.Ucren = Ucren), exports
}), define("scripts/lib/raphael.js", function (e) {
    var t = {}, n = function (e) {
        var t = "0.3.4", n = "hasOwnProperty", r = /[\.\/]/, i = "*", s = function () {
        }, o = function (e, t) {
            return e - t
        }, u, a, f = {n:{}}, l = function (e, t) {
            var n = f, r = a, i = Array.prototype.slice.call(arguments, 2), s = l.listeners(e), c = 0, h = !1, p, d = [], v = {}, m = [], g = u, y = [];
            u = e, a = 0;
            for (var b = 0, w = s.length; b < w; b++)"zIndex"in s[b] && (d.push(s[b].zIndex), s[b].zIndex < 0 && (v[s[b].zIndex] = s[b]));
            d.sort(o);
            while (d[c] < 0) {
                p = v[d[c++]], m.push(p.apply(t, i));
                if (a)return a = r, m
            }
            for (b = 0; b < w; b++) {
                p = s[b];
                if ("zIndex"in p)if (p.zIndex == d[c]) {
                    m.push(p.apply(t, i));
                    if (a)break;
                    do {
                        c++, p = v[d[c]], p && m.push(p.apply(t, i));
                        if (a)break
                    } while (p)
                } else v[p.zIndex] = p; else {
                    m.push(p.apply(t, i));
                    if (a)break
                }
            }
            return a = r, u = g, m.length ? m : null
        };
        return l.listeners = function (e) {
            var t = e.split(r), n = f, s, o, u, a, l, c, h, p, d = [n], v = [];
            for (a = 0, l = t.length; a < l; a++) {
                p = [];
                for (c = 0, h = d.length; c < h; c++) {
                    n = d[c].n, o = [n[t[a]], n[i]], u = 2;
                    while (u--)s = o[u], s && (p.push(s), v = v.concat(s.f || []))
                }
                d = p
            }
            return v
        }, l.on = function (e, t) {
            var n = e.split(r), i = f;
            for (var o = 0, u = n.length; o < u; o++)i = i.n, !i[n[o]] && (i[n[o]] = {n:{}}), i = i[n[o]];
            i.f = i.f || [];
            for (o = 0, u = i.f.length; o < u; o++)if (i.f[o] == t)return s;
            return i.f.push(t), function (e) {
                +e == +e && (t.zIndex = +e)
            }
        }, l.stop = function () {
            a = 1
        }, l.nt = function (e) {
            return e ? (new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)")).test(u) : u
        }, l.off = l.unbind = function (e, t) {
            var s = e.split(r), o, u, a, l, c, h, p, d = [f];
            for (l = 0, c = s.length; l < c; l++)for (h = 0; h < d.length; h += a.length - 2) {
                a = [h, 1], o = d[h].n;
                if (s[l] != i)o[s[l]] && a.push(o[s[l]]); else for (u in o)o[n](u) && a.push(o[u]);
                d.splice.apply(d, a)
            }
            for (l = 0, c = d.length; l < c; l++) {
                o = d[l];
                while (o.n) {
                    if (t) {
                        if (o.f) {
                            for (h = 0, p = o.f.length; h < p; h++)if (o.f[h] == t) {
                                o.f.splice(h, 1);
                                break
                            }
                            !o.f.length && delete o.f
                        }
                        for (u in o.n)if (o.n[n](u) && o.n[u].f) {
                            var v = o.n[u].f;
                            for (h = 0, p = v.length; h < p; h++)if (v[h] == t) {
                                v.splice(h, 1);
                                break
                            }
                            !v.length && delete o.n[u].f
                        }
                    } else {
                        delete o.f;
                        for (u in o.n)o.n[n](u) && o.n[u].f && delete o.n[u].f
                    }
                    o = o.n
                }
            }
        }, l.once = function (e, t) {
            var n = function () {
                var r = t.apply(this, arguments);
                return l.unbind(e, n), r
            };
            return l.on(e, n)
        }, l.version = t, l.toString = function () {
            return"You are running Eve " + t
        }, l
    }(t);
    return function () {
        function e(r) {
            if (e.is(r, "function"))return t ? r() : n.on("raphael.DOMload", r);
            if (e.is(r, M))return e._engine.create[p](e, r.splice(0, 3 + e.is(r[0], A))).add(r);
            var i = Array.prototype.slice.call(arguments, 0);
            if (e.is(i[i.length - 1], "function")) {
                var s = i.pop();
                return t ? s.call(e._engine.create[p](e, i)) : n.on("raphael.DOMload", function () {
                    s.call(e._engine.create[p](e, i))
                })
            }
            return e._engine.create[p](e, arguments)
        }

        function pt(e) {
            if (Object(e) !== e)return e;
            var t = new e.constructor;
            for (var n in e)e[u](n) && (t[n] = pt(e[n]));
            return t
        }

        function Et(e, t) {
            for (var n = 0, r = e.length; n < r; n++)if (e[n] === t)return e.push(e.splice(n, 1)[0])
        }

        function St(e, t, n) {
            function r() {
                var i = Array.prototype.slice.call(arguments, 0), s = i.join("␀"), o = r.cache = r.cache || {}, a = r.count = r.count || [];
                return o[u](s) ? (Et(a, s), n ? n(o[s]) : o[s]) : (a.length >= 1e3 && delete o[a.shift()], a.push(s), o[s] = e[p](t, i), n ? n(o[s]) : o[s])
            }

            return r
        }

        function Tt() {
            return this.hex
        }

        function Nt(e, t) {
            var n = [];
            for (var r = 0, i = e.length; i - 2 * !t > r; r += 2) {
                var s = [
                    {x:+e[r - 2], y:+e[r - 1]},
                    {x:+e[r], y:+e[r + 1]},
                    {x:+e[r + 2], y:+e[r + 3]},
                    {x:+e[r + 4], y:+e[r + 5]}
                ];
                t ? r ? i - 4 == r ? s[3] = {x:+e[0], y:+e[1]} : i - 2 == r && (s[2] = {x:+e[0], y:+e[1]}, s[3] = {x:+e[2], y:+e[3]}) : s[0] = {x:+e[i - 2], y:+e[i - 1]} : i - 4 == r ? s[3] = s[2] : r || (s[0] = {x:+e[r], y:+e[r + 1]}), n.push(["C", (-s[0].x + 6 * s[1].x + s[2].x) / 6, (-s[0].y + 6 * s[1].y + s[2].y) / 6, (s[1].x + 6 * s[2].x - s[3].x) / 6, (s[1].y + 6 * s[2].y - s[3].y) / 6, s[2].x, s[2].y])
            }
            return n
        }

        function kt(e, t, n, r, i) {
            var s = -3 * t + 9 * n - 9 * r + 3 * i, o = e * s + 6 * t - 12 * n + 6 * r;
            return e * o - 3 * t + 3 * n
        }

        function Lt(e, t, n, r, i, s, o, u, a) {
            a == null && (a = 1), a = a > 1 ? 1 : a < 0 ? 0 : a;
            var f = a / 2, l = 12, c = [-0.1252, .1252, -0.3678, .3678, -0.5873, .5873, -0.7699, .7699, -0.9041, .9041, -0.9816, .9816], h = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], p = 0;
            for (var d = 0; d < l; d++) {
                var v = f * c[d] + f, m = kt(v, e, n, i, o), g = kt(v, t, r, s, u), y = m * m + g * g;
                p += h[d] * x.sqrt(y)
            }
            return f * p
        }

        function At(e, t, n, r, i, s, o, u, a) {
            if (a < 0 || Lt(e, t, n, r, i, s, o, u) < a)return;
            var f = 1, l = f / 2, c = f - l, h, p = .01;
            h = Lt(e, t, n, r, i, s, o, u, c);
            while (C(h - a) > p)l /= 2, c += (h < a ? 1 : -1) * l, h = Lt(e, t, n, r, i, s, o, u, c);
            return c
        }

        function Ot(e, t, n, r, i, s, o, u) {
            if (T(e, n) < N(i, o) || N(e, n) > T(i, o) || T(t, r) < N(s, u) || N(t, r) > T(s, u))return;
            var a = (e * r - t * n) * (i - o) - (e - n) * (i * u - s * o), f = (e * r - t * n) * (s - u) - (t - r) * (i * u - s * o), l = (e - n) * (s - u) - (t - r) * (i - o);
            if (!l)return;
            var c = a / l, h = f / l, p = +c.toFixed(2), d = +h.toFixed(2);
            if (p < +N(e, n).toFixed(2) || p > +T(e, n).toFixed(2) || p < +N(i, o).toFixed(2) || p > +T(i, o).toFixed(2) || d < +N(t, r).toFixed(2) || d > +T(t, r).toFixed(2) || d < +N(s, u).toFixed(2) || d > +T(s, u).toFixed(2))return;
            return{x:c, y:h}
        }

        function Mt(e, t) {
            return Dt(e, t)
        }

        function _t(e, t) {
            return Dt(e, t, 1)
        }

        function Dt(t, n, r) {
            var i = e.bezierBBox(t), s = e.bezierBBox(n);
            if (!e.isBBoxIntersect(i, s))return r ? 0 : [];
            var o = Lt.apply(0, t), u = Lt.apply(0, n), a = ~~(o / 5), f = ~~(u / 5), l = [], c = [], h = {}, p = r ? 0 : [];
            for (var d = 0; d < a + 1; d++) {
                var v = e.findDotsAtSegment.apply(e, t.concat(d / a));
                l.push({x:v.x, y:v.y, t:d / a})
            }
            for (d = 0; d < f + 1; d++)v = e.findDotsAtSegment.apply(e, n.concat(d / f)), c.push({x:v.x, y:v.y, t:d / f});
            for (d = 0; d < a; d++)for (var m = 0; m < f; m++) {
                var g = l[d], y = l[d + 1], b = c[m], w = c[m + 1], E = C(y.x - g.x) < .001 ? "y" : "x", S = C(w.x - b.x) < .001 ? "y" : "x", x = Ot(g.x, g.y, y.x, y.y, b.x, b.y, w.x, w.y);
                if (x) {
                    if (h[x.x.toFixed(4)] == x.y.toFixed(4))continue;
                    h[x.x.toFixed(4)] = x.y.toFixed(4);
                    var T = g.t + C((x[E] - g[E]) / (y[E] - g[E])) * (y.t - g.t), N = b.t + C((x[S] - b[S]) / (w[S] - b[S])) * (w.t - b.t);
                    T >= 0 && T <= 1 && N >= 0 && N <= 1 && (r ? p++ : p.push({x:x.x, y:x.y, t1:T, t2:N}))
                }
            }
            return p
        }

        function Pt(t, n, r) {
            t = e._path2curve(t), n = e._path2curve(n);
            var i, s, o, u, a, f, l, c, h, p, d = r ? 0 : [];
            for (var v = 0, m = t.length; v < m; v++) {
                var g = t[v];
                if (g[0] == "M")i = a = g[1], s = f = g[2]; else {
                    g[0] == "C" ? (h = [i, s].concat(g.slice(1)), i = h[6], s = h[7]) : (h = [i, s, i, s, a, f, a, f], i = a, s = f);
                    for (var y = 0, b = n.length; y < b; y++) {
                        var w = n[y];
                        if (w[0] == "M")o = l = w[1], u = c = w[2]; else {
                            w[0] == "C" ? (p = [o, u].concat(w.slice(1)), o = p[6], u = p[7]) : (p = [o, u, o, u, l, c, l, c], o = l, u = c);
                            var E = Dt(h, p, r);
                            if (r)d += E; else {
                                for (var S = 0, x = E.length; S < x; S++)E[S].segment1 = v, E[S].segment2 = y, E[S].bez1 = h, E[S].bez2 = p;
                                d = d.concat(E)
                            }
                        }
                    }
                }
            }
            return d
        }

        function nn(e, t, n, r, i, s) {
            e != null ? (this.a = +e, this.b = +t, this.c = +n, this.d = +r, this.e = +i, this.f = +s) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
        }

        function gn() {
            return this.x + g + this.y
        }

        function yn() {
            return this.x + g + this.y + g + this.width + " × " + this.height
        }

        function On(e, t, n, r, i, s) {
            function h(e) {
                return((a * e + u) * e + o) * e
            }

            function p(e, t) {
                var n = d(e, t);
                return((c * n + l) * n + f) * n
            }

            function d(e, t) {
                var n, r, i, s, f, l;
                for (i = e, l = 0; l < 8; l++) {
                    s = h(i) - e;
                    if (C(s) < t)return i;
                    f = (3 * a * i + 2 * u) * i + o;
                    if (C(f) < 1e-6)break;
                    i -= s / f
                }
                n = 0, r = 1, i = e;
                if (i < n)return n;
                if (i > r)return r;
                while (n < r) {
                    s = h(i);
                    if (C(s - e) < t)return i;
                    e > s ? n = i : r = i, i = (r - n) / 2 + n
                }
                return i
            }

            var o = 3 * t, u = 3 * (r - t) - o, a = 1 - o - u, f = 3 * n, l = 3 * (i - n) - f, c = 1 - f - l;
            return p(e, 1 / (200 * s))
        }

        function Mn(e, t) {
            var n = [], r = {};
            this.ms = t, this.times = 1;
            if (e) {
                for (var i in e)e[u](i) && (r[z(i)] = e[i], n.push(z(i)));
                n.sort(it)
            }
            this.anim = r, this.top = n[n.length - 1], this.percents = n
        }

        function _n(t, i, s, o, a, f) {
            s = z(s);
            var l, c, h, p = [], v, m, g, w = t.ms, E = {}, S = {}, x = {};
            if (o)for (N = 0, C = Cn.length; N < C; N++) {
                var T = Cn[N];
                if (T.el.id == i.id && T.anim == t) {
                    T.percent != s ? (Cn.splice(N, 1), h = 1) : c = T, i.attr(T.totalOrigin);
                    break
                }
            } else o = +S;
            for (var N = 0, C = t.percents.length; N < C; N++) {
                if (t.percents[N] == s || t.percents[N] > o * t.top) {
                    s = t.percents[N], m = t.percents[N - 1] || 0, w = w / t.top * (s - m), v = t.percents[N + 1], l = t.anim[s];
                    break
                }
                o && i.attr(t.anim[t.percents[N]])
            }
            if (!l)return;
            if (!c) {
                for (var k in l)if (l[u](k))if ($[u](k) || i.paper.customAttributes[u](k)) {
                    E[k] = i.attr(k), E[k] == null && (E[k] = V[k]), S[k] = l[k];
                    switch ($[k]) {
                        case A:
                            x[k] = (S[k] - E[k]) / w;
                            break;
                        case"colour":
                            E[k] = e.getRGB(E[k]);
                            var L = e.getRGB(S[k]);
                            x[k] = {r:(L.r - E[k].r) / w, g:(L.g - E[k].g) / w, b:(L.b - E[k].b) / w};
                            break;
                        case"path":
                            var O = Wt(E[k], S[k]), M = O[1];
                            E[k] = O[0], x[k] = [];
                            for (N = 0, C = E[k].length; N < C; N++) {
                                x[k][N] = [0];
                                for (var _ = 1, D = E[k][N].length; _ < D; _++)x[k][N][_] = (M[N][_] - E[k][N][_]) / w
                            }
                            break;
                        case"transform":
                            var P = i._, H = tn(P[k], S[k]);
                            if (H) {
                                E[k] = H.from, S[k] = H.to, x[k] = [], x[k].real = !0;
                                for (N = 0, C = E[k].length; N < C; N++) {
                                    x[k][N] = [E[k][N][0]];
                                    for (_ = 1, D = E[k][N].length; _ < D; _++)x[k][N][_] = (S[k][N][_] - E[k][N][_]) / w
                                }
                            } else {
                                var B = i.matrix || new nn, j = {_:{transform:P.transform}, getBBox:function () {
                                    return i.getBBox(1)
                                }};
                                E[k] = [B.a, B.b, B.c, B.d, B.e, B.f], Zt(j, S[k]), S[k] = j._.transform, x[k] = [(j.matrix.a - B.a) / w, (j.matrix.b - B.b) / w, (j.matrix.c - B.c) / w, (j.matrix.d - B.d) / w, (j.matrix.e - B.e) / w, (j.matrix.f - B.f) / w]
                            }
                            break;
                        case"csv":
                            var F = y(l[k])[b](r), I = y(E[k])[b](r);
                            if (k == "clip-rect") {
                                E[k] = I, x[k] = [], N = I.length;
                                while (N--)x[k][N] = (F[N] - E[k][N]) / w
                            }
                            S[k] = F;
                            break;
                        default:
                            F = [][d](l[k]), I = [][d](E[k]), x[k] = [], N = i.paper.customAttributes[k].length;
                            while (N--)x[k][N] = ((F[N] || 0) - (I[N] || 0)) / w
                    }
                }
                var R = l.easing, U = e.easing_formulas[R];
                if (!U) {
                    U = y(R).match(q);
                    if (U && U.length == 5) {
                        var W = U;
                        U = function (e) {
                            return On(e, +W[1], +W[2], +W[3], +W[4], w)
                        }
                    } else U = ot
                }
                g = l.start || t.start || +(new Date), T = {anim:t, percent:s, timestamp:g, start:g + (t.del || 0), status:0, initstatus:o || 0, stop:!1, ms:w, easing:U, from:E, diff:x, to:S, el:i, callback:l.callback, prev:m, next:v, repeat:f || t.times, origin:i.attr(), totalOrigin:a}, Cn.push(T);
                if (o && !c && !h) {
                    T.stop = !0, T.start = new Date - w * o;
                    if (Cn.length == 1)return Ln()
                }
                h && (T.start = new Date - T.ms * o), Cn.length == 1 && kn(Ln)
            } else c.initstatus = o, c.start = new Date - c.ms * o;
            n("raphael.anim.start." + i.id, i, t)
        }

        function Dn(e) {
            for (var t = 0; t < Cn.length; t++)Cn[t].el.paper == e && Cn.splice(t--, 1)
        }

        e.version = "2.1.0", e.eve = n;
        var t, r = /[, ]+/, i = {circle:1, rect:1, path:1, ellipse:1, text:1, image:1}, s = /\{(\d+)\}/g, o = "prototype", u = "hasOwnProperty", a = {doc:document, win:window}, f = {was:Object.prototype[u].call(a.win, "Raphael"), is:a.win.Raphael}, l = function () {
            this.ca = this.customAttributes = {}
        }, c, h = "appendChild", p = "apply", d = "concat", v = "createTouch"in a.doc, m = "", g = " ", y = String, b = "split", w = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[b](g), E = {mousedown:"touchstart", mousemove:"touchmove", mouseup:"touchend"}, S = y.prototype.toLowerCase, x = Math, T = x.max, N = x.min, C = x.abs, k = x.pow, L = x.PI, A = "number", O = "string", M = "array", _ = "toString", D = "fill", P = Object.prototype.toString, H = {}, B = "push", j = e._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, F = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, I = {NaN:1, Infinity:1, "-Infinity":1}, q = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, R = x.round, U = "setAttribute", z = parseFloat, W = parseInt, X = y.prototype.toUpperCase, V = e._availableAttrs = {"arrow-end":"none", "arrow-start":"none", blur:0, "clip-rect":"0 0 1e9 1e9", cursor:"default", cx:0, cy:0, fill:"#fff", "fill-opacity":1, font:'10px "Arial"', "font-family":'"Arial"', "font-size":"10", "font-style":"normal", "font-weight":400, gradient:0, height:0, href:"http://raphaeljs.com/", "letter-spacing":0, opacity:1, path:"M0,0", r:0, rx:0, ry:0, src:"", stroke:"#000", "stroke-dasharray":"", "stroke-linecap":"butt", "stroke-linejoin":"butt", "stroke-miterlimit":0, "stroke-opacity":1, "stroke-width":1, target:"_blank", "text-anchor":"middle", title:"Raphael", transform:"", width:0, x:0, y:0}, $ = e._availableAnimAttrs = {blur:A, "clip-rect":"csv", cx:A, cy:A, fill:"colour", "fill-opacity":A, "font-size":A, height:A, opacity:A, path:"path", r:A, rx:A, ry:A, stroke:"colour", "stroke-opacity":A, "stroke-width":A, transform:"transform", width:A, x:A, y:A}, J = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g, K = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, Q = {hs:1, rg:1}, G = /,?([achlmqrstvxz]),?/gi, Y = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, Z = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, et = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig, tt = e._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, nt = {}, rt = function (e, t) {
            return e.key - t.key
        }, it = function (e, t) {
            return z(e) - z(t)
        }, st = function () {
        }, ot = function (e) {
            return e
        }, ut = e._rectPath = function (e, t, n, r, i) {
            return i ? [
                ["M", e + i, t],
                ["l", n - i * 2, 0],
                ["a", i, i, 0, 0, 1, i, i],
                ["l", 0, r - i * 2],
                ["a", i, i, 0, 0, 1, -i, i],
                ["l", i * 2 - n, 0],
                ["a", i, i, 0, 0, 1, -i, -i],
                ["l", 0, i * 2 - r],
                ["a", i, i, 0, 0, 1, i, -i],
                ["z"]
            ] : [
                ["M", e, t],
                ["l", n, 0],
                ["l", 0, r],
                ["l", -n, 0],
                ["z"]
            ]
        }, at = function (e, t, n, r) {
            return r == null && (r = n), [
                ["M", e, t],
                ["m", 0, -r],
                ["a", n, r, 0, 1, 1, 0, 2 * r],
                ["a", n, r, 0, 1, 1, 0, -2 * r],
                ["z"]
            ]
        }, ft = e._getPath = {path:function (e) {
            return e.attr("path")
        }, circle:function (e) {
            var t = e.attrs;
            return at(t.cx, t.cy, t.r)
        }, ellipse:function (e) {
            var t = e.attrs;
            return at(t.cx, t.cy, t.rx, t.ry)
        }, rect:function (e) {
            var t = e.attrs;
            return ut(t.x, t.y, t.width, t.height, t.r)
        }, image:function (e) {
            var t = e.attrs;
            return ut(t.x, t.y, t.width, t.height)
        }, text:function (e) {
            var t = e._getBBox();
            return ut(t.x, t.y, t.width, t.height)
        }}, lt = e.mapPath = function (e, t) {
            if (!t)return e;
            var n, r, i, s, o, u, a;
            e = Wt(e);
            for (i = 0, o = e.length; i < o; i++) {
                a = e[i];
                for (s = 1, u = a.length; s < u; s += 2)n = t.x(a[s], a[s + 1]), r = t.y(a[s], a[s + 1]), a[s] = n, a[s + 1] = r
            }
            return e
        };
        e._g = a, e.type = a.win.SVGAngle || a.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
        if (e.type == "VML") {
            var ct = a.doc.createElement("div"), ht;
            ct.innerHTML = '<v:shape adj="1"/>', ht = ct.firstChild, ht.style.behavior = "url(#default#VML)";
            if (!ht || typeof ht.adj != "object")return e.type = m;
            ct = null
        }
        e.svg = !(e.vml = e.type == "VML"), e._Paper = l, e.fn = c = l.prototype = e.prototype, e._id = 0, e._oid = 0, e.is = function (e, t) {
            return t = S.call(t), t == "finite" ? !I[u](+e) : t == "array" ? e instanceof Array : t == "null" && e === null || t == typeof e && e !== null || t == "object" && e === Object(e) || t == "array" && Array.isArray && Array.isArray(e) || P.call(e).slice(8, -1).toLowerCase() == t
        }, e.angle = function (t, n, r, i, s, o) {
            if (s == null) {
                var u = t - r, a = n - i;
                return!u && !a ? 0 : (180 + x.atan2(-a, -u) * 180 / L + 360) % 360
            }
            return e.angle(t, n, s, o) - e.angle(r, i, s, o)
        }, e.rad = function (e) {
            return e % 360 * L / 180
        }, e.deg = function (e) {
            return e * 180 / L % 360
        }, e.snapTo = function (t, n, r) {
            r = e.is(r, "finite") ? r : 10;
            if (e.is(t, M)) {
                var i = t.length;
                while (i--)if (C(t[i] - n) <= r)return t[i]
            } else {
                t = +t;
                var s = n % t;
                if (s < r)return n - s;
                if (s > t - r)return n - s + t
            }
            return n
        };
        var dt = e.createUUID = function (e, t) {
            return function () {
                return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(e, t).toUpperCase()
            }
        }(/[xy]/g, function (e) {
            var t = x.random() * 16 | 0, n = e == "x" ? t : t & 3 | 8;
            return n.toString(16)
        });
        e.setWindow = function (t) {
            n("raphael.setWindow", e, a.win, t), a.win = t, a.doc = a.win.document, e._engine.initWin && e._engine.initWin(a.win)
        };
        var vt = function (t) {
            if (e.vml) {
                var n = /^\s+|\s+$/g, r;
                try {
                    var i = new ActiveXObject("htmlfile");
                    i.write("<body>"), i.close(), r = i.body
                } catch (s) {
                    r = createPopup().document.body
                }
                var o = r.createTextRange();
                vt = St(function (e) {
                    try {
                        r.style.color = y(e).replace(n, m);
                        var t = o.queryCommandValue("ForeColor");
                        return t = (t & 255) << 16 | t & 65280 | (t & 16711680) >>> 16, "#" + ("000000" + t.toString(16)).slice(-6)
                    } catch (i) {
                        return"none"
                    }
                })
            } else {
                var u = a.doc.createElement("i");
                u.title = "Raphaël Colour Picker", u.style.display = "none", a.doc.body.appendChild(u), vt = St(function (e) {
                    return u.style.color = e, a.doc.defaultView.getComputedStyle(u, m).getPropertyValue("color")
                })
            }
            return vt(t)
        }, mt = function () {
            return"hsb(" + [this.h, this.s, this.b] + ")"
        }, gt = function () {
            return"hsl(" + [this.h, this.s, this.l] + ")"
        }, yt = function () {
            return this.hex
        }, bt = function (t, n, r) {
            n == null && e.is(t, "object") && "r"in t && "g"in t && "b"in t && (r = t.b, n = t.g, t = t.r);
            if (n == null && e.is(t, O)) {
                var i = e.getRGB(t);
                t = i.r, n = i.g, r = i.b
            }
            if (t > 1 || n > 1 || r > 1)t /= 255, n /= 255, r /= 255;
            return[t, n, r]
        }, wt = function (t, n, r, i) {
            t *= 255, n *= 255, r *= 255;
            var s = {r:t, g:n, b:r, hex:e.rgb(t, n, r), toString:yt};
            return e.is(i, "finite") && (s.opacity = i), s
        };
        e.color = function (t) {
            var n;
            return e.is(t, "object") && "h"in t && "s"in t && "b"in t ? (n = e.hsb2rgb(t), t.r = n.r, t.g = n.g, t.b = n.b, t.hex = n.hex) : e.is(t, "object") && "h"in t && "s"in t && "l"in t ? (n = e.hsl2rgb(t), t.r = n.r, t.g = n.g, t.b = n.b, t.hex = n.hex) : (e.is(t, "string") && (t = e.getRGB(t)), e.is(t, "object") && "r"in t && "g"in t && "b"in t ? (n = e.rgb2hsl(t), t.h = n.h, t.s = n.s, t.l = n.l, n = e.rgb2hsb(t), t.v = n.b) : (t = {hex:"none"}, t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1)), t.toString = yt, t
        }, e.hsb2rgb = function (e, t, n, r) {
            this.is(e, "object") && "h"in e && "s"in e && "b"in e && (n = e.b, t = e.s, e = e.h, r = e.o), e *= 360;
            var i, s, o, u, a;
            return e = e % 360 / 60, a = n * t, u = a * (1 - C(e % 2 - 1)), i = s = o = n - a, e = ~~e, i += [a, u, 0, 0, u, a][e], s += [u, a, a, u, 0, 0][e], o += [0, 0, u, a, a, u][e], wt(i, s, o, r)
        }, e.hsl2rgb = function (e, t, n, r) {
            this.is(e, "object") && "h"in e && "s"in e && "l"in e && (n = e.l, t = e.s, e = e.h);
            if (e > 1 || t > 1 || n > 1)e /= 360, t /= 100, n /= 100;
            e *= 360;
            var i, s, o, u, a;
            return e = e % 360 / 60, a = 2 * t * (n < .5 ? n : 1 - n), u = a * (1 - C(e % 2 - 1)), i = s = o = n - a / 2, e = ~~e, i += [a, u, 0, 0, u, a][e], s += [u, a, a, u, 0, 0][e], o += [0, 0, u, a, a, u][e], wt(i, s, o, r)
        }, e.rgb2hsb = function (e, t, n) {
            n = bt(e, t, n), e = n[0], t = n[1], n = n[2];
            var r, i, s, o;
            return s = T(e, t, n), o = s - N(e, t, n), r = o == 0 ? null : s == e ? (t - n) / o : s == t ? (n - e) / o + 2 : (e - t) / o + 4, r = (r + 360) % 6 * 60 / 360, i = o == 0 ? 0 : o / s, {h:r, s:i, b:s, toString:mt}
        }, e.rgb2hsl = function (e, t, n) {
            n = bt(e, t, n), e = n[0], t = n[1], n = n[2];
            var r, i, s, o, u, a;
            return o = T(e, t, n), u = N(e, t, n), a = o - u, r = a == 0 ? null : o == e ? (t - n) / a : o == t ? (n - e) / a + 2 : (e - t) / a + 4, r = (r + 360) % 6 * 60 / 360, s = (o + u) / 2, i = a == 0 ? 0 : s < .5 ? a / (2 * s) : a / (2 - 2 * s), {h:r, s:i, l:s, toString:gt}
        }, e._path2string = function () {
            return this.join(",").replace(G, "$1")
        };
        var xt = e._preload = function (e, t) {
            var n = a.doc.createElement("img");
            n.style.cssText = "position:absolute;left:-9999em;top:-9999em", n.onload = function () {
                t.call(this), this.onload = null, a.doc.body.removeChild(this)
            }, n.onerror = function () {
                a.doc.body.removeChild(this)
            }, a.doc.body.appendChild(n), n.src = e
        };
        e.getRGB = St(function (t) {
            if (!t || !!((t = y(t)).indexOf("-") + 1))return{r:-1, g:-1, b:-1, hex:"none", error:1, toString:Tt};
            if (t == "none")return{r:-1, g:-1, b:-1, hex:"none", toString:Tt};
            !Q[u](t.toLowerCase().substring(0, 2)) && t.charAt() != "#" && (t = vt(t));
            var n, r, i, s, o, a, f, l = t.match(F);
            return l ? (l[2] && (s = W(l[2].substring(5), 16), i = W(l[2].substring(3, 5), 16), r = W(l[2].substring(1, 3), 16)), l[3] && (s = W((a = l[3].charAt(3)) + a, 16), i = W((a = l[3].charAt(2)) + a, 16), r = W((a = l[3].charAt(1)) + a, 16)), l[4] && (f = l[4][b](K), r = z(f[0]), f[0].slice(-1) == "%" && (r *= 2.55), i = z(f[1]), f[1].slice(-1) == "%" && (i *= 2.55), s = z(f[2]), f[2].slice(-1) == "%" && (s *= 2.55), l[1].toLowerCase().slice(0, 4) == "rgba" && (o = z(f[3])), f[3] && f[3].slice(-1) == "%" && (o /= 100)), l[5] ? (f = l[5][b](K), r = z(f[0]), f[0].slice(-1) == "%" && (r *= 2.55), i = z(f[1]), f[1].slice(-1) == "%" && (i *= 2.55), s = z(f[2]), f[2].slice(-1) == "%" && (s *= 2.55), (f[0].slice(-3) == "deg" || f[0].slice(-1) == "°") && (r /= 360), l[1].toLowerCase().slice(0, 4) == "hsba" && (o = z(f[3])), f[3] && f[3].slice(-1) == "%" && (o /= 100), e.hsb2rgb(r, i, s, o)) : l[6] ? (f = l[6][b](K), r = z(f[0]), f[0].slice(-1) == "%" && (r *= 2.55), i = z(f[1]), f[1].slice(-1) == "%" && (i *= 2.55), s = z(f[2]), f[2].slice(-1) == "%" && (s *= 2.55), (f[0].slice(-3) == "deg" || f[0].slice(-1) == "°") && (r /= 360), l[1].toLowerCase().slice(0, 4) == "hsla" && (o = z(f[3])), f[3] && f[3].slice(-1) == "%" && (o /= 100), e.hsl2rgb(r, i, s, o)) : (l = {r:r, g:i, b:s, toString:Tt}, l.hex = "#" + (16777216 | s | i << 8 | r << 16).toString(16).slice(1), e.is(o, "finite") && (l.opacity = o), l)) : {r:-1, g:-1, b:-1, hex:"none", error:1, toString:Tt}
        }, e), e.hsb = St(function (t, n, r) {
            return e.hsb2rgb(t, n, r).hex
        }), e.hsl = St(function (t, n, r) {
            return e.hsl2rgb(t, n, r).hex
        }), e.rgb = St(function (e, t, n) {
            return"#" + (16777216 | n | t << 8 | e << 16).toString(16).slice(1)
        }), e.getColor = function (e) {
            var t = this.getColor.start = this.getColor.start || {h:0, s:1, b:e || .75}, n = this.hsb2rgb(t.h, t.s, t.b);
            return t.h += .075, t.h > 1 && (t.h = 0, t.s -= .2, t.s <= 0 && (this.getColor.start = {h:0, s:1, b:t.b})), n.hex
        }, e.getColor.reset = function () {
            delete this.start
        }, e.parsePathString = function (t) {
            if (!t)return null;
            var n = Ct(t);
            if (n.arr)return Bt(n.arr);
            var r = {a:7, c:6, h:1, l:2, m:2, r:4, q:4, s:4, t:2, v:1, z:0}, i = [];
            return e.is(t, M) && e.is(t[0], M) && (i = Bt(t)), i.length || y(t).replace(Y, function (e, t, n) {
                var s = [], o = t.toLowerCase();
                n.replace(et, function (e, t) {
                    t && s.push(+t)
                }), o == "m" && s.length > 2 && (i.push([t][d](s.splice(0, 2))), o = "l", t = t == "m" ? "l" : "L");
                if (o == "r")i.push([t][d](s)); else while (s.length >= r[o]) {
                    i.push([t][d](s.splice(0, r[o])));
                    if (!r[o])break
                }
            }), i.toString = e._path2string, n.arr = Bt(i), i
        }, e.parseTransformString = St(function (t) {
            if (!t)return null;
            var n = {r:3, s:4, t:2, m:6}, r = [];
            return e.is(t, M) && e.is(t[0], M) && (r = Bt(t)), r.length || y(t).replace(Z, function (e, t, n) {
                var i = [], s = S.call(t);
                n.replace(et, function (e, t) {
                    t && i.push(+t)
                }), r.push([t][d](i))
            }), r.toString = e._path2string, r
        });
        var Ct = function (e) {
            var t = Ct.ps = Ct.ps || {};
            return t[e] ? t[e].sleep = 100 : t[e] = {sleep:100}, setTimeout(function () {
                for (var n in t)t[u](n) && n != e && (t[n].sleep--, !t[n].sleep && delete t[n])
            }), t[e]
        };
        e.findDotsAtSegment = function (e, t, n, r, i, s, o, u, a) {
            var f = 1 - a, l = k(f, 3), c = k(f, 2), h = a * a, p = h * a, d = l * e + c * 3 * a * n + f * 3 * a * a * i + p * o, v = l * t + c * 3 * a * r + f * 3 * a * a * s + p * u, m = e + 2 * a * (n - e) + h * (i - 2 * n + e), g = t + 2 * a * (r - t) + h * (s - 2 * r + t), y = n + 2 * a * (i - n) + h * (o - 2 * i + n), b = r + 2 * a * (s - r) + h * (u - 2 * s + r), w = f * e + a * n, E = f * t + a * r, S = f * i + a * o, T = f * s + a * u, N = 90 - x.atan2(m - y, g - b) * 180 / L;
            return(m > y || g < b) && (N += 180), {x:d, y:v, m:{x:m, y:g}, n:{x:y, y:b}, start:{x:w, y:E}, end:{x:S, y:T}, alpha:N}
        }, e.bezierBBox = function (t, n, r, i, s, o, u, a) {
            e.is(t, "array") || (t = [t, n, r, i, s, o, u, a]);
            var f = zt.apply(null, t);
            return{x:f.min.x, y:f.min.y, x2:f.max.x, y2:f.max.y, width:f.max.x - f.min.x, height:f.max.y - f.min.y}
        }, e.isPointInsideBBox = function (e, t, n) {
            return t >= e.x && t <= e.x2 && n >= e.y && n <= e.y2
        }, e.isBBoxIntersect = function (t, n) {
            var r = e.isPointInsideBBox;
            return r(n, t.x, t.y) || r(n, t.x2, t.y) || r(n, t.x, t.y2) || r(n, t.x2, t.y2) || r(t, n.x, n.y) || r(t, n.x2, n.y) || r(t, n.x, n.y2) || r(t, n.x2, n.y2) || (t.x < n.x2 && t.x > n.x || n.x < t.x2 && n.x > t.x) && (t.y < n.y2 && t.y > n.y || n.y < t.y2 && n.y > t.y)
        }, e.pathIntersection = function (e, t) {
            return Pt(e, t)
        }, e.pathIntersectionNumber = function (e, t) {
            return Pt(e, t, 1)
        }, e.isPointInsidePath = function (t, n, r) {
            var i = e.pathBBox(t);
            return e.isPointInsideBBox(i, n, r) && Pt(t, [
                ["M", n, r],
                ["H", i.x2 + 10]
            ], 1) % 2 == 1
        }, e._removedFactory = function (e) {
            return function () {
                n("raphael.log", null, "Raphaël: you are calling to method “" + e + "” of removed object", e)
            }
        };
        var Ht = e.pathBBox = function (e) {
            var t = Ct(e);
            if (t.bbox)return t.bbox;
            if (!e)return{x:0, y:0, width:0, height:0, x2:0, y2:0};
            e = Wt(e);
            var n = 0, r = 0, i = [], s = [], o;
            for (var u = 0, a = e.length; u < a; u++) {
                o = e[u];
                if (o[0] == "M")n = o[1], r = o[2], i.push(n), s.push(r); else {
                    var f = zt(n, r, o[1], o[2], o[3], o[4], o[5], o[6]);
                    i = i[d](f.min.x, f.max.x), s = s[d](f.min.y, f.max.y), n = o[5], r = o[6]
                }
            }
            var l = N[p](0, i), c = N[p](0, s), h = T[p](0, i), v = T[p](0, s), m = {x:l, y:c, x2:h, y2:v, width:h - l, height:v - c};
            return t.bbox = pt(m), m
        }, Bt = function (t) {
            var n = pt(t);
            return n.toString = e._path2string, n
        }, jt = e._pathToRelative = function (t) {
            var n = Ct(t);
            if (n.rel)return Bt(n.rel);
            if (!e.is(t, M) || !e.is(t && t[0], M))t = e.parsePathString(t);
            var r = [], i = 0, s = 0, o = 0, u = 0, a = 0;
            t[0][0] == "M" && (i = t[0][1], s = t[0][2], o = i, u = s, a++, r.push(["M", i, s]));
            for (var f = a, l = t.length; f < l; f++) {
                var c = r[f] = [], h = t[f];
                if (h[0] != S.call(h[0])) {
                    c[0] = S.call(h[0]);
                    switch (c[0]) {
                        case"a":
                            c[1] = h[1], c[2] = h[2], c[3] = h[3], c[4] = h[4], c[5] = h[5], c[6] = +(h[6] - i).toFixed(3), c[7] = +(h[7] - s).toFixed(3);
                            break;
                        case"v":
                            c[1] = +(h[1] - s).toFixed(3);
                            break;
                        case"m":
                            o = h[1], u = h[2];
                        default:
                            for (var p = 1, d = h.length; p < d; p++)c[p] = +(h[p] - (p % 2 ? i : s)).toFixed(3)
                    }
                } else {
                    c = r[f] = [], h[0] == "m" && (o = h[1] + i, u = h[2] + s);
                    for (var v = 0, m = h.length; v < m; v++)r[f][v] = h[v]
                }
                var g = r[f].length;
                switch (r[f][0]) {
                    case"z":
                        i = o, s = u;
                        break;
                    case"h":
                        i += +r[f][g - 1];
                        break;
                    case"v":
                        s += +r[f][g - 1];
                        break;
                    default:
                        i += +r[f][g - 2], s += +r[f][g - 1]
                }
            }
            return r.toString = e._path2string, n.rel = Bt(r), r
        }, Ft = e._pathToAbsolute = function (t) {
            var n = Ct(t);
            if (n.abs)return Bt(n.abs);
            if (!e.is(t, M) || !e.is(t && t[0], M))t = e.parsePathString(t);
            if (!t || !t.length)return[
                ["M", 0, 0]
            ];
            var r = [], i = 0, s = 0, o = 0, u = 0, a = 0;
            t[0][0] == "M" && (i = +t[0][1], s = +t[0][2], o = i, u = s, a++, r[0] = ["M", i, s]);
            var f = t.length == 3 && t[0][0] == "M" && t[1][0].toUpperCase() == "R" && t[2][0].toUpperCase() == "Z";
            for (var l, c, h = a, p = t.length; h < p; h++) {
                r.push(l = []), c = t[h];
                if (c[0] != X.call(c[0])) {
                    l[0] = X.call(c[0]);
                    switch (l[0]) {
                        case"A":
                            l[1] = c[1], l[2] = c[2], l[3] = c[3], l[4] = c[4], l[5] = c[5], l[6] = +(c[6] + i), l[7] = +(c[7] + s);
                            break;
                        case"V":
                            l[1] = +c[1] + s;
                            break;
                        case"H":
                            l[1] = +c[1] + i;
                            break;
                        case"R":
                            var v = [i, s][d](c.slice(1));
                            for (var m = 2, g = v.length; m < g; m++)v[m] = +v[m] + i, v[++m] = +v[m] + s;
                            r.pop(), r = r[d](Nt(v, f));
                            break;
                        case"M":
                            o = +c[1] + i, u = +c[2] + s;
                        default:
                            for (m = 1, g = c.length; m < g; m++)l[m] = +c[m] + (m % 2 ? i : s)
                    }
                } else if (c[0] == "R")v = [i, s][d](c.slice(1)), r.pop(), r = r[d](Nt(v, f)), l = ["R"][d](c.slice(-2)); else for (var y = 0, b = c.length; y < b; y++)l[y] = c[y];
                switch (l[0]) {
                    case"Z":
                        i = o, s = u;
                        break;
                    case"H":
                        i = l[1];
                        break;
                    case"V":
                        s = l[1];
                        break;
                    case"M":
                        o = l[l.length - 2], u = l[l.length - 1];
                    default:
                        i = l[l.length - 2], s = l[l.length - 1]
                }
            }
            return r.toString = e._path2string, n.abs = Bt(r), r
        }, It = function (e, t, n, r) {
            return[e, t, n, r, n, r]
        }, qt = function (e, t, n, r, i, s) {
            var o = 1 / 3, u = 2 / 3;
            return[o * e + u * n, o * t + u * r, o * i + u * n, o * s + u * r, i, s]
        }, Rt = function (e, t, n, r, i, s, o, u, a, f) {
            var l = L * 120 / 180, c = L / 180 * (+i || 0), h = [], p, v = St(function (e, t, n) {
                var r = e * x.cos(n) - t * x.sin(n), i = e * x.sin(n) + t * x.cos(n);
                return{x:r, y:i}
            });
            if (!f) {
                p = v(e, t, -c), e = p.x, t = p.y, p = v(u, a, -c), u = p.x, a = p.y;
                var m = x.cos(L / 180 * i), g = x.sin(L / 180 * i), y = (e - u) / 2, w = (t - a) / 2, E = y * y / (n * n) + w * w / (r * r);
                E > 1 && (E = x.sqrt(E), n = E * n, r = E * r);
                var S = n * n, T = r * r, N = (s == o ? -1 : 1) * x.sqrt(C((S * T - S * w * w - T * y * y) / (S * w * w + T * y * y))), k = N * n * w / r + (e + u) / 2, A = N * -r * y / n + (t + a) / 2, O = x.asin(((t - A) / r).toFixed(9)), M = x.asin(((a - A) / r).toFixed(9));
                O = e < k ? L - O : O, M = u < k ? L - M : M, O < 0 && (O = L * 2 + O), M < 0 && (M = L * 2 + M), o && O > M && (O -= L * 2), !o && M > O && (M -= L * 2)
            } else O = f[0], M = f[1], k = f[2], A = f[3];
            var _ = M - O;
            if (C(_) > l) {
                var D = M, P = u, H = a;
                M = O + l * (o && M > O ? 1 : -1), u = k + n * x.cos(M), a = A + r * x.sin(M), h = Rt(u, a, n, r, i, 0, o, P, H, [M, D, k, A])
            }
            _ = M - O;
            var B = x.cos(O), j = x.sin(O), F = x.cos(M), I = x.sin(M), q = x.tan(_ / 4), R = 4 / 3 * n * q, U = 4 / 3 * r * q, z = [e, t], W = [e + R * j, t - U * B], X = [u + R * I, a - U * F], V = [u, a];
            W[0] = 2 * z[0] - W[0], W[1] = 2 * z[1] - W[1];
            if (f)return[W, X, V][d](h);
            h = [W, X, V][d](h).join()[b](",");
            var $ = [];
            for (var J = 0, K = h.length; J < K; J++)$[J] = J % 2 ? v(h[J - 1], h[J], c).y : v(h[J], h[J + 1], c).x;
            return $
        }, Ut = function (e, t, n, r, i, s, o, u, a) {
            var f = 1 - a;
            return{x:k(f, 3) * e + k(f, 2) * 3 * a * n + f * 3 * a * a * i + k(a, 3) * o, y:k(f, 3) * t + k(f, 2) * 3 * a * r + f * 3 * a * a * s + k(a, 3) * u}
        }, zt = St(function (e, t, n, r, i, s, o, u) {
            var a = i - 2 * n + e - (o - 2 * i + n), f = 2 * (n - e) - 2 * (i - n), l = e - n, c = (-f + x.sqrt(f * f - 4 * a * l)) / 2 / a, h = (-f - x.sqrt(f * f - 4 * a * l)) / 2 / a, d = [t, u], v = [e, o], m;
            return C(c) > "1e12" && (c = .5), C(h) > "1e12" && (h = .5), c > 0 && c < 1 && (m = Ut(e, t, n, r, i, s, o, u, c), v.push(m.x), d.push(m.y)), h > 0 && h < 1 && (m = Ut(e, t, n, r, i, s, o, u, h), v.push(m.x), d.push(m.y)), a = s - 2 * r + t - (u - 2 * s + r), f = 2 * (r - t) - 2 * (s - r), l = t - r, c = (-f + x.sqrt(f * f - 4 * a * l)) / 2 / a, h = (-f - x.sqrt(f * f - 4 * a * l)) / 2 / a, C(c) > "1e12" && (c = .5), C(h) > "1e12" && (h = .5), c > 0 && c < 1 && (m = Ut(e, t, n, r, i, s, o, u, c), v.push(m.x), d.push(m.y)), h > 0 && h < 1 && (m = Ut(e, t, n, r, i, s, o, u, h), v.push(m.x), d.push(m.y)), {min:{x:N[p](0, v), y:N[p](0, d)}, max:{x:T[p](0, v), y:T[p](0, d)}}
        }), Wt = e._path2curve = St(function (e, t) {
            var n = !t && Ct(e);
            if (!t && n.curve)return Bt(n.curve);
            var r = Ft(e), i = t && Ft(t), s = {x:0, y:0, bx:0, by:0, X:0, Y:0, qx:null, qy:null}, o = {x:0, y:0, bx:0, by:0, X:0, Y:0, qx:null, qy:null}, u = function (e, t) {
                var n, r;
                if (!e)return["C", t.x, t.y, t.x, t.y, t.x, t.y];
                !(e[0]in{T:1, Q:1}) && (t.qx = t.qy = null);
                switch (e[0]) {
                    case"M":
                        t.X = e[1], t.Y = e[2];
                        break;
                    case"A":
                        e = ["C"][d](Rt[p](0, [t.x, t.y][d](e.slice(1))));
                        break;
                    case"S":
                        n = t.x + (t.x - (t.bx || t.x)), r = t.y + (t.y - (t.by || t.y)), e = ["C", n, r][d](e.slice(1));
                        break;
                    case"T":
                        t.qx = t.x + (t.x - (t.qx || t.x)), t.qy = t.y + (t.y - (t.qy || t.y)), e = ["C"][d](qt(t.x, t.y, t.qx, t.qy, e[1], e[2]));
                        break;
                    case"Q":
                        t.qx = e[1], t.qy = e[2], e = ["C"][d](qt(t.x, t.y, e[1], e[2], e[3], e[4]));
                        break;
                    case"L":
                        e = ["C"][d](It(t.x, t.y, e[1], e[2]));
                        break;
                    case"H":
                        e = ["C"][d](It(t.x, t.y, e[1], t.y));
                        break;
                    case"V":
                        e = ["C"][d](It(t.x, t.y, t.x, e[1]));
                        break;
                    case"Z":
                        e = ["C"][d](It(t.x, t.y, t.X, t.Y))
                }
                return e
            }, a = function (e, t) {
                if (e[t].length > 7) {
                    e[t].shift();
                    var n = e[t];
                    while (n.length)e.splice(t++, 0, ["C"][d](n.splice(0, 6)));
                    e.splice(t, 1), c = T(r.length, i && i.length || 0)
                }
            }, f = function (e, t, n, s, o) {
                e && t && e[o][0] == "M" && t[o][0] != "M" && (t.splice(o, 0, ["M", s.x, s.y]), n.bx = 0, n.by = 0, n.x = e[o][1], n.y = e[o][2], c = T(r.length, i && i.length || 0))
            };
            for (var l = 0, c = T(r.length, i && i.length || 0); l < c; l++) {
                r[l] = u(r[l], s), a(r, l), i && (i[l] = u(i[l], o)), i && a(i, l), f(r, i, s, o, l), f(i, r, o, s, l);
                var h = r[l], v = i && i[l], m = h.length, g = i && v.length;
                s.x = h[m - 2], s.y = h[m - 1], s.bx = z(h[m - 4]) || s.x, s.by = z(h[m - 3]) || s.y, o.bx = i && (z(v[g - 4]) || o.x), o.by = i && (z(v[g - 3]) || o.y), o.x = i && v[g - 2], o.y = i && v[g - 1]
            }
            return i || (n.curve = Bt(r)), i ? [r, i] : r
        }, null, Bt), Xt = e._parseDots = St(function (t) {
            var n = [];
            for (var r = 0, i = t.length; r < i; r++) {
                var s = {}, o = t[r].match(/^([^:]*):?([\d\.]*)/);
                s.color = e.getRGB(o[1]);
                if (s.color.error)return null;
                s.color = s.color.hex, o[2] && (s.offset = o[2] + "%"), n.push(s)
            }
            for (r = 1, i = n.length - 1; r < i; r++)if (!n[r].offset) {
                var u = z(n[r - 1].offset || 0), a = 0;
                for (var f = r + 1; f < i; f++)if (n[f].offset) {
                    a = n[f].offset;
                    break
                }
                a || (a = 100, f = i), a = z(a);
                var l = (a - u) / (f - r + 1);
                for (; r < f; r++)u += l, n[r].offset = u + "%"
            }
            return n
        }), Vt = e._tear = function (e, t) {
            e == t.top && (t.top = e.prev), e == t.bottom && (t.bottom = e.next), e.next && (e.next.prev = e.prev), e.prev && (e.prev.next = e.next)
        }, $t = e._tofront = function (e, t) {
            if (t.top === e)return;
            Vt(e, t), e.next = null, e.prev = t.top, t.top.next = e, t.top = e
        }, Jt = e._toback = function (e, t) {
            if (t.bottom === e)return;
            Vt(e, t), e.next = t.bottom, e.prev = null, t.bottom.prev = e, t.bottom = e
        }, Kt = e._insertafter = function (e, t, n) {
            Vt(e, n), t == n.top && (n.top = e), t.next && (t.next.prev = e), e.next = t.next, e.prev = t, t.next = e
        }, Qt = e._insertbefore = function (e, t, n) {
            Vt(e, n), t == n.bottom && (n.bottom = e), t.prev && (t.prev.next = e), e.prev = t.prev, t.prev = e, e.next = t
        }, Gt = e.toMatrix = function (e, t) {
            var n = Ht(e), r = {_:{transform:m}, getBBox:function () {
                return n
            }};
            return Zt(r, t), r.matrix
        }, Yt = e.transformPath = function (e, t) {
            return lt(e, Gt(e, t))
        }, Zt = e._extractTransform = function (t, n) {
            if (n == null)return t._.transform;
            n = y(n).replace(/\.{3}|\u2026/g, t._.transform || m);
            var r = e.parseTransformString(n), i = 0, s = 0, o = 0, u = 1, a = 1, f = t._, l = new nn;
            f.transform = r || [];
            if (r)for (var c = 0, h = r.length; c < h; c++) {
                var p = r[c], d = p.length, v = y(p[0]).toLowerCase(), g = p[0] != v, b = g ? l.invert() : 0, w, E, S, x, T;
                v == "t" && d == 3 ? g ? (w = b.x(0, 0), E = b.y(0, 0), S = b.x(p[1], p[2]), x = b.y(p[1], p[2]), l.translate(S - w, x - E)) : l.translate(p[1], p[2]) : v == "r" ? d == 2 ? (T = T || t.getBBox(1), l.rotate(p[1], T.x + T.width / 2, T.y + T.height / 2), i += p[1]) : d == 4 && (g ? (S = b.x(p[2], p[3]), x = b.y(p[2], p[3]), l.rotate(p[1], S, x)) : l.rotate(p[1], p[2], p[3]), i += p[1]) : v == "s" ? d == 2 || d == 3 ? (T = T || t.getBBox(1), l.scale(p[1], p[d - 1], T.x + T.width / 2, T.y + T.height / 2), u *= p[1], a *= p[d - 1]) : d == 5 && (g ? (S = b.x(p[3], p[4]), x = b.y(p[3], p[4]), l.scale(p[1], p[2], S, x)) : l.scale(p[1], p[2], p[3], p[4]), u *= p[1], a *= p[2]) : v == "m" && d == 7 && l.add(p[1], p[2], p[3], p[4], p[5], p[6]), f.dirtyT = 1, t.matrix = l
            }
            t.matrix = l, f.sx = u, f.sy = a, f.deg = i, f.dx = s = l.e, f.dy = o = l.f, u == 1 && a == 1 && !i && f.bbox ? (f.bbox.x += +s, f.bbox.y += +o) : f.dirtyT = 1
        }, en = function (e) {
            var t = e[0];
            switch (t.toLowerCase()) {
                case"t":
                    return[t, 0, 0];
                case"m":
                    return[t, 1, 0, 0, 1, 0, 0];
                case"r":
                    return e.length == 4 ? [t, 0, e[2], e[3]] : [t, 0];
                case"s":
                    return e.length == 5 ? [t, 1, 1, e[3], e[4]] : e.length == 3 ? [t, 1, 1] : [t, 1]
            }
        }, tn = e._equaliseTransform = function (t, n) {
            n = y(n).replace(/\.{3}|\u2026/g, t), t = e.parseTransformString(t) || [], n = e.parseTransformString(n) || [];
            var r = T(t.length, n.length), i = [], s = [], o = 0, u, a, f, l;
            for (; o < r; o++) {
                f = t[o] || en(n[o]), l = n[o] || en(f);
                if (f[0] != l[0] || f[0].toLowerCase() == "r" && (f[2] != l[2] || f[3] != l[3]) || f[0].toLowerCase() == "s" && (f[3] != l[3] || f[4] != l[4]))return;
                i[o] = [], s[o] = [];
                for (u = 0, a = T(f.length, l.length); u < a; u++)u in f && (i[o][u] = f[u]), u in l && (s[o][u] = l[u])
            }
            return{from:i, to:s}
        };
        e._getContainer = function (t, n, r, i) {
            var s;
            s = i == null && !e.is(t, "object") ? a.doc.getElementById(t) : t;
            if (s == null)return;
            return s.tagName ? n == null ? {container:s, width:s.style.pixelWidth || s.offsetWidth, height:s.style.pixelHeight || s.offsetHeight} : {container:s, width:n, height:r} : {container:1, x:t, y:n, width:r, height:i}
        }, e.pathToRelative = jt, e._engine = {}, e.path2curve = Wt, e.matrix = function (e, t, n, r, i, s) {
            return new nn(e, t, n, r, i, s)
        }, function (t) {
            function n(e) {
                return e[0] * e[0] + e[1] * e[1]
            }

            function r(e) {
                var t = x.sqrt(n(e));
                e[0] && (e[0] /= t), e[1] && (e[1] /= t)
            }

            t.add = function (e, t, n, r, i, s) {
                var o = [
                    [],
                    [],
                    []
                ], u = [
                    [this.a, this.c, this.e],
                    [this.b, this.d, this.f],
                    [0, 0, 1]
                ], a = [
                    [e, n, i],
                    [t, r, s],
                    [0, 0, 1]
                ], f, l, c, h;
                e && e instanceof nn && (a = [
                    [e.a, e.c, e.e],
                    [e.b, e.d, e.f],
                    [0, 0, 1]
                ]);
                for (f = 0; f < 3; f++)for (l = 0; l < 3; l++) {
                    h = 0;
                    for (c = 0; c < 3; c++)h += u[f][c] * a[c][l];
                    o[f][l] = h
                }
                this.a = o[0][0], this.b = o[1][0], this.c = o[0][1], this.d = o[1][1], this.e = o[0][2], this.f = o[1][2]
            }, t.invert = function () {
                var e = this, t = e.a * e.d - e.b * e.c;
                return new nn(e.d / t, -e.b / t, -e.c / t, e.a / t, (e.c * e.f - e.d * e.e) / t, (e.b * e.e - e.a * e.f) / t)
            }, t.clone = function () {
                return new nn(this.a, this.b, this.c, this.d, this.e, this.f)
            }, t.translate = function (e, t) {
                this.add(1, 0, 0, 1, e, t)
            }, t.scale = function (e, t, n, r) {
                t == null && (t = e), (n || r) && this.add(1, 0, 0, 1, n, r), this.add(e, 0, 0, t, 0, 0), (n || r) && this.add(1, 0, 0, 1, -n, -r)
            }, t.rotate = function (t, n, r) {
                t = e.rad(t), n = n || 0, r = r || 0;
                var i = +x.cos(t).toFixed(9), s = +x.sin(t).toFixed(9);
                this.add(i, s, -s, i, n, r), this.add(1, 0, 0, 1, -n, -r)
            }, t.x = function (e, t) {
                return e * this.a + t * this.c + this.e
            }, t.y = function (e, t) {
                return e * this.b + t * this.d + this.f
            }, t.get = function (e) {
                return+this[y.fromCharCode(97 + e)].toFixed(4)
            }, t.toString = function () {
                return e.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
            }, t.toFilter = function () {
                return"progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
            }, t.offset = function () {
                return[this.e.toFixed(4), this.f.toFixed(4)]
            }, t.split = function () {
                var t = {};
                t.dx = this.e, t.dy = this.f;
                var i = [
                    [this.a, this.c],
                    [this.b, this.d]
                ];
                t.scalex = x.sqrt(n(i[0])), r(i[0]), t.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1], i[1] = [i[1][0] - i[0][0] * t.shear, i[1][1] - i[0][1] * t.shear], t.scaley = x.sqrt(n(i[1])), r(i[1]), t.shear /= t.scaley;
                var s = -i[0][1], o = i[1][1];
                return o < 0 ? (t.rotate = e.deg(x.acos(o)), s < 0 && (t.rotate = 360 - t.rotate)) : t.rotate = e.deg(x.asin(s)), t.isSimple = !+t.shear.toFixed(9) && (t.scalex.toFixed(9) == t.scaley.toFixed(9) || !t.rotate), t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate, t.noRotation = !+t.shear.toFixed(9) && !t.rotate, t
            }, t.toTransformString = function (e) {
                var t = e || this[b]();
                return t.isSimple ? (t.scalex = +t.scalex.toFixed(4), t.scaley = +t.scaley.toFixed(4), t.rotate = +t.rotate.toFixed(4), (t.dx || t.dy ? "t" + [t.dx, t.dy] : m) + (t.scalex != 1 || t.scaley != 1 ? "s" + [t.scalex, t.scaley, 0, 0] : m) + (t.rotate ? "r" + [t.rotate, 0, 0] : m)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
            }
        }(nn.prototype);
        var rn = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
        navigator.vendor == "Apple Computer, Inc." && (rn && rn[1] < 4 || navigator.platform.slice(0, 2) == "iP") || navigator.vendor == "Google Inc." && rn && rn[1] < 8 ? c.safari = function () {
            var e = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke:"none"});
            setTimeout(function () {
                e.remove()
            })
        } : c.safari = st;
        var sn = function () {
            this.returnValue = !1
        }, on = function () {
            return this.originalEvent.preventDefault()
        }, un = function () {
            this.cancelBubble = !0
        }, an = function () {
            return this.originalEvent.stopPropagation()
        }, fn = function () {
            if (a.doc.addEventListener)return function (e, t, n, r) {
                var i = v && E[t] ? E[t] : t, s = function (i) {
                    var s = a.doc.documentElement.scrollTop || a.doc.body.scrollTop, o = a.doc.documentElement.scrollLeft || a.doc.body.scrollLeft, f = i.clientX + o, l = i.clientY + s;
                    if (v && E[u](t))for (var c = 0, h = i.targetTouches && i.targetTouches.length; c < h; c++)if (i.targetTouches[c].target == e) {
                        var p = i;
                        i = i.targetTouches[c], i.originalEvent = p, i.preventDefault = on, i.stopPropagation = an;
                        break
                    }
                    return n.call(r, i, f, l)
                };
                return e.addEventListener(i, s, !1), function () {
                    return e.removeEventListener(i, s, !1), !0
                }
            };
            if (a.doc.attachEvent)return function (e, t, n, r) {
                var i = function (e) {
                    e = e || a.win.event;
                    var t = a.doc.documentElement.scrollTop || a.doc.body.scrollTop, i = a.doc.documentElement.scrollLeft || a.doc.body.scrollLeft, s = e.clientX + i, o = e.clientY + t;
                    return e.preventDefault = e.preventDefault || sn, e.stopPropagation = e.stopPropagation || un, n.call(r, e, s, o)
                };
                e.attachEvent("on" + t, i);
                var s = function () {
                    return e.detachEvent("on" + t, i), !0
                };
                return s
            }
        }(), ln = [], cn = function (e) {
            var t = e.clientX, r = e.clientY, i = a.doc.documentElement.scrollTop || a.doc.body.scrollTop, s = a.doc.documentElement.scrollLeft || a.doc.body.scrollLeft, o, u = ln.length;
            while (u--) {
                o = ln[u];
                if (v) {
                    var f = e.touches.length, l;
                    while (f--) {
                        l = e.touches[f];
                        if (l.identifier == o.el._drag.id) {
                            t = l.clientX, r = l.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
                            break
                        }
                    }
                } else e.preventDefault();
                var c = o.el.node, h, p = c.nextSibling, d = c.parentNode, m = c.style.display;
                a.win.opera && d.removeChild(c), c.style.display = "none", h = o.el.paper.getElementByPoint(t, r), c.style.display = m, a.win.opera && (p ? d.insertBefore(c, p) : d.appendChild(c)), h && n("raphael.drag.over." + o.el.id, o.el, h), t += s, r += i, n("raphael.drag.move." + o.el.id, o.move_scope || o.el, t - o.el._drag.x, r - o.el._drag.y, t, r, e)
            }
        }, hn = function (t) {
            e.unmousemove(cn).unmouseup(hn);
            var r = ln.length, i;
            while (r--)i = ln[r], i.el._drag = {}, n("raphael.drag.end." + i.el.id, i.end_scope || i.start_scope || i.move_scope || i.el, t);
            ln = []
        }, pn = e.el = {};
        for (var dn = w.length; dn--;)(function (t) {
            e[t] = pn[t] = function (n, r) {
                return e.is(n, "function") && (this.events = this.events || [], this.events.push({name:t, f:n, unbind:fn(this.shape || this.node || a.doc, t, n, r || this)})), this
            }, e["un" + t] = pn["un" + t] = function (e) {
                var n = this.events || [], r = n.length;
                while (r--)if (n[r].name == t && n[r].f == e)return n[r].unbind(), n.splice(r, 1), !n.length && delete this.events, this;
                return this
            }
        })(w[dn]);
        pn.data = function (t, r) {
            var i = nt[this.id] = nt[this.id] || {};
            if (arguments.length == 1) {
                if (e.is(t, "object")) {
                    for (var s in t)t[u](s) && this.data(s, t[s]);
                    return this
                }
                return n("raphael.data.get." + this.id, this, i[t], t), i[t]
            }
            return i[t] = r, n("raphael.data.set." + this.id, this, r, t), this
        }, pn.removeData = function (e) {
            return e == null ? nt[this.id] = {} : nt[this.id] && delete nt[this.id][e], this
        }, pn.hover = function (e, t, n, r) {
            return this.mouseover(e, n).mouseout(t, r || n)
        }, pn.unhover = function (e, t) {
            return this.unmouseover(e).unmouseout(t)
        };
        var vn = [];
        pn.drag = function (t, r, i, s, o, u) {
            function f(f) {
                (f.originalEvent || f).preventDefault();
                var l = a.doc.documentElement.scrollTop || a.doc.body.scrollTop, c = a.doc.documentElement.scrollLeft || a.doc.body.scrollLeft;
                this._drag.x = f.clientX + c, this._drag.y = f.clientY + l, this._drag.id = f.identifier, !ln.length && e.mousemove(cn).mouseup(hn), ln.push({el:this, move_scope:s, start_scope:o, end_scope:u}), r && n.on("raphael.drag.start." + this.id, r), t && n.on("raphael.drag.move." + this.id, t), i && n.on("raphael.drag.end." + this.id, i), n("raphael.drag.start." + this.id, o || s || this, f.clientX + c, f.clientY + l, f)
            }

            return this._drag = {}, vn.push({el:this, start:f}), this.mousedown(f), this
        }, pn.onDragOver = function (e) {
            e ? n.on("raphael.drag.over." + this.id, e) : n.unbind("raphael.drag.over." + this.id)
        }, pn.undrag = function () {
            var t = vn.length;
            while (t--)vn[t].el == this && (this.unmousedown(vn[t].start), vn.splice(t, 1), n.unbind("raphael.drag.*." + this.id));
            !vn.length && e.unmousemove(cn).unmouseup(hn)
        }, c.circle = function (t, n, r) {
            var i = e._engine.circle(this, t || 0, n || 0, r || 0);
            return this.__set__ && this.__set__.push(i), i
        }, c.rect = function (t, n, r, i, s) {
            var o = e._engine.rect(this, t || 0, n || 0, r || 0, i || 0, s || 0);
            return this.__set__ && this.__set__.push(o), o
        }, c.ellipse = function (t, n, r, i) {
            var s = e._engine.ellipse(this, t || 0, n || 0, r || 0, i || 0);
            return this.__set__ && this.__set__.push(s), s
        }, c.path = function (t) {
            t && !e.is(t, O) && !e.is(t[0], M) && (t += m);
            var n = e._engine.path(e.format[p](e, arguments), this);
            return this.__set__ && this.__set__.push(n), n
        }, c.image = function (t, n, r, i, s) {
            var o = e._engine.image(this, t || "about:blank", n || 0, r || 0, i || 0, s || 0);
            return this.__set__ && this.__set__.push(o), o
        }, c.text = function (t, n, r) {
            var i = e._engine.text(this, t || 0, n || 0, y(r));
            return this.__set__ && this.__set__.push(i), i
        }, c.set = function (t) {
            !e.is(t, "array") && (t = Array.prototype.splice.call(arguments, 0, arguments.length));
            var n = new Pn(t);
            return this.__set__ && this.__set__.push(n), n
        }, c.setStart = function (e) {
            this.__set__ = e || this.set()
        }, c.setFinish = function (e) {
            var t = this.__set__;
            return delete this.__set__, t
        }, c.setSize = function (t, n) {
            return e._engine.setSize.call(this, t, n)
        }, c.setViewBox = function (t, n, r, i, s) {
            return e._engine.setViewBox.call(this, t, n, r, i, s)
        }, c.top = c.bottom = null, c.raphael = e;
        var mn = function (e) {
            var t = e.getBoundingClientRect(), n = e.ownerDocument, r = n.body, i = n.documentElement, s = i.clientTop || r.clientTop || 0, o = i.clientLeft || r.clientLeft || 0, u = t.top + (a.win.pageYOffset || i.scrollTop || r.scrollTop) - s, f = t.left + (a.win.pageXOffset || i.scrollLeft || r.scrollLeft) - o;
            return{y:u, x:f}
        };
        c.getElementByPoint = function (e, t) {
            var n = this, r = n.canvas, i = a.doc.elementFromPoint(e, t);
            if (a.win.opera && i.tagName == "svg") {
                var s = mn(r), o = r.createSVGRect();
                o.x = e - s.x, o.y = t - s.y, o.width = o.height = 1;
                var u = r.getIntersectionList(o, null);
                u.length && (i = u[u.length - 1])
            }
            if (!i)return null;
            while (i.parentNode && i != r.parentNode && !i.raphael)i = i.parentNode;
            return i == n.canvas.parentNode && (i = r), i = i && i.raphael ? n.getById(i.raphaelid) : null, i
        }, c.getById = function (e) {
            var t = this.bottom;
            while (t) {
                if (t.id == e)return t;
                t = t.next
            }
            return null
        }, c.forEach = function (e, t) {
            var n = this.bottom;
            while (n) {
                if (e.call(t, n) === !1)return this;
                n = n.next
            }
            return this
        }, c.getElementsByPoint = function (e, t) {
            var n = this.set();
            return this.forEach(function (r) {
                r.isPointInside(e, t) && n.push(r)
            }), n
        }, pn.isPointInside = function (t, n) {
            var r = this.realPath = this.realPath || ft[this.type](this);
            return e.isPointInsidePath(r, t, n)
        }, pn.getBBox = function (e) {
            if (this.removed)return{};
            var t = this._;
            if (e) {
                if (t.dirty || !t.bboxwt)this.realPath = ft[this.type](this), t.bboxwt = Ht(this.realPath), t.bboxwt.toString = yn, t.dirty = 0;
                return t.bboxwt
            }
            if (t.dirty || t.dirtyT || !t.bbox) {
                if (t.dirty || !this.realPath)t.bboxwt = 0, this.realPath = ft[this.type](this);
                t.bbox = Ht(lt(this.realPath, this.matrix)), t.bbox.toString = yn, t.dirty = t.dirtyT = 0
            }
            return t.bbox
        }, pn.clone = function () {
            if (this.removed)return null;
            var e = this.paper[this.type]().attr(this.attr());
            return this.__set__ && this.__set__.push(e), e
        }, pn.glow = function (e) {
            if (this.type == "text")return null;
            e = e || {};
            var t = {width:(e.width || 10) + (+this.attr("stroke-width") || 1), fill:e.fill || !1, opacity:e.opacity || .5, offsetx:e.offsetx || 0, offsety:e.offsety || 0, color:e.color || "#000"}, n = t.width / 2, r = this.paper, i = r.set(), s = this.realPath || ft[this.type](this);
            s = this.matrix ? lt(s, this.matrix) : s;
            for (var o = 1; o < n + 1; o++)i.push(r.path(s).attr({stroke:t.color, fill:t.fill ? t.color : "none", "stroke-linejoin":"round", "stroke-linecap":"round", "stroke-width":+(t.width / n * o).toFixed(3), opacity:+(t.opacity / n).toFixed(3)}));
            return i.insertBefore(this).translate(t.offsetx, t.offsety)
        };
        var bn = {}, wn = function (t, n, r, i, s, o, u, a, f) {
            return f == null ? Lt(t, n, r, i, s, o, u, a) : e.findDotsAtSegment(t, n, r, i, s, o, u, a, At(t, n, r, i, s, o, u, a, f))
        }, En = function (t, n) {
            return function (r, i, s) {
                r = Wt(r);
                var o, u, a, f, l = "", c = {}, h, p = 0;
                for (var d = 0, v = r.length; d < v; d++) {
                    a = r[d];
                    if (a[0] == "M")o = +a[1], u = +a[2]; else {
                        f = wn(o, u, a[1], a[2], a[3], a[4], a[5], a[6]);
                        if (p + f > i) {
                            if (n && !c.start) {
                                h = wn(o, u, a[1], a[2], a[3], a[4], a[5], a[6], i - p), l += ["C" + h.start.x, h.start.y, h.m.x, h.m.y, h.x, h.y];
                                if (s)return l;
                                c.start = l, l = ["M" + h.x, h.y + "C" + h.n.x, h.n.y, h.end.x, h.end.y, a[5], a[6]].join(), p += f, o = +a[5], u = +a[6];
                                continue
                            }
                            if (!t && !n)return h = wn(o, u, a[1], a[2], a[3], a[4], a[5], a[6], i - p), {x:h.x, y:h.y, alpha:h.alpha}
                        }
                        p += f, o = +a[5], u = +a[6]
                    }
                    l += a.shift() + a
                }
                return c.end = l, h = t ? p : n ? c : e.findDotsAtSegment(o, u, a[0], a[1], a[2], a[3], a[4], a[5], 1), h.alpha && (h = {x:h.x, y:h.y, alpha:h.alpha}), h
            }
        }, Sn = En(1), xn = En(), Tn = En(0, 1);
        e.getTotalLength = Sn, e.getPointAtLength = xn, e.getSubpath = function (e, t, n) {
            if (this.getTotalLength(e) - n < 1e-6)return Tn(e, t).end;
            var r = Tn(e, n, 1);
            return t ? Tn(r, t).end : r
        }, pn.getTotalLength = function () {
            if (this.type != "path")return;
            return this.node.getTotalLength ? this.node.getTotalLength() : Sn(this.attrs.path)
        }, pn.getPointAtLength = function (e) {
            if (this.type != "path")return;
            return xn(this.attrs.path, e)
        }, pn.getSubpath = function (t, n) {
            if (this.type != "path")return;
            return e.getSubpath(this.attrs.path, t, n)
        };
        var Nn = e.easing_formulas = {linear:function (e) {
            return e
        }, "<":function (e) {
            return k(e, 1.7)
        }, ">":function (e) {
            return k(e, .48)
        }, "<>":function (e) {
            var t = .48 - e / 1.04, n = x.sqrt(.1734 + t * t), r = n - t, i = k(C(r), 1 / 3) * (r < 0 ? -1 : 1), s = -n - t, o = k(C(s), 1 / 3) * (s < 0 ? -1 : 1), u = i + o + .5;
            return(1 - u) * 3 * u * u + u * u * u
        }, backIn:function (e) {
            var t = 1.70158;
            return e * e * ((t + 1) * e - t)
        }, backOut:function (e) {
            e -= 1;
            var t = 1.70158;
            return e * e * ((t + 1) * e + t) + 1
        }, elastic:function (e) {
            return e == !!e ? e : k(2, -10 * e) * x.sin((e - .075) * 2 * L / .3) + 1
        }, bounce:function (e) {
            var t = 7.5625, n = 2.75, r;
            return e < 1 / n ? r = t * e * e : e < 2 / n ? (e -= 1.5 / n, r = t * e * e + .75) : e < 2.5 / n ? (e -= 2.25 / n, r = t * e * e + .9375) : (e -= 2.625 / n, r = t * e * e + .984375), r
        }};
        Nn.easeIn = Nn["ease-in"] = Nn["<"], Nn.easeOut = Nn["ease-out"] = Nn[">"], Nn.easeInOut = Nn["ease-in-out"] = Nn["<>"], Nn["back-in"] = Nn.backIn, Nn["back-out"] = Nn.backOut;
        var Cn = [], kn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
            setTimeout(e, 16)
        }, Ln = function () {
            var t = +(new Date), r = 0;
            for (; r < Cn.length; r++) {
                var i = Cn[r];
                if (i.el.removed || i.paused)continue;
                var s = t - i.start, o = i.ms, a = i.easing, f = i.from, l = i.diff, c = i.to, h = i.t, p = i.el, v = {}, m, y = {}, b;
                i.initstatus ? (s = (i.initstatus * i.anim.top - i.prev) / (i.percent - i.prev) * o, i.status = i.initstatus, delete i.initstatus, i.stop && Cn.splice(r--, 1)) : i.status = (i.prev + (i.percent - i.prev) * (s / o)) / i.anim.top;
                if (s < 0)continue;
                if (s < o) {
                    var w = a(s / o);
                    for (var E in f)if (f[u](E)) {
                        switch ($[E]) {
                            case A:
                                m = +f[E] + w * o * l[E];
                                break;
                            case"colour":
                                m = "rgb(" + [An(R(f[E].r + w * o * l[E].r)), An(R(f[E].g + w * o * l[E].g)), An(R(f[E].b + w * o * l[E].b))].join(",") + ")";
                                break;
                            case"path":
                                m = [];
                                for (var S = 0, x = f[E].length; S < x; S++) {
                                    m[S] = [f[E][S][0]];
                                    for (var T = 1, N = f[E][S].length; T < N; T++)m[S][T] = +f[E][S][T] + w * o * l[E][S][T];
                                    m[S] = m[S].join(g)
                                }
                                m = m.join(g);
                                break;
                            case"transform":
                                if (l[E].real) {
                                    m = [];
                                    for (S = 0, x = f[E].length; S < x; S++) {
                                        m[S] = [f[E][S][0]];
                                        for (T = 1, N = f[E][S].length; T < N; T++)m[S][T] = f[E][S][T] + w * o * l[E][S][T]
                                    }
                                } else {
                                    var C = function (e) {
                                        return+f[E][e] + w * o * l[E][e]
                                    };
                                    m = [
                                        ["m", C(0), C(1), C(2), C(3), C(4), C(5)]
                                    ]
                                }
                                break;
                            case"csv":
                                if (E == "clip-rect") {
                                    m = [], S = 4;
                                    while (S--)m[S] = +f[E][S] + w * o * l[E][S]
                                }
                                break;
                            default:
                                var k = [][d](f[E]);
                                m = [], S = p.paper.customAttributes[E].length;
                                while (S--)m[S] = +k[S] + w * o * l[E][S]
                        }
                        v[E] = m
                    }
                    p.attr(v), function (e, t, r) {
                        setTimeout(function () {
                            n("raphael.anim.frame." + e, t, r)
                        })
                    }(p.id, p, i.anim)
                } else {
                    (function (t, r, i) {
                        setTimeout(function () {
                            n("raphael.anim.frame." + r.id, r, i), n("raphael.anim.finish." + r.id, r, i), e.is(t, "function") && t.call(r)
                        })
                    })(i.callback, p, i.anim), p.attr(c), Cn.splice(r--, 1);
                    if (i.repeat > 1 && !i.next) {
                        for (b in c)c[u](b) && (y[b] = i.totalOrigin[b]);
                        i.el.attr(y), _n(i.anim, i.el, i.anim.percents[0], null, i.totalOrigin, i.repeat - 1)
                    }
                    i.next && !i.stop && _n(i.anim, i.el, i.next, null, i.totalOrigin, i.repeat)
                }
            }
            e.svg && p && p.paper && p.paper.safari(), Cn.length && kn(Ln)
        }, An = function (e) {
            return e > 255 ? 255 : e < 0 ? 0 : e
        };
        pn.animateWith = function (t, n, r, i, s, o) {
            var u = this;
            if (u.removed)return o && o.call(u), u;
            var a = r instanceof Mn ? r : e.animation(r, i, s, o), f, l;
            _n(a, u, a.percents[0], null, u.attr());
            for (var c = 0, h = Cn.length; c < h; c++)if (Cn[c].anim == n && Cn[c].el == t) {
                Cn[h - 1].start = Cn[c].start;
                break
            }
            return u
        }, pn.onAnimation = function (e) {
            return e ? n.on("raphael.anim.frame." + this.id, e) : n.unbind("raphael.anim.frame." + this.id), this
        }, Mn.prototype.delay = function (e) {
            var t = new Mn(this.anim, this.ms);
            return t.times = this.times, t.del = +e || 0, t
        }, Mn.prototype.repeat = function (e) {
            var t = new Mn(this.anim, this.ms);
            return t.del = this.del, t.times = x.floor(T(e, 0)) || 1, t
        }, e.animation = function (t, n, r, i) {
            if (t instanceof Mn)return t;
            if (e.is(r, "function") || !r)i = i || r || null, r = null;
            t = Object(t), n = +n || 0;
            var s = {}, o, a;
            for (a in t)t[u](a) && z(a) != a && z(a) + "%" != a && (o = !0, s[a] = t[a]);
            return o ? (r && (s.easing = r), i && (s.callback = i), new Mn({100:s}, n)) : new Mn(t, n)
        }, pn.animate = function (t, n, r, i) {
            var s = this;
            if (s.removed)return i && i.call(s), s;
            var o = t instanceof Mn ? t : e.animation(t, n, r, i);
            return _n(o, s, o.percents[0], null, s.attr()), s
        }, pn.setTime = function (e, t) {
            return e && t != null && this.status(e, N(t, e.ms) / e.ms), this
        }, pn.status = function (e, t) {
            var n = [], r = 0, i, s;
            if (t != null)return _n(e, this, -1, N(t, 1)), this;
            i = Cn.length;
            for (; r < i; r++) {
                s = Cn[r];
                if (s.el.id == this.id && (!e || s.anim == e)) {
                    if (e)return s.status;
                    n.push({anim:s.anim, status:s.status})
                }
            }
            return e ? 0 : n
        }, pn.pause = function (e) {
            for (var t = 0; t < Cn.length; t++)Cn[t].el.id == this.id && (!e || Cn[t].anim == e) && n("raphael.anim.pause." + this.id, this, Cn[t].anim) !== !1 && (Cn[t].paused = !0);
            return this
        }, pn.resume = function (e) {
            for (var t = 0; t < Cn.length; t++)if (Cn[t].el.id == this.id && (!e || Cn[t].anim == e)) {
                var r = Cn[t];
                n("raphael.anim.resume." + this.id, this, r.anim) !== !1 && (delete r.paused, this.status(r.anim, r.status))
            }
            return this
        }, pn.stop = function (e) {
            for (var t = 0; t < Cn.length; t++)Cn[t].el.id == this.id && (!e || Cn[t].anim == e) && n("raphael.anim.stop." + this.id, this, Cn[t].anim) !== !1 && Cn.splice(t--, 1);
            return this
        }, n.on("raphael.remove", Dn), n.on("raphael.clear", Dn), pn.toString = function () {
            return"Raphaël’s object"
        };
        var Pn = function (e) {
            this.items = [], this.length = 0, this.type = "set";
            if (e)for (var t = 0, n = e.length; t < n; t++)e[t] && (e[t].constructor == pn.constructor || e[t].constructor == Pn) && (this[this.items.length] = this.items[this.items.length] = e[t], this.length++)
        }, Hn = Pn.prototype;
        Hn.push = function () {
            var e, t;
            for (var n = 0, r = arguments.length; n < r; n++)e = arguments[n], e && (e.constructor == pn.constructor || e.constructor == Pn) && (t = this.items.length, this[t] = this.items[t] = e, this.length++);
            return this
        }, Hn.pop = function () {
            return this.length && delete this[this.length--], this.items.pop()
        }, Hn.forEach = function (e, t) {
            for (var n = 0, r = this.items.length; n < r; n++)if (e.call(t, this.items[n], n) === !1)return this;
            return this
        };
        for (var Bn in pn)pn[u](Bn) && (Hn[Bn] = function (e) {
            return function () {
                var t = arguments;
                return this.forEach(function (n) {
                    n[e][p](n, t)
                })
            }
        }(Bn));
        Hn.attr = function (t, n) {
            if (t && e.is(t, M) && e.is(t[0], "object"))for (var r = 0, i = t.length; r < i; r++)this.items[r].attr(t[r]); else for (var s = 0, o = this.items.length; s < o; s++)this.items[s].attr(t, n);
            return this
        }, Hn.clear = function () {
            while (this.length)this.pop()
        }, Hn.splice = function (e, t, n) {
            e = e < 0 ? T(this.length + e, 0) : e, t = T(0, N(this.length - e, t));
            var r = [], i = [], s = [], o;
            for (o = 2; o < arguments.length; o++)s.push(arguments[o]);
            for (o = 0; o < t; o++)i.push(this[e + o]);
            for (; o < this.length - e; o++)r.push(this[e + o]);
            var u = s.length;
            for (o = 0; o < u + r.length; o++)this.items[e + o] = this[e + o] = o < u ? s[o] : r[o - u];
            o = this.items.length = this.length -= t - u;
            while (this[o])delete this[o++];
            return new Pn(i)
        }, Hn.exclude = function (e) {
            for (var t = 0, n = this.length; t < n; t++)if (this[t] == e)return this.splice(t, 1), !0
        }, Hn.animate = function (t, n, r, i) {
            (e.is(r, "function") || !r) && (i = r || null);
            var s = this.items.length, o = s, u, a = this, f;
            if (!s)return this;
            i && (f = function () {
                !--s && i.call(a)
            }), r = e.is(r, O) ? r : f;
            var l = e.animation(t, n, r, f);
            u = this.items[--o].animate(l);
            while (o--)this.items[o] && !this.items[o].removed && this.items[o].animateWith(u, l, l);
            return this
        }, Hn.insertAfter = function (e) {
            var t = this.items.length;
            while (t--)this.items[t].insertAfter(e);
            return this
        }, Hn.getBBox = function () {
            var e = [], t = [], n = [], r = [];
            for (var i = this.items.length; i--;)if (!this.items[i].removed) {
                var s = this.items[i].getBBox();
                e.push(s.x), t.push(s.y), n.push(s.x + s.width), r.push(s.y + s.height)
            }
            return e = N[p](0, e), t = N[p](0, t), n = T[p](0, n), r = T[p](0, r), {x:e, y:t, x2:n, y2:r, width:n - e, height:r - t}
        }, Hn.clone = function (e) {
            e = new Pn;
            for (var t = 0, n = this.items.length; t < n; t++)e.push(this.items[t].clone());
            return e
        }, Hn.toString = function () {
            return"Raphaël‘s set"
        }, e.registerFont = function (e) {
            if (!e.face)return e;
            this.fonts = this.fonts || {};
            var t = {w:e.w, face:{}, glyphs:{}}, n = e.face["font-family"];
            for (var r in e.face)e.face[u](r) && (t.face[r] = e.face[r]);
            this.fonts[n] ? this.fonts[n].push(t) : this.fonts[n] = [t];
            if (!e.svg) {
                t.face["units-per-em"] = W(e.face["units-per-em"], 10);
                for (var i in e.glyphs)if (e.glyphs[u](i)) {
                    var s = e.glyphs[i];
                    t.glyphs[i] = {w:s.w, k:{}, d:s.d && "M" + s.d.replace(/[mlcxtrv]/g, function (e) {
                        return{l:"L", c:"C", x:"z", t:"m", r:"l", v:"c"}[e] || "M"
                    }) + "z"};
                    if (s.k)for (var o in s.k)s[u](o) && (t.glyphs[i].k[o] = s.k[o])
                }
            }
            return e
        }, c.getFont = function (t, n, r, i) {
            i = i || "normal", r = r || "normal", n = +n || {normal:400, bold:700, lighter:300, bolder:800}[n] || 400;
            if (!e.fonts)return;
            var s = e.fonts[t];
            if (!s) {
                var o = new RegExp("(^|\\s)" + t.replace(/[^\w\d\s+!~.:_-]/g, m) + "(\\s|$)", "i");
                for (var a in e.fonts)if (e.fonts[u](a) && o.test(a)) {
                    s = e.fonts[a];
                    break
                }
            }
            var f;
            if (s)for (var l = 0, c = s.length; l < c; l++) {
                f = s[l];
                if (f.face["font-weight"] == n && (f.face["font-style"] == r || !f.face["font-style"]) && f.face["font-stretch"] == i)break
            }
            return f
        }, c.print = function (t, n, i, s, o, u, a) {
            u = u || "middle", a = T(N(a || 0, 1), -1);
            var f = y(i)[b](m), l = 0, c = 0, h = m, p;
            e.is(s, i) && (s = this.getFont(s));
            if (s) {
                p = (o || 16) / s.face["units-per-em"];
                var d = s.face.bbox[b](r), v = +d[0], g = d[3] - d[1], w = 0, E = +d[1] + (u == "baseline" ? g + +s.face.descent : g / 2);
                for (var S = 0, x = f.length; S < x; S++) {
                    if (f[S] == "\n")l = 0, k = 0, c = 0, w += g; else {
                        var C = c && s.glyphs[f[S - 1]] || {}, k = s.glyphs[f[S]];
                        l += c ? (C.w || s.w) + (C.k && C.k[f[S]] || 0) + s.w * a : 0, c = 1
                    }
                    k && k.d && (h += e.transformPath(k.d, ["t", l * p, w * p, "s", p, p, v, E, "t", (t - v) / p, (n - E) / p]))
                }
            }
            return this.path(h).attr({fill:"#000", stroke:"none"})
        }, c.add = function (t) {
            if (e.is(t, "array")) {
                var n = this.set(), r = 0, s = t.length, o;
                for (; r < s; r++)o = t[r] || {}, i[u](o.type) && n.push(this[o.type]().attr(o))
            }
            return n
        }, e.format = function (t, n) {
            var r = e.is(n, M) ? [0][d](n) : arguments;
            return t && e.is(t, O) && r.length - 1 && (t = t.replace(s, function (e, t) {
                return r[++t] == null ? m : r[t]
            })), t || m
        }, e.fullfill = function () {
            var e = /\{([^\}]+)\}/g, t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, n = function (e, n, r) {
                var i = r;
                return n.replace(t, function (e, t, n, r, s) {
                    t = t || r, i && (t in i && (i = i[t]), typeof i == "function" && s && (i = i()))
                }), i = (i == null || i == r ? e : i) + "", i
            };
            return function (t, r) {
                return String(t).replace(e, function (e, t) {
                    return n(e, t, r)
                })
            }
        }(), e.ninja = function () {
            return f.was ? a.win.Raphael = f.is : delete Raphael, e
        }, e.st = Hn, function (t, n, r) {
            function i() {
                /in/.test(t.readyState) ? setTimeout(i, 9) : e.eve("raphael.DOMload")
            }

            t.readyState == null && t.addEventListener && (t.addEventListener(n, r = function () {
                t.removeEventListener(n, r, !1), t.readyState = "complete"
            }, !1), t.readyState = "loading"), i()
        }(document, "DOMContentLoaded"), f.was ? a.win.Raphael = e : Raphael = e, n.on("raphael.DOMload", function () {
            t = !0
        })
    }(), window.Raphael.svg && function (e) {
        var t = "hasOwnProperty", n = String, r = parseFloat, i = parseInt, s = Math, o = s.max, u = s.abs, a = s.pow, f = /[, ]+/, l = e.eve, c = "", h = " ", p = "http://www.w3.org/1999/xlink", d = {block:"M5,0 0,2.5 5,5z", classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z", diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z", open:"M6,1 1,3.5 6,6", oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"}, v = {};
        e.toString = function () {
            return"Your browser supports SVG.\nYou are running Raphaël " + this.version
        };
        var m = function (r, i) {
            if (i) {
                typeof r == "string" && (r = m(r));
                for (var s in i)i[t](s) && (s.substring(0, 6) == "xlink:" ? r.setAttributeNS(p, s.substring(6), n(i[s])) : r.setAttribute(s, n(i[s])))
            } else r = e._g.doc.createElementNS("http://www.w3.org/2000/svg", r), r.style && (r.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
            return r
        }, g = function (t, i) {
            var f = "linear", l = t.id + i, h = .5, p = .5, d = t.node, v = t.paper, g = d.style, y = e._g.doc.getElementById(l);
            if (!y) {
                i = n(i).replace(e._radial_gradient, function (e, t, n) {
                    f = "radial";
                    if (t && n) {
                        h = r(t), p = r(n);
                        var i = (p > .5) * 2 - 1;
                        a(h - .5, 2) + a(p - .5, 2) > .25 && (p = s.sqrt(.25 - a(h - .5, 2)) * i + .5) && p != .5 && (p = p.toFixed(5) - 1e-5 * i)
                    }
                    return c
                }), i = i.split(/\s*\-\s*/);
                if (f == "linear") {
                    var b = i.shift();
                    b = -r(b);
                    if (isNaN(b))return null;
                    var w = [0, 0, s.cos(e.rad(b)), s.sin(e.rad(b))], E = 1 / (o(u(w[2]), u(w[3])) || 1);
                    w[2] *= E, w[3] *= E, w[2] < 0 && (w[0] = -w[2], w[2] = 0), w[3] < 0 && (w[1] = -w[3], w[3] = 0)
                }
                var S = e._parseDots(i);
                if (!S)return null;
                l = l.replace(/[\(\)\s,\xb0#]/g, "_"), t.gradient && l != t.gradient.id && (v.defs.removeChild(t.gradient), delete t.gradient);
                if (!t.gradient) {
                    y = m(f + "Gradient", {id:l}), t.gradient = y, m(y, f == "radial" ? {fx:h, fy:p} : {x1:w[0], y1:w[1], x2:w[2], y2:w[3], gradientTransform:t.matrix.invert()}), v.defs.appendChild(y);
                    for (var x = 0, T = S.length; x < T; x++)y.appendChild(m("stop", {offset:S[x].offset ? S[x].offset : x ? "100%" : "0%", "stop-color":S[x].color || "#fff"}))
                }
            }
            return m(d, {fill:"url(#" + l + ")", opacity:1, "fill-opacity":1}), g.fill = c, g.opacity = 1, g.fillOpacity = 1, 1
        }, y = function (e) {
            var t = e.getBBox(1);
            m(e.pattern, {patternTransform:e.matrix.invert() + " translate(" + t.x + "," + t.y + ")"})
        }, b = function (r, i, s) {
            if (r.type == "path") {
                var o = n(i).toLowerCase().split("-"), u = r.paper, a = s ? "end" : "start", f = r.node, l = r.attrs, h = l["stroke-width"], p = o.length, g = "classic", y, b, w, E, S, x = 3, T = 3, N = 5;
                while (p--)switch (o[p]) {
                    case"block":
                    case"classic":
                    case"oval":
                    case"diamond":
                    case"open":
                    case"none":
                        g = o[p];
                        break;
                    case"wide":
                        T = 5;
                        break;
                    case"narrow":
                        T = 2;
                        break;
                    case"long":
                        x = 5;
                        break;
                    case"short":
                        x = 2
                }
                g == "open" ? (x += 2, T += 2, N += 2, w = 1, E = s ? 4 : 1, S = {fill:"none", stroke:l.stroke}) : (E = w = x / 2, S = {fill:l.stroke, stroke:"none"}), r._.arrows ? s ? (r._.arrows.endPath && v[r._.arrows.endPath]--, r._.arrows.endMarker && v[r._.arrows.endMarker]--) : (r._.arrows.startPath && v[r._.arrows.startPath]--, r._.arrows.startMarker && v[r._.arrows.startMarker]--) : r._.arrows = {};
                if (g != "none") {
                    var C = "raphael-marker-" + g, k = "raphael-marker-" + a + g + x + T;
                    e._g.doc.getElementById(C) ? v[C]++ : (u.defs.appendChild(m(m("path"), {"stroke-linecap":"round", d:d[g], id:C})), v[C] = 1);
                    var L = e._g.doc.getElementById(k), A;
                    L ? (v[k]++, A = L.getElementsByTagName("use")[0]) : (L = m(m("marker"), {id:k, markerHeight:T, markerWidth:x, orient:"auto", refX:E, refY:T / 2}), A = m(m("use"), {"xlink:href":"#" + C, transform:(s ? "rotate(180 " + x / 2 + " " + T / 2 + ") " : c) + "scale(" + x / N + "," + T / N + ")", "stroke-width":(1 / ((x / N + T / N) / 2)).toFixed(4)}), L.appendChild(A), u.defs.appendChild(L), v[k] = 1), m(A, S);
                    var O = w * (g != "diamond" && g != "oval");
                    s ? (y = r._.arrows.startdx * h || 0, b = e.getTotalLength(l.path) - O * h) : (y = O * h, b = e.getTotalLength(l.path) - (r._.arrows.enddx * h || 0)), S = {}, S["marker-" + a] = "url(#" + k + ")";
                    if (b || y)S.d = Raphael.getSubpath(l.path, y, b);
                    m(f, S), r._.arrows[a + "Path"] = C, r._.arrows[a + "Marker"] = k, r._.arrows[a + "dx"] = O, r._.arrows[a + "Type"] = g, r._.arrows[a + "String"] = i
                } else s ? (y = r._.arrows.startdx * h || 0, b = e.getTotalLength(l.path) - y) : (y = 0, b = e.getTotalLength(l.path) - (r._.arrows.enddx * h || 0)), r._.arrows[a + "Path"] && m(f, {d:Raphael.getSubpath(l.path, y, b)}), delete r._.arrows[a + "Path"], delete r._.arrows[a + "Marker"], delete r._.arrows[a + "dx"], delete r._.arrows[a + "Type"], delete r._.arrows[a + "String"];
                for (S in v)if (v[t](S) && !v[S]) {
                    var M = e._g.doc.getElementById(S);
                    M && M.parentNode.removeChild(M)
                }
            }
        }, w = {"":[0], none:[0], "-":[3, 1], ".":[1, 1], "-.":[3, 1, 1, 1], "-..":[3, 1, 1, 1, 1, 1], ". ":[1, 3], "- ":[4, 3], "--":[8, 3], "- .":[4, 3, 1, 3], "--.":[8, 3, 1, 3], "--..":[8, 3, 1, 3, 1, 3]}, E = function (e, t, r) {
            t = w[n(t).toLowerCase()];
            if (t) {
                var i = e.attrs["stroke-width"] || "1", s = {round:i, square:i, butt:0}[e.attrs["stroke-linecap"] || r["stroke-linecap"]] || 0, o = [], u = t.length;
                while (u--)o[u] = t[u] * i + (u % 2 ? 1 : -1) * s;
                m(e.node, {"stroke-dasharray":o.join(",")})
            }
        }, S = function (r, s) {
            var a = r.node, l = r.attrs, h = a.style.visibility;
            a.style.visibility = "hidden";
            for (var d in s)if (s[t](d)) {
                if (!e._availableAttrs[t](d))continue;
                var v = s[d];
                l[d] = v;
                switch (d) {
                    case"blur":
                        r.blur(v);
                        break;
                    case"href":
                    case"title":
                    case"target":
                        var w = a.parentNode;
                        if (w.tagName.toLowerCase() != "a") {
                            var S = m("a");
                            w.insertBefore(S, a), S.appendChild(a), w = S
                        }
                        d == "target" ? w.setAttributeNS(p, "show", v == "blank" ? "new" : v) : w.setAttributeNS(p, d, v);
                        break;
                    case"cursor":
                        a.style.cursor = v;
                        break;
                    case"transform":
                        r.transform(v);
                        break;
                    case"arrow-start":
                        b(r, v);
                        break;
                    case"arrow-end":
                        b(r, v, 1);
                        break;
                    case"clip-rect":
                        var x = n(v).split(f);
                        if (x.length == 4) {
                            r.clip && r.clip.parentNode.parentNode.removeChild(r.clip.parentNode);
                            var N = m("clipPath"), C = m("rect");
                            N.id = e.createUUID(), m(C, {x:x[0], y:x[1], width:x[2], height:x[3]}), N.appendChild(C), r.paper.defs.appendChild(N), m(a, {"clip-path":"url(#" + N.id + ")"}), r.clip = C
                        }
                        if (!v) {
                            var k = a.getAttribute("clip-path");
                            if (k) {
                                var L = e._g.doc.getElementById(k.replace(/(^url\(#|\)$)/g, c));
                                L && L.parentNode.removeChild(L), m(a, {"clip-path":c}), delete r.clip
                            }
                        }
                        break;
                    case"path":
                        r.type == "path" && (m(a, {d:v ? l.path = e._pathToAbsolute(v) : "M0,0"}), r._.dirty = 1, r._.arrows && ("startString"in r._.arrows && b(r, r._.arrows.startString), "endString"in r._.arrows && b(r, r._.arrows.endString, 1)));
                        break;
                    case"width":
                        a.setAttribute(d, v), r._.dirty = 1;
                        if (!l.fx)break;
                        d = "x", v = l.x;
                    case"x":
                        l.fx && (v = -l.x - (l.width || 0));
                    case"rx":
                        if (d == "rx" && r.type == "rect")break;
                    case"cx":
                        a.setAttribute(d, v), r.pattern && y(r), r._.dirty = 1;
                        break;
                    case"height":
                        a.setAttribute(d, v), r._.dirty = 1;
                        if (!l.fy)break;
                        d = "y", v = l.y;
                    case"y":
                        l.fy && (v = -l.y - (l.height || 0));
                    case"ry":
                        if (d == "ry" && r.type == "rect")break;
                    case"cy":
                        a.setAttribute(d, v), r.pattern && y(r), r._.dirty = 1;
                        break;
                    case"r":
                        r.type == "rect" ? m(a, {rx:v, ry:v}) : a.setAttribute(d, v), r._.dirty = 1;
                        break;
                    case"src":
                        r.type == "image" && a.setAttributeNS(p, "href", v);
                        break;
                    case"stroke-width":
                        if (r._.sx != 1 || r._.sy != 1)v /= o(u(r._.sx), u(r._.sy)) || 1;
                        r.paper._vbSize && (v *= r.paper._vbSize), a.setAttribute(d, v), l["stroke-dasharray"] && E(r, l["stroke-dasharray"], s), r._.arrows && ("startString"in r._.arrows && b(r, r._.arrows.startString), "endString"in r._.arrows && b(r, r._.arrows.endString, 1));
                        break;
                    case"stroke-dasharray":
                        E(r, v, s);
                        break;
                    case"fill":
                        var A = n(v).match(e._ISURL);
                        if (A) {
                            N = m("pattern");
                            var O = m("image");
                            N.id = e.createUUID(), m(N, {x:0, y:0, patternUnits:"userSpaceOnUse", height:1, width:1}), m(O, {x:0, y:0, "xlink:href":A[1]}), N.appendChild(O), function (t) {
                                e._preload(A[1], function () {
                                    var e = this.offsetWidth, n = this.offsetHeight;
                                    m(t, {width:e, height:n}), m(O, {width:e, height:n}), r.paper.safari()
                                })
                            }(N), r.paper.defs.appendChild(N), m(a, {fill:"url(#" + N.id + ")"}), r.pattern = N, r.pattern && y(r);
                            break
                        }
                        var M = e.getRGB(v);
                        if (!M.error)delete s.gradient, delete l.gradient, !e.is(l.opacity, "undefined") && e.is(s.opacity, "undefined") && m(a, {opacity:l.opacity}), !e.is(l["fill-opacity"], "undefined") && e.is(s["fill-opacity"], "undefined") && m(a, {"fill-opacity":l["fill-opacity"]}); else if ((r.type == "circle" || r.type == "ellipse" || n(v).charAt() != "r") && g(r, v)) {
                            if ("opacity"in l || "fill-opacity"in l) {
                                var _ = e._g.doc.getElementById(a.getAttribute("fill").replace(/^url\(#|\)$/g, c));
                                if (_) {
                                    var D = _.getElementsByTagName("stop");
                                    m(D[D.length - 1], {"stop-opacity":("opacity"in l ? l.opacity : 1) * ("fill-opacity"in l ? l["fill-opacity"] : 1)})
                                }
                            }
                            l.gradient = v, l.fill = "none";
                            break
                        }
                        M[t]("opacity") && m(a, {"fill-opacity":M.opacity > 1 ? M.opacity / 100 : M.opacity});
                    case"stroke":
                        M = e.getRGB(v), a.setAttribute(d, M.hex), d == "stroke" && M[t]("opacity") && m(a, {"stroke-opacity":M.opacity > 1 ? M.opacity / 100 : M.opacity}), d == "stroke" && r._.arrows && ("startString"in r._.arrows && b(r, r._.arrows.startString), "endString"in r._.arrows && b(r, r._.arrows.endString, 1));
                        break;
                    case"gradient":
                        (r.type == "circle" || r.type == "ellipse" || n(v).charAt() != "r") && g(r, v);
                        break;
                    case"opacity":
                        l.gradient && !l[t]("stroke-opacity") && m(a, {"stroke-opacity":v > 1 ? v / 100 : v});
                    case"fill-opacity":
                        if (l.gradient) {
                            _ = e._g.doc.getElementById(a.getAttribute("fill").replace(/^url\(#|\)$/g, c)), _ && (D = _.getElementsByTagName("stop"), m(D[D.length - 1], {"stop-opacity":v}));
                            break
                        }
                        ;
                    default:
                        d == "font-size" && (v = i(v, 10) + "px");
                        var P = d.replace(/(\-.)/g, function (e) {
                            return e.substring(1).toUpperCase()
                        });
                        a.style[P] = v, r._.dirty = 1, a.setAttribute(d, v)
                }
            }
            T(r, s), a.style.visibility = h
        }, x = 1.2, T = function (r, s) {
            if (r.type != "text" || !(s[t]("text") || s[t]("font") || s[t]("font-size") || s[t]("x") || s[t]("y")))return;
            var o = r.attrs, u = r.node, a = u.firstChild ? i(e._g.doc.defaultView.getComputedStyle(u.firstChild, c).getPropertyValue("font-size"), 10) : 10;
            if (s[t]("text")) {
                o.text = s.text;
                while (u.firstChild)u.removeChild(u.firstChild);
                var f = n(s.text).split("\n"), l = [], h;
                for (var p = 0, d = f.length; p < d; p++)h = m("tspan"), p && m(h, {dy:a * x, x:o.x}), h.appendChild(e._g.doc.createTextNode(f[p])), u.appendChild(h), l[p] = h
            } else {
                l = u.getElementsByTagName("tspan");
                for (p = 0, d = l.length; p < d; p++)p ? m(l[p], {dy:a * x, x:o.x}) : m(l[0], {dy:0})
            }
            m(u, {x:o.x, y:o.y}), r._.dirty = 1;
            var v = r._getBBox(), g = o.y - (v.y + v.height / 2);
            g && e.is(g, "finite") && m(l[0], {dy:g})
        }, N = function (t, n) {
            var r = 0, i = 0;
            this[0] = this.node = t, t.raphael = !0, this.id = e._oid++, t.raphaelid = this.id, this.matrix = e.matrix(), this.realPath = null, this.paper = n, this.attrs = this.attrs || {}, this._ = {transform:[], sx:1, sy:1, deg:0, dx:0, dy:0, dirty:1}, !n.bottom && (n.bottom = this), this.prev = n.top, n.top && (n.top.next = this), n.top = this, this.next = null
        }, C = e.el;
        N.prototype = C, C.constructor = N, e._engine.path = function (e, t) {
            var n = m("path");
            t.canvas && t.canvas.appendChild(n);
            var r = new N(n, t);
            return r.type = "path", S(r, {fill:"none", stroke:"#000", path:e}), r
        }, C.rotate = function (e, t, i) {
            if (this.removed)return this;
            e = n(e).split(f), e.length - 1 && (t = r(e[1]), i = r(e[2])), e = r(e[0]), i == null && (t = i);
            if (t == null || i == null) {
                var s = this.getBBox(1);
                t = s.x + s.width / 2, i = s.y + s.height / 2
            }
            return this.transform(this._.transform.concat([
                ["r", e, t, i]
            ])), this
        }, C.scale = function (e, t, i, s) {
            if (this.removed)return this;
            e = n(e).split(f), e.length - 1 && (t = r(e[1]), i = r(e[2]), s = r(e[3])), e = r(e[0]), t == null && (t = e), s == null && (i = s);
            if (i == null || s == null)var o = this.getBBox(1);
            return i = i == null ? o.x + o.width / 2 : i, s = s == null ? o.y + o.height / 2 : s, this.transform(this._.transform.concat([
                ["s", e, t, i, s]
            ])), this
        }, C.translate = function (e, t) {
            return this.removed ? this : (e = n(e).split(f), e.length - 1 && (t = r(e[1])), e = r(e[0]) || 0, t = +t || 0, this.transform(this._.transform.concat([
                ["t", e, t]
            ])), this)
        }, C.transform = function (n) {
            var r = this._;
            if (n == null)return r.transform;
            e._extractTransform(this, n), this.clip && m(this.clip, {transform:this.matrix.invert()}), this.pattern && y(this), this.node && m(this.node, {transform:this.matrix});
            if (r.sx != 1 || r.sy != 1) {
                var i = this.attrs[t]("stroke-width") ? this.attrs["stroke-width"] : 1;
                this.attr({"stroke-width":i})
            }
            return this
        }, C.hide = function () {
            return!this.removed && this.paper.safari(this.node.style.display = "none"), this
        }, C.show = function () {
            return!this.removed && this.paper.safari(this.node.style.display = ""), this
        }, C.remove = function () {
            if (this.removed || !this.node.parentNode)return;
            var t = this.paper;
            t.__set__ && t.__set__.exclude(this), l.unbind("raphael.*.*." + this.id), this.gradient && t.defs.removeChild(this.gradient), e._tear(this, t), this.node.parentNode.tagName.toLowerCase() == "a" ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
            for (var n in this)this[n] = typeof this[n] == "function" ? e._removedFactory(n) : null;
            this.removed = !0
        }, C._getBBox = function () {
            if (this.node.style.display == "none") {
                this.show();
                var e = !0
            }
            var t = {};
            try {
                t = this.node.getBBox()
            } catch (n) {
            } finally {
                t = t || {}
            }
            return e && this.hide(), t
        }, C.attr = function (n, r) {
            if (this.removed)return this;
            if (n == null) {
                var i = {};
                for (var s in this.attrs)this.attrs[t](s) && (i[s] = this.attrs[s]);
                return i.gradient && i.fill == "none" && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform, i
            }
            if (r == null && e.is(n, "string")) {
                if (n == "fill" && this.attrs.fill == "none" && this.attrs.gradient)return this.attrs.gradient;
                if (n == "transform")return this._.transform;
                var o = n.split(f), u = {};
                for (var a = 0, c = o.length; a < c; a++)n = o[a], n in this.attrs ? u[n] = this.attrs[n] : e.is(this.paper.customAttributes[n], "function") ? u[n] = this.paper.customAttributes[n].def : u[n] = e._availableAttrs[n];
                return c - 1 ? u : u[o[0]]
            }
            if (r == null && e.is(n, "array")) {
                u = {};
                for (a = 0, c = n.length; a < c; a++)u[n[a]] = this.attr(n[a]);
                return u
            }
            if (r != null) {
                var h = {};
                h[n] = r
            } else n != null && e.is(n, "object") && (h = n);
            for (var p in h)l("raphael.attr." + p + "." + this.id, this, h[p]);
            for (p in this.paper.customAttributes)if (this.paper.customAttributes[t](p) && h[t](p) && e.is(this.paper.customAttributes[p], "function")) {
                var d = this.paper.customAttributes[p].apply(this, [].concat(h[p]));
                this.attrs[p] = h[p];
                for (var v in d)d[t](v) && (h[v] = d[v])
            }
            return S(this, h), this
        }, C.toFront = function () {
            if (this.removed)return this;
            this.node.parentNode.tagName.toLowerCase() == "a" ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
            var t = this.paper;
            return t.top != this && e._tofront(this, t), this
        }, C.toBack = function () {
            if (this.removed)return this;
            var t = this.node.parentNode;
            t.tagName.toLowerCase() == "a" ? t.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : t.firstChild != this.node && t.insertBefore(this.node, this.node.parentNode.firstChild), e._toback(this, this.paper);
            var n = this.paper;
            return this
        }, C.insertAfter = function (t) {
            if (this.removed)return this;
            var n = t.node || t[t.length - 1].node;
            return n.nextSibling ? n.parentNode.insertBefore(this.node, n.nextSibling) : n.parentNode.appendChild(this.node), e._insertafter(this, t, this.paper), this
        }, C.insertBefore = function (t) {
            if (this.removed)return this;
            var n = t.node || t[0].node;
            return n.parentNode.insertBefore(this.node, n), e._insertbefore(this, t, this.paper), this
        }, C.blur = function (t) {
            var n = this;
            if (+t !== 0) {
                var r = m("filter"), i = m("feGaussianBlur");
                n.attrs.blur = t, r.id = e.createUUID(), m(i, {stdDeviation:+t || 1.5}), r.appendChild(i), n.paper.defs.appendChild(r), n._blur = r, m(n.node, {filter:"url(#" + r.id + ")"})
            } else n._blur && (n._blur.parentNode.removeChild(n._blur), delete n._blur, delete n.attrs.blur), n.node.removeAttribute("filter")
        }, e._engine.circle = function (e, t, n, r) {
            var i = m("circle");
            e.canvas && e.canvas.appendChild(i);
            var s = new N(i, e);
            return s.attrs = {cx:t, cy:n, r:r, fill:"none", stroke:"#000"}, s.type = "circle", m(i, s.attrs), s
        }, e._engine.rect = function (e, t, n, r, i, s) {
            var o = m("rect");
            e.canvas && e.canvas.appendChild(o);
            var u = new N(o, e);
            return u.attrs = {x:t, y:n, width:r, height:i, r:s || 0, rx:s || 0, ry:s || 0, fill:"none", stroke:"#000"}, u.type = "rect", m(o, u.attrs), u
        }, e._engine.ellipse = function (e, t, n, r, i) {
            var s = m("ellipse");
            e.canvas && e.canvas.appendChild(s);
            var o = new N(s, e);
            return o.attrs = {cx:t, cy:n, rx:r, ry:i, fill:"none", stroke:"#000"}, o.type = "ellipse", m(s, o.attrs), o
        }, e._engine.image = function (e, t, n, r, i, s) {
            var o = m("image");
            m(o, {x:n, y:r, width:i, height:s, preserveAspectRatio:"none"}), o.setAttributeNS(p, "href", t), e.canvas && e.canvas.appendChild(o);
            var u = new N(o, e);
            return u.attrs = {x:n, y:r, width:i, height:s, src:t}, u.type = "image", u
        }, e._engine.text = function (t, n, r, i) {
            var s = m("text");
            t.canvas && t.canvas.appendChild(s);
            var o = new N(s, t);
            return o.attrs = {x:n, y:r, "text-anchor":"middle", text:i, font:e._availableAttrs.font, stroke:"none", fill:"#000"}, o.type = "text", S(o, o.attrs), o
        }, e._engine.setSize = function (e, t) {
            return this.width = e || this.width, this.height = t || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this
        }, e._engine.create = function () {
            var t = e._getContainer.apply(0, arguments), n = t && t.container, r = t.x, i = t.y, s = t.width, o = t.height;
            if (!n)throw new Error("SVG container not found.");
            var u = m("svg"), a = "overflow:hidden;", f;
            return r = r || 0, i = i || 0, s = s || 512, o = o || 342, m(u, {height:o, version:1.1, width:s, xmlns:"http://www.w3.org/2000/svg"}), n == 1 ? (u.style.cssText = a + "position:absolute;left:" + r + "px;top:" + i + "px", e._g.doc.body.appendChild(u), f = 1) : (u.style.cssText = a + "position:relative", n.firstChild ? n.insertBefore(u, n.firstChild) : n.appendChild(u)), n = new e._Paper, n.width = s, n.height = o, n.canvas = u, n.clear(), n._left = n._top = 0, f && (n.renderfix = function () {
            }), n.renderfix(), n
        }, e._engine.setViewBox = function (e, t, n, r, i) {
            l("raphael.setViewBox", this, this._viewBox, [e, t, n, r, i]);
            var s = o(n / this.width, r / this.height), u = this.top, a = i ? "meet" : "xMinYMin", f, c;
            e == null ? (this._vbSize && (s = 1), delete this._vbSize, f = "0 0 " + this.width + h + this.height) : (this._vbSize = s, f = e + h + t + h + n + h + r), m(this.canvas, {viewBox:f, preserveAspectRatio:a});
            while (s && u)c = "stroke-width"in u.attrs ? u.attrs["stroke-width"] : 1, u.attr({"stroke-width":c}), u._.dirty = 1, u._.dirtyT = 1, u = u.prev;
            return this._viewBox = [e, t, n, r, !!i], this
        }, e.prototype.renderfix = function () {
            var e = this.canvas, t = e.style, n;
            try {
                n = e.getScreenCTM() || e.createSVGMatrix()
            } catch (r) {
                n = e.createSVGMatrix()
            }
            var i = -n.e % 1, s = -n.f % 1;
            if (i || s)i && (this._left = (this._left + i) % 1, t.left = this._left + "px"), s && (this._top = (this._top + s) % 1, t.top = this._top + "px")
        }, e.prototype.clear = function () {
            e.eve("raphael.clear", this);
            var t = this.canvas;
            while (t.firstChild)t.removeChild(t.firstChild);
            this.bottom = this.top = null, (this.desc = m("desc")).appendChild(e._g.doc.createTextNode("Created with Raphaël " + e.version)), t.appendChild(this.desc), t.appendChild(this.defs = m("defs"))
        }, e.prototype.remove = function () {
            l("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
            for (var t in this)this[t] = typeof this[t] == "function" ? e._removedFactory(t) : null
        };
        var k = e.st;
        for (var L in C)C[t](L) && !k[t](L) && (k[L] = function (e) {
            return function () {
                var t = arguments;
                return this.forEach(function (n) {
                    n[e].apply(n, t)
                })
            }
        }(L))
    }(window.Raphael), window.Raphael.vml && function (e) {
        var t = "hasOwnProperty", n = String, r = parseFloat, i = Math, s = i.round, o = i.max, u = i.min, a = i.abs, f = "fill", l = /[, ]+/, c = e.eve, h = " progid:DXImageTransform.Microsoft", p = " ", d = "", v = {M:"m", L:"l", C:"c", Z:"x", m:"t", l:"r", c:"v", z:"x"}, m = /([clmz]),?([^clmz]*)/gi, g = / progid:\S+Blur\([^\)]+\)/g, y = /-?[^,\s-]+/g, b = "position:absolute;left:0;top:0;width:1px;height:1px", w = 21600, E = {path:1, rect:1, image:1}, S = {circle:1, ellipse:1}, x = function (t) {
            var r = /[ahqstv]/ig, i = e._pathToAbsolute;
            n(t).match(r) && (i = e._path2curve), r = /[clmz]/g;
            if (i == e._pathToAbsolute && !n(t).match(r)) {
                var o = n(t).replace(m, function (e, t, n) {
                    var r = [], i = t.toLowerCase() == "m", o = v[t];
                    return n.replace(y, function (e) {
                        i && r.length == 2 && (o += r + v[t == "m" ? "l" : "L"], r = []), r.push(s(e * w))
                    }), o + r
                });
                return o
            }
            var u = i(t), a, f;
            o = [];
            for (var l = 0, c = u.length; l < c; l++) {
                a = u[l], f = u[l][0].toLowerCase(), f == "z" && (f = "x");
                for (var h = 1, g = a.length; h < g; h++)f += s(a[h] * w) + (h != g - 1 ? "," : d);
                o.push(f)
            }
            return o.join(p)
        }, T = function (t, n, r) {
            var i = e.matrix();
            return i.rotate(-t, .5, .5), {dx:i.x(n, r), dy:i.y(n, r)}
        }, N = function (e, t, n, r, i, s) {
            var o = e._, u = e.matrix, l = o.fillpos, c = e.node, h = c.style, d = 1, v = "", m, g = w / t, y = w / n;
            h.visibility = "hidden";
            if (!t || !n)return;
            c.coordsize = a(g) + p + a(y), h.rotation = s * (t * n < 0 ? -1 : 1);
            if (s) {
                var b = T(s, r, i);
                r = b.dx, i = b.dy
            }
            t < 0 && (v += "x"), n < 0 && (v += " y") && (d = -1), h.flip = v, c.coordorigin = r * -g + p + i * -y;
            if (l || o.fillsize) {
                var E = c.getElementsByTagName(f);
                E = E && E[0], c.removeChild(E), l && (b = T(s, u.x(l[0], l[1]), u.y(l[0], l[1])), E.position = b.dx * d + p + b.dy * d), o.fillsize && (E.size = o.fillsize[0] * a(t) + p + o.fillsize[1] * a(n)), c.appendChild(E)
            }
            h.visibility = "visible"
        };
        e.toString = function () {
            return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
        };
        var C = function (e, t, r) {
            var i = n(t).toLowerCase().split("-"), s = r ? "end" : "start", o = i.length, u = "classic", a = "medium", f = "medium";
            while (o--)switch (i[o]) {
                case"block":
                case"classic":
                case"oval":
                case"diamond":
                case"open":
                case"none":
                    u = i[o];
                    break;
                case"wide":
                case"narrow":
                    f = i[o];
                    break;
                case"long":
                case"short":
                    a = i[o]
            }
            var l = e.node.getElementsByTagName("stroke")[0];
            l[s + "arrow"] = u, l[s + "arrowlength"] = a, l[s + "arrowwidth"] = f
        }, k = function (i, a) {
            i.attrs = i.attrs || {};
            var c = i.node, h = i.attrs, v = c.style, m, g = E[i.type] && (a.x != h.x || a.y != h.y || a.width != h.width || a.height != h.height || a.cx != h.cx || a.cy != h.cy || a.rx != h.rx || a.ry != h.ry || a.r != h.r), y = S[i.type] && (h.cx != a.cx || h.cy != a.cy || h.r != a.r || h.rx != a.rx || h.ry != a.ry), b = i;
            for (var T in a)a[t](T) && (h[T] = a[T]);
            g && (h.path = e._getPath[i.type](i), i._.dirty = 1), a.href && (c.href = a.href), a.title && (c.title = a.title), a.target && (c.target = a.target), a.cursor && (v.cursor = a.cursor), "blur"in a && i.blur(a.blur);
            if (a.path && i.type == "path" || g)c.path = x(~n(h.path).toLowerCase().indexOf("r") ? e._pathToAbsolute(h.path) : h.path), i.type == "image" && (i._.fillpos = [h.x, h.y], i._.fillsize = [h.width, h.height], N(i, 1, 1, 0, 0, 0));
            "transform"in a && i.transform(a.transform);
            if (y) {
                var k = +h.cx, A = +h.cy, O = +h.rx || +h.r || 0, _ = +h.ry || +h.r || 0;
                c.path = e.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", s((k - O) * w), s((A - _) * w), s((k + O) * w), s((A + _) * w), s(k * w))
            }
            if ("clip-rect"in a) {
                var D = n(a["clip-rect"]).split(l);
                if (D.length == 4) {
                    D[2] = +D[2] + +D[0], D[3] = +D[3] + +D[1];
                    var P = c.clipRect || e._g.doc.createElement("div"), H = P.style;
                    H.clip = e.format("rect({1}px {2}px {3}px {0}px)", D), c.clipRect || (H.position = "absolute", H.top = 0, H.left = 0, H.width = i.paper.width + "px", H.height = i.paper.height + "px", c.parentNode.insertBefore(P, c), P.appendChild(c), c.clipRect = P)
                }
                a["clip-rect"] || c.clipRect && (c.clipRect.style.clip = "auto")
            }
            if (i.textpath) {
                var B = i.textpath.style;
                a.font && (B.font = a.font), a["font-family"] && (B.fontFamily = '"' + a["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, d) + '"'), a["font-size"] && (B.fontSize = a["font-size"]), a["font-weight"] && (B.fontWeight = a["font-weight"]), a["font-style"] && (B.fontStyle = a["font-style"])
            }
            "arrow-start"in a && C(b, a["arrow-start"]), "arrow-end"in a && C(b, a["arrow-end"], 1);
            if (a.opacity != null || a["stroke-width"] != null || a.fill != null || a.src != null || a.stroke != null || a["stroke-width"] != null || a["stroke-opacity"] != null || a["fill-opacity"] != null || a["stroke-dasharray"] != null || a["stroke-miterlimit"] != null || a["stroke-linejoin"] != null || a["stroke-linecap"] != null) {
                var j = c.getElementsByTagName(f), F = !1;
                j = j && j[0], !j && (F = j = M(f)), i.type == "image" && a.src && (j.src = a.src), a.fill && (j.on = !0);
                if (j.on == null || a.fill == "none" || a.fill === null)j.on = !1;
                if (j.on && a.fill) {
                    var I = n(a.fill).match(e._ISURL);
                    if (I) {
                        j.parentNode == c && c.removeChild(j), j.rotate = !0, j.src = I[1], j.type = "tile";
                        var q = i.getBBox(1);
                        j.position = q.x + p + q.y, i._.fillpos = [q.x, q.y], e._preload(I[1], function () {
                            i._.fillsize = [this.offsetWidth, this.offsetHeight]
                        })
                    } else j.color = e.getRGB(a.fill).hex, j.src = d, j.type = "solid", e.getRGB(a.fill).error && (b.type in{circle:1, ellipse:1} || n(a.fill).charAt() != "r") && L(b, a.fill, j) && (h.fill = "none", h.gradient = a.fill, j.rotate = !1)
                }
                if ("fill-opacity"in a || "opacity"in a) {
                    var U = ((+h["fill-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+e.getRGB(a.fill).o + 1 || 2) - 1);
                    U = u(o(U, 0), 1), j.opacity = U, j.src && (j.color = "none")
                }
                c.appendChild(j);
                var z = c.getElementsByTagName("stroke") && c.getElementsByTagName("stroke")[0], W = !1;
                !z && (W = z = M("stroke"));
                if (a.stroke && a.stroke != "none" || a["stroke-width"] || a["stroke-opacity"] != null || a["stroke-dasharray"] || a["stroke-miterlimit"] || a["stroke-linejoin"] || a["stroke-linecap"])z.on = !0;
                (a.stroke == "none" || a.stroke === null || z.on == null || a.stroke == 0 || a["stroke-width"] == 0) && (z.on = !1);
                var X = e.getRGB(a.stroke);
                z.on && a.stroke && (z.color = X.hex), U = ((+h["stroke-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+X.o + 1 || 2) - 1);
                var V = (r(a["stroke-width"]) || 1) * .75;
                U = u(o(U, 0), 1), a["stroke-width"] == null && (V = h["stroke-width"]), a["stroke-width"] && (z.weight = V), V && V < 1 && (U *= V) && (z.weight = 1), z.opacity = U, a["stroke-linejoin"] && (z.joinstyle = a["stroke-linejoin"] || "miter"), z.miterlimit = a["stroke-miterlimit"] || 8, a["stroke-linecap"] && (z.endcap = a["stroke-linecap"] == "butt" ? "flat" : a["stroke-linecap"] == "square" ? "square" : "round");
                if (a["stroke-dasharray"]) {
                    var $ = {"-":"shortdash", ".":"shortdot", "-.":"shortdashdot", "-..":"shortdashdotdot", ". ":"dot", "- ":"dash", "--":"longdash", "- .":"dashdot", "--.":"longdashdot", "--..":"longdashdotdot"};
                    z.dashstyle = $[t](a["stroke-dasharray"]) ? $[a["stroke-dasharray"]] : d
                }
                W && c.appendChild(z)
            }
            if (b.type == "text") {
                b.paper.canvas.style.display = d;
                var J = b.paper.span, K = 100, Q = h.font && h.font.match(/\d+(?:\.\d*)?(?=px)/);
                v = J.style, h.font && (v.font = h.font), h["font-family"] && (v.fontFamily = h["font-family"]), h["font-weight"] && (v.fontWeight = h["font-weight"]), h["font-style"] && (v.fontStyle = h["font-style"]), Q = r(h["font-size"] || Q && Q[0]) || 10, v.fontSize = Q * K + "px", b.textpath.string && (J.innerHTML = n(b.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                var G = J.getBoundingClientRect();
                b.W = h.w = (G.right - G.left) / K, b.H = h.h = (G.bottom - G.top) / K, b.X = h.x, b.Y = h.y + b.H / 2, ("x"in a || "y"in a) && (b.path.v = e.format("m{0},{1}l{2},{1}", s(h.x * w), s(h.y * w), s(h.x * w) + 1));
                var Y = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
                for (var Z = 0, et = Y.length; Z < et; Z++)if (Y[Z]in a) {
                    b._.dirty = 1;
                    break
                }
                switch (h["text-anchor"]) {
                    case"start":
                        b.textpath.style["v-text-align"] = "left", b.bbx = b.W / 2;
                        break;
                    case"end":
                        b.textpath.style["v-text-align"] = "right", b.bbx = -b.W / 2;
                        break;
                    default:
                        b.textpath.style["v-text-align"] = "center", b.bbx = 0
                }
                b.textpath.style["v-text-kern"] = !0
            }
        }, L = function (t, s, o) {
            t.attrs = t.attrs || {};
            var u = t.attrs, a = Math.pow, f, l, c = "linear", h = ".5 .5";
            t.attrs.gradient = s, s = n(s).replace(e._radial_gradient, function (e, t, n) {
                return c = "radial", t && n && (t = r(t), n = r(n), a(t - .5, 2) + a(n - .5, 2) > .25 && (n = i.sqrt(.25 - a(t - .5, 2)) * ((n > .5) * 2 - 1) + .5), h = t + p + n), d
            }), s = s.split(/\s*\-\s*/);
            if (c == "linear") {
                var v = s.shift();
                v = -r(v);
                if (isNaN(v))return null
            }
            var m = e._parseDots(s);
            if (!m)return null;
            t = t.shape || t.node;
            if (m.length) {
                t.removeChild(o), o.on = !0, o.method = "none", o.color = m[0].color, o.color2 = m[m.length - 1].color;
                var g = [];
                for (var y = 0, b = m.length; y < b; y++)m[y].offset && g.push(m[y].offset + p + m[y].color);
                o.colors = g.length ? g.join() : "0% " + o.color, c == "radial" ? (o.type = "gradientTitle", o.focus = "100%", o.focussize = "0 0", o.focusposition = h, o.angle = 0) : (o.type = "gradient", o.angle = (270 - v) % 360), t.appendChild(o)
            }
            return 1
        }, A = function (t, n) {
            this[0] = this.node = t, t.raphael = !0, this.id = e._oid++, t.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = n, this.matrix = e.matrix(), this._ = {transform:[], sx:1, sy:1, dx:0, dy:0, deg:0, dirty:1, dirtyT:1}, !n.bottom && (n.bottom = this), this.prev = n.top, n.top && (n.top.next = this), n.top = this, this.next = null
        }, O = e.el;
        A.prototype = O, O.constructor = A, O.transform = function (t) {
            if (t == null)return this._.transform;
            var r = this.paper._viewBoxShift, i = r ? "s" + [r.scale, r.scale] + "-1-1t" + [r.dx, r.dy] : d, s;
            r && (s = t = n(t).replace(/\.{3}|\u2026/g, this._.transform || d)), e._extractTransform(this, i + t);
            var o = this.matrix.clone(), u = this.skew, a = this.node, f, l = ~n(this.attrs.fill).indexOf("-"), c = !n(this.attrs.fill).indexOf("url(");
            o.translate(-0.5, -0.5);
            if (c || l || this.type == "image") {
                u.matrix = "1 0 0 1", u.offset = "0 0", f = o.split();
                if (l && f.noRotation || !f.isSimple) {
                    a.style.filter = o.toFilter();
                    var h = this.getBBox(), v = this.getBBox(1), m = h.x - v.x, g = h.y - v.y;
                    a.coordorigin = m * -w + p + g * -w, N(this, 1, 1, m, g, 0)
                } else a.style.filter = d, N(this, f.scalex, f.scaley, f.dx, f.dy, f.rotate)
            } else a.style.filter = d, u.matrix = n(o), u.offset = o.offset();
            return s && (this._.transform = s), this
        }, O.rotate = function (e, t, i) {
            if (this.removed)return this;
            if (e == null)return;
            e = n(e).split(l), e.length - 1 && (t = r(e[1]), i = r(e[2])), e = r(e[0]), i == null && (t = i);
            if (t == null || i == null) {
                var s = this.getBBox(1);
                t = s.x + s.width / 2, i = s.y + s.height / 2
            }
            return this._.dirtyT = 1, this.transform(this._.transform.concat([
                ["r", e, t, i]
            ])), this
        }, O.translate = function (e, t) {
            return this.removed ? this : (e = n(e).split(l), e.length - 1 && (t = r(e[1])), e = r(e[0]) || 0, t = +t || 0, this._.bbox && (this._.bbox.x += e, this._.bbox.y += t), this.transform(this._.transform.concat([
                ["t", e, t]
            ])), this)
        }, O.scale = function (e, t, i, s) {
            if (this.removed)return this;
            e = n(e).split(l), e.length - 1 && (t = r(e[1]), i = r(e[2]), s = r(e[3]), isNaN(i) && (i = null), isNaN(s) && (s = null)), e = r(e[0]), t == null && (t = e), s == null && (i = s);
            if (i == null || s == null)var o = this.getBBox(1);
            return i = i == null ? o.x + o.width / 2 : i, s = s == null ? o.y + o.height / 2 : s, this.transform(this._.transform.concat([
                ["s", e, t, i, s]
            ])), this._.dirtyT = 1, this
        }, O.hide = function () {
            return!this.removed && (this.node.style.display = "none"), this
        }, O.show = function () {
            return!this.removed && (this.node.style.display = d), this
        }, O._getBBox = function () {
            return this.removed ? {} : {x:this.X + (this.bbx || 0) - this.W / 2, y:this.Y - this.H, width:this.W, height:this.H}
        }, O.remove = function () {
            if (this.removed || !this.node.parentNode)return;
            this.paper.__set__ && this.paper.__set__.exclude(this), e.eve.unbind("raphael.*.*." + this.id), e._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
            for (var t in this)this[t] = typeof this[t] == "function" ? e._removedFactory(t) : null;
            this.removed = !0
        }, O.attr = function (n, r) {
            if (this.removed)return this;
            if (n == null) {
                var i = {};
                for (var s in this.attrs)this.attrs[t](s) && (i[s] = this.attrs[s]);
                return i.gradient && i.fill == "none" && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform, i
            }
            if (r == null && e.is(n, "string")) {
                if (n == f && this.attrs.fill == "none" && this.attrs.gradient)return this.attrs.gradient;
                var o = n.split(l), u = {};
                for (var a = 0, h = o.length; a < h; a++)n = o[a], n in this.attrs ? u[n] = this.attrs[n] : e.is(this.paper.customAttributes[n], "function") ? u[n] = this.paper.customAttributes[n].def : u[n] = e._availableAttrs[n];
                return h - 1 ? u : u[o[0]]
            }
            if (this.attrs && r == null && e.is(n, "array")) {
                u = {};
                for (a = 0, h = n.length; a < h; a++)u[n[a]] = this.attr(n[a]);
                return u
            }
            var p;
            r != null && (p = {}, p[n] = r), r == null && e.is(n, "object") && (p = n);
            for (var d in p)c("raphael.attr." + d + "." + this.id, this, p[d]);
            if (p) {
                for (d in this.paper.customAttributes)if (this.paper.customAttributes[t](d) && p[t](d) && e.is(this.paper.customAttributes[d], "function")) {
                    var v = this.paper.customAttributes[d].apply(this, [].concat(p[d]));
                    this.attrs[d] = p[d];
                    for (var m in v)v[t](m) && (p[m] = v[m])
                }
                p.text && this.type == "text" && (this.textpath.string = p.text), k(this, p)
            }
            return this
        }, O.toFront = function () {
            return!this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && e._tofront(this, this.paper), this
        }, O.toBack = function () {
            return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), e._toback(this, this.paper)), this)
        }, O.insertAfter = function (t) {
            return this.removed ? this : (t.constructor == e.st.constructor && (t = t[t.length - 1]), t.node.nextSibling ? t.node.parentNode.insertBefore(this.node, t.node.nextSibling) : t.node.parentNode.appendChild(this.node), e._insertafter(this, t, this.paper), this)
        }, O.insertBefore = function (t) {
            return this.removed ? this : (t.constructor == e.st.constructor && (t = t[0]), t.node.parentNode.insertBefore(this.node, t.node), e._insertbefore(this, t, this.paper), this)
        }, O.blur = function (t) {
            var n = this.node.runtimeStyle, r = n.filter;
            r = r.replace(g, d), +t !== 0 ? (this.attrs.blur = t, n.filter = r + p + h + ".Blur(pixelradius=" + (+t || 1.5) + ")", n.margin = e.format("-{0}px 0 0 -{0}px", s(+t || 1.5))) : (n.filter = r, n.margin = 0, delete this.attrs.blur)
        }, e._engine.path = function (e, t) {
            var n = M("shape");
            n.style.cssText = b, n.coordsize = w + p + w, n.coordorigin = t.coordorigin;
            var r = new A(n, t), i = {fill:"none", stroke:"#000"};
            e && (i.path = e), r.type = "path", r.path = [], r.Path = d, k(r, i), t.canvas.appendChild(n);
            var s = M("skew");
            return s.on = !0, n.appendChild(s), r.skew = s, r.transform(d), r
        }, e._engine.rect = function (t, n, r, i, s, o) {
            var u = e._rectPath(n, r, i, s, o), a = t.path(u), f = a.attrs;
            return a.X = f.x = n, a.Y = f.y = r, a.W = f.width = i, a.H = f.height = s, f.r = o, f.path = u, a.type = "rect", a
        }, e._engine.ellipse = function (e, t, n, r, i) {
            var s = e.path(), o = s.attrs;
            return s.X = t - r, s.Y = n - i, s.W = r * 2, s.H = i * 2, s.type = "ellipse", k(s, {cx:t, cy:n, rx:r, ry:i}), s
        }, e._engine.circle = function (e, t, n, r) {
            var i = e.path(), s = i.attrs;
            return i.X = t - r, i.Y = n - r, i.W = i.H = r * 2, i.type = "circle", k(i, {cx:t, cy:n, r:r}), i
        }, e._engine.image = function (t, n, r, i, s, o) {
            var u = e._rectPath(r, i, s, o), a = t.path(u).attr({stroke:"none"}), l = a.attrs, c = a.node, h = c.getElementsByTagName(f)[0];
            return l.src = n, a.X = l.x = r, a.Y = l.y = i, a.W = l.width = s, a.H = l.height = o, l.path = u, a.type = "image", h.parentNode == c && c.removeChild(h), h.rotate = !0, h.src = n, h.type = "tile", a._.fillpos = [r, i], a._.fillsize = [s, o], c.appendChild(h), N(a, 1, 1, 0, 0, 0), a
        }, e._engine.text = function (t, r, i, o) {
            var u = M("shape"), a = M("path"), f = M("textpath");
            r = r || 0, i = i || 0, o = o || "", a.v = e.format("m{0},{1}l{2},{1}", s(r * w), s(i * w), s(r * w) + 1), a.textpathok = !0, f.string = n(o), f.on = !0, u.style.cssText = b, u.coordsize = w + p + w, u.coordorigin = "0 0";
            var l = new A(u, t), c = {fill:"#000", stroke:"none", font:e._availableAttrs.font, text:o};
            l.shape = u, l.path = a, l.textpath = f, l.type = "text", l.attrs.text = n(o), l.attrs.x = r, l.attrs.y = i, l.attrs.w = 1, l.attrs.h = 1, k(l, c), u.appendChild(f), u.appendChild(a), t.canvas.appendChild(u);
            var h = M("skew");
            return h.on = !0, u.appendChild(h), l.skew = h, l.transform(d), l
        }, e._engine.setSize = function (t, n) {
            var r = this.canvas.style;
            return this.width = t, this.height = n, t == +t && (t += "px"), n == +n && (n += "px"), r.width = t, r.height = n, r.clip = "rect(0 " + t + " " + n + " 0)", this._viewBox && e._engine.setViewBox.apply(this, this._viewBox), this
        }, e._engine.setViewBox = function (t, n, r, i, s) {
            e.eve("raphael.setViewBox", this, this._viewBox, [t, n, r, i, s]);
            var u = this.width, a = this.height, f = 1 / o(r / u, i / a), l, c;
            return s && (l = a / i, c = u / r, r * l < u && (t -= (u - r * l) / 2 / l), i * c < a && (n -= (a - i * c) / 2 / c)), this._viewBox = [t, n, r, i, !!s], this._viewBoxShift = {dx:-t, dy:-n, scale:f}, this.forEach(function (e) {
                e.transform("...")
            }), this
        };
        var M;
        e._engine.initWin = function (e) {
            var t = e.document;
            t.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                !t.namespaces.rvml && t.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), M = function (e) {
                    return t.createElement("<rvml:" + e + ' class="rvml">')
                }
            } catch (n) {
                M = function (e) {
                    return t.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                }
            }
        }, e._engine.initWin(e._g.win), e._engine.create = function () {
            var t = e._getContainer.apply(0, arguments), n = t.container, r = t.height, i, s = t.width, o = t.x, u = t.y;
            if (!n)throw new Error("VML container not found.");
            var a = new e._Paper, f = a.canvas = e._g.doc.createElement("div"), l = f.style;
            return o = o || 0, u = u || 0, s = s || 512, r = r || 342, a.width = s, a.height = r, s == +s && (s += "px"), r == +r && (r += "px"), a.coordsize = w * 1e3 + p + w * 1e3, a.coordorigin = "0 0", a.span = e._g.doc.createElement("span"), a.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", f.appendChild(a.span), l.cssText = e.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", s, r), n == 1 ? (e._g.doc.body.appendChild(f), l.left = o + "px", l.top = u + "px", l.position = "absolute") : n.firstChild ? n.insertBefore(f, n.firstChild) : n.appendChild(f), a.renderfix = function () {
            }, a
        }, e.prototype.clear = function () {
            e.eve("raphael.clear", this), this.canvas.innerHTML = d, this.span = e._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
        }, e.prototype.remove = function () {
            e.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
            for (var t in this)this[t] = typeof this[t] == "function" ? e._removedFactory(t) : null;
            return!0
        };
        var _ = e.st;
        for (var D in O)O[t](D) && !_[t](D) && (_[D] = function (e) {
            return function () {
                var t = arguments;
                return this.forEach(function (n) {
                    n[e].apply(n, t)
                })
            }
        }(D))
    }(window.Raphael), e = Raphael, e
}), define("scripts/main.js", function (e) {
    function p(e) {
        u.display(!0), e()
    }

    function d(e) {
        e && u.left(e[0] + c).top(e[1] + h - l)
    }

    function v() {
        u.display(!1)
    }

    var t = require("scripts/drawer"), n = require("scripts/lib/ucren"), r = !1, i = window, s, o = 40, u = n.Element("pen"), a = n.Element("startButton"), f = 100, l = 100, c = 0, h = 0;
    return i.dataCallBack = function (t, n) {
        r = !0, s.setData(t, n), e.ready()
    }, e.ready = function () {
        a.html("开始播放！"), a.addEvents({click:this.play.bind(this)})
    }, e.play = function () {
        if (this.played || !r)return;
        a.remove(), this.played = !0, void function () {
            s.playAnimation(n.isIe ? o : o * 1.5, p, d, v)
        }.defer(null, 300)
    }, e.start = function () {
        s = t.create({container:"canvas", width:700, height:700}).init();
        var e = ["wen01", "wen02", "wen03"], r = n.queryString("file") || e[n.randomNumber(e.length)];
        n.loadScript("./scripts/data/" + r + ".js");
        var i = n.makeElement("div", {style:{fontSize:"16px", lineHeight:"17px", position:"absolute", right:"10px", bottom:"10px", color:"#666"}});
        i.innerHTML = "本 demo 由 <a href='http://weibo.com/u/2129568040?refer=usercard&wvr=5' target='_blank'>@桃太牛究究</a> 完成手绘肖像设计，由 <a href='http://weibo.com/baidujs' target='_blank'>@JS小组</a> 完成程序", document.body.appendChild(i)
    }, e
}), startModule("scripts/main")