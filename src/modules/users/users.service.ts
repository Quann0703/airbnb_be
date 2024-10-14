/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { InjectModel } from '@nestjs/mongoose';

import {
  ChangePasswordDto,
  CodeAuthDto,
  CreateUserDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { hashPasswordHelper } from '@/helpers/utills';
import { CreateAuthDto, CreateAuthGoogleDto } from '@/auth/dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email: email });
    if (user) return true;
    return false;
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;
    const isExist = await this.isEmailExist(email);
    if (isExist === true) {
      throw new BadRequestException(
        '`Email đã tồn tại: ${email}. Vui lòng sử dụng email khác.`',
      );
    }
    //hashpassword
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image,
    });
    return {
      _id: user._id,
    };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * pageSize;

    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select('-password')
      .sort(sort as any);

    return { results, totalPages };
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    return { user };
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async getCurrentUser(email: string) {
    const isEmailExist = await this.isEmailExist(email);

    if (!isEmailExist) {
      throw new BadRequestException(
        `Email ko ton tai:${email} vui long su dung email khac`,
      );
    }
    const user = await this.userModel.findOne({ email: email });
    return {
      user: {
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        isVerify: user?.isActive,
        role: user?.role,
      },
    };
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }

  async remove(_id: number) {
    if (mongoose.isValidObjectId(_id)) {
      return await this.userModel.deleteOne({ _id });
    } else {
      throw new BadRequestException('Id không đúng định dạng mongodb');
    }
  }

  async handelRegister(registerDto: CreateAuthDto) {
    const { email, password, name } = registerDto;

    const isEmailExist = await this.isEmailExist(email);

    if (isEmailExist) {
      throw new BadRequestException(
        `Email da ton tai:${email} vui long su dung email khac`,
      );
    }
    const hashPassword = await hashPasswordHelper(password);
    const codeId = uuidv4();
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(1, 'minutes'),
    });

    //sent email
    this.mailerService.sendMail({
      to: user?.email,
      from: 'noreply@nestjs.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      template: 'register',
      context: {
        name: user?.name ?? user?.email,
        activationCode: codeId,
      },
    });
    return {
      _id: user._id,
    };
  }

  async handleGoogle(data: CreateAuthGoogleDto) {
    const { email, name, image } = data;
    const isEmailExist = await this.isEmailExist(email);

    // if (isEmailExist) {
    //   throw new BadRequestException(
    //     `Email da ton tai:${email} vui long su dung email khac`,
    //   );
    // }
    let user = await this.userModel.findOne({ email: email });
    if (!user) {
      user = await this.userModel.create({
        name,
        email,
        image,
        isActive: true,
      });
    }
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
  }

  async handleActive(data: CodeAuthDto) {
    const user = await this.userModel.findOne({
      _id: data._id,
      codeId: data.code,
    });

    if (!user) {
      throw new BadRequestException('Mã code không hợp lệ hoặc đã hết hạn');
    }

    //check expire code
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);

    if (isBeforeCheck) {
      await this.userModel.updateOne(
        {
          _id: data._id,
        },
        {
          isActive: true,
        },
      );
      return { isBeforeCheck };
    } else {
      throw new BadRequestException('Mã code không hợp lệ hoặc hết hạn');
    }
  }

  async handleRetry(email: string) {
    const codeId = uuidv4();
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new BadRequestException('tai khoan khong ton tai');
    }
    if (user.isActive) {
      throw new BadRequestException('tai khoan đã được kích hoat');
    }
    //update user trước khi gửi lại email
    await user.updateOne({
      codeId: codeId,
      codeExpired: dayjs().add(1, 'minutes'),
    });
    //resent email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      from: 'noreply@nestjs.com', // sender address
      subject: 'Activate your account at @Quandev', // Subject line
      template: 'register',
      context: {
        name: user?.name ?? user?.email,
        activationCode: codeId,
      },
    });
    return {
      _id: user._id,
    };
  }
  async handleChangePassword(data: ChangePasswordDto) {
    if (data.confirmPassword !== data.password) {
      throw new BadRequestException('Mật khẩu không chính xác');
    }
    const user = await this.userModel.findOne({ email: data.email });

    if (!user) {
      throw new BadRequestException('người dùng không tồn tại');
    }

    const isBeforeCheck = dayjs().isBefore(user.codeExpired);

    if (isBeforeCheck) {
      const newPassword = await hashPasswordHelper(data.password);
      await user.updateOne({ password: newPassword });
      return {
        isBeforeCheck,
      };
    } else {
      throw new BadRequestException('Mã code không hợp lệ hoặc hết hạn');
    }
  }

  async handleRetryPassword(email: string) {
    const codeId = uuidv4();

    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new BadRequestException('người dùng không tồn tại');
    }
    await user.updateOne({
      codeId: codeId,
      codeExpired: dayjs().add(1, 'minutes'),
    });
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      from: 'noreply@nestjs.com', // sender address
      subject: 'change your password account at @Quandev', // Subject line
      template: 'register',
      context: {
        name: user?.name ?? user?.email,
        activationCode: codeId,
      },
    });
    return {
      _id: user?._id,
      email: user?.email,
    };
  }
}
