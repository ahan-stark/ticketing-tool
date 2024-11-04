export type HamBurgerValue =
  | "createTicket"
  | "assignedTickets"
  | "resolvedTickets";

  export interface hamburgerOptions {
    option: string;
    value: HamBurgerValue;
  }