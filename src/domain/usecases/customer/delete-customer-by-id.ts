export interface DeleteCustomerById {
  deleteById: (id: string) => Promise<boolean>
}
