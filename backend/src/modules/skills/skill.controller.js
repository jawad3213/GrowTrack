const skillService = require("./skill.service");
const { success } = require("../../shared/utils/response");

exports.getAll = async (req, res, next) => {
  try {
    const skills = await skillService.getAllSkills(req.query);
    return success(res, 200, "Skills retrieved successfully", skills);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const skill = await skillService.getSkillById(req.params.id);
    return success(res, 200, "Skill retrieved successfully", skill);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const skill = await skillService.createSkill(req.body);
    return success(res, 201, "Skill created successfully", skill);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const skill = await skillService.updateSkill(req.params.id, req.body);
    return success(res, 200, "Skill updated successfully", skill);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await skillService.deleteSkill(req.params.id);
    return success(res, 200, "Skill deleted successfully", null);
  } catch (err) {
    next(err);
  }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await skillService.getSkillCount();
    return success(res, 200, "Skill count retrieved", { count });
  } catch (err) {
    next(err);
  }
};
