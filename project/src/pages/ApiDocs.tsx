import { useEffect, useMemo, useState } from 'react';
import { BookOpenText, Search, ShieldCheck, Code2, ExternalLink, FileText, PlayCircle, ServerCog, Layers3 } from 'lucide-react';

const API_DOCS_URL = 'https://cl.repowire.com/api-docs/';

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '');

type Endpoint = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: string;
  description: string;
  auth: boolean;
  category: string;
  params: string[];
  sample: string;
};

// Comprehensive endpoint list derived from live Swagger spec at https://cl.repowire.com/swagger.json
const endpoints: Endpoint[] = [
  // Auth endpoints
  { method: 'POST', path: '/admin/login', title: 'Admin Login', description: 'Authenticate admin with email and password.', auth: false, category: 'Auth', params: ['email', 'password'], sample: `curl -X POST https://cl.repowire.com/admin/login -F "email=admin@company.com" -F "password=secret"` },
  { method: 'PUT', path: '/admin/forgotPassword', title: 'Forgot Password', description: 'Send password recovery OTP to email.', auth: false, category: 'Auth', params: ['email'], sample: `curl -X PUT https://cl.repowire.com/admin/forgotPassword -F "email=admin@company.com"` },
  { method: 'PUT', path: '/admin/resendOtp', title: 'Resend OTP', description: 'Resend OTP for password recovery.', auth: false, category: 'Auth', params: ['email'], sample: `curl -X PUT https://cl.repowire.com/admin/resendOtp -F "email=admin@company.com"` },
  { method: 'PUT', path: '/admin/resetPassword', title: 'Reset Password', description: 'Reset password using OTP.', auth: false, category: 'Auth', params: ['email', 'otp', 'newPassword', 'confirm_password'], sample: `curl -X PUT https://cl.repowire.com/admin/resetPassword -F "email=admin@company.com" -F "otp=123456" -F "newPassword=newsecret"` },
  { method: 'PUT', path: '/admin/changePassword', title: 'Change Password', description: 'Change password for authenticated users.', auth: true, category: 'Auth', params: ['token', 'password', 'newPassword', 'confirm_password'], sample: `curl -X PUT https://cl.repowire.com/admin/changePassword -H "Authorization: Bearer <token>" -F "password=old" -F "newPassword=new"` },
  { method: 'PUT', path: '/admin/editProfile', title: 'Edit Profile', description: 'Update admin profile information.', auth: true, category: 'Auth', params: ['token', 'email', 'firstname', 'lastname', 'address', 'dob', 'number'], sample: `curl -X PUT https://cl.repowire.com/admin/editProfile -H "Authorization: Bearer <token>" -F "email=admin@company.com" -F "firstname=Admin"` },

  // Publisher endpoints
  { method: 'GET', path: '/publicher/publisherList', title: 'Publisher List', description: 'Retrieve all publisher accounts.', auth: true, category: 'Publishers', params: [], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/publisherList"` },
  { method: 'POST', path: '/publicher/addPublicher', title: 'Add Publisher', description: 'Create a new publisher account.', auth: true, category: 'Publishers', params: ['partners_Id', 'managerId', 'companyName', 'email', 'firstName', 'lastName', 'mobileNumber', 'country', 'address', 'password', 'confirm_password'], sample: `curl -X POST https://cl.repowire.com/publicher/addPublicher -H "Authorization: Bearer <token>" -F "companyName=Acme Media" -F "email=pub@acme.com"` },
  { method: 'PUT', path: '/publicher/updatePublisher', title: 'Update Publisher', description: 'Update publisher information.', auth: true, category: 'Publishers', params: ['publisherId', 'companyName', 'email', 'firstName', 'lastName', 'mobileNumber', 'country', 'address'], sample: `curl -X PUT https://cl.repowire.com/publicher/updatePublisher?publisherId=123 -H "Authorization: Bearer <token>" -F "companyName=Updated"` },
  { method: 'POST', path: '/publicher/publisherLoginById', title: 'Publisher Login By ID', description: 'Login as a publisher by ID.', auth: true, category: 'Publishers', params: ['publisherId'], sample: `curl -X POST https://cl.repowire.com/publicher/publisherLoginById?publisherId=123 -H "Authorization: Bearer <token>"` },
  { method: 'GET', path: '/publicher/totalPublisherClick', title: 'Total Publisher Clicks', description: 'Get total clicks for a publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/totalPublisherClick?partners_Id=1&startDate=2026-04-01"` },
  { method: 'GET', path: '/publicher/totalPublisherConverion', title: 'Total Publisher Conversions', description: 'Get total conversions for a publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/totalPublisherConverion?partners_Id=1"` },
  { method: 'GET', path: '/publicher/totalPublisherPayout', title: 'Total Publisher Payout', description: 'Get total payout for a publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/totalPublisherPayout?partners_Id=1"` },
  { method: 'GET', path: '/publicher/publisherConversionList', title: 'Publisher Conversion List', description: 'List conversions for a publisher with date range.', auth: true, category: 'Publishers', params: ['partners_Id', 'page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/publisherConversionList?partners_Id=1&page=1"` },
  { method: 'GET', path: '/publicher/publisherClickList', title: 'Publisher Click List', description: 'List all clicks for a publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/publisherClickList?partners_Id=1&page=1"` },
  { method: 'GET', path: '/publicher/publisherImpressionList', title: 'Publisher Impression List', description: 'List impressions for a publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'page'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/publisherImpressionList?partners_Id=1&page=1"` },
  { method: 'GET', path: '/publicher/PublisherConversionRate', title: 'Publisher Conversion Rate', description: 'Calculate conversion rate for a publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/PublisherConversionRate?partners_Id=1"` },
  { method: 'GET', path: '/publicher/PublisherTotalImpression', title: 'Publisher Total Impression', description: 'Get total impressions for a publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/PublisherTotalImpression?partners_Id=1"` },
  { method: 'GET', path: '/publicher/PublisherTotalEvent', title: 'Publisher Total Event', description: 'Get total events tracked for a publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/PublisherTotalEvent?partners_Id=1"` },
  { method: 'PUT', path: '/publicher/approveOfferForPublisher', title: 'Approve Offer for Publisher', description: 'Approve an offer for a specific publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'offerId', 'publisherId'], sample: `curl -X PUT https://cl.repowire.com/publicher/approveOfferForPublisher?partners_Id=1&offerId=10&publisherId=5 -H "Authorization: Bearer <token>"` },
  { method: 'GET', path: '/publicher/publisherEventValueReport', title: 'Publisher Event Value Report', description: 'Get event value breakdown for publisher.', auth: true, category: 'Publishers', params: ['partners_Id'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/publisherEventValueReport?partners_Id=1"` },
  { method: 'POST', path: '/publicher/sendOfferToPublisher', title: 'Send Offer to Publisher', description: 'Send an offer to a publisher with optional note.', auth: true, category: 'Publishers', params: ['partners_Id', 'publisherId', 'offerId', 'note'], sample: `curl -X POST https://cl.repowire.com/publicher/sendOfferToPublisher?partners_Id=1&publisherId=5&offerId=10 -H "Authorization: Bearer <token>" -F "note=Great offer"` },
  { method: 'PUT', path: '/publicher/genreatePublisherKey', title: 'Generate Publisher Key', description: 'Generate API key for a publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'publisherId'], sample: `curl -X PUT https://cl.repowire.com/publicher/genreatePublisherKey?partners_Id=1&publisherId=5 -H "Authorization: Bearer <token>"` },
  { method: 'POST', path: '/publicher/senndLoginDetails', title: 'Send Login Details', description: 'Send login credentials to a publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'publisherId', 'password'], sample: `curl -X POST https://cl.repowire.com/publicher/senndLoginDetails -H "Authorization: Bearer <token>" -F "partners_Id=1" -F "publisherId=5" -F "password=temp123"` },
  { method: 'GET', path: '/publicher/publisherSerchDataByOfferId', title: 'Publisher Search by Offer', description: 'Search publisher data filtered by offer ID.', auth: true, category: 'Publishers', params: ['partners_Id', 'offerId', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/publisherSerchDataByOfferId?partners_Id=1&offerId=10"` },
  { method: 'GET', path: '/publicher/publisherSearchAllConversionData', title: 'Publisher Search Conversions', description: 'Search all conversion data for a publisher.', auth: true, category: 'Publishers', params: ['partners_Id', 'searchParam', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/publisherSearchAllConversionData?partners_Id=1&searchParam=test"` },
  { method: 'GET', path: '/publicher/downloadDataInExcelSheetByPublisher', title: 'Download Publisher Excel', description: 'Export publisher data to Excel.', auth: true, category: 'Publishers', params: ['partners_Id', 'selectedParams', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/downloadDataInExcelSheetByPublisher?partners_Id=1"` },
  { method: 'GET', path: '/publicher/downloadDataInExcelSheetByPublisherId', title: 'Download by Publisher ID', description: 'Export specific publisher data to Excel.', auth: true, category: 'Publishers', params: ['partners_Id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/downloadDataInExcelSheetByPublisherId?partners_Id=1"` },
  { method: 'GET', path: '/publicher/downloadDataInExcelSheetByOfferId', title: 'Download by Offer ID', description: 'Export offer data to Excel.', auth: true, category: 'Publishers', params: ['partners_Id', 'offerId', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/publicher/downloadDataInExcelSheetByOfferId?partners_Id=1&offerId=10"` },
  { method: 'PUT', path: '/publicher/pubInactive', title: 'Deactivate Publisher', description: 'Deactivate a publisher account.', auth: true, category: 'Publishers', params: ['partners_Id', 'publisherId'], sample: `curl -X PUT https://cl.repowire.com/publicher/pubInactive?partners_Id=1&publisherId=5 -H "Authorization: Bearer <token>"` },
  { method: 'PUT', path: '/publicher/pubActive', title: 'Activate Publisher', description: 'Activate a publisher account.', auth: true, category: 'Publishers', params: ['partners_Id', 'publisherId'], sample: `curl -X PUT https://cl.repowire.com/publicher/pubActive?partners_Id=1&publisherId=5 -H "Authorization: Bearer <token>"` },
  { method: 'POST', path: '/publicher/signup', title: 'Publisher Signup', description: 'Public publisher registration endpoint.', auth: false, category: 'Publishers', params: ['partners_Id', 'email', 'firstName', 'lastName', 'companyName', 'address', 'mobileNumber', 'password', 'confirm_password'], sample: `curl -X POST https://cl.repowire.com/publicher/signup -F "email=pub@acme.com" -F "firstName=John"` },
  { method: 'POST', path: '/publicher/login', title: 'Publisher Login', description: 'Publisher login endpoint.', auth: false, category: 'Publishers', params: ['email', 'password'], sample: `curl -X POST https://cl.repowire.com/publicher/login -F "email=pub@acme.com" -F "password=secret"` },
  { method: 'PUT', path: '/publicher/verifyOtp', title: 'Verify OTP', description: 'Verify OTP for publisher verification.', auth: false, category: 'Publishers', params: ['email', 'otp'], sample: `curl -X PUT https://cl.repowire.com/publicher/verifyOtp -F "email=pub@acme.com" -F "otp=123456"` },
  { method: 'PUT', path: '/publicher/resendOtp', title: 'Resend OTP Publisher', description: 'Resend OTP to publisher email.', auth: false, category: 'Publishers', params: ['email'], sample: `curl -X PUT https://cl.repowire.com/publicher/resendOtp -F "email=pub@acme.com"` },
  { method: 'PUT', path: '/publicher/forgotPassword', title: 'Publisher Forgot Password', description: 'Initiate password recovery for publisher.', auth: false, category: 'Publishers', params: ['email'], sample: `curl -X PUT https://cl.repowire.com/publicher/forgotPassword -F "email=pub@acme.com"` },
  { method: 'PUT', path: '/publicher/resetPassword', title: 'Publisher Reset Password', description: 'Reset publisher password with OTP.', auth: false, category: 'Publishers', params: ['otp', 'newPassword'], sample: `curl -X PUT https://cl.repowire.com/publicher/resetPassword -F "otp=123456" -F "newPassword=newsecret"` },
  { method: 'PUT', path: '/publicher/changePassword', title: 'Publisher Change Password', description: 'Change password for authenticated publisher.', auth: true, category: 'Publishers', params: ['token', 'password', 'newPassword', 'confirm_password'], sample: `curl -X PUT https://cl.repowire.com/publicher/changePassword -H "Authorization: Bearer <token>" -F "password=old" -F "newPassword=new"` },
  { method: 'PUT', path: '/publicher/editProfile', title: 'Publisher Edit Profile', description: 'Update publisher profile details.', auth: true, category: 'Publishers', params: ['token', 'email', 'name', 'address', 'mobileNumber'], sample: `curl -X PUT https://cl.repowire.com/publicher/editProfile -H "Authorization: Bearer <token>" -F "email=pub@acme.com" -F "name=John"` },
  { method: 'GET', path: '/publicher/viewData', title: 'View Publisher Data', description: 'Get publisher profile information.', auth: false, category: 'Publishers', params: ['publicherId'], sample: `curl "https://cl.repowire.com/publicher/viewData?publicherId=5"` },
  { method: 'GET', path: '/publicher/publicherList', title: 'Public Publisher List', description: 'Get list of all publishers (public).', auth: false, category: 'Publishers', params: [], sample: `curl "https://cl.repowire.com/publicher/publicherList"` },

  // Advertiser endpoints
  { method: 'GET', path: '/advertiser/advertiserList', title: 'Advertiser List', description: 'Get all advertiser accounts.', auth: true, category: 'Advertisers', params: ['partners_Id'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/advertiserList?partners_Id=1"` },
  { method: 'POST', path: '/advertiser/addAdvertiser', title: 'Add Advertiser', description: 'Create a new advertiser account.', auth: true, category: 'Advertisers', params: ['partners_Id', 'managerId', 'companyName', 'email', 'firstName', 'lastName', 'mobileNumber', 'country', 'region', 'street', 'city', 'pinCode', 'password', 'confirm_password'], sample: `curl -X POST https://cl.repowire.com/advertiser/addAdvertiser -H "Authorization: Bearer <token>" -F "companyName=Acme Ads" -F "email=adv@acme.com"` },
  { method: 'POST', path: '/advertiser/login', title: 'Advertiser Login', description: 'Advertiser authentication endpoint.', auth: false, category: 'Advertisers', params: ['email', 'password'], sample: `curl -X POST https://cl.repowire.com/advertiser/login -F "email=adv@acme.com" -F "password=secret"` },
  { method: 'PUT', path: '/advertiser/updateAdvertiser', title: 'Update Advertiser', description: 'Update advertiser profile information.', auth: true, category: 'Advertisers', params: ['partners_Id', 'managerId', 'advertiserId', 'companyName', 'email', 'firstName', 'lastName', 'mobileNumber', 'country', 'region', 'street', 'city', 'pinCode'], sample: `curl -X PUT https://cl.repowire.com/advertiser/updateAdvertiser?partners_Id=1 -H "Authorization: Bearer <token>" -F "companyName=Updated"` },
  { method: 'GET', path: '/advertiser/advertiserView', title: 'View Advertiser', description: 'Get specific advertiser details.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiserId'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/advertiserView?partners_Id=1&advertiserId=5"` },
  { method: 'PUT', path: '/advertiser/genreateToken', title: 'Generate Advertiser Token', description: 'Generate API token for advertiser.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiserId'], sample: `curl -X PUT https://cl.repowire.com/advertiser/genreateToken?partners_Id=1&advertiserId=5 -H "Authorization: Bearer <token>"` },
  { method: 'POST', path: '/advertiser/advertiserSignup', title: 'Advertiser Signup', description: 'Public advertiser registration.', auth: false, category: 'Advertisers', params: ['partners_Id', 'email', 'firstName', 'lastName', 'companyName', 'address', 'mobileNumber', 'password', 'confirm_password'], sample: `curl -X POST https://cl.repowire.com/advertiser/advertiserSignup -F "email=adv@acme.com" -F "firstName=John"` },
  { method: 'PUT', path: '/advertiser/advertiserUpdatePassword', title: 'Advertiser Update Password', description: 'Change advertiser password.', auth: false, category: 'Advertisers', params: ['partners_Id', 'advertiserId', 'oldPassword', 'newPassword', 'confirm_password'], sample: `curl -X PUT https://cl.repowire.com/advertiser/advertiserUpdatePassword -F "partners_Id=1" -F "advertiserId=5" -F "oldPassword=old" -F "newPassword=new"` },
  { method: 'GET', path: '/advertiser/totalAdvertiserClick', title: 'Total Advertiser Clicks', description: 'Get total clicks for an advertiser.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiser_id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/totalAdvertiserClick?partners_Id=1&advertiser_id=5"` },
  { method: 'GET', path: '/advertiser/totalAdvertiserConverion', title: 'Total Advertiser Conversions', description: 'Get total conversions for an advertiser.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiserId', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/totalAdvertiserConverion?partners_Id=1&advertiserId=5"` },
  { method: 'GET', path: '/advertiser/totalAdvertiserPayout', title: 'Total Advertiser Payout', description: 'Get advertiser payout totals.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiserId', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/totalAdvertiserPayout?partners_Id=1&advertiserId=5"` },
  { method: 'GET', path: '/advertiser/totalAdvertiserRevenue', title: 'Total Advertiser Revenue', description: 'Get advertiser revenue totals.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiserId', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/totalAdvertiserRevenue?partners_Id=1&advertiserId=5"` },
  { method: 'GET', path: '/advertiser/advertiserConversionList', title: 'Advertiser Conversion List', description: 'List conversions for specific advertiser.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiserId', 'page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/advertiserConversionList?partners_Id=1&advertiserId=5&page=1"` },
  { method: 'GET', path: '/advertiser/advertiserClickList', title: 'Advertiser Click List', description: 'List clicks recorded for advertiser.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiser_id', 'page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/advertiserClickList?partners_Id=1&advertiser_id=5&page=1"` },
  { method: 'GET', path: '/advertiser/advertiserImpressionList', title: 'Advertiser Impression List', description: 'List impressions for advertiser.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiser_id', 'page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/advertiserImpressionList?partners_Id=1&advertiser_id=5&page=1"` },
  { method: 'GET', path: '/advertiser/advertiserConversionRate', title: 'Advertiser Conversion Rate', description: 'Calculate advertiser conversion rate.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiserId', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/advertiserConversionRate?partners_Id=1&advertiserId=5"` },
  { method: 'GET', path: '/advertiser/advertiserTotalImpression', title: 'Advertiser Total Impression', description: 'Get total impressions for advertiser.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiser_id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/advertiserTotalImpression?partners_Id=1&advertiser_id=5"` },
  { method: 'GET', path: '/advertiser/advertiserTotalEvent', title: 'Advertiser Total Event', description: 'Get total events for advertiser.', auth: true, category: 'Advertisers', params: ['partners_Id', 'advertiserId', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/advertiser/advertiserTotalEvent?partners_Id=1&advertiserId=5"` },

  // Conversion endpoints  
  { method: 'GET', path: '/conversion/ConversionList', title: 'Conversion List', description: 'List all conversions with pagination and filtering.', auth: true, category: 'Conversions', params: ['page', 'startDate', 'endDate', 'searchBy', 'search'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/conversion/ConversionList?page=1&startDate=2026-04-01&endDate=2026-04-09"` },
  { method: 'GET', path: '/conversion/searchAllConversionData', title: 'Search Conversion Data', description: 'Search conversions across all entity types.', auth: true, category: 'Conversions', params: ['page', 'searchParam', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/conversion/searchAllConversionData?page=1&searchParam=test"` },
  { method: 'GET', path: '/conversion/getConversionAccordingToDate', title: 'Conversions by Date', description: 'Get conversion data aggregated by date.', auth: true, category: 'Conversions', params: ['startDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/conversion/getConversionAccordingToDate?startDate=2026-04-01"` },
  { method: 'GET', path: '/conversion/totalConversion', title: 'Total Conversion', description: 'Get total conversion count.', auth: true, category: 'KPIs', params: ['startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/conversion/totalConversion"` },
  { method: 'GET', path: '/conversion/totalRevenue', title: 'Total Revenue', description: 'Get total revenue metric.', auth: true, category: 'KPIs', params: ['startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/conversion/totalRevenue"` },
  { method: 'GET', path: '/conversion/totalPayout', title: 'Total Payout', description: 'Get total payout amount.', auth: true, category: 'KPIs', params: ['startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/conversion/totalPayout"` },
  { method: 'GET', path: '/conversion/totalProfit', title: 'Total Profit', description: 'Calculate and return total profit.', auth: true, category: 'KPIs', params: ['startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/conversion/totalProfit"` },
  { method: 'GET', path: '/conversion/conversionRate', title: 'Conversion Rate', description: 'Calculate overall conversion rate.', auth: true, category: 'KPIs', params: ['startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/conversion/conversionRate"` },
  { method: 'GET', path: '/conversion/totalEvent', title: 'Total Event', description: 'Get count of all tracking events.', auth: true, category: 'KPIs', params: ['startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/conversion/totalEvent"` },
  { method: 'GET', path: '/conversion/postbackLogs', title: 'Postback Logs', description: 'View backend postback delivery logs.', auth: true, category: 'Logs', params: ['page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/conversion/postbackLogs?page=1"` },
  { method: 'GET', path: '/conversion/invalidClick', title: 'Invalid Clicks', description: 'Get list of invalid clicks.', auth: true, category: 'Conversions', params: ['page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/conversion/invalidClick?page=1"` },
  { method: 'PUT', path: '/conversion/pendingConversion', title: 'Mark Conversion Pending', description: 'Update conversion status to pending.', auth: true, category: 'Conversions', params: ['conversionId'], sample: `curl -X PUT https://cl.repowire.com/conversion/pendingConversion?conversionId=123 -H "Authorization: Bearer <token>"` },
  { method: 'PUT', path: '/conversion/approvedConversion', title: 'Approve Conversion', description: 'Mark conversion as approved.', auth: true, category: 'Conversions', params: ['conversionId'], sample: `curl -X PUT https://cl.repowire.com/conversion/approvedConversion?conversionId=123 -H "Authorization: Bearer <token>"` },
  { method: 'PUT', path: '/conversion/DeclinedConversion', title: 'Decline Conversion', description: 'Reject a pending conversion.', auth: true, category: 'Conversions', params: ['conversionId'], sample: `curl -X PUT https://cl.repowire.com/conversion/DeclinedConversion?conversionId=123 -H "Authorization: Bearer <token>"` },
  { method: 'PUT', path: '/conversion/cancelConversion', title: 'Cancel Conversion', description: 'Cancel a specific conversion.', auth: true, category: 'Conversions', params: ['conversionId'], sample: `curl -X PUT https://cl.repowire.com/conversion/cancelConversion?conversionId=123 -H "Authorization: Bearer <token>"` },

  // Manager endpoints
  { method: 'GET', path: '/manager/advertiserAsignList', title: 'Manager Advertiser List', description: 'List advertisers assigned to manager.', auth: true, category: 'Management', params: ['partners_Id', 'managerId'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/manager/advertiserAsignList?partners_Id=1&managerId=4"` },
  { method: 'GET', path: '/manager/viewAdvertiserData', title: 'View Advertiser Data', description: 'View specific advertiser data for manager.', auth: true, category: 'Management', params: ['partners_Id', 'managerId', 'advertiserId'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/manager/viewAdvertiserData?partners_Id=1&managerId=4&advertiserId=5"` },
  { method: 'GET', path: '/manager/AssignPublisherList', title: 'Manager Publisher List', description: 'List publishers assigned to manager.', auth: true, category: 'Management', params: ['partners_Id', 'managerId'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/manager/AssignPublisherList?partners_Id=1&managerId=4"` },
  { method: 'GET', path: '/manager/viewPublisherData', title: 'View Publisher Data Manager', description: 'View specific publisher data for manager.', auth: true, category: 'Management', params: ['partners_Id', 'managerId', 'publisherId'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/manager/viewPublisherData?partners_Id=1&managerId=4&publisherId=5"` },
  { method: 'POST', path: '/manager/addManager', title: 'Add Manager', description: 'Create a new manager account.', auth: true, category: 'Management', params: ['partners_Id', 'name', 'email', 'skypeId', 'mobileNumber', 'address', 'managerRole', 'password'], sample: `curl -X POST https://cl.repowire.com/manager/addManager -H "Authorization: Bearer <token>" -F "name=John Manager" -F "email=manager@company.com"` },
  { method: 'POST', path: '/manager/login', title: 'Manager Login', description: 'Manager authentication endpoint.', auth: false, category: 'Management', params: ['email', 'password'], sample: `curl -X POST https://cl.repowire.com/manager/login -F "email=manager@company.com" -F "password=secret"` },
  { method: 'PUT', path: '/manager/updateMagager', title: 'Update Manager', description: 'Update manager profile information.', auth: true, category: 'Management', params: ['partners_Id', 'managerId', 'name', 'skypeId', 'email', 'mobileNumber', 'address', 'password'], sample: `curl -X PUT https://cl.repowire.com/manager/updateMagager?partners_Id=1&managerId=4 -H "Authorization: Bearer <token>" -F "name=Updated Manager"` },
  { method: 'DELETE', path: '/manager/deleteManager', title: 'Delete Manager', description: 'Remove a manager account.', auth: true, category: 'Management', params: ['partners_Id', 'managerId'], sample: `curl -X DELETE https://cl.repowire.com/manager/deleteManager?partners_Id=1&managerId=4 -H "Authorization: Bearer <token>"` },
  { method: 'GET', path: '/manager/managerList', title: 'Manager List', description: 'Get list of all managers for a partner.', auth: true, category: 'Management', params: ['partners_Id', 'managerType'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/manager/managerList?partners_Id=1"` },
  { method: 'GET', path: '/manager/managerCommonList', title: 'Manager Common List', description: 'Get managers available across partner.', auth: true, category: 'Management', params: ['partners_Id'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/manager/managerCommonList?partners_Id=1"` },
  { method: 'POST', path: '/manager/managerLoginById', title: 'Manager Login by ID', description: 'Login as a specific manager.', auth: true, category: 'Management', params: ['partners_Id', 'managerId'], sample: `curl -X POST https://cl.repowire.com/manager/managerLoginById?partners_Id=1&managerId=4 -H "Authorization: Bearer <token>"` },
  { method: 'PUT', path: '/manager/uploadImage', title: 'Upload Manager Image', description: 'Upload profile image for manager.', auth: true, category: 'Management', params: ['partners_Id', 'managerId', 'image'], sample: `curl -X PUT https://cl.repowire.com/manager/uploadImage -H "Authorization: Bearer <token>" -F "partners_Id=1" -F "managerId=4" -F "image=@profile.jpg"` },
  { method: 'GET', path: '/manager/managerViewData', title: 'Manager View Data', description: 'Get manager profile information.', auth: true, category: 'Management', params: ['partners_Id', 'managerId'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/manager/managerViewData?partners_Id=1&managerId=4"` },

  // Tracking & Logging endpoints
  { method: 'GET', path: '/tracking/click', title: 'Tracking Click', description: 'Record and track click event.', auth: false, category: 'Tracking', params: ['m', 'o', 'a', 'link_id', 'url'], sample: `curl "https://cl.repowire.com/tracking/click?m=1&o=10&a=5&url=https://example.com"` },
  { method: 'GET', path: '/tracking/trackingList', title: 'Tracking List', description: 'List all tracked clicks and events.', auth: true, category: 'Tracking', params: ['page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/tracking/trackingList?page=1"` },
  { method: 'GET', path: '/tracking/totalClick', title: 'Total Click Count', description: 'Get total click count.', auth: true, category: 'Tracking', params: ['startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/tracking/totalClick"` },
  { method: 'GET', path: '/tracking/GrossClick', title: 'Gross Clicks', description: 'Get gross click statistics.', auth: true, category: 'Tracking', params: ['startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/tracking/GrossClick"` },
  { method: 'GET', path: '/tracking/uniqueClick', title: 'Unique Clicks', description: 'Get unique click count.', auth: true, category: 'Tracking', params: ['startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/tracking/uniqueClick"` },
  { method: 'GET', path: '/impression/impressionList', title: 'Impression List', description: 'List tracked impressions.', auth: true, category: 'Tracking', params: ['page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/impression/impressionList?page=1"` },
  { method: 'GET', path: '/impression/totalImpression', title: 'Total Impression', description: 'Get total impression count.', auth: true, category: 'Tracking', params: ['partners_Id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/impression/totalImpression?partners_Id=1"` },

  // Contact & Support endpoints
  { method: 'POST', path: '/contactUs/contact', title: 'Contact Support', description: 'Submit a support query from public contact form.', auth: false, category: 'Support', params: ['name', 'email', 'mobileNumber', 'company', 'address', 'planId', 'skypeId', 'domain', 'password'], sample: `curl -X POST https://cl.repowire.com/contactUs/contact -F "name=Alex" -F "email=alex@company.com" -F "message=Help needed"` },
  { method: 'GET', path: '/contactUs/messageList', title: 'Message List', description: 'List support messages received.', auth: true, category: 'Support', params: ['adminId'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/contactUs/messageList?adminId=1"` },
  { method: 'GET', path: '/contactUs/viewMessage', title: 'View Message', description: 'Get specific support message details.', auth: true, category: 'Support', params: ['adminId', 'Id'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/contactUs/viewMessage?adminId=1&Id=123"` },

  // Invoice & Billing endpoints
  { method: 'GET', path: '/invoice/partnerBillinList', title: 'Partner Billing List', description: 'Get all partner invoices and billing records.', auth: true, category: 'Invoices', params: ['partners_Id'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/invoice/partnerBillinList?partners_Id=1"` },
  { method: 'GET', path: '/invoice/partnerBillinDetails', title: 'Billing Details', description: 'Get detailed invoice information.', auth: true, category: 'Invoices', params: ['partners_Id', 'invoiceId'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/invoice/partnerBillinDetails?partners_Id=1&invoiceId=INV123"` },
  { method: 'GET', path: '/invoice/selectData', title: 'Select Billing Data', description: 'Select billing data for a date range.', auth: true, category: 'Invoices', params: ['partners_Id', 'publisherId', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/invoice/selectData?partners_Id=1&publisherId=5&startDate=2026-04-01"` },
  { method: 'GET', path: '/invoice/createInvoice', title: 'Create Invoice', description: 'Generate invoice for billing period.', auth: true, category: 'Invoices', params: ['partners_Id', 'publisherId', 'invoiceId'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/invoice/createInvoice?partners_Id=1&publisherId=5&invoiceId=INV123"` },
  { method: 'GET', path: '/invoice/partnerBilling', title: 'Partner Billing', description: 'Get partner billing summary.', auth: true, category: 'Invoices', params: ['partners_Id', 'publisherId', 'offerIds', 'deduction', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/invoice/partnerBilling?partners_Id=1&publisherId=5"` },

  // Utilities
  { method: 'GET', path: '/user/countrylist', title: 'Country List', description: 'Get list of supported countries.', auth: false, category: 'Utilities', params: [], sample: `curl "https://cl.repowire.com/user/countrylist"` },
  { method: 'POST', path: '/user/addCustomPayout', title: 'Add Custom Payout', description: 'Set custom payout rate for offer/publisher/event.', auth: true, category: 'Utilities', params: ['publisherId', 'offerId', 'eventId', 'eventValue', 'customPayout'], sample: `curl -X POST https://cl.repowire.com/user/addCustomPayout -H "Authorization: Bearer <token>" -F "publisherId=5" -F "offerId=10" -F "customPayout=5.50"` },
  { method: 'GET', path: '/user/getCustomPayout', title: 'Get Custom Payout', description: 'Retrieve custom payout settings.', auth: true, category: 'Utilities', params: ['publisherId', 'offerId'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/user/getCustomPayout?publisherId=5&offerId=10"` },

  // Reports
  { method: 'GET', path: '/eventReport/managerEventReport', title: 'Manager Event Report', description: 'Get event report for manager dashboard.', auth: true, category: 'Reports', params: ['partners_Id', 'publisherManagerId', 'page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/eventReport/managerEventReport?partners_Id=1&publisherManagerId=4&page=1"` },
  { method: 'GET', path: '/eventReport/advertiserManagerEventReport', title: 'Advertiser Manager Report', description: 'Event report for advertiser manager.', auth: true, category: 'Reports', params: ['partners_Id', 'advertiserManagerId', 'page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/eventReport/advertiserManagerEventReport?partners_Id=1&advertiserManagerId=4&page=1"` },
  { method: 'GET', path: '/eventReport/publisherEventValueReport', title: 'Publisher Event Value Report', description: 'Event value breakdown for publishers.', auth: true, category: 'Reports', params: ['partners_Id', 'publisherId', 'page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/eventReport/publisherEventValueReport?partners_Id=1&publisherId=5&page=1"` },
  { method: 'GET', path: '/eventReport/advertiserEventValueReport', title: 'Advertiser Event Value Report', description: 'Event value breakdown for advertisers.', auth: true, category: 'Reports', params: ['partners_Id', 'advertiserId', 'page', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/eventReport/advertiserEventValueReport?partners_Id=1&advertiserId=5&page=1"` },
  { method: 'GET', path: '/api/exportManagerReport', title: 'Export Manager Report', description: 'Export manager report data.', auth: true, category: 'Reports', params: ['selectedParams', 'startDate', 'endDate', 'searchBy', 'search'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/api/exportManagerReport?startDate=2026-04-01"` },
  { method: 'GET', path: '/report/offerReport', title: 'Offer Report', description: 'Generate offer performance report.', auth: true, category: 'Reports', params: ['partners_Id', 'startDate', 'endDate', 'search'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/report/offerReport?partners_Id=1"` },
  { method: 'GET', path: '/report/publisherReport', title: 'Publisher Report', description: 'Generate publisher performance report.', auth: true, category: 'Reports', params: ['partners_Id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/report/publisherReport?partners_Id=1"` },
  { method: 'GET', path: '/report/advertiserReport', description: 'Generate advertiser performance report.', title: 'Advertiser Report', auth: true, category: 'Reports', params: ['partners_Id', 'startDate', 'endDate'], sample: `curl -H "Authorization: Bearer <token>" "https://cl.repowire.com/report/advertiserReport?partners_Id=1"` },
];

const methodStyle: Record<Endpoint['method'], string> = {
  GET: 'bg-blue-50 text-blue-700 border-blue-100',
  POST: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  PUT: 'bg-amber-50 text-amber-700 border-amber-100',
  DELETE: 'bg-rose-50 text-rose-700 border-rose-100',
};

export default function ApiDocs() {
  const [search, setSearch] = useState('');
  const categories = useMemo(() => ['All', ...new Set(endpoints.map((endpoint) => endpoint.category))], []);

  const getCategoryFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return 'All';
    const match = categories.find((category) => slugify(category) === slugify(hash));
    return match ?? 'All';
  };

  const [activeCategory, setActiveCategory] = useState<string>(() => getCategoryFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      setActiveCategory(getCategoryFromHash());
      window.requestAnimationFrame(() => {
        document.getElementById('api-docs-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [categories]);

  const filtered = endpoints.filter((endpoint) => {
    const matchesSearch = [endpoint.title, endpoint.path, endpoint.description, endpoint.category]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || endpoint.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const coverageByCategory = categories
    .filter((category) => category !== 'All')
    .map((category) => ({ label: category, value: endpoints.filter((endpoint) => endpoint.category === category).length }));

  return (
    <div className="space-y-5 animate-fade-in">
      <section className="rounded-2xl border border-sky-100 bg-gradient-to-r from-cyan-50 to-sky-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-cyan-700 shadow-sm">
              <BookOpenText size={14} />
              Repowire API Docs
            </div>
            <h1 className="mt-3 text-3xl font-display font-bold text-slate-900">In-app API documentation</h1>
            <p className="mt-2 text-sm text-slate-600">
              This page is a curated view of the real Swagger/OpenAPI endpoints behind the Repowire backend. Use it to understand request shapes, required auth, and the exact routes used by the dashboard.
            </p>
          </div>

          <a
            href={API_DOCS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 transition-colors"
          >
            Open live Swagger
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: <ShieldCheck size={15} />, title: 'Bearer auth', text: 'Most routes require a JWT token in Authorization header.' },
            { icon: <Code2 size={15} />, title: 'Real endpoints', text: 'Paths below are pulled from the Swagger spec and the app client.' },
            { icon: <ServerCog size={15} />, title: 'Backend ready', text: 'Use these routes with the live API workspace in Settings.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur">
              <div className="mb-2 inline-flex rounded-lg bg-cyan-50 p-2 text-cyan-700">{item.icon}</div>
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-xs text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Layers3 size={16} className="text-cyan-700" />
            <h2 className="text-sm font-semibold text-slate-900">How it works</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <p>1. Save your Bearer token in Settings.</p>
            <p>2. The app uses live endpoints through the backend API client.</p>
            <p>3. Dashboard KPIs, chart data, and backend workspaces can consume these routes.</p>
            <p>4. If no token is saved, the app falls back to safe mock data where needed.</p>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Auth header example</p>
            <code className="block whitespace-pre-wrap rounded-lg bg-slate-950 p-3 text-[11px] leading-relaxed text-cyan-100">
{`Authorization: Bearer &lt;your_token&gt;`}
            </code>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Search size={16} className="text-cyan-700" />
            <h2 className="text-sm font-semibold text-slate-900">Find endpoints</h2>
          </div>
          <div className="relative mb-4">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search routes, categories, or descriptions"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    const nextHash = category === 'All' ? '' : `#${slugify(category)}`;
                    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
                  }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === category ? 'bg-cyan-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="api-docs-results" className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {filtered.map((endpoint) => (
          <article key={endpoint.path} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-lg transition-all">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-lg border px-2 py-0.5 text-[11px] font-bold ${methodStyle[endpoint.method]}`}>{endpoint.method}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{endpoint.category}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{endpoint.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{endpoint.description}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Route</p>
              <p className="mt-1 font-mono text-sm text-slate-800">{endpoint.path}</p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Auth</p>
                <p className="mt-1 text-sm font-medium text-slate-800">{endpoint.auth ? 'Bearer token required' : 'Public endpoint'}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Parameters</p>
                <p className="mt-1 text-sm font-medium text-slate-800">{endpoint.params.length ? endpoint.params.join(', ') : 'None listed in spec'}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-950 p-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Sample request</p>
                <PlayCircle size={14} className="text-cyan-300" />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap text-[11px] leading-relaxed text-cyan-100">{endpoint.sample}</pre>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={16} className="text-cyan-700" />
          <h2 className="text-sm font-semibold text-slate-900">API coverage snapshot</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-6">
          {coverageByCategory.map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
              <p className="text-lg font-bold text-slate-900">{item.value}</p>
              <p className="text-xs text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
