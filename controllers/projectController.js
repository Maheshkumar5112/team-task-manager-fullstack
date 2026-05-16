const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("members")
      .populate("createdBy");

    res.json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createProject,
  getProjects
};