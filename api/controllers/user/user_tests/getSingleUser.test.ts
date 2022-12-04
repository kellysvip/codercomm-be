import request from "supertest";
import app from "../../../../app";

describe("Users", () => {
  test("GET / --> Get single User (Kelly)", async () => {
    const { body } = await request(app).get("/users/638c656fbc0fca863d6c2155").expect(200);
    expect(body).toEqual({
        "success": true,
        "data": {
            "user": {
                "_id": "638c656fbc0fca863d6c2155",
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
                "createdAt": expect.any(String),
                "updatedAt": expect.any(String),
                "__v": 0
            },
            "friendship": null
        },
        "message": "Get Single User Success"
    });
  });
});


