import { Part } from './part.model';

export class Cpu {
  public _id?: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public parts: Part[];

  constructor(_id: string, name: string, description: string, imagePath: string, parts: Part[]) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.parts = parts;
  }
}
