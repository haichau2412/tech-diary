import { useForm } from "react-hook-form";
import { loginSchema } from "./authSchema";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/Button";

type LoginSchema = StandardSchemaV1.InferInput<typeof loginSchema>;

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  console.log("isValid", isValid);

  return (
    <>
      <h2>Login </h2>
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

        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </form>
    </>
  );
}
