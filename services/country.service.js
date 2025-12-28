export class CountryService {
  constructor(countryRepository) {
    this.repository = countryRepository;
  }

  async getVisitedCountries() {
    return this.repository.getVisitedCountries();
  }
 async addVisitedCountry(countryCode)
 {
    this.repository.addVisitedCountry(countryCode);
 }

  async getVisitedCountries()
  {
    return this.repository.getVisitedCountries();
  }
  async getCountryCodeByName(countryName)
  {
     return this.repository.getCountryCodeByName(countryName);
  }

  async getCountryVisitedByCode(countryCode)
  {
     return this.repository.getCountryVisitedByCode(countryCode);
  }
  async addCountryByName(countryName) {
    if (!countryName || countryName.trim() === "") {
      throw new Error("Country name is required");
    }

    const code = await this.repository.findCountryCodeByName(countryName);

    if (!code) {
      throw new Error("Country not found");
    }

    const alreadyVisited = await this.repository.isCountryVisited(code);

    if (alreadyVisited) {
      throw new Error("Country already visited");
    }

    await this.repository.addVisitedCountry(code);
  }
}
