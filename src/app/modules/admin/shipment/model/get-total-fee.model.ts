export interface GetShippingFeeResponse {
  success: boolean;
  message: string;
  data: ShippingData;
}

interface ShippingData {
  tier: Tier;
  size: Size;
  transit: Transit;
  serviceType: ServiceType;
  shippingFee: number;
  isBostaMaterialFee: boolean;
  bostaMaterialFee: BostaMaterialFee;
  currency: string;
  vat: number;
  priceBeforeVat: number;
  priceAfterVat: number;
  sizeEffectCost: number;
  dropOffZoneFees: number;
  pickupZoneFees: number;
}

interface Tier {
  _id: string;
  name: string;
  cost: number;
  zeroCodDiscount: ZeroCodDiscount;
  extraCodFee: ExtraCodFee;
  expediteFee: ExpediteFee;
  insuranceFee: InsuranceFee;
  codFee: CodFee;
  posFee: PosFee;
  bostaMaterialFee: BostaMaterialFee;
  configurations: Configurations;
  extraWeight: ExtraWeight;
  country: Country;
  isInitial: boolean;
  isDefault: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  openingPackageFee: OpeningPackageFee;
}

interface ZeroCodDiscount {
  amount: number;
}

interface ExtraCodFee {
  percentage: number;
  codAmount: number;
  minimumFeeAmount: number;
}

interface ExpediteFee {
  percentage: number;
  minimumFeeAmount: number;
}

interface InsuranceFee {
  percentage: number;
  minimumFeeAmount: number;
}

interface CodFee {
  amount: number;
}

interface PosFee {
  percentage: number;
  minimumFeeAmount: number;
}

interface BostaMaterialFee {
  amount: number;
}

interface Configurations {
  zeroCodDiscount: boolean;
  extraCodFee: boolean;
  insuranceFee: boolean;
  expediteFee: boolean;
  codFee: boolean;
  posFee: boolean;
  paymentFrequency: string;
  paymentSchedule: string[];
  paymentTransferMethod: string[];
  weighting: string;
  bostaMaterialFee: boolean;
  restriction: Restriction;
  openingPackageFee: boolean;
}

interface Restriction {
  merchantsRestricted: boolean;
  businessIds: string[];
}

interface ExtraWeight {
  weightThresholdInKg: number;
  costForWeightThreshold: number;
  costForAdditionalKgWeight: number;
  _id: string;
  excludeDeliveryTypesFromAdditionalWeighCostEnabled: boolean;
  excludedDeliveryTypesFromAdditionalWeighCost: string[];
}

interface Country {
  _id: string;
  name: string;
  nameAr: string;
  code: string;
  currency: string;
  vat: number;
}

interface Size {
  _id: string;
  name: string;
  alias: string;
  rate: string;
  cost: number;
  multiplier: number;
}

interface Transit {
  _id: string;
  originSectorId: number;
  destinationSectorId: number;
  cost: number;
}

interface ServiceType {
  _id: string;
  name: string;
  rate: string;
  cost: number;
}

interface OpeningPackageFee {
  amount: number;
}
