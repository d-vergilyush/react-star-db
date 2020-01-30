export default class SwapiService {
  _apiBase = "https://swapi.co/api";

  async getResource(url) {
    const response= await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    return await response.json();
  }

  async getAllPeople() {
    const response= await this.getResource(`/people/`);
    return response.results;
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return person;
  }

  async getAllPlanets() {
    const response= await this.getResource(`/planets/`);
    return response.results;
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return planet;
  }

  async getAllStarships() {
    const response= await this.getResource(`/starships/`);
    return response.results;
  }

  async getStarship(id) {
    const starship = this.getResource(`/starships/${id}/`);
    return starship;
  }
}
