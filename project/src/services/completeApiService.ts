/**
 * Complete OffersMeta API Service
 * 
 * This service provides access to ALL endpoints from the OffersMeta API documentation.
 * Each method is typed and follows the same pattern for consistency.
 */

import { apiRequest } from '../api/httpClient';

// Types for common query parameters
interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface DateRangeQuery {
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface IdQuery {
  id?: string;
  publisherId?: string;
  advertiserId?: string;
  offerId?: string;
  managerId?: string;
  clickId?: string;
  conversionId?: string;
  [key: string]: string | number | boolean | null | undefined;
}

// Publisher Endpoints
export const publisherApi = {
  // SUBADMIN ADD PUBLISHER
  addPublisher: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/addPublicher', { method: 'POST', body: payload, asFormData: true }),
  
  updatePublisher: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/updatePublisher', { method: 'PUT', body: payload, asFormData: true }),
  
  publisherList: (query?: PaginationQuery & { partners_Id?: string }) =>
    apiRequest('/publicher/publisherList', { method: 'GET', query }),
  
  publisherLoginById: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/publisherLoginById', { method: 'POST', body: payload, asFormData: true }),
  
  // Publisher Dashboard Stats
  totalPublisherClick: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/totalPublisherClick', { method: 'GET', query }),
  
  totalPublisherConversion: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/totalPublisherConverion', { method: 'GET', query }),
  
  totalPublisherPayout: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/totalPublisherPayout', { method: 'GET', query }),
  
  // Publisher Lists
  publisherConversionList: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/publisherConversionList', { method: 'GET', query }),
  
  publisherClickList: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/publisherClickList', { method: 'GET', query }),
  
  publisherImpressionList: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/publisherImpressionList', { method: 'GET', query }),
  
  publisherConversionRate: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/PublisherConversionRate', { method: 'GET', query }),
  
  publisherTotalImpression: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/PublisherTotalImpression', { method: 'GET', query }),
  
  publisherTotalEvent: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/PublisherTotalEvent', { method: 'GET', query }),
  
  // Publisher Offer Management
  approveOfferForPublisher: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/approveOfferForPublisher', { method: 'PUT', body: payload, asFormData: true }),
  
  publisherEventValueReport: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/publisherEventValueReport', { method: 'GET', query }),
  
  sendOfferToPublisher: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/sendOfferToPublisher', { method: 'POST', body: payload, asFormData: true }),
  
  generatePublisherKey: (query: IdQuery) =>
    apiRequest('/publicher/genreatePublisherKey', { method: 'PUT', query }),
  
  sendLoginDetails: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/senndLoginDetails', { method: 'POST', body: payload, asFormData: true }),
  
  // Publisher Search
  publisherSearchDataByOfferId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/publisherSerchDataByOfferId', { method: 'GET', query }),
  
  publisherSearchAllConversionData: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/publisherSearchAllConversionData', { method: 'GET', query }),
  
  // Publisher Downloads
  downloadDataInExcelSheetByPublisher: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/downloadDataInExcelSheetByPublisher', { method: 'GET', query }),
  
  downloadDataInExcelSheetByPublisherId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/downloadDataInExcelSheetByPublisherId', { method: 'GET', query }),
  
  downloadDataInExcelSheetByOfferId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/publicher/downloadDataInExcelSheetByOfferId', { method: 'GET', query }),
  
  // Publisher Status
  setPublisherInactive: (query: IdQuery) =>
    apiRequest('/publicher/pubInactive', { method: 'PUT', query }),
  
  setPublisherActive: (query: IdQuery) =>
    apiRequest('/publicher/pubActive', { method: 'PUT', query }),
  
  // Publisher Profile
  publisherSignup: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/signup', { method: 'POST', body: payload, asFormData: true }),
  
  publisherLogin: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/login', { method: 'POST', body: payload, asFormData: true }),
  
  verifyOtp: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/verifyOtp', { method: 'PUT', body: payload, asFormData: true }),
  
  resendOtp: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/resendOtp', { method: 'PUT', body: payload, asFormData: true }),
  
  forgotPassword: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/forgotPassword', { method: 'PUT', body: payload, asFormData: true }),
  
  resetPassword: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/resetPassword', { method: 'PUT', body: payload, asFormData: true }),
  
  changePassword: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/changePassword', { method: 'PUT', body: payload, asFormData: true }),
  
  editProfile: (payload: Record<string, unknown>) =>
    apiRequest('/publicher/editProfile', { method: 'PUT', body: payload, asFormData: true }),
  
  viewPublisherData: (query?: IdQuery) =>
    apiRequest('/publicher/viewData', { method: 'GET', query }),
  
  publisherListAll: (query?: PaginationQuery) =>
    apiRequest('/publicher/publicherList', { method: 'GET', query }),
};

// Advertiser Endpoints
export const advertiserApi = {
  addAdvertiser: (payload: Record<string, unknown>) =>
    apiRequest('/advertiser/addAdvertiser', { method: 'POST', body: payload, asFormData: true }),
  
  advertiserLogin: (payload: Record<string, unknown>) =>
    apiRequest('/advertiser/login', { method: 'POST', body: payload, asFormData: true }),
  
  advertiserList: (query?: PaginationQuery & { partners_Id?: string }) =>
    apiRequest('/advertiser/advertiserList', { method: 'GET', query }),
  
  updateAdvertiser: (payload: Record<string, unknown>) =>
    apiRequest('/advertiser/updateAdvertiser', { method: 'PUT', body: payload, asFormData: true }),
  
  viewAdvertiser: (query: IdQuery) =>
    apiRequest('/advertiser/advertiserView', { method: 'GET', query }),
  
  generateToken: (query: IdQuery) =>
    apiRequest('/advertiser/genreateToken', { method: 'PUT', query }),
  
  advertiserSignup: (payload: Record<string, unknown>) =>
    apiRequest('/advertiser/advertiserSignup', { method: 'POST', body: payload, asFormData: true }),
  
  updateAdvertiserPassword: (payload: Record<string, unknown>) =>
    apiRequest('/advertiser/advertiserUpdatePassword', { method: 'PUT', body: payload, asFormData: true }),
  
  // Advertiser Dashboard
  totalAdvertiserClick: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/advertiser/totalAdvertiserClick', { method: 'GET', query }),
  
  totalAdvertiserConversion: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/advertiser/totalAdvertiserConverion', { method: 'GET', query }),
  
  totalAdvertiserPayout: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/advertiser/totalAdvertiserPayout', { method: 'GET', query }),
  
  totalAdvertiserRevenue: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/advertiser/totalAdvertiserRevenue', { method: 'GET', query }),
  
  advertiserConversionList: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/advertiser/advertiserConversionList', { method: 'GET', query }),
  
  advertiserClickList: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/advertiser/advertiserClickList', { method: 'GET', query }),
  
  advertiserImpressionList: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/advertiser/advertiserImpressionList', { method: 'GET', query }),
  
  advertiserConversionRate: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/advertiser/advertiserConversionRate', { method: 'GET', query }),
  
  advertiserTotalImpression: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/advertiser/advertiserTotalImpression', { method: 'GET', query }),
  
  advertiserTotalEvent: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/advertiser/advertiserTotalEvent', { method: 'GET', query }),
  
  // Advertiser Wallet
  addAmountToWallet: (payload: Record<string, unknown>) =>
    apiRequest('/wallet/addAmount', { method: 'PUT', body: payload, asFormData: true }),
  
  viewAdvertiserWallet: (query: IdQuery) =>
    apiRequest('/wallet/advertiserViewWallet', { method: 'GET', query }),
};

// Conversion Endpoints
export const conversionApi = {
  // Postback
  postback: (query?: Record<string, string>) =>
    apiRequest('/conversion/postback', { method: 'GET', query }),
  
  sendPostback: (payload: Record<string, unknown>) =>
    apiRequest('/conversion/postback', { method: 'POST', body: payload, asFormData: true }),
  
  pixel: (query?: Record<string, string>) =>
    apiRequest('/conversion/pixel', { method: 'GET', query }),
  
  iframe: (query?: Record<string, string>) =>
    apiRequest('/conversion/iframe', { method: 'GET', query }),
  
  // Conversion Stats
  totalConversion: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/totalConversion', { method: 'GET', query }),
  
  conversionList: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/ConversionList', { method: 'GET', query }),
  
  postbackEvent: (query?: IdQuery) =>
    apiRequest('/conversion/postbackEvent', { method: 'GET', query }),
  
  invalidClick: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/invalidClick', { method: 'GET', query }),
  
  postbackLogs: (query?: PaginationQuery & DateRangeQuery) =>
    apiRequest('/conversion/postbackLogs', { method: 'GET', query }),
  
  totalPayout: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/totalPayout', { method: 'GET', query }),
  
  totalRevenue: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/totalRevenue', { method: 'GET', query }),
  
  conversionRate: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/conversionRate', { method: 'GET', query }),
  
  totalEvent: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/totalEvent', { method: 'GET', query }),
  
  totalProfit: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/totalProfit', { method: 'GET', query }),
  
  // Conversion Status Updates
  pendingConversion: (query: IdQuery) =>
    apiRequest('/conversion/pendingConversion', { method: 'PUT', query }),
  
  approvedConversion: (query: IdQuery) =>
    apiRequest('/conversion/approvedConversion', { method: 'PUT', query }),
  
  declinedConversion: (query: IdQuery) =>
    apiRequest('/conversion/DeclinedConversion', { method: 'PUT', query }),
  
  cancelConversion: (query: IdQuery) =>
    apiRequest('/conversion/cancelConversion', { method: 'PUT', query }),
  
  // Bulk Status Updates
  declinedAllConversion: (query: IdQuery) =>
    apiRequest('/conversion/DeclinedAllConversion', { method: 'PUT', query }),
  
  approvedAllConversion: (query: IdQuery) =>
    apiRequest('/conversion/approvedAllConversion', { method: 'PUT', query }),
  
  pendingAllConversion: (query: IdQuery) =>
    apiRequest('/conversion/pendingAllConversion', { method: 'PUT', query }),
  
  cancelAllConversion: (query: IdQuery) =>
    apiRequest('/conversion/cancelAllConversion', { method: 'PUT', query }),
  
  // Publisher-specific bulk updates
  declinedAllPublisherConversion: (query: IdQuery) =>
    apiRequest('/conversion/DeclinedAllPublisherConversion', { method: 'PUT', query }),
  
  approvedAllPublisherConversion: (query: IdQuery) =>
    apiRequest('/conversion/approvedAllPublisherConversion', { method: 'PUT', query }),
  
  pendingAllPublisherConversion: (query: IdQuery) =>
    apiRequest('/conversion/pendingAllPublisherConversion', { method: 'PUT', query }),
  
  cancelAllPublisherConversion: (query: IdQuery) =>
    apiRequest('/conversion/cancelAllPublisherConversion', { method: 'PUT', query }),
  
  // Advertiser-specific bulk updates
  cancelAllAdvertiserConversion: (query: IdQuery) =>
    apiRequest('/conversion/cancelAllAdvertiserConversion', { method: 'PUT', query }),
  
  pendingAllAdvertiserConversion: (query: IdQuery) =>
    apiRequest('/conversion/pendingAllAdvertiserConversion', { method: 'PUT', query }),
  
  approvedAllAdvertiserConversion: (query: IdQuery) =>
    apiRequest('/conversion/approvedAllAdvertiserConversion', { method: 'PUT', query }),
  
  declinedAllAdvertiserConversion: (query: IdQuery) =>
    apiRequest('/conversion/DeclinedAllAdvertiserConversion', { method: 'PUT', query }),
  
  // Offer-specific bulk updates
  cancelAllOfferConversion: (query: IdQuery) =>
    apiRequest('/conversion/cancelAllOfferConversion', { method: 'PUT', query }),
  
  pendingAllOfferConversion: (query: IdQuery) =>
    apiRequest('/conversion/pendingAllOfferConversion', { method: 'PUT', query }),
  
  approvedAllOfferConversion: (query: IdQuery) =>
    apiRequest('/conversion/approvedAllOfferConversion', { method: 'PUT', query }),
  
  declinedAllOfferConversion: (query: IdQuery) =>
    apiRequest('/conversion/DeclinedAllOfferConversion', { method: 'PUT', query }),
  
  // Manager-specific bulk updates
  cancelAllManagerConversion: (query: IdQuery) =>
    apiRequest('/conversion/cancelAllmanagerConversion', { method: 'PUT', query }),
  
  pendingAllManagerConversion: (query: IdQuery) =>
    apiRequest('/conversion/pendingAllmanagerConversion', { method: 'PUT', query }),
  
  approvedAllManagerConversion: (query: IdQuery) =>
    apiRequest('/conversion/approvedAllmanagerConversion', { method: 'PUT', query }),
  
  declinedAllManagerConversion: (query: IdQuery) =>
    apiRequest('/conversion/DeclinedAllmanagerConversion', { method: 'PUT', query }),
  
  // Conversion Search
  searchDataByOfferId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/serchDataByOfferId', { method: 'GET', query }),
  
  searchDataByPublisherId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/serchDataByPublisherId', { method: 'GET', query }),
  
  searchDataByAdvertiserId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/serchDataByAdvertiseId', { method: 'GET', query }),
  
  searchDataByManagerId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/serchDataByManagerId', { method: 'GET', query }),
  
  searchAllConversionData: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/searchAllConversionData', { method: 'GET', query }),
  
  // Conversion Tools
  conversionCutOff: (payload: Record<string, unknown>) =>
    apiRequest('/conversion/conversionCutOffApi', { method: 'PUT', body: payload, asFormData: true }),
  
  getConversionAccordingToDate: (query: { startDate: string }) =>
    apiRequest('/conversion/getConversionAccordingToDate', { method: 'GET', query }),
  
  optimizationTools: (payload: Record<string, unknown>) =>
    apiRequest('/conversion/optimizationTools', { method: 'PUT', body: payload, asFormData: true }),
  
  optimizationToolsList: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/optimizationToolsList', { method: 'GET', query }),
  
  invalidEventClick: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/invalidEventClick', { method: 'GET', query }),
  
  removeOptimizationTool: (query: IdQuery) =>
    apiRequest('/conversion/removeoptmizationTool', { method: 'PUT', query }),
  
  deleteConversionData: (query: IdQuery) =>
    apiRequest('/conversion/deleteConversionData', { method: 'DELETE', query }),
  
  deleteInvalidConversionData: (query: IdQuery) =>
    apiRequest('/conversion/deleteInvalidConversionData', { method: 'DELETE', query }),
  
  deleteInvalidEventConversionData: (query: IdQuery) =>
    apiRequest('/conversion/deleteInvalidEventConversionData', { method: 'DELETE', query }),
  
  // Downloads
  downloadDataInExcelSheetByPublisherId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/downloadDataInExcelSheetByPublisherId', { method: 'GET', query }),
  
  downloadDataInExcelSheetByAdvertiserId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/downloadDataInExcelSheetByadvertiserId', { method: 'GET', query }),
  
  downloadDataInExcelSheetByOfferId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/downloadDataInExcelSheetByOfferId', { method: 'GET', query }),
  
  downloadPixelLog: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/downloadPixelLog', { method: 'GET', query }),
  
  downloadEventLogsByPartners: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/conversion/downloadEventLogsByPartners', { method: 'GET', query }),
};

// Offer Endpoints
export const offerApi = {
  createOffer: (payload: Record<string, unknown>) =>
    apiRequest('/offer/createOffer', { method: 'POST', body: payload, asFormData: true }),
  
  offerList: (query?: PaginationQuery & { partners_Id?: string }) =>
    apiRequest('/offer/offerList', { method: 'GET', query }),
  
  publisherOfferList: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/offer/publisherOfferList', { method: 'GET', query }),
  
  updateOffer: (payload: Record<string, unknown>) =>
    apiRequest('/offer/updateOffer', { method: 'PUT', body: payload, asFormData: true }),
  
  deleteOffer: (query: IdQuery) =>
    apiRequest('/offer/deleteOffer', { method: 'PUT', query }),
  
  viewOffer: (query: IdQuery) =>
    apiRequest('/offer/viewOffer', { method: 'GET', query }),
  
  addLandingPage: (payload: Record<string, unknown>) =>
    apiRequest('/offer/addLandingPage', { method: 'POST', body: payload, asFormData: true }),
  
  landingPageList: (query?: IdQuery) =>
    apiRequest('/offer/landingPageList', { method: 'GET', query }),
  
  updateLandingPage: (payload: Record<string, unknown>) =>
    apiRequest('/offer/updateLandingPage', { method: 'PUT', body: payload, asFormData: true }),
  
  updateImpressionLink: (payload: Record<string, unknown>) =>
    apiRequest('/offer/updateImpressionLinlk', { method: 'PUT', body: payload, asFormData: true }),
  
  addEventValue: (payload: Record<string, unknown>) =>
    apiRequest('/offer/addEventValue', { method: 'POST', body: payload, asFormData: true }),
  
  updateEventData: (payload: Record<string, unknown>) =>
    apiRequest('/offer/updateEventData', { method: 'PUT', body: payload, asFormData: true }),
  
  deleteEventData: (query: IdQuery) =>
    apiRequest('/offer/deleteEventData', { method: 'DELETE', query }),
  
  eventList: (query?: IdQuery) =>
    apiRequest('/offer/eventList', { method: 'GET', query }),
  
  deleteLandingPage: (query: IdQuery) =>
    apiRequest('/offer/landingPageDelete', { method: 'PUT', query }),
  
  eventValueList: (query?: IdQuery) =>
    apiRequest('/offer/eventValueList', { method: 'GET', query }),
  
  getOfferApi: (query?: IdQuery) =>
    apiRequest('/offer/api', { method: 'GET', query }),
  
  addCreatives: (payload: Record<string, unknown>) =>
    apiRequest('/offer/addCreatives', { method: 'POST', body: payload, asFormData: true }),
  
  addCustomPayout: (payload: Record<string, unknown>) =>
    apiRequest('/offer/addCustomPayout', { method: 'PUT', body: payload, asFormData: true }),
  
  fetchOfferApi: (query?: IdQuery) =>
    apiRequest('/offer/fetchOfferApi', { method: 'GET', query }),
  
  getItsOffer: (query?: IdQuery) =>
    apiRequest('/offer/getltsOffer', { method: 'GET', query }),
  
  geoTargeting: (payload: Record<string, unknown>) =>
    apiRequest('/offer/geoTargeting', { method: 'PUT', body: payload, asFormData: true }),
  
  allOfferList: (query?: PaginationQuery & { partners_Id?: string }) =>
    apiRequest('/offer/allOfferList', { method: 'GET', query }),
  
  advertiserOfferList: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/offer/advertiserOfferList', { method: 'GET', query }),
  
  advertiserOfferDetails: (query: IdQuery) =>
    apiRequest('/offer/advertiserOfferDetails', { method: 'GET', query }),
  
  updateOfferType: (payload: Record<string, unknown>) =>
    apiRequest('/offer/updateOfferType', { method: 'PUT', body: payload, asFormData: true }),
  
  advertiserManagerOfferList: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/offer/advertiserManagerOfferList', { method: 'GET', query }),
  
  // Offer Status
  setOfferInactive: (query: IdQuery) =>
    apiRequest('/offer/offerInactive', { method: 'PUT', query }),
  
  setOfferActive: (query: IdQuery) =>
    apiRequest('/offer/offerActive', { method: 'PUT', query }),
  
  // Offer Search
  searchOffer: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/offer/searchOfferAPI', { method: 'GET', query }),
  
  searchPublisher: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/offer/searchpublisherAPI', { method: 'GET', query }),
  
  searchPublisherSentLog: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/offer/searchPublisherSentLogAPI', { method: 'GET', query }),
  
  // External Offers
  getExternalOfferList: (query?: PaginationQuery) =>
    apiRequest('/offer/getExternalOfferLst', { method: 'GET', query }),
};

// Report Endpoints
export const reportApi = {
  offerReport: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/report/offerReport', { method: 'GET', query }),
  
  advertiserManagerOfferReport: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/report/advertiserManagerofferReport', { method: 'GET', query }),
  
  advManageAdvertiserOfferReport: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/report/advManageAdvertiserofferReport', { method: 'GET', query }),
  
  publisherReport: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/report/publisherReport', { method: 'GET', query }),
  
  advertiserReport: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/report/advertiserReport', { method: 'GET', query }),
  
  publishersReport: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/report/publishersReport', { method: 'GET', query }),
  
  publisherManagerReport: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/report/publisherManagerReport', { method: 'GET', query }),
  
  affiliatesPerformanceReport: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/report/AffilitesPerformanceReport', { method: 'GET', query }),
  
  advertiserPerformanceReport: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/report/advertiserPerformanceReport', { method: 'GET', query }),
};

// Manager Endpoints
export const managerApi = {
  advertiserAsignList: (query: IdQuery) =>
    apiRequest('/manager/advertiserAsignList', { method: 'GET', query }),
  
  viewAdvertiserData: (query: IdQuery) =>
    apiRequest('/manager/viewAdvertiserData', { method: 'GET', query }),
  
  advertiserClickList: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/manager/advertiserClickList', { method: 'GET', query }),
  
  advertiserConversionList: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/manager/advertiserConversionList', { method: 'GET', query }),
  
  advertiserTotalClick: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/advertiserTotalClick', { method: 'GET', query }),
  
  advertiserTotalConversion: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/advertiserTotalConversion', { method: 'GET', query }),
  
  advertiserTotalPayout: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/advertiserTotalPayout', { method: 'GET', query }),
  
  advertiserTotalRevenue: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/advertiserTotalRevenue', { method: 'GET', query }),
  
  advertiserDataExport: (query: IdQuery) =>
    apiRequest('/manager/advertiserdataExport', { method: 'GET', query }),
  
  advertiserTotalEvent: (query: IdQuery) =>
    apiRequest('/manager/advertiserTotalEvent', { method: 'GET', query }),
  
  advertiserImpList: (query: PaginationQuery & IdQuery) =>
    apiRequest('/manager/advertiserImpList', { method: 'GET', query }),
  
  advertiserTotalImpression: (query: IdQuery) =>
    apiRequest('/manager/advertiserTotalImression', { method: 'GET', query }),
  
  // Publisher Manager
  assignPublisherList: (query: IdQuery) =>
    apiRequest('/manager/AssignPublisherList', { method: 'GET', query }),
  
  viewPublisherData: (query: IdQuery) =>
    apiRequest('/manager/viewPublisherData', { method: 'GET', query }),
  
  clickList: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/manager/clickList', { method: 'GET', query }),
  
  conversionList: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/manager/conversionList', { method: 'GET', query }),
  
  totalClick: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/totalClick', { method: 'GET', query }),
  
  totalConversion: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/totalConversion', { method: 'GET', query }),
  
  totalPayout: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/totalPayout', { method: 'GET', query }),
  
  totalRevenue: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/totalRevenue', { method: 'GET', query }),
  
  totalEvent: (query: IdQuery) =>
    apiRequest('/manager/totalEvent', { method: 'GET', query }),
  
  managerAddPublisher: (payload: Record<string, unknown>) =>
    apiRequest('/manager/managerAddPublisher', { method: 'POST', body: payload, asFormData: true }),
  
  impList: (query: PaginationQuery & IdQuery) =>
    apiRequest('/manager/impList', { method: 'GET', query }),
  
  totalImpression: (query: IdQuery) =>
    apiRequest('/manager/totalImression', { method: 'GET', query }),
  
  totalProfit: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/totalProfit', { method: 'GET', query }),
  
  managerSearchDataByOfferId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/managerSerchDataByOfferId', { method: 'GET', query }),
  
  managerSearchDataByPublisherId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/maangerSerchDataByPublisherId', { method: 'GET', query }),
  
  managerSearchAllConversionData: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/manager/managerSearchAllConversionData', { method: 'GET', query }),
  
  downloadDataInExcelSheetByManager: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/downloadDataInExcelSheetByManager', { method: 'GET', query }),
  
  downloadDataInExcelSheetByPublisherId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/downloadDataInExcelSheetByPublisherId', { method: 'GET', query }),
  
  downloadDataInExcelSheetByOfferId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/manager/downloadDataInExcelSheetByOfferId', { method: 'GET', query }),
  
  approvePublisher: (query: IdQuery) =>
    apiRequest('/manager/AprovedPublisher', { method: 'PUT', query }),
  
  // Sub Admin Manager
  addManager: (payload: Record<string, unknown>) =>
    apiRequest('/manager/addManager', { method: 'POST', body: payload, asFormData: true }),
  
  managerLogin: (payload: Record<string, unknown>) =>
    apiRequest('/manager/login', { method: 'POST', body: payload, asFormData: true }),
  
  updateManager: (payload: Record<string, unknown>) =>
    apiRequest('/manager/updateMagager', { method: 'PUT', body: payload, asFormData: true }),
  
  deleteManager: (query: IdQuery) =>
    apiRequest('/manager/deleteManager', { method: 'DELETE', query }),
  
  managerList: (query?: PaginationQuery) =>
    apiRequest('/manager/managerList', { method: 'GET', query }),
  
  managerCommonList: (query?: PaginationQuery) =>
    apiRequest('/manager/managerCommonList', { method: 'GET', query }),
  
  managerLoginById: (payload: Record<string, unknown>) =>
    apiRequest('/manager/managerLoginById', { method: 'POST', body: payload, asFormData: true }),
  
  uploadImage: (payload: Record<string, unknown>) =>
    apiRequest('/manager/uploadImage', { method: 'PUT', body: payload, asFormData: true }),
  
  managerViewData: (query?: IdQuery) =>
    apiRequest('/manager/managerViewData', { method: 'GET', query }),
};

// Admin Endpoints
export const adminApi = {
  adminLogin: (payload: Record<string, unknown>) =>
    apiRequest('/admin/login', { method: 'POST', body: payload, asFormData: true }),
  
  forgotPassword: (payload: Record<string, unknown>) =>
    apiRequest('/admin/forgotPassword', { method: 'PUT', body: payload, asFormData: true }),
  
  resendOtp: (payload: Record<string, unknown>) =>
    apiRequest('/admin/resendOtp', { method: 'PUT', body: payload, asFormData: true }),
  
  resetPassword: (payload: Record<string, unknown>) =>
    apiRequest('/admin/resetPassword', { method: 'PUT', body: payload, asFormData: true }),
  
  editProfile: (payload: Record<string, unknown>) =>
    apiRequest('/admin/editProfile', { method: 'PUT', body: payload, asFormData: true }),
  
  changePassword: (payload: Record<string, unknown>) =>
    apiRequest('/admin/changePassword', { method: 'PUT', body: payload, asFormData: true }),
  
  approvedAdvertiser: (query: IdQuery) =>
    apiRequest('/admin/approvedAdvertiser', { method: 'PUT', query }),
  
  addConversionLimit: (payload: Record<string, unknown>) =>
    apiRequest('/admin/addConversionLimit', { method: 'POST', body: payload, asFormData: true }),
  
  addPublisherConversionLimit: (payload: Record<string, unknown>) =>
    apiRequest('/admin/addPublisherConversionLimit', { method: 'POST', body: payload, asFormData: true }),
  
  addAdvertiserConversionLimit: (payload: Record<string, unknown>) =>
    apiRequest('/admin/addAdvertiserConversionLimit', { method: 'POST', body: payload, asFormData: true }),
  
  removeCapsLimit: (query: IdQuery) =>
    apiRequest('/admin/removeCapsLimit', { method: 'DELETE', query }),
  
  publisherCapsList: (query: IdQuery) =>
    apiRequest('/admin/publisherCapsList', { method: 'GET', query }),
  
  publisherCutbackTool: (payload: Record<string, unknown>) =>
    apiRequest('/admin/publisherCutbackTool', { method: 'POST', body: payload, asFormData: true }),
  
  cutbackList: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/admin/cutbackList', { method: 'GET', query }),
  
  cutbackDetails: (query: IdQuery) =>
    apiRequest('/admin/cutbackDetails', { method: 'GET', query }),
  
  deleteCutback: (query: IdQuery) =>
    apiRequest('/admin/deleteCutback', { method: 'DELETE', query }),
  
  viewAdminData: (query?: IdQuery) =>
    apiRequest('/admin/view', { method: 'GET', query }),
  
  partnersDetails: (query?: IdQuery) =>
    apiRequest('/admin/partnersDetails', { method: 'GET', query }),
  
  blockAdmin: (query: IdQuery) =>
    apiRequest('/admin/block', { method: 'PUT', query }),
  
  approveSubAdmin: (query: IdQuery) =>
    apiRequest('/admin/AprovedSubAdmin', { method: 'PUT', query }),
  
  partnersList: (query?: PaginationQuery) =>
    apiRequest('/admin/partnersList', { method: 'GET', query }),
  
  addPlan: (payload: Record<string, unknown>) =>
    apiRequest('/admin/addPlan', { method: 'POST', body: payload, asFormData: true }),
  
  updatePlan: (payload: Record<string, unknown>) =>
    apiRequest('/admin/updatePlan', { method: 'PUT', body: payload, asFormData: true }),
  
  notificationApi: (query?: IdQuery) =>
    apiRequest('/admin/notificationApi', { method: 'GET', query }),
  
  planList: (query?: PaginationQuery) =>
    apiRequest('/admin/planList', { method: 'GET', query }),
};

// SubAdmin Endpoints
export const subAdminApi = {
  subAdminSignup: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/signup', { method: 'POST', body: payload, asFormData: true }),
  
  subAdminLogin: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/login', { method: 'POST', body: payload, asFormData: true }),
  
  verifyOtp: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/verifyOtp', { method: 'PUT', body: payload, asFormData: true }),
  
  resendOtp: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/resendOtp', { method: 'PUT', body: payload, asFormData: true }),
  
  forgotPassword: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/forgotPassword', { method: 'PUT', body: payload, asFormData: true }),
  
  resetPassword: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/resetPassword', { method: 'PUT', body: payload, asFormData: true }),
  
  changePassword: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/changePassword', { method: 'PUT', body: payload, asFormData: true }),
  
  editProfile: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/editProfile', { method: 'PUT', body: payload, asFormData: true }),
  
  viewData: (query?: IdQuery) =>
    apiRequest('/subAdmin/viewData', { method: 'GET', query }),
  
  uploadImage: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/uploadImage', { method: 'PUT', body: payload, asFormData: true }),
  
  singleLogin: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/singleLogin', { method: 'POST', body: payload, asFormData: true }),
  
  uploadHeaderImage: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/uploadHeaderImage', { method: 'PUT', body: payload, asFormData: true }),
  
  addIp: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/addIp', { method: 'POST', body: payload, asFormData: true }),
  
  deleteIp: (query: IdQuery) =>
    apiRequest('/subAdmin/deleteIp', { method: 'DELETE', query }),
  
  ipList: (query?: IdQuery) =>
    apiRequest('/subAdmin/ipList', { method: 'GET', query }),
  
  trackingTesting: (query?: IdQuery) =>
    apiRequest('/subAdmin/trackingTesting', { method: 'GET', query }),
  
  viewuserData: (query?: IdQuery) =>
    apiRequest('/subAdmin/viewuserData', { method: 'GET', query }),
  
  conversionTestingTool: (query?: IdQuery) =>
    apiRequest('/subAdmin/conversionTestingTool', { method: 'GET', query }),
  
  linkTester: (query?: IdQuery) =>
    apiRequest('/subAdmin/linkTester', { method: 'GET', query }),
  
  forgotPasswordCommon: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/forgotPasswordCommon', { method: 'PUT', body: payload, asFormData: true }),
  
  resetPasswordCommon: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/resetpasswordCommon', { method: 'PUT', body: payload, asFormData: true }),
  
  loginPageImage: (payload: Record<string, unknown>) =>
    apiRequest('/subAdmin/LoginPageImage', { method: 'PUT', body: payload, asFormData: true }),
};

// Tracking Endpoints
export const trackingApi = {
  click: (query?: Record<string, string>) =>
    apiRequest('/tracking/click', { method: 'GET', query }),
  
  totalClick: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/tracking/totalClick', { method: 'GET', query }),
  
  trackingList: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/tracking/trackingList', { method: 'GET', query }),
  
  grossClick: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/tracking/GrossClick', { method: 'GET', query }),
  
  earningPerClick: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/tracking/EarningPerClick', { method: 'GET', query }),
  
  uniqueClick: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/tracking/uniqueClick', { method: 'GET', query }),
  
  deleteData: (query: IdQuery) =>
    apiRequest('/tracking/deletedata', { method: 'DELETE', query }),
  
  searchDataByOfferId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/tracking/serchDataByOfferId', { method: 'GET', query }),
  
  searchDataByPublisherId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/tracking/serchDataByPublisherId', { method: 'GET', query }),
  
  searchDataByAdvertiserId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/tracking/serchDataByAdvertiseId', { method: 'GET', query }),
  
  searchDataByManagerId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/tracking/serchDataByManagerId', { method: 'GET', query }),
};

// Sent Logs Endpoints
export const sentLogsApi = {
  sentLogList: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/sentLogs/sentLogList', { method: 'GET', query }),
  
  publisherPostbackApi: (query?: IdQuery) =>
    apiRequest('/sentLogs/publisherPostbackApi', { method: 'GET', query }),
  
  publisherSentLogList: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/sentLogs/PublisherSentLogList', { method: 'GET', query }),
  
  publisherManagerSentLogList: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/sentLogs/PublisherManagerSentLogList', { method: 'GET', query }),
  
  searchDataByOfferId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/sentLogs/serchDataByOfferId', { method: 'GET', query }),
  
  searchDataByPublisherId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/sentLogs/serchDataByPublisherId', { method: 'GET', query }),
  
  searchDataByAdvertiserId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/sentLogs/serchDataByAdvertiseId', { method: 'GET', query }),
  
  searchDataByManagerId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/sentLogs/serchDataByManagerId', { method: 'GET', query }),
  
  downloadSentLogDataInExcelSheetByPartnersId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/sentLogs/downloadSentLogDataInExcelSheetByPartners_Id', { method: 'GET', query }),
  
  downloadSentLogDataInExcelSheetByOfferId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/sentLogs/downloadSentLogDataInExcelSheetByOfferId', { method: 'GET', query }),
  
  downloadSentLogDataInExcelSheetByPublisherId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/sentLogs/downloadSentLogDataInExcelSheetByPublisherId', { method: 'GET', query }),
};

// Impression Endpoints
export const impressionApi = {
  impression: (query?: Record<string, string>) =>
    apiRequest('/impression/imp', { method: 'GET', query }),
  
  impressionList: (query?: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/impression/impressionList', { method: 'GET', query }),
  
  totalImpression: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/impression/totalImpression', { method: 'GET', query }),
  
  searchDataByOfferId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/impression/serchDataByOfferId', { method: 'GET', query }),
  
  searchDataByPublisherId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/impression/serchDataByPublisherId', { method: 'GET', query }),
  
  searchDataByAdvertiserId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/impression/serchDataByAdvertiseId', { method: 'GET', query }),
  
  searchDataByManagerId: (query: IdQuery & DateRangeQuery) =>
    apiRequest('/impression/serchDataByManagerId', { method: 'GET', query }),
};

// Event Report Endpoints
export const eventReportApi = {
  publisherEventValueReport: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/eventReport/publisherEventValueReport', { method: 'GET', query }),
  
  partnerEventValueReport: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/eventReport/partnerEventValueReport', { method: 'GET', query }),
  
  managerEventReport: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/eventReport/managerEventReport', { method: 'GET', query }),
  
  searchPartnerReport: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/eventReport/searchPartnerReport', { method: 'GET', query }),
  
  advertiserManagerEventReport: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/eventReport/advertiserManagerEventReport', { method: 'GET', query }),
  
  advertiserEventValueReport: (query: PaginationQuery & IdQuery & DateRangeQuery) =>
    apiRequest('/eventReport/advertiserEventValueReport', { method: 'GET', query }),
};

// Export Endpoints
export const exportApi = {
  startExport: (query?: Record<string, string>) =>
    apiRequest('/api/startExport', { method: 'GET', query }),
  
  exportByPublisherId: (query?: Record<string, string>) =>
    apiRequest('/api/ExportByPublisherId', { method: 'GET', query }),
  
  getExportStatus: (query?: IdQuery) =>
    apiRequest('/api/getExportStatus', { method: 'GET', query }),
  
  downloadFile: (query?: IdQuery) =>
    apiRequest('/api/downloadFile', { method: 'GET', query }),
  
  partnerExportList: (query?: PaginationQuery) =>
    apiRequest('/api/partnerExportList', { method: 'GET', query }),
  
  publisherExportList: (query?: PaginationQuery) =>
    apiRequest('/api/publisherExportList', { method: 'GET', query }),
  
  getExportPubStatus: (query?: IdQuery) =>
    apiRequest('/api/getExportPubStatus', { method: 'GET', query }),
  
  downloadFileByPub: (query?: IdQuery) =>
    apiRequest('/api/downloadFileByPub', { method: 'GET', query }),
  
  exportManagerReport: (query?: Record<string, string>) =>
    apiRequest('/api/exportManagerReport', { method: 'GET', query }),
  
  managerExportList: (query?: PaginationQuery) =>
    apiRequest('/api/managerExportList', { method: 'GET', query }),
  
  downloadFileByManager: (query?: IdQuery) =>
    apiRequest('/api/downloadFileByManager', { method: 'GET', query }),
  
  exportPixelLogs: (query?: Record<string, string>) =>
    apiRequest('/api/exportPixelLogs', { method: 'GET', query }),
  
  exportSentLogs: (query?: Record<string, string>) =>
    apiRequest('/api/exportsentLogs', { method: 'GET', query }),
};

// Top Data Endpoints
export const topApi = {
  topOffer: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/top/topOffer', { method: 'GET', query }),
  
  topPublisher: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/top/topPublisher', { method: 'GET', query }),
  
  topAdvertiser: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/top/topAdvertiser', { method: 'GET', query }),
  
  topManager: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/top/topManager', { method: 'GET', query }),
};

// User Endpoints
export const userApi = {
  countryList: (query?: Record<string, string>) =>
    apiRequest('/user/countrylist', { method: 'GET', query }),
  
  addCustomPayout: (payload: Record<string, unknown>) =>
    apiRequest('/user/addCustomPayout', { method: 'POST', body: payload, asFormData: true }),
  
  getCustomPayout: (query?: IdQuery) =>
    apiRequest('/user/getCustomPayout', { method: 'GET', query }),
  
  deleteCustomPayout: (query: IdQuery) =>
    apiRequest('/user/deleteCustomPayout', { method: 'DELETE', query }),
};

// Publisher Approved Endpoints
export const publisherApprovedApi = {
  blockPublisher: (payload: Record<string, unknown>) =>
    apiRequest('/publisherApproved/blockPublisher', { method: 'POST', body: payload, asFormData: true }),
  
  unblockPublisher: (query: IdQuery) =>
    apiRequest('/publisherApproved/unblockedPublisher', { method: 'PUT', query }),
  
  blockPublisherList: (query?: PaginationQuery & DateRangeQuery) =>
    apiRequest('/publisherApproved/blockPublisherList', { method: 'GET', query }),
};

// Contact Endpoints
export const contactApi = {
  contact: (payload: Record<string, unknown>) =>
    apiRequest('/contactUs/contact', { method: 'POST', body: payload, asFormData: true }),
  
  messageList: (query: IdQuery) =>
    apiRequest('/contactUs/messageList', { method: 'GET', query }),
  
  viewMessage: (query: { adminId: string; Id: string }) =>
    apiRequest('/contactUs/viewMessage', { method: 'GET', query }),
};

// Category Endpoints
export const categoryApi = {
  addCategory: (payload: Record<string, unknown>) =>
    apiRequest('/category/addCategory', { method: 'POST', body: payload, asFormData: true }),
  
  categoryList: (query?: PaginationQuery) =>
    apiRequest('/category/categoryList', { method: 'GET', query }),
  
  addVertical: (payload: Record<string, unknown>) =>
    apiRequest('/category/addVertical', { method: 'POST', body: payload, asFormData: true }),
  
  verticalList: (query?: PaginationQuery) =>
    apiRequest('/category/verticalList', { method: 'GET', query }),
  
  addTraffic: (payload: Record<string, unknown>) =>
    apiRequest('/category/addTraffic', { method: 'POST', body: payload, asFormData: true }),
  
  trafficList: (query?: PaginationQuery) =>
    apiRequest('/category/trafficList', { method: 'GET', query }),
};

// Partner Endpoints
export const partnerApi = {
  setClickLimit: (payload: Record<string, unknown>) =>
    apiRequest('/partner/setClickLimit', { method: 'POST', body: payload, asFormData: true }),
  
  updateClickLimit: (payload: Record<string, unknown>) =>
    apiRequest('/partner/updateClickLimit', { method: 'PUT', body: payload, asFormData: true }),
  
  deleteClickLimit: (query: IdQuery) =>
    apiRequest('/partner/deleteClickLimit', { method: 'DELETE', query }),
  
  capLimitList: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/partner/capLimitList', { method: 'GET', query }),
  
  capLimitView: (query: IdQuery) =>
    apiRequest('/partner/capLimitView', { method: 'GET', query }),
  
  offerwall: (payload: Record<string, unknown>) =>
    apiRequest('/partner/offerwall', { method: 'POST', body: payload, asFormData: true }),
  
  offerwallView: (query?: IdQuery) =>
    apiRequest('/partner/offerwallView', { method: 'GET', query }),
  
  offerwallList: (query?: PaginationQuery) =>
    apiRequest('/partner/offerwalList', { method: 'GET', query }),
  
  createValidation: (payload: Record<string, unknown>) =>
    apiRequest('/partner/createvalidation', { method: 'POST', body: payload, asFormData: true }),
  
  updateValidationReport: (payload: Record<string, unknown>) =>
    apiRequest('/partner/updateValidationReport', { method: 'PUT', body: payload, asFormData: true }),
  
  getValidationReports: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/partner/getValidationReports', { method: 'GET', query }),
  
  getValidationDetails: (query: IdQuery) =>
    apiRequest('/partner/getValidationDetails', { method: 'GET', query }),
};

// Publisher Request Offer Endpoints
export const publisherRequestApi = {
  requestOffer: (payload: Record<string, unknown>) =>
    apiRequest('/publisher/requestOffer', { method: 'POST', body: payload, asFormData: true }),
  
  requestOfferList: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/publisher/requestofferList', { method: 'GET', query }),
  
  approveOffer: (query: IdQuery) =>
    apiRequest('/publisher/approoveOffer', { method: 'PUT', query }),
  
  approveOfferPublishers: (query: IdQuery) =>
    apiRequest('/publisher/approoveOfferPublishers', { method: 'PUT', query }),
};

// Smart Offer Endpoints
export const smartOfferApi = {
  addOffer: (payload: Record<string, unknown>) =>
    apiRequest('/smartOffer/offerAdd', { method: 'POST', body: payload, asFormData: true }),
  
  updateOffer: (payload: Record<string, unknown>) =>
    apiRequest('/smartOffer/offer', { method: 'PUT', body: payload, asFormData: true }),
  
  updatePublisher: (payload: Record<string, unknown>) =>
    apiRequest('/smartOffer/publisher', { method: 'PUT', body: payload, asFormData: true }),
};

// Smart Tracking Link Endpoints
export const smartTrackingApi = {
  clicks: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/smart_link/clicks', { method: 'GET', query }),
};

// Pub App Endpoints
export const pubApi = {
  createPubApp: (payload: Record<string, unknown>) =>
    apiRequest('/pub/createPubApp', { method: 'POST', body: payload, asFormData: true }),
  
  appList: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/pub/appList', { method: 'GET', query }),
};

// Invoice Endpoints
export const invoiceApi = {
  selectData: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/invoice/selectData', { method: 'GET', query }),
  
  createInvoice: (query?: IdQuery & DateRangeQuery) =>
    apiRequest('/invoice/createInvoice', { method: 'GET', query }),
  
  partnerBilling: (payload: Record<string, unknown>) =>
    apiRequest('/invoice/partnerBilling', { method: 'GET', query: payload as Record<string, string> }),
  
  partnerBillingList: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/invoice/partnerBillinList', { method: 'GET', query }),
  
  partnerBillingDetails: (query: IdQuery) =>
    apiRequest('/invoice/partnerBillinDetails', { method: 'GET', query }),
  
  partnerBillingUpdate: (payload: Record<string, unknown>) =>
    apiRequest('/invoice/partnerBillingUpdate', { method: 'PUT', body: payload, asFormData: true }),
};

// Publisher Management Endpoints
export const publisherManagementApi = {
  postbackManagement: (payload: Record<string, unknown>) =>
    apiRequest('/publisherManagement/postbackMangement', { method: 'POST', body: payload, asFormData: true }),
  
  updatePostback: (payload: Record<string, unknown>) =>
    apiRequest('/publisherManagement/updatePostback', { method: 'PUT', body: payload, asFormData: true }),
  
  viewPostback: (query: IdQuery) =>
    apiRequest('/publisherManagement/viewPostabck', { method: 'GET', query }),
  
  deletePostback: (query: IdQuery) =>
    apiRequest('/publisherManagement/deletePostback', { method: 'DELETE', query }),
  
  postbackList: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/publisherManagement/postbackList', { method: 'GET', query }),
  
  publisherPostbackList: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/publisherManagement/publisherPostbackList', { method: 'GET', query }),
  
  managerPostback: (payload: Record<string, unknown>) =>
    apiRequest('/publisherManagement/managerpostback', { method: 'POST', body: payload, asFormData: true }),
  
  managerPostbackList: (query?: PaginationQuery & IdQuery) =>
    apiRequest('/publisherManagement/managerPostbackList', { method: 'GET', query }),
  
  deletePublisherPostback: (query: IdQuery) =>
    apiRequest('/publisherManagement/deletePublisherPostback', { method: 'DELETE', query }),
  
  managerUpdatePostback: (payload: Record<string, unknown>) =>
    apiRequest('/publisherManagement/managerUpdatePostback', { method: 'PUT', body: payload, asFormData: true }),
  
  managerDeletePostback: (query: IdQuery) =>
    apiRequest('/publisherManagement/ManagerdeletePostback', { method: 'DELETE', query }),
  
  managerPostbackView: (query: IdQuery) =>
    apiRequest('/publisherManagement/managerPostbackView', { method: 'GET', query }),
};

// Export all APIs as a single object for easy import
export const offersMetaApi = {
  publisher: publisherApi,
  advertiser: advertiserApi,
  conversion: conversionApi,
  offer: offerApi,
  report: reportApi,
  manager: managerApi,
  admin: adminApi,
  subAdmin: subAdminApi,
  tracking: trackingApi,
  sentLogs: sentLogsApi,
  impression: impressionApi,
  eventReport: eventReportApi,
  export: exportApi,
  top: topApi,
  user: userApi,
  publisherApproved: publisherApprovedApi,
  contact: contactApi,
  category: categoryApi,
  partner: partnerApi,
  publisherRequest: publisherRequestApi,
  smartOffer: smartOfferApi,
  smartTracking: smartTrackingApi,
  pub: pubApi,
  invoice: invoiceApi,
  publisherManagement: publisherManagementApi,
};