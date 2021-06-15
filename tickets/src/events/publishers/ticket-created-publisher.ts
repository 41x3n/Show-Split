import { Publisher, Subjects, TicketCreatedEvent } from "@showsplit/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
