// ==========================================
// FILE: src/lib/analytics.ts
// ==========================================

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Usage examples:
// trackEvent('copy_code', 'discount_code', 'FTMO10OFF');
// trackEvent('visit_firm', 'outbound_link', 'FTMO');
// trackEvent('search', 'site_search', searchQuery);