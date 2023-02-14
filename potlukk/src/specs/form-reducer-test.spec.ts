import { formsReducer, ValueVerify, VerificationForm } from "../reducers/form-reducer"

const initialVerify: ValueVerify ={
    value: "",
    touched: false,
    hasError: false,
    error: ""
}

const testState: VerificationForm = {
    userName: initialVerify,
    password:initialVerify,
    confirmPassword:initialVerify,
    fname:initialVerify,
    lname:initialVerify,
    milk: initialVerify,
    egg: initialVerify,
    fish: initialVerify,
    shellfish: initialVerify,
    soy: initialVerify,
    wheat:initialVerify,
    treenut:initialVerify,
    isFormValid: false
}

test("UPDATE user name", () => {
    
    const nextState = formsReducer(testState,{type:"UPDATE_USER_NAME", payload:"e"})
    expect(nextState.userName.hasError).toBe(true);
    expect(nextState.userName.touched).toBe(true);
    expect(nextState.userName.value).toBe("e");
    expect(nextState.userName.error).toBe("User name must have at least 3 characters");
    const nextState2 = formsReducer(testState,{type:"UPDATE_USER_NAME", payload:"erich"});
    expect(nextState2.userName.hasError).toBe(false);
    expect(nextState2.userName.touched).toBe(true);
    expect(nextState2.userName.value).toBe("erich");
    expect(nextState2.userName.error).toBe("");
})

test("Update password", ()=>{
    const nextState = formsReducer(testState,{type:"UPDATE_PASSWORD", payload:"super"});
    expect(nextState.password.hasError).toBe(true);
    expect(nextState.password.touched).toBe(true);
    expect(nextState.password.value).toBe("super");
    expect(nextState.password.error).toBe("Password must have at least 10 characters");
    const nextState2 = formsReducer(testState,{type:"UPDATE_PASSWORD", payload:"superpassword"});
    expect(nextState2.password.hasError).toBe(true);
    expect(nextState2.password.touched).toBe(true);
    expect(nextState2.password.value).toBe("superpassword");
    expect(nextState2.password.error).toBe("Password must have at least 1 special character");
    const nextState3 = formsReducer(testState,{type:"UPDATE_PASSWORD", payload:"superpassword!"});
    expect(nextState3.password.hasError).toBe(false);
    expect(nextState3.password.touched).toBe(true);
    expect(nextState3.password.value).toBe("superpassword!");
    expect(nextState3.password.error).toBe("");
})

test("Verify password", ()=>{
    const nextState = formsReducer(testState,{type:"UPDATE_VERIFY_PASSWORD", payload:"super"});
    expect(nextState.confirmPassword.hasError).toBe(true);
    expect(nextState.confirmPassword.touched).toBe(true);
    expect(nextState.confirmPassword.value).toBe("super");
    expect(nextState.confirmPassword.error).toBe("Passwords must match!!!");
    testState.password.value = "superpassword!";
    const nextState2 = formsReducer(testState,{type:"UPDATE_VERIFY_PASSWORD", payload:"superpassword!"});
    expect(nextState2.confirmPassword.hasError).toBe(false);
    expect(nextState2.confirmPassword.touched).toBe(true);
    expect(nextState2.confirmPassword.value).toBe("superpassword!");
    expect(nextState2.confirmPassword.error).toBe("");
})