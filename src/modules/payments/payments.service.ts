/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from '../properties/schemas/property.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentsService {
  private clientId: string;
  private clientSecret: string;
  private environment: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectModel(Property.name)
    private propertyModel: Model<Property>,
  ) {
    this.clientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    this.clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET');
    this.environment = this.configService.get<string>('PAYPAL_ENVIRONMENT');
  }
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { propertyId, userId, night } = createPaymentDto;
    const currency = 'USD';
    const exchangeRate = 23000;

    // Tìm kiếm thông tin tài sản
    const property = await this.propertyModel.findOne({ _id: propertyId });
    if (!property) {
      throw new BadRequestException('Không có căn hộ nào');
    }

    // Giá của phòng mỗi đêm trong USD
    const pricePerNightInUSD = (property.pricePerNight / exchangeRate).toFixed(
      2,
    );
    const totalPriceInUSD = (Number(pricePerNightInUSD) * night).toFixed(2); // Tổng tiền cho số đêm đã đặt

    // Lấy access token từ PayPal
    const token = await this.getAccessToken();
    console.log('Access Token:', token); // In token ra console để kiểm tra

    // Tạo cấu trúc purchase units
    const purchaseUnits = [
      {
        amount: {
          currency_code: currency,
          value: totalPriceInUSD, // Tổng tiền cho số đêm
          breakdown: {
            item_total: {
              currency_code: currency,
              value: totalPriceInUSD, // Tổng tiền cho số đêm
            },
          },
        },
        items: [
          {
            name: property.title,
            description: property.title,
            unit_amount: {
              currency_code: currency,
              value: pricePerNightInUSD, // Giá mỗi đêm
            },
            quantity: night, // Số đêm thuê, sử dụng biến night
          },
        ],
      },
    ];

    // Gửi yêu cầu tạo đơn hàng
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api-m.sandbox.paypal.com/v2/checkout/orders',
          {
            intent: 'CAPTURE',
            purchase_units: purchaseUnits,
            application_context: {
              return_url: 'http://localhost:8080/api/v1/payments/return',
              cancel_url: 'http://localhost:8080/api/v1/payments/cancel',
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return {
        order: response.data,
      };
    } catch (error) {
      console.error('Error creating payment:', error.response.data);
      throw new BadRequestException('Error creating payment');
    }
  }

  private async getAccessToken() {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      'base64',
    );

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api-m.sandbox.paypal.com/v1/oauth2/token',
          'grant_type=client_credentials',
          {
            headers: {
              Authorization: `Basic ${auth}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      );

      console.log('Access Token:', response.data.access_token); // Log token để kiểm tra
      return response.data.access_token;
    } catch (error) {
      console.error(
        'Error getting access token:',
        error.response?.data || error.message,
      );
      throw new BadRequestException('Failed to get PayPal access token.');
    }
  }

  async capturePayment(orderID: string) {
    try {
      const token = await this.getAccessToken();

      const response = await firstValueFrom(
        this.httpService.post(
          `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
          {}, // Không cần body cho capture
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      // In ra thông tin lỗi chi tiết
      console.error('Error capturing payment:', error.response.data);
      throw new BadRequestException('Failed to capture payment');
    }
  }
}
