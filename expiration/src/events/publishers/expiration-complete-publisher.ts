import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@showsplit/common";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
