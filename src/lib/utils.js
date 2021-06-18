
export const getOrderStatus = (status) => {
  switch (status) {
    case 0:
      return 'Initiated'
    case 1:
      return 'Confirmed'
    case 2:
      return 'Payment Failed'
    case 3:
      return 'Order confirmed by vendor'
    case 4:
      return 'Item given to dop'
    case 5:
      return 'Delivered';
    default:
      return
  }
}