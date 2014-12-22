require('angular');

module.exports = function () {
    var maxImages = 10;

    this.maxImage = function (max) {
        if (!angular.isNumber(max)) {
            return;
        }
        maxImages = max;
    }

    function ImageLoader() {
        this.images = [];

        // Imorove the following
        this.init = function (project) {
            var self = this;
            var error = false;
            var imagePaths = [];
            var loaded = 0;

            for (var i = 1; i <= maxImages; i++) {
                imagePaths.push('images/' + project + '/' + i + '.png');
            }

            this.loader(imagePaths, 0);
        }

        this.loader = function (paths, i) {
            var self = this,
            img = new Image();

            img.src = paths[i];

            img.onload = function () {
                i++;
                self.images.push(paths[i]);
                self.loader(paths, i);
            }
        }


    }

    this.$get = function () {
        return new ImageLoader();
    }
}