import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateEvaluateDto {
  @IsNotEmpty({
    message: 'trường cleanliness phải được đánh giá từ 1 đến 5',
  })
  cleanliness: number;

  @IsNotEmpty({
    message: 'trường location phải được đánh giá từ 1 đến 5',
  })
  location: number;

  @IsNotEmpty({
    message: 'trường accuracy phải được đánh giá từ 1 đến 5',
  })
  accuracy: number;

  @IsNotEmpty({
    message: 'trường communication phải được đánh giá từ 1 đến 5',
  })
  communication: number;

  @IsNotEmpty({
    message: 'trường value phải được đánh giá từ 1 đến 5',
  })
  value: number;

  @IsNotEmpty({
    message: 'trường checkIn phải được đánh giá từ 1 đến 5',
  })
  checkIn: number;

  @IsNotEmpty({
    message: 'không để trống trường user',
  })
  @IsMongoId()
  user: string;
  @IsNotEmpty({
    message: 'không để trống căn hộ',
  })
  @IsMongoId()
  property: string;
}
