import request from "supertest";
import app from "../../../../app";

describe("Users Register", () => {

  test("POST /users --> create a new user name Kelly", async () => {
    const { body } = await request(app)
      .post("/users")
      .send({
        "name": "Kelly",
        "email": "kelly.nguyen.02@gmail.com",
        "password": "123456"
      })
      .expect(200);
    expect(body).toEqual({
        "success": true,
        "data": {
            "user": {
                "name": "Kelly",
                "email": "kelly.nguyen.02@gmail.com",
                "avatarUrl": "",
                "coverUrl": "",
                "aboutMe": "",
                "city": "",
                "country": "",
                "company": "",
                "jobTitle": "",
                "facebookLink": "",
                "instagramLink": "",
                "linkedLink": "",
                "twitterLink": "",
                "friendCount": 0,
                "postCount": 0,
                "_id": expect.any(String),
                "createdAt": expect.any(String),
                "updatedAt": expect.any(String),
                "__v": 0
            },
            "accessToken": expect.any(String)
        },
        "message": "Create User Success"
    });
  });

  test("POST /users --> create a new user name Sunny", async () => {
    const { body } = await request(app)
      .post("/users")
      .send({
        "name": "Sunny",
        "email": "sunny.duong.02@gmail.com",
        "password": "123456"
      })
      .expect(200);
    expect(body).toEqual({
        "success": true,
        "data": {
            "user": {
                "name": "Sunny",
                "email": "sunny.duong.02@gmail.com",
                "avatarUrl": "",
                "coverUrl": "",
                "aboutMe": "",
                "city": "",
                "country": "",
                "company": "",
                "jobTitle": "",
                "facebookLink": "",
                "instagramLink": "",
                "linkedLink": "",
                "twitterLink": "",
                "friendCount": 0,
                "postCount": 0,
                "_id": expect.any(String),
                "createdAt": expect.any(String),
                "updatedAt": expect.any(String),
                "__v": 0
            },
            "accessToken": expect.any(String)
        },
        "message": "Create User Success"
    });
  });
});
