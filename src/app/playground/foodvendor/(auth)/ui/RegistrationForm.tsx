import { useForm } from "react-hook-form";
import { registrationSchema } from "./authSchema";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/Button";

type LoginSchema = StandardSchemaV1.InferInput<typeof registrationSchema>;

function Registration() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  console.log("errors.password", errors.password);

  return (
    <>
      <h2>Register </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input {...register("username")} placeholder="Enter your username" />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>

        <div>
          <label>Age:</label>
          <input
            {...register("password")}
            placeholder="Enter your pw"
            autoComplete="off"
            type="password"
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <div>
          <label>Age:</label>
          <input
            {...register("confirmPassword")}
            placeholder="Enter your pw"
            autoComplete="off"
            type="password"
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default Registration;
