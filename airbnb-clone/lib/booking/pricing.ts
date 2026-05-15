export function calculateStayNights(checkInISO: string, checkOutISO: string): number {
  const checkIn = new Date(checkInISO);
  const checkOut = new Date(checkOutISO);

  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
    return 1;
  }

  const msDiff = checkOut.getTime() - checkIn.getTime();
  const nights = Math.ceil(msDiff / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : 1;
}

export function calculateBookingTotal(input: {
  nightlyPrice: number;
  nights: number;
  cleaningFee: number;
  serviceFeeRate: number;
}): {
  basePrice: number;
  serviceFee: number;
  total: number;
} {
  const basePrice = input.nightlyPrice * input.nights;
  const serviceFee = basePrice * input.serviceFeeRate;
  const total = basePrice + serviceFee + input.cleaningFee;

  return {
    basePrice,
    serviceFee,
    total,
  };
}
