/*! For license information please see sdk.js.LICENSE.txt */
!(function (e, r) {
	"object" == typeof exports && "object" == typeof module
		? (module.exports = r())
		: "function" == typeof define && define.amd
		? define([], r)
		: "object" == typeof exports
		? (exports.ZLP = r())
		: (e.ZLP = r());
})(self, function () {
	return (() => {
		var e = {
				826: () => {
					var e;
					(e = window) &&
						!e.ZaloPay &&
						(e.ZaloPay = (function (e) {
							"use strict";
							function r(e) {
								return "array" === i(e);
							}
							function t(e) {
								return "function" === i(e);
							}
							function n(e) {
								return "string" === i(e);
							}
							function o(e) {
								return "object" === i(e);
							}
							function s(e) {
								return "number" === i(e);
							}
							function i(e) {
								return Object.prototype.toString
									.call(e)
									.replace(/\[object (\w+)\]/, "$1")
									.toLowerCase();
							}
							function a() {
								var r = +new Date(),
									t = [].slice.call(arguments),
									n = t[0].toLowerCase().trim();
								switch (n) {
									case "error":
										t.splice(0, 1), 1 === t.length ? console.error(r, t[0]) : console.error(r, t);
										break;
									case "warn":
										t.splice(0, 1), 1 === t.length ? console.warn(r, t[0]) : console.warn(r, t);
										break;
									case "info":
										t.splice(0, 1), 1 === t.length ? console.log(r, t[0]) : console.log(r, t);
										break;
									default:
										(n = "info"), 1 === t.length ? console.log(r, t[0]) : console.log(r, t);
								}
								if (e.isDebug && e.call && window.ZaloPayJSBridge && window.ZaloPayJSBridge.call) {
									var o = {type: n, time: r, data: JSON.stringify(t)};
									e.call("writeLog", o);
								}
							}
							function c(e, r) {
								return (
									((e = e || {}).errorCode = e.error || 0),
									1 !== e.error
										? a("error", r + ": errorCode[" + e.errorCode + "], message[" + e.errorMessage + "]")
										: a("info", r + ": errorCode[" + e.errorCode + "], message[" + e.errorMessage + "]"),
									e
								);
							}
							function l(r) {
								var t = e.appVersion.split(".");
								r = r.split(".");
								for (var n, o, s = 0; s < t.length; s++) {
									if ((n = parseInt(r[s], 10) || 0) > (o = parseInt(t[s], 10) || 0)) return -1;
									if (n < o) return 1;
								}
								return 0;
							}
							return (
								((e = e || {}).ua = navigator.userAgent),
								(e.jsVersion = "1.0.0"),
								(e.isDebug = !0),
								(e.isZaloPay = e.ua.indexOf("ZaloPayClient") > -1),
								e.isZaloPay || a("warn", "Run in ZaloPayClient please!"),
								(e.appVersion = (function () {
									if (e.isZaloPay) {
										var r = e.ua.match(/ZaloPayClient\/(.*)/);
										return r && r.length ? r[1] : "";
									}
								})()),
								(e.appInfo = {name: "ZaloPay", isZaloPay: e.isZaloPay, jsVersion: e.jsVersion, appVersion: e.appVersion}),
								(e.on = function (e, r) {
									e.split(/\s+/g).forEach(function (e) {
										document.addEventListener(e, r, !1);
									});
								}),
								(e.call = function () {
									var r = [].slice.call(arguments);
									if (window.ZaloPayJSBridge && window.ZaloPayJSBridge.call) {
										var i = r[0],
											l = r[1] || {},
											u = r[2];
										if (!n(i)) return void a("error", "ZaloPay.call", "Request undefined function!");
										if ((void 0 === u && t(l) && ((u = l), (l = {})), !o(l))) return void a("error", "ZaloPay.call", "Request undefined options!");
										var d = u;
										(u = function (e) {
											(e = c(e, i)), d && d(e);
										}),
											"writeLog" !== i && a("info", "ZaloPayJSBridge.call", i, l, d),
											window.ZaloPayJSBridge.call(i, l, u);
									} else {
										if ("promotionEvent" === r[0]) {
											var m = r[1].deeplinks,
												p = r[1].internalApp;
											if (m && n(m)) window.location.href = m;
											else if (s(p)) return void (window.location.href = "https://zalopay.com.vn/openapp/openapp.html?type=app&appid=" + p);
										}
										(e._apiQueue = e._apiQueue || []), e._apiQueue.push(r);
									}
								}),
								(e._ready = function (r) {
									window.ZaloPayJSBridge && window.ZaloPayJSBridge.call ? r && r() : e.on("ZaloPayJSBridgeReady", r);
								}),
								(e.ready = e.ready || e._ready),
								(e.showLoading = function () {
									e.call("showLoading");
								}),
								(e.hideLoading = function () {
									e.call("hideLoading");
								}),
								(e.closeWindow = function () {
									e.call("closeWindow");
								}),
								(e.showDialog = function (r) {
									o(r)
										? n(r.title) &&
										  n(r.message) &&
										  n(r.button) &&
										  ((r = {type: 2, title: r.title, message: r.message, button: r.button}), e.call("showDialog", r))
										: a("error", "ZaloPay.showDialog", "Received invalid object");
								}),
								(e.showToast = function (r) {
									o(r) ? n(r.message) && ((r = {message: r.message}), e.call("showToast", r)) : a("error", "ZaloPay.showToast", "Received invalid object");
								}),
								(e.showTooltip = function (r) {
									if (o(r)) {
										var t = s(r.position) && r.position > 1 ? r.position : 0;
										n(r.message) &&
											(n(r.iconName) || n(r.iconLink)) &&
											((r = {message: r.message, iconName: r.iconName, iconLink: r.iconLink, position: t}), e.call("showTooltip", r));
									} else a("error", "ZaloPay.showTooltip", "Received invalid object");
								}),
								(e.pushView = function (r) {
									if (o(r))
										return n(r.url) ? ((r = {url: r.url}), void e.call("pushView", r)) : void a("error", "ZaloPay.pushView", "Received missing require param!");
									a("error", "ZaloPay.pushView", "Received invalid object");
								}),
								(e.share = function (r) {
									o(r)
										? s(r.type) &&
										  n(r.caption) &&
										  n(r.content) &&
										  ((r = {type: r.type, caption: r.caption, content: r.content, link: r.link, showShareButton: r.showShareButton}), e.call("share", r))
										: a("error", "ZaloPay.share", "Received invalid object");
								}),
								(e.payOrder = function (r, t) {
									if (o(r))
										return n(r.zptranstoken)
											? (a("info", "ZaloPay.payOrder", "Received zptranstoken", (r = {zptranstoken: r.zptranstoken, appid: r.appid})),
											  void e.call("payOrder", r, t))
											: n(r.mac)
											? (a(
													"info",
													"ZaloPay.payOrder",
													"Received transinfo",
													(r = {
														appid: r.appid,
														appuser: r.appuser,
														apptime: r.apptime,
														amount: r.amount,
														apptransid: r.apptransid,
														embeddata: r.embeddata,
														item: r.item,
														description: r.description,
														mac: r.mac,
													})
											  ),
											  void e.call("payOrder", r, t))
											: void a("error", "ZaloPay.payOrder", "Received missing require param!");
									a("error", "ZaloPay.payOrder", "Received invalid object");
								}),
								(e.transferMoney = function (r, t) {
									if (o(r))
										return n(r.zpid) && n(r.message) && s(r.amount)
											? (a("info", "ZaloPay.transferMoney", "Received transferMoney", (r = {zpid: r.zpid, amount: r.amount, message: r.message})),
											  void e.call("transferMoney", r, t))
											: void a("error", "ZaloPay.transferMoney", "Received missing require param!");
									a("error", "ZaloPay.transferMoney", "Received invalid object");
								}),
								(e.promotionEvent = function (r) {
									if (o(r))
										return s(r.campaignId) && s(r.internalApp)
											? (a(
													"info",
													"ZaloPay.promotionEvent",
													"Received promotionEvent",
													(r = {campaignId: r.campaignId, internalApp: r.internalApp, alternateUrl: r.alternateUrl, deeplinks: r.deeplinks})
											  ),
											  void e.call("promotionEvent", r))
											: s(r.campaignId) && n(r.url) && n(r.packageId)
											? (a(
													"info",
													"ZaloPay.promotionEvent",
													"Received promotionEvent",
													(r = {campaignId: r.campaignId, url: r.url, packageId: r.packageId, alternateUrl: r.alternateUrl, deeplinks: r.deeplinks})
											  ),
											  void e.call("promotionEvent", r))
											: void a("error", "ZaloPay.promotionEvent", "Received missing require param!", r);
									a("error", "ZaloPay.promotionEvent", "Received invalid object");
								}),
								(e.setProperty = function (r, n) {
									o(r)
										? (a("info", "ZaloPay.setProperty", "Received navigator", r), t(n) ? e.call("setProperty", r, n) : e.call("setProperty", r))
										: a("error", "ZaloPay.setProperty", "Received invalid object");
								}),
								(e.setToolbarActions = function (o, s) {
									if (!r(o) || o.length < 1 || !t(s)) a("error", "ZaloPay.setToolbarActions", "Received invalid object");
									else {
										var i = [];
										if (
											(o.forEach(function (e, r) {
												n(e.iconId) &&
													(n(e.iconLink)
														? i.push({iconId: e.iconId, func: s.name, iconLink: e.iconLink, iconName: "", iconColor: ""})
														: n(e.iconName) &&
														  (n(e.iconColor)
																? i.push({iconId: e.iconId, func: s.name, iconLink: "", iconName: e.iconName, iconColor: e.iconColor})
																: i.push({iconId: e.iconId, func: s.name, iconLink: "", iconName: e.iconName, iconColor: ""})));
											}),
											i.length > 0)
										)
											return e.call("setToolbarActions", {data: i}), void document.addEventListener(s.name, s, !1);
										a("error", "ZaloPay.setToolbarActions", "Received missing require param!", o);
									}
								}),
								(e.getUserInfo = function (r, n) {
									t(n) && s(r)
										? (a("info", "ZaloPay.getUserInfo", "Received UserInfo in function callback"), e.call("getUserInfo", {appid: r}, n))
										: a("error", "ZaloPay.getUserInfo", "Received invalid function callback");
								}),
								(e.requestAnimationFrame = function (e) {
									var r = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
									if (r) return r(e);
									a("error", "ZaloPay.requestAnimationFrame", "Not supported!");
								}),
								(e.isSSOSupported = function (r) {
									return e.isZaloPay && l("6.6.0") > 0;
								}),
								e._ready(function () {
									a("info", "ZaloPayJS Ready!");
									var r = e._apiQueue || [];
									function t() {
										e.requestAnimationFrame(function () {
											var n = r.shift();
											e.call.apply(null, n), r.length && t();
										});
									}
									r.length && t();
								}),
								["appinfo", "showLoading", "hideLoading", "closeWindow", "showDialog", "pushView"].forEach(function (r) {
									e[r] = function () {
										var t = [].slice.call(arguments);
										e.call.apply(null, [r].concat(t));
									};
								}),
								(e.subscribe = function (e, r) {
									return window.ZaloPayJSBridge && window.ZaloPayJSBridge.subscribe ? window.ZaloPayJSBridge.subscribe(e, r) : -1;
								}),
								(e.unsubscribe = function (e) {
									window.ZaloPayJSBridge && window.ZaloPayJSBridge.unsubscribe && window.ZaloPayJSBridge.unsubscribe(e);
								}),
								e
							);
						})());
				},
				304: () => {
					!(function () {
						if (!window.ZPI_SPA_SDK) {
							var e = {
									develop: "https://sjs.zalopay.com.vn/mini-app/zpi-spa-sdk",
									sandbox: "https://sjs.zalopay.com.vn/mini-app/zpi-spa-sdk",
									staging: "https://sjs.zalopay.com.vn/mini-app/zpi-spa-sdk",
									production: "https://sjs.zalopay.com.vn/mini-app/zpi-spa-sdk",
								},
								r = {
									__buffer: {
										replay: function (e) {
											for (var r in this.calls) e[r] && this.calls[r](e[r]);
											this.calls = {};
										},
										registerCallback: function (e, r) {
											this.calls[e] = r;
										},
										calls: {},
										env: "",
									},
									getProfile: function (e) {
										var r = this;
										return new Promise(function (t) {
											r.__buffer.registerCallback("getProfile", function (r) {
												r(e).then(t);
											});
										});
									},
									getOTTToken: function () {
										var e = this;
										return new Promise(function (r) {
											e.__buffer.registerCallback("getOTTToken", function (e) {
												e().then(r);
											});
										});
									},
									showOrderPopup: function (e, r) {
										var t = e.zpTransToken,
											n = e.zpAppID;
										this.__buffer.registerCallback("showOrderPopup", function (e) {
											return e({zpTransToken: t, zpAppID: n}, r);
										});
									},
									openOrderPopup: function (e, r) {
										var t = e.zpTransToken,
											n = e.zpAppID;
										this.__buffer.registerCallback("showOrderPopup", function (e) {
											return e({zpTransToken: t, zpAppID: n}, r);
										});
									},
									showFriendList: function (e) {
										this.__buffer.registerCallback("showFriendList", function (r) {
											return r(e);
										});
									},
									navigateTo: function (e) {
										this.__buffer.registerCallback("navigateTo", function (r) {
											return r(e);
										});
									},
									setTitle: function (e) {
										this.__buffer.registerCallback("setTitle", function (r) {
											return r(e);
										});
									},
									scrollTo: function (e, r) {
										this.__buffer.registerCallback("scrollTo", function (t) {
											return t(e, r);
										});
									},
									getLocation: function () {
										this.__buffer.registerCallback("getLocation", function (e) {
											return e();
										});
									},
									handleBlurInput: function () {
										this.__buffer.registerCallback("handleBlurInput", function (e) {
											return e();
										});
									},
									tracking: function (e) {
										this.__buffer.registerCallback("tracking", function (r) {
											return r(e);
										});
									},
									closeApp: function () {
										this.__buffer.registerCallback("closeApp", function (e) {
											return e();
										});
									},
									init: function (t, n) {
										return new Promise(function (o) {
											if (
												(function () {
													try {
														return window.self !== window.top;
													} catch (e) {
														return !0;
													}
												})()
											) {
												var s = e[t];
												if (s) {
													r.__buffer.env = t;
													var i = document.createElement("script");
													if (document.getElementById("ZPI_SPA_SDK")) o && o({error: -1, message: "SDK already exist"});
													else {
														var a = s + "/" + n + "/zpi-spa-sdk.js";
														(i.id = "ZPI_SPA_SDK"),
															(i.src = a),
															o &&
																((i.onload = function () {
																	o({error: 1, message: "Init SDK successfully"});
																}),
																(i.onerror = function () {
																	o({error: -1, message: "Init SDK failed"});
																}));
														try {
															var c = document.getElementsByTagName("body")[0] || document.body;
															if (c) c.appendChild(i);
															else {
																var l = document.getElementsByTagName("script")[0];
																l.parentNode && l.parentNode.insertBefore(i, l);
															}
														} catch (e) {
															o({error: -1, message: "Init SDK failed"});
														}
													}
												} else o && o({error: -1, message: "Invalid domain"});
											} else o && o({error: -1, message: "Not in iframe"});
										});
									},
								};
							window.ZPI_SPA_SDK = r;
						}
					})();
				},
			},
			r = {};
		function t(n) {
			var o = r[n];
			if (void 0 !== o) return o.exports;
			var s = (r[n] = {exports: {}});
			return e[n](s, s.exports, t), s.exports;
		}
		(t.d = (e, r) => {
			for (var n in r) t.o(r, n) && !t.o(e, n) && Object.defineProperty(e, n, {enumerable: !0, get: r[n]});
		}),
			(t.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r));
		var n = {};
		return (
			(() => {
				"use strict";
				t.d(n, {default: () => F});
				t(304), t(826);
				const e = 500;
				class r extends Error {
					constructor(e, r) {
						super(r), (this.code = e), (this.message = r);
					}
				}
				class o extends r {
					constructor() {
						super(1e4, "SDK is not init successfully. Please call ZLP.init() first");
					}
				}
				class s extends r {
					constructor(r) {
						super(e, r);
					}
				}
				class i extends r {
					constructor(e) {
						super(405, `${e} is not supported`);
					}
				}
				class a {
					constructor(e, t, n) {
						if (!n) throw new r(-1, "sdkGetter must be provided");
						(this.appID = e), (this.env = t), (this.sdkGetter = n);
					}
					get sdk() {
						return this.sdkGetter();
					}
				}
				class c {
					constructor(e) {
						this.ctx = e;
					}
				}
				class l {
					constructor(e) {
						this.ctx = e;
					}
				}
				class u extends l {
					constructor(e) {
						super(e);
					}
					createDynamicLink(e) {
						let r = "vn.com.vng.zalopay";
						switch (this.ctx.env) {
							case "develop":
								r = "vn.com.vng.zalopay.sb1";
								break;
							case "staging":
								r = "vn.com.vng.zalopay.stg1";
						}
						return new Promise(async (t, n) => {
							try {
								const n = await fetch("https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDzBNQRpk13FUTLChaRThTVPPjPWpKNTy0", {
										body: JSON.stringify({
											dynamicLinkInfo: {
												domainUriPrefix: "https://zalopay.page.link",
												link: e.originalLink,
												androidInfo: {androidPackageName: r},
												iosInfo: {iosBundleId: "vn.com.vng.zalopay"},
												navigationInfo: {enableForcedRedirect: !0},
												socialMetaTagInfo: {socialTitle: e.title, socialDescription: e.description, socialImageLink: e.imageLink},
											},
										}),
										method: "POST",
									}),
									{shortLink: o} = await n.json();
								t({dynamicLink: o});
							} catch (e) {
								n(e);
							}
						});
					}
				}
				class d extends u {
					constructor(e) {
						super(e);
					}
					async getUserInfo() {
						console.log("From ZPI User");
						let {sdk: e, appID: t} = this.ctx,
							n = await e.getProfile(t);
						if (n.data) {
							let e = n.data.userInfo;
							try {
								let r = atob(n.data.token.split(".")[1]),
									t = JSON.parse(r);
								return {id: t.MUID, access_token: t.MAccessToken, zlp_id: t.ZaloPayID, display_name: e.displayName};
							} catch (e) {
								throw (console.error("Invalid data. token=", n.data.token, e), new s("invalid data. token=" + n.data.token));
							}
						}
						let o = n.error;
						return console.error("err", o), Promise.reject(new r(null == o ? void 0 : o.code, null == o ? void 0 : o.message));
					}
					async getOTToken() {
						let {sdk: e} = this.ctx;
						try {
							let r = await e.getOTTToken();
							return r.data ? {token: r.data.token} : Promise.reject(r);
						} catch (e) {
							return Promise.reject(new Error(e));
						}
					}
				}
				const m = ["localhost/spa", "socialdev.zalopay.vn/spa", "socialsb.zalopay.vn/spa", "socialstg.zalopay.vn/spa", "social.zalopay.vn/spa"];
				class p extends l {
					constructor(e) {
						super(e), this.doProxyNative();
					}
					doProxyNative() {
						this.doProxyCheckLocationPermission(), this.doProxyGetCurrentLocation();
					}
					doProxyCheckLocationPermission() {}
					doProxyGetCurrentLocation() {}
				}
				class h extends p {
					constructor(e) {
						super(e);
					}
					async getCurLocation() {
						let {sdk: e} = this.ctx,
							t = await e.getLocation();
						if ((console.log("loc=", t), t.data)) return Promise.resolve({longitude: t.data.longitude, latitude: t.data.latitude});
						let n = t.error;
						return alert(`Location Err: ${JSON.stringify(t)}`), Promise.reject(new r(null == n ? void 0 : n.code, null == n ? void 0 : n.message));
					}
					openCamera() {
						return Promise.reject(new i("openCamera"));
					}
					chooseImage() {
						return Promise.reject(new i("chooseImage"));
					}
					scanQRCode(e) {
						let {sdk: r} = this.ctx;
						return new Promise((e, t) => {
							try {
								r.openQR((r) => e(r));
							} catch (e) {
								return t(e);
							}
						});
					}
					openTabGroup() {
						let {sdk: e} = this.ctx;
						return new Promise((r, t) => {
							try {
								e.openTabGroup((e) => r(e));
							} catch (e) {
								return t(e);
							}
						});
					}
					platform() {
						return Promise.resolve({platform: "ZPI"});
					}
					clientInfo() {
						return {appVersion: "1.0.0", platform: "zalo", userAgent: navigator.userAgent};
					}
					async getStorageItem(e) {
						try {
							let {sdk: r} = this.ctx;
							const t = await r.getStorageItem(e);
							return t.error ? Promise.reject(t) : Promise.resolve(t);
						} catch (e) {
							return Promise.reject(e);
						}
					}
					async setStorageItem(e, r) {
						try {
							let {sdk: t} = this.ctx;
							const n = await t.setStorageItem(e, r);
							return n.error ? Promise.reject(n) : Promise.resolve(n);
						} catch (e) {
							return Promise.reject(e);
						}
					}
					async getStorageAllItem() {
						try {
							let {sdk: e} = this.ctx;
							const r = await e.getStorageAllItem();
							return r.error ? Promise.reject(r) : Promise.resolve(r);
						} catch (e) {
							return Promise.reject(e);
						}
					}
					async removeStorageItem(e) {
						try {
							let {sdk: r} = this.ctx;
							const t = await r.removeStorageItem(e);
							return t.error ? Promise.reject(t) : Promise.resolve(t);
						} catch (e) {
							return Promise.reject(e);
						}
					}
					async clearStorage() {
						try {
							let {sdk: e} = this.ctx;
							const r = await e.clearStorage();
							return r.error ? Promise.reject(r) : Promise.resolve(r);
						} catch (e) {
							return Promise.reject(e);
						}
					}
					async getStorageInfo() {
						try {
							let {sdk: e} = this.ctx;
							const r = await e.getStorageInfo();
							return r.error ? Promise.reject(r) : Promise.resolve(r);
						} catch (e) {
							return Promise.reject(e);
						}
					}
					subscribe(e, r) {
						return 0;
					}
					unsubscribe(e) {}
				}
				class g extends l {
					constructor(e) {
						super(e);
					}
				}
				class f extends g {
					constructor(e) {
						super(e);
					}
					transfer(e) {
						return Promise.reject(new i("transfer"));
					}
					payOrder(e, t) {
						return new Promise((n, o) => {
							const {sdk: s, appID: i} = this.ctx;
							s.showOrderPopup({zpTransToken: e, callbackURL: t, zpAppID: i}, (e) => {
								1 != (null == e ? void 0 : e.error) ? o(new r(e.error, e.message)) : n({code: 1, message: "Success"});
							});
						});
					}
					payOrderV2(e, t, n) {
						return new Promise((o, s) => {
							const {sdk: i, appID: a} = this.ctx;
							i.openOrderPopupWithResultPage({zpTransToken: e, callbackURL: t, zpAppID: a, options: n}, (e) => {
								1 != (null == e ? void 0 : e.error) ? s(new r(e.error, e.message)) : o({code: 1, message: "Success"});
							});
						});
					}
					payOrderByOrderInfo(e, t) {
						return new Promise((n, o) => {
							const {sdk: s, appID: i} = this.ctx;
							s.showOrderPopupByOrderInfo({orderInfo: e, options: t}, (e) => {
								1 != (null == e ? void 0 : e.error) ? o(new r(e.error, e.message)) : n({code: 1, message: "Success"});
							});
						});
					}
					renderResultCustomArea(e) {
						return Promise.reject(new i("renderResultCustomArea"));
					}
					renderResultExtraButton(e) {
						return Promise.reject(new i("renderResultExtraButton"));
					}
					updateResultStatus(e) {
						return new Promise((r, t) => {
							try {
								this.ctx.sdk.updateOrderStatus(e), r(null);
							} catch (e) {
								t(e);
							}
						});
					}
					openResultPage(e) {
						return new Promise((t, n) => {
							this.ctx.sdk.openResultPage(e, (e) => {
								var o, s;
								(null == e ? void 0 : e.error)
									? n(
											new r(
												null === (o = null == e ? void 0 : e.error) || void 0 === o ? void 0 : o.code,
												null === (s = null == e ? void 0 : e.error) || void 0 === s ? void 0 : s.message
											)
									  )
									: t({code: 1, message: "Success", data: null == e ? void 0 : e.data});
							});
						});
					}
				}
				class w extends l {
					constructor(e) {
						super(e);
					}
				}
				class y extends w {
					constructor(e) {
						super(e);
					}
					showLoading() {
						return Promise.reject(new i("showLoading"));
					}
					hideLoading() {
						return Promise.reject(new i("hideLoading"));
					}
					showDialog(e) {
						return Promise.reject(new i("showDialog"));
					}
					showToolTip(e) {
						return Promise.reject(new i("showToolTip"));
					}
					openShareDialog(e) {
						return Promise.reject(new i("openShareDialog"));
					}
					showToast(e) {
						return Promise.reject(new i("showToast"));
					}
					closeWindow() {
						return new Promise((e, r) => {
							let {sdk: t} = this.ctx;
							try {
								t.closeApp(), e({message: "Success"});
							} catch (e) {
								r(e);
							}
						});
					}
					setToolbarActions(e, r) {
						return Promise.reject(new i("setToolbarActions"));
					}
					pushUrl(e) {
						return Promise.reject(new i("pushUrl"));
					}
					promotionEvent(e) {
						return Promise.reject(new i("promotionEvent"));
					}
					launchDeepLink(e) {
						return new Promise((r, t) => {
							let {sdk: n} = this.ctx;
							try {
								n.navigateTo(e.zpi), r({message: "Success"});
							} catch (e) {
								t(e);
							}
						});
					}
					launchPromotionWebAPP(e) {
						return new Promise((r, t) => {
							let {sdk: n} = this.ctx;
							try {
								n.openInAppRw(e.url, (e) => {
									r(e);
								});
							} catch (e) {
								t(e);
							}
						});
					}
					setUIConfig(e) {
						return Promise.reject(new i("setUIConfig"));
					}
					setTitle(e) {
						return new Promise((r, t) => {
							let {sdk: n} = this.ctx;
							try {
								n.setTitle(e), r({message: "Success"});
							} catch (e) {
								t(e);
							}
						});
					}
					shareFB(e) {
						return Promise.reject(new i("shareFB"));
					}
					showZaloFriendList(e, r) {
						return new Promise((e, t) => {
							try {
								let {sdk: t} = this.ctx;
								t.showFriendList((e) => {
									const {data: t} = e;
									r(t ? [{zaloId: t.receiver_zalo_id, name: t.receiver_name, avatar: t.receiver_avatar}] : []);
								}),
									e({message: "Success"});
							} catch (e) {
								t(e);
							}
						});
					}
				}
				class P extends l {
					constructor(e) {
						super(e);
					}
				}
				var v;
				function k(e, r) {
					let t = e.split(".");
					switch ((3 == t.length && (e = t.slice(1).join(".")), r)) {
						case v.ZPA:
							return `01.${e}`;
						case v.ZPI:
							return `02.${e}`;
						default:
							return e;
					}
				}
				!(function (e) {
					(e[(e.ZPA = 1)] = "ZPA"), (e[(e.ZPI = 2)] = "ZPI");
				})(v || (v = {}));
				class I extends P {
					constructor(e) {
						super(e);
					}
					trackEvent(t, n) {
						return new Promise((o, s) => {
							try {
								(t = k(t, v.ZPI)),
									this.ctx.sdk
										.tracking({eventID: t, metaData: n})
										.then((e) => {
											if (e.error && 0 !== e.error.code) return s(new r(e.error.code, e.error.message));
											o(null);
										})
										.catch((t) => s(new r(e, t.toString())));
							} catch (t) {
								return s(new r(e, t.toString()));
							}
						});
					}
					submitEventTracking(e, r) {
						return Promise.reject(new i("submitEventTracking"));
					}
					submitAnalyticsEvent(e) {
						return Promise.reject(new i("submitAnalyticsEvent"));
					}
					trackScreen(e) {
						return Promise.reject(new i("trackScreen"));
					}
				}
				class S extends c {
					constructor(e) {
						super(e);
					}
					device() {
						return this.mDevice;
					}
					user() {
						return this.mUser;
					}
					payment() {
						return this.mPayment;
					}
					ui() {
						return this.mUI;
					}
					tracking() {
						return this.mTracking;
					}
					async init() {
						if (this.isZPI()) return this.onInitSuccess(), Promise.resolve({error: 1, message: "Init SDK successfully"});
						let e = window.ZPI_SPA_SDK;
						return e
							? e
									.init(this.ctx.env, "0.0.2")
									.then((e) => (1 == e.error ? (this.onInitSuccess(), e) : Promise.reject(new r(e.error, `Init failed with ${e.message}`))))
							: Promise.reject(new s("not in ZaloPay"));
					}
					onInitSuccess() {
						console.log("Init ZPI wrapper"),
							(this.mUser = new d(this.ctx)),
							(this.mDevice = new h(this.ctx)),
							(this.mPayment = new f(this.ctx)),
							(this.mUI = new y(this.ctx)),
							(this.mTracking = new I(this.ctx));
					}
					isZPI() {
						return m.includes(window.location.hostname + "/" + window.location.pathname.split("/")[1]);
					}
				}
				class b extends u {
					constructor(e) {
						super(e);
					}
					async getUserInfo() {
						let {sdk: e, appID: t} = this.ctx;
						return new Promise((n, o) => {
							e.getUserInfo(parseInt(t), (e) => {
								if ((console.log("user info res:", e), 1 === e.error)) {
									let {data: r} = e;
									n({id: r.muid, access_token: r.maccess_token, zlp_id: r.userid, display_name: r.displayname});
								} else o(new r(e.errorCode, e.errorMessage));
							});
						});
					}
					getOTToken() {
						let {sdk: e} = this.ctx;
						return new Promise((r, t) => {
							e.call("getAccessToken", null, async (e) => {
								if (e && e.data)
									try {
										const t = await fetch(`https://graph.zalo.me/v2.0/ottoken?access_token=${e.data.accessToken}`),
											{token: n} = await t.json();
										r({token: n});
									} catch (e) {
										t(e);
									}
								else t(e);
							});
						});
					}
				}
				const x = function (e) {
					return null == e ? 0 : 2 * e.length;
				};
				class T {
					constructor(e, r) {
						(this.data = e), (this.error = r);
					}
					static ok(e) {
						return new T(e, void 0);
					}
					static error(e) {
						return new T(void 0, e);
					}
				}
				class Z {
					constructor(e, r, t) {
						(this.code = e), (this.name = r), (this.message = t);
					}
				}
				const A = "__miniapps__",
					j = new Z(1e3, "ResourceExhausted", "Capacity limit has been reached");
				new Z(1001, "InvalidArgument", "Invalid arguments");
				class _ {
					constructor(e) {
						(this.value = e), (this.lastAccessTime = Date.now());
					}
					toString() {
						return JSON.stringify({val: this.value, lat: this.lastAccessTime});
					}
					static fromString(e) {
						let r = JSON.parse(e),
							t = new _(r.val);
						return (t.lastAccessTime = r.lat), t;
					}
				}
				class z {
					static formatKey(e) {
						return null == e ? "" : e.startsWith(A) ? e : `__miniapps__:${e}`;
					}
					static getItem(e) {
						try {
							e = z.formatKey(e);
							let r = localStorage.getItem(e);
							if (r) {
								let e = _.fromString(r);
								return T.ok(e.value);
							}
							return T.ok(null);
						} catch (e) {
							return T.error(new Z(-1, "UNKNOWN", e.toString()));
						}
					}
					static setItem(e, r) {
						try {
							e = z.formatKey(e);
							let t = new _(r);
							return localStorage.setItem(e, t.toString()), T.ok(!0);
						} catch (e) {
							return "QuotaExceededError" == e.name ? T.error(j) : T.error(new Z(-1, "UNKNOWN", e.toString()));
						}
					}
					static removeItem(e) {
						try {
							return (e = z.formatKey(e)), localStorage.removeItem(e), T.ok(!0);
						} catch (e) {
							return T.error(new Z(-1, "UNKNOWN", e.toString()));
						}
					}
					static cleanUp(e) {
						let r = [];
						for (let e = 0; ; e++) {
							let t = localStorage.key(e);
							if (null == t) break;
							if (t.startsWith(A)) {
								let e = localStorage.getItem(t);
								if (null != e) {
									let n = _.fromString(e);
									r.push({key: t, size: x(t + e), lastAccessTime: n.lastAccessTime});
								}
							}
						}
						r.sort((e, r) => e.lastAccessTime - r.lastAccessTime);
						let t = 0;
						for (; t < e && r.length > 0; ) {
							let e = r.shift();
							e && ((t += e.size), localStorage.removeItem(e.key));
						}
						return t;
					}
				}
				function D(e, r) {
					try {
						let t = z.setItem(e, r);
						if (t.error) {
							if (t.error == j) {
								let t = x(e + r);
								if (z.cleanUp(t) >= t) return D(e, r);
							}
							return T.error(t.error);
						}
						return T.ok(!0);
					} catch (e) {
						return T.error(new Z(-1, "UNKNOWN", e.toString()));
					}
				}
				let C;
				const L = new Z(1e3, "InvalidArgument", "Invalid arguments"),
					O = new Z(1001, "ResourceExhausted", "Capacity limit has been reached");
				function R() {
					if (C) return C;
					throw new Error("AppStorage not initialized");
				}
				class E {
					constructor(e, r) {
						(this.appID = e), (this.maxCapacity = r), (this.items = {}), (this.totalSize = 0);
					}
					storageKey() {
						return `id@${this.appID}`;
					}
					loadData() {
						let e = (function (e) {
							try {
								let r = z.getItem(e);
								return r.error ? T.error(r.error) : r.data ? (z.setItem(e, r.data), T.ok(r.data)) : T.ok(null);
							} catch (e) {
								return T.error(new Z(-1, "UNKNOWN", e.toString()));
							}
						})(this.storageKey());
						if (e.error) throw e.error;
						if (e.data) {
							let r = JSON.parse(e.data);
							for (let e in r) (this.items[e] = r[e]), (this.totalSize += x(e) + x(r[e]));
						}
					}
					storageInfo() {
						return T.ok({quota: this.maxCapacity, remaining: this.maxCapacity - this.totalSize, used: this.totalSize});
					}
					getAllItem() {
						return T.ok(this.items);
					}
					getItem(e) {
						if (e in this.items) {
							let r = this.items[e];
							return T.ok(r);
						}
						return T.ok(null);
					}
					setItem(e, r) {
						if (!e || !r) return T.error(L);
						let t = x(e) + x(r);
						if (this.totalSize + t > this.maxCapacity) return T.error(O);
						let n = Object.assign({}, this.items);
						n[e] = r;
						let o = D(this.storageKey(), JSON.stringify(n));
						return o.error ? T.error(new Z(o.error.code, o.error.name, o.error.message)) : ((this.items = n), (this.totalSize += t), T.ok(!0));
					}
					removeItem(e) {
						if (!(e in this.items)) return T.ok(!0);
						let r = Object.assign({}, this.items);
						delete r[e];
						let t = D(this.storageKey(), JSON.stringify(r));
						if (t.error) return T.error(new Z(t.error.code, t.error.name, t.error.message));
						let n = x(e) + x(this.items[e]);
						return (this.items = r), (this.totalSize -= n), T.ok(!0);
					}
					clearAll() {
						return (
							(this.items = {}),
							(this.totalSize = 0),
							(function (e) {
								try {
									let r = z.removeItem(e);
									return r.error ? T.error(r.error) : T.ok(!0);
								} catch (e) {
									return T.error(new Z(-1, "UNKNOWN", e.toString()));
								}
							})(this.storageKey())
						);
					}
				}
				class N extends p {
					constructor(e) {
						super(e),
							(function (e, r) {
								if (e <= 0 || r <= 0) throw new Error("Invalid params");
								let t = new E(e, r);
								t.loadData(), (C = t);
							})(parseInt(e.appID), 4096);
					}
					getCurLocation() {
						let {sdk: e, appID: t} = this.ctx;
						return new Promise((n, o) => {
							e.getUserInfo(parseInt(t), (e) => {
								if (1 === e.error) {
									let {data: r} = e;
									n({longitude: r.longitude, latitude: r.latitude});
								} else o(new r(e.errorCode, e.errorMessage));
							});
						});
					}
					openCamera() {
						return new Promise((t, n) => {
							try {
								this.ctx.sdk.call("openCamera", {}, (e) => (e.error && 1 != e.error && n(new r(e.error, e.errorMessage)), t({uris: e.uris})));
							} catch (t) {
								return n(new r(e, t.toString()));
							}
						});
					}
					chooseImage() {
						return new Promise((e, t) => {
							try {
								this.ctx.sdk.call("chooseImage", {}, (n) => (n.error && 1 != n.error && t(new r(n.error, n.errorMessage)), e(n.uris)));
							} catch (e) {
								return t(e);
							}
						});
					}
					scanQRCode(e) {
						return new Promise((t, n) => {
							try {
								this.ctx.sdk.call("scanQRCode", e, (e) => (e.error && 1 != e.error && n(new r(e.error, e.errorMessage)), t(e.data)));
							} catch (e) {
								return n(e);
							}
						});
					}
					openTabGroup() {
						return Promise.reject(new i("openTabGroup"));
					}
					platform() {
						return Promise.resolve({platform: "ZPA"});
					}
					clientInfo() {
						return {
							appVersion: this.ctx.sdk.appInfo.appVersion,
							platform: ((e = navigator.userAgent), e.toLowerCase().indexOf("iphone") > -1 ? "ios" : e.toLowerCase().indexOf("android") > -1 ? "android" : "unknow"),
							userAgent: navigator.userAgent,
						};
						var e;
					}
					getStorageItem(e) {
						return new Promise((r, t) => {
							let n = R().getItem(e);
							n.error && t(n), r(n);
						});
					}
					setStorageItem(e, r) {
						return new Promise((t, n) => {
							let o = R().setItem(e, r);
							o.error && n(o), t(o);
						});
					}
					getStorageAllItem() {
						return new Promise((e, r) => {
							let t = R().getAllItem();
							t.error && r(t), e(t);
						});
					}
					removeStorageItem(e) {
						return new Promise((r, t) => {
							let n = R().removeItem(e);
							n.error && t(n), r(n);
						});
					}
					clearStorage() {
						return new Promise((e, r) => {
							let t = R().clearAll();
							t.error && r(t), e(t);
						});
					}
					getStorageInfo() {
						return new Promise((e, r) => {
							let t = R().storageInfo();
							t.error && r(t), e(t);
						});
					}
					subscribe(e, r) {
						return this.ctx.sdk.subscribe(e, r);
					}
					unsubscribe(e) {
						return this.ctx.sdk.unsubscribe(e);
					}
				}
				class U extends g {
					constructor(e) {
						super(e);
					}
					transfer(e) {
						return new Promise((t, n) => {
							let {sdk: o} = this.ctx;
							o.transferMoney({zpid: e.zalopayID, amount: e.amount, message: e.message}, function (e) {
								console.log("transfer resp: ", e), 1 != (null == e ? void 0 : e.error) ? n(new r(e.error, e.errorMessage)) : t({});
							});
						});
					}
					payOrder(e) {
						return new Promise((t, n) => {
							const {sdk: o, appID: s} = this.ctx;
							o.payOrder({zptranstoken: e, appid: s}, (e) => {
								1 != (null == e ? void 0 : e.error) ? n(new r(e.error, e.message)) : t({code: 1, message: "Success"});
							});
						});
					}
					payOrderV2(e) {
						return new Promise((t, n) => {
							const {sdk: o, appID: s} = this.ctx;
							o.call("payOrderV2", {zptranstoken: e, appid: s}, (e) => {
								1 != (null == e ? void 0 : e.error) ? n(new r(e.error, e.message)) : t({code: 1, message: "Success"});
							});
						});
					}
					payOrderByOrderInfo(e) {
						return new Promise((t, n) => {
							const {sdk: o} = this.ctx;
							o.call("payOrderV2", e, (e) => {
								1 != (null == e ? void 0 : e.error) ? n(new r(e.error, e.message)) : t({code: 1, message: "Success"});
							});
						});
					}
					renderResultCustomArea(e) {
						return new Promise((t, n) => {
							this.ctx.sdk.call("executeResultAction", Object.assign({action: "UPDATE_CUSTOM_AREA"}, e), (e) => {
								1 != (null == e ? void 0 : e.error) ? n(new r(e.error, e.message)) : t({code: 1, message: "Success"});
							});
						});
					}
					renderResultExtraButton(e) {
						return new Promise((t, n) => {
							this.ctx.sdk.call("renderResultExtraButton", e, (e) => {
								1 != (null == e ? void 0 : e.error) ? n(new r(e.error, e.message)) : t({code: 1, message: "Success"});
							});
						});
					}
					updateResultStatus(e) {
						return new Promise((t, n) => {
							this.ctx.sdk.call("updateResultStatus", e, (e) => {
								1 != (null == e ? void 0 : e.error) ? n(new r(e.error, e.message)) : t({code: 1, message: "Success"});
							});
						});
					}
					openResultPage(e) {
						return new Promise((t, n) => {
							this.ctx.sdk.call("executeResultAction", {action: "SHOW_RESULT_PAGE", payload: e}, (e) => {
								1 != (null == e ? void 0 : e.error) ? n(new r(e.error, e.message)) : t({code: 1, message: "Success", data: null});
							});
						});
					}
				}
				class B extends w {
					constructor(e) {
						super(e);
					}
					showLoading() {
						return new Promise((e, r) => {
							let {sdk: t} = this.ctx;
							try {
								t.showLoading(), e({message: "Success"});
							} catch (e) {
								r(e);
							}
						});
					}
					hideLoading() {
						return new Promise((e, r) => {
							let {sdk: t} = this.ctx;
							try {
								t.hideLoading(), e({message: "Success"});
							} catch (e) {
								r(e);
							}
						});
					}
					showDialog(e) {
						return new Promise((r, t) => {
							let {sdk: n} = this.ctx;
							try {
								n.showDialog(e), r({message: "Success"});
							} catch (e) {
								t(e);
							}
						});
					}
					showToolTip(e) {
						return new Promise((r, t) => {
							let {sdk: n} = this.ctx;
							try {
								n.showTooltip(e), r({message: "Success"});
							} catch (e) {
								t(e);
							}
						});
					}
					openShareDialog(e) {
						return new Promise((r, t) => {
							let {sdk: n} = this.ctx;
							try {
								n.share(e), r({message: "Success"});
							} catch (e) {
								t(e);
							}
						});
					}
					showToast(e) {
						return new Promise((r, t) => {
							let {sdk: n} = this.ctx;
							try {
								n.showToast({message: e}), r({message: "Success"});
							} catch (e) {
								t(e);
							}
						});
					}
					closeWindow() {
						return new Promise((e, r) => {
							let {sdk: t} = this.ctx;
							try {
								t.closeWindow(), e({message: "Success"});
							} catch (e) {
								r(e);
							}
						});
					}
					setToolbarActions(e, r) {
						return new Promise((r, t) => {
							let {sdk: n} = this.ctx;
							try {
								n.setToolbarActions(e, (e) => {
									console.log("user info res:", e), r({message: "Success"});
								});
							} catch (e) {
								console.log("user info res:", e), t(e);
							}
						});
					}
					pushUrl(e) {
						return new Promise((r, t) => {
							let {sdk: n} = this.ctx;
							try {
								n.pushView({url: e}), r({message: "Success"});
							} catch (e) {
								t(e);
							}
						});
					}
					promotionEvent(e) {
						return new Promise((r, t) => {
							let {sdk: n} = this.ctx;
							try {
								n.promotionEvent(e), r({message: "Success"});
							} catch (e) {
								t(e);
							}
						});
					}
					launchDeepLink(e) {
						return new Promise((r, t) => {
							try {
								return this.ctx.sdk.call("launchDeeplink", {url: e.zpa}), r({message: "Success"});
							} catch (e) {
								return t(e);
							}
						});
					}
					launchPromotionWebAPP(e) {
						return new Promise((r, t) => {
							try {
								let t = {url: e.url, options: {showShareButton: e.showShareButton}};
								return this.ctx.sdk.call("launchPromotionWebApp", t), r({message: "Success"});
							} catch (e) {
								return t(e);
							}
						});
					}
					setUIConfig(t) {
						let n = {};
						return (
							t.statusBar && (n.statusBar = {backgroundColor: t.statusBar.backgroundColor || "", hidden: !1 !== t.statusBar.hidden}),
							t.navigation &&
								(n.navigation = {
									backgroundColor: t.navigation.backgroundColor || "",
									pullToRefresh: !1 !== t.navigation.pullToRefresh,
									titleColor: t.navigation.titleColor || "",
									hidden: !1 !== t.navigation.hidden,
								}),
							new Promise((t, o) => {
								try {
									return this.ctx.sdk.call("setProperty", n), t(null);
								} catch (t) {
									return o(new r(e, t.toString()));
								}
							})
						);
					}
					setTitle(e) {
						return Promise.reject(new i("setTitle"));
					}
					shareFB(t) {
						return new Promise((n, o) => {
							try {
								this.ctx.sdk.call("shareViaFacebook", t, (e) => n({code: e.error}));
							} catch (t) {
								return o(new r(e, t.toString()));
							}
						});
					}
					showZaloFriendList(e, r) {
						return new Promise((t, n) => {
							try {
								this.ctx.sdk.call("showZaloFriendList", e, (e) => {
									const t = [];
									e.data.forEach((e) => {
										const r = {zaloId: e.zaloid, name: e.zaloname, avatar: e.avatar};
										t.push(r);
									}),
										r(t);
								}),
									t({message: "Success"});
							} catch (e) {
								n(e);
							}
						});
					}
				}
				class K extends P {
					constructor(e) {
						super(e);
					}
					trackEvent(e, r) {
						return this.submitEventTracking(e, r);
					}
					submitEventTracking(t, n) {
						return new Promise((o, s) => {
							try {
								return (t = k(t, v.ZPA)), this.ctx.sdk.call("submitEventTracking", {eventId: t, metaData: JSON.stringify(n)}), o(null);
							} catch (t) {
								return s(new r(e, t.toString()));
							}
						});
					}
					submitAnalyticsEvent(t) {
						return new Promise((n, o) => {
							try {
								return this.ctx.sdk.call("submitAnalyticsEvent", t), n(null);
							} catch (t) {
								return o(new r(e, t.toString()));
							}
						});
					}
					trackScreen(t) {
						return new Promise((n, o) => {
							try {
								return this.ctx.sdk.call("trackScreen", {screenName: t}), n(null);
							} catch (t) {
								return o(new r(e, t.toString()));
							}
						});
					}
				}
				class J extends c {
					constructor(e) {
						super(e);
					}
					device() {
						return this.mDevice;
					}
					user() {
						return this.mUser;
					}
					payment() {
						return this.mPayment;
					}
					ui() {
						return this.mUI;
					}
					tracking() {
						return this.mTracking;
					}
					init() {
						let e = this,
							r = window.ZaloPay;
						return new Promise((t, n) => {
							r && r.ready
								? r.ready(function () {
										e.onInitSuccess(), t({error: 1, message: "Success"});
								  })
								: n(new s("failed to init ZPA SDK."));
						});
					}
					onInitSuccess() {
						console.log("Init ZPA wrapper"),
							(this.mUser = new b(this.ctx)),
							(this.mDevice = new N(this.ctx)),
							(this.mPayment = new U(this.ctx)),
							(this.mUI = new B(this.ctx)),
							(this.mTracking = new K(this.ctx));
					}
				}
				let V;
				function W() {
					if (!V) throw new o();
				}
				const F = {
					init: function (e, t) {
						let [n, o] = [window.ZPI_SPA_SDK, window.ZaloPay];
						if (o && o.isZaloPay) {
							return M(
								new a(e, t, function () {
									return window.ZaloPay;
								}),
								J
							)
								? V.init()
								: Promise.reject(new r(10001, "SDK have already initialized"));
						}
						if (n) {
							return M(
								new a(e, t, function () {
									return window.ZPI_SPA_SDK;
								}),
								S
							)
								? V.init()
								: Promise.reject(new r(10001, "SDK have already initialized"));
						}
						return Promise.reject(new Error("Unsupported platform"));
					},
					User: function () {
						return W(), V.user();
					},
					Device: function () {
						return W(), V.device();
					},
					Payment: function () {
						return W(), V.payment();
					},
					UI: function () {
						return W(), V.ui();
					},
					Tracking: function () {
						return W(), V.tracking();
					},
				};
				function M(e, r) {
					return V ? (console.warn("ZLP have already initialized"), !1) : ((V = new r(e)), !0);
				}
			})(),
			(n = n.default)
		);
	})();
});
//# sourceMappingURL=sdk.js.map
