import request from 'supertest'
import app from '../src/app'

describe("Test app.ts", () => {
    test("Root route", async () => {
        const res = await request(app).get("/");
        // console.log(res.body)
        expect(res.text).toEqual("hello world");
    })
})