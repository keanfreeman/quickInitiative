app.directive('creatureInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      details: '=' 
    }, 
    templateUrl: 'js/directives/creatureInfo.html' 
  }; 
});