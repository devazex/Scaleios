import { Objex } from "@evolvejs/objex";
import { Client } from "../Client/Client";

export const listeners = new Objex<Array<string>, Client>();

export function Event(eventName?: string) {
  return (
    target: Client,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ): void => {
    if (propertyDescriptor.writable)
      listeners.set([eventName ?? propertyKey, propertyKey], target);
  };
}
