import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Public } from '@/decorator/customize';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get('return')
  @Public()
  async handleReturn(
    @Query('token') token: string, // Lấy token từ query parameter
    @Query('PayerID') payerID: string, // Lấy PayerID từ query parameter
  ) {
    if (token && payerID) {
      return this.paymentsService.capturePayment(token);
    } else {
      throw new BadRequestException('Missing token or payerID');
    }
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }

  @Post('paypal/create')
  async createPayMent(@Body() createPaymentDto: CreatePaymentDto) {
    const paymentResponse =
      await this.paymentsService.createPayment(createPaymentDto);

    // Lấy liên kết approve để chuyển hướng người dùng
    const approvalUrl = paymentResponse.order.links.find(
      (link) => link.rel === 'approve',
    )?.href;

    if (approvalUrl) {
      return { approvalUrl }; // Trả về URL để người dùng phê duyệt
    } else {
      throw new BadRequestException(
        'No approval URL found in payment response.',
      );
    }
  }
  @Post('paypal/capture/:orderID')
  async capturePayment(@Param('orderID') orderID: string) {
    return this.paymentsService.capturePayment(orderID);
  }
}
