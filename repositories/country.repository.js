export class CountryRepository {
  constructor(db) {
    this.db = db;
  }

  async getVisitedCountries() {
    const result = await this.db.query(
      "SELECT country_code FROM visited_countries"
    );
    return result.rows.map(r => r.country_code);
  }


    async getCountryVisitedByCode(countryCode) {
    const result = await this.db.query("select country_code from  visited_countries where country_code = $1 ", [countryCode]);
    return result.rows[0]?.country_code ?? null;
  }


async getCountryCodeByName(countryName)
{
    const search = `%${countryName}%`;
   const result = await this.db.query(" select country_code from countries where country_name  Ilike  '%' || $1 || '%' ", [search]);
    return result.rows[0]?.country_code ?? null;
}

  async findCountryCodeByName(countryName) {
    const search = `%${countryName.toLowerCase()}%`;
    const result = await this.db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1",
      [search]
    );
    return result.rows[0]?.country_code ?? null;
  }

  async isCountryVisited(countryCode) 
  {
    const result = await this.db.query(
      "SELECT 1 FROM visited_countries WHERE country_code = $1",
      [countryCode]
    );
    return result.rows.length > 0;
  }

  async addVisitedCountry(countryCode) 
  {
    await this.db.query(
      "INSERT INTO visited_countries(country_code) VALUES ($1)",
      [countryCode]
    );
  }
}
