var controllers = angular.module('BookItineraries.controllers', []);

controllers.controller('MainCtrl', function($scope) {
    $scope.books = [{
      "title": "All the Light We Cannot See",
        "ISBN": '1476746583'
    }, {
      "title": 'Over the Edge of the World: Magellan\'s Terrifying Circumnavegation of the Globe',
      "ISBN": '006093638X'
    }];

    $scope.status = {
      isFirstOpen: true,
      openStatus: [true],
      oneAtATime: true
    };

});

controllers.controller("BookItineraryCtrl", function ($scope, $routeParams, googleBooksAPIservice, bookItineraryService) {

  $scope.ISBN = $routeParams.ISBN;


  googleBooksAPIservice.getBook($scope.ISBN).success(function (data) {
      $scope.bookData = data.items[0].volumeInfo;
  });

  bookItineraryService.getBookItinerary($scope.ISBN).success(function (data) {

    $scope.bookItinerary = data.itinerary;
    var characters = data.itinerary.characters;

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: data.zoom,
        center: new google.maps.LatLng(data.center.lat, data.center.long),
        mapTypeId: google.maps.MapTypeId.TERRAIN
       });

    drawMap(map, $scope.bookItinerary);


  })

  


});
