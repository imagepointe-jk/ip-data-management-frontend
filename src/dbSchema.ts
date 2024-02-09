import { ZodNumber, z } from "zod";

export const designTypes = ["Screen Print", "Embroidery"] as const;
export const designTypeSchema = z.enum(designTypes);

const resourceStatuses = ["Published", "Draft"] as const;
const resourceStatusSchema = z.enum(resourceStatuses);

const designSubcategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  designCategoryId: z.number(),
});

const designTagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const imageSchema = z.object({
  id: z.number(),
  url: z.string(),
});

const colorSchema = z.object({
  id: z.number(),
  name: z.string(),
  hexCode: z.string(),
});

export const dateStringSchema = z.date().catch(new Date(0));

export const designSchema = z.object({
  id: z.number(),
  designNumber: z.number(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  featured: z.boolean(),
  date: dateStringSchema,
  status: resourceStatusSchema,
  designType: z.object({
    name: designTypeSchema,
  }),
  designSubcategories: z.array(designSubcategorySchema),
  designTags: z.array(designTagSchema),
  image: imageSchema,
  defaultBackgroundColor: colorSchema,
});

export type Design = z.infer<typeof designSchema>;
