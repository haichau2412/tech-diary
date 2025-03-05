import * as z from "zod";

// enum Currency {
//     VND = "VND",
//     USD = "USD"
// }

const dishSchema = z.object({
  name: z.string().min(1).max(50),
  desc: z.string().max(100),
  type: z.string(),
  price: z.number(),
});

const variantSchema = z.object({
  name: z.string().max(50),
  option: z.array(z.string().min(1).max(50)).nonempty(),
  default: z.string().min(1).max(50),
});

// type Schema = z.infer<typeof dishSchema>;

// const defaultDish: Schema = {
//     name: '',
//     desc: '',
//     type: '',
//     price: 0
// }

export { dishSchema, variantSchema };
