// отображение скрытого инпута по клику на ячейку
function toggle(e){
	var i = e.nextSibling.nextSibling;
	i.className = 'show';
	e.className = 'hide';
}


var tableApp = angular.module('tableApp', []);

// обработка клика по ентру для отправки данных
tableApp.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

tableApp.controller('ServicesCtrl',function($scope, $http){
	
	// поле для добавления
    var field = document.getElementById('fieldA');

    // рендер
    $scope.renderServiceClents = function(response){
		$scope.serviceClients = response;
	};

	// отправляем данные на сервер для редактирования
	$scope.update = function(es){
		console.log(es);
		//console.log($scope.serviceClient);
		$http.put("/serviceClients/" + es._id, es)
		.success(function(response){
			$scope.all();
		});
	};

	// выборка
	$scope.select = function(id){
		console.log(id);
		$http.get("/serviceClients/" + id)
		.success(function(response){
			$scope.serviceClient = response;
		})
	};

	// отправляем данные на сервер для добавления
	$scope.create = function(){
		console.log($scope.serviceClient);
		$http.post("/serviceClients", $scope.serviceClient)
		.success(function(response){
			$scope.all();
			field.value = '';
		});
	};

    // отправляем данные на сервер для удаления
	$scope.remove = function(id){
		$http.delete("/serviceClients/" + id)
		.success(function(response){
			$scope.all();
		});
	};

	// get all
	$scope.all = function(){
		$http.get("/serviceClients")
		.success($scope.renderServiceClents);
	}

	$scope.all();
	
});