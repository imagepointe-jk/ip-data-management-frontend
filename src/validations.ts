import { z } from "zod";
import { designSchema } from "./dbSchema";

export function parseDesigns(json: any) {
  return z
    .object({
      totalResults: z.number(),
      designs: z.array(designSchema),
    })
    .parse(json);
}

export function parseSingleDesign(json: any) {
  return designSchema.parse(json);
}
