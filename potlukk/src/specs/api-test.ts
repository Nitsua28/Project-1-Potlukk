import { createUser } from "../api/potlukk-requests"
import { CreateUserForm } from "../reducers/potlukk-reducer"

const testUser: CreateUserForm = {
    username:"",
    password:"",
    fname:"",
    lname:"",
    allergies:[]
}

test("CREATE user", async ()=>{
    const result = await createUser(testUser)
    console.log("result = "+result)
})