export const invoiceFormFields = [
  {
    name: "title",
    label: "Tytuł",
    type: "text",
  },
  {
    name: "items.name",
    label: "Nazwa przedmiotu / usługi",
    type: "text",
  },
  {
    name: "items.quantity",
    label: "Ilość",
    type: "number",
  },

 {
    name: "items.pricePerItem",
    label: "Cena za przedmiot",
    type: "number",
  },
  {
    name: "items.totalPrice",
    label: "Pełna cena?",
    type: "number",
  },
  {
    name: "buyer",
    label: "Kupujący",
    type: "text",
  },
  {
    name: "seller",
    label: "Sprzedający",
    type: "text",
  },
];
