import {CompanyDAO} from '../dao/class/dao.company.js'

const Company = new CompanyDAO;

// Obtener todas las compañías
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.getAllCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener una compañía por su ID
export const getCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const company = await Company.getCompanyById(id);
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Crear una nueva compañía
export const addNewCompany = async (req, res) => {
  const companyData = req.body;
  try {
    const newCompany = await Company.createCompany(companyData);
    res.json(newCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar una compañía
export const updateCompany = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  try {
    const updatedCompany = await Company.updateCompany(id, newData);
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Eliminar una compañía
export const deleteCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCompany = await Company.deleteCompany(id);
    res.json(deletedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

