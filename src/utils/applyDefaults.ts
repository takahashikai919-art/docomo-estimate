export const applyHome5GDefaults = (line: any) => {
  line.selectedPlan = {
    name: "Home5Gプラン",
    price: 5280,
  };

  line.constructionFee = 0;
line.constructionInstallment = 1;

  line.devicePrice = 73260;
  line.downPayment = 0;
  line.installment = 1;

  line.dcardDiscount = "";
  line.familyDiscount = "";
  line.longTermDiscount = "";
  line.selectedDiscounts = [];
  line.customDiscounts = [];
};

export const applyHikariDefaults = (line: any) => {
  line.selectedPlan = {
    name: "ドコモ光",
    price: 5720,
  };

  line.constructionFee = 0;
line.constructionInstallment = 1;

  line.devicePrice = 0;
  line.downPayment = 0;
  line.installment = 1;

  line.dcardDiscount = "";
  line.familyDiscount = "";
  line.longTermDiscount = "";
  line.selectedDiscounts = [];
  line.customDiscounts = [];
};

export const applyMobileDefaults = (line: any) => {
  line.selectedPlan = {
    name: "ドコモMAX（無制限）",
    price: 8448,
  };

  line.constructionFee = 0;
line.constructionInstallment = 1;

  line.devicePrice = 0;
  line.downPayment = 0;
  line.installment = 24;

  line.dcardDiscount = "";
  line.familyDiscount = "";
  line.longTermDiscount = "";
  line.selectedDiscounts = [];
  line.customDiscounts = [];
};