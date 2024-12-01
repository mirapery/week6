## Iteration 6

### What is the purpose of userSchema.statics.login in userModel.js?

The purpose is to define a static method on the User model that encapsulates the login logic. This method simplified the controller code by providing a reusable way to validate login credentials. By including this method in the model, the controller only needs to call User.login(email, password) to handle authentication, making the code cleaner and reusable.

### Compare User.findOne({ email }) to this.findOne({ email }). When and why do we use this instead of the model's name?

When we use the model's name we are explicitly calling the findOne method on the User model. When we use this we are refering to the current model. Using this ensures the method works even if the model is imported under a different name elsewhere in the application.

### Why is bcrypt imported in userController.js and not in userModel.js?

The location of bcrypt import depends on where the password hashing and comparison logic is implemented.

If bcrypt is used inside the schema methods, it makes sense to import bcrypt in the model file. This approach centralizes authentication logic in the model. This approach is preferred as it keeps the authentication logic encapsulated in the model, making the code more modular and easier to maintain.

If hashing and comparison logic are performed directly in the controller, bcrypt must be imported there. This approach gives the controller more control over the process, but it can lead to redundancy if the same logic is needed elsewhere.

### Discuss which approach you plan to use for your project and explain why.

We will most likely be using static methods in the model. This approach reduces complexity in controllers and promotes a modular, scalable and maintainable codebase.

## Iteration 7

### What is the purpose of userSchema.statics.signup in userModel.js?

The purpose is to encapsulate business logic related to user signup within the model. It allows for centralized handling of validation and creation logic, reusability of the signup method and clean separation of concerns between the controller and model.

### Compare User.create({ email, password: hash }) to this.create({ email, password: hash }). When and why do we use this instead of the model's name?

When using this we are refering to the current context within the model's static method. This represents the model, making it dynamic and reusable even if the model name changes. Using this keeps the code flexible if the model name is renamed or the schema is reused elsewhere.

### Why is validator imported in userController.js and not in userModel.js?

The validator is imported where the validation logic is implemented.

### Which approach you plan to use for your project and explain why.

We will be using the approach with static methods in the model. This will promote the reusability of the code and keeps the conserns separated. Static methods can also be unit tested independently, which simplifies the debuggind.