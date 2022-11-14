import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface PaymentData {
  creditCard: {
    number: string;
    name: string;
    expirationMonth: number;
    expirationYear: number;
    cvv: string;
  };
  amount: number;
  store: string;
  description: string;
}

interface PaymentGrpcService {
  payment(data: PaymentData): Observable<void>;
}

@Injectable()
export class PaymentService implements OnModuleInit {
  private paymentGrpcService: PaymentGrpcService;
  constructor(@Inject('PAYMENT_PACKAGE') private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.paymentGrpcService =
      this.clientGrpc.getService<PaymentGrpcService>('PaymentService');
  }

  payment(data: PaymentData) {
    try {
      this.paymentGrpcService.payment(data).toPromise();
    } catch (e) {
      throw new RpcException({
        code: e.code,
        message: e.message,
      });
    }
  }
}
