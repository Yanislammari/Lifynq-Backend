import Role from "../../enums/role";

interface User {
  id: string;
  email: string;
  tel: string;
  firstName: string;
  lastName: string;
  age: number;
  rating: number;
  role: Role;
  profilePictureUrl?: string;
  bio?: string;
  profession?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export default User;
