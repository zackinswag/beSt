export const getTrialActive = (trialStartDate, trialDays = 30) => {
  if (!trialStartDate) return false;
  const trialStart = new Date(trialStartDate);
  const now = new Date();
  const diffDays = Math.ceil((now - trialStart) / (1000 * 60 * 60 * 24));
  return diffDays <= trialDays;
};

export const hasTierAccess = ({ tier, trialStartDate, requiresPremium }) => {
  if (!requiresPremium) return true;
  if (tier && tier !== 'free') return true;
  return getTrialActive(trialStartDate);
};
