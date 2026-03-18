const axios = require("axios")

class ApiClient {

  constructor(){

    this.baseURL = "https://images-api.nasa.gov"

  }

  async get(endpoint){

    try{

      const response = await axios.get(this.baseURL + endpoint)
      return response

    }catch(error){

      console.error("API request failed:", error.message)
      throw error

    }

  }

}

module.exports = ApiClient