angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("templates/fixedMenu.html","<div class=\"fixed-menu\">\n	<h3>{{options.firstname}} {{options.lastname}}</h3>\n	<ol ng-repeat=\"project in projects\">\n		<li>\n			<a ng-href=\"#/projet/{{project.id}}\">\n				<div class=\"title\">{{project.title}}</div>\n				{{project.summary}}\n			</a>\n		</li>\n	</ol>\n</div>");}]);