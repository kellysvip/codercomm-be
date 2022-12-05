import request from "supertest";
import app from "../../../../app";

describe("Posts", () => {
  test("UPDATE / --> Update a Post", async () => {
    const { body } = await request(app)
      .put("/posts/638dbcb1affb715ceef56a3a")
      .send({
        image: "updatedddddddd",
        content: "helooaaa",
      })
      .expect(200);
    expect(body).toEqual({
        "success": true,
        "data": {
            "post": {
                "reactions": {
                    "like": 0,
                    "dislike": 0
                },
                "_id": "638dbcb1affb715ceef56a3a",
                "content": "helooaaa",
                "image": "updatedddddddd",
                "author": "638c68cb314a4f698631550b",
                "commentCount": 0,
                "createdAt": expect.any(String),
                "updatedAt": expect.any(String),
                "__v": 0
            }
        },
        "message": "Update Post Success"
    });
  });
});
