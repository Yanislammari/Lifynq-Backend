import User from "../models/entities/user/user";
import UserRequestDto from "../models/entities/user/dto/user.request.dto";
import UserResponseDto from "../models/entities/user/dto/user.response.dto";
import IMapper from "./mapper";

class UserMapper implements IMapper<User, UserRequestDto, UserResponseDto> {
  toEntity(dto: UserRequestDto): User {
    return {
      id: "",
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      firstName: dto.firstName,
      lastName: dto.lastName,
      age: dto.age,
      rating: 5,
      role: dto.role,
      profilePictureUrl: dto.profilePictureUrl,
      bio: dto.bio,
      profession: dto.profession,
      address: dto.address,
      city: dto.city,
      country: dto.country,
      postalCode: dto.postalCode
    };
  }

  toRequestDTO(entity: User): UserRequestDto {
    return {
      email: entity.email,
      phoneNumber: entity.phoneNumber,
      firstName: entity.firstName,
      lastName: entity.lastName,
      age: entity.age,
      role: entity.role,
      profilePictureUrl: entity.profilePictureUrl,
      bio: entity.bio,
      profession: entity.profession,
      address: entity.address,
      city: entity.city,
      country: entity.country,
      postalCode: entity.postalCode
    };
  }

  toResponseDTO(entity: User): UserResponseDto {
    return {
      id: entity.id,
      email: entity.email,
      phoneNumber: entity.phoneNumber,
      firstName: entity.firstName,
      lastName: entity.lastName,
      age: entity.age,
      rating: entity.rating,
      role: entity.role,
      profilePictureUrl: entity.profilePictureUrl,
      bio: entity.bio,
      profession: entity.profession,
      address: entity.address,
      city: entity.city,
      country: entity.country,
      postalCode: entity.postalCode
    };
  }
}

export default UserMapper;
