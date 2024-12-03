const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

beforeAll(async () => {
  // Alustetaan testikäyttäjä ja tallennetaan token
  await User.deleteMany({});  // Poistetaan kaikki käyttäjät
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" }); // Rekisteröidään uusi käyttäjä
  token = result.body.token;  // Tallennetaan token, jota käytetään tunnistukseen
});

describe("Workout API", () => {

  describe("Given that there are some workouts saved initially", () => {

    let workoutId = null;

    beforeEach(async () => {
      await Workout.deleteMany({}); // Siivotaan aiemmat testitiedot
      // Lisätään alkuperäiset workoutit ennen jokaista testiä
      const res = await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(workouts[0])
        .send(workouts[1]);
      
        workoutId = res.body._id;
    });

    describe("GET /workouts", () => {
      it("should return the list of workouts as json", async () => {
        await api
          .get("/api/workouts")
          .set("Authorization", "bearer " + token)
          .expect(200)
          .expect("Content-Type", /application\/json/);
      });
    });

    describe("GET /workouts/:id", () => {
      it("should return the information of one workout as json", async () => {
        await api
          .get(`/api/workouts/${workoutId}`)
          .set("Authorization", "bearer " + token)
          .expect(200)
          .expect("Content-Type", /application\/json/);
      });
    });

    describe("POST /workouts", () => {
      it("should return a 201 status and create a new workout", async () => {
        const newWorkout = {
          title: "testworkout",
          reps: 10,
          load: 100,
        };
        await api
          .post("/api/workouts")
          .set("Authorization", "bearer " + token)
          .send(newWorkout)
          .expect(201);
      });
    });

    describe("DELETE /workouts/:id", () => {
      it("should return a 202 status", async () => {
        await api
          .delete(`/api/workouts/${workoutId}`)
          .set("Authorization", "bearer " + token)
          .expect(200);
      });
    });

    describe("PATCH /workouts/:id", () => {
      it("should return a 200 status and update workout", async () => {
        const updatedWorkout = {
          title: "updatedtestworkout",
          reps: 15,
          load: 105,
        };
        await api
          .patch(`/api/workouts/${workoutId}`)
          .set("Authorization", "bearer " + token)
          .send(updatedWorkout)
          .expect(200);
      });
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
