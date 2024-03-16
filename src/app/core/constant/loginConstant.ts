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
            "maxlength":"This field must contain the maximum of 100 characters."
        },
        "email": {
            "required":"This field is required.",
            "email":"Enter the valid Email"
        },
        "fieldRequired" : {
            "required":"This field is required."
        },
        "addressError" : {
            "required":"This field is required.",
            "pattern":"Please enter valid address.",
            "maxlength":"This field must contain the maximum of 100 characters."
        },
        "phoneNumberError" : {
            "required":"This field is required.",
            "pattern":"Enter Valid phone number",
            "maxlength":"Only 10 numbers is allowed."
        },
        "zipCodeValidation" : {
            "required":"This field is required.",
            "pattern":"Enter valid zipcode."
        },
        "emailsignupValidation":{
            "required":"This field is required",
            "email":"Enter valid email",
            "alreadyExist":"This mail already exists.",
            "emailNotExist":"This mail doesn't exists."
        }
    }
}
}