webpackJsonp([1,5],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VendorService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VendorService = (function () {
    function VendorService(http) {
        this.http = http;
        this.roles = __webpack_require__(49);
        this._vendorstorage = localStorage;
        this.initCart();
    }
    VendorService.prototype.initCart = function () {
        // if we dont have  any cart history, create a empty cart
        if (!this._vendorstorage.getItem('vendor')) {
            var emptyMap = {};
            this.setCart(emptyMap);
        }
    };
    VendorService.prototype.saveListOfCartEntities = function (listOfCartEntries) {
        // reduce all the entities to a map
        var vendorMap = listOfCartEntries.reduce(function (map, cartEntry, i) {
            map[cartEntry.product._id] = cartEntry;
            return map;
        }, {});
        // persist the map
        this.setCart(vendorMap);
    };
    VendorService.prototype.getCartEntryByProductId = function (productId) {
        var myvendorMap = this.getCart();
        console.log(myvendorMap);
        console.log(productId);
        return Promise.resolve(myvendorMap[productId]);
    };
    VendorService.prototype.addProductToVendor = function (product, itemQuant) {
        if (itemQuant === undefined) {
            itemQuant = 1;
        }
        var vendorMap = this.getCart();
        if (vendorMap[product._id] != undefined) {
            var vendorInstance = vendorMap[product._id];
            vendorInstance.quantity = vendorInstance.quantity + itemQuant;
            vendorMap[product._id] = vendorInstance;
        }
        else {
            // if not, set default value
            vendorMap[product._id] = {
                'product': product,
                'quantity': itemQuant
            };
        }
        this.setCart(vendorMap);
    };
    VendorService.prototype.getAllCartEntities = function () {
        // get the cart
        var myvendorMap = this.getCart();
        var cartEntities = [];
        // convert the map to an array
        for (var key in myvendorMap) {
            var value = myvendorMap[key];
            cartEntities.push(value);
        }
        // return the array
        return Promise.resolve(cartEntities);
    };
    VendorService.prototype.getCart = function () {
        var vendorAsString = this._vendorstorage.getItem('vendor');
        return JSON.parse(vendorAsString);
    };
    VendorService.prototype.setCart = function (vendorMap) {
        this._vendorstorage.setItem('vendor', JSON.stringify(vendorMap));
    };
    VendorService.prototype.sendVendorInvoice = function (user, product, totalSum, orderNumber) {
        var data = { user: user, product: product, totalSum: totalSum, orderNumber: orderNumber };
        var body = JSON.stringify(data);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('vendor/invoice', body, { headers: headers });
    };
    VendorService.prototype.addInventory = function (add, pID) {
        console.log("in update Inv");
        var data = { pID: pID, add: add };
        return this.http.put('products/addinventory', data);
    };
    VendorService.prototype.saveOrder = function (order, userID, orderNumber, totalSum) {
        console.log("in order service");
        var data = { order: order, userID: userID, orderNumber: orderNumber, totalSum: totalSum };
        console.log(data);
        return this.http.post('vendorOrder/saveorder', data).map(function (res) { return res.json(); });
    };
    VendorService.prototype.getOrderNumber = function () {
        return this.http.get('vendorOrder/orderNumber').map(function (res) { return res.json(); });
    };
    VendorService.prototype.getOrders = function () {
        return this.http.get('vendorOrder/orders').map(function (res) { return res.json(); });
    };
    VendorService.prototype.updateOrderNumber = function () {
        console.log("in update order number services");
        return this.http.get('vendorOrder/updateOrderNumber').map(function (res) { return res.json(); });
    };
    return VendorService;
}());
VendorService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], VendorService);

var _a;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/vendor.service.js.map

/***/ }),

/***/ 164:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 164;


/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(181);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/main.js.map

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.registerUser = function (user) {
        console.log("firstLine of registeruser function");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/register', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/authenticate', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('users/profile', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    AuthService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])();
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    AuthService.prototype.getProduct = function () {
        console.log("in getProduct");
        return this.http.get('products/products')
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getUser = function () {
        return this.http.get('users/users')
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.addProduct = function (product) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        console.log(product);
        console.log("in add product 0");
        headers.append('Content-Type', 'application/json');
        console.log("in add product 01");
        return this.http.post('products/newProduct', product, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.addUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/newUser', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.deleteUser = function (id) {
        return this.http.delete('users/user/' + id)
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.deleteProduct = function (id) {
        return this.http.delete('products/product/' + id)
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.delete = function (id) {
        return this.http.delete('products/product' + id)
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.save = function (product) {
        return this.http.put('products/products', product)
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getVendor = function () {
        console.log("in getVendor");
        return this.http.get('vendors/vendors')
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.deleteVendor = function (id) {
        return this.http.delete('vendors/vendor/' + id)
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.addVendor = function (vendor) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('vendors/newVendor', vendor, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getCoupon = function () {
        console.log("in getProduct");
        return this.http.get('coupons/coupons')
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.addCoupon = function (coupon) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('coupons/newCoupon', coupon, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.deleteCoupon = function (id) {
        return this.http.delete('coupons/coupon/' + id)
            .map(function (res) { return res.json(); });
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/auth.service.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(443),
        styles: [__webpack_require__(359)]
    })
], AppComponent);

//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/app.component.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular_2_local_storage__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular_2_local_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular_2_local_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_navbar_navbar_component__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_register_register_component__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_home_home_component__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_dashboard_dashboard_component__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_cart_cart_component__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_users_users_component__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_vendor_vendor_component__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_orders_orders_component__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_coupon_coupon_component__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_landing_landing_component__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_platform_browser_animations__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_validate_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_cart_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_order_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_vendor_service__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angular2_flash_messages__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__guards_admin_guard__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_cart_sum_pipe__ = __webpack_require__(183);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























var appRoutes = [
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_11__components_home_home_component__["a" /* HomeComponent */] },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_19__components_landing_landing_component__["a" /* LandingComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_10__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'coupon', component: __WEBPACK_IMPORTED_MODULE_18__components_coupon_coupon_component__["a" /* CouponComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_28__guards_admin_guard__["a" /* AdminGuard */]] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_12__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_28__guards_admin_guard__["a" /* AdminGuard */]] },
    { path: 'users', component: __WEBPACK_IMPORTED_MODULE_15__components_users_users_component__["a" /* UsersComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_28__guards_admin_guard__["a" /* AdminGuard */]] },
    { path: 'vendor', component: __WEBPACK_IMPORTED_MODULE_16__components_vendor_vendor_component__["a" /* VendorComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_28__guards_admin_guard__["a" /* AdminGuard */]] },
    { path: 'orders', component: __WEBPACK_IMPORTED_MODULE_17__components_orders_orders_component__["a" /* OrdersComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_28__guards_admin_guard__["a" /* AdminGuard */]] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'cart', component: __WEBPACK_IMPORTED_MODULE_14__components_cart_cart_component__["a" /* CartComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_navbar_navbar_component__["a" /* NavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_cart_cart_component__["a" /* CartComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_users_users_component__["a" /* UsersComponent */],
            __WEBPACK_IMPORTED_MODULE_19__components_landing_landing_component__["a" /* LandingComponent */],
            __WEBPACK_IMPORTED_MODULE_29__components_cart_sum_pipe__["a" /* SumPipe */],
            __WEBPACK_IMPORTED_MODULE_16__components_vendor_vendor_component__["a" /* VendorComponent */],
            __WEBPACK_IMPORTED_MODULE_17__components_orders_orders_component__["a" /* OrdersComponent */],
            __WEBPACK_IMPORTED_MODULE_18__components_coupon_coupon_component__["a" /* CouponComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_5_angular_2_local_storage__["LocalStorageModule"].withConfig({
                prefix: 'my-app',
                storageType: 'localStorage'
            }),
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_26_angular2_flash_messages__["FlashMessagesModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["InputTextModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["DialogModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["PanelModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["SliderModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["DataListModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["SpinnerModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["ContextMenuModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["InputMaskModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["GrowlModule"],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["DataGridModule"],
            __WEBPACK_IMPORTED_MODULE_20__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_6__node_modules_primeng_primeng__["CheckboxModule"]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_21__services_validate_service__["a" /* ValidateService */],
            __WEBPACK_IMPORTED_MODULE_22__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_28__guards_admin_guard__["a" /* AdminGuard */],
            __WEBPACK_IMPORTED_MODULE_23__services_cart_service__["a" /* CartService */],
            __WEBPACK_IMPORTED_MODULE_25__services_vendor_service__["a" /* VendorService */],
            __WEBPACK_IMPORTED_MODULE_24__services_order_service__["a" /* OrderService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/app.module.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_cart_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_order_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_flash_messages__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CartComponent = (function () {
    function CartComponent(http, authService, router, cartService, orderService, flashMessage) {
        this.http = http;
        this.authService = authService;
        this.router = router;
        this.cartService = cartService;
        this.orderService = orderService;
        this.flashMessage = flashMessage;
        this.couponDiscount = 0;
        this.cart = JSON.parse(localStorage.getItem('my-app.cartItem'));
    }
    CartComponent.prototype.getProducts = function () {
        this.cartService.getAllCartEntities().then(function (result) {
            this.cartEntities = result;
            this.calcMax();
        }.bind(this), function (err) {
            alert("something went wrong while fetching the products");
        });
    };
    CartComponent.prototype.removeByProductId = function (productId) {
        // Filter out all cartEntities with given productId,  finally the new stuff from es6 can be used.
        this.cartEntities = this.cartEntities.filter(function (entry) { return entry.product._id != productId; });
        // recalculate max value
        this.calcMax();
        //save to localStorage
        this.cartService.saveListOfCartEntities(this.cartEntities);
    };
    CartComponent.prototype.changeQuantity = function (productId, valueChange) {
        // find the CartEntity we are searching for and perform the action
        var cartEntry = this.cartEntities.find(function (entry) { return entry.product._id === productId; });
        var newValue = cartEntry.quantity + valueChange;
        console.log(newValue, cartEntry.product.inStock);
        // just verify that the user wont do a action that is not permited. ie reduce to 0 or over max
        if (newValue > 0) {
            // set the new value
            cartEntry.quantity = newValue;
            // calculate a new max value
            this.calcMax();
            // save to localStorage
            this.cartService.saveListOfCartEntities(this.cartEntities);
            if (cartEntry.quantity > cartEntry.product.inStock) {
                cartEntry.backorder = true;
            }
            else
                cartEntry.backorder = false;
        }
    };
    CartComponent.prototype.calcMax = function () {
        var subTotalSum = 0;
        //let subTotal;
        this.cartEntities.forEach(function (entity) {
            subTotalSum += (entity.quantity * entity.product.price);
        });
        this.cartEntities.forEach(function (entity) {
            entity.subTotal = (entity.product.price * entity.quantity).toFixed(2);
        });
        console.log(this.subTotalSum);
        this.subTotalSum = subTotalSum.toFixed(2);
        this.couponAmount = ((this.couponDiscount) * subTotalSum).toFixed(2);
        this.totalSum = (subTotalSum - parseFloat(this.couponAmount)).toFixed(2);
    };
    CartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getProducts();
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user;
            _this.email = profile.user.email;
        });
        this.getOrderNumber();
        this.authService.getCoupon().subscribe(function (coupons) {
            _this.coupons = coupons;
        });
    };
    CartComponent.prototype.sendInvoice = function () {
        this.cartService.sendInvoice(this.cartEntities, this.user, this.subTotalSum, this.order.orderNumber).subscribe();
        this.updateInventory();
        this.storeOrder();
        this.orderService.updateOrderNumber().subscribe();
        this.router.navigate(['profile']);
        //localStorage.setItem('cart', null);
        localStorage.removeItem('cart');
        //this.cartService.initCart();
        window.location.reload();
    };
    CartComponent.prototype.updateInventory = function () {
        for (var index in this.cartEntities) {
            var pID = this.cartEntities[index].product._id;
            var temp = this.cartEntities[index].product.inStock;
            var deduct = temp - this.cartEntities[index].quantity;
            this.cartService.updateInventory(deduct, pID).subscribe();
        }
    };
    CartComponent.prototype.storeOrder = function () {
        var _this = this;
        console.log(this.cartEntities);
        var order = [];
        for (var index in this.cartEntities) {
            var product = {
                "name": this.cartEntities[index].product.itemCode,
                "price": this.cartEntities[index].product.price,
                "quantity": this.cartEntities[index].quantity,
                "subTotal": this.cartEntities[index].subTotal
            };
            order.push(product);
        }
        console.log(this.order);
        this.orderService.saveOrder(order, this.user, this.order.orderNumber, this.subTotalSum).subscribe(function (data) {
            if (data.success == true) {
                _this.flashMessage.show('ORDER STORED', {
                    cssClass: 'alert-success',
                    timeout: 5000
                });
            }
        });
    };
    CartComponent.prototype.getOrderNumber = function () {
        var _this = this;
        console.log("dfasffsdafsdag");
        this.orderService.getOrderNumber().subscribe(function (orderNumber) {
            _this.order = orderNumber;
        });
    };
    CartComponent.prototype.useCoupon = function (coupon) {
        var couponDiscount;
        for (var i = 0; i < this.coupons.length; i++) {
            if (this.coupons[i].couponCode == coupon && this.coupons[i].isActive == false) {
                this.flashMessage.show('Coupon Expired', {
                    cssClass: 'alert-danger',
                    timeout: 2000
                });
                break;
            }
            else if (this.coupons[i].couponCode == coupon && this.coupons[i].isActive == true) {
                couponDiscount = (this.coupons[i].discount / 100);
                this.couponDiscount = couponDiscount;
                this.calcMax();
                this.flashMessage.show('Coupon Activated', {
                    cssClass: 'alert-success',
                    timeout: 2000
                });
                break;
            }
            else if ((i + 1) == this.coupons.length && this.coupons[i].couponCode != coupon) {
                this.flashMessage.show('Invalid Coupon', {
                    cssClass: 'alert-danger',
                    timeout: 2000
                });
            }
        }
    };
    return CartComponent;
}());
CartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-cart',
        template: __webpack_require__(444),
        styles: [__webpack_require__(360)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__services_cart_service__["a" /* CartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_cart_service__["a" /* CartService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__services_order_service__["a" /* OrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_order_service__["a" /* OrderService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_angular2_flash_messages__["FlashMessagesService"]) === "function" && _f || Object])
], CartComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/cart.component.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SumPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SumPipe = (function () {
    function SumPipe() {
    }
    SumPipe.prototype.transform = function (value, args) {
        var quantity = parseFloat(args[0]);
        return quantity * value;
    };
    return SumPipe;
}());
SumPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'sum'
    })
], SumPipe);

//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/sum.pipe.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_validate_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CouponComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CouponComponent = (function () {
    function CouponComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
        this.coupon = new PrimeCoupon();
    }
    CouponComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getCoupon().subscribe(function (coupons) {
            _this.coupons = coupons;
        });
    };
    CouponComponent.prototype.showDialogToAdd = function () {
        this.plusCoupon = true;
        this.coupon = new PrimeCoupon();
        this.displayDialog = true;
    };
    CouponComponent.prototype.save = function (pID) {
        var _this = this;
        if (this.plusCoupon) {
            this.authService.addCoupon(this.coupon)
                .subscribe(function (data) {
                if (data.success) {
                    _this.flashMessage.show('Coupon added ', { cssClass: 'alert-success', timeout: 3000 });
                    _this.router.navigate(['/coupon']);
                }
                else {
                    _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
                }
                _this.ngOnInit();
            });
        }
        else {
            //this.editProduct(pID);
        }
        this.coupon = null;
        this.displayDialog = false;
    };
    CouponComponent.prototype.deleteCoupon = function (id) {
        var coupons = this.coupons;
        this.authService.deleteCoupon(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < coupons.length; i++) {
                    if (coupons[i]._id == id) {
                        coupons.splice(i, 1);
                    }
                }
            }
        });
        this.displayDialog = false;
    };
    CouponComponent.prototype.onRowSelect = function (event) {
        this.plusCoupon = false;
        this.coupon = this.cloneCoupon(event.data);
        this.displayDialog = true;
    };
    CouponComponent.prototype.cloneCoupon = function (p) {
        var coupon = new PrimeCoupon();
        for (var prop in p) {
            coupon[prop] = p[prop];
        }
        return coupon;
    };
    return CouponComponent;
}());
CouponComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-coupon',
        template: __webpack_require__(445),
        styles: [__webpack_require__(361)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_validate_service__["a" /* ValidateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _d || Object])
], CouponComponent);

var PrimeCoupon = (function () {
    function PrimeCoupon() {
        this.isActive = true;
    }
    return PrimeCoupon;
}());
var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/coupon.component.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_cart_service__ = __webpack_require__(62);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DashboardComponent = (function () {
    function DashboardComponent(validateService, flashMessage, authService, router, cartService) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
        this.cartService = cartService;
        this.product = new PrimeProduct();
        this.uploadField = document.getElementById("file");
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProduct().subscribe(function (products) {
            _this.products = products;
        });
    };
    DashboardComponent.prototype.onChange = function ($event) {
        if ($event.target.files[0].size < 1048576) {
            this.readThis($event.target);
        }
        ;
        if ($event.target.files[0].size > 1048576) {
            alert("File is too big!");
            $event.target.files[0] = null;
        }
        ;
    };
    DashboardComponent.prototype.readThis = function (inputValue) {
        var _this = this;
        var file = inputValue.files[0];
        var myReader = new FileReader();
        myReader.onloadend = function (e) {
            _this.product.image = myReader.result;
        };
        myReader.readAsDataURL(file);
    };
    DashboardComponent.prototype.deleteProduct = function (id) {
        var products = this.products;
        this.authService.deleteProduct(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i]._id == id) {
                        products.splice(i, 1);
                    }
                }
            }
        });
    };
    DashboardComponent.prototype.showDialogToAdd = function () {
        this.plusProduct = true;
        this.product = new PrimeProduct();
        this.displayDialog = true;
    };
    DashboardComponent.prototype.save = function (product) {
        //var products = products;
        var _this = this;
        if (this.plusProduct) {
            this.authService.addProduct(this.product)
                .subscribe(function (data) {
                if (data.success) {
                    _this.flashMessage.show('Product added ', { cssClass: 'alert-success', timeout: 3000 });
                    _this.router.navigate(['/products']);
                }
                else {
                    _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
                }
                _this.ngOnInit();
            });
        }
        else {
            // this.editProduct(product);
        }
        this.product = null;
        this.displayDialog = false;
    };
    DashboardComponent.prototype.delete = function (id) {
        var products = this.products;
        this.authService.deleteProduct(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i]._id == id) {
                        products.splice(i, 1);
                    }
                }
            }
        });
        this.product = null;
        this.displayDialog = false;
    };
    DashboardComponent.prototype.onRowSelect = function (event) {
        this.plusProduct = false;
        this.product = this.cloneProduct(event.data);
        this.displayDialog = true;
    };
    DashboardComponent.prototype.cloneProduct = function (p) {
        var product = new PrimeProduct();
        for (var prop in p) {
            product[prop] = p[prop];
        }
        return product;
    };
    DashboardComponent.prototype.findSelectedProductIndex = function () {
        return this.products.indexOf(this.selectedProduct);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__(446),
        styles: [__webpack_require__(362)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_cart_service__["a" /* CartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_cart_service__["a" /* CartService */]) === "function" && _e || Object])
], DashboardComponent);

