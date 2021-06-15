import { Publisher, OrderCancelledEvent, Subjects } from "@showsplit/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
