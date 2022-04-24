/* eslint-disable */
function t() {
    return (() => {
        var e = {
                757: (e, t, r) => {
                    e.exports = r(666);
                },
                669: (e, t, r) => {
                    e.exports = r(609);
                },
                448: (e, t, r) => {
                    "use strict";
                    var n = r(867),
                        o = r(26),
                        i = r(372),
                        a = r(327),
                        s = r(97),
                        c = r(109),
                        u = r(985),
                        l = r(61);
                    e.exports = function (e) {
                        return new Promise(function (t, r) {
                            var f = e.data,
                                d = e.headers;
                            n.isFormData(f) && delete d["Content-Type"];
                            var h = new XMLHttpRequest();
                            if (e.auth) {
                                var p = e.auth.username || "",
                                    m = e.auth.password
                                        ? unescape(encodeURIComponent(e.auth.password))
                                        : "";
                                d.Authorization = "Basic " + btoa(p + ":" + m);
                            }
                            var g = s(e.baseURL, e.url);
                            if (
                                (h.open(
                                    e.method.toUpperCase(),
                                    a(g, e.params, e.paramsSerializer),
                                    !0
                                ),
                                    (h.timeout = e.timeout),
                                    (h.onreadystatechange = function () {
                                        if (
                                            h &&
                                            4 === h.readyState &&
                                            (0 !== h.status ||
                                                (h.responseURL && 0 === h.responseURL.indexOf("file:")))
                                        ) {
                                            var n =
                                                    "getAllResponseHeaders" in h
                                                        ? c(h.getAllResponseHeaders())
                                                        : null,
                                                i = {
                                                    data:
                                                        e.responseType && "text" !== e.responseType
                                                            ? h.response
                                                            : h.responseText,
                                                    status: h.status,
                                                    statusText: h.statusText,
                                                    headers: n,
                                                    config: e,
                                                    request: h,
                                                };
                                            o(t, r, i), (h = null);
                                        }
                                    }),
                                    (h.onabort = function () {
                                        h &&
                                        (r(l("Request aborted", e, "ECONNABORTED", h)), (h = null));
                                    }),
                                    (h.onerror = function () {
                                        r(l("Network Error", e, null, h)), (h = null);
                                    }),
                                    (h.ontimeout = function () {
                                        var t = "timeout of " + e.timeout + "ms exceeded";
                                        e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                                            r(l(t, e, "ECONNABORTED", h)),
                                            (h = null);
                                    }),
                                    n.isStandardBrowserEnv())
                            ) {
                                var v =
                                    (e.withCredentials || u(g)) && e.xsrfCookieName
                                        ? i.read(e.xsrfCookieName)
                                        : void 0;
                                v && (d[e.xsrfHeaderName] = v);
                            }
                            if (
                                ("setRequestHeader" in h &&
                                n.forEach(d, function (e, t) {
                                    void 0 === f && "content-type" === t.toLowerCase()
                                        ? delete d[t]
                                        : h.setRequestHeader(t, e);
                                }),
                                n.isUndefined(e.withCredentials) ||
                                (h.withCredentials = !!e.withCredentials),
                                    e.responseType)
                            )
                                try {
                                    h.responseType = e.responseType;
                                } catch (t) {
                                    if ("json" !== e.responseType) throw t;
                                }
                            "function" == typeof e.onDownloadProgress &&
                            h.addEventListener("progress", e.onDownloadProgress),
                            "function" == typeof e.onUploadProgress &&
                            h.upload &&
                            h.upload.addEventListener("progress", e.onUploadProgress),
                            e.cancelToken &&
                            e.cancelToken.promise.then(function (e) {
                                h && (h.abort(), r(e), (h = null));
                            }),
                            f || (f = null),
                                h.send(f);
                        });
                    };
                },
                609: (e, t, r) => {
                    "use strict";
                    var n = r(867),
                        o = r(849),
                        i = r(321),
                        a = r(185);
                    function s(e) {
                        var t = new i(e),
                            r = o(i.prototype.request, t);
                        return n.extend(r, i.prototype, t), n.extend(r, t), r;
                    }
                    var c = s(r(655));
                    (c.Axios = i),
                        (c.create = function (e) {
                            return s(a(c.defaults, e));
                        }),
                        (c.Cancel = r(263)),
                        (c.CancelToken = r(972)),
                        (c.isCancel = r(502)),
                        (c.all = function (e) {
                            return Promise.all(e);
                        }),
                        (c.spread = r(713)),
                        (c.isAxiosError = r(268)),
                        (e.exports = c),
                        (e.exports.default = c);
                },
                263: (e) => {
                    "use strict";
                    function t(e) {
                        this.message = e;
                    }
                    (t.prototype.toString = function () {
                        return "Cancel" + (this.message ? ": " + this.message : "");
                    }),
                        (t.prototype.__CANCEL__ = !0),
                        (e.exports = t);
                },
                972: (e, t, r) => {
                    "use strict";
                    var n = r(263);
                    function o(e) {
                        if ("function" != typeof e)
                            throw new TypeError("executor must be a function.");
                        var t;
                        this.promise = new Promise(function (e) {
                            t = e;
                        });
                        var r = this;
                        e(function (e) {
                            r.reason || ((r.reason = new n(e)), t(r.reason));
                        });
                    }
                    (o.prototype.throwIfRequested = function () {
                        if (this.reason) throw this.reason;
                    }),
                        (o.source = function () {
                            var e;
                            return {
                                token: new o(function (t) {
                                    e = t;
                                }),
                                cancel: e,
                            };
                        }),
                        (e.exports = o);
                },
                502: (e) => {
                    "use strict";
                    e.exports = function (e) {
                        return !(!e || !e.__CANCEL__);
                    };
                },
                321: (e, t, r) => {
                    "use strict";
                    var n = r(867),
                        o = r(327),
                        i = r(782),
                        a = r(572),
                        s = r(185);
                    function c(e) {
                        (this.defaults = e),
                            (this.interceptors = { request: new i(), response: new i() });
                    }
                    (c.prototype.request = function (e) {
                        "string" == typeof e
                            ? ((e = arguments[1] || {}).url = arguments[0])
                            : (e = e || {}),
                            (e = s(this.defaults, e)).method
                                ? (e.method = e.method.toLowerCase())
                                : this.defaults.method
                                    ? (e.method = this.defaults.method.toLowerCase())
                                    : (e.method = "get");
                        var t = [a, void 0],
                            r = Promise.resolve(e);
                        for (
                            this.interceptors.request.forEach(function (e) {
                                t.unshift(e.fulfilled, e.rejected);
                            }),
                                this.interceptors.response.forEach(function (e) {
                                    t.push(e.fulfilled, e.rejected);
                                });
                            t.length;

                        )
                            r = r.then(t.shift(), t.shift());
                        return r;
                    }),
                        (c.prototype.getUri = function (e) {
                            return (
                                (e = s(this.defaults, e)),
                                    o(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
                            );
                        }),
                        n.forEach(["delete", "get", "head", "options"], function (e) {
                            c.prototype[e] = function (t, r) {
                                return this.request(
                                    s(r || {}, { method: e, url: t, data: (r || {}).data })
                                );
                            };
                        }),
                        n.forEach(["post", "put", "patch"], function (e) {
                            c.prototype[e] = function (t, r, n) {
                                return this.request(s(n || {}, { method: e, url: t, data: r }));
                            };
                        }),
                        (e.exports = c);
                },
                782: (e, t, r) => {
                    "use strict";
                    var n = r(867);
                    function o() {
                        this.handlers = [];
                    }
                    (o.prototype.use = function (e, t) {
                        return (
                            this.handlers.push({ fulfilled: e, rejected: t }),
                            this.handlers.length - 1
                        );
                    }),
                        (o.prototype.eject = function (e) {
                            this.handlers[e] && (this.handlers[e] = null);
                        }),
                        (o.prototype.forEach = function (e) {
                            n.forEach(this.handlers, function (t) {
                                null !== t && e(t);
                            });
                        }),
                        (e.exports = o);
                },
                97: (e, t, r) => {
                    "use strict";
                    var n = r(793),
                        o = r(303);
                    e.exports = function (e, t) {
                        return e && !n(t) ? o(e, t) : t;
                    };
                },
                61: (e, t, r) => {
                    "use strict";
                    var n = r(481);
                    e.exports = function (e, t, r, o, i) {
                        var a = new Error(e);
                        return n(a, t, r, o, i);
                    };
                },
                572: (e, t, r) => {
                    "use strict";
                    var n = r(867),
                        o = r(527),
                        i = r(502),
                        a = r(655);
                    function s(e) {
                        e.cancelToken && e.cancelToken.throwIfRequested();
                    }
                    e.exports = function (e) {
                        return (
                            s(e),
                                (e.headers = e.headers || {}),
                                (e.data = o(e.data, e.headers, e.transformRequest)),
                                (e.headers = n.merge(
                                    e.headers.common || {},
                                    e.headers[e.method] || {},
                                    e.headers
                                )),
                                n.forEach(
                                    ["delete", "get", "head", "post", "put", "patch", "common"],
                                    function (t) {
                                        delete e.headers[t];
                                    }
                                ),
                                (e.adapter || a.adapter)(e).then(
                                    function (t) {
                                        return (
                                            s(e),
                                                (t.data = o(t.data, t.headers, e.transformResponse)),
                                                t
                                        );
                                    },
                                    function (t) {
                                        return (
                                            i(t) ||
                                            (s(e),
                                            t &&
                                            t.response &&
                                            (t.response.data = o(
                                                t.response.data,
                                                t.response.headers,
                                                e.transformResponse
                                            ))),
                                                Promise.reject(t)
                                        );
                                    }
                                )
                        );
                    };
                },
                481: (e) => {
                    "use strict";
                    e.exports = function (e, t, r, n, o) {
                        return (
                            (e.config = t),
                            r && (e.code = r),
                                (e.request = n),
                                (e.response = o),
                                (e.isAxiosError = !0),
                                (e.toJSON = function () {
                                    return {
                                        message: this.message,
                                        name: this.name,
                                        description: this.description,
                                        number: this.number,
                                        fileName: this.fileName,
                                        lineNumber: this.lineNumber,
                                        columnNumber: this.columnNumber,
                                        stack: this.stack,
                                        config: this.config,
                                        code: this.code,
                                    };
                                }),
                                e
                        );
                    };
                },
                185: (e, t, r) => {
                    "use strict";
                    var n = r(867);
                    e.exports = function (e, t) {
                        t = t || {};
                        var r = {},
                            o = ["url", "method", "data"],
                            i = ["headers", "auth", "proxy", "params"],
                            a = [
                                "baseURL",
                                "transformRequest",
                                "transformResponse",
                                "paramsSerializer",
                                "timeout",
                                "timeoutMessage",
                                "withCredentials",
                                "adapter",
                                "responseType",
                                "xsrfCookieName",
                                "xsrfHeaderName",
                                "onUploadProgress",
                                "onDownloadProgress",
                                "decompress",
                                "maxContentLength",
                                "maxBodyLength",
                                "maxRedirects",
                                "transport",
                                "httpAgent",
                                "httpsAgent",
                                "cancelToken",
                                "socketPath",
                                "responseEncoding",
                            ],
                            s = ["validateStatus"];
                        function c(e, t) {
                            return n.isPlainObject(e) && n.isPlainObject(t)
                                ? n.merge(e, t)
                                : n.isPlainObject(t)
                                    ? n.merge({}, t)
                                    : n.isArray(t)
                                        ? t.slice()
                                        : t;
                        }
                        function u(o) {
                            n.isUndefined(t[o])
                                ? n.isUndefined(e[o]) || (r[o] = c(void 0, e[o]))
                                : (r[o] = c(e[o], t[o]));
                        }
                        n.forEach(o, function (e) {
                            n.isUndefined(t[e]) || (r[e] = c(void 0, t[e]));
                        }),
                            n.forEach(i, u),
                            n.forEach(a, function (o) {
                                n.isUndefined(t[o])
                                    ? n.isUndefined(e[o]) || (r[o] = c(void 0, e[o]))
                                    : (r[o] = c(void 0, t[o]));
                            }),
                            n.forEach(s, function (n) {
                                n in t
                                    ? (r[n] = c(e[n], t[n]))
                                    : n in e && (r[n] = c(void 0, e[n]));
                            });
                        var l = o.concat(i).concat(a).concat(s),
                            f = Object.keys(e)
                                .concat(Object.keys(t))
                                .filter(function (e) {
                                    return -1 === l.indexOf(e);
                                });
                        return n.forEach(f, u), r;
                    };
                },
                26: (e, t, r) => {
                    "use strict";
                    var n = r(61);
                    e.exports = function (e, t, r) {
                        var o = r.config.validateStatus;
                        r.status && o && !o(r.status)
                            ? t(
                                n(
                                    "Request failed with status code " + r.status,
                                    r.config,
                                    null,
                                    r.request,
                                    r
                                )
                            )
                            : e(r);
                    };
                },
                527: (e, t, r) => {
                    "use strict";
                    var n = r(867);
                    e.exports = function (e, t, r) {
                        return (
                            n.forEach(r, function (r) {
                                e = r(e, t);
                            }),
                                e
                        );
                    };
                },
                655: (e, t, r) => {
                    "use strict";
                    var n = r(867),
                        o = r(16),
                        i = { "Content-Type": "application/x-www-form-urlencoded" };
                    function a(e, t) {
                        !n.isUndefined(e) &&
                        n.isUndefined(e["Content-Type"]) &&
                        (e["Content-Type"] = t);
                    }
                    var s,
                        c = {
                            adapter:
                                (("undefined" != typeof XMLHttpRequest ||
                                    ("undefined" != typeof process &&
                                        "[object process]" ===
                                        Object.prototype.toString.call(process))) &&
                                (s = r(448)),
                                    s),
                            transformRequest: [
                                function (e, t) {
                                    return (
                                        o(t, "Accept"),
                                            o(t, "Content-Type"),
                                            n.isFormData(e) ||
                                            n.isArrayBuffer(e) ||
                                            n.isBuffer(e) ||
                                            n.isStream(e) ||
                                            n.isFile(e) ||
                                            n.isBlob(e)
                                                ? e
                                                : n.isArrayBufferView(e)
                                                    ? e.buffer
                                                    : n.isURLSearchParams(e)
                                                        ? (a(
                                                            t,
                                                            "application/x-www-form-urlencoded;charset=utf-8"
                                                        ),
                                                            e.toString())
                                                        : n.isObject(e)
                                                            ? (a(t, "application/json;charset=utf-8"),
                                                                JSON.stringify(e))
                                                            : e
                                    );
                                },
                            ],
                            transformResponse: [
                                function (e) {
                                    if ("string" == typeof e)
                                        try {
                                            e = JSON.parse(e);
                                        } catch (e) {}
                                    return e;
                                },
                            ],
                            timeout: 0,
                            xsrfCookieName: "XSRF-TOKEN",
                            xsrfHeaderName: "X-XSRF-TOKEN",
                            maxContentLength: -1,
                            maxBodyLength: -1,
                            validateStatus: function (e) {
                                return e >= 200 && e < 300;
                            },
                            headers: {
                                common: { Accept: "application/json, text/plain, */*" },
                            },
                        };
                    n.forEach(["delete", "get", "head"], function (e) {
                        c.headers[e] = {};
                    }),
                        n.forEach(["post", "put", "patch"], function (e) {
                            c.headers[e] = n.merge(i);
                        }),
                        (e.exports = c);
                },
                849: (e) => {
                    "use strict";
                    e.exports = function (e, t) {
                        return function () {
                            for (
                                var r = new Array(arguments.length), n = 0;
                                n < r.length;
                                n++
                            )
                                r[n] = arguments[n];
                            return e.apply(t, r);
                        };
                    };
                },
                327: (e, t, r) => {
                    "use strict";
                    var n = r(867);
                    function o(e) {
                        return encodeURIComponent(e)
                            .replace(/%3A/gi, ":")
                            .replace(/%24/g, "$")
                            .replace(/%2C/gi, ",")
                            .replace(/%20/g, "+")
                            .replace(/%5B/gi, "[")
                            .replace(/%5D/gi, "]");
                    }
                    e.exports = function (e, t, r) {
                        if (!t) return e;
                        var i;
                        if (r) i = r(t);
                        else if (n.isURLSearchParams(t)) i = t.toString();
                        else {
                            var a = [];
                            n.forEach(t, function (e, t) {
                                null != e &&
                                (n.isArray(e) ? (t += "[]") : (e = [e]),
                                    n.forEach(e, function (e) {
                                        n.isDate(e)
                                            ? (e = e.toISOString())
                                            : n.isObject(e) && (e = JSON.stringify(e)),
                                            a.push(o(t) + "=" + o(e));
                                    }));
                            }),
                                (i = a.join("&"));
                        }
                        if (i) {
                            var s = e.indexOf("#");
                            -1 !== s && (e = e.slice(0, s)),
                                (e += (-1 === e.indexOf("?") ? "?" : "&") + i);
                        }
                        return e;
                    };
                },
                303: (e) => {
                    "use strict";
                    e.exports = function (e, t) {
                        return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
                    };
                },
                372: (e, t, r) => {
                    "use strict";
                    var n = r(867);
                    e.exports = n.isStandardBrowserEnv()
                        ? {
                            write: function (e, t, r, o, i, a) {
                                var s = [];
                                s.push(e + "=" + encodeURIComponent(t)),
                                n.isNumber(r) &&
                                s.push("expires=" + new Date(r).toGMTString()),
                                n.isString(o) && s.push("path=" + o),
                                n.isString(i) && s.push("domain=" + i),
                                !0 === a && s.push("secure"),
                                    (document.cookie = s.join("; "));
                            },
                            read: function (e) {
                                var t = document.cookie.match(
                                    new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
                                );
                                return t ? decodeURIComponent(t[3]) : null;
                            },
                            remove: function (e) {
                                this.write(e, "", Date.now() - 864e5);
                            },
                        }
                        : {
                            write: function () {},
                            read: function () {
                                return null;
                            },
                            remove: function () {},
                        };
                },
                793: (e) => {
                    "use strict";
                    e.exports = function (e) {
                        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
                    };
                },
                268: (e) => {
                    "use strict";
                    e.exports = function (e) {
                        return "object" == typeof e && !0 === e.isAxiosError;
                    };
                },
                985: (e, t, r) => {
                    "use strict";
                    var n = r(867);
                    e.exports = n.isStandardBrowserEnv()
                        ? (function () {
                            var e,
                                t = /(msie|trident)/i.test(navigator.userAgent),
                                r = document.createElement("a");
                            function o(e) {
                                var n = e;
                                return (
                                    t && (r.setAttribute("href", n), (n = r.href)),
                                        r.setAttribute("href", n),
                                        {
                                            href: r.href,
                                            protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                                            host: r.host,
                                            search: r.search ? r.search.replace(/^\?/, "") : "",
                                            hash: r.hash ? r.hash.replace(/^#/, "") : "",
                                            hostname: r.hostname,
                                            port: r.port,
                                            pathname:
                                                "/" === r.pathname.charAt(0)
                                                    ? r.pathname
                                                    : "/" + r.pathname,
                                        }
                                );
                            }
                            return (
                                (e = o(window.location.href)),
                                    function (t) {
                                        var r = n.isString(t) ? o(t) : t;
                                        return r.protocol === e.protocol && r.host === e.host;
                                    }
                            );
                        })()
                        : function () {
                            return !0;
                        };
                },
                16: (e, t, r) => {
                    "use strict";
                    var n = r(867);
                    e.exports = function (e, t) {
                        n.forEach(e, function (r, n) {
                            n !== t &&
                            n.toUpperCase() === t.toUpperCase() &&
                            ((e[t] = r), delete e[n]);
                        });
                    };
                },
                109: (e, t, r) => {
                    "use strict";
                    var n = r(867),
                        o = [
                            "age",
                            "authorization",
                            "content-length",
                            "content-type",
                            "etag",
                            "expires",
                            "from",
                            "host",
                            "if-modified-since",
                            "if-unmodified-since",
                            "last-modified",
                            "location",
                            "max-forwards",
                            "proxy-authorization",
                            "referer",
                            "retry-after",
                            "user-agent",
                        ];
                    e.exports = function (e) {
                        var t,
                            r,
                            i,
                            a = {};
                        return e
                            ? (n.forEach(e.split("\n"), function (e) {
                                if (
                                    ((i = e.indexOf(":")),
                                        (t = n.trim(e.substr(0, i)).toLowerCase()),
                                        (r = n.trim(e.substr(i + 1))),
                                        t)
                                ) {
                                    if (a[t] && o.indexOf(t) >= 0) return;
                                    a[t] =
                                        "set-cookie" === t
                                            ? (a[t] ? a[t] : []).concat([r])
                                            : a[t]
                                                ? a[t] + ", " + r
                                                : r;
                                }
                            }),
                                a)
                            : a;
                    };
                },
                713: (e) => {
                    "use strict";
                    e.exports = function (e) {
                        return function (t) {
                            return e.apply(null, t);
                        };
                    };
                },
                867: (e, t, r) => {
                    "use strict";
                    var n = r(849),
                        o = Object.prototype.toString;
                    function i(e) {
                        return "[object Array]" === o.call(e);
                    }
                    function a(e) {
                        return void 0 === e;
                    }
                    function s(e) {
                        return null !== e && "object" == typeof e;
                    }
                    function c(e) {
                        if ("[object Object]" !== o.call(e)) return !1;
                        var t = Object.getPrototypeOf(e);
                        return null === t || t === Object.prototype;
                    }
                    function u(e) {
                        return "[object Function]" === o.call(e);
                    }
                    function l(e, t) {
                        if (null != e)
                            if (("object" != typeof e && (e = [e]), i(e)))
                                for (var r = 0, n = e.length; r < n; r++)
                                    t.call(null, e[r], r, e);
                            else
                                for (var o in e)
                                    Object.prototype.hasOwnProperty.call(e, o) &&
                                    t.call(null, e[o], o, e);
                    }
                    e.exports = {
                        isArray: i,
                        isArrayBuffer: function (e) {
                            return "[object ArrayBuffer]" === o.call(e);
                        },
                        isBuffer: function (e) {
                            return (
                                null !== e &&
                                !a(e) &&
                                null !== e.constructor &&
                                !a(e.constructor) &&
                                "function" == typeof e.constructor.isBuffer &&
                                e.constructor.isBuffer(e)
                            );
                        },
                        isFormData: function (e) {
                            return "undefined" != typeof FormData && e instanceof FormData;
                        },
                        isArrayBufferView: function (e) {
                            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
                                ? ArrayBuffer.isView(e)
                                : e && e.buffer && e.buffer instanceof ArrayBuffer;
                        },
                        isString: function (e) {
                            return "string" == typeof e;
                        },
                        isNumber: function (e) {
                            return "number" == typeof e;
                        },
                        isObject: s,
                        isPlainObject: c,
                        isUndefined: a,
                        isDate: function (e) {
                            return "[object Date]" === o.call(e);
                        },
                        isFile: function (e) {
                            return "[object File]" === o.call(e);
                        },
                        isBlob: function (e) {
                            return "[object Blob]" === o.call(e);
                        },
                        isFunction: u,
                        isStream: function (e) {
                            return s(e) && u(e.pipe);
                        },
                        isURLSearchParams: function (e) {
                            return (
                                "undefined" != typeof URLSearchParams &&
                                e instanceof URLSearchParams
                            );
                        },
                        isStandardBrowserEnv: function () {
                            return (
                                ("undefined" == typeof navigator ||
                                    ("ReactNative" !== navigator.product &&
                                        "NativeScript" !== navigator.product &&
                                        "NS" !== navigator.product)) &&
                                "undefined" != typeof window &&
                                "undefined" != typeof document
                            );
                        },
                        forEach: l,
                        merge: function e() {
                            var t = {};
                            function r(r, n) {
                                c(t[n]) && c(r)
                                    ? (t[n] = e(t[n], r))
                                    : c(r)
                                        ? (t[n] = e({}, r))
                                        : i(r)
                                            ? (t[n] = r.slice())
                                            : (t[n] = r);
                            }
                            for (var n = 0, o = arguments.length; n < o; n++)
                                l(arguments[n], r);
                            return t;
                        },
                        extend: function (e, t, r) {
                            return (
                                l(t, function (t, o) {
                                    e[o] = r && "function" == typeof t ? n(t, r) : t;
                                }),
                                    e
                            );
                        },
                        trim: function (e) {
                            return e.replace(/^\s*/, "").replace(/\s*$/, "");
                        },
                        stripBOM: function (e) {
                            return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
                        },
                    };
                },
                820: function (e, t, r) {
                    var n, o;
                    !(function (i, a, s) {
                        "use strict";
                        "undefined" != typeof window && r.amdO
                            ? void 0 ===
                            (o = "function" == typeof (n = s) ? n.call(t, r, t, e) : n) ||
                            (e.exports = o)
                            : e.exports
                                ? (e.exports = s())
                                : a.exports
                                    ? (a.exports = s())
                                    : (a.Fingerprint2 = s());
                    })(0, this, function () {
                        "use strict";
                        void 0 === Array.isArray &&
                        (Array.isArray = function (e) {
                            return "[object Array]" === Object.prototype.toString.call(e);
                        });
                        var e = function (e, t) {
                                (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
                                    (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
                                var r = [0, 0, 0, 0];
                                return (
                                    (r[3] += e[3] + t[3]),
                                        (r[2] += r[3] >>> 16),
                                        (r[3] &= 65535),
                                        (r[2] += e[2] + t[2]),
                                        (r[1] += r[2] >>> 16),
                                        (r[2] &= 65535),
                                        (r[1] += e[1] + t[1]),
                                        (r[0] += r[1] >>> 16),
                                        (r[1] &= 65535),
                                        (r[0] += e[0] + t[0]),
                                        (r[0] &= 65535),
                                        [(r[0] << 16) | r[1], (r[2] << 16) | r[3]]
                                );
                            },
                            t = function (e, t) {
                                (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
                                    (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
                                var r = [0, 0, 0, 0];
                                return (
                                    (r[3] += e[3] * t[3]),
                                        (r[2] += r[3] >>> 16),
                                        (r[3] &= 65535),
                                        (r[2] += e[2] * t[3]),
                                        (r[1] += r[2] >>> 16),
                                        (r[2] &= 65535),
                                        (r[2] += e[3] * t[2]),
                                        (r[1] += r[2] >>> 16),
                                        (r[2] &= 65535),
                                        (r[1] += e[1] * t[3]),
                                        (r[0] += r[1] >>> 16),
                                        (r[1] &= 65535),
                                        (r[1] += e[2] * t[2]),
                                        (r[0] += r[1] >>> 16),
                                        (r[1] &= 65535),
                                        (r[1] += e[3] * t[1]),
                                        (r[0] += r[1] >>> 16),
                                        (r[1] &= 65535),
                                        (r[0] +=
                                            e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0]),
                                        (r[0] &= 65535),
                                        [(r[0] << 16) | r[1], (r[2] << 16) | r[3]]
                                );
                            },
                            r = function (e, t) {
                                return 32 == (t %= 64)
                                    ? [e[1], e[0]]
                                    : t < 32
                                        ? [
                                            (e[0] << t) | (e[1] >>> (32 - t)),
                                            (e[1] << t) | (e[0] >>> (32 - t)),
                                        ]
                                        : ((t -= 32),
                                            [
                                                (e[1] << t) | (e[0] >>> (32 - t)),
                                                (e[0] << t) | (e[1] >>> (32 - t)),
                                            ]);
                            },
                            n = function (e, t) {
                                return 0 == (t %= 64)
                                    ? e
                                    : t < 32
                                        ? [(e[0] << t) | (e[1] >>> (32 - t)), e[1] << t]
                                        : [e[1] << (t - 32), 0];
                            },
                            o = function (e, t) {
                                return [e[0] ^ t[0], e[1] ^ t[1]];
                            },
                            i = function (e) {
                                return (
                                    (e = o(e, [0, e[0] >>> 1])),
                                        (e = t(e, [4283543511, 3981806797])),
                                        (e = o(e, [0, e[0] >>> 1])),
                                        (e = t(e, [3301882366, 444984403])),
                                        o(e, [0, e[0] >>> 1])
                                );
                            },
                            a = function (a, s) {
                                s = s || 0;
                                for (
                                    var c = (a = a || "").length % 16,
                                        u = a.length - c,
                                        l = [0, s],
                                        f = [0, s],
                                        d = [0, 0],
                                        h = [0, 0],
                                        p = [2277735313, 289559509],
                                        m = [1291169091, 658871167],
                                        g = 0;
                                    g < u;
                                    g += 16
                                )
                                    (d = [
                                        (255 & a.charCodeAt(g + 4)) |
                                        ((255 & a.charCodeAt(g + 5)) << 8) |
                                        ((255 & a.charCodeAt(g + 6)) << 16) |
                                        ((255 & a.charCodeAt(g + 7)) << 24),
                                        (255 & a.charCodeAt(g)) |
                                        ((255 & a.charCodeAt(g + 1)) << 8) |
                                        ((255 & a.charCodeAt(g + 2)) << 16) |
                                        ((255 & a.charCodeAt(g + 3)) << 24),
                                    ]),
                                        (h = [
                                            (255 & a.charCodeAt(g + 12)) |
                                            ((255 & a.charCodeAt(g + 13)) << 8) |
                                            ((255 & a.charCodeAt(g + 14)) << 16) |
                                            ((255 & a.charCodeAt(g + 15)) << 24),
                                            (255 & a.charCodeAt(g + 8)) |
                                            ((255 & a.charCodeAt(g + 9)) << 8) |
                                            ((255 & a.charCodeAt(g + 10)) << 16) |
                                            ((255 & a.charCodeAt(g + 11)) << 24),
                                        ]),
                                        (d = t(d, p)),
                                        (d = r(d, 31)),
                                        (d = t(d, m)),
                                        (l = o(l, d)),
                                        (l = r(l, 27)),
                                        (l = e(l, f)),
                                        (l = e(t(l, [0, 5]), [0, 1390208809])),
                                        (h = t(h, m)),
                                        (h = r(h, 33)),
                                        (h = t(h, p)),
                                        (f = o(f, h)),
                                        (f = r(f, 31)),
                                        (f = e(f, l)),
                                        (f = e(t(f, [0, 5]), [0, 944331445]));
                                switch (((d = [0, 0]), (h = [0, 0]), c)) {
                                    case 15:
                                        h = o(h, n([0, a.charCodeAt(g + 14)], 48));
                                    case 14:
                                        h = o(h, n([0, a.charCodeAt(g + 13)], 40));
                                    case 13:
                                        h = o(h, n([0, a.charCodeAt(g + 12)], 32));
                                    case 12:
                                        h = o(h, n([0, a.charCodeAt(g + 11)], 24));
                                    case 11:
                                        h = o(h, n([0, a.charCodeAt(g + 10)], 16));
                                    case 10:
                                        h = o(h, n([0, a.charCodeAt(g + 9)], 8));
                                    case 9:
                                        (h = o(h, [0, a.charCodeAt(g + 8)])),
                                            (h = t(h, m)),
                                            (h = r(h, 33)),
                                            (h = t(h, p)),
                                            (f = o(f, h));
                                    case 8:
                                        d = o(d, n([0, a.charCodeAt(g + 7)], 56));
                                    case 7:
                                        d = o(d, n([0, a.charCodeAt(g + 6)], 48));
                                    case 6:
                                        d = o(d, n([0, a.charCodeAt(g + 5)], 40));
                                    case 5:
                                        d = o(d, n([0, a.charCodeAt(g + 4)], 32));
                                    case 4:
                                        d = o(d, n([0, a.charCodeAt(g + 3)], 24));
                                    case 3:
                                        d = o(d, n([0, a.charCodeAt(g + 2)], 16));
                                    case 2:
                                        d = o(d, n([0, a.charCodeAt(g + 1)], 8));
                                    case 1:
                                        (d = o(d, [0, a.charCodeAt(g)])),
                                            (d = t(d, p)),
                                            (d = r(d, 31)),
                                            (d = t(d, m)),
                                            (l = o(l, d));
                                }
                                return (
                                    (l = o(l, [0, a.length])),
                                        (f = o(f, [0, a.length])),
                                        (l = e(l, f)),
                                        (f = e(f, l)),
                                        (l = i(l)),
                                        (f = i(f)),
                                        (l = e(l, f)),
                                        (f = e(f, l)),
                                    ("00000000" + (l[0] >>> 0).toString(16)).slice(-8) +
                                    ("00000000" + (l[1] >>> 0).toString(16)).slice(-8) +
                                    ("00000000" + (f[0] >>> 0).toString(16)).slice(-8) +
                                    ("00000000" + (f[1] >>> 0).toString(16)).slice(-8)
                                );
                            },
                            s = {
                                preprocessor: null,
                                audio: { timeout: 1e3, excludeIOS11: !0 },
                                fonts: {
                                    swfContainerId: "fingerprintjs2",
                                    swfPath: "flash/compiled/FontList.swf",
                                    userDefinedFonts: [],
                                    extendedJsFonts: !1,
                                },
                                screen: { detectScreenOrientation: !0 },
                                plugins: { sortPluginsFor: [/palemoon/i], excludeIE: !1 },
                                extraComponents: [],
                                excludes: {
                                    enumerateDevices: !0,
                                    pixelRatio: !0,
                                    doNotTrack: !0,
                                    fontsFlash: !0,
                                    adBlock: !0,
                                },
                                NOT_AVAILABLE: "not available",
                                ERROR: "error",
                                EXCLUDED: "excluded",
                            },
                            c = function (e, t) {
                                if (
                                    Array.prototype.forEach &&
                                    e.forEach === Array.prototype.forEach
                                )
                                    e.forEach(t);
                                else if (e.length === +e.length)
                                    for (var r = 0, n = e.length; r < n; r++) t(e[r], r, e);
                                else for (var o in e) e.hasOwnProperty(o) && t(e[o], o, e);
                            },
                            u = function (e, t) {
                                var r = [];
                                return null == e
                                    ? r
                                    : Array.prototype.map && e.map === Array.prototype.map
                                        ? e.map(t)
                                        : (c(e, function (e, n, o) {
                                            r.push(t(e, n, o));
                                        }),
                                            r);
                            },
                            l = function (e) {
                                if (null == navigator.plugins) return e.NOT_AVAILABLE;
                                for (
                                    var t = [], r = 0, n = navigator.plugins.length;
                                    r < n;
                                    r++
                                )
                                    navigator.plugins[r] && t.push(navigator.plugins[r]);
                                return (
                                    f(e) &&
                                    (t = t.sort(function (e, t) {
                                        return e.name > t.name ? 1 : e.name < t.name ? -1 : 0;
                                    })),
                                        u(t, function (e) {
                                            var t = u(e, function (e) {
                                                return [e.type, e.suffixes];
                                            });
                                            return [e.name, e.description, t];
                                        })
                                );
                            },
                            f = function (e) {
                                for (
                                    var t = !1, r = 0, n = e.plugins.sortPluginsFor.length;
                                    r < n;
                                    r++
                                ) {
                                    var o = e.plugins.sortPluginsFor[r];
                                    if (navigator.userAgent.match(o)) {
                                        t = !0;
                                        break;
                                    }
                                }
                                return t;
                            },
                            d = function () {
                                var e = document.createElement("canvas");
                                return !(!e.getContext || !e.getContext("2d"));
                            },
                            h = function () {
                                if (!d()) return !1;
                                var e = m(),
                                    t = !!window.WebGLRenderingContext && !!e;
                                return g(e), t;
                            },
                            p = function () {
                                return (
                                    ("msWriteProfilerMark" in window) +
                                    ("msLaunchUri" in navigator) +
                                    ("msSaveBlob" in navigator) >=
                                    2
                                );
                            },
                            m = function () {
                                var e = document.createElement("canvas"),
                                    t = null;
                                try {
                                    t =
                                        e.getContext("webgl") || e.getContext("experimental-webgl");
                                } catch (e) {}
                                return t || (t = null), t;
                            },
                            g = function (e) {
                                var t = e.getExtension("WEBGL_lose_context");
                                null != t && t.loseContext();
                            },
                            v = [
                                {
                                    key: "userAgent",
                                    getData: function (e) {
                                        e(navigator.userAgent);
                                    },
                                },
                                {
                                    key: "webdriver",
                                    getData: function (e, t) {
                                        e(
                                            null == navigator.webdriver
                                                ? t.NOT_AVAILABLE
                                                : navigator.webdriver
                                        );
                                    },
                                },
                                {
                                    key: "language",
                                    getData: function (e, t) {
                                        e(
                                            navigator.language ||
                                            navigator.userLanguage ||
                                            navigator.browserLanguage ||
                                            navigator.systemLanguage ||
                                            t.NOT_AVAILABLE
                                        );
                                    },
                                },
                                {
                                    key: "colorDepth",
                                    getData: function (e, t) {
                                        e(window.screen.colorDepth || t.NOT_AVAILABLE);
                                    },
                                },
                                {
                                    key: "deviceMemory",
                                    getData: function (e, t) {
                                        e(navigator.deviceMemory || t.NOT_AVAILABLE);
                                    },
                                },
                                {
                                    key: "pixelRatio",
                                    getData: function (e, t) {
                                        e(window.devicePixelRatio || t.NOT_AVAILABLE);
                                    },
                                },
                                {
                                    key: "hardwareConcurrency",
                                    getData: function (e, t) {
                                        e(
                                            (function (e) {
                                                return navigator.hardwareConcurrency
                                                    ? navigator.hardwareConcurrency
                                                    : e.NOT_AVAILABLE;
                                            })(t)
                                        );
                                    },
                                },
                                {
                                    key: "screenResolution",
                                    getData: function (e, t) {
                                        e(
                                            (function (e) {
                                                var t = [window.screen.width, window.screen.height];
                                                return (
                                                    e.screen.detectScreenOrientation &&
                                                    t.sort().reverse(),
                                                        t
                                                );
                                            })(t)
                                        );
                                    },
                                },
                                {
                                    key: "availableScreenResolution",
                                    getData: function (e, t) {
                                        e(
                                            (function (e) {
                                                if (
                                                    window.screen.availWidth &&
                                                    window.screen.availHeight
                                                ) {
                                                    var t = [
                                                        window.screen.availHeight,
                                                        window.screen.availWidth,
                                                    ];
                                                    return (
                                                        e.screen.detectScreenOrientation &&
                                                        t.sort().reverse(),
                                                            t
                                                    );
                                                }
                                                return e.NOT_AVAILABLE;
                                            })(t)
                                        );
                                    },
                                },
                                {
                                    key: "timezoneOffset",
                                    getData: function (e) {
                                        e(new Date().getTimezoneOffset());
                                    },
                                },
                                {
                                    key: "timezone",
                                    getData: function (e, t) {
                                        window.Intl && window.Intl.DateTimeFormat
                                            ? e(
                                                new window.Intl.DateTimeFormat().resolvedOptions()
                                                    .timeZone || t.NOT_AVAILABLE
                                            )
                                            : e(t.NOT_AVAILABLE);
                                    },
                                },
                                {
                                    key: "sessionStorage",
                                    getData: function (e, t) {
                                        e(
                                            (function (e) {
                                                try {
                                                    return !!window.sessionStorage;
                                                } catch (t) {
                                                    return e.ERROR;
                                                }
                                            })(t)
                                        );
                                    },
                                },
                                {
                                    key: "localStorage",
                                    getData: function (e, t) {
                                        e(
                                            (function (e) {
                                                try {
                                                    return !!window.localStorage;
                                                } catch (t) {
                                                    return e.ERROR;
                                                }
                                            })(t)
                                        );
                                    },
                                },
                                {
                                    key: "indexedDb",
                                    getData: function (e, t) {
                                        e(
                                            (function (e) {
                                                if (p()) return e.EXCLUDED;
                                                try {
                                                    return !!window.indexedDB;
                                                } catch (t) {
                                                    return e.ERROR;
                                                }
                                            })(t)
                                        );
                                    },
                                },
                                {
                                    key: "addBehavior",
                                    getData: function (e) {
                                        e(!!window.HTMLElement.prototype.addBehavior);
                                    },
                                },
                                {
                                    key: "openDatabase",
                                    getData: function (e) {
                                        e(!!window.openDatabase);
                                    },
                                },
                                {
                                    key: "cpuClass",
                                    getData: function (e, t) {
                                        e(
                                            (function (e) {
                                                return navigator.cpuClass || e.NOT_AVAILABLE;
                                            })(t)
                                        );
                                    },
                                },
                                {
                                    key: "platform",
                                    getData: function (e, t) {
                                        e(
                                            (function (e) {
                                                return navigator.platform
                                                    ? navigator.platform
                                                    : e.NOT_AVAILABLE;
                                            })(t)
                                        );
                                    },
                                },
                                {
                                    key: "doNotTrack",
                                    getData: function (e, t) {
                                        e(
                                            (function (e) {
                                                return navigator.doNotTrack
                                                    ? navigator.doNotTrack
                                                    : navigator.msDoNotTrack
                                                        ? navigator.msDoNotTrack
                                                        : window.doNotTrack
                                                            ? window.doNotTrack
                                                            : e.NOT_AVAILABLE;
                                            })(t)
                                        );
                                    },
                                },
                                {
                                    key: "plugins",
                                    getData: function (e, t) {
                                        "Microsoft Internet Explorer" === navigator.appName ||
                                        ("Netscape" === navigator.appName &&
                                            /Trident/.test(navigator.userAgent))
                                            ? t.plugins.excludeIE
                                                ? e(t.EXCLUDED)
                                                : e(
                                                    (function (e) {
                                                        var t = [];
                                                        return (
                                                            (Object.getOwnPropertyDescriptor &&
                                                                Object.getOwnPropertyDescriptor(
                                                                    window,
                                                                    "ActiveXObject"
                                                                )) ||
                                                            "ActiveXObject" in window
                                                                ? (t = u(
                                                                    [
                                                                        "AcroPDF.PDF",
                                                                        "Adodb.Stream",
                                                                        "AgControl.AgControl",
                                                                        "DevalVRXCtrl.DevalVRXCtrl.1",
                                                                        "MacromediaFlashPaper.MacromediaFlashPaper",
                                                                        "Msxml2.DOMDocument",
                                                                        "Msxml2.XMLHTTP",
                                                                        "PDF.PdfCtrl",
                                                                        "QuickTime.QuickTime",
                                                                        "QuickTimeCheckObject.QuickTimeCheck.1",
                                                                        "RealPlayer",
                                                                        "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
                                                                        "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
                                                                        "Scripting.Dictionary",
                                                                        "SWCtl.SWCtl",
                                                                        "Shell.UIHelper",
                                                                        "ShockwaveFlash.ShockwaveFlash",
                                                                        "Skype.Detection",
                                                                        "TDCCtl.TDCCtl",
                                                                        "WMPlayer.OCX",
                                                                        "rmocx.RealPlayer G2 Control",
                                                                        "rmocx.RealPlayer G2 Control.1",
                                                                    ],
                                                                    function (t) {
                                                                        try {
                                                                            return new window.ActiveXObject(t), t;
                                                                        } catch (t) {
                                                                            return e.ERROR;
                                                                        }
                                                                    }
                                                                ))
                                                                : t.push(e.NOT_AVAILABLE),
                                                            navigator.plugins && (t = t.concat(l(e))),
                                                                t
                                                        );
                                                    })(t)
                                                )
                                            : e(l(t));
                                    },
                                },
                                {
                                    key: "canvas",
                                    getData: function (e, t) {
                                        d()
                                            ? e(
                                                (function (e) {
                                                    var t = [],
                                                        r = document.createElement("canvas");
                                                    (r.width = 2e3),
                                                        (r.height = 200),
                                                        (r.style.display = "inline");
                                                    var n = r.getContext("2d");
                                                    return (
                                                        n.rect(0, 0, 10, 10),
                                                            n.rect(2, 2, 6, 6),
                                                            t.push(
                                                                "canvas winding:" +
                                                                (!1 === n.isPointInPath(5, 5, "evenodd")
                                                                    ? "yes"
                                                                    : "no")
                                                            ),
                                                            (n.textBaseline = "alphabetic"),
                                                            (n.fillStyle = "#f60"),
                                                            n.fillRect(125, 1, 62, 20),
                                                            (n.fillStyle = "#069"),
                                                            e.dontUseFakeFontInCanvas
                                                                ? (n.font = "11pt Arial")
                                                                : (n.font = "11pt no-real-font-123"),
                                                            n.fillText(
                                                                "Cwm fjordbank glyphs vext quiz, 😃",
                                                                2,
                                                                15
                                                            ),
                                                            (n.fillStyle = "rgba(102, 204, 0, 0.2)"),
                                                            (n.font = "18pt Arial"),
                                                            n.fillText(
                                                                "Cwm fjordbank glyphs vext quiz, 😃",
                                                                4,
                                                                45
                                                            ),
                                                            (n.globalCompositeOperation = "multiply"),
                                                            (n.fillStyle = "rgb(255,0,255)"),
                                                            n.beginPath(),
                                                            n.arc(50, 50, 50, 0, 2 * Math.PI, !0),
                                                            n.closePath(),
                                                            n.fill(),
                                                            (n.fillStyle = "rgb(0,255,255)"),
                                                            n.beginPath(),
                                                            n.arc(100, 50, 50, 0, 2 * Math.PI, !0),
                                                            n.closePath(),
                                                            n.fill(),
                                                            (n.fillStyle = "rgb(255,255,0)"),
                                                            n.beginPath(),
                                                            n.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                                                            n.closePath(),
                                                            n.fill(),
                                                            (n.fillStyle = "rgb(255,0,255)"),
                                                            n.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                                                            n.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                                                            n.fill("evenodd"),
                                                        r.toDataURL &&
                                                        t.push("canvas fp:" + r.toDataURL()),
                                                            t
                                                    );
                                                })(t)
                                            )
                                            : e(t.NOT_AVAILABLE);
                                    },
                                },
                                {
                                    key: "webgl",
                                    getData: function (e, t) {
                                        h()
                                            ? e(
                                                (function () {
                                                    var e,
                                                        t = function (t) {
                                                            return (
                                                                e.clearColor(0, 0, 0, 1),
                                                                    e.enable(e.DEPTH_TEST),
                                                                    e.depthFunc(e.LEQUAL),
                                                                    e.clear(
                                                                        e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT
                                                                    ),
                                                                "[" + t[0] + ", " + t[1] + "]"
                                                            );
                                                        };
                                                    if (!(e = m())) return null;
                                                    var r = [],
                                                        n = e.createBuffer();
                                                    e.bindBuffer(e.ARRAY_BUFFER, n);
                                                    var o = new Float32Array([
                                                        -0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0,
                                                    ]);
                                                    e.bufferData(e.ARRAY_BUFFER, o, e.STATIC_DRAW),
                                                        (n.itemSize = 3),
                                                        (n.numItems = 3);
                                                    var i = e.createProgram(),
                                                        a = e.createShader(e.VERTEX_SHADER);
                                                    e.shaderSource(
                                                        a,
                                                        "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"
                                                    ),
                                                        e.compileShader(a);
                                                    var s = e.createShader(e.FRAGMENT_SHADER);
                                                    e.shaderSource(
                                                        s,
                                                        "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"
                                                    ),
                                                        e.compileShader(s),
                                                        e.attachShader(i, a),
                                                        e.attachShader(i, s),
                                                        e.linkProgram(i),
                                                        e.useProgram(i),
                                                        (i.vertexPosAttrib = e.getAttribLocation(
                                                            i,
                                                            "attrVertex"
                                                        )),
                                                        (i.offsetUniform = e.getUniformLocation(
                                                            i,
                                                            "uniformOffset"
                                                        )),
                                                        e.enableVertexAttribArray(i.vertexPosArray),
                                                        e.vertexAttribPointer(
                                                            i.vertexPosAttrib,
                                                            n.itemSize,
                                                            e.FLOAT,
                                                            !1,
                                                            0,
                                                            0
                                                        ),
                                                        e.uniform2f(i.offsetUniform, 1, 1),
                                                        e.drawArrays(e.TRIANGLE_STRIP, 0, n.numItems);
                                                    try {
                                                        r.push(e.canvas.toDataURL());
                                                    } catch (e) {}
                                                    r.push(
                                                        "extensions:" +
                                                        (e.getSupportedExtensions() || []).join(";")
                                                    ),
                                                        r.push(
                                                            "webgl aliased line width range:" +
                                                            t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))
                                                        ),
                                                        r.push(
                                                            "webgl aliased point size range:" +
                                                            t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))
                                                        ),
                                                        r.push(
                                                            "webgl alpha bits:" +
                                                            e.getParameter(e.ALPHA_BITS)
                                                        ),
                                                        r.push(
                                                            "webgl antialiasing:" +
                                                            (e.getContextAttributes().antialias
                                                                ? "yes"
                                                                : "no")
                                                        ),
                                                        r.push(
                                                            "webgl blue bits:" + e.getParameter(e.BLUE_BITS)
                                                        ),
                                                        r.push(
                                                            "webgl depth bits:" +
                                                            e.getParameter(e.DEPTH_BITS)
                                                        ),
                                                        r.push(
                                                            "webgl green bits:" +
                                                            e.getParameter(e.GREEN_BITS)
                                                        ),
                                                        r.push(
                                                            "webgl max anisotropy:" +
                                                            (function (e) {
                                                                var t =
                                                                    e.getExtension(
                                                                        "EXT_texture_filter_anisotropic"
                                                                    ) ||
                                                                    e.getExtension(
                                                                        "WEBKIT_EXT_texture_filter_anisotropic"
                                                                    ) ||
                                                                    e.getExtension(
                                                                        "MOZ_EXT_texture_filter_anisotropic"
                                                                    );
                                                                if (t) {
                                                                    var r = e.getParameter(
                                                                        t.MAX_TEXTURE_MAX_ANISOTROPY_EXT
                                                                    );
                                                                    return 0 === r && (r = 2), r;
                                                                }
                                                                return null;
                                                            })(e)
                                                        ),
                                                        r.push(
                                                            "webgl max combined texture image units:" +
                                                            e.getParameter(
                                                                e.MAX_COMBINED_TEXTURE_IMAGE_UNITS
                                                            )
                                                        ),
                                                        r.push(
                                                            "webgl max cube map texture size:" +
                                                            e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)
                                                        ),
                                                        r.push(
                                                            "webgl max fragment uniform vectors:" +
                                                            e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)
                                                        ),
                                                        r.push(
                                                            "webgl max render buffer size:" +
                                                            e.getParameter(e.MAX_RENDERBUFFER_SIZE)
                                                        ),
                                                        r.push(
                                                            "webgl max texture image units:" +
                                                            e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)
                                                        ),
                                                        r.push(
                                                            "webgl max texture size:" +
                                                            e.getParameter(e.MAX_TEXTURE_SIZE)
                                                        ),
                                                        r.push(
                                                            "webgl max varying vectors:" +
                                                            e.getParameter(e.MAX_VARYING_VECTORS)
                                                        ),
                                                        r.push(
                                                            "webgl max vertex attribs:" +
                                                            e.getParameter(e.MAX_VERTEX_ATTRIBS)
                                                        ),
                                                        r.push(
                                                            "webgl max vertex texture image units:" +
                                                            e.getParameter(
                                                                e.MAX_VERTEX_TEXTURE_IMAGE_UNITS
                                                            )
                                                        ),
                                                        r.push(
                                                            "webgl max vertex uniform vectors:" +
                                                            e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)
                                                        ),
                                                        r.push(
                                                            "webgl max viewport dims:" +
                                                            t(e.getParameter(e.MAX_VIEWPORT_DIMS))
                                                        ),
                                                        r.push(
                                                            "webgl red bits:" + e.getParameter(e.RED_BITS)
                                                        ),
                                                        r.push(
                                                            "webgl renderer:" + e.getParameter(e.RENDERER)
                                                        ),
                                                        r.push(
                                                            "webgl shading language version:" +
                                                            e.getParameter(e.SHADING_LANGUAGE_VERSION)
                                                        ),
                                                        r.push(
                                                            "webgl stencil bits:" +
                                                            e.getParameter(e.STENCIL_BITS)
                                                        ),
                                                        r.push(
                                                            "webgl vendor:" + e.getParameter(e.VENDOR)
                                                        ),
                                                        r.push(
                                                            "webgl version:" + e.getParameter(e.VERSION)
                                                        );
                                                    try {
                                                        var u = e.getExtension(
                                                            "WEBGL_debug_renderer_info"
                                                        );
                                                        u &&
                                                        (r.push(
                                                            "webgl unmasked vendor:" +
                                                            e.getParameter(u.UNMASKED_VENDOR_WEBGL)
                                                        ),
                                                            r.push(
                                                                "webgl unmasked renderer:" +
                                                                e.getParameter(u.UNMASKED_RENDERER_WEBGL)
                                                            ));
                                                    } catch (e) {}
                                                    return e.getShaderPrecisionFormat
                                                        ? (c(["FLOAT", "INT"], function (t) {
                                                            c(["VERTEX", "FRAGMENT"], function (n) {
                                                                c(["HIGH", "MEDIUM", "LOW"], function (o) {
                                                                    c(
                                                                        ["precision", "rangeMin", "rangeMax"],
                                                                        function (i) {
                                                                            var a = e.getShaderPrecisionFormat(
                                                                                e[n + "_SHADER"],
                                                                                e[o + "_" + t]
                                                                            )[i];
                                                                            "precision" !== i &&
                                                                            (i = "precision " + i);
                                                                            var s = [
                                                                                "webgl ",
                                                                                n.toLowerCase(),
                                                                                " shader ",
                                                                                o.toLowerCase(),
                                                                                " ",
                                                                                t.toLowerCase(),
                                                                                " ",
                                                                                i,
                                                                                ":",
                                                                                a,
                                                                            ].join("");
                                                                            r.push(s);
                                                                        }
                                                                    );
                                                                });
                                                            });
                                                        }),
                                                            g(e),
                                                            r)
                                                        : (g(e), r);
                                                })()
                                            )
                                            : e(t.NOT_AVAILABLE);
                                    },
                                },
                                {
                                    key: "webglVendorAndRenderer",
                                    getData: function (e) {
                                        h()
                                            ? e(
                                                (function () {
                                                    try {
                                                        var e = m(),
                                                            t = e.getExtension("WEBGL_debug_renderer_info"),
                                                            r =
                                                                e.getParameter(t.UNMASKED_VENDOR_WEBGL) +
                                                                "~" +
                                                                e.getParameter(t.UNMASKED_RENDERER_WEBGL);
                                                        return g(e), r;
                                                    } catch (e) {
                                                        return null;
                                                    }
                                                })()
                                            )
                                            : e();
                                    },
                                },
                                {
                                    key: "adBlock",
                                    getData: function (e) {
                                        e(
                                            (function () {
                                                var e = document.createElement("div");
                                                (e.innerHTML = "&nbsp;"), (e.className = "adsbox");
                                                var t = !1;
                                                try {
                                                    document.body.appendChild(e),
                                                        (t =
                                                            0 ===
                                                            document.getElementsByClassName("adsbox")[0]
                                                                .offsetHeight),
                                                        document.body.removeChild(e);
                                                } catch (e) {
                                                    t = !1;
                                                }
                                                return t;
                                            })()
                                        );
                                    },
                                },
                                {
                                    key: "hasLiedLanguages",
                                    getData: function (e) {
                                        e(
                                            (function () {
                                                if (void 0 !== navigator.languages)
                                                    try {
                                                        if (
                                                            navigator.languages[0].substr(0, 2) !==
                                                            navigator.language.substr(0, 2)
                                                        )
                                                            return !0;
                                                    } catch (e) {
                                                        return !0;
                                                    }
                                                return !1;
                                            })()
                                        );
                                    },
                                },
                                {
                                    key: "hasLiedResolution",
                                    getData: function (e) {
                                        e(
                                            window.screen.width < window.screen.availWidth ||
                                            window.screen.height < window.screen.availHeight
                                        );
                                    },
                                },
                                {
                                    key: "hasLiedOs",
                                    getData: function (e) {
                                        e(
                                            (function () {
                                                var e,
                                                    t = navigator.userAgent.toLowerCase(),
                                                    r = navigator.oscpu,
                                                    n = navigator.platform.toLowerCase();
                                                if (
                                                    ((e =
                                                        t.indexOf("windows phone") >= 0
                                                            ? "Windows Phone"
                                                            : t.indexOf("windows") >= 0 ||
                                                            t.indexOf("win16") >= 0 ||
                                                            t.indexOf("win32") >= 0 ||
                                                            t.indexOf("win64") >= 0 ||
                                                            t.indexOf("win95") >= 0 ||
                                                            t.indexOf("win98") >= 0 ||
                                                            t.indexOf("winnt") >= 0 ||
                                                            t.indexOf("wow64") >= 0
                                                                ? "Windows"
                                                                : t.indexOf("android") >= 0
                                                                    ? "Android"
                                                                    : t.indexOf("linux") >= 0 ||
                                                                    t.indexOf("cros") >= 0 ||
                                                                    t.indexOf("x11") >= 0
                                                                        ? "Linux"
                                                                        : t.indexOf("iphone") >= 0 ||
                                                                        t.indexOf("ipad") >= 0 ||
                                                                        t.indexOf("ipod") >= 0 ||
                                                                        t.indexOf("crios") >= 0 ||
                                                                        t.indexOf("fxios") >= 0
                                                                            ? "iOS"
                                                                            : t.indexOf("macintosh") >= 0 ||
                                                                            t.indexOf("mac_powerpc)") >= 0
                                                                                ? "Mac"
                                                                                : "Other"),
                                                    ("ontouchstart" in window ||
                                                        navigator.maxTouchPoints > 0 ||
                                                        navigator.msMaxTouchPoints > 0) &&
                                                    "Windows" !== e &&
                                                    "Windows Phone" !== e &&
                                                    "Android" !== e &&
                                                    "iOS" !== e &&
                                                    "Other" !== e &&
                                                    -1 === t.indexOf("cros"))
                                                )
                                                    return !0;
                                                if (void 0 !== r) {
                                                    if (
                                                        (r = r.toLowerCase()).indexOf("win") >= 0 &&
                                                        "Windows" !== e &&
                                                        "Windows Phone" !== e
                                                    )
                                                        return !0;
                                                    if (
                                                        r.indexOf("linux") >= 0 &&
                                                        "Linux" !== e &&
                                                        "Android" !== e
                                                    )
                                                        return !0;
                                                    if (
                                                        r.indexOf("mac") >= 0 &&
                                                        "Mac" !== e &&
                                                        "iOS" !== e
                                                    )
                                                        return !0;
                                                    if (
                                                        (-1 === r.indexOf("win") &&
                                                            -1 === r.indexOf("linux") &&
                                                            -1 === r.indexOf("mac")) !=
                                                        ("Other" === e)
                                                    )
                                                        return !0;
                                                }
                                                return (
                                                    (n.indexOf("win") >= 0 &&
                                                        "Windows" !== e &&
                                                        "Windows Phone" !== e) ||
                                                    ((n.indexOf("linux") >= 0 ||
                                                            n.indexOf("android") >= 0 ||
                                                            n.indexOf("pike") >= 0) &&
                                                        "Linux" !== e &&
                                                        "Android" !== e) ||
                                                    ((n.indexOf("mac") >= 0 ||
                                                            n.indexOf("ipad") >= 0 ||
                                                            n.indexOf("ipod") >= 0 ||
                                                            n.indexOf("iphone") >= 0) &&
                                                        "Mac" !== e &&
                                                        "iOS" !== e) ||
                                                    (!(n.indexOf("arm") >= 0 && "Windows Phone" === e) &&
                                                        !(
                                                            n.indexOf("pike") >= 0 &&
                                                            t.indexOf("opera mini") >= 0
                                                        ) &&
                                                        ((n.indexOf("win") < 0 &&
                                                                n.indexOf("linux") < 0 &&
                                                                n.indexOf("mac") < 0 &&
                                                                n.indexOf("iphone") < 0 &&
                                                                n.indexOf("ipad") < 0 &&
                                                                n.indexOf("ipod") < 0) !=
                                                            ("Other" === e) ||
                                                            (void 0 === navigator.plugins &&
                                                                "Windows" !== e &&
                                                                "Windows Phone" !== e)))
                                                );
                                            })()
                                        );
                                    },
                                },
                                {
                                    key: "hasLiedBrowser",
                                    getData: function (e) {
                                        e(
                                            (function () {
                                                var e,
                                                    t = navigator.userAgent.toLowerCase(),
                                                    r = navigator.productSub;
                                                if (
                                                    t.indexOf("edge/") >= 0 ||
                                                    t.indexOf("iemobile/") >= 0
                                                )
                                                    return !1;
                                                if (t.indexOf("opera mini") >= 0) return !1;
                                                if (
                                                    ("Chrome" ==
                                                        (e =
                                                            t.indexOf("firefox/") >= 0
                                                                ? "Firefox"
                                                                : t.indexOf("opera/") >= 0 ||
                                                                t.indexOf(" opr/") >= 0
                                                                    ? "Opera"
                                                                    : t.indexOf("chrome/") >= 0
                                                                        ? "Chrome"
                                                                        : t.indexOf("safari/") >= 0
                                                                            ? t.indexOf("android 1.") >= 0 ||
                                                                            t.indexOf("android 2.") >= 0 ||
                                                                            t.indexOf("android 3.") >= 0 ||
                                                                            t.indexOf("android 4.") >= 0
                                                                                ? "AOSP"
                                                                                : "Safari"
                                                                            : t.indexOf("trident/") >= 0
                                                                                ? "Internet Explorer"
                                                                                : "Other") ||
                                                        "Safari" === e ||
                                                        "Opera" === e) &&
                                                    "20030107" !== r
                                                )
                                                    return !0;
                                                var n,
                                                    o = eval.toString().length;
                                                if (
                                                    37 === o &&
                                                    "Safari" !== e &&
                                                    "Firefox" !== e &&
                                                    "Other" !== e
                                                )
                                                    return !0;
                                                if (
                                                    39 === o &&
                                                    "Internet Explorer" !== e &&
                                                    "Other" !== e
                                                )
                                                    return !0;
                                                if (
                                                    33 === o &&
                                                    "Chrome" !== e &&
                                                    "AOSP" !== e &&
                                                    "Opera" !== e &&
                                                    "Other" !== e
                                                )
                                                    return !0;
                                                try {
                                                    throw "a";
                                                } catch (e) {
                                                    try {
                                                        e.toSource(), (n = !0);
                                                    } catch (e) {
                                                        n = !1;
                                                    }
                                                }
                                                return n && "Firefox" !== e && "Other" !== e;
                                            })()
                                        );
                                    },
                                },
                                {
                                    key: "touchSupport",
                                    getData: function (e) {
                                        e(
                                            (function () {
                                                var e,
                                                    t = 0;
                                                void 0 !== navigator.maxTouchPoints
                                                    ? (t = navigator.maxTouchPoints)
                                                    : void 0 !== navigator.msMaxTouchPoints &&
                                                    (t = navigator.msMaxTouchPoints);
                                                try {
                                                    document.createEvent("TouchEvent"), (e = !0);
                                                } catch (t) {
                                                    e = !1;
                                                }
                                                return [t, e, "ontouchstart" in window];
                                            })()
                                        );
                                    },
                                },
                                {
                                    key: "fonts",
                                    getData: function (e, t) {
                                        var r = ["monospace", "sans-serif", "serif"],
                                            n = [
                                                "Andale Mono",
                                                "Arial",
                                                "Arial Black",
                                                "Arial Hebrew",
                                                "Arial MT",
                                                "Arial Narrow",
                                                "Arial Rounded MT Bold",
                                                "Arial Unicode MS",
                                                "Bitstream Vera Sans Mono",
                                                "Book Antiqua",
                                                "Bookman Old Style",
                                                "Calibri",
                                                "Cambria",
                                                "Cambria Math",
                                                "Century",
                                                "Century Gothic",
                                                "Century Schoolbook",
                                                "Comic Sans",
                                                "Comic Sans MS",
                                                "Consolas",
                                                "Courier",
                                                "Courier New",
                                                "Geneva",
                                                "Georgia",
                                                "Helvetica",
                                                "Helvetica Neue",
                                                "Impact",
                                                "Lucida Bright",
                                                "Lucida Calligraphy",
                                                "Lucida Console",
                                                "Lucida Fax",
                                                "LUCIDA GRANDE",
                                                "Lucida Handwriting",
                                                "Lucida Sans",
                                                "Lucida Sans Typewriter",
                                                "Lucida Sans Unicode",
                                                "Microsoft Sans Serif",
                                                "Monaco",
                                                "Monotype Corsiva",
                                                "MS Gothic",
                                                "MS Outlook",
                                                "MS PGothic",
                                                "MS Reference Sans Serif",
                                                "MS Sans Serif",
                                                "MS Serif",
                                                "MYRIAD",
                                                "MYRIAD PRO",
                                                "Palatino",
                                                "Palatino Linotype",
                                                "Segoe Print",
                                                "Segoe Script",
                                                "Segoe UI",
                                                "Segoe UI Light",
                                                "Segoe UI Semibold",
                                                "Segoe UI Symbol",
                                                "Tahoma",
                                                "Times",
                                                "Times New Roman",
                                                "Times New Roman PS",
                                                "Trebuchet MS",
                                                "Verdana",
                                                "Wingdings",
                                                "Wingdings 2",
                                                "Wingdings 3",
                                            ];
                                        t.fonts.extendedJsFonts &&
                                        (n = n.concat([
                                            "Abadi MT Condensed Light",
                                            "Academy Engraved LET",
                                            "ADOBE CASLON PRO",
                                            "Adobe Garamond",
                                            "ADOBE GARAMOND PRO",
                                            "Agency FB",
                                            "Aharoni",
                                            "Albertus Extra Bold",
                                            "Albertus Medium",
                                            "Algerian",
                                            "Amazone BT",
                                            "American Typewriter",
                                            "American Typewriter Condensed",
                                            "AmerType Md BT",
                                            "Andalus",
                                            "Angsana New",
                                            "AngsanaUPC",
                                            "Antique Olive",
                                            "Aparajita",
                                            "Apple Chancery",
                                            "Apple Color Emoji",
                                            "Apple SD Gothic Neo",
                                            "Arabic Typesetting",
                                            "ARCHER",
                                            "ARNO PRO",
                                            "Arrus BT",
                                            "Aurora Cn BT",
                                            "AvantGarde Bk BT",
                                            "AvantGarde Md BT",
                                            "AVENIR",
                                            "Ayuthaya",
                                            "Bandy",
                                            "Bangla Sangam MN",
                                            "Bank Gothic",
                                            "BankGothic Md BT",
                                            "Baskerville",
                                            "Baskerville Old Face",
                                            "Batang",
                                            "BatangChe",
                                            "Bauer Bodoni",
                                            "Bauhaus 93",
                                            "Bazooka",
                                            "Bell MT",
                                            "Bembo",
                                            "Benguiat Bk BT",
                                            "Berlin Sans FB",
                                            "Berlin Sans FB Demi",
                                            "Bernard MT Condensed",
                                            "BernhardFashion BT",
                                            "BernhardMod BT",
                                            "Big Caslon",
                                            "BinnerD",
                                            "Blackadder ITC",
                                            "BlairMdITC TT",
                                            "Bodoni 72",
                                            "Bodoni 72 Oldstyle",
                                            "Bodoni 72 Smallcaps",
                                            "Bodoni MT",
                                            "Bodoni MT Black",
                                            "Bodoni MT Condensed",
                                            "Bodoni MT Poster Compressed",
                                            "Bookshelf Symbol 7",
                                            "Boulder",
                                            "Bradley Hand",
                                            "Bradley Hand ITC",
                                            "Bremen Bd BT",
                                            "Britannic Bold",
                                            "Broadway",
                                            "Browallia New",
                                            "BrowalliaUPC",
                                            "Brush Script MT",
                                            "Californian FB",
                                            "Calisto MT",
                                            "Calligrapher",
                                            "Candara",
                                            "CaslonOpnface BT",
                                            "Castellar",
                                            "Centaur",
                                            "Cezanne",
                                            "CG Omega",
                                            "CG Times",
                                            "Chalkboard",
                                            "Chalkboard SE",
                                            "Chalkduster",
                                            "Charlesworth",
                                            "Charter Bd BT",
                                            "Charter BT",
                                            "Chaucer",
                                            "ChelthmITC Bk BT",
                                            "Chiller",
                                            "Clarendon",
                                            "Clarendon Condensed",
                                            "CloisterBlack BT",
                                            "Cochin",
                                            "Colonna MT",
                                            "Constantia",
                                            "Cooper Black",
                                            "Copperplate",
                                            "Copperplate Gothic",
                                            "Copperplate Gothic Bold",
                                            "Copperplate Gothic Light",
                                            "CopperplGoth Bd BT",
                                            "Corbel",
                                            "Cordia New",
                                            "CordiaUPC",
                                            "Cornerstone",
                                            "Coronet",
                                            "Cuckoo",
                                            "Curlz MT",
                                            "DaunPenh",
                                            "Dauphin",
                                            "David",
                                            "DB LCD Temp",
                                            "DELICIOUS",
                                            "Denmark",
                                            "DFKai-SB",
                                            "Didot",
                                            "DilleniaUPC",
                                            "DIN",
                                            "DokChampa",
                                            "Dotum",
                                            "DotumChe",
                                            "Ebrima",
                                            "Edwardian Script ITC",
                                            "Elephant",
                                            "English 111 Vivace BT",
                                            "Engravers MT",
                                            "EngraversGothic BT",
                                            "Eras Bold ITC",
                                            "Eras Demi ITC",
                                            "Eras Light ITC",
                                            "Eras Medium ITC",
                                            "EucrosiaUPC",
                                            "Euphemia",
                                            "Euphemia UCAS",
                                            "EUROSTILE",
                                            "Exotc350 Bd BT",
                                            "FangSong",
                                            "Felix Titling",
                                            "Fixedsys",
                                            "FONTIN",
                                            "Footlight MT Light",
                                            "Forte",
                                            "FrankRuehl",
                                            "Fransiscan",
                                            "Freefrm721 Blk BT",
                                            "FreesiaUPC",
                                            "Freestyle Script",
                                            "French Script MT",
                                            "FrnkGothITC Bk BT",
                                            "Fruitger",
                                            "FRUTIGER",
                                            "Futura",
                                            "Futura Bk BT",
                                            "Futura Lt BT",
                                            "Futura Md BT",
                                            "Futura ZBlk BT",
                                            "FuturaBlack BT",
                                            "Gabriola",
                                            "Galliard BT",
                                            "Gautami",
                                            "Geeza Pro",
                                            "Geometr231 BT",
                                            "Geometr231 Hv BT",
                                            "Geometr231 Lt BT",
                                            "GeoSlab 703 Lt BT",
                                            "GeoSlab 703 XBd BT",
                                            "Gigi",
                                            "Gill Sans",
                                            "Gill Sans MT",
                                            "Gill Sans MT Condensed",
                                            "Gill Sans MT Ext Condensed Bold",
                                            "Gill Sans Ultra Bold",
                                            "Gill Sans Ultra Bold Condensed",
                                            "Gisha",
                                            "Gloucester MT Extra Condensed",
                                            "GOTHAM",
                                            "GOTHAM BOLD",
                                            "Goudy Old Style",
                                            "Goudy Stout",
                                            "GoudyHandtooled BT",
                                            "GoudyOLSt BT",
                                            "Gujarati Sangam MN",
                                            "Gulim",
                                            "GulimChe",
                                            "Gungsuh",
                                            "GungsuhChe",
                                            "Gurmukhi MN",
                                            "Haettenschweiler",
                                            "Harlow Solid Italic",
                                            "Harrington",
                                            "Heather",
                                            "Heiti SC",
                                            "Heiti TC",
                                            "HELV",
                                            "Herald",
                                            "High Tower Text",
                                            "Hiragino Kaku Gothic ProN",
                                            "Hiragino Mincho ProN",
                                            "Hoefler Text",
                                            "Humanst 521 Cn BT",
                                            "Humanst521 BT",
                                            "Humanst521 Lt BT",
                                            "Imprint MT Shadow",
                                            "Incised901 Bd BT",
                                            "Incised901 BT",
                                            "Incised901 Lt BT",
                                            "INCONSOLATA",
                                            "Informal Roman",
                                            "Informal011 BT",
                                            "INTERSTATE",
                                            "IrisUPC",
                                            "Iskoola Pota",
                                            "JasmineUPC",
                                            "Jazz LET",
                                            "Jenson",
                                            "Jester",
                                            "Jokerman",
                                            "Juice ITC",
                                            "Kabel Bk BT",
                                            "Kabel Ult BT",
                                            "Kailasa",
                                            "KaiTi",
                                            "Kalinga",
                                            "Kannada Sangam MN",
                                            "Kartika",
                                            "Kaufmann Bd BT",
                                            "Kaufmann BT",
                                            "Khmer UI",
                                            "KodchiangUPC",
                                            "Kokila",
                                            "Korinna BT",
                                            "Kristen ITC",
                                            "Krungthep",
                                            "Kunstler Script",
                                            "Lao UI",
                                            "Latha",
                                            "Leelawadee",
                                            "Letter Gothic",
                                            "Levenim MT",
                                            "LilyUPC",
                                            "Lithograph",
                                            "Lithograph Light",
                                            "Long Island",
                                            "Lydian BT",
                                            "Magneto",
                                            "Maiandra GD",
                                            "Malayalam Sangam MN",
                                            "Malgun Gothic",
                                            "Mangal",
                                            "Marigold",
                                            "Marion",
                                            "Marker Felt",
                                            "Market",
                                            "Marlett",
                                            "Matisse ITC",
                                            "Matura MT Script Capitals",
                                            "Meiryo",
                                            "Meiryo UI",
                                            "Microsoft Himalaya",
                                            "Microsoft JhengHei",
                                            "Microsoft New Tai Lue",
                                            "Microsoft PhagsPa",
                                            "Microsoft Tai Le",
                                            "Microsoft Uighur",
                                            "Microsoft YaHei",
                                            "Microsoft Yi Baiti",
                                            "MingLiU",
                                            "MingLiU_HKSCS",
                                            "MingLiU_HKSCS-ExtB",
                                            "MingLiU-ExtB",
                                            "Minion",
                                            "Minion Pro",
                                            "Miriam",
                                            "Miriam Fixed",
                                            "Mistral",
                                            "Modern",
                                            "Modern No. 20",
                                            "Mona Lisa Solid ITC TT",
                                            "Mongolian Baiti",
                                            "MONO",
                                            "MoolBoran",
                                            "Mrs Eaves",
                                            "MS LineDraw",
                                            "MS Mincho",
                                            "MS PMincho",
                                            "MS Reference Specialty",
                                            "MS UI Gothic",
                                            "MT Extra",
                                            "MUSEO",
                                            "MV Boli",
                                            "Nadeem",
                                            "Narkisim",
                                            "NEVIS",
                                            "News Gothic",
                                            "News GothicMT",
                                            "NewsGoth BT",
                                            "Niagara Engraved",
                                            "Niagara Solid",
                                            "Noteworthy",
                                            "NSimSun",
                                            "Nyala",
                                            "OCR A Extended",
                                            "Old Century",
                                            "Old English Text MT",
                                            "Onyx",
                                            "Onyx BT",
                                            "OPTIMA",
                                            "Oriya Sangam MN",
                                            "OSAKA",
                                            "OzHandicraft BT",
                                            "Palace Script MT",
                                            "Papyrus",
                                            "Parchment",
                                            "Party LET",
                                            "Pegasus",
                                            "Perpetua",
                                            "Perpetua Titling MT",
                                            "PetitaBold",
                                            "Pickwick",
                                            "Plantagenet Cherokee",
                                            "Playbill",
                                            "PMingLiU",
                                            "PMingLiU-ExtB",
                                            "Poor Richard",
                                            "Poster",
                                            "PosterBodoni BT",
                                            "PRINCETOWN LET",
                                            "Pristina",
                                            "PTBarnum BT",
                                            "Pythagoras",
                                            "Raavi",
                                            "Rage Italic",
                                            "Ravie",
                                            "Ribbon131 Bd BT",
                                            "Rockwell",
                                            "Rockwell Condensed",
                                            "Rockwell Extra Bold",
                                            "Rod",
                                            "Roman",
                                            "Sakkal Majalla",
                                            "Santa Fe LET",
                                            "Savoye LET",
                                            "Sceptre",
                                            "Script",
                                            "Script MT Bold",
                                            "SCRIPTINA",
                                            "Serifa",
                                            "Serifa BT",
                                            "Serifa Th BT",
                                            "ShelleyVolante BT",
                                            "Sherwood",
                                            "Shonar Bangla",
                                            "Showcard Gothic",
                                            "Shruti",
                                            "Signboard",
                                            "SILKSCREEN",
                                            "SimHei",
                                            "Simplified Arabic",
                                            "Simplified Arabic Fixed",
                                            "SimSun",
                                            "SimSun-ExtB",
                                            "Sinhala Sangam MN",
                                            "Sketch Rockwell",
                                            "Skia",
                                            "Small Fonts",
                                            "Snap ITC",
                                            "Snell Roundhand",
                                            "Socket",
                                            "Souvenir Lt BT",
                                            "Staccato222 BT",
                                            "Steamer",
                                            "Stencil",
                                            "Storybook",
                                            "Styllo",
                                            "Subway",
                                            "Swis721 BlkEx BT",
                                            "Swiss911 XCm BT",
                                            "Sylfaen",
                                            "Synchro LET",
                                            "System",
                                            "Tamil Sangam MN",
                                            "Technical",
                                            "Teletype",
                                            "Telugu Sangam MN",
                                            "Tempus Sans ITC",
                                            "Terminal",
                                            "Thonburi",
                                            "Traditional Arabic",
                                            "Trajan",
                                            "TRAJAN PRO",
                                            "Tristan",
                                            "Tubular",
                                            "Tunga",
                                            "Tw Cen MT",
                                            "Tw Cen MT Condensed",
                                            "Tw Cen MT Condensed Extra Bold",
                                            "TypoUpright BT",
                                            "Unicorn",
                                            "Univers",
                                            "Univers CE 55 Medium",
                                            "Univers Condensed",
                                            "Utsaah",
                                            "Vagabond",
                                            "Vani",
                                            "Vijaya",
                                            "Viner Hand ITC",
                                            "VisualUI",
                                            "Vivaldi",
                                            "Vladimir Script",
                                            "Vrinda",
                                            "Westminster",
                                            "WHITNEY",
                                            "Wide Latin",
                                            "ZapfEllipt BT",
                                            "ZapfHumnst BT",
                                            "ZapfHumnst Dm BT",
                                            "Zapfino",
                                            "Zurich BlkEx BT",
                                            "Zurich Ex BT",
                                            "ZWAdobeF",
                                        ])),
                                            (n = (n = n.concat(t.fonts.userDefinedFonts)).filter(
                                                function (e, t) {
                                                    return n.indexOf(e) === t;
                                                }
                                            ));
                                        var o = document.getElementsByTagName("body")[0],
                                            i = document.createElement("div"),
                                            a = document.createElement("div"),
                                            s = {},
                                            c = {},
                                            u = function () {
                                                var e = document.createElement("span");
                                                return (
                                                    (e.style.position = "absolute"),
                                                        (e.style.left = "-9999px"),
                                                        (e.style.fontSize = "72px"),
                                                        (e.style.fontStyle = "normal"),
                                                        (e.style.fontWeight = "normal"),
                                                        (e.style.letterSpacing = "normal"),
                                                        (e.style.lineBreak = "auto"),
                                                        (e.style.lineHeight = "normal"),
                                                        (e.style.textTransform = "none"),
                                                        (e.style.textAlign = "left"),
                                                        (e.style.textDecoration = "none"),
                                                        (e.style.textShadow = "none"),
                                                        (e.style.whiteSpace = "normal"),
                                                        (e.style.wordBreak = "normal"),
                                                        (e.style.wordSpacing = "normal"),
                                                        (e.innerHTML = "mmmmmmmmmmlli"),
                                                        e
                                                );
                                            },
                                            l = function (e, t) {
                                                var r = u();
                                                return (r.style.fontFamily = "'" + e + "'," + t), r;
                                            },
                                            f = function (e) {
                                                for (var t = !1, n = 0; n < r.length; n++)
                                                    if (
                                                        (t =
                                                            e[n].offsetWidth !== s[r[n]] ||
                                                            e[n].offsetHeight !== c[r[n]])
                                                    )
                                                        return t;
                                                return t;
                                            },
                                            d = (function () {
                                                for (var e = [], t = 0, n = r.length; t < n; t++) {
                                                    var o = u();
                                                    (o.style.fontFamily = r[t]),
                                                        i.appendChild(o),
                                                        e.push(o);
                                                }
                                                return e;
                                            })();
                                        o.appendChild(i);
                                        for (var h = 0, p = r.length; h < p; h++)
                                            (s[r[h]] = d[h].offsetWidth),
                                                (c[r[h]] = d[h].offsetHeight);
                                        var m = (function () {
                                            for (var e = {}, t = 0, o = n.length; t < o; t++) {
                                                for (var i = [], s = 0, c = r.length; s < c; s++) {
                                                    var u = l(n[t], r[s]);
                                                    a.appendChild(u), i.push(u);
                                                }
                                                e[n[t]] = i;
                                            }
                                            return e;
                                        })();
                                        o.appendChild(a);
                                        for (var g = [], v = 0, y = n.length; v < y; v++)
                                            f(m[n[v]]) && g.push(n[v]);
                                        o.removeChild(a), o.removeChild(i), e(g);
                                    },
                                    pauseBefore: !0,
                                },
                                {
                                    key: "fontsFlash",
                                    getData: function (e, t) {
                                        return void 0 !== window.swfobject
                                            ? window.swfobject.hasFlashPlayerVersion("9.0.0")
                                                ? t.fonts.swfPath
                                                    ? void (function (e, t) {
                                                        var r = "___fp_swf_loaded";
                                                        window[r] = function (t) {
                                                            e(t);
                                                        };
                                                        var n,
                                                            o = t.fonts.swfContainerId;
                                                        (n = document.createElement("div")).setAttribute(
                                                            "id",
                                                            (void 0).fonts.swfContainerId
                                                        ),
                                                            document.body.appendChild(n);
                                                        var i = { onReady: r };
                                                        window.swfobject.embedSWF(
                                                            t.fonts.swfPath,
                                                            o,
                                                            "1",
                                                            "1",
                                                            "9.0.0",
                                                            !1,
                                                            i,
                                                            { allowScriptAccess: "always", menu: "false" },
                                                            {}
                                                        );
                                                    })(function (t) {
                                                        e(t);
                                                    }, t)
                                                    : e("missing options.fonts.swfPath")
                                                : e("flash not installed")
                                            : e("swf object not loaded");
                                    },
                                    pauseBefore: !0,
                                },
                                {
                                    key: "audio",
                                    getData: function (e, t) {
                                        var r = t.audio;
                                        if (
                                            r.excludeIOS11 &&
                                            navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)
                                        )
                                            return e(t.EXCLUDED);
                                        var n =
                                            window.OfflineAudioContext ||
                                            window.webkitOfflineAudioContext;
                                        if (null == n) return e(t.NOT_AVAILABLE);
                                        var o = new n(1, 44100, 44100),
                                            i = o.createOscillator();
                                        (i.type = "triangle"),
                                            i.frequency.setValueAtTime(1e4, o.currentTime);
                                        var a = o.createDynamicsCompressor();
                                        c(
                                            [
                                                ["threshold", -50],
                                                ["knee", 40],
                                                ["ratio", 12],
                                                ["reduction", -20],
                                                ["attack", 0],
                                                ["release", 0.25],
                                            ],
                                            function (e) {
                                                void 0 !== a[e[0]] &&
                                                "function" == typeof a[e[0]].setValueAtTime &&
                                                a[e[0]].setValueAtTime(e[1], o.currentTime);
                                            }
                                        ),
                                            i.connect(a),
                                            a.connect(o.destination),
                                            i.start(0),
                                            o.startRendering();
                                        var s = setTimeout(function () {
                                            return (
                                                console.warn(
                                                    'Audio fingerprint timed out. Please report bug at https://github.com/fingerprintjs/fingerprintjs with your user agent: "' +
                                                    navigator.userAgent +
                                                    '".'
                                                ),
                                                    (o.oncomplete = function () {}),
                                                    (o = null),
                                                    e("audioTimeout")
                                            );
                                        }, r.timeout);
                                        o.oncomplete = function (t) {
                                            var r;
                                            try {
                                                clearTimeout(s),
                                                    (r = t.renderedBuffer
                                                        .getChannelData(0)
                                                        .slice(4500, 5e3)
                                                        .reduce(function (e, t) {
                                                            return e + Math.abs(t);
                                                        }, 0)
                                                        .toString()),
                                                    i.disconnect(),
                                                    a.disconnect();
                                            } catch (t) {
                                                return void e(t);
                                            }
                                            e(r);
                                        };
                                    },
                                },
                                {
                                    key: "enumerateDevices",
                                    getData: function (e, t) {
                                        if (
                                            !navigator.mediaDevices ||
                                            !navigator.mediaDevices.enumerateDevices
                                        )
                                            return e(t.NOT_AVAILABLE);
                                        navigator.mediaDevices
                                            .enumerateDevices()
                                            .then(function (t) {
                                                e(
                                                    t.map(function (e) {
                                                        return (
                                                            "id=" +
                                                            e.deviceId +
                                                            ";gid=" +
                                                            e.groupId +
                                                            ";" +
                                                            e.kind +
                                                            ";" +
                                                            e.label
                                                        );
                                                    })
                                                );
                                            })
                                            .catch(function (t) {
                                                e(t);
                                            });
                                    },
                                },
                            ],
                            y = function (e) {
                                throw new Error(
                                    "'new Fingerprint()' is deprecated, see https://github.com/fingerprintjs/fingerprintjs#upgrade-guide-from-182-to-200"
                                );
                            };
                        return (
                            (y.get = function (e, t) {
                                t ? e || (e = {}) : ((t = e), (e = {})),
                                    (function (e, t) {
                                        if (null == t) return e;
                                        var r, n;
                                        for (n in t)
                                            null == (r = t[n]) ||
                                            Object.prototype.hasOwnProperty.call(e, n) ||
                                            (e[n] = r);
                                    })(e, s),
                                    (e.components = e.extraComponents.concat(v));
                                var r = {
                                        data: [],
                                        addPreprocessedComponent: function (t, n) {
                                            "function" == typeof e.preprocessor &&
                                            (n = e.preprocessor(t, n)),
                                                r.data.push({ key: t, value: n });
                                        },
                                    },
                                    n = -1,
                                    o = function (i) {
                                        if ((n += 1) >= e.components.length) t(r.data);
                                        else {
                                            var a = e.components[n];
                                            if (e.excludes[a.key]) o(!1);
                                            else {
                                                if (!i && a.pauseBefore)
                                                    return (
                                                        (n -= 1),
                                                            void setTimeout(function () {
                                                                o(!0);
                                                            }, 1)
                                                    );
                                                try {
                                                    a.getData(function (e) {
                                                        r.addPreprocessedComponent(a.key, e), o(!1);
                                                    }, e);
                                                } catch (e) {
                                                    r.addPreprocessedComponent(a.key, String(e)), o(!1);
                                                }
                                            }
                                        }
                                    };
                                o(!1);
                            }),
                                (y.getPromise = function (e) {
                                    return new Promise(function (t, r) {
                                        y.get(e, t);
                                    });
                                }),
                                (y.getV18 = function (e, t) {
                                    return (
                                        null == t && ((t = e), (e = {})),
                                            y.get(e, function (r) {
                                                for (var n = [], o = 0; o < r.length; o++) {
                                                    var i = r[o];
                                                    if (i.value === (e.NOT_AVAILABLE || "not available"))
                                                        n.push({ key: i.key, value: "unknown" });
                                                    else if ("plugins" === i.key)
                                                        n.push({
                                                            key: "plugins",
                                                            value: u(i.value, function (e) {
                                                                var t = u(e[2], function (e) {
                                                                    return e.join ? e.join("~") : e;
                                                                }).join(",");
                                                                return [e[0], e[1], t].join("::");
                                                            }),
                                                        });
                                                    else if (
                                                        -1 !== ["canvas", "webgl"].indexOf(i.key) &&
                                                        Array.isArray(i.value)
                                                    )
                                                        n.push({ key: i.key, value: i.value.join("~") });
                                                    else if (
                                                        -1 !==
                                                        [
                                                            "sessionStorage",
                                                            "localStorage",
                                                            "indexedDb",
                                                            "addBehavior",
                                                            "openDatabase",
                                                        ].indexOf(i.key)
                                                    ) {
                                                        if (!i.value) continue;
                                                        n.push({ key: i.key, value: 1 });
                                                    } else
                                                        i.value
                                                            ? n.push(
                                                                i.value.join
                                                                    ? { key: i.key, value: i.value.join(";") }
                                                                    : i
                                                            )
                                                            : n.push({ key: i.key, value: i.value });
                                                }
                                                var s = a(
                                                    u(n, function (e) {
                                                        return e.value;
                                                    }).join("~~~"),
                                                    31
                                                );
                                                t(s, n);
                                            })
                                    );
                                }),
                                (y.x64hash128 = a),
                                (y.VERSION = "2.1.4"),
                                y
                        );
                    });
                },
                808: (e, t, r) => {
                    var n, o, i;
                    void 0 ===
                    (o =
                        "function" ==
                        typeof (n = i =
                            function () {
                                function e() {
                                    for (var e = 0, t = {}; e < arguments.length; e++) {
                                        var r = arguments[e];
                                        for (var n in r) t[n] = r[n];
                                    }
                                    return t;
                                }
                                function t(e) {
                                    return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
                                }
                                return (function r(n) {
                                    function o() {}
                                    function i(t, r, i) {
                                        if ("undefined" != typeof document) {
                                            "number" ==
                                            typeof (i = e({ path: "/" }, o.defaults, i))
                                                .expires &&
                                            (i.expires = new Date(
                                                1 * new Date() + 864e5 * i.expires
                                            )),
                                                (i.expires = i.expires
                                                    ? i.expires.toUTCString()
                                                    : "");
                                            try {
                                                var a = JSON.stringify(r);
                                                /^[\{\[]/.test(a) && (r = a);
                                            } catch (e) {}
                                            (r = n.write
                                                ? n.write(r, t)
                                                : encodeURIComponent(String(r)).replace(
                                                    /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                                                    decodeURIComponent
                                                )),
                                                (t = encodeURIComponent(String(t))
                                                    .replace(
                                                        /%(23|24|26|2B|5E|60|7C)/g,
                                                        decodeURIComponent
                                                    )
                                                    .replace(/[\(\)]/g, escape));
                                            var s = "";
                                            for (var c in i)
                                                i[c] &&
                                                ((s += "; " + c),
                                                !0 !== i[c] && (s += "=" + i[c].split(";")[0]));
                                            return (document.cookie = t + "=" + r + s);
                                        }
                                    }
                                    function a(e, r) {
                                        if ("undefined" != typeof document) {
                                            for (
                                                var o = {},
                                                    i = document.cookie
                                                        ? document.cookie.split("; ")
                                                        : [],
                                                    a = 0;
                                                a < i.length;
                                                a++
                                            ) {
                                                var s = i[a].split("="),
                                                    c = s.slice(1).join("=");
                                                r || '"' !== c.charAt(0) || (c = c.slice(1, -1));
                                                try {
                                                    var u = t(s[0]);
                                                    if (((c = (n.read || n)(c, u) || t(c)), r))
                                                        try {
                                                            c = JSON.parse(c);
                                                        } catch (e) {}
                                                    if (((o[u] = c), e === u)) break;
                                                } catch (e) {}
                                            }
                                            return e ? o[e] : o;
                                        }
                                    }
                                    return (
                                        (o.set = i),
                                            (o.get = function (e) {
                                                return a(e, !1);
                                            }),
                                            (o.getJSON = function (e) {
                                                return a(e, !0);
                                            }),
                                            (o.remove = function (t, r) {
                                                i(t, "", e(r, { expires: -1 }));
                                            }),
                                            (o.defaults = {}),
                                            (o.withConverter = r),
                                            o
                                    );
                                })(function () {});
                            })
                            ? n.call(t, r, t, e)
                            : n) || (e.exports = o),
                        (e.exports = i());
                },
                666: (e) => {
                    var t = (function (e) {
                        "use strict";
                        var t,
                            r = Object.prototype,
                            n = r.hasOwnProperty,
                            o = "function" == typeof Symbol ? Symbol : {},
                            i = o.iterator || "@@iterator",
                            a = o.asyncIterator || "@@asyncIterator",
                            s = o.toStringTag || "@@toStringTag";
                        function c(e, t, r) {
                            return (
                                Object.defineProperty(e, t, {
                                    value: r,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0,
                                }),
                                    e[t]
                            );
                        }
                        try {
                            c({}, "");
                        } catch (e) {
                            c = function (e, t, r) {
                                return (e[t] = r);
                            };
                        }
                        function u(e, t, r, n) {
                            var o = t && t.prototype instanceof g ? t : g,
                                i = Object.create(o.prototype),
                                a = new B(n || []);
                            return (
                                (i._invoke = (function (e, t, r) {
                                    var n = f;
                                    return function (o, i) {
                                        if (n === h)
                                            throw new Error("Generator is already running");
                                        if (n === p) {
                                            if ("throw" === o) throw i;
                                            return _();
                                        }
                                        for (r.method = o, r.arg = i; ; ) {
                                            var a = r.delegate;
                                            if (a) {
                                                var s = E(a, r);
                                                if (s) {
                                                    if (s === m) continue;
                                                    return s;
                                                }
                                            }
                                            if ("next" === r.method) r.sent = r._sent = r.arg;
                                            else if ("throw" === r.method) {
                                                if (n === f) throw ((n = p), r.arg);
                                                r.dispatchException(r.arg);
                                            } else "return" === r.method && r.abrupt("return", r.arg);
                                            n = h;
                                            var c = l(e, t, r);
                                            if ("normal" === c.type) {
                                                if (((n = r.done ? p : d), c.arg === m)) continue;
                                                return { value: c.arg, done: r.done };
                                            }
                                            "throw" === c.type &&
                                            ((n = p), (r.method = "throw"), (r.arg = c.arg));
                                        }
                                    };
                                })(e, r, a)),
                                    i
                            );
                        }
                        function l(e, t, r) {
                            try {
                                return { type: "normal", arg: e.call(t, r) };
                            } catch (e) {
                                return { type: "throw", arg: e };
                            }
                        }
                        e.wrap = u;
                        var f = "suspendedStart",
                            d = "suspendedYield",
                            h = "executing",
                            p = "completed",
                            m = {};
                        function g() {}
                        function v() {}
                        function y() {}
                        var w = {};
                        w[i] = function () {
                            return this;
                        };
                        var T = Object.getPrototypeOf,
                            x = T && T(T(P([])));
                        x && x !== r && n.call(x, i) && (w = x);
                        var S = (y.prototype = g.prototype = Object.create(w));
                        function A(e) {
                            ["next", "throw", "return"].forEach(function (t) {
                                c(e, t, function (e) {
                                    return this._invoke(t, e);
                                });
                            });
                        }
                        function C(e, t) {
                            function r(o, i, a, s) {
                                var c = l(e[o], e, i);
                                if ("throw" !== c.type) {
                                    var u = c.arg,
                                        f = u.value;
                                    return f && "object" == typeof f && n.call(f, "__await")
                                        ? t.resolve(f.__await).then(
                                            function (e) {
                                                r("next", e, a, s);
                                            },
                                            function (e) {
                                                r("throw", e, a, s);
                                            }
                                        )
                                        : t.resolve(f).then(
                                            function (e) {
                                                (u.value = e), a(u);
                                            },
                                            function (e) {
                                                return r("throw", e, a, s);
                                            }
                                        );
                                }
                                s(c.arg);
                            }
                            var o;
                            this._invoke = function (e, n) {
                                function i() {
                                    return new t(function (t, o) {
                                        r(e, n, t, o);
                                    });
                                }
                                return (o = o ? o.then(i, i) : i());
                            };
                        }
                        function E(e, r) {
                            var n = e.iterator[r.method];
                            if (n === t) {
                                if (((r.delegate = null), "throw" === r.method)) {
                                    if (
                                        e.iterator.return &&
                                        ((r.method = "return"),
                                            (r.arg = t),
                                            E(e, r),
                                        "throw" === r.method)
                                    )
                                        return m;
                                    (r.method = "throw"),
                                        (r.arg = new TypeError(
                                            "The iterator does not provide a 'throw' method"
                                        ));
                                }
                                return m;
                            }
                            var o = l(n, e.iterator, r.arg);
                            if ("throw" === o.type)
                                return (
                                    (r.method = "throw"), (r.arg = o.arg), (r.delegate = null), m
                                );
                            var i = o.arg;
                            return i
                                ? i.done
                                    ? ((r[e.resultName] = i.value),
                                        (r.next = e.nextLoc),
                                    "return" !== r.method && ((r.method = "next"), (r.arg = t)),
                                        (r.delegate = null),
                                        m)
                                    : i
                                : ((r.method = "throw"),
                                    (r.arg = new TypeError("iterator result is not an object")),
                                    (r.delegate = null),
                                    m);
                        }
                        function b(e) {
                            var t = { tryLoc: e[0] };
                            1 in e && (t.catchLoc = e[1]),
                            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                                this.tryEntries.push(t);
                        }
                        function O(e) {
                            var t = e.completion || {};
                            (t.type = "normal"), delete t.arg, (e.completion = t);
                        }
                        function B(e) {
                            (this.tryEntries = [{ tryLoc: "root" }]),
                                e.forEach(b, this),
                                this.reset(!0);
                        }
                        function P(e) {
                            if (e) {
                                var r = e[i];
                                if (r) return r.call(e);
                                if ("function" == typeof e.next) return e;
                                if (!isNaN(e.length)) {
                                    var o = -1,
                                        a = function r() {
                                            for (; ++o < e.length; )
                                                if (n.call(e, o))
                                                    return (r.value = e[o]), (r.done = !1), r;
                                            return (r.value = t), (r.done = !0), r;
                                        };
                                    return (a.next = a);
                                }
                            }
                            return { next: _ };
                        }
                        function _() {
                            return { value: t, done: !0 };
                        }
                        return (
                            (v.prototype = S.constructor = y),
                                (y.constructor = v),
                                (v.displayName = c(y, s, "GeneratorFunction")),
                                (e.isGeneratorFunction = function (e) {
                                    var t = "function" == typeof e && e.constructor;
                                    return (
                                        !!t &&
                                        (t === v || "GeneratorFunction" === (t.displayName || t.name))
                                    );
                                }),
                                (e.mark = function (e) {
                                    return (
                                        Object.setPrototypeOf
                                            ? Object.setPrototypeOf(e, y)
                                            : ((e.__proto__ = y), c(e, s, "GeneratorFunction")),
                                            (e.prototype = Object.create(S)),
                                            e
                                    );
                                }),
                                (e.awrap = function (e) {
                                    return { __await: e };
                                }),
                                A(C.prototype),
                                (C.prototype[a] = function () {
                                    return this;
                                }),
                                (e.AsyncIterator = C),
                                (e.async = function (t, r, n, o, i) {
                                    void 0 === i && (i = Promise);
                                    var a = new C(u(t, r, n, o), i);
                                    return e.isGeneratorFunction(r)
                                        ? a
                                        : a.next().then(function (e) {
                                            return e.done ? e.value : a.next();
                                        });
                                }),
                                A(S),
                                c(S, s, "Generator"),
                                (S[i] = function () {
                                    return this;
                                }),
                                (S.toString = function () {
                                    return "[object Generator]";
                                }),
                                (e.keys = function (e) {
                                    var t = [];
                                    for (var r in e) t.push(r);
                                    return (
                                        t.reverse(),
                                            function r() {
                                                for (; t.length; ) {
                                                    var n = t.pop();
                                                    if (n in e) return (r.value = n), (r.done = !1), r;
                                                }
                                                return (r.done = !0), r;
                                            }
                                    );
                                }),
                                (e.values = P),
                                (B.prototype = {
                                    constructor: B,
                                    reset: function (e) {
                                        if (
                                            ((this.prev = 0),
                                                (this.next = 0),
                                                (this.sent = this._sent = t),
                                                (this.done = !1),
                                                (this.delegate = null),
                                                (this.method = "next"),
                                                (this.arg = t),
                                                this.tryEntries.forEach(O),
                                                !e)
                                        )
                                            for (var r in this)
                                                "t" === r.charAt(0) &&
                                                n.call(this, r) &&
                                                !isNaN(+r.slice(1)) &&
                                                (this[r] = t);
                                    },
                                    stop: function () {
                                        this.done = !0;
                                        var e = this.tryEntries[0].completion;
                                        if ("throw" === e.type) throw e.arg;
                                        return this.rval;
                                    },
                                    dispatchException: function (e) {
                                        if (this.done) throw e;
                                        var r = this;
                                        function o(n, o) {
                                            return (
                                                (s.type = "throw"),
                                                    (s.arg = e),
                                                    (r.next = n),
                                                o && ((r.method = "next"), (r.arg = t)),
                                                    !!o
                                            );
                                        }
                                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                            var a = this.tryEntries[i],
                                                s = a.completion;
                                            if ("root" === a.tryLoc) return o("end");
                                            if (a.tryLoc <= this.prev) {
                                                var c = n.call(a, "catchLoc"),
                                                    u = n.call(a, "finallyLoc");
                                                if (c && u) {
                                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                                                } else if (c) {
                                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                                } else {
                                                    if (!u)
                                                        throw new Error(
                                                            "try statement without catch or finally"
                                                        );
                                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                                                }
                                            }
                                        }
                                    },
                                    abrupt: function (e, t) {
                                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                                            var o = this.tryEntries[r];
                                            if (
                                                o.tryLoc <= this.prev &&
                                                n.call(o, "finallyLoc") &&
                                                this.prev < o.finallyLoc
                                            ) {
                                                var i = o;
                                                break;
                                            }
                                        }
                                        i &&
                                        ("break" === e || "continue" === e) &&
                                        i.tryLoc <= t &&
                                        t <= i.finallyLoc &&
                                        (i = null);
                                        var a = i ? i.completion : {};
                                        return (
                                            (a.type = e),
                                                (a.arg = t),
                                                i
                                                    ? ((this.method = "next"), (this.next = i.finallyLoc), m)
                                                    : this.complete(a)
                                        );
                                    },
                                    complete: function (e, t) {
                                        if ("throw" === e.type) throw e.arg;
                                        return (
                                            "break" === e.type || "continue" === e.type
                                                ? (this.next = e.arg)
                                                : "return" === e.type
                                                    ? ((this.rval = this.arg = e.arg),
                                                        (this.method = "return"),
                                                        (this.next = "end"))
                                                    : "normal" === e.type && t && (this.next = t),
                                                m
                                        );
                                    },
                                    finish: function (e) {
                                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                            var r = this.tryEntries[t];
                                            if (r.finallyLoc === e)
                                                return this.complete(r.completion, r.afterLoc), O(r), m;
                                        }
                                    },
                                    catch: function (e) {
                                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                            var r = this.tryEntries[t];
                                            if (r.tryLoc === e) {
                                                var n = r.completion;
                                                if ("throw" === n.type) {
                                                    var o = n.arg;
                                                    O(r);
                                                }
                                                return o;
                                            }
                                        }
                                        throw new Error("illegal catch attempt");
                                    },
                                    delegateYield: function (e, r, n) {
                                        return (
                                            (this.delegate = {
                                                iterator: P(e),
                                                resultName: r,
                                                nextLoc: n,
                                            }),
                                            "next" === this.method && (this.arg = t),
                                                m
                                        );
                                    },
                                }),
                                e
                        );
                    })(e.exports);
                    try {
                        regeneratorRuntime = t;
                    } catch (e) {
                        Function("r", "regeneratorRuntime = r")(t);
                    }
                },
            },
            t = {};
        function r(n) {
            var o = t[n];
            if (void 0 !== o) return o.exports;
            var i = (t[n] = { exports: {} });
            return e[n].call(i.exports, i, i.exports, r), i.exports;
        }
        (r.amdO = {}),
            (r.n = (e) => {
                var t = e && e.__esModule ? () => e.default : () => e;
                return r.d(t, { a: t }), t;
            }),
            (r.d = (e, t) => {
                for (var n in t)
                    r.o(t, n) &&
                    !r.o(e, n) &&
                    Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
            }),
            (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
        var n = {};
        return (
            (() => {
                "use strict";
                function e(e, t, r) {
                    return (
                        t in e
                            ? Object.defineProperty(e, t, {
                                value: r,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                            })
                            : (e[t] = r),
                            e
                    );
                }
                function t(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
                    return n;
                }
                function o(e) {
                    return (
                        (function (e) {
                            if (Array.isArray(e)) return t(e);
                        })(e) ||
                        (function (e) {
                            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                                return Array.from(e);
                        })(e) ||
                        (function (e, r) {
                            if (e) {
                                if ("string" == typeof e) return t(e, r);
                                var n = Object.prototype.toString.call(e).slice(8, -1);
                                return (
                                    "Object" === n && e.constructor && (n = e.constructor.name),
                                        "Map" === n || "Set" === n
                                            ? Array.from(e)
                                            : "Arguments" === n ||
                                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                                                ? t(e, r)
                                                : void 0
                                );
                            }
                        })(e) ||
                        (function () {
                            throw new TypeError(
                                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                            );
                        })()
                    );
                }
                function i(e, t, r, n, o, i, a) {
                    try {
                        var s = e[i](a),
                            c = s.value;
                    } catch (e) {
                        return void r(e);
                    }
                    s.done ? t(c) : Promise.resolve(c).then(n, o);
                }
                function a(e) {
                    return function () {
                        var t = this,
                            r = arguments;
                        return new Promise(function (n, o) {
                            var a = e.apply(t, r);
                            function s(e) {
                                i(a, n, o, s, c, "next", e);
                            }
                            function c(e) {
                                i(a, n, o, s, c, "throw", e);
                            }
                            s(void 0);
                        });
                    };
                }
                function s(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function");
                }
                function c(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        (n.enumerable = n.enumerable || !1),
                            (n.configurable = !0),
                        "value" in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n);
                    }
                }
                function u(e, t, r) {
                    return t && c(e.prototype, t), r && c(e, r), e;
                }
                r.d(n, { default: () => B });
                var l = r(757),
                    f = r.n(l),
                    d = r(820),
                    h = r.n(d),
                    p = function () {
                        return window.location.hash ? "hash" : "history";
                    };
                function m(e, t) {
                    var r = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
                        n = e.substr(3).match(r);
                    return null != n ? unescape(n[2]) : null;
                }
                function g(e) {
                    var t = window.history[e];
                    return function () {
                        var r = t.apply(this, arguments),
                            n = new Event(e);
                        return (n.arguments = arguments), window.dispatchEvent(n), r;
                    };
                }
                function v(e, t, r) {
                    e.addEventListener
                        ? e.addEventListener(t, r, !1)
                        : e.attachEvent(
                            "on" + t,
                            function (t) {
                                return r.call(e, t);
                            },
                            !1
                        );
                }
                function y() {
                    return Math.ceil(new Date().getTime() / 1e3);
                }
                var w = r(808),
                    T = r.n(w),
                    x = encodeURIComponent(window.location.href);
                const S = {
                    getDeviceId: function () {
                        return new Promise(function (e, t) {
                            window.requestIdleCallback
                                ? requestIdleCallback(function () {
                                    h().get(function (t) {
                                        var r = t.map(function (e) {
                                                return e.value;
                                            }),
                                            n = h().x64hash128(r.join(""), 31);
                                        e(n);
                                    });
                                })
                                : setTimeout(function () {
                                    h().get(function (t) {
                                        var r = t.map(function (e) {
                                                return e.value;
                                            }),
                                            n = h().x64hash128(r.join(""), 31);
                                        e(n);
                                    });
                                }, 500);
                        });
                    },
                    getUuid: function (e, t) {
                        var r,
                            n,
                            o =
                                "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
                                    ""
                                ),
                            i = [];
                        if (((t = t || o.length), e))
                            for (r = 0; r < e; r++) i[r] = o[0 | (Math.random() * t)];
                        else
                            for (
                                i[8] = i[13] = i[18] = i[23] = "-", i[14] = "4", r = 0;
                                r < 36;
                                r++
                            )
                                i[r] ||
                                ((n = 0 | (16 * Math.random())),
                                    (i[r] = o[19 == r ? (3 & n) | 8 : n]));
                        return i.join("");
                    },
                    getToken: function () {
                        var e;
                        return m(
                            (e =
                                "hash" === p() ? window.location.hash : window.location.search),
                            "token"
                        )
                            ? m(e, "token")
                            : T().get("ovo_ticket");
                    },
                    getOperationSys: function () {
                        var e = "",
                            t = {},
                            r = navigator.userAgent.toLowerCase();
                        for (var n in ((t.Windows =
                            "Win32" == navigator.platform || "Windows" == navigator.platform),
                            (t.Mac =
                                "Mac68K" == navigator.platform ||
                                "MacPPC" == navigator.platform ||
                                "Macintosh" == navigator.platform ||
                                "MacIntel" == navigator.platform),
                            (t.iphone = r.indexOf("iPhone") > -1),
                            (t.ipod = r.indexOf("iPod") > -1),
                            (t.ipad = r.indexOf("iPad") > -1),
                            (t.Android = r.indexOf("Android") > -1),
                            t))
                            t[n] && (e = n);
                        return e;
                    },
                    getBrowserInfo: function () {
                        var e = {},
                            t = navigator.userAgent
                                .toLowerCase()
                                .match(/(msie|firefox|chrome|opera|version).*?([\d.]+)/);
                        return t
                            ? ((e.browser = t[1].replace(/version/, "'safari")),
                                (e.ver = t[2]),
                                e)
                            : e;
                    },
                    referUrlInstance: new ((function () {
                        function e() {
                            s(this, e),
                                (this.currentUrl = ""),
                                (this.url = encodeURIComponent(window.location.href)),
                                (this.urlPath = ""),
                                (this.urlHost = ""),
                                (this.referUrl = ""),
                                (this.currentName = ""),
                                (this.referName = ""),
                                (this.referrerHost = ""),
                                (this.source_type = ""),
                                this.init();
                        }
                        return (
                            u(e, [
                                {
                                    key: "init",
                                    value: function () {
                                        var e, t, r;
                                        (this.currentUrl = window.location.href.split("?")[0]),
                                            (this.referUrl =
                                                encodeURIComponent(document.referrer) || ""),
                                            (this.urlHost = window.location.host),
                                            (this.urlPath = window.location.pathname),
                                            (this.url = x),
                                            (this.refererHost = this.referUrl.split("?")[0]),
                                            (this.currentName =
                                                ((t = ""),
                                                    (r = []),
                                                -1 !==
                                                (e =
                                                    "hash" === p()
                                                        ? window.location.hash
                                                        : window.location.pathname).indexOf("?") &&
                                                (e = e.substring(0, e.indexOf("?"))),
                                                    (r = e.split("/")).length <= 2
                                                        ? (t =
                                                            "" === r[r.length - 1] ? "home" : r[r.length - 1])
                                                        : (isNaN(Number(r[r.length - 1])) || r.pop(),
                                                            r.shift(),
                                                            (t = r.join("&"))),
                                                    t)),
                                            (this.sourceType = this.referUrl.includes(this.urlHost)
                                                ? 1
                                                : 2);
                                    },
                                },
                            ]),
                                e
                        );
                    })())(),
                };
                var A = r(669),
                    C = r.n(A);
                function E(e, t) {
                    var r = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var n = Object.getOwnPropertySymbols(e);
                        t &&
                        (n = n.filter(function (t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable;
                        })),
                            r.push.apply(r, n);
                    }
                    return r;
                }
                function b(t) {
                    for (var r = 1; r < arguments.length; r++) {
                        var n = null != arguments[r] ? arguments[r] : {};
                        r % 2
                            ? E(Object(n), !0).forEach(function (r) {
                                e(t, r, n[r]);
                            })
                            : Object.getOwnPropertyDescriptors
                                ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                                : E(Object(n)).forEach(function (e) {
                                    Object.defineProperty(
                                        t,
                                        e,
                                        Object.getOwnPropertyDescriptor(n, e)
                                    );
                                });
                    }
                    return t;
                }
                const O = (function () {
                    function e(t) {
                        var r = t.org_id,
                            n = t.customer_id,
                            o = t.module_type,
                            i = t.baseUrl;
                        s(this, e),
                            (this.commonProperties = {
                                token: "XXXX",
                                fingerprint_id: "",
                                anonymous_id: "",
                                session_id: "",
                                useragent: "",
                                model: "",
                                os: "",
                                os_version: "",
                                browser: "",
                                browser_version: "",
                                lib_version: "1.0.0",
                                org_id: r,
                                customer_id: n || "",
                                log_type: "user",
                                module_type: o || "",
                            }),
                            (this.pageSession = ""),
                            (this.visitParams = {}),
                            (this.eventData = {}),
                            (this.params = { view_duration: 0 }),
                            (this.optionsParams = {}),
                            (this.expiresTime = 1800),
                            (this.baseUrl =
                                i || "https://exp.beschannels.com/collect/collect.gif"),
                            (this.autoCollect = !1),
                            (this.events = ["A"]),
                            this.getFingerprintId(),
                            this.getAnonymousId(),
                            this.getSessionId(),
                            this.getDeviceInfo();
                    }
                    var t, r, n, i, c;
                    return (
                        u(e, [
                            {
                                key: "init",
                                value:
                                    ((c = a(
                                        f().mark(function e(t) {
                                            var r, n;
                                            return f().wrap(
                                                function (e) {
                                                    for (;;)
                                                        switch ((e.prev = e.next)) {
                                                            case 0:
                                                                return (
                                                                    (r = t.events || []),
                                                                        (this.events = [].concat(
                                                                            o(this.events),
                                                                            o(r)
                                                                        )),
                                                                        (this.autoCollect = t.autoCollect || !1),
                                                                        (e.next = 5),
                                                                        this.getFingerprintId()
                                                                );
                                                            case 5:
                                                                return (e.next = 7), this.getAnonymousId();
                                                            case 7:
                                                                return (e.next = 9), this.getSessionId();
                                                            case 9:
                                                                return (e.next = 11), this.getDeviceInfo();
                                                            case 11:
                                                                return (e.next = 13), this.registerEvent();
                                                            case 13:
                                                                t.autoCollect &&
                                                                ((n = {
                                                                    page_id: window.location,
                                                                    page_first_title: document.title,
                                                                    source_title: document.referrer,
                                                                }),
                                                                    this._visit(n));
                                                            case 14:
                                                            case "end":
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this
                                            );
                                        })
                                    )),
                                        function (e) {
                                            return c.apply(this, arguments);
                                        }),
                            },
                            {
                                key: "getFingerprintId",
                                value: function () {
                                    var e = this;
                                    return new Promise(function (t, r) {
                                        localStorage.getItem("fingerprintId")
                                            ? ((e.commonProperties.fingerprint_id =
                                                localStorage.getItem("fingerprintId")),
                                                t())
                                            : S.getDeviceId().then(function (r) {
                                                (e.commonProperties.fingerprint_id = r),
                                                    localStorage.setItem(
                                                        "fingerprintId",
                                                        e.commonProperties.fingerprint_id
                                                    ),
                                                    t();
                                            });
                                    });
                                },
                            },
                            {
                                key: "getAnonymousId",
                                value: function (e) {
                                    localStorage.getItem("anonymous_id")
                                        ? (this.commonProperties.anonymous_id =
                                            localStorage.getItem("anonymous_id"))
                                        : ((this.commonProperties.anonymous_id = S.getUuid(16, 16)),
                                            localStorage.setItem(
                                                "anonymous_id",
                                                this.commonProperties.anonymous_id
                                            ),
                                            (this.commonProperties.is_first = 1));
                                },
                            },
                            {
                                key: "getSessionId",
                                value: function () {
                                    var e = JSON.parse(localStorage.getItem("sessionInfo"));
                                    if (e) {
                                        var t = e.expires || y(),
                                            r = e.session_id,
                                            n = y();
                                        r && n >= t
                                            ? ((this.commonProperties.session_id = S.getUuid(16, 16)),
                                                (t = y() + this.expiresTime),
                                                localStorage.setItem(
                                                    "sessionInfo",
                                                    JSON.stringify({
                                                        session_id: this.commonProperties.session_id,
                                                        expires: t,
                                                    })
                                                ))
                                            : (this.commonProperties.session_id = r);
                                    } else {
                                        this.commonProperties.session_id = S.getUuid(16, 16);
                                        var o = y() + this.expiresTime;
                                        localStorage.setItem(
                                            "sessionInfo",
                                            JSON.stringify({
                                                session_id: this.commonProperties.session_id,
                                                expires: o,
                                            })
                                        );
                                    }
                                },
                            },
                            {
                                key: "getDeviceInfo",
                                value: function () {
                                    (this.commonProperties.UserAgent =
                                        navigator.userAgent.toLowerCase()),
                                        (this.commonProperties.os = S.getOperationSys()),
                                        (this.commonProperties.browser = S.getBrowserInfo()
                                            ? S.getBrowserInfo().browser
                                            : ""),
                                        (this.commonProperties.browser_version = S.getBrowserInfo()
                                            ? S.getBrowserInfo().ver
                                            : "");
                                },
                            },
                            {
                                key: "registerEvent",
                                value: function () {
                                    var e = this;
                                    (history.replaceState = g("replaceState")),
                                        (history.pushState = g("pushState")),
                                        window.addEventListener("replaceState", function (t) {
                                            return e.onPushStateHandle(t);
                                        }),
                                        window.addEventListener("pushState", function (t) {
                                            return e.onPushStateHandle(t);
                                        }),
                                        v(window, "popstate", function (t) {
                                            return e.onPopStateHandle(t);
                                        }),
                                        v(window, "beforeunload", function (t) {
                                            return e.onBeforeunloadHandle(t);
                                        }),
                                        window.addEventListener("visibilitychange", function (t) {
                                            return e.onHiddenOrShow(t);
                                        }),
                                        window.addEventListener("click", function (t) {
                                            return e.autoCollectUpload(t);
                                        });
                                },
                            },
                            {
                                key: "autoCollectUpload",
                                value: function (e) {
                                    if (
                                        ((r = e.target.nodeName),
                                            (n = this.events),
                                            new Set(n).has(r))
                                    ) {
                                        var t = {
                                            element_content: e.target.innerText,
                                            element_name: e.target.innerText,
                                            element_target_url: e.target.href,
                                            element_class: e.target.className,
                                            element_id: e.target.id,
                                        };
                                        "A" === e.target.nodeName
                                            ? Object.assign(this.params, t)
                                            : this._eventClick(t);
                                    }
                                    var r, n;
                                },
                            },
                            {
                                key: "onHiddenOrShow",
                                value: function () {
                                    if (
                                        document.hidden ||
                                        "hidden" === document.visibilityState
                                    ) {
                                        this.params.leaveTime = y();
                                        var e = this.params.leaveTime - this.params.visitTime;
                                        this.params.view_duration = this.params.view_duration + e;
                                    } else this.params.visitTime = y();
                                },
                            },
                            {
                                key: "onPopStateHandle",
                                value: function (e) {
                                    var t = this;
                                    this._calcParams();
                                    var r = this._concatParams(3);
                                    console.log("页面回退回调", r),
                                        this.collectUpload(r).then(function (e) {
                                            t._clearDataParams();
                                        });
                                },
                            },
                            {
                                key: "onBeforeunloadHandle",
                                value: function (e) {
                                    var t = this;
                                    this._calcParams();
                                    var r = this._concatParams(3);
                                    console.log("离开页面回调", r),
                                        this.collectUpload(r).then(function (e) {
                                            t._clearDataParams();
                                        });
                                },
                            },
                            {
                                key: "onPushStateHandle",
                                value: function (e) {
                                    var t = this;
                                    this._calcParams();
                                    var r = this._concatParams(3);
                                    console.log("页面跳转回调", r),
                                        this.collectUpload(r).then(function (e) {
                                            t._clearDataParams();
                                        });
                                },
                            },
                            {
                                key: "collectUpload",
                                value:
                                    ((i = a(
                                        f().mark(function e(t) {
                                            var r, n, o;
                                            return f().wrap(
                                                function (e) {
                                                    for (;;)
                                                        switch ((e.prev = e.next)) {
                                                            case 0:
                                                                (r = Object.keys(t)),
                                                                    (n = r.map(function (e) {
                                                                        return "".concat(e, "=").concat(t[e]);
                                                                    })),
                                                                    (o = n.join("&"));
                                                                try {
                                                                    (new Image().src = ""
                                                                        .concat(this.baseUrl, "?")
                                                                        .concat(o)),
                                                                        setTimeout(function () {}, 1e3);
                                                                } catch (e) {
                                                                    console.error("上报失败：", e);
                                                                }
                                                                this.commonProperties.is_first = "";
                                                            case 5:
                                                            case "end":
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this
                                            );
                                        })
                                    )),
                                        function (e) {
                                            return i.apply(this, arguments);
                                        }),
                            },
                            {
                                key: "$setBaseUrl",
                                value: function (e) {
                                    e && (C().defaults.baseURL = e);
                                },
                            },
                            {
                                key: "$visit",
                                value: function (e) {
                                    this.autoCollect || (e.page_id && this._visit(e));
                                },
                            },
                            {
                                key: "_visit",
                                value:
                                    ((n = a(
                                        f().mark(function e(t) {
                                            var r, n;
                                            return f().wrap(
                                                function (e) {
                                                    for (;;)
                                                        switch ((e.prev = e.next)) {
                                                            case 0:
                                                                if (
                                                                    (this.getSessionId(),
                                                                        this.commonProperties.fingerprint_id)
                                                                ) {
                                                                    e.next = 4;
                                                                    break;
                                                                }
                                                                return (e.next = 4), this.getFingerprintId();
                                                            case 4:
                                                                (r = {
                                                                    behavior_type: "page_view",
                                                                    url: S.referUrlInstance.url,
                                                                    url_path: S.referUrlInstance.urlPath,
                                                                    url_host: S.referUrlInstance.urlHost,
                                                                    referer: S.referUrlInstance.referUrl,
                                                                    referer_host: S.referUrlInstance.refererHost,
                                                                    source_type: S.referUrlInstance.sourceType,
                                                                }),
                                                                    (this.visitParams = t),
                                                                    (this.params.visitTime = y()),
                                                                    (this.pageSession = S.getUuid(16, 16)),
                                                                    Object.assign(
                                                                        this.visitParams,
                                                                        r,
                                                                        this.commonProperties
                                                                    ),
                                                                    (n = this._concatParams(1)),
                                                                    this.collectUpload(n);
                                                            case 11:
                                                            case "end":
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this
                                            );
                                        })
                                    )),
                                        function (e) {
                                            return n.apply(this, arguments);
                                        }),
                            },
                            {
                                key: "$eventClick",
                                value: function (e) {
                                    this.autoCollect || (e.element_name && this._eventClick(e));
                                },
                            },
                            {
                                key: "_eventClick",
                                value: function (e) {
                                    this.getSessionId(),
                                        Object.assign(
                                            this.eventData,
                                            { behavior_type: "web_click" },
                                            e
                                        );
                                    var t = this._concatParams(2);
                                    this.collectUpload(t);
                                },
                            },
                            {
                                key: "$associate",
                                value:
                                    ((r = a(
                                        f().mark(function e(t) {
                                            return f().wrap(
                                                function (e) {
                                                    for (;;)
                                                        switch ((e.prev = e.next)) {
                                                            case 0:
                                                                if (t.customer_id) {
                                                                    e.next = 2;
                                                                    break;
                                                                }
                                                                return e.abrupt("return");
                                                            case 2:
                                                                this.getSessionId(),
                                                                t.customer_id &&
                                                                t.customer_id !=
                                                                this.commonProperties.customer_id &&
                                                                ((this.commonProperties.customer_id =
                                                                    t.customer_id),
                                                                    b(
                                                                        b({}, t),
                                                                        {},
                                                                        {
                                                                            anonymous_id:
                                                                            this.commonProperties.anonymous_id,
                                                                            behavior_type: "associate",
                                                                        }
                                                                    ));
                                                            case 4:
                                                            case "end":
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this
                                            );
                                        })
                                    )),
                                        function (e) {
                                            return r.apply(this, arguments);
                                        }),
                            },
                            {
                                key: "$loginOut",
                                value:
                                    ((t = a(
                                        f().mark(function e() {
                                            return f().wrap(
                                                function (e) {
                                                    for (;;)
                                                        switch ((e.prev = e.next)) {
                                                            case 0:
                                                                (this.commonProperties.customer_id = ""),
                                                                    localStorage.removeItem("sessionInfo"),
                                                                    localStorage.removeItem("fingerprintId"),
                                                                    localStorage.removeItem("anonymous_id");
                                                            case 4:
                                                            case "end":
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this
                                            );
                                        })
                                    )),
                                        function () {
                                            return t.apply(this, arguments);
                                        }),
                            },
                            {
                                key: "$dispatch",
                                value: function (e) {
                                    this.getSessionId();
                                    var t = b(b({}, e), {}, { behavior_type: "dispatch" });
                                    Object.assign(this.optionsParams, t);
                                    var r = this._concatParams(4);
                                    this.collectUpload(r);
                                },
                            },
                            {
                                key: "_concatParams",
                                value: function (e) {
                                    var t,
                                        r = b({}, this),
                                        n = r.commonProperties,
                                        o = r.pageSession,
                                        i = r.visitParams,
                                        a = r.eventData,
                                        s = r.params,
                                        c = r.optionsParams;
                                    return (
                                        1 === e
                                            ? (t = b(b({}, n), {}, { page_session: o }, i))
                                            : 2 === e
                                                ? (t = b(
                                                    b(b({ page_session: o }, n), a),
                                                    {},
                                                    { page_id: i.page_id }
                                                ))
                                                : 3 === e
                                                    ? (t = b(
                                                        b(b({}, n), s),
                                                        {},
                                                        {
                                                            page_session: o,
                                                            page_id: i.page_id,
                                                            log_type: "system",
                                                            behavior_type: "page_view",
                                                        }
                                                    ))
                                                    : 4 === e &&
                                                    (t = b(
                                                        b(b({}, c), n),
                                                        {},
                                                        { page_session: o, page_id: i.page_id }
                                                    )),
                                            t
                                    );
                                },
                            },
                            {
                                key: "_clearDataParams",
                                value: function () {
                                    this.params = {};
                                },
                            },
                            {
                                key: "_calcParams",
                                value: function () {
                                    this.params.leaveTime = y();
                                    var e = this.params.leaveTime - this.params.visitTime;
                                    (this.params.view_duration = this.params.view_duration + e),
                                        Object.assign(this.params);
                                },
                            },
                            {
                                key: "$getAnonymousId",
                                value: function () {
                                    return this.commonProperties.anonymous_id;
                                },
                            },
                        ]),
                            e
                    );
                })();
                window.Collect = O;
                const B = O;
            })(),
                n.default
        );
    })();
}
let collect = t()
export default collect;