var PrimeProduct = (function () {
    function PrimeProduct() {
    }
    return PrimeProduct;
}());
var _a, _b, _c, _d, _e;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/dashboard.component.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_2_local_storage__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_2_local_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular_2_local_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_cart_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomeComponent = (function () {
    function HomeComponent(authService, flashMessage, localStorageService, cartservice, router) {
        this.authService = authService;
        this.flashMessage = flashMessage;
        this.localStorageService = localStorageService;
        this.cartservice = cartservice;
        this.router = router;
        this.recentItem = "None";
        this.cart = [];
        this.quant = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProduct().subscribe(function (products) {
            _this.products = products;
        });
        this.cartservice.initCart();
    };
    HomeComponent.prototype.addCart = function (product, quant) {
        this.cartservice.getCartEntryByProductId(product._id).then(function (cartEntity) {
            this.cartservice.addProductToCart(product, quant);
            this.flashMessage.show(product.itemCode + ' ' + 'added to your cart', {
                cssClass: 'alert-success',
                timeout: 2000
            });
            //this.router.navigate(['cart']);
        }.bind(this));
        //this.recentItem=name;
        //var iQ= name + " " + this.quant[num];
        //this.cart.push(name);
        //this.cart.push(this.quant[num]);
        //this.localStorageService.set('cartItem',this.cart);
    };
    HomeComponent.prototype.selectProduct = function (product) {
        this.selectedProduct = product;
        this.displayDialog = true;
    };
    HomeComponent.prototype.onDialogHide = function () {
        this.selectedProduct = null;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(447),
        styles: [__webpack_require__(363)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angular_2_local_storage__["LocalStorageService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular_2_local_storage__["LocalStorageService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_cart_service__["a" /* CartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_cart_service__["a" /* CartService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"]) === "function" && _e || Object])
], HomeComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/home.component.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LandingComponent = (function () {
    function LandingComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    LandingComponent.prototype.ngOnInit = function () {
    };
    return LandingComponent;
}());
LandingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-landing',
        template: __webpack_require__(448),
        styles: [__webpack_require__(364)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], LandingComponent);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/landing.component.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var roles = __webpack_require__(49);
var LoginComponent = (function () {
    function LoginComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            username: this.username,
            password: this.password
        };
        this.authService.authenticateUser(user).subscribe(function (data) {
            if (data.success) {
                _this.authService.storeUserData(data.token, data.user);
                _this.flashMessage.show('You are now logged in', {
                    cssClass: 'alert-success',
                    timeout: 5000
                });
                _this.router.navigate(['profile']);
            }
            else {
                _this.flashMessage.show(data.msg, {
                    cssClass: 'alert-danger',
                    timeout: 5000
                });
                _this.router.navigate(['login']);
            }
        });
    };
    LoginComponent.prototype.updateRole = function () {
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(449),
        styles: [__webpack_require__(365)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], LoginComponent);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/login.component.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = (function () {
    function NavbarComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.flashMessage.show('You are logged out', {
            cssClass: 'alert-success',
            timeout: 3000
        });
        this.router.navigate(['/login']);
        return false;
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-navbar',
        template: __webpack_require__(450),
        styles: [__webpack_require__(366)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], NavbarComponent);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/navbar.component.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_order_service__ = __webpack_require__(76);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OrdersComponent = (function () {
    function OrdersComponent(orderService) {
        this.orderService = orderService;
    }
    OrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orderService.getOrders().subscribe(function (orders) {
            _this.orders = orders;
            console.log(_this.orders[1].products);
        });
    };
    return OrdersComponent;
}());
OrdersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-orders',
        template: __webpack_require__(451),
        styles: [__webpack_require__(367)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_order_service__["a" /* OrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_order_service__["a" /* OrderService */]) === "function" && _a || Object])
], OrdersComponent);

var _a;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/orders.component.js.map

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var roles = __webpack_require__(49);
var ProfileComponent = (function () {
    function ProfileComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user;
            _this.role = profile.user.role;
            _this.email = profile.user.email;
            roles.roleType(_this.role);
            roles.setEmail(_this.email);
            console.log(roles.role1);
            console.log(roles.email1);
            //console.log(roles.showNav());
        }, function (err) {
            console.log(_this.role);
            return false;
        });
    };
    ProfileComponent.prototype.toProduct = function () {
        this.router.navigateByUrl('/dashboard');
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__(452),
        styles: [__webpack_require__(368)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _b || Object])
], ProfileComponent);

