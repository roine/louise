/*@ngInject*/
function ProviderSetting(imageLoaderProvider) {
    imageLoaderProvider.totalImages = 5;
    imageLoaderProvider.useOptim = true;
}


module.exports = ProviderSetting;