class SwapiService {
  _apiBase = "https://swapi.co/api";

  async getResourse(url) {
    const response = await fetch(`https://swapi.co/api${url}`);
    if (!response.ok) {
      throw new Error(
        `Could not fetch ${url} received status: ${response.status}`
      );
    }
    return await response.json();
  }

  async getAllPeople() {
    const response = await this.getResourse(`/people/`);
    return response.results;
  }

  getPerson(id) {
    return this.getResourse(`/people/${id}/`);
  }
  
  async getAllStarships() {
    const response = await this.getResourse(`/starships/`);
    return response.results;
  }

  getStarship(id) {
    return this.getResourse(`/starships/${id}/`);
  }

  async getAllPlanets() {
    const response = await this.getResourse(`/planets/`);
    return response.results;  
  }

  getPlanet(id) {
    return this.getResourse(`/planets/${id}/`);
  }
}
