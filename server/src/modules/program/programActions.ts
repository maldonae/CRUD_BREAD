// Import access to data
import programRepository from "./programRepository";

// Some data to make the trick

const program = [
  {
    id: 1,
    title: "The Good Place",
    synopsis:
      "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    poster:
      "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    country: "USA",
    year: 2016,
  },
  {
    id: 2,
    title: "Dark",
    synopsis:
      "Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
    poster:
      "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
    country: "Allemagne",
    year: 2017,
  },
];

// Declare the actions

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all programs
    const programs = await programRepository.readAll();

    // Respond with the programs in JSON format
    res.json(programs);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific program based on the provided ID
    const programId = Number(req.params.id);
    const programs = await programRepository.read(programId);

    // If the program is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the category in JSON format
    if (programs == null) {
      res.sendStatus(404);
    } else {
      res.json(programs);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific program based on the provided ID
    const programId = {
      id: Number(req.params.id),
      title: req.body.title,
      synopsis: req.body.synopsis,
      // poster: req.body.poster,
      // country: req.body.country,
      // year: req.body.year,
    };

    const affectedRows = await programRepository.update(programId);

    // If the program is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the program in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the program data from the request body
    const newProgram = {
      id: Number(req.params.id),
      title: req.body.title,
      // synopsis: req.body.synopsis,
      // poster: req.body.poster,
      // country: req.body.country,
      // year: req.body.year,
    };

    // Create the program
    const insertId = await programRepository.create(newProgram);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific category based on the provided ID
    const programId = Number(req.params.id);

    await programRepository.delete(programId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Export them to import them somewhere else

export default { browse, read, edit, add, destroy };
