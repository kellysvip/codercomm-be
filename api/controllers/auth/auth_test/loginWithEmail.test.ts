import request from "supertest";
import app from "../../../../app";

describe("Users Login", () => {

  test("POST /users --> user Sunny Login", async () => {
    const { body } = await request(app)
      .post("/auth/login")
      .send({
        "email": "sunny.duong.02@gmail.com",
        "password": "123456"
      })
      .expect(200);
    expect(body).toEqual({
        "success": true,
        "data": {
            "user": {
                "_id": "638c68cb314a4f698631550b",
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
                "createdAt": expect.any(String),
                "updatedAt": expect.any(String),
                "__v": 0
            },
            "accessToken": expect.any(String)
        },
        "message": "Login Success"
    });
  });

  test("POST /users --> user Sunny login with wrong password", async () => {
    const { body } = await request(app)
      .post("/auth/login")
      .send({
        "email": "sunny.duong.02@gmail.com",
        "password": "12345"
      })
      .expect(200);
    expect(body).toEqual({
        "errMessage": "Wrong Password"
    });
  });

 
});
