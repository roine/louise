require('angular');
require('./async-loop');

/*@ngInject*/
function ImageLoaderService() {
    var maxImages = 10;
    // whether to use the optimized image
    var optim = false;

    this.maxImage = function (max) {
        if (!angular.isNumber(max)) {
            return;
        }
        maxImages = max;
    };

    this.useOptim = function (bool) {
        optim = !!bool;
    };

    this.$get = /*@ngInject*/ function ($q, asyncLoop) {
        return new ImageLoader($q, asyncLoop, maxImages, optim);
    };
}
/**
 *
 * @param $q
 * @param maxImages the max total image to load
 * @param optim wehether to use a optimized version of the images
 * @constructor
 */
function ImageLoader($q, asyncLoop, maxImages, optim) {
    this.images = {};
    this.project = '';

    this.init = function (project) {
        var path = 'images/projects/' + project + '/';
        if (optim) {
            path = 'images/projects-optim/' + project + '/';
        }
        var defer = $q.defer();
        var self = this;
        var imagePaths = [];

        this.project = project;

        // if the images are already loaded, return the cached images
        if (self.images[project]) {
            defer.resolve(self.images[project]);
            return defer.promise;
        }

        self.images[project] = [];

        for (var i = 1; i <= maxImages; i++) {
            imagePaths.push(path + i + '.png');
        }

        asyncLoop(maxImages, function (loop) {
            self.loader(imagePaths, loop.iteration()).then(function () {
                loop.next();
            }, function () {
                loop.break();
            });
        }, function () {
            defer.resolve(self.images[project]);
            // not sure this is useful
            return self.images[project];
        });

        return defer.promise;

    };

    this.loader = function (paths, i) {
        var defer = $q.defer();
        var self = this,
            img = new Image();

        img.src = paths[i];

        img.onload = function () {
            self.images[self.project].push(paths[i]);
            defer.resolve();
        };

        img.onerror = function () {
            defer.reject();
        };
        return defer.promise;
    };

}


module.exports = ImageLoaderService;