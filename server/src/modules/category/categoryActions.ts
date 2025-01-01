// Import access to data

import categoryRepository from "./categoryRepository";

// Declare the actions

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all categories
    const categories = await categoryRepository.readAll();

    // Respond with the categories in JSON format
    res.json(categories);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific category based on the provided ID
    const categoryId = Number(req.params.id);
    const category = await categoryRepository.read(categoryId);

    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the category in JSON format
    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific category based on the provided ID
    const category = {
      id: Number(req.params.id),
      name: req.body.name,
    };

    const affectedRows = await categoryRepository.update(category);

    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the category in JSON format
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
    // Extract the category data from the request body
    const newCategory = {
      name: req.body.name,
    };

    // Create the category
    const insertId = await categoryRepository.create(newCategory);

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
    const categoryId = Number(req.params.id);

    await categoryRepository.delete(categoryId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Export them to import them somewhere else

export default { browse, read, edit, add, destroy };
