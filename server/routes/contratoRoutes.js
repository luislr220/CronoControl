const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contractController");

// Obtener todos los contratos
router.get("/", contractController.getAllContracts);

// Obtener un contrato por su ID
router.get("/:id", contractController.getContractById);

// Crear un nuevo contrato
router.post("/", contractController.createContract);

// Actualizar un contrato existente
router.put("/:id", contractController.updateContract);

// Eliminar un contrato por su ID
router.delete("/:id", contractController.deleteContract);

module.exports = router;
