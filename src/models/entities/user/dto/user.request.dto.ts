import Role from "../../../enums/role";

interface UserRequestDto {
  email: string;
  tel: string;
  firstName: string;
  lastName: string;
  age: number;
  role: Role;
  profilePictureUrl?: string;
  bio?: string;
  profession?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export default UserRequestDto;
