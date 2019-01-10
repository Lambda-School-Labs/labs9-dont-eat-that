const request = require("supertest");

const server = require("../server.js");

const recipeRouterURL = "/api/recipes";

// beforeEach(async () => {
//     const temp = await request(server).delete("/games");
//   });

  describe("/ route", () => {
    it("should return status code 200", async () => {
      let response = await request(server).get("/");
  
      expect(response.status).toBe(200);
    });
  
    it("should return json response type ", async () => {
      let response = await request(server).get("/");
  
      expect(response.type).toBe("application/json");
    });
  
    it('should return with a body like: { "Welcome to the .." }', async () => {
      let response = await request(server).get("/");
  
      expect(response.body).toContain("Welcome to the ");
    });

  })


describe("/api/recipes/all  GET", () => {
const localURL = "/all";


    it("should return status code 200", async () => {
      let response = await request(server).get(recipeRouterURL+localURL);
        expect(response.status).toBe(200);
    });
  
    it("should return json response type ", async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.type).toBe("application/json");
    });
  
    it('should return defined object', async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.body).toBeDefined();
      expect(response.body).toBeO
    });

  })

  describe("/api/recipes/:userid  GET", () => {
    const localURL = "/1";
    it("should return status code 200", async () => {
      let response = await request(server).get(recipeRouterURL+localURL);
        expect(response.status).toBe(200);
    });
  
    it("should return json response type ", async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.type).toBe("application/json");
    });
  
    it('should return defined object', async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.body).toBeDefined();
      expect(response.body).toEqual(    [{
        "id": 1,
        "name": "taco",
        "description": "Enjoy!",
        "user_id": 1
       }])
    });

  })


  describe("/api/recipes/one/:id  GET", () => {
    const localURL = "/one/1";
    it("should return status code 200", async () => {
      let response = await request(server).get(recipeRouterURL+localURL);
        expect(response.status).toBe(200);
    });
  
    it("should return json response type ", async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.type).toBe("application/json");
    });
  
    it('should return defined object', async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.body).toBeDefined();
      expect(response.body).toEqual(    [{
        "id": 1,
        "name": "taco",
        "description": "Enjoy!",
        "user_id": 1
       }])
    });

  })