var _a, _b;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/profile.component.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            fName: this.fName,
            lName: this.lName,
            bName: this.bName,
            email: this.email,
            username: this.username,
            password: this.password,
            role: this.role
        };
        // Required Fields
        if (!this.validateService.validateRegister(user)) {
            this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Validate Email
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Register user
        this.authService.registerUser(user).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/register']);
            }
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-register',
        template: __webpack_require__(453),
        styles: [__webpack_require__(369)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"]) === "function" && _d || Object])
], RegisterComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/register.component.js.map

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsersComponent = (function () {
    function UsersComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
        this.user = new PrimeUser();
        this.msgs = [];
        this.roles = [];
        this.roles.push({ label: 'Admin', value: 'Admin' });
        this.roles.push({ label: 'User', value: 'User' });
        this.states = [];
        this.states.push({ label: 'Alabama', value: 'AL' });
        this.states.push({ label: 'Alaska', value: 'AK' });
        this.states.push({ label: 'Arizona', value: 'AZ' });
        this.states.push({ label: 'Arkansas', value: 'AR' });
        this.states.push({ label: 'California', value: 'CA' });
        this.states.push({ label: 'Colorado', value: 'CO' });
        this.states.push({ label: 'Connecticut', value: 'CT' });
        this.states.push({ label: 'Delaware', value: 'DE' });
        this.states.push({ label: 'Florida', value: 'FL' });
        this.states.push({ label: 'Georgia', value: 'GA' });
        this.states.push({ label: 'Hawaii', value: 'HI' });
        this.states.push({ label: 'Idaho', value: 'ID' });
        this.states.push({ label: 'Illinois', value: 'IL' });
        this.states.push({ label: 'Indiana', value: 'IN' });
        this.states.push({ label: 'Iowa', value: 'IA' });
        this.states.push({ label: 'Kansas', value: 'KS' });
        this.states.push({ label: 'Kentucky', value: 'KY' });
        this.states.push({ label: 'Louisiana', value: 'LA' });
        this.states.push({ label: 'Maine', value: 'ME' });
        this.states.push({ label: 'Maryland', value: 'MD' });
        this.states.push({ label: 'Massachusetts', value: 'MA' });
        this.states.push({ label: 'Michigan', value: 'MI' });
        this.states.push({ label: 'Minnesota', value: 'MN' });
        this.states.push({ label: 'Mississippi', value: 'MS' });
        this.states.push({ label: 'Missouri', value: 'MO' });
        this.states.push({ label: 'Montana', value: 'MT' });
        this.states.push({ label: 'Nebraska', value: 'NE' });
        this.states.push({ label: 'Nevada', value: 'NV' });
        this.states.push({ label: 'New Hampshire', value: 'NH' });
        this.states.push({ label: 'New Jersey', value: 'NJ' });
        this.states.push({ label: 'New Mexico', value: 'NM' });
        this.states.push({ label: 'New York', value: 'NY' });
        this.states.push({ label: 'North Carolina', value: 'NC' });
        this.states.push({ label: 'North Dakota', value: 'ND' });
        this.states.push({ label: 'Ohio', value: 'OH' });
        this.states.push({ label: 'Oklahoma', value: 'OK' });
        this.states.push({ label: 'Oregon', value: 'OR' });
        this.states.push({ label: 'Pennsylvania', value: 'PA' });
        this.states.push({ label: 'Rhode Island', value: 'RI' });
        this.states.push({ label: 'South Carolina', value: 'SC' });
        this.states.push({ label: 'South Dakota', value: 'SD' });
        this.states.push({ label: 'Tennessee', value: 'TN' });
        this.states.push({ label: 'Texas', value: 'TX' });
        this.states.push({ label: 'Utah', value: 'UT' });
        this.states.push({ label: 'Vermont', value: 'VT' });
        this.states.push({ label: 'Virginia', value: 'VA' });
        this.states.push({ label: 'Washington', value: 'WA' });
        this.states.push({ label: 'West Virginia', value: 'WV' });
        this.states.push({ label: 'Wisconsin', value: 'WI' });
        this.states.push({ label: 'Wyoming', value: 'WY' });
        this.states.push({ label: 'District of Columbia', value: 'DC' });
        this.regions = [];
        this.regions.push({ label: 'All regions', value: null });
        this.regions.push({ label: 'South-East', value: 'SE' });
        this.regions.push({ label: 'Mid-West', value: 'MW' });
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getUser().subscribe(function (users) {
            _this.users = users;
        });
        this.items = [
            { label: 'View details', command: function (event) { return _this.viewUser(_this.selectedUser); } }
        ];
        this.detailDialog = false;
    };
    UsersComponent.prototype.delete = function (id) {
        var users = this.users;
        this.authService.deleteUser(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i]._id == id) {
                        users.splice(i, 1);
                    }
                }
            }
        });
    };
    UsersComponent.prototype.showDialogToAdd = function () {
        document.getElementById("saveUser").setAttribute("disabled", "disabled");
        this.plusUser = true;
        this.user = new PrimeUser();
        this.displayDialog = true;
    };
    UsersComponent.prototype.save = function () {
        var _this = this;
        //var users = users;
        if (this.plusUser) {
            var emailChecker = this.checkEmail(this.user.email);
            var usernameChecker = this.checkUsername(this.user.username);
            if (emailChecker === true && usernameChecker === true) {
                this.authService.addUser(this.user).subscribe(function (data) {
                    if (data.success) {
                        _this.flashMessage.show('User registered ', { cssClass: 'alert-success', timeout: 3000 });
                        _this.router.navigate(['/users']);
                        _this.user = null;
                        _this.displayDialog = false;
                    }
                    else {
                    }
                    _this.ngOnInit();
                });
            }
            else if (emailChecker === false) {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: 'Registration Error', detail: 'Invalid email' });
            }
            else if (usernameChecker === false) {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: 'Registration Error', detail: 'Duplicate Username' });
            }
        }
        else {
            this.authService.save(this.user);
        }
    };
    UsersComponent.prototype.deleteUser = function (id) {
        var users = this.users;
        this.authService.deleteUser(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i]._id == id) {
                        users.splice(i, 1);
                    }
                }
            }
        });
        this.user = null;
        this.displayDialog = false;
    };
    UsersComponent.prototype.onRowSelect = function (event) {
        this.plusUser = false;
        this.user = this.cloneUser(event.data);
        this.displayDialog = true;
        document.getElementById("saveUser").removeAttribute("disabled");
    };
    UsersComponent.prototype.cloneUser = function (u) {
        var user = new PrimeUser();
        for (var prop in u) {
            user[prop] = u[prop];
        }
        return user;
    };
    UsersComponent.prototype.findSelectedUserIndex = function () {
        return this.users.indexOf(this.selectedUser);
    };
    UsersComponent.prototype.checkEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    UsersComponent.prototype.checkEmpty = function () {
        if (this.user.email && this.user.username && this.user.password && this.user.role) {
            document.getElementById("saveUser").removeAttribute("disabled");
        }
        // console.log(this.user.email);
        //   console.log(this.user.username);
        //   console.log(this.user.password);
        //   console.log(this.user.role);
    };
    UsersComponent.prototype.checkUsername = function (username) {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].username == username) {
                return false;
            }
        }
        return true;
    };
    UsersComponent.prototype.viewUser = function (user) {
        if (!this.detailDialog) {
            this.detailDialog = true;
            console.log(user.email);
            this.selectUserEmail = user.email;
            this.selectUserAddr = user.address;
            this.selectUserCity = user.city;
            this.selectUserState = user.state;
            this.selectUserZip = user.zip.toString();
        }
        else {
            this.detailDialog = false;
        }
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-users',
        template: __webpack_require__(454),
        styles: [__webpack_require__(370)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"]) === "function" && _d || Object])
], UsersComponent);

var PrimeUser = (function () {
    function PrimeUser() {
    }
    return PrimeUser;
}());
var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/users.component.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_vendor_service__ = __webpack_require__(108);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VendorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VendorComponent = (function () {
    function VendorComponent(vendorService, flashMessage, authService, router) {
        this.vendorService = vendorService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
        this.product = new PrimeProduct();
        this.quant = [];
        this.show = false;
        this.showProduct = true;
    }
    VendorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getOrderNumber();
        this.authService.getProduct().subscribe(function (products) {
            _this.products = products;
        });
        this.getProducts();
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user;
            _this.email = profile.user.email;
        });
    };
    VendorComponent.prototype.onChange = function ($event) {
        if ($event.target.files[0].size < 1048576) {
            this.readThis($event.target);
        }
        ;
        if ($event.target.files[0].size > 1048576) {
            alert("File is too big!");
            $event.target.files[0] = null;
        }
        ;
    };
    VendorComponent.prototype.readThis = function (inputValue) {
        var _this = this;
        var file = inputValue.files[0];
        var myReader = new FileReader();
        myReader.onloadend = function (e) {
            _this.product.image = myReader.result;
        };
        myReader.readAsDataURL(file);
    };
    VendorComponent.prototype.showDialogToAdd = function () {
        this.plusProduct = true;
        this.product = new PrimeProduct();
        this.displayDialog = true;
    };
    VendorComponent.prototype.save = function () {
        var _this = this;
        var products = products;
        if (this.plusProduct) {
            this.authService.addProduct(this.product)
                .subscribe(function (data) {
                if (data.success) {
                    _this.flashMessage.show('Product added ', { cssClass: 'alert-success', timeout: 3000 });
                    _this.router.navigate(['/vendor']);
                }
                else {
                    _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
                }
                //this.ngOnInit();
            });
        }
        else {
            this.authService.save(this.product);
        }
        this.product = null;
        this.displayDialog = false;
    };
    VendorComponent.prototype.delete = function (id) {
        var products = this.products;
        this.authService.deleteProduct(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i]._id == id) {
                        products.splice(i, 1);
                    }
                }
            }
        });
        this.product = null;
        this.displayDialog = false;
    };
    VendorComponent.prototype.onRowSelect = function (event) {
        this.plusProduct = false;
        this.product = this.cloneProduct(event.data);
        this.displayDialog = true;
    };
    VendorComponent.prototype.cloneProduct = function (p) {
        var product = new PrimeProduct();
        for (var prop in p) {
            product[prop] = p[prop];
        }
        return product;
    };
    VendorComponent.prototype.findSelectedProductIndex = function () {
        return this.products.indexOf(this.selectedProduct);
    };
    VendorComponent.prototype.updateInventory = function () {
        for (var index in this.cartEntities) {
            var pID = this.cartEntities[index].product._id;
            var temp = this.cartEntities[index].product.inStock;
            var add = temp + this.cartEntities[index].quantity;
            console.log(add);
            this.vendorService.addInventory(add, pID).subscribe();
            //console.log(deduct)
        }
    };
    VendorComponent.prototype.addCart = function (product, quant) {
        console.log(product._id);
        this.vendorService.getCartEntryByProductId(product._id).then(function (cartEntity) {
            this.vendorService.addProductToVendor(product, quant);
            this.flashMessage.show(product.itemCode + ' ' + 'added to your cart', {
                cssClass: 'alert-success',
                timeout: 2000
            });
            //this.router.navigate(['cart']);
            this.ngOnInit();
        }.bind(this));
    };
    VendorComponent.prototype.changeQuantity = function (productId, valueChange) {
        // find the CartEntity we are searching for and perform the action
        var cartEntry = this.cartEntities.find(function (entry) { return entry.product._id === productId; });
        var newValue = cartEntry.quantity + valueChange;
        console.log(newValue, cartEntry.product.inStock);
        // just verify that the user wont do a action that is not permited. ie reduce to 0 or over max
        if (newValue > 0 && newValue <= cartEntry.product.inStock) {
            // set the new value
            cartEntry.quantity = newValue;
            // calculate a new max value
            this.calcMax();
            // save to localStorage
            this.vendorService.saveListOfCartEntities(this.cartEntities);
        }
    };
    VendorComponent.prototype.calcMax = function () {
        var totalSum = 0;
        //let subTotal;
        this.cartEntities.forEach(function (entity) {
            totalSum += (entity.quantity * entity.product.vendorPrice);
        });
        this.cartEntities.forEach(function (entity) {
            entity.subTotal = (entity.product.vendorPrice * entity.quantity).toFixed(2);
        });
        console.log(this.totalSum);
        this.totalSum = totalSum.toFixed(2);
    };
    VendorComponent.prototype.sendInvoice = function () {
        //this.vendorService.sendVendorInvoice(this.user, this.cartEntities, this.totalSum, this.order.orderNumber).subscribe();
        this.updateInventory();
        this.storeOrder();
        this.vendorService.updateOrderNumber().subscribe();
        this.router.navigate(['profile']);
        localStorage.removeItem('vendor');
    };
    VendorComponent.prototype.getProducts = function () {
        this.vendorService.getAllCartEntities().then(function (result) {
            this.cartEntities = result;
            this.calcMax();
        }.bind(this), function (err) {
            alert("something went wrong while fetching the products");
        });
    };
    VendorComponent.prototype.removeByProductId = function (productId) {
        // Filter out all cartEntities with given productId,  finally the new stuff from es6 can be used.
        this.cartEntities = this.cartEntities.filter(function (entry) { return entry.product._id != productId; });
        // recalculate max value
        this.calcMax();
        //save to localStorage
        this.vendorService.saveListOfCartEntities(this.cartEntities);
    };
    VendorComponent.prototype.storeOrder = function () {
        var _this = this;
        console.log(this.cartEntities);
        var order = [];
        for (var index in this.cartEntities) {
            var product = {
                "name": this.cartEntities[index].product.itemCode,
                "price": this.cartEntities[index].product.vendorPrice,
                "quantity": this.cartEntities[index].quantity,
                "subTotal": this.cartEntities[index].subTotal
            };
            order.push(product);
        }
        console.log(this.order);
        this.vendorService.saveOrder(order, this.user, this.order.vendorOrderNumber, this.totalSum).subscribe(function (data) {
            if (data.success == true) {
                _this.flashMessage.show('ORDER STORED', {
                    cssClass: 'alert-success',
                    timeout: 5000
                });
            }
        });
    };
    VendorComponent.prototype.getOrderNumber = function () {
        var _this = this;
        this.vendorService.getOrderNumber().subscribe(function (vendorOrderNumber) {
            _this.order = vendorOrderNumber;
        });
        console.log("inside of ordernumver" + this.order);
    };
    return VendorComponent;
}());
VendorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-vendor',
        template: __webpack_require__(455),
        styles: [__webpack_require__(371)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_vendor_service__["a" /* VendorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_vendor_service__["a" /* VendorService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _d || Object])
], VendorComponent);

var PrimeProduct = (function () {
    function PrimeProduct() {
    }
    return PrimeProduct;
}());
var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/vendor.component.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var roles = __webpack_require__(49);
var AdminGuard = (function () {
    function AdminGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AdminGuard.prototype.ngOnInit = function () {
    };
    AdminGuard.prototype.canActivate = function () {
        if (roles.role1 === "Admin" || roles.role1 === "admin") {
            return true;
        }
        else {
            this.router.navigate(['/profile']);
            return false;
        }
    };
    return AdminGuard;
}());
AdminGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object])
], AdminGuard);

var _a, _b;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/admin.guard.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/auth.guard.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/environment.js.map

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "#cartHeader{\r\n    text-transform: uppercase;\r\n    font-family: 'PT Sans Narrow', Arial, sans-serif;\r\n    font-size: 15px;\r\n    font-weight: bold;\r\n}\r\n\r\n#number{\r\n    font-family: 'PT Sans Narrow', Arial, sans-serif;\r\n    font-size: 12px;\r\n}\r\n\r\n.btn-danger{\r\n    background-color: orangered;\r\n    transition: .5s ease;\r\n    bottom: 6px;\r\n}\r\n\r\n.btn-danger:hover{\r\nbackground-color: #ededed !important;\r\ncolor: #3c3c3c !important;\r\nborder: 1px solid #fff !important;\r\n\r\n}\r\n\r\n.btn-primary{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n.btn-primary:hover{\r\n    background-color: dodgerblue !important;\r\n    color: black !important;\r\n    border: 1px solid dodgerblue;\r\n}\r\n\r\n.btn-success{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n\r\n.btn-success:hover{\r\n    background-color: limegreen !important;\r\n    color: black;\r\n    border: 1px solid limegreen;\r\n}\r\n\r\n#cartSum{\r\n    font-family: 'PT Sans Narrow', Arial, sans-serif;\r\n    font-size: 15px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".btn-primary{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n.btn-primary:hover{\r\n    background-color: dodgerblue !important;\r\n    color: black !important;\r\n    border: 1px solid dodgerblue;\r\n}\r\n\r\n.btn-info{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n.btn-info:hover{\r\n    background-color: gainsboro !important;\r\n    color: black !important;\r\n    border: 1px solid gainsboro;\r\n}\r\n\r\n\r\n.btn-success{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n\r\n.btn-success:hover{\r\n    background-color: limegreen !important;\r\n    color: black;\r\n    border: 1px solid limegreen;\r\n}\r\n\r\n.btn-danger{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n\r\n.btn-danger:hover{\r\nbackground-color: red !important;\r\ncolor: gainsboro!important;\r\nborder: 1px solid red !important;\r\n\r\n}\r\nbutton{\r\n    bottom: 5px;\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".btn-primary{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n.btn-primary:hover{\r\n    background-color: dodgerblue !important;\r\n    color: black !important;\r\n    border: 1px solid dodgerblue;\r\n}\r\n\r\n.ui-button.orange-button{\r\n    background-color: orange;\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "h1{\r\n    text-align: center;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".form-group{\r\n    font-family: 'PT Sans Narrow', Arial, sans-serif;\r\n    font-size: 15px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "/*NAVIGATION*/\r\n\r\n.three-d {\r\n\t-webkit-perspective: 200px;\r\n\t        perspective: 200px;\r\n\ttransition: all .07s linear;\r\n\tposition: relative;\r\n\tcursor: pointer;\r\n}\r\n\t/* complete the animation! */\r\n\t.three-d:hover .three-d-box, \r\n\t.three-d:focus .three-d-box {\r\n\t\t-webkit-transform: translateZ(-25px) rotateX(90deg);\r\n\t\t        transform: translateZ(-25px) rotateX(90deg);\r\n\t}\r\n\r\n.three-d-box {\r\n\ttransition: all .3s ease-out;\r\n\t-webkit-transform: translatez(-25px);\r\n\t        transform: translatez(-25px);\r\n\t-webkit-transform-style: preserve-3d;\r\n\t        transform-style: preserve-3d;\r\n\tpointer-events: none;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tdisplay: block;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n}\r\n\r\n/* \r\n\tput the \"front\" and \"back\" elements into place with CSS transforms, \r\n\tspecifically translation and translatez\r\n*/\r\n.front {\r\n\t-webkit-transform: rotatex(0deg) translatez(25px);\r\n\t        transform: rotatex(0deg) translatez(25px);\r\n}\r\n\r\n.back {\r\n\t-webkit-transform: rotatex(-90deg) translatez(25px);\r\n\t        transform: rotatex(-90deg) translatez(25px);\r\n\tcolor: #ffe7c4;\r\n}\r\n\r\n.front, .back {\r\n\tdisplay: block;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tbackground: grey;\r\n\tpadding: 15px 10px;\r\n\tcolor: white;\r\n\tpointer-events: none;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.navbar{\r\n    background-color: #222222;\r\n    text-transform: uppercase;\r\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n    font-weight: 700;\r\n    \r\n}\r\n\r\n.navbar-custom {\r\n  background-color: #222222;\r\n  border-color: transparent;\r\n}\r\n/*.navbar-custom .navbar-brand {\r\n  color: #fed136;\r\n  font-family: \"Kaushan Script\", \"Helvetica Neue\", Helvetica, Arial, cursive;\r\n}*/\r\n.navbar-custom .navbar-brand:hover,\r\n.navbar-custom .navbar-brand:focus,\r\n.navbar-custom .navbar-brand:active,\r\n.navbar-custom .navbar-brand.active {\r\n  color: whitesmoke;\r\n}\r\n.navbar-custom .navbar-collapse {\r\n  border-color: rgba(255, 255, 255, 0.02);\r\n}\r\n.navbar-custom .navbar-toggle {\r\n  background-color: #fed136;\r\n  border-color: #fed136;\r\n  font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  text-transform: uppercase;\r\n  color: white;\r\n  font-size: 12px;\r\n}\r\n.navbar-custom .navbar-toggle:hover,\r\n.navbar-custom .navbar-toggle:focus {\r\n  background-color: #fed136;\r\n}\r\n/*.navbar-custom .nav li a {\r\n  font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  text-transform: uppercase;\r\n  font-weight: 400;\r\n  letter-spacing: 1px;\r\n  color: white;\r\n}\r\n.navbar-custom .nav li a:hover,\r\n.navbar-custom .nav li a:focus {\r\n  color: #fed136;\r\n  outline: none;\r\n}*/\r\n/*.navbar-custom .navbar-nav > .active > a {\r\n  border-radius: 0;\r\n  color: white;\r\n  background-color: #fed136;\r\n}\r\n.navbar-custom .navbar-nav > .active > a:hover,\r\n.navbar-custom .navbar-nav > .active > a:focus {\r\n  color: white;\r\n  background-color: #fec503;\r\n}*/\r\n@media (min-width: 768px) {\r\n  .navbar-custom {\r\n    background-color: transparent;\r\n    transition: padding 0.3s;\r\n    border: none;\r\n  }\r\n  .navbar-custom .navbar-brand {\r\n    font-size: 2em;\r\n    transition: all 0.3s;\r\n  }\r\n  .navbar-custom .navbar-nav > .active > a {\r\n    border-radius: 3px;\r\n  }\r\n}\r\n/*@media (min-width: 768px) {\r\n  .navbar-custom.affix {\r\n    background-color: #222222;\r\n    padding: 10px 0;\r\n  }\r\n  .navbar-custom.affix .navbar-brand {\r\n    font-size: 1.5em;\r\n  }\r\n}*/\r\n\r\nul#nav li:hover a{\r\n    background-color: transparent;\r\n    color: dodgerblue;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".page-header{\r\n    text-transform: uppercase;\r\n    font-family: 'PT Sans Narrow', Arial, sans-serif;\r\n}\r\n\r\n.list-group-item{\r\n    font-family: 'PT Sans Narrow', Arial, sans-serif;\r\n    font-size: 15px;\r\n}\r\n\r\n.btn-primary{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n.btn-primary:hover{\r\n    background-color: dodgerblue !important;\r\n    color: black !important;\r\n    border: 1px solid dodgerblue;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".btn-primary{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n.btn-primary:hover{\r\n    background-color: dodgerblue !important;\r\n    color: black !important;\r\n    border: 1px solid dodgerblue;\r\n}\r\n\r\n.btn-info{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n.btn-info:hover{\r\n    background-color: gainsboro !important;\r\n    color: black !important;\r\n    border: 1px solid gainsboro;\r\n}\r\n\r\n\r\n.btn-success{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n\r\n\r\n.btn-success:hover:enabled{\r\n    background-color: limegreen !important;\r\n    color: black;\r\n    border: 1px solid limegreen;\r\n}\r\n\r\n.btn-danger{\r\n    background-color: #9ea8a0 !important;\r\n    color: white;\r\n    transition: .5s ease;\r\n    border: 1px solid #9ea8a0;\r\n}\r\n\r\n.btn-danger:hover{\r\nbackground-color: red !important;\r\ncolor: gainsboro!important;\r\nborder: 1px solid red !important;\r\n\r\n}\r\n\r\n/*button{\r\n    background-color: dimgrey !important;\r\n    border: whitesmoke !important;\r\n    bottom: 5px;\r\n}*/\r\n\r\n\r\n.ui-inputtext#fName{\r\n    width: 150px;\r\n}\r\n.ui-inputtext#lName{\r\n    width: 150px;\r\n}\r\n\r\n.hidden{\r\n    visibility: hidden;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 443:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\r\n<div class=\"container\">\r\n  <br>\r\n  <br>\r\n  <br>\r\n  <flash-messages></flash-messages>\r\n  <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ }),

/***/ 444:
/***/ (function(module, exports) {

module.exports = "<h2> Cart Review</h2>\r\n\r\n\r\n            <p class=\"bg-info\" *ngIf=\"cartEntities && cartEntities.length == 0\">... is empty</p>\r\n\r\n                <div class=\"ui-g\" id=\"cartHeader\">\r\n                    <div class=\"ui-lg-4 ui-md-4 ui-sm-4\" >Item Name</div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">Qty</div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">Unit Price</div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">Sub-Total</div>\r\n                </div>\r\n            <hr>\r\n                <div class=\"ui-g\" id=\"cartBody\" *ngFor=\"let cartEntity of cartEntities\">\r\n                    <div class=\"ui-lg-4 ui-md-4 ui-sm-4\" ><h4><p>{{cartEntity.product.description}}</p>\r\n                    <span>Status: </span> <ng-template #elseBlock><span class=\"text-success\">In Stock </span></ng-template>\r\n                    <div *ngIf=\"cartEntity.backorder; else elseBlock\"><span class=\"text-danger\"> On Backorder for quantity selected </span></div>\r\n                    </h4></div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">\r\n                        <span (click)=changeQuantity(cartEntity.product._id,-1) class=\"fa fa-minus\" style=\"cursor:pointer\"></span>&nbsp; &nbsp;<span id=\"number\">{{cartEntity.quantity}}</span>&nbsp; &nbsp;<span (click)=changeQuantity(cartEntity.product._id,1) class=\"fa fa-plus pointer\" style=\"cursor:pointer\"></span>\r\n                    </div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">\r\n                        <span id=\"number\">${{cartEntity.product.price}}</span>\r\n                    </div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">\r\n\r\n                        <span id=\"number\" decimals=\".01\"> ${{cartEntity.subTotal}}</span>\r\n\r\n                    </div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">\r\n                        <button type=\"button\" pButton icon=\"fa-remove\" style=\"float:left\" (click)=\"removeByProductId(cartEntity.product._id)\" class=\"btn btn-danger\" label=\"Remove\"></button>\r\n                    </div>          \r\n                </div>\r\n            <hr>\r\n            \r\n            <div class=\"ui-g\" id=\"cartSum\">\r\n                <div class=\"ui-lg-8\"></div>\r\n                <div class=\"ui-lg-2 ui-md-6 ui-sm-6\" style=\"font-weight: bold;\">SubTotal: </div>\r\n                <div class=\"ui-lg-2 ui-md-6 ui-sm-6\">${{subTotalSum}} </div>                \r\n               \r\n                <div class=\"ui-lg-8\"><input pInputText id=\"coupon\" [(ngModel)]=\"coupon\" size=\"20\" />\r\n                <button pButton type=\"button\" class=\"btn btn-primary\" label=\"ENTER COUPON\" (click)=\"useCoupon(coupon)\"></button> </div>\r\n                <div class=\"ui-lg-2 ui-md-6 ui-sm-6\" style=\"font-weight: bold;\">Discount: </div>\r\n                <div class=\"ui-lg-2 ui-md-6 ui-sm-6\">${{couponAmount}}</div>\r\n\r\n                <div class=\"ui-lg-8\"></div>\r\n                <div class=\"ui-lg-2 ui-md-6 ui-sm-6\" style=\"font-weight: bold;\">Total: </div>\r\n                <div class=\"ui-lg-2 ui-md-6 ui-sm-6\">${{totalSum}} </div>   \r\n            </div>\r\n            <hr>\r\n            <div class=\"ui-g\">\r\n                <div class=\"ui-lg-3 ui-md-6 ui-sm-6\"><a [routerLink]=\"['']\"><button pButton type=\"button\" class=\"btn btn-primary\" icon=\"fa-shopping-cart\" label=\"CONTINUE SHOPPING\"></button></a></div>\r\n                <div class=\"ui-lg-6\"><br></div>\r\n                <div class=\"ui-lg-3 ui-md-6 ui-sm-6\"><button pButton type=\"button\" (click)=\"sendInvoice()\"class=\"btn btn-success\" icon=\"fa-play\" iconPos=\"right\" label=\"SEND INVOICE\"></button></div>\r\n            </div>\r\n\r\n\r\n\r\n\r\n\r\n            <!--<div class=\"table-responsive\">\r\n            <table class=\"table table-hover\" *ngIf=\"cartEntities &&  cartEntities.length > 0\">\r\n                <thead>\r\n                    <tr>\r\n                        <th>Product</th>\r\n                        <th class=\"hidden-xs\">Quantity</th>\r\n                        <th class=\"text-center hidden-xs\">Price</th>\r\n                        <th class=\"text-center\">Total</th>\r\n                        <th> </th>\r\n                    </tr>\r\n                </thead>\r\n\r\n                <tbody>\r\n\r\n                    <tr *ngFor=\"let cartEntity of cartEntities\">\r\n                        <td class=\"col-sm-8 col-md-6\">\r\n                        <div class=\"media\">\r\n                            <div class=\"media-body\">\r\n                                <h4 class=\"media-heading\"><p href=\"#\">{{cartEntity.product.description}}</p></h4>\r\n                                <span>Status: </span><span class=\"text-success\"><strong>In Stock</strong></span>\r\n                            </div>\r\n                        </div></td>\r\n                        <td class=\"col-sm-1 col-md-1 hidden-xs\" style=\"text-align: center\">\r\n                          <span  (click)=changeQuantity(cartEntity.product._id,-1) class=\"glyphicon glyphicon-minus pointer\"></span> {{cartEntity.quantity}} <span (click)=changeQuantity(cartEntity.product._id,1)  class=\"glyphicon glyphicon-plus pointer\"></span>\r\n                        </td>\r\n                        <td class=\"col-sm-1 col-md-1 text-center hidden-xs\"><strong>{{cartEntity.product.price}}</strong></td>\r\n                        <td class=\"col-sm-1 col-md-1 text-center \"><strong>{{cartEntity.product.price * cartEntity.quantity}}</strong></td>\r\n                        <td class=\"col-sm-1 col-md-1\">\r\n                        <button type=\"button\" (click)=removeByProductId(cartEntity.product._id) class=\"btn btn-danger\">\r\n                            <span class=\"glyphicon glyphicon-remove\"></span> Remove\r\n                        </button></td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"hidden-xs\">   </td>\r\n                        <td class=\"hidden-xs\">   </td>\r\n                        <td>   </td>\r\n                        <td><h5>Estimated shipping</h5></td>\r\n                        <td class=\"text-right\"><h5><strong>0:-</strong></h5></td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"hidden-xs\">   </td>\r\n                        <td class=\"hidden-xs\">   </td>\r\n                        <td>   </td>\r\n                        <td><h3>Total</h3></td>\r\n                        <td class=\"text-right\"><h3><strong>{{ totalSum }}:-</strong></h3></td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"hidden-xs\">   </td>\r\n                        <td class=\"hidden-xs\">   </td>\r\n                        <td>   </td>\r\n                        <td>\r\n\r\n                        <a [routerLink]=\"['']\">\r\n                            <button type=\"button\" class=\"btn btn-default\">\r\n                                <span class=\"glyphicon glyphicon-shopping-cart\"></span> Continue Shopping\r\n                            </button>\r\n                        </a>\r\n                        </td>\r\n\r\n                        <td>\r\n                        <button type=\"button\" (click)=\"sendInvoice()\"class=\"btn btn-success\">\r\n                            Send Invoice <span class=\"glyphicon glyphicon-play\"></span>\r\n                        </button></td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n          </div>-->"

/***/ }),

/***/ 445:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Coupon Management</h2>\r\n\r\n<p-dataTable #prodDT [value]=\"coupons\" [paginator]=\"true\" rows=\"15\" [responsive]=\"true\" exportFilename=\"coupons\" selectionMode=\"single\" [(selection)]=\"selectedUser\" (onRowSelect)=\"onRowSelect($event)\"expandableRows=\"true\">\r\n    <p-header style=\"text-transform: uppercase; font-family: 'PT Sans Narrow', Arial, sans-serif; font-size: 12px;\">Coupon List\r\n    </p-header>\r\n    <p-column field=\"couponCode\" header=\"COUPON CODE\" [filter]=\"true\" filterPlaceholder=\"Search\" [editable]=\"true\"></p-column>\r\n    <p-column field=\"description\" header=\"DESCRIPTION\" [editable]=\"true\"></p-column>\r\n    <p-column field=\"discount\" header=\"DISCOUNT\" [editable]=\"true\" >\r\n        <ng-template let-col let-coupon=\"rowData\" pTemplate=\"body\">\r\n                <span> {{coupon[col.field]}}% </span>\r\n        </ng-template>\r\n    </p-column>\r\n    <p-column field=\"isActive\" header=\"IS ACTIVE\" [sortable]=\"true\">\r\n        <ng-template let-col let-coupon=\"rowData\" pTemplate=\"body\">\r\n                <p-checkbox [(ngModel)]=\"coupon.isActive\" binary=\"true\"></p-checkbox>\r\n        </ng-template>\r\n    </p-column>\r\n\r\n</p-dataTable>\r\n<button type=\"button\" pButton class=\"btn btn-primary\" icon=\"fa-plus\" style=\"float:left; top: 10px;\" (click)=\"showDialogToAdd()\" label=\"Add new coupon\"></button>\r\n<button type=\"button\" pButton class=\"btn btn-success\" icon=\"fa-file-o\" iconPos=\"left\" style=\"float:right; top: 10px;\"  label=\"Export to CSV\" (click)=\"prodDT.exportCSV()\"></button>\r\n\r\n<p-dialog header=\"Coupon Details\" [(visible)]=\"displayDialog\" [responsive]=\"true\" [modal]=\"true\" showEffect=\"fade\"  [width]=\"400\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\" *ngIf=\"coupon\">\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"couponCode\">COUPON CODE</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"itemCode\" size=\"30\" [(ngModel)]=\"coupon.couponCode\" /></div>\r\n        </div>\r\n        <br>   \r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"description\">DESCRIPTION</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"description\" size=\"30\" [(ngModel)]=\"coupon.description\" /></div>\r\n        </div>\r\n        <br>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"discount\">DISCOUNT %</label></div>\r\n            <div class=\"ui-grid-col-8\"><p-spinner [max]=\"100\" [min]=\"1\" [(ngModel)]=\"coupon.discount\"></p-spinner></div>\r\n        </div>\r\n        <br>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"isActive\">IS ACTIVE</label></div>\r\n            <p-checkbox [(ngModel)]=\"coupon.isActive\" binary=\"true\"></p-checkbox>\r\n        </div>\r\n    </div>\r\n    <p-footer>\r\n        <div class=\"ui-dialog-buttonpane ui-widget-content ui-helper-clearfix\">\r\n            <a href=\"#\"><button type=\"button\" class=\"btn btn-info\"><span class=\"fa fa-question\"></span></button></a>\r\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteCoupon(coupon._id)\"><span class=\"fa fa-close\"></span> Delete</button>\r\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"save()\"><span class=\"fa fa-check\"></span> Save</button>\r\n        </div>\r\n    </p-footer>\r\n</p-dialog>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ 446:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Product Management</h2>\r\n<!--<div class=\"panel\">\r\n<button type=\"button\" class=\"btn btn-block\" data-toggle=\"collapse\" data-target=\"#addNewProduct\"><span class=\"glyphicon glyphicon-plus\"></span>Add new products</button>\r\n<div id=\"addNewProduct\" class=\"collapse\">\r\n<form class=\"well\" (submit)=\"addProduct()\">\r\n  <div class=\"form-group\">\r\n    <label>Product Name</label>\r\n    <input type=\"text\" [(ngModel)]=\"name\" name=\"name\" class=\"form-control\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Product Description</label>\r\n    <input type=\"text\" [(ngModel)]=\"itemDescription\" name=\"itemDescription\" class=\"form-control\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Product Price</label>\r\n    <input type=\"number\" [(ngModel)]=\"price\" name=\"price\" class=\"form-control\" min=\".01\" step=\"0.01\" >\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>In Inventory</label>\r\n    <input type=\"number\" [(ngModel)]=\"inStock\" name=\"inStock\" class=\"form-control\" min=\"0\">\r\n  </div>\r\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Add Product\">\r\n</form>\r\n</div>\r\n</div>\r\n\r\n\r\n<div class=\"product-list\">\r\n    <table class=\"table\" >\r\n        <thead>\r\n          <tr>\r\n          <th>Name</th>\r\n          <th>Description</th>\r\n          <th>Price</th>\r\n          <th>Inventory</th>\r\n          \r\n          </tr>\r\n        </thead>\r\n    <tbody>\r\n   \r\n    <tr *ngFor=\"let product of products\">\r\n        \r\n            <td>{{product.name}}</td>\r\n            <td>{{product.description}}</td>\r\n            <td>${{product.price}}</td>\r\n            <td>{{product.inStock}} </td>\r\n            <td><input type=\"button\"  (click)=\"deleteProduct(product._id)\" value=\"Delete\" class=\"btn btn-danger btn-xs\"></td>   \r\n      </tr>\r\n    \r\n         </tbody>\r\n  </table>\r\n    \r\n</div>-->\r\n\r\n\r\n<p-dataTable #prodDT [value]=\"products\" selectionMode=\"single\" [(selection)]=\"selectedProduct\" (onRowSelect)=\"onRowSelect($event)\" [paginator]=\"true\" rows=\"15\" [responsive]=\"true\" exportFilename=\"products\" expandableRows=\"true\">\r\n    <p-header style=\"text-transform: uppercase; font-family: 'PT Sans Narrow', Arial, sans-serif; font-size: 12px;\">Products List\r\n    </p-header>\r\n    <p-column field=\"itemCode\" header=\"ITEM_CODE\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n    <p-column field=\"description\" header=\"DESCRIPTION\"></p-column>\r\n    <p-column field=\"price\" header=\"PRICE\" >\r\n        <ng-template let-col let-product=\"rowData\" pTemplate=\"body\">\r\n            <span>{{product[col.field] | currency:'USD':true:'.00'}}</span>\r\n        </ng-template>\r\n    </p-column>\r\n        <p-column field=\"vendorPrice\" header=\"VENDOR_PRICE\" >\r\n        <ng-template let-col let-product=\"rowData\" pTemplate=\"body\">\r\n            <span>{{product[col.field] | currency:'USD':true:'.00'}}</span>\r\n        </ng-template>\r\n    </p-column>\r\n    <p-column field=\"inStock\" header=\"QTY_ON_HAND\" [sortable]=\"true\" [editable]=\"true\">\r\n    </p-column>\r\n    <p-column header=\"IMAGE\" expander=\"true\" styleClass=\"col-icon\" ></p-column>\r\n        <ng-template let-product pTemplate=\"rowexpansion\">\r\n            <div class=\"ui-g\">\r\n                <div class=\"ui-lg-4 ui-md-4\"></div>\r\n                <div class=\"ui-lg-4 ui-md-4 ui-sm-12\"><img src=\"{{product.image}}\" align=\"middle\"></div>\r\n                <div class=\"ui-lg-4 ui-md-4\"></div>\r\n            </div>\r\n        </ng-template>\r\n    <p-footer></p-footer>\r\n</p-dataTable>\r\n<button type=\"button\" pButton class=\"btn btn-primary\" icon=\"fa-plus\" style=\"float:left; top: 10px;\" (click)=\"showDialogToAdd()\" label=\"Add new product\"></button>\r\n<button type=\"button\" pButton class=\"btn btn-success\" icon=\"fa-file-o\" iconPos=\"left\" style=\"float:right; top: 10px;\"  label=\"Export to CSV\" (click)=\"prodDT.exportCSV()\"></button>\r\n\r\n<p-dialog header=\"Product Details\" [(visible)]=\"displayDialog\" [responsive]=\"true\" [modal]=\"true\" showEffect=\"fade\"  [width]=\"400\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\" *ngIf=\"product\">\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"itemCode\">ITEM CODE</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"itemCode\" size=\"30\" [(ngModel)]=\"product.itemCode\" /></div>\r\n        </div>\r\n        <br>   \r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"description\">DESCRIPTION</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"description\" size=\"30\" [(ngModel)]=\"product.description\" /></div>\r\n        </div>\r\n        <br>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"price\">PRICE</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"price\" size=\"30\" [(ngModel)]=\"product.price\" /></div>\r\n        </div>\r\n        <br>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"vendorPrice\">VENDDOR PRICE</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"vendorPrice\" size=\"30\" [(ngModel)]=\"product.vendorPrice\" /></div>\r\n        </div>\r\n        <br>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"inStock\">QUANTITY</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"inStock\" size=\"30\" [(ngModel)]=\"product.inStock\" /></div>\r\n        </div>\r\n        <br>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"image\">IMAGE</label></div>\r\n            <div class=\"ui-grid-col-8\"><input type=\"file\" id=\"file\" accept=\"image/*\" (change)=\"onChange($event)\" /></div>\r\n        </div>\r\n    </div>\r\n    <p-footer>\r\n        <div class=\"ui-dialog-buttonpane ui-widget-content ui-helper-clearfix\">\r\n            <a href=\"#\"><button type=\"button\" class=\"btn btn-info\"><span class=\"fa fa-question\"></span></button></a>\r\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"delete(product._id)\"><span class=\"fa fa-close\"></span> Delete</button>\r\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"save(product)\"><span class=\"fa fa-check\"></span> Save</button>\r\n        </div>\r\n    </p-footer>\r\n</p-dialog>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ 447:
/***/ (function(module, exports) {

module.exports = "<div class=\"page header\">\r\n    <div class=\"container-fluid\">\r\n <h1>Products page title</h1>\r\n <p class=\"lead\">This will be the product page</p>\r\n </div>\r\n</div>\r\n\r\n<p-dataGrid [value]=\"products\" [paginator]=\"true\" [rows]=\"8\">\r\n   <p-header>\r\n       <h2>List of Products</h2>\r\n   </p-header>\r\n\r\n   <ng-template let-product pTemplate=\"item\" let-i=\"index\">\r\n        <div style=\"padding:3px;\" class=\"ui-g-12 ui-md-3\">\r\n            <p-panel [header]=\"product.itemCode\" [style]=\"{'text-align':'center'}\">\r\n                <img src=\"{{product.image}}\" width=\"200px\" height=\"200px\">\r\n                <div class=\"prod-detail\">{{product.description}}</div>\r\n                <div class=\"prod-detail\">${{product.price}}</div>\r\n                <hr class=\"ui-widget-content\" style=\"border-top:0\">\r\n                <p-spinner size=\"10\" [(ngModel)]=\"quant[i]\" [min]=\"1\" style=\"width: 100px;\" name=\"quant\" ></p-spinner>\r\n                <button type=\"button\" class=\"btn btn-primary\" style=\"float:right\" (click)=\"addCart(product, quant[i])\">Add </button>\r\n            </p-panel>\r\n        </div>\r\n   </ng-template>\r\n   <p-footer></p-footer>\r\n</p-dataGrid>"

/***/ }),

/***/ 448:
/***/ (function(module, exports) {

module.exports = "<h1>Welcome to Kirkwood Holdings</h1>\r\n<div class=\"ui-g\">\r\n    <div class=\"ui-lg-3 ui-md-3 ui-sm-12\">\r\n        <p>lksahfkjsahdsakjfdskjdshkjf</p>\r\n    </div>\r\n    <div class=\"ui-lg-6 ui-md-6 ui-sm-12\">\r\n        <div class=\"row carousel-holder\">\r\n\r\n                    <div class=\"col-md-12\">\r\n                        <div id=\"carousel-example-generic\" class=\"carousel slide\" data-ride=\"carousel\">\r\n                            <ol class=\"carousel-indicators\">\r\n                                <li data-target=\"#carousel-example-generic\" data-slide-to=\"0\" class=\"active\"></li>\r\n                                <li data-target=\"#carousel-example-generic\" data-slide-to=\"1\"></li>\r\n                                <li data-target=\"#carousel-example-generic\" data-slide-to=\"2\"></li>\r\n                            </ol>\r\n                            <div class=\"carousel-inner\">\r\n                                <div class=\"item active\">\r\n                                    <img class=\"slide-image\" src=\"https://s3.amazonaws.com/ctres2428.com/images/test3.jpg\" alt=\"\">\r\n                                </div>\r\n                                <div class=\"item\">\r\n                                    <img class=\"slide-image\" src=\"https://s3.amazonaws.com/ctres2428.com/images/test4.jpg\" alt=\"\">\r\n                                </div>\r\n                                <div class=\"item\">\r\n                                    <img class=\"slide-image\" src=\"https://s3.amazonaws.com/ctres2428.com/images/test5.jpg\" alt=\"\">\r\n                                </div>\r\n                            </div>\r\n                            <a class=\"left carousel-control\" href=\"#carousel-example-generic\" data-slide=\"prev\">\r\n                                <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                            </a>\r\n                            <a class=\"right carousel-control\" href=\"#carousel-example-generic\" data-slide=\"next\">\r\n                                <span class=\"glyphicon glyphicon-chevron-right\"></span>\r\n                            </a>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n    </div>\r\n    <div class=\"ui-lg-3 ui-md-3 ui-sm-12\">\r\n        <p>asdsasafsagdsgsfsgadf</p>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"ui-g\">\r\n    <p>WILL COME BACK TO STYLE IT </p>\r\n</div>"

/***/ }),

/***/ 449:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Login</h2>\r\n<form (submit)=\"onLoginSubmit()\">\r\n  <div class=\"form-group\">\r\n    <label>Username</label>\r\n    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"username\" name=\"username\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Password</label>\r\n    <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" name=\"password\">\r\n  </div>\r\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Login\">\r\n</form>\r\n"

/***/ }),

/***/ 450:
/***/ (function(module, exports) {

module.exports = "\r\n<nav id=\"mainNav\" class=\"navbar navbar-default navbar-custom navbar-fixed-top navbar-toggleable-sm\" role=\"navigation\" >\r\n  <div class=\"container-fluid\" style=\"box-shadow: 10px 10px 5px grey; background-color: #9ea8a0;\" >\r\n      <div class=\"navbar-header page-scroll\">\r\n          <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#nav\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n          <a class=\"navbar-brand page-scroll\" href=\"#\">Kirkwood Holdings LLC </a>\r\n      </div> <!--navbar-header-->\r\n      \r\n      <div class=\"navbar-collapse collapse\" id=\"nav\">\r\n          <ul class=\"nav navbar-nav navbar-left block-menu\" id=\"nav\">\r\n            <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/home']\" class=\"three-d\">Products\r\n              <span aria-hidden=\"true\" class=\"three-d-box\">\r\n                <span class=\"front\">Products</span>\r\n                <span class=\"back\">Products</span>\r\n              </span>\r\n            </a></li>\r\n            <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/profile']\" class=\"three-d\">Profile\r\n              <span aria-hidden=\"true\" class=\"three-d-box\">\r\n                <span class=\"front\">Profile</span>\r\n                <span class=\"back\">Profile</span>\r\n              </span>\r\n            </a></li>\r\n            <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/cart']\" class=\"three-d\">Cart\r\n              <span aria-hidden=\"true\" class=\"three-d-box\">\r\n                <span class=\"front\">Cart</span>\r\n                <span class=\"back\">Cart</span>\r\n              </span>\r\n            </a></li>\r\n            <li *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/login']\" class=\"three-d\">Login\r\n              <span aria-hidden=\"true\" class=\"three-d-box\">\r\n                  <span class=\"front\">Login</span>\r\n                  <span class=\"back\">Login</span>\r\n                </span>\r\n            </a></li>\r\n            <li *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/register']\">Register</a></li>\r\n          </ul>\r\n          <ul class=\"nav navbar-nav navbar-right block-menu\" id=\"nav\">\r\n            <li *ngIf=\"authService.loggedIn()\"><a (click)=\"onLogoutClick()\" href=\"#\" class=\"three-d\">Logout\r\n                <span aria-hidden=\"true\" class=\"three-d-box\">\r\n                  <span class=\"front\">Logout</span>\r\n                  <span class=\"back\">Logout</span>\r\n                </span>\r\n              </a></li>\r\n          </ul>\r\n      </div> <!--navbar-->\r\n  </div> <!--/.container ended-->\r\n</nav> <!--/.nav ended-->"

/***/ }),

/***/ 451:
/***/ (function(module, exports) {

module.exports = " <div *ngFor=\"let order of orders | slice: 1;  let i = index\">\r\n   <p>{{order.Customer}},\r\n     {{order.orderNumber}},\r\n     {{order.date}},\r\n     <span *ngFor=\"let product of order.products;  let i = index\">\r\n      <ul> <b> Products {{i}}</b>\r\n        <br>\r\n        <li >Product Name: {{product.name}}</li>\r\n        <li> Price: ${{product.price}}</li>\r\n        <li> Quantity: {{product.quantity}}</li>\r\n        <li> Subtotal: ${{product.subTotal}}</li>\r\n      </ul>\r\n     </span>\r\n     </p>\r\n\r\n   \r\n </div>\r\n    "

/***/ }),

/***/ 452:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\"> \r\n  <h2 class=\"page-header\">{{user.name}}</h2>\r\n  <ul class=\"list-group\">\r\n    <li class=\"list-group-item\">Username: {{user.username}}</li>\r\n    <li class=\"list-group-item\">Email: {{user.email}}</li>\r\n    <li class=\"list-group-item\">Role: {{role}} </li>\r\n   \r\n  </ul>\r\n  </div>\r\n\r\n  <div *ngIf=\"role === 'Admin' || role === 'admin'  \">\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-heading\" style=\"font-weight: bold;\"> Management Tools     </div>\r\n        <div class=\"panel-body\">\r\n       <div class=\"ui-g\">\r\n            <div class=\"ui-lg-6 ui-md-6 ui-sm-12\"><li><button type=\"button\" pButton class=\"btn btn-primary\" (click)=\"toProduct()\"label=\"Product Management\"></button></li></div>\r\n            <div class=\"ui-lg-6 ui-md-6 ui-sm-12\"><li  [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/users']\"><button type=\"button\" pButton class=\"btn btn-primary\" label=\"User Management\"></button></a></li></div>\r\n        </div>\r\n        <div class=\"ui-g\">\r\n            <div class=\"ui-lg-6 ui-md-6 ui-sm-12\"><li  [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/vendor']\"><button type=\"button\" pButton class=\"btn btn-primary\" label=\"Vendor Management\"></button></a></li></div>\r\n            <div class=\"ui-lg-6 ui-md-6 ui-sm-12\"><li  [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/orders']\"><button type=\"button\" pButton class=\"btn btn-primary\" label=\"Invoice Management\"></button></a></li></div>\r\n        </div>\r\n          <div class=\"ui-g\">\r\n            <div class=\"ui-lg-6 ui-md-6 ui-sm-12\"><li  [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/coupon']\"><button type=\"button\" pButton class=\"btn btn-primary\" label=\"Coupon Management\"></button></a></li></div>\r\n        </div>\r\n     </div>\r\n\r\n     </div>\r\n  </div>\r\n\r\n  <div *ngIf=\"role === 'User' || role === 'user'  \">\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-heading\"> Customer Tools     </div>\r\n        <div class=\"panel-body\">\r\n          <div class=\"ui-g\">\r\n            <div class=\"ui-lg-6 ui-md-6 ui-sm-12\"><li  [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/dashboard']\"><button type=\"button\" pButton class=\"btn btn-primary\" label=\"Order History here\"></button></a></li></div>\r\n            <div class=\"ui-lg-6 ui-md-6 ui-sm-12\"  ><li  [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/users']\"><button type=\"button\" pButton class=\"btn btn-primary\" label=\"Change password here\"></button></a></li></div>\r\n        </div>\r\n      </div>\r\n\r\n     </div>\r\n  </div>"

/***/ }),

