/**
 * Analytics Utility Wrapper
 * 
 * This file serves as a central hub for all custom event tracking.
 * It is currently set up as a stub. When deploying to production with
 * Vercel Analytics, Google Analytics (GA4), or Plausible, wire the
 * respective SDKs into these functions.
 */

const isProduction = import.meta.env.PROD;

export const trackEvent = (eventName, eventData = {}) => {
  if (!isProduction) {
    console.log(`[Analytics - DEV]: Event tracked -> ${eventName}`, eventData);
    return;
  }

  // Example integration for generic dataLayer (Google Tag Manager/GA4)
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData
    });
  }

  // Example integration for Vercel Analytics (requires @vercel/analytics package)
  // if (typeof window !== 'undefined' && window.va) {
  //   window.va('event', eventName, eventData);
  // }
};

export const trackProjectClick = (projectName, clickType) => {
  trackEvent('Project_Click', {
    project: projectName,
    type: clickType // e.g., 'Live Demo' or 'Source Code'
  });
};

export const trackResumeDownload = () => {
  trackEvent('Resume_Download', {
    location: window.location.pathname
  });
};

export const trackSocialClick = (platform) => {
  trackEvent('Social_Click', {
    platform: platform
  });
};

export const trackFormSubmission = (status) => {
  trackEvent('Contact_Form_Submit', {
    status: status // e.g., 'success' or 'error'
  });
};
