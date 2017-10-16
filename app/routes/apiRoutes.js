// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friendsData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  //This route displays the friendsData
  app.get("/friends", function(req, res) {
  	//console.log(friendsData[0]);
    res.json(friendsData);
  });

  //This route handles when a user sends their data off to the server
  app.post("/friends", function(req, res) {
  	var comparisonArray = [];
    //Find difference between user scores and a friend's and push it to the array
    var findDiff = function(userScores, compScores) {
      var compTotal = 0;
      for(var j = 0; j < 10; j++) {
        compTotal += Math.abs(compScores[j] - userScores[j]);
      }
      comparisonArray.push(compTotal);
    };

    //Do it for each friend in friendsData
    for(var i = 0; i < friendsData.length; i++) {
      findDiff(friendsData[i].scores, req.body.scores);
    }

  	//Find the index of the smallest number of the array 
  	
    var indexOfSmallest = function(a) {
      var lowest = 0;
      for (var i = 1; i < a.length; i++) {
        if (a[i] < a[lowest]) {
          lowest = i;
        }
      }
      return lowest;
    };

    //Use it to identify the match with the least difference
  	match = friendsData[indexOfSmallest(comparisonArray)];
    //Add user data to friendsData
    friendsData.push(req.body);
    //Return the result for the post call
  	res.json(match);
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendsData = [];
  });
};