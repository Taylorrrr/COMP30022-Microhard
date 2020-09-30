const projectRouter = require('express').Router();
const mongoose = require('mongoose');
const auth = require('./authRouter');
const User = mongoose.model('User');
const Project = require('../models/projectModel');

//const projectController = ...

projectRouter.post('/create', auth.optional, (req,res)=>{

	if(req.body.name){
		User.findById(req.payload.id).then(async function (user) {
	        const project = new Project(req.body);
	        project.user = user;
	        project.contributors = [user.username];
	        project.skills = [];
	        project.process = [];
	        project.timeline = [{
	        	"date": new Date(),
	        	"description": "Project created"
	        }];
	        await project.save();
	      });
	}else{
		return res.send("Project Name not Provided.");
	}
    
});

projectRouter.get('/',auth.optional, (req,res)=>{
	User.findById(req.payload.id).then(async function (user) {
        const projects = await Project.find({user:user._id});
        return res.json({"projects":projects});
      });
});

projectRouter.get('/:id',auth.optional, (req,res)=>{
	User.findById(req.payload.id).then(async function(user){
		const project = await Project.findOne({user:user._id,_id:req.params.id});
		return res.json({"project":project});
	})
});

projectRouter.delete('/:idd',auth.optional, (req,res)=>{
	User.findById(req.payload.id).then(async function (user){
		const deleteProject = await Project.deleteOne({user:user._id,_id:req.params.idd});
		return res.send(deleteProject);
	});
});

projectRouter.post('/update/:id',auth.optional, (req,res)=>{
	User.findById(req.payload.id).then(async function (user){
		const result = await Project.findOneAndUpdate({user:user._id,_id:req.params.id},req.body);
		var project = await Project.findOne({user:user._id,_id:req.params.id});
		if(project.status == "Completed"){
			project.timeline.push({
				"date": new Date(),
				"description": "Project completed."
			});
		}else if(project.status = "Cancel"){
			project.timeline.push({
				"date" : new Date(),
				"description": "Project cenceled."
			});
		}else{
			project.timeline.push({
				"date" : new Date(),
				"description": "Project updated."
			});
		}
		project.save();
		return res.json({"result":result});
	});
});

projectRouter.post('/add_people/:id',auth.optional, (req,res)=>{
	User.findById(req.payload.id).then(async function (user){
		var project = await Project.findOne({user:user._id,_id:req.params.id});
		for(ele of req.body.new_users){
			if(!project.contributors.includes(ele)){
				project.contributors.push(ele);
			}
		}
		project.save();
	});
});

projectRouter.post('/remove_people/:id',auth.optional, (req,res)=>{
	User.findById(req.payload.id).then(async function (user){
		var project = await Project.findOne({user:user._id,_id:req.params.id});
		for(ele of req.body.old_users){
			
			if(project.contributors.includes(ele)){
				project.contributors.splice(project.contributors.indexOf(ele),1);
			}
		}
		project.save();
	});
});

projectRouter.post('/process/:id',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async function (user){
		var project = await Project.findOne({user:user._id,_id:req.params.id});
		const newProcess = {
			"processNum":parseInt(req.body.process.processNum),
			"description": req.body.process.description,
			"status": req.body.process.status,
			"nodes": []
		};
		if(newProcess.processNum > (project.process.length + 1)){
			newProcess.processNum = project.process.length + 1;
		}
		if(newProcess.processNum == (project.process.length + 1)){
			project.process.push(newProcess);
			project.timeline.push({
				"date":new Date(),
				"description":"Process " + newProcess.processNum + " created."
			});
			project.save();
		}else{
			for(ele of project.process){
				if(ele.processNum >= newProcess.processNum){
					ele.processNum = ele.processNum + 1;
				}
			}
			project.process.push(newProcess);
			project.process.sort((a,b)=> a.processNum - b.processNum);
			project.timeline.push({
				"date":new Date(),
				"description":"Process " + newProcess.processNum + " inserted."
			})
			project.save();


		}
	})
});

projectRouter.post('/process/remove/:id',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async function (user){
		var project = await Project.findOne({user:user._id,_id:req.params.id});
		const processNum = parseInt(req.body.processNum);
		if(processNum <= project.process.length){
			project.process.splice((processNum-1),1);
			for(ele of project.process){
				if(ele.processNum > processNum){
					ele.processNum = ele.processNum -1;
				}
			}
			project.timeline.push({
				"date":new Date(),
				"description": "Process " + processNum + " removed."
			});
			project.save();
		}
	})
});

