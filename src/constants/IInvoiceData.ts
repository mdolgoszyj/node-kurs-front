
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IInvoiceData<T> = {
    invoice: {
        _id: string
        title: string
        items: InvoiceItem[]
        buyer: string
        seller: string
        userId: string
    },
    refetch: () => void
}
export type InvoiceItem = {
    _id: string
    name: string
    quantity: string
    pricePerItem: string
    totalPrice: string
}

type ExtractInvoice<T> = T extends IInvoiceData<"invoice"> ? T["invoice"] : never;
export type InvoiceType = ExtractInvoice<IInvoiceData<"invoice">>;

