(function() {
    'use strict';
    
        angular
            .module('parsefile')
            .controller('ParseFileController', ParseFileController);
    
        ParseFileController.inject = ['$scope', '$location', '$routeParams'];
        function ParseFileController($scope, $location, $routeParams) {
            $scope.parseFile = function() {
                
                const HEADER = 'sku,descricao\n';
                const DELIMITER_COLUMN = ',';
                const DELIMITER_LINE = '\n';

                var file = document.getElementById('fileInput').files[0];
                console.log(file);
                if (file) {
                    var aReader = new FileReader();
                    aReader.readAsText(file, 'UTF-8');
                    aReader.onload = function (evt) {

                        var fileContent = aReader.result;
                        var csvContent = HEADER;

                        csvContent += fileContent.split('\n')
                            .filter(filterProducts)
                            .map(mapFrom)
                            .join(DELIMITER_LINE);
                        
                        var hiddenElement = document.createElement('a');
                        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
                        hiddenElement.target = '_blank';
                        hiddenElement.download = 'file_parsed.csv';
                        hiddenElement.click();
                    }
                    aReader.onerror = function (evt) {
                        console.log(evt);
                    }
                }
            }

            var filterProducts = function(o) {
                return o.length > 30 && o[0] === '0';
            }

            var mapFrom = function(o) {
                return o.substring(0, 14).concat(',').concat(o.substring(14, o.length));
            }
        }
    })();