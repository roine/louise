require('angular');
require('./async-loop');


// tweak to use private
var _totalImages = new WeakMap();
var _useOptim = new WeakMap();
class ImageLoaderService {
    constructor() {
        _totalImages.set(this, 10);
        _useOptim.set(this, false);
    }

    set totalImages(max) {
        if (!angular.isNumber(max)) return;
        _totalImages.set(this, max);
    }

    get totalImages() {
        return _totalImages.get(this);
    }

    set useOptim(bool) {
        _useOptim.set(this, !!bool);
    }

    get useOptim() {
        return _useOptim.get(this);
    }

    /*@ngInject*/
    $get($q, asyncLoop) {
        return new ImageLoader($q, asyncLoop, _totalImages.get(this), _useOptim.get(this));
    }
}

/**
 *
 * @param $q
 * @param maxImages the max total image to load
 * @param optim wehether to use a optimized version of the images
 * @constructor
 */
var promise = new WeakMap();
var asyncLoop = new WeakMap();
var maxImages = new WeakMap();
var useOptim = new WeakMap();
class ImageLoader {
    constructor($qService, asyncLoopService, maxImagesParam, useOptimParam) {
        this.project = "";
        this.images = {};
        promise.set(this, $qService);
        asyncLoop.set(this, asyncLoopService);
        maxImages.set(this, maxImagesParam);
        useOptim.set(this, useOptimParam);
    }

    init(projectParam) {
        let path = 'images/projects/' + projectParam + '/';
        if (useOptim.get(this)) {
            path = 'images/projects-optim/' + projectParam + '/';
        }

        var $q = promise.get(this);
        var defer = $q.defer();
        var imagePaths = [];

        this.project = projectParam;

        // if the images are already loaded, return the cached images
        if (this.images[this.project]) {
            defer.resolve(this.images[this.project]);
            return defer.promise;
        }

        this.images[this.project] = [];

        for (let i = 1; i <= maxImages.get(this); i++) {
            imagePaths.push(path + i + '.png');
        }

        var aLoop = asyncLoop.get(this);
        aLoop(maxImages.get(this), (loop) => {
            this.loader(imagePaths, loop.iteration())
                .then(() => {
                    loop.next();
                }, function () {
                    loop.break();
                });
        }, () => {
            defer.resolve(this.images[this.project]);
            // not sure this is useful
            return this.images[this.project];
        });

        return defer.promise;

    }

    loader(paths, i) {
        var $q = promise.get(this);
        var defer = $q.defer(),
            img = new Image();

        img.src = paths[i];

        img.onload = () => {
            this.images[this.project].push(paths[i]);
            defer.resolve();
        };

        img.onerror = () => {
            defer.reject();
        };
        return defer.promise;
    }

}
angular.module('app')
    .provider('imageLoader', ImageLoaderService);