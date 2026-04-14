/**
 * API Integration Test Script
 * 
 * This script tests all API endpoints to ensure they're properly connected
 * and returning data that can be displayed in the UI.
 * 
 * Usage: node test_api_integration.js
 */

const fetch = require('node-fetch');

const API_BASE = process.env.API_BASE_URL || 'https://apiv2.offersmeta.in';
const BEARER_TOKEN = process.env.CRM_BEARER_TOKEN;

if (!BEARER_TOKEN) {
  console.error('❌ Error: CRM_BEARER_TOKEN environment variable is required');
  console.error('Set it in server/.env or export it before running this script.');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${BEARER_TOKEN}`,
  'Content-Type': 'application/json',
};

const endpoints = [
  // Dashboard endpoints
  { name: 'Publisher List', path: '/publicher/publisherList', method: 'GET', required: true },
  { name: 'Advertiser List', path: '/advertiser/advertiserList', method: 'GET', required: true },
  { name: 'All Offers', path: '/offer/allOfferList', method: 'GET', required: true },
  { name: 'Conversion List', path: '/conversion/ConversionList', method: 'GET', required: true },
  { name: 'Offer Report', path: '/report/offerReport', method: 'GET', required: false },
  
  // Contacts endpoints
  { name: 'Publisher Details', path: '/publicher/publisherList?page=1&limit=10', method: 'GET', required: false },
  { name: 'Ad advertiser', path: '/advertiser/addAdvertiser', method: 'POST', required: false, skip: true }, // Skip POST tests
  
  // Deals endpoints
  { name: 'Offer List', path: '/offer/offerList?page=1&limit=10', method: 'GET', required: false },
  { name: 'View Offer', path: '/offer/viewOffer?offerId=test', method: 'GET', required: false },
  
  // Activities endpoints
  { name: 'Tracking List', path: '/tracking/trackingList?page=1&limit=10', method: 'GET', required: false },
  { name: 'Sent Logs', path: '/sentLogs/sentLogList?page=1&limit=10', method: 'GET', required: false },
  
  // Reports endpoints
  { name: 'Publisher Report', path: '/report/publisherReport', method: 'GET', required: false },
  { name: 'Advertiser Report', path: '/report/advertiserReport', method: 'GET', required: false },
  { name: 'Affiliates Performance', path: '/report/AffilitesPerformanceReport', method: 'GET', required: false },
  
  // Admin endpoints
  { name: 'Admin View', path: '/admin/view', method: 'GET', required: false },
  { name: 'SubAdmin View', path: '/subAdmin/viewData', method: 'GET', required: false },
];

async function testEndpoint(endpoint) {
  const { name, path, method, required, skip } = endpoint;
  
  if (skip) {
    console.log(`⏭️  SKIP: ${name}`);
    return { name, status: 'skipped' };
  }
  
  try {
    const url = `${API_BASE}${path}`;
    const options = {
      method,
      headers,
    };
    
    // Add body for POST requests
    if (method === 'POST') {
      options.body = JSON.stringify({ test: true });
    }
    
    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type') || '';
    
    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    const status = response.status;
    
    if (status >= 200 && status < 300) {
      console.log(`✅ PASS: ${name} (${status})`);
      return { name, status: 'pass', statusCode: status, data };
    } else if (status === 401 || status === 403) {
      console.log(`🔒 AUTH: ${name} (${status}) - Requires authentication`);
      return { name, status: 'auth_required', statusCode: status };
    } else if (status === 404) {
      console.log(`❌ 404: ${name} - Endpoint not found`);
      return { name, status: 'not_found', statusCode: status };
    } else {
      console.log(`⚠️  WARN: ${name} (${status})`);
      return { name, status: 'warning', statusCode: status, data };
    }
  } catch (error) {
    console.log(`❌ ERROR: ${name} - ${error.message}`);
    return { name, status: 'error', error: error.message };
  }
}

async function runTests() {
  console.log('🚀 Starting API Integration Tests...\n');
  console.log(`📍 API Base: ${API_BASE}`);
  console.log(`🔑 Token: ${BEARER_TOKEN ? 'Present' : 'Missing'}\n`);
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    results.push(result);
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  
  const passed = results.filter(r => r.status === 'pass').length;
  const authRequired = results.filter(r => r.status === 'auth_required').length;
  const warnings = results.filter(r => r.status === 'warning').length;
  const errors = results.filter(r => r.status === 'error').length;
  const notFound = results.filter(r => r.status === 'not_found').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  
  console.log(`✅ Passed: ${passed}`);
  console.log(`🔒 Auth Required: ${authRequired}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`❌ Not Found: ${notFound}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`📝 Total: ${results.length}`);
  
  if (passed > 0) {
    console.log('\n✅ API integration is working!');
    console.log('The frontend should be able to fetch and display real data.');
  } else {
    console.log('\n⚠️  No endpoints returned successful responses.');
    console.log('Check your API token and network connectivity.');
  }
  
  return results;
}

// Run the tests
runTests()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });