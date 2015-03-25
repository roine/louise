require('angular');
require('./services/image-loader');

angular.module('app')
    .config(ProviderSetting);


/*@ngInject*/
function ProviderSetting(imageLoaderProvider) {
    imageLoaderProvider.totalImages = 5;
    imageLoaderProvider.useOptim = true;
}
