import request from "supertest";
import app from "../../../../app";

describe("Users", () => {
  test("GET / --> Get Users", async () => {
    const { body } = await request(app).get("/users").query({page: 1, limit:10, name: "Su"}).expect(200);
    expect(body).toEqual({
        "success": true,
        "data": {
            "users": [
                {
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
                    "createdAt": "2022-12-04T09:16:31.941Z",
                    "updatedAt": "2022-12-04T09:16:31.941Z",
                    "__v": 0
                },
                {
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
                    "createdAt": "2022-12-04T09:30:51.187Z",
                    "updatedAt": "2022-12-04T09:30:51.187Z",
                    "__v": 0
                }
            ],
            "totalPage": 1,
            "count": 2
        },
        "message": "Get User Success"
    });
  });
});


