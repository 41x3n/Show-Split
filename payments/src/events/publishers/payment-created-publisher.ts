import { Subjects, Publisher, PaymentCreatedEvent } from "@showsplit/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
