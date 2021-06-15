import { Publisher, Subjects, TicketUpdatedEvent } from "@showsplit/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
