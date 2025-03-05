export function cleanBenefitPlanTitle(benefitPlanTitle) {
  if (benefitPlanTitle) {
    const parts = benefitPlanTitle.split("–");
    return parts.length > 1 ? parts[1].trim() : parts[0].trim();
  }
  return benefitPlanTitle;
}
