app.controller('MainController', ['$scope', function($scope) {
	//CONTAINERS
	$scope.creatures = [{
			name: 'Player #1',
			initiativeModifier: 0,
			rolledInitiative: 0,
			category: 'player',
		},
		{
			name: 'Monster #1',
			initiativeModifier: 0,
			rolledInitiative: 0,
			category: 'monster'
		}
	];

	var numPlayers = 1;
	var numNPCs = 0;
	var numMonsters = 1;

	$scope.showMoreInfo = false;
	$scope.showTooltip = false;

	//FUNCTIONS
	$scope.addNew = function(typeIn) {
		//Makes sure that added name has a proper number
		var newName = "";
		if (typeIn === "Player") {
			numPlayers += 1;
			newName = typeIn + " #" + numPlayers.toString();
		}
		else if (typeIn === "NPC") {
			numNPCs += 1;
			newName = typeIn + " #" + numNPCs.toString();
		}
		else {
			numMonsters += 1;
			newName = typeIn + " #" + numMonsters.toString();
		}

		$scope.creatures.push({
				name: newName,
				initiativeModifier: 0,
				rolledInitiative: 0,
				category: typeIn.toLowerCase()
		});
	}

	//Returns number between 1 and 20, as though rolling 1d20. Using 
	//window.crypto because Math.random() seed may not have 
	//been random enough
	function roll1D20() {
		var array = new Uint32Array(1);
		window.crypto.getRandomValues(array);
		return 1 + (array[0] % 20); 
	}

	//Sort the list of creatures
	$scope.sortCreatures = function(creaturesIn) {
		creaturesIn.sort(function(creature1, creature2) { 
			return creature2.rolledInitiative - creature1.rolledInitiative;
		});
	}

	//Roll initiative, then reorder the creatures by their rolled value
	$scope.rollInitiative = function() {
		for (var i = 0; i < $scope.creatures.length; i++) {
			var d20 = roll1D20();
			$scope.creatures[i].rolledInitiative = 
			d20 + $scope.creatures[i].initiativeModifier;
		}
		$scope.sortCreatures($scope.creatures);
	}

	//Removes the creature from the list and decriments the number of that 
	//type of creature
	$scope.removeCreature = function(creature) {
		var index = $scope.creatures.indexOf(creature);
		if (creature.category === "player") {
			numPlayers -= 1;
		}
		else if (creature.category === "npc") {
			numNPCs -= 1;
		}
		else {
			numMonsters -= 1;
		}
		$scope.creatures.splice(index, 1);
	}
}]);