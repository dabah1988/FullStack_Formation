import express from "express";
import { createDatabase } from "./database/database.factory.js";
import { CountryRepository } from "./repositories/country.repository.js";
import { CountryService } from "./services/country.service.js";

const app = express();
const port = 3000;
 let countries = [];


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Création de la db via la factory 
const database = createDatabase();
await database.connect();

//Injection des dépendances

const countryRepository = new CountryRepository(database);
const countryService = new CountryService(countryRepository);

app.get("/", async (req, res) => {
  try {
    const countries = await countryService.getVisitedCountries();
    console.log(countries);
    res.render("index.ejs", {
      countries,
      total: countries.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});


app.post("/add", async (req, res) => {
  try {
    //Write your code here.
      const countries = await countryService.getVisitedCountries();
    let countryName = encodeURIComponent(req.body["country"]);
    const countryResult = await countryService.getCountryCodeByName(countryName);
    console.log("results"+countryResult);
    if (countryResult !== null) {
      const existingCountryCode = await countryService.getCountryVisitedByCode(countryResult);
      if (existingCountryCode === null ) {
        await countryService.addVisitedCountry(countryResult);
      } else {
        res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          error: "This country is already in database"
        });
      }
      res.redirect("/");
    } else {

      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "there is no  country with this name"
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur Serveur");
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
