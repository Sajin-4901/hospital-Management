export class loginConstant {
    onSignup = {
        text: "Setup ",
        subtext: "Your Account!",
        button: 'Register'
    }
    onForgotPassword = {
        text: "Forgot",
        subtext: " Your Password?",
        button: 'Reset Password'
    }
    navigationList = [
        { image: './assets/user-info.png', name: 'My Info' }
    ]

    gender = [
        'Male',
        'Female',
        'Trans gender'
    ]
    maritalStatus = [
        'Married',
        'Un-married'
    ]
    errorMessage = {
    "ERROR" : {
        "name" : { 
            "required":"This field is required.",
            "pattern":"This field must contain alphabet.",
            "maxLength":"This field must contain the maximum of 100 characters."
        },
        "email": {
            "required":"This field is required.",
            "email":"Enter the valid Email"
        },
        "fieldRequired" : {
            "required":"This field is required."
        }
    }
}
}