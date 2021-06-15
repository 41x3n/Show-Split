import { Publisher, OrderCreatedEvent, Subjects } from "@showsplit/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
