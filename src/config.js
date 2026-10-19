export const salonDetails = {
  whatsappNumber: '',
  instagramUrl: '',
  salonAddress: '',
  businessHours: '',
};

export function getWhatsAppUrl(message = 'Hello, I would like to enquire about an appointment.') {
  const number = salonDetails.whatsappNumber.replace(/\D/g, '');
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : '#contact';
}
