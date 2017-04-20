"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var ImageService = (function () {
    function ImageService() {
    }
    ImageService.prototype.postImage = function (url, image, headers) {
        if (!url || url === '') {
            throw new Error('Url is not set! Please set it before doing queries');
        }
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append('image', image);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next({ response: xhr.response, status: xhr.status });
                        observer.complete();
                    }
                    else {
                        observer.error({ response: xhr.response, status: xhr.status });
                    }
                }
            };
            xhr.open('POST', url, true);
            if (headers)
                for (var _i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
                    var header = headers_1[_i];
                    xhr.setRequestHeader(header.header, header.value);
                }
            xhr.send(formData);
        });
    };
    return ImageService;
}());
ImageService.decorators = [
    { type: core_1.Injectable },
];
ImageService.ctorParameters = function () { return []; };
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map