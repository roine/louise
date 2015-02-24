/*@ngInject*/
function HeaderDirective() {
    return {
        templateUrl: 'templates/header.html',
        scope: {
            options: "="
        },
        link: function () {
        }
    };
}

module.exports = HeaderDirective;
