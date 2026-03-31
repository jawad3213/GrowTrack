const skillModel = require("./skill.model");
const { NotFoundError, ValidationError } = require("../../shared/errors");

exports.getAllSkills = async (filters = {}) => {
  return await skillModel.findAll(filters);
};

exports.getSkillById = async (id) => {
  const skill = await skillModel.findById(id);
  if (!skill) throw new NotFoundError("Skill not found");
  return skill;
};

exports.createSkill = async (data) => {
  if (!data.nom) {
    throw new ValidationError("Skill name is required");
  }
  return await skillModel.create(data);
};

exports.updateSkill = async (id, data) => {
  const skill = await skillModel.findById(id);
  if (!skill) throw new NotFoundError("Skill not found");
  return await skillModel.update(id, data);
};

exports.deleteSkill = async (id) => {
  const skill = await skillModel.findById(id);
  if (!skill) throw new NotFoundError("Skill not found");
  return await skillModel.delete(id);
};

exports.getSkillCount = async () => {
  return await skillModel.count();
};
