require('angular');

module.exports = function () {
    var maxImages = 10;

    this.maxImage = function (max) {
        if (!angular.isNumber(max)) {
            return;
        }
        maxImages = max;
    }

    function ImageLoader($q) {
        this.images = {};
        this.project = '';

        this.init = function (project) {

            var defer = $q.defer();
            var self = this;
            var imagePaths = [];

            this.project = project;

            // if the images are already loaded, return the cached images
            if(self.images[project]){
                defer.resolve(self.images[project]);
                return defer.promise;
            }

            self.images[project] = [];

            for (var i = 1; i <= maxImages; i++) {
                imagePaths.push('images/' + project + '/' + i + '.png');
            }

            asyncLoop(maxImages, function (loop) {
                self.loader(imagePaths, loop.iteration()).then(function () {
                    loop.next();
                }, function () {
                    loop.break();
                });
            }, function () {
                defer.resolve(self.images[project]);
                return self.images[project];
            });

            return defer.promise;

        }

        this.loader = function (paths, i) {
            var defer = $q.defer();
            var self = this,
                img = new Image();
            img.src = paths[i];

            img.onload = function () {
                self.images[self.project].push(paths[i])
                defer.resolve();
            }

            img.onerror = function () {
                defer.reject();
            }
            return defer.promise;
        }

        function asyncLoop(iterations, func, callback) {
            var index = 0;
            var done = false;
            var loop = {
                next: function () {
                    if (done) {
                        return;
                    }

                    if (index < iterations) {
                        index++;
                        func(loop);

                    } else {
                        done = true;
                        callback();
                    }
                },

                iteration: function () {
                    return index - 1;
                },

                break: function () {
                    done = true;
                    callback();
                }
            };
            loop.next();
            return loop;
        }
    }

    this.$get = /*@ngInject*/ function ($q) {
        return new ImageLoader($q);
    }
}