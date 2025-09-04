import { Profile } from "../models/profile.model.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { user_id: req.user.id } });
    if (!profile) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el perfil" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { user_id: req.user.id } });
    if (!profile) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }
    await profile.update(req.body);
    res.status(200).json({ message: "Perfil actualizado correctamente", profile });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};