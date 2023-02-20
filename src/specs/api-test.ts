import { createUser } from "../api/potlukk-requests"
import { CreateUserForm, LukkerUserInfo } from "../reducers/potlukk-reducer"

const testUser: CreateUserForm = {
    username:"joe",
    password:"password",
    fname:"joe",
    lname:"smith",
    allergies:[]
}

test("CREATE user", async ()=>{
    const result:LukkerUserInfo = await createUser(testUser)
    console.log("result = "+result)
    //expect(result.userId).toBe(true);
})