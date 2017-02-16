var projects = require('../projects.json');

exports.projectInfo = function(req, res) { 
	var projectID = req.params.id;
	if (projectID == "random") {
		projectID = Math.floor(Math.random() * projects.length) + 1;
	} else {
		projectID = parseInt(projectID);
	}

  	var project = projects[projectID-1]; // of by one, our first project has index 0
  	res.json(project);
}