const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/User.js');

// CREATE - Crear usuario
router.post('/create', async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al crear usuario'
    });
  }
});

// READ - Obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al obtener usuarios'
    });
  }
});

// READ - Obtener un usuario por ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'ID no válido'
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al obtener usuario'
    });
  }
});

// UPDATE - Actualizar usuario por ID
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'ID no válido'
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al actualizar usuario'
    });
  }
});

// DELETE - Eliminar usuario por ID
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'ID no válido'
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al eliminar usuario'
    });
  }
});

module.exports = router;