export const COUPON_CODES = {
    BFRIDAY: 'BFRIDAY',
    HALLOWEEN: 'HALLOWEEN',
    NEWYEAR: 'NEWYEAR'
} as const;

export type CouponCode = keyof typeof COUPON_CODES;