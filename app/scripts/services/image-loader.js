require('angular');
require('./async-loop');

/*@ngInject*/
function ImageLoaderService() {
    var maxImages = 10;
    // whether to use the optimized image
    var optim = false;

    this.maxImage = maxImage;
    this.useOptim = useOptim;
    this.$get = $get;

    function maxImage(max) {
        if (!angular.isNumber(max)) {
            return;
        }
        maxImages = max;
    }

    function useOptim(bool) {
        optim = !!bool;
    }

    /*@ngInject*/
    function $get($q, asyncLoop) {
        return new ImageLoader($q, asyncLoop, maxImages, optim);
    }
}
/**
 *
 * @param $q
 * @param maxImages the max total image to load
 * @param optim wehether to use a optimized version of the images
 * @constructor
 */
function ImageLoader($q, asyncLoop, maxImages, optim) {
    "use strict";

    var images = {},
        project = "";

    this.images = images;
    this.project = project;
    this.init = init;
    this.loader = loader;

    function init(projectParam) {
        var path = 'images/projects/' + projectParam + '/';
        if (optim) {
            path = 'images/projects-optim/' + projectParam + '/';
        }
        var defer = $q.defer();
        var imagePaths = [];

        project = projectParam;

        // if the images are already loaded, return the cached images
        if (images[project]) {
            defer.resolve(images[project]);
            return defer.promise;
        }

        images[project] = [];

        for (var i = 1; i <= maxImages; i++) {
            imagePaths.push(path + i + '.png');
        }

        asyncLoop(maxImages, function (loop) {
            loader(imagePaths, loop.iteration()).then(function () {
                loop.next();
            }, function () {
                loop.break();
            });
        }, function () {
            defer.resolve(images[project]);
            // not sure this is useful
            return images[project];
        });

        return defer.promise;

    }

    function loader(paths, i) {
        var defer = $q.defer();
        var self = this,
            img = new Image();

        img.src = paths[i];

        img.onload = function () {
            images[project].push(paths[i]);
            defer.resolve();
        };

        img.onerror = function () {
            defer.reject();
        };
        return defer.promise;
    }

}


module.exports = ImageLoaderService;