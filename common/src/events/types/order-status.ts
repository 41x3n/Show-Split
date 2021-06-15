export enum OrderStatus {
  // When the order has been created, but the ticket it is trying to order has not been reserved
  Created = "created",

  // The ticker the order is trying to reserve has already been reserved, or when the user has cancelled the order, or The order expires before payment
  Cancelled = "cancelled",

  // The order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",

  // The order has succesfully reserved the ticket and the user has provided payment successfully
  Complete = "complete",
}
