export interface CreatePetInterface {
  _id?: string;
  breed: string;
  name: string;
  size?: string;
  description: string;
  animal?: string;
}

export interface UpdatePetInterface {
  _id?: string;
  breed: string;
  newBreedName: string;
  name: string;
  size?: string;
  description: string;
  animal?: string;
}

export interface ListPetItemInterface {
  _id: string;
  name: string;
  description: string;
  breed: {
    _id: string;
    breed: string;
    size: string;
  };
  animal: {
    _id: string;
    name: string;
  };
}
