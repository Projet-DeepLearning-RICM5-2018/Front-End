import {Offer} from "./offer";
import {Field} from "./field";

export class Prediction {
  id: number;
  offer: Offer;
  fields: Field[];
  mark: number;
  inbase: boolean;
}
