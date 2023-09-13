import Company from '../models/Company.model.js'

export class UserDAO {
  static async getUsersByCompanyId(companyId) {
    try {
      const company = await Company.findById(companyId)
      return company.users
    } catch (error) {
      throw error
    }
  }

  static async addUser(companyId, userData) {
    try {
      const company = await Company.findById(companyId)
      company.users.push(userData)
      const savedCompany = await company.save()
      return savedCompany.users[savedCompany.users.length - 1]
    } catch (error) {
      throw error
    }
  }

  // Agrega más métodos según tus necesidades (actualizar, eliminar, etc.)
}

