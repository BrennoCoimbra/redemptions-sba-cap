namespace loyaltyProgram;

entity Customers {
  key ID: UUID;
  name: String;
  email: String;
  customerNumber: Integer;
  totalPurchaseValue: Integer;
  totalRewardPoints: Integer;
  totalRedeemedRewardPoints: Integer;
}

entity Products {
  key ID: UUID;
  name: String;
  description: String;
  price: Integer;
}

entity Purchases {
  key ID: UUID;
  purchaseValue: Integer;
  rewardPoints: Integer;
  customer: Association to Customers;
  selectedProduct: Association to Products;
}

entity Redemptions {
  key ID: UUID;
  redeemedAmount: Integer;
  customer: Association to Customers;
}

