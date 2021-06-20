
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
export const loaderOptions = {
  lines: 13,
  length: 20,
  width: 10,
  radius: 30,
  scale: 1.00,
  corners: 1,
  color: '#000',
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  zIndex: 2e9,
  top: '50%',
  left: '50%',
  shadow: false,
  hwaccel: false,
  position: 'absolute'
};