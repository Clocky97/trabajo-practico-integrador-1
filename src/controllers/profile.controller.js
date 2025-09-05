import { Profile } from "../models/profile.model.js";

// Crear un perfil
export const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los perfiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un perfil por ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un perfil
export const updateProfile = async (req, res) => {
  try {
    const [updated] = await Profile.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ error: "Profile not found" });
    const updatedProfile = await Profile.findByPk(req.params.id);
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un perfil
export const deleteProfile = async (req, res) => {
  try {
    const deleted = await Profile.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Profile not found" });
    res.json({ message: "Profile deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};