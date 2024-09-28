import { Controller, Get, Res, Query } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('pay/success/checkout/session')
  async paymentSuccess(@Res() res, @Query('session_id') sessionId: string) {
    console.log("Received session ID:", sessionId); // Log de ID de sesión
    try {
      const session = await this.stripeService.successSession(sessionId);
      console.log("Retrieved session:", session); // Log de sesión obtenida
      return res.json({ message: "Payment successful", session });
    } catch (error) {
      console.error("Error fetching session:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  @Get('checkout-session')
  async createCheckoutSession() {
    return this.stripeService.createCheckoutSession();
  }
}
