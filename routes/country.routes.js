import express from "express";

export function createCountryRouter(countryService) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const countries = await countryService.getVisitedCountries();
    res.render("index.ejs", {
      countries,
      total: countries.length
    });
  });

  router.post("/add", async (req, res) => {
    try {
      await countryService.addCountryByName(req.body.country);
      res.redirect("/");
    } catch (error) {
      const countries = await countryService.getVisitedCountries();
      res.render("index.ejs", {
        countries,
        total: countries.length,
        error: error.message
      });
    }
  });

  return router;
}
