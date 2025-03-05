"use client";
import LoginForm from "./(auth)/ui/AuthForm";
import Registration from "./(auth)/ui/RegistrationForm";

//Check for token data => higer order component

function FoodVendor() {
  return (
    <div className="">
      <h2>Food vendor management sds</h2>

      <LoginForm />
      <Registration />
    </div>
  );
}

export default FoodVendor;