projectRouter.post('/process/update/:id',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async function (user){
		var project = await Project.findOne({user:user._id,_id:req.params.id});
		const processNum = parseInt(req.body.processNum);
		var toComplete = false;
		if(processNum <= project.process.length){

			if(req.body.description){
				project.process.sort((a,b)=> a.processNum - b.processNum)[processNum-1]['description'] = req.body.description;
			}

			if(req.body.status){
				if(project.process.sort((a,b)=> a.processNum - b.processNum)[processNum-1].status == "incomplete" && req.body.status == "complete"){
					toComplete = true;
				}
				project.process.sort((a,b)=> a.processNum - b.processNum)[processNum-1].status = req.body.status;
			}
			if(toComplete){
				project.timeline.push({
					"date" : new Date(),
					"description": "Process " + processNum + " completed."
				});	
			}else{
				project.timeline.push({
					"date" : new Date(),
					"description": "Process " + processNum + " updated."
				});
			}
			project.save();
		}
	});
});

//c nodes
projectRouter.post('/process/node/:id',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async function(user){
		var project = await Project.findOne({user:user._id,_id:req.params.id});
		if(req.body.processNum && (req.body.processNum <= project.process.length)){
			
			project.process[req.body.processNum - 1].nodes.push({
				"name": req.body.name,
				"description": req.body.description,
				"state": false,
				"index": project.process[req.body.processNum - 1].nodes.length + 1
			});
			project.markModified('process');
			project.save();
		}else{
			console.log("Index invalid");
			return res.send("Invalid Index");
		}
	});
});
//r nodes
//already there in get project

//u nodes
projectRouter.post('/process/node/update/:id',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async function(user){
		var project = await Project.findOne({user:user._id,_id:req.params.id});
		if(req.body.processNum && (req.body.processNum <= project.process.length)){
			if(req.body.name){
				project.process[req.body.processNum - 1].nodes.find(ele => ele.index = req.body.nodeIndex).name = req.body.name;
			}
			if(req.body.description){
				project.process[req.body.processNum - 1].nodes.find(ele => ele.index = req.body.nodeIndex).description = req.body.description;	
			}
			project.markModified('process');
			project.save();
		}else{
			console.log("Index invalid");
			return res.send("Invalid Index");
		}
	});
});
//d nodes
projectRouter.post('/process/node/remove/:id',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async function(user){
		var project = await Project.findOne({user:user._id,_id:req.params.id});
		if(req.body.processNum && (req.body.processNum <= project.process.length)){
			if(req.body.nodeIndex && req.body.nodeIndex <= project.process[req.body.processNum-1].nodes.length){
				for(index in project.process[req.body.processNum-1].nodes){
					if(project.process[req.body.processNum-1].nodes[index].index == req.body.nodeIndex){
						project.process[req.body.processNum-1].nodes.splice(index,1);
					}
					
				}
				for(index in project.process[req.body.processNum-1].nodes){
					if (project.process[req.body.processNum-1].nodes[index].index > req.body.nodeIndex){
						project.process[req.body.processNum-1].nodes[index].index = project.process[req.body.processNum-1].nodes[index].index -1;
					}
				}
				project.markModified('process');
				project.save();
			}
		}
	});
});

//finish nodes
projectRouter.post('/process/node/finish/:id',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async function(user){
		var project = await Project.findOne({user:user._id,_id:req.params.id});
		if(req.body.processNum && (req.body.processNum <= project.process.length)){
			if(req.body.nodeIndex && req.body.nodeIndex <= project.process[req.body.processNum-1].nodes.length){
				for(index in project.process[req.body.processNum-1].nodes){
					if(project.process[req.body.processNum-1].nodes[index].index == req.body.nodeIndex){
						project.process[req.body.processNum-1].nodes[index].state = true;
					}
					
				}
				var allDone = true;
				for(index in project.process[req.body.processNum-1].nodes){
					if(!project.process[req.body.processNum-1].nodes[index].state){
						allDone = false;
						break;
					}
				}
				if(allDone){
					project.process[req.body.processNum-1].status = "complete";
					project.timeline.push({
					"date" : new Date(),
					"description": "Process " + req.body.processNum + " completed."
				});	
				}
				project.markModified('process');
				project.markModified('timeline');
				project.save();
			}
		}
	});
})

//project name/ status search
projectRouter.post('/conditional',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async function(user){
		var sql = {}
		sql.user = user;
		if(req.body.name){
			sql.name = req.body.name;
		}
		if(req.body.status){
			sql.status = req.body.status;
		}
		var projects = await Project.find(sql);
		if(req.body.sortBy){
			if(req.body.sortBy == "ascending"){
				projects.sort((a,b)=>a.updatedAt - b.updatedAt);
			}else{
				projects.sort((a,b)=>b.updatedAt - a.updatedAt);
			}
		}
		//console.log(projects);
		return res.json({"result":projects});
	});
});
//sort by last update
module.exports = projectRouter;