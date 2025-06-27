import db from "./db.js";

export async function getDatafromDB() {
  try {
    const [result] = await db.execute(
      "SELECT * FROM metrics  ORDER BY id DESC limit 1;"
    );

    console.log("data", result[0]);

    return {
      ram: result[0],
    };
  } catch (err) {
    return err;
  }
}
