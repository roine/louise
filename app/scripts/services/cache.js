/*@ngInject*/
function CacheRequestsService($cacheFactory) {
    return $cacheFactory('requests');
}

module.exports = {
    requests: CacheRequestsService
};