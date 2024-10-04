import request from 'supertest'
import app from '../../../src/app'

describe("Test app.ts", () => {
    test("Root route", async () => {
        const res = await request(app)
            .post("/v1/oauth/login")
            .send({
                email: "abc@123.com",
                oauthId: "123456",
                name: "Leon",
                provider: "google",
            });
        console.log(res.body)
        expect(res.statusCode).toEqual(200);
        expect(res.body.user.email).toEqual("abc@123.com");
    })
})