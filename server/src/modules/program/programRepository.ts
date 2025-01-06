import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type ProgramInput = {
  id: number;
  title: string;
  synopsis?: string;
};

class ProgramRepository {
  async create(program: Omit<ProgramInput, "id">) {
    // Execute the SQL INSERT query to add a new program to the "program" table
    const [result] = await databaseClient.query<Result>(
      "insert into program (title, synopsis) values (?, ?)",
      [program.title, program.synopsis],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific program by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from program where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the program
    return rows[0] as ProgramInput;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "program" table
    const [rows] = await databaseClient.query<Rows>("select * from program");

    // Return the array of categories
    return rows as ProgramInput[];
  }

  async update(program: ProgramInput) {
    const { title, synopsis, id } = program;

    // Si `synopsis` est undefined, nous pouvons le traiter en mettant `NULL` à la place
    const query = "UPDATE program SET title = ?, synopsis = ? WHERE id = ?";
    const values = [title, synopsis || null, id];

    const [result] = await databaseClient.query<Result>(query, values);
    return result.affectedRows;
  }

  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing program from the "program" table
    const [result] = await databaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new ProgramRepository();
