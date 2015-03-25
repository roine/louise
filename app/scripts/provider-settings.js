require('angular');

angular.module('app')
    .config(ProviderSetting);


/*@ngInject*/
function ProviderSetting(imageLoaderProvider) {
    imageLoaderProvider.totalImages = 5;
    imageLoaderProvider.useOptim = true;
}