/***/ 453:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Register</h2>\r\n<form (submit)=\"onRegisterSubmit()\">\r\n  <div class=\"form-group\">\r\n    <label>First Name</label>\r\n    <input type=\"text\" [(ngModel)]=\"fName\" name=\"fName\" class=\"form-control\">\r\n  </div>\r\n   <div class=\"form-group\">\r\n    <label>Last Name</label>\r\n    <input type=\"text\" [(ngModel)]=\"lName\" name=\"lName\" class=\"form-control\" >\r\n  </div>\r\n   <div class=\"form-group\">\r\n    <label>Business Name</label>\r\n    <input type=\"text\" [(ngModel)]=\"bName\" name=\"bName\" class=\"form-control\" >\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Username</label>\r\n    <input type=\"text\" [(ngModel)]=\"username\" name=\"username\" class=\"form-control\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Email</label>\r\n    <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" class=\"form-control\" >\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Password</label>\r\n    <input type=\"password\" [(ngModel)]=\"password\" name=\"password\" class=\"form-control\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Role</label>\r\n    <input type=\"text\" [(ngModel)]=\"role\" name=\"role\" class=\"form-control\">\r\n  </div>\r\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\">\r\n</form>\r\n"

/***/ }),

/***/ 454:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Customer Management</h2>\r\n\r\n<p-growl [value]=\"msgs\" [style]=\"{'position':'fixed', 'top':'24%', 'left':'52%'}\"></p-growl>\r\n<p-dataTable #userDT [value]=\"users\" selectionMode=\"single\" [(selection)]=\"selectedUser\" (onRowSelect)=\"onRowSelect($event)\"  [paginator]=\"true\" rows=\"10\" [responsive]=\"true\" exportFilename=\"users\" expandableRows=\"true\" [contextMenu]=\"cm\">\r\n    <p-header style=\"text-transform: uppercase; font-family: 'PT Sans Narrow', Arial, sans-serif; font-size: 12px;\">Customers List</p-header>\r\n    <p-column field=\"fName\" header=\"FIRST_NAME\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n    <p-column field=\"lName\" header=\"LAST_NAME\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n    <p-column field=\"username\" header=\"USERNAME\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n    <p-column field=\"bName\" header=\"BUSINESS_NAME\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n    <p-column field=\"region\" header=\"REGION\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" filterMatchMode=\"equals\">\r\n        <ng-template pTemplate=\"filter\" let-col>\r\n            <p-dropdown [options]=\"regions\" [style]=\"{'width':'100%'}\" (onChange)=\"userDT.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\r\n        </ng-template>\r\n    </p-column>\r\n    <p-column field=\"pNum\" header=\"PHONE_NUM\"></p-column>\r\n    <p-column field=\"email\" header=\"EMAIL\" styleClass=\"hidden\"></p-column>\r\n    <p-column field=\"address\" header=\"ADDRESS\" styleClass=\"hidden\"></p-column>\r\n    <p-column field=\"city\" header=\"CITY\" styleClass=\"hidden\"></p-column>\r\n    <p-column field=\"state\" header=\"STATE\" styleClass=\"hidden\"></p-column>\r\n    <p-column field=\"zip\" header=\"ZIP\" styleClass=\"hidden\"></p-column>\r\n    <p-column field=\"mNum\" header=\"MOBILE_NUM\" styleClass=\"hidden\"></p-column>\r\n    <!--<p-column field=\"\" header=\"Quantity\" [sortable]=\"true\"></p-column>-->\r\n    <p-footer></p-footer>\r\n</p-dataTable>\r\n        <p-contextMenu #cm [model]=\"items\"></p-contextMenu>\r\n        <p-dialog [(visible)]=\"detailDialog\" header=\"More details\" [width]=\"500\">\r\n                <div class=\"ui-g\">\r\n                    <div class=\"ui-g-4\">Address details: </div>\r\n                    <div class=\"ui-g-6\">{{selectUserAddr}}, {{selectUserCity}}, {{selectUserState}} {{selectUserZip}}</div>\r\n                </div>\r\n                <div class=\"ui-g\">\r\n                    <div class=\"ui-g-4\">Email: </div>\r\n                    <div class=\"ui-g-6\">{{selectUserEmail}}</div>\r\n                </div>\r\n        </p-dialog>\r\n<button type=\"button\" pButton class=\"btn btn-primary\" icon=\"fa-plus\" style=\"float:left; top: 10px;\" (click)=\"showDialogToAdd()\" label=\"Add new customer\"></button>\r\n<button type=\"button\" pButton class=\"btn btn-success\" icon=\"fa-file-o\" iconPos=\"left\" style=\"float:right; top: 10px;\"  label=\"Export to CSV\" (click)=\"userDT.exportCSV()\"></button>\r\n\r\n<p-dialog header=\"Customer Details\" [(visible)]=\"displayDialog\" [responsive]=\"true\" [modal]=\"true\" [width]=\"700\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\" *ngIf=\"user\">\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"email\">Email*</label></div>\r\n            <!--<div class=\"ui-grid-col-4\"><p-inputMask type =\"email\" size=\"20\"  [(ngModel)]=\"user.email\" placeholder=\"Email: abc@xyz.com\"></p-inputMask></div>-->\r\n            <div class=\"ui-grid-col-4\"><input pInputText id=\"email\" type=\"email\" size=\"20\" [(ngModel)]=\"user.email\" placeholder=\"Email: abc@xyz.com\" (ngModelChange)=\"checkEmpty()\"/></div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"username\">Username*</label></div>\r\n            <div class=\"ui-grid-col-4\"><input pInputText id=\"username\" size=\"20\" [(ngModel)]=\"user.username\" placeholder=\"Username used to log in\" (ngModelChange)=\"checkEmpty()\"/></div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"password\">Password*</label></div>\r\n            <div class=\"ui-grid-col-4\"><input pInputText  type=\"password\" id=\"password\" size=\"20\" [(ngModel)]=\"user.password\" (ngModelChange)=\"checkEmpty()\"/></div>\r\n        </div>\r\n        <hr>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"fName\">First Name</label></div>\r\n            <div class=\"ui-grid-col-3\"><input pInputText id=\"fName\" size=\"20\" [(ngModel)]=\"user.fName\" /></div>\r\n            <div class=\"ui-grid-col-2\"><label for=\"lName\">Last Name</label></div>\r\n            <div class=\"ui-grid-col-3\"><input pInputText id=\"lName\" size=\"20\" [(ngModel)]=\"user.lName\" /></div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"bName\">Business Name</label></div>\r\n            <div class=\"ui-grid-col-4\"><input pInputText id=\"bName\" size=\"20\" [(ngModel)]=\"user.bName\" /></div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"address\">Address</label></div>\r\n            <div class=\"ui-grid-col-4\"><input pInputText id=\"address\" size=\"20\" [(ngModel)]=\"user.address\" placeholder=\"Street number, Street name\"/></div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"city\">City</label></div>\r\n            <div class=\"ui-grid-col-4\"><input pInputText id=\"city\" size=\"20\" [(ngModel)]=\"user.city\" /></div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"state\">State</label></div>\r\n            <div class=\"ui-grid-col-3\"><p-dropdown [options]=\"states\" [(ngModel)]=\"user.state\" placeholder=\"Pick a state\" [style]=\"{'width':'120px'}\" filter=\"true\"></p-dropdown></div>\r\n            <div class=\"ui-grid-col-2\"><label for=\"zip\">Zip</label></div>\r\n            <div class=\"ui-grid-col-4\"><p-inputMask id=\"zip\" size=\"20\" [style]=\"{'width':'60px'}\" [(ngModel)]=\"user.zip\" mask=\"99999\" placeholder=\"99999\"></p-inputMask></div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"region\">Region</label></div>\r\n            <div class=\"ui-grid-col-4\"><p-dropdown id=\"region\" size=\"20\" [options]=\"regions\" [(ngModel)]=\"user.region\" [style]=\"{'width':'120px'}\" placeholder=\"Pick a region\"></p-dropdown></div>\r\n            <!--<div class=\"ui-grid-col-4\"><p-inputMask id=\"region\" size=\"20\" [style]=\"{'width':'60px'}\" [(ngModel)]=\"user.region\" mask=\"aa\" placeholder=\"MO\"></p-inputMask></div>-->\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"pNum\">Phone Number</label></div>\r\n            <div class=\"ui-grid-col-3\"><p-inputMask id=\"pNum\" size=\"20\" [style]=\"{'width':'150px'}\" [(ngModel)]=\"user.pNum\" mask=\"(999)-999-9999\" placeholder=\"Enter phone number\"></p-inputMask></div>\r\n            <!--<div class=\"ui-grid-col-3\"><input pInputText id=\"pNum\" size=\"20\" [(ngModel)]=\"user.pNum\" /></div>-->\r\n            <div class=\"ui-grid-col-2\"><label for=\"mNum\">Mobile Number</label></div>\r\n            <div class=\"ui-grid-col-3\"><p-inputMask id=\"mNum\" size=\"20\" [style]=\"{'width':'150px'}\" [(ngModel)]=\"user.mNum\" mask=\"(999)-999-9999\" placeholder=\"Enter phone number\"></p-inputMask></div>\r\n            <!--<div class=\"ui-grid-col-3\"><input pInputText id=\"mNum\" size=\"20\" [(ngModel)]=\"user.mNum\" /></div>-->\r\n        </div>\r\n        <!--<div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"fNum\">Fax Number</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"fNum\" size=\"20\" [(ngModel)]=\"user.fNum\" /></div>\r\n        </div>-->\r\n       <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-2\"><label for=\"role\">Role*</label></div>\r\n            <div class=\"ui-grid-col-4\"><p-dropdown [options]=\"roles\" [(ngModel)]=\"user.role\" placeholder=\"Pick a role\" [style]=\"{'width':'120px'}\" (ngModelChange)=\"checkEmpty()\"></p-dropdown></div>\r\n        </div>\r\n        <br>\r\n        <br> \r\n        <div class=\"ui-grid-row\" style=\"font-style: italic\">*: Required fields</div>   \r\n        \r\n        <!--<div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"inStock\">QUANTITY</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"inStock\" [(ngModel)]=\"product.inStock\" /></div>\r\n        </div>-->\r\n    </div>\r\n    <p-footer>\r\n        <div class=\"ui-dialog-buttonpane ui-widget-content ui-helper-clearfix\">\r\n            <a href=\"#\"><button type=\"button\" class=\"btn btn-info\"><span class=\"fa fa-question\"></span></button></a>\r\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteUser(user._id)\"><span class=\"fa fa-close\"></span> Delete</button>\r\n            <button type=\"button\" id=\"saveUser\" class=\"btn btn-success\" (click)=\"save()\" disabled=\"disabled\"><span class=\"fa fa-check\"></span> Save</button>\r\n        </div>\r\n    </p-footer>\r\n</p-dialog>"

/***/ }),

/***/ 455:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Vendor Management</h2>\r\n\r\n<p-dataList [value]=\"products\" [paginator]=\"true\" [rows]=\"5\">\r\n    <p-header>\r\n        <h2>List of Vendor Items</h2>\r\n    </p-header>\r\n\r\n    <ng-template let-product pTemplate=\"item\" let-i=\"index\">\r\n        <div class=\"ui-grid ui-grid-responsive ui-fluid\" style=\"font-size:16px;padding:20px;border-bottom: 1px solid #D5D5D5;\">\r\n            <div class=\"ui-grid-row\">\r\n                <div class=\"ui-grid-col-3\" style=\"text-align: center\">                   \r\n                    <img src=\"{{product.image}}\" height=\"100px\" width=\"100px\">\r\n                </div>\r\n                <div class=\"ui-grid-col-9\">\r\n                    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n                        <div class=\"ui-grid-row\">\r\n                            <div class=\"ui-grid-col-2\">{{product.itemCode}} </div>\r\n                            \r\n                        </div>\r\n                        <div class=\"ui-grid-row\">\r\n                            <div class=\"ui-grid-col-2\">Description: </div>\r\n                            <div class=\"ui-grid-col-10\">{{product.description}}</div>\r\n                        </div>\r\n                        <div class=\"ui-grid-row\">\r\n                            <div class=\"ui-grid-col-2\">Price: </div>\r\n                            <div class=\"ui-grid-col-10\">${{product.vendorPrice}}</div>\r\n                        </div>\r\n                        <div class=\"ui-grid-row\">\r\n                            <p-spinner size=\"10\" [(ngModel)]=\"quant[i]\" [min]=\"1\"  style=\"width: 100px;\" name=\"quant\" ></p-spinner>\r\n                            <div class=\"ui-grid-col-offset-8\"><button type=\"button\" pButton icon=\"fa-plus\" style=\"float:left\" (click)=\"addCart(product, quant[i])\" class=\"btn btn-success\" label=\"Add\"></button></div>\r\n                        </div>                \r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ng-template>\r\n</p-dataList>\r\n\r\n<button (click)=\"show= !show\">{{show? 'Hide Add Product':'Add Product'}}</button>\r\n<button (click)=\"showProduct= !showProduct\">{{showProduct? 'Hide Send Vender Invoice':'Show Send Vendor Invoice'}}</button>\r\n\r\n<div *ngIf=\"show\">\r\n\r\n<p-dataTable #prodDT [value]=\"products\" [paginator]=\"true\" rows=\"15\" [responsive]=\"true\" exportFilename=\"products\" [editable]=\"true\" expandableRows=\"true\">\r\n    <p-header style=\"text-transform: uppercase; font-family: 'PT Sans Narrow', Arial, sans-serif; font-size: 12px;\">Products List\r\n    </p-header>\r\n    <p-column field=\"itemCode\" header=\"ITEM_CODE\" [filter]=\"true\" filterPlaceholder=\"Search\" [editable]=\"true\"></p-column>\r\n    <p-column field=\"description\" header=\"DESCRIPTION\" [editable]=\"true\"></p-column>\r\n    <p-column field=\"price\" header=\"PRICE\" [editable]=\"true\" >\r\n        <ng-template let-col let-product=\"rowData\" pTemplate=\"body\">\r\n            <span>{{product[col.field] | currency:'USD':true:'.00'}}</span>\r\n        </ng-template>\r\n    </p-column>\r\n        <p-column field=\"vendorPrice\" header=\"VENDOR_PRICE\" [editable]=\"true\" >\r\n        <ng-template let-col let-product=\"rowData\" pTemplate=\"body\">\r\n            <span>{{product[col.field] | currency:'USD':true:'.00'}}</span>\r\n        </ng-template>\r\n    </p-column>\r\n    <p-column field=\"inStock\" header=\"QTY_ON_HAND\" [sortable]=\"true\" [editable]=\"true\">\r\n    </p-column>\r\n    <p-column header=\"IMAGE\" expander=\"true\" styleClass=\"col-icon\" ></p-column>\r\n        <ng-template let-product pTemplate=\"rowexpansion\">\r\n            <div class=\"ui-g\">\r\n                <div class=\"ui-lg-4 ui-md-4\"></div>\r\n                <div class=\"ui-lg-4 ui-md-4 ui-sm-12\"><img src=\"{{product.image}}\" align=\"middle\"></div>\r\n                <div class=\"ui-lg-4 ui-md-4\"></div>\r\n            </div>\r\n        </ng-template>\r\n    <p-footer></p-footer>\r\n</p-dataTable>\r\n<button type=\"button\" pButton class=\"btn btn-primary\" icon=\"fa-plus\" style=\"float:left; top: 10px;\" (click)=\"showDialogToAdd()\" label=\"Add new product\"></button>\r\n<button type=\"button\" pButton class=\"btn btn-success\" icon=\"fa-file-o\" iconPos=\"left\" style=\"float:right; top: 10px;\"  label=\"Export to CSV\" (click)=\"prodDT.exportCSV()\"></button>\r\n\r\n<p-dialog header=\"Product Details\" [(visible)]=\"displayDialog\" [responsive]=\"true\" [modal]=\"true\" showEffect=\"fade\"  [width]=\"400\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\" *ngIf=\"product\">\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"itemCode\">ITEM CODE</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"itemCode\" size=\"30\" [(ngModel)]=\"product.itemCode\" /></div>\r\n        </div>\r\n        <br>   \r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"description\">DESCRIPTION</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"description\" size=\"30\" [(ngModel)]=\"product.description\" /></div>\r\n        </div>\r\n        <br>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"price\">PRICE</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"price\" size=\"30\" [(ngModel)]=\"product.price\" /></div>\r\n        </div>\r\n        <br>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"vendorPrice\">VENDDOR PRICE</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"vendorPrice\" size=\"30\" [(ngModel)]=\"product.vendorPrice\" /></div>\r\n        </div>\r\n        <br>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"inStock\">QUANTITY</label></div>\r\n            <div class=\"ui-grid-col-8\"><input pInputText id=\"inStock\" size=\"30\" [(ngModel)]=\"product.inStock\" /></div>\r\n        </div>\r\n        <br>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-4\"><label for=\"image\">IMAGE</label></div>\r\n            <div class=\"ui-grid-col-8\"><input type=\"file\" id=\"file\" accept=\"image/*\" (change)=\"onChange($event)\" /></div>\r\n        </div>\r\n    </div>\r\n    <p-footer>\r\n        <div class=\"ui-dialog-buttonpane ui-widget-content ui-helper-clearfix\">\r\n            <a href=\"#\"><button type=\"button\" class=\"btn btn-info\"><span class=\"fa fa-question\"></span></button></a>\r\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"delete(product._id)\"><span class=\"fa fa-close\"></span> Delete</button>\r\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"save()\"><span class=\"fa fa-check\"></span> Save</button>\r\n        </div>\r\n    </p-footer>\r\n</p-dialog>\r\n\r\n</div>\r\n\r\n<div *ngIf=\"showProduct\">\r\n\r\n        <p class=\"bg-info\" *ngIf=\"cartEntities && cartEntities.length == 0\">... is empty</p>\r\n\r\n\r\n                <div class=\"ui-g\" id=\"cartHeader\">\r\n                    <div class=\"ui-lg-4 ui-md-4 ui-sm-4\" >Item Name</div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">Qty</div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">Unit Price</div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">Sub-Total</div>\r\n                </div>\r\n            <hr>\r\n                <div class=\"ui-g\" id=\"cartBody\" *ngFor=\"let cartEntity of cartEntities\">\r\n                    <div class=\"ui-lg-4 ui-md-4 ui-sm-4\" ><h4><p>{{cartEntity.product.description}}</p>\r\n                    <span>Status: </span><span class=\"text-success\">In Stock</span>\r\n                    </h4></div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">\r\n                        <span (click)=changeQuantity(cartEntity.product._id,-1) class=\"fa fa-minus\" style=\"cursor:pointer\"></span>&nbsp; &nbsp;<span id=\"number\">{{cartEntity.quantity}}</span>&nbsp; &nbsp;<span (click)=changeQuantity(cartEntity.product._id,1) class=\"fa fa-plus pointer\" style=\"cursor:pointer\"></span>\r\n                    </div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">\r\n                        <span id=\"number\">${{cartEntity.product.vendorPrice}}</span>\r\n                    </div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">\r\n\r\n                        <span id=\"number\" decimals=\".01\"> ${{cartEntity.product.vendorPrice * cartEntity.quantity}}</span>\r\n\r\n                    </div>\r\n                    <div class=\"ui-lg-2 ui-md-2 ui-sm-2\" style=\"text-align: center\">\r\n                        <button type=\"button\" pButton icon=\"fa-remove\" style=\"float:left\" (click)=\"removeByProductId(cartEntity.product._id)\" class=\"btn btn-danger\" label=\"Remove\"></button>\r\n                    </div>          \r\n                </div>\r\n            <hr>\r\n            <div class=\"ui-g\" id=\"cartSum\">\r\n                <div class=\"ui-lg-8\"><br></div>\r\n                <div class=\"ui-lg-2 ui-md-6 ui-sm-6\" style=\"font-weight: bold;\">Estimated shipping: </div>\r\n                <div class=\"ui-lg-2 ui-md-6 ui-sm-6\">$0</div>\r\n                <div class=\"ui-lg-8\"><br></div>\r\n                <div class=\"ui-lg-2 ui-md-6 ui-sm-6\" style=\"font-weight: bold;\">Total: </div>\r\n                <div class=\"ui-lg-2 ui-md-6 ui-sm-6\">${{totalSum}}</div>\r\n            </div>\r\n            <hr>\r\n            <div class=\"ui-g\">\r\n                <div class=\"ui-lg-6\"><br></div>\r\n                <div class=\"ui-lg-3 ui-md-6 ui-sm-6\"><button pButton type=\"button\" (click)=\"sendInvoice()\"class=\"btn btn-success\" icon=\"fa-play\" iconPos=\"right\" label=\"SEND INVOICE\"></button></div>\r\n            </div>\r\n    </div>"

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "role1", function() { return role1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "email1", function() { return email1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roleType", function() { return roleType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEmail", function() { return setEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showNav", function() { return showNav; });
var role1;
var email1;
var roleType = function (role) {
    role1 = role;
};
var setEmail = function (email) {
    email1 = email;
};
var showNav = function () {
    if (role1 === "Admin" || role1 === "admin") {
        return true;
    }
    else {
        return false;
    }
};
//this.module.exports;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/role.js.map

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(165);


/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.prototype.validateRegister = function (user) {
        if (user.email == undefined || user.username == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    return ValidateService;
}());
ValidateService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ValidateService);

//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/validate.service.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CartService = (function () {
    function CartService(http) {
        this.http = http;
        this.roles = __webpack_require__(49);
        this._storage = localStorage;
        this.initCart();
    }
    CartService.prototype.initCart = function () {
        // if we dont have  any cart history, create a empty cart
        if (!this._storage.getItem('cart')) {
            var emptyMap = {};
            this.setCart(emptyMap);
        }
    };
    CartService.prototype.saveListOfCartEntities = function (listOfCartEntries) {
        // reduce all the entities to a map
        var cartMap = listOfCartEntries.reduce(function (map, cartEntry, i) {
            map[cartEntry.product._id] = cartEntry;
            return map;
        }, {});
        // persist the map
        this.setCart(cartMap);
    };
    CartService.prototype.getCartEntryByProductId = function (productId) {
        var myCartMap = this.getCart();
        console.log(myCartMap);
        console.log(productId);
        return Promise.resolve(myCartMap[productId]);
    };
    CartService.prototype.addProductToCart = function (product, itemQuant) {
        if (itemQuant === undefined) {
            itemQuant = 1;
        }
        var cartMap = this.getCart();
        if (cartMap[product._id] != undefined) {
            var cartInstance = cartMap[product._id];
            cartInstance.quantity = cartInstance.quantity + itemQuant;
            cartMap[product._id] = cartInstance;
        }
        else {
            // if not, set default value
            cartMap[product._id] = {
                'product': product,
                'quantity': itemQuant
            };
        }
        this.setCart(cartMap);
    };
    CartService.prototype.getAllCartEntities = function () {
        // get the cart
        var myCartMap = this.getCart();
        var cartEntities = [];
        // convert the map to an array
        for (var key in myCartMap) {
            if (myCartMap[key].quantity > myCartMap[key].product.inStock) {
                myCartMap[key].backorder = true;
            }
            var value = myCartMap[key];
            cartEntities.push(value);
        }
        // return the array
        return Promise.resolve(cartEntities);
    };
    CartService.prototype.getCart = function () {
        var cartAsString = this._storage.getItem('cart');
        return JSON.parse(cartAsString);
    };
    CartService.prototype.setCart = function (cartMap) {
        this._storage.setItem('cart', JSON.stringify(cartMap));
    };
    CartService.prototype.sendInvoice = function (product, user, totalSum, orderNumber) {
        var data = { product: product, user: user, totalSum: totalSum, orderNumber: orderNumber };
        var body = JSON.stringify(data);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('carts/invoice', body, { headers: headers });
    };
    CartService.prototype.updateInventory = function (deduct, pID) {
        console.log("in update Inv");
        var data = { pID: pID, deduct: deduct };
        return this.http.put('products/updateinventory', data);
    };
    CartService.prototype.addInventory = function (add, pID) {
        console.log("in update Inv");
        var data = { pID: pID, add: add };
        return this.http.put('products/addinventory', data);
    };
    CartService.prototype.editProduct = function (name, updatedItem, pID) {
        console.log("Inside of edit prodcut");
        var data = { name: name, updatedItem: updatedItem, pID: pID };
        return this.http.put('products/editproduct', data);
    };
    return CartService;
}());
CartService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], CartService);

var _a;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/cart.service.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderService = (function () {
    function OrderService(http) {
        this.http = http;
    }
    OrderService.prototype.saveOrder = function (order, userID, orderNumber, totalSum) {
        console.log("in order service");
        var data = { order: order, userID: userID, orderNumber: orderNumber, totalSum: totalSum };
        console.log(data);
        return this.http.post('orders/saverorder', data).map(function (res) { return res.json(); });
    };
    OrderService.prototype.getOrderNumber = function () {
        return this.http.get('orders/orderNumber').map(function (res) { return res.json(); });
    };
    OrderService.prototype.getOrders = function () {
        return this.http.get('orders/orders').map(function (res) { return res.json(); });
    };
    OrderService.prototype.updateOrderNumber = function () {
        console.log("in update order number services");
        return this.http.get('orders/updateOrderNumber').map(function (res) { return res.json(); });
    };
    return OrderService;
}());
OrderService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], OrderService);

var _a;
//# sourceMappingURL=C:/Users/Mohamed Langi/Documents/UMSL/kirkwoodsite/angular-src/src/order.service.js.map

/***/ })

},[498]);
//# sourceMappingURL=main.bundle.js.map