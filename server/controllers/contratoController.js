const Contract = require("../models/contractSchema");

// Obtener todos los contratos
exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un contrato por su ID
exports.getContractById = async (req, res) => {
  const { id } = req.params;
  try {
    const contract = await Contract.findById(id);
    if (!contract) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }
    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo contrato
exports.createContract = async (req, res) => {
  const { name, startDate, endDate, status } = req.body;
  try {
    const newContract = new Contract({
      name,
      startDate,
      endDate,
      status,
    });
    const savedContract = await newContract.save();
    res.status(201).json(savedContract);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un contrato existente
exports.updateContract = async (req, res) => {
  const { id } = req.params;
  const { name, startDate, endDate, status } = req.body;
  try {
    const updatedContract = await Contract.findByIdAndUpdate(
      id,
      { name, startDate, endDate, status },
      { new: true }
    );
    if (!updatedContract) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }
    res.status(200).json(updatedContract);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un contrato por su ID
exports.deleteContract = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContract = await Contract.findByIdAndDelete(id);
    if (!deletedContract) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }
    res.status(200).json({ message: "Contrato eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
