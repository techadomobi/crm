# API Catalog (Generated from OffersMeta Swagger)

- Source: https://apiv2.offersmeta.in/API-docs/
- Spec: Swagger 2.0
- Base URL: https://apiv2.offersmeta.in/
- Global Auth: Authorization header, Bearer JWT (`bearerAuth`)

## Contacts

Count: 153

### POST /admin/addAdvertiserConversionLimit

- Auth required: no
- Tags: ADMIN ADD LIMIT
- Request params:
- partners_Id (formData, required)
- conversion (formData, required)
- offerId (formData, required)
- advertiserId (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /admin/addPublisherConversionLimit

- Auth required: no
- Tags: ADMIN ADD LIMIT
- Request params:
- partners_Id (formData, required)
- conversion (formData, required)
- offerId (formData, required)
- publisherId (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /admin/approvedAdvertiser

- Auth required: no
- Tags: ADVERTISER_MANAGEMENT
- Request params:
- token (header, required)
- _id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, user Delete successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /admin/publisherCapsList

- Auth required: no
- Tags: ADMIN ADD LIMIT
- Request params:
- partners_Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully delete.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /admin/publisherCutbackTool

- Auth required: no
- Tags: CUTBACK
- Request params:
- partners_Id (formData, required)
- conversionLimit (formData, optional)
- offerId (formData, required)
- publisherId (formData, optional)
- event_value (formData, optional)
- type (formData, optional)
- startDate (formData, optional)
- endDate (formData, optional)
- status (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /advertiser/addAdvertiser

- Auth required: no
- Tags: ADVERTISER
- Request params:
- partners_Id (formData, optional)
- managerId (formData, required)
- companyName (formData, required)
- email (formData, required)
- firstName (formData, required)
- lastName (formData, required)
- mobileNumber (formData, required)
- country (formData, required)
- region (formData, required)
- street (formData, required)
- city (formData, required)
- pinCode (formData, required)
- password (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully add Advertiser.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/advertiserClickList

- Auth required: no
- Tags: ADVERTISER DASHBOARD
- Request params:
- partners_Id (query, required)
- advertiser_id (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/advertiserConversionList

- Auth required: no
- Tags: ADVERTISER DASHBOARD
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/advertiserConversionRate

- Auth required: no
- Tags: ADVERTISER DASHBOARD
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/advertiserImpressionList

- Auth required: no
- Tags: ADVERTISER DASHBOARD
- Request params:
- partners_Id (query, required)
- advertiser_id (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/advertiserList

- Auth required: no
- Tags: ADVERTISER
- Request params:
- partners_Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully list found.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /advertiser/advertiserSignup

- Auth required: no
- Tags: ADVERTISER
- Request params:
- partners_Id (formData, required)
- email (formData, required)
- firstName (formData, required)
- lastName (formData, required)
- companyName (formData, required)
- address (formData, required)
- mobileNumber (formData, required)
- password (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully signup.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/advertiserTotalEvent

- Auth required: no
- Tags: ADVERTISER DASHBOARD
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/advertiserTotalImpression

- Auth required: no
- Tags: ADVERTISER DASHBOARD
- Request params:
- partners_Id (query, required)
- advertiser_id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /advertiser/advertiserUpdatePassword

- Auth required: no
- Tags: ADVERTISER
- Request params:
- partners_Id (formData, required)
- advertiserId (formData, required)
- oldPassword (formData, required)
- newPassword (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully signup.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/advertiserView

- Auth required: no
- Tags: ADVERTISER
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully list found.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /advertiser/genreateToken

- Auth required: no
- Tags: ADVERTISER
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully list found.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /advertiser/login

- Auth required: no
- Tags: ADVERTISER
- Request params:
- email (formData, required)
- password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/totalAdvertiserClick

- Auth required: no
- Tags: ADVERTISER DASHBOARD
- Request params:
- partners_Id (query, required)
- advertiser_id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher click.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/totalAdvertiserConverion

- Auth required: no
- Tags: ADVERTISER DASHBOARD
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher conversion.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/totalAdvertiserPayout

- Auth required: no
- Tags: ADVERTISER DASHBOARD
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /advertiser/totalAdvertiserRevenue

- Auth required: no
- Tags: ADVERTISER DASHBOARD
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /advertiser/updateAdvertiser

- Auth required: no
- Tags: ADVERTISER
- Request params:
- partners_Id (query, required)
- managerId (formData, required)
- advertiserId (formData, required)
- companyName (formData, optional)
- email (formData, optional)
- firstName (formData, optional)
- lastName (formData, optional)
- mobileNumber (formData, optional)
- country (formData, optional)
- region (formData, optional)
- street (formData, optional)
- city (formData, optional)
- pinCode (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully update Advertiser.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /api/ExportByPublisherId

- Auth required: no
- Tags: EXPORT
- Request params:
- selectedParams (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- searchBy (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /api/publisherExportList

- Auth required: no
- Tags: EXPORT
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /contactUs/contact

- Auth required: no
- Tags: CONTACT
- Request params:
- name (formData, required)
- email (formData, required)
- mobileNumber (formData, required)
- company (formData, required)
- address (formData, required)
- planId (formData, required)
- skypeId (formData, required)
- domain (formData, required)
- password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  publisherconversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /contactUs/messageList

- Auth required: no
- Tags: CONTACT
- Request params:
- adminId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  publisherconversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /contactUs/viewMessage

- Auth required: no
- Tags: CONTACT
- Request params:
- adminId (query, required)
- Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  publisherconversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/approvedAllAdvertiserConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- advertiserId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/approvedAllPublisherConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/cancelAllAdvertiserConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- advertiserId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/cancelAllPublisherConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/DeclinedAllAdvertiserConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- advertiserId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/DeclinedAllPublisherConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/downloadDataInExcelSheetByadvertiserId

- Auth required: yes
- Tags: DOWNLOAD DATA IN EXCEL SHEET
- Request params:
- advertiserId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/downloadDataInExcelSheetByPublisherId

- Auth required: yes
- Tags: DOWNLOAD DATA IN EXCEL SHEET
- Request params:
- publisherId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/pendingAllAdvertiserConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- advertiserId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/pendingAllPublisherConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/serchDataByPublisherId

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- publisherId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /eventReport/advertiserEventValueReport

- Auth required: no
- Tags: EVENTVALUE_REPORT
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  publisherconversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /eventReport/advertiserManagerEventReport

- Auth required: no
- Tags: EVENTVALUE_REPORT
- Request params:
- partners_Id (query, required)
- advertiserManagerId (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  publisherconversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /eventReport/publisherEventValueReport

- Auth required: no
- Tags: EVENTVALUE_REPORT
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  publisherconversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /impression/serchDataByPublisherId

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/advertiserAsignList

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, publisher list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/advertiserClickList

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- partners_Id (query, required)
- advertiserManagerId (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, click list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/advertiserConversionList

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- partners_Id (query, required)
- advertiserManagerId (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, conversion list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/advertiserdataExport

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- partners_Id (query, required)
- advertiserManagerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, data export sucesfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/advertiserImpList

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- advertiserManagerId (query, required)
- page (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total event sucesfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/advertiserTotalClick

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- partners_Id (query, required)
- advertiserManagerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total click found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/advertiserTotalConversion

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- partners_Id (query, required)
- advertiserManagerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total converson found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/advertiserTotalEvent

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- advertiserManagerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total event sucesfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/advertiserTotalImression

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- advertiserManagerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total event sucesfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/advertiserTotalPayout

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- partners_Id (query, required)
- advertiserManagerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total Payout  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/advertiserTotalRevenue

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- partners_Id (query, required)
- advertiserManagerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total Revenue  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /manager/AprovedPublisher

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- token (header, required)
- _id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, user Delete successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/AssignPublisherList

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, publisher list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/clickList

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, click list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/conversionList

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, conversion list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/downloadDataInExcelSheetByManager

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- selectedParams (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/downloadDataInExcelSheetByOfferId

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- offerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/downloadDataInExcelSheetByPublisherId

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- publisherId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/impList

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- page (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total event sucesfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/maangerSerchDataByPublisherId

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- publisherId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /manager/managerAddPublisher

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (formData, required)
- managerId (query, required)
- companyName (formData, required)
- email (formData, required)
- firstName (formData, required)
- lastName (formData, required)
- mobileNumber (formData, required)
- country (formData, required)
- region (formData, required)
- street (formData, required)
- city (formData, required)
- pinCode (formData, required)
- password (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully signup.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/managerSearchAllConversionData

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- searchParam (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/managerSerchDataByOfferId

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- offerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/totalClick

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total click found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/totalConversion

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total converson found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/totalEvent

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total event sucesfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/totalImression

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total event sucesfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/totalPayout

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total Payout  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/totalProfit

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, data export sucesfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/totalRevenue

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total Revenue  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/viewAdvertiserData

- Auth required: no
- Tags: ADVERTISER_MANAGER
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- advertiserId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, publisher list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/viewPublisherData

- Auth required: no
- Tags: PUBLISHER_MANAGER_ROLE
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, publisher list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/advertiserManagerOfferList

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- advertiserManagerId (query, optional)
- page (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer list found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/advertiserOfferDetails

- Auth required: no
- Tags: SUB-ADMIN
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer list found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/advertiserOfferList

- Auth required: no
- Tags: SUB-ADMIN
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- page (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer list found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/publisherOfferList

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- partners_Id (query, optional)
- publisherId (query, optional)
- page (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer list found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/searchpublisherAPI

- Auth required: yes
- Tags: SEARCH
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, search data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/searchPublisherSentLogAPI

- Auth required: yes
- Tags: SEARCH
- Request params:
- search (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, search data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /publicher/addPublicher

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (formData, required)
- managerId (formData, required)
- companyName (formData, required)
- email (formData, required)
- firstName (formData, required)
- lastName (formData, required)
- mobileNumber (formData, required)
- country (formData, required)
- address (formData, required)
- skypeId (formData, optional)
- telegramId (formData, optional)
- password (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully signup.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publicher/approveOfferForPublisher

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- offerId (query, required)
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  publisherconversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publicher/changePassword

- Auth required: no
- Tags: PUBLICHER
- Request params:
- token (header, required)
- password (formData, required)
- newPassword (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully changePassword.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/downloadDataInExcelSheetByOfferId

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- offerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/downloadDataInExcelSheetByPublisher

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- selectedParams (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/downloadDataInExcelSheetByPublisherId

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publicher/editProfile

- Auth required: no
- Tags: PUBLICHER
- Request params:
- token (header, required)
- email (formData, required)
- name (formData, required)
- address (formData, required)
- mobileNumber (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully edit.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publicher/forgotPassword

- Auth required: no
- Tags: PUBLICHER
- Request params:
- email (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully forgotPassword.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publicher/genreatePublisherKey

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully list found.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /publicher/login

- Auth required: no
- Tags: PUBLICHER
- Request params:
- email (formData, required)
- password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publicher/pubActive

- Auth required: yes
- Tags: PUBLISHER_STATUS
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, lannding page update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publicher/pubInactive

- Auth required: yes
- Tags: PUBLISHER_STATUS
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, lannding page update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/publicherList

- Auth required: no
- Tags: PUBLICHER
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully get publisher list.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/publisherClickList

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/publisherConversionList

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/PublisherConversionRate

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/publisherEventValueReport

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  publisherconversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/publisherImpressionList

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- page (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/publisherList

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully list found.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /publicher/publisherLoginById

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/publisherSearchAllConversionData

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- searchParam (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/publisherSerchDataByOfferId

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- offerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/PublisherTotalEvent

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/PublisherTotalImpression

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publicher/resendOtp

- Auth required: no
- Tags: PUBLICHER
- Request params:
- email (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully resendotp.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publicher/resetPassword

- Auth required: no
- Tags: PUBLICHER
- Request params:
- otp (formData, required)
- newPassword (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully  resetPassword.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /publicher/sendOfferToPublisher

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- offerId (query, required)
- note (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  publisherconversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /publicher/senndLoginDetails

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (formData, required)
- publisherId (formData, required)
- password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  senndLoginDetails.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /publicher/signup

- Auth required: no
- Tags: PUBLICHER
- Request params:
- partners_Id (formData, required)
- email (formData, required)
- firstName (formData, required)
- lastName (formData, required)
- companyName (formData, required)
- address (formData, required)
- mobileNumber (formData, required)
- password (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully signup.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/totalPublisherClick

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher click.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/totalPublisherConverion

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher conversion.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/totalPublisherPayout

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  total publisher Payout.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publicher/updatePublisher

- Auth required: yes
- Tags: SUBADMIN ADD PUBLISHER
- Request params:
- publisherId (query, required)
- companyName (formData, required)
- email (formData, required)
- firstName (formData, required)
- lastName (formData, required)
- mobileNumber (formData, required)
- skypeId (formData, optional)
- telegramId (formData, optional)
- country (formData, required)
- address (formData, required)
- managerId (formData, required)
- password (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully signup.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publicher/verifyOtp

- Auth required: no
- Tags: PUBLICHER
- Request params:
- email (formData, required)
- otp (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully verifyOtp.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publicher/viewData

- Auth required: no
- Tags: PUBLICHER
- Request params:
- publicherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully viewData.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publisher/approoveOffer

- Auth required: no
- Tags: Request Offer
- Request params:
- requestOfferId (formData, required)
- status (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, aprooved successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publisher/approoveOfferPublishers

- Auth required: no
- Tags: Request Offer
- Request params:
- publisherIds (formData, required)
- offerId (formData, required)
- status (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, aprooved successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /publisher/requestOffer

- Auth required: no
- Tags: Request Offer
- Request params:
- publisherId (formData, required)
- offerId (formData, required)
- question (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publisher/requestofferList

- Auth required: no
- Tags: Request Offer
- Request params:
- partners_Id (query, required)
- page (query, optional)
- search (query, optional)
- status (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /publisherApproved/blockPublisher

- Auth required: no
- Tags: APPROVED & UNAPPROOVED PUBLISHER
- Request params:
- partners_Id (formData, required)
- publisherId (formData, required)
- offerId (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  publisherconversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publisherApproved/blockPublisherList

- Auth required: no
- Tags: APPROVED & UNAPPROOVED PUBLISHER
- Request params:
- partners_Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  unblockedPublisher.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publisherApproved/unblockedPublisher

- Auth required: no
- Tags: APPROVED & UNAPPROOVED PUBLISHER
- Request params:
- partners_Id (formData, required)
- Id (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  unblockedPublisher.
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /publisherManagement/deletePostback

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- postbackId (query, required)
- partners_Id (query, required)
- offerId (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postbac update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /publisherManagement/deletePublisherPostback

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- postbackId (query, required)
- publisherId (query, required)
- partners_Id (query, required)
- offerId (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postbac update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /publisherManagement/ManagerdeletePostback

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- postbackId (query, required)
- publisherId (query, required)
- managerId (query, required)
- partners_Id (query, required)
- offerId (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postbac update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /publisherManagement/managerpostback

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- partners_Id (formData, optional)
- managerId (formData, required)
- publisherId (formData, required)
- offerId (formData, optional)
- level (formData, required)
- type (formData, required)
- postback (formData, required)
- event_value (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postbac create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publisherManagement/managerPostbackList

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- partners_Id (query, optional)
- managerId (query, required)
- page (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postbac update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publisherManagement/managerPostbackView

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postback view successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publisherManagement/managerUpdatePostback

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- partners_Id (formData, required)
- publisherId (formData, required)
- managerId (formData, required)
- postbackId (formData, required)
- offerId (formData, optional)
- level (formData, required)
- type (formData, required)
- postback (formData, required)
- status (formData, required)
- conversionStatus (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postbac update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publisherManagement/postbackList

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- partners_Id (query, required)
- page (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postback list successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /publisherManagement/postbackMangement

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- partners_Id (query, optional)
- publisherId (formData, required)
- offerId (formData, optional)
- level (formData, required)
- type (formData, required)
- postback (formData, required)
- event_value (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postbac create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publisherManagement/publisherPostbackList

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- page (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postback list successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /publisherManagement/updatePostback

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- partners_Id (formData, required)
- publisherId (formData, required)
- postbackId (formData, required)
- offerId (formData, optional)
- level (formData, required)
- type (formData, required)
- postback (formData, required)
- status (formData, required)
- conversionStatus (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postbac update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /publisherManagement/viewPostabck

- Auth required: no
- Tags: POSTBACK MANAGEMENT
- Request params:
- partners_Id (query, required)
- Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, postbac update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /report/advertiserManagerofferReport

- Auth required: no
- Tags: REPORT
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /report/advertiserPerformanceReport

- Auth required: no
- Tags: REPORT
- Request params:
- partners_Id (query, required)
- advertiser_id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /report/advertiserReport

- Auth required: no
- Tags: REPORT
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /report/advManageAdvertiserofferReport

- Auth required: no
- Tags: REPORT
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /report/publisherManagerReport

- Auth required: no
- Tags: REPORT
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /report/publisherReport

- Auth required: no
- Tags: REPORT
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /report/publishersReport

- Auth required: no
- Tags: REPORT
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /sentLogs/downloadSentLogDataInExcelSheetByPublisherId

- Auth required: no
- Tags: DOWNLOAD DATA IN EXCEL SHEET
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /sentLogs/PublisherManagerSentLogList

- Auth required: no
- Tags: SENT LOG
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /sentLogs/publisherPostbackApi

- Auth required: no
- Tags: SENT LOG
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /sentLogs/PublisherSentLogList

- Auth required: no
- Tags: SENT LOG
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /sentLogs/serchDataByPublisherId

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /smartOffer/publisher

- Auth required: no
- Tags: SMART-OFFER
- Request params:
- partners_Id (formData, required)
- smartOfferId (formData, required)
- publisherId (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, Landing page add  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /top/topAdvertiser

- Auth required: no
- Tags: TOP-DATA
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /top/topPublisher

- Auth required: no
- Tags: TOP-DATA
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /tracking/serchDataByPublisherId

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /wallet/addAmount

- Auth required: no
- Tags: ADVERTISER_WALLET
- Request params:
- partners_Id (formData, optional)
- advertiserId (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully add Advertiser.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /wallet/advertiserViewWallet

- Auth required: no
- Tags: ADVERTISER_WALLET
- Request params:
- partners_Id (formData, optional)
- advertiserId (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully add Advertiser.
- 500: Internal Server Error
- 501: Something went wrong!

## Leads

Count: 2

### GET /api/getExportPubStatus

- Auth required: no
- Tags: EXPORT
- Request params:
- jobId (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /api/getExportStatus

- Auth required: no
- Tags: EXPORT
- Request params:
- jobId (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

## Deals / Opportunities

Count: 52

### PUT /conversion/approvedAllOfferConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/cancelAllOfferConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/DeclinedAllOfferConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/downloadDataInExcelSheetByOfferId

- Auth required: yes
- Tags: DOWNLOAD DATA IN EXCEL SHEET
- Request params:
- offerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/pendingAllOfferConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/serchDataByOfferId

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- offerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /impression/serchDataByOfferId

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- partners_Id (query, required)
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /invoice/createInvoice

- Auth required: no
- Tags: INVOICE
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- invoiceId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /invoice/partnerBillinDetails

- Auth required: no
- Tags: INVOICE
- Request params:
- partners_Id (query, required)
- invoiceId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /invoice/partnerBilling

- Auth required: no
- Tags: INVOICE
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- offerIds (query, required)
- deduction (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /invoice/partnerBillingUpdate

- Auth required: no
- Tags: INVOICE
- Request params:
- invoiceId (query, required)
- partners_Id (query, required)
- publisherId (query, required)
- offerIds (query, required)
- deduction (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /invoice/partnerBillinList

- Auth required: no
- Tags: INVOICE
- Request params:
- partners_Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /invoice/selectData

- Auth required: no
- Tags: INVOICE
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /offer/addCreatives

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (query, required)
- image (formData, optional)
- url (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /offer/addCustomPayout

- Auth required: no
- Tags: SUB-ADMIN
- Request params:
- partners_Id (formData, required)
- publisherId (formData, required)
- offerId (formData, required)
- eventId (query, required)
- customPayout (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer view found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /offer/addEventValue

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (formData, required)
- advertiserManagerId (formData, optional)
- eventValue (formData, optional)
- eventName (formData, optional)
- revenue (formData, required)
- payout (formData, required)
- status (formData, required)
- eventType (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer view found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /offer/addLandingPage

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (query, required)
- advertiserManagerId (query, optional)
- titleName (formData, required)
- trackingUrl (formData, required)
- impressionUrl (formData, required)
- geoCountry (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, Landing page add  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/allOfferList

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- partners_Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer list found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/api

- Auth required: no
- Tags: SUB-ADMIN
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- key (query, required)
- offerId (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, get offer successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /offer/createOffer

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- image (formData, optional)
- title (formData, required)
- advertiserManagerId (formData, optional)
- advertiserId (formData, required)
- privacyLavel (formData, required)
- description (formData, required)
- category (formData, required)
- traffic (formData, required)
- incentive (formData, required)
- eventType (formData, required)
- eventValue (formData, optional)
- saleAmount (formData, optional)
- currency (formData, required)
- revenue (formData, required)
- payout (formData, required)
- eventName (formData, required)
- country_code (formData, required)
- geoCountry (formData, optional)
- osAllowed (formData, required)
- previewUrl (formData, required)
- trackingUrl (formData, required)
- impressionUrl (formData, required)
- fallbackUrl (formData, optional)
- packageName (formData, optional)
- startDate (formData, optional)
- endDate (formData, optional)
- offerKpi (formData, optional)
- isBlock (formData, optional)
- event_bit (formData, optional)
- redirectMode (formData, optional)
- conversionTracking (formData, optional)
- conversionTrackingDomain (formData, optional)
- trackMultipleConversion (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /offer/deleteEventData

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- partners_Id (query, required)
- offerId (query, required)
- eventId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, delete offer successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /offer/deleteOffer

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/eventList

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,offer's event data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/eventValueList

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,offer's eventvalue data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/fetchOfferApi

- Auth required: no
- Tags: SUB-ADMIN
- Request params:
- url (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer view found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /offer/geoTargeting

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (formData, required)
- landingPageId (query, required)
- osAllowed (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, lannding page update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/getExternalOfferLst

- Auth required: no
- Tags: EXTERNAL_OFFER
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/getltsOffer

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer list found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /offer/landingPageDelete

- Auth required: no
- Tags: SUB-ADMIN
- Request params:
- offerId (query, required)
- advertiserManagerId (query, optional)
- landingPageId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, delete offer successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/landingPageList

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer view found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /offer/offerActive

- Auth required: no
- Tags: OfferManagement
- Request params:
- partners_Id (query, required)
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, lannding page update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /offer/offerInactive

- Auth required: no
- Tags: OfferManagement
- Request params:
- partners_Id (query, required)
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, lannding page update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/offerList

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- page (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer list found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/searchOfferAPI

- Auth required: yes
- Tags: SEARCH
- Request params:
- search (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, search data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /offer/updateEventData

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (formData, required)
- advertiserManagerId (formData, optional)
- eventId (query, required)
- eventName (formData, optional)
- eventValue (formData, optional)
- revenue (formData, optional)
- payout (formData, optional)
- eventType (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer view found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /offer/updateImpressionLinlk

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (formData, required)
- landingPageId (query, required)
- impressionUrl (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, lannding page update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /offer/updateLandingPage

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (formData, required)
- advertiserManagerId (formData, optional)
- landingPageId (query, optional)
- trackingUrl (formData, optional)
- impressionUrl (formData, optional)
- titleName (formData, optional)
- geoCountry (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, lannding page update  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /offer/updateOffer

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (formData, required)
- image (formData, optional)
- title (formData, optional)
- advertiserManagerId (formData, optional)
- advertiserId (formData, optional)
- privacyLavel (formData, optional)
- description (formData, optional)
- category (formData, optional)
- traffic (formData, optional)
- incentive (formData, optional)
- packageName (formData, optional)
- eventName (formData, optional)
- startDate (formData, optional)
- endDate (formData, optional)
- offerKpi (formData, optional)
- previewUrl (formData, optional)
- isBlock (formData, optional)
- event_bit (formData, optional)
- osAllowed (formData, optional)
- redirectMode (formData, optional)
- conversionTracking (formData, optional)
- conversionTrackingDomain (formData, optional)
- trackMultipleConversion (formData, optional)
- country_code (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer update successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /offer/updateOfferType

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (formData, optional)
- type (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer list found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /offer/viewOffer

- Auth required: yes
- Tags: SUB-ADMIN
- Request params:
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer view found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /partner/offerwall

- Auth required: no
- Tags: OFFERWALL
- Request params:
- partners_Id (query, required)
- offerId (query, required)
- payout (formData, required)
- trackingUrl (formData, optional)
- dPayout1 (formData, optional)
- dPayout2 (formData, optional)
- dPayout3 (formData, optional)
- dPayout5 (formData, optional)
- dPayout6 (formData, optional)
- dPayout7 (formData, optional)
- dPayout8 (formData, optional)
- dPayout9 (formData, optional)
- dPayout10 (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /partner/offerwalList

- Auth required: no
- Tags: OFFERWALL
- Request params:
- partners_Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /partner/offerwallView

- Auth required: no
- Tags: OFFERWALL
- Request params:
- partners_Id (query, required)
- offerwallId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /pub/appList

- Auth required: no
- Tags: OFFERWALL
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer view found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /pub/createPubApp

- Auth required: no
- Tags: OFFERWALL
- Request params:
- partners_Id (query, required)
- publisherId (query, required)
- appName (formData, required)
- siteUrl (formData, required)
- callBackUrl (formData, required)
- payoutRatio (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer view found  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /report/offerReport

- Auth required: no
- Tags: REPORT
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /sentLogs/downloadSentLogDataInExcelSheetByOfferId

- Auth required: no
- Tags: DOWNLOAD DATA IN EXCEL SHEET
- Request params:
- partners_Id (query, required)
- offerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /sentLogs/serchDataByOfferId

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- partners_Id (query, required)
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /smartOffer/offer

- Auth required: no
- Tags: SMART-OFFER
- Request params:
- partners_Id (formData, required)
- smartOfferId (formData, required)
- offerId (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, Landing page add  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /smartOffer/offerAdd

- Auth required: no
- Tags: SMART-OFFER
- Request params:
- partners_Id (formData, required)
- name (formData, required)
- privacyLavel (formData, required)
- offerId (formData, required)
- publisherId (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, Landing page add  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /top/topOffer

- Auth required: no
- Tags: TOP-DATA
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /tracking/serchDataByOfferId

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

## Activities

Count: 62

### POST /admin/addConversionLimit

- Auth required: no
- Tags: ADMIN ADD LIMIT
- Request params:
- partners_Id (formData, required)
- conversion (formData, required)
- offerId (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /api/exportsentLogs

- Auth required: no
- Tags: EXPORT
- Request params:
- selectedParams (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- searchBy (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /category/verticalList

- Auth required: yes
- Tags: CATEGORY
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, vertical List successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/approvedAllConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/approvedAllmanagerConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- publisherManagerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/approvedConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- conversionId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/cancelAllConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/cancelAllmanagerConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- publisherManagerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/cancelConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- conversionId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/conversionCutOffApi

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- offerId (query, required)
- publisherId (query, required)
- count (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/ConversionList

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- searchBy (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/conversionRate

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total CR  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/DeclinedAllConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/DeclinedAllmanagerConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- publisherManagerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/DeclinedConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- conversionId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /conversion/deleteConversionData

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /conversion/deleteInvalidConversionData

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /conversion/deleteInvalidEventConversionData

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/downloadEventLogsByPartners

- Auth required: yes
- Tags: DOWNLOAD DATA IN EXCEL SHEET
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/downloadPixelLog

- Auth required: yes
- Tags: DOWNLOAD DATA IN EXCEL SHEET
- Request params:
- selectedParams (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/getConversionAccordingToDate

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- startDate (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/iframe

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- m (query, required)
- click_id (query, required)
- secure (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/invalidClick

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/invalidEventClick

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/optimizationTools

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- publisherId (query, required)
- offerId (query, required)
- eventValue (query, required)
- number (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/optimizationToolsList

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/pendingAllConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/pendingAllmanagerConversion

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- publisherManagerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/pendingConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- conversionId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/pixel

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- m (query, required)
- click_id (query, required)
- secure (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/postback

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- m (query, required)
- click_id (query, required)
- secure (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /conversion/postback

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- m (query, required)
- click_id (query, required)
- secure (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/postbackEvent

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- click_id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/postbackLogs

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /conversion/removeoptmizationTool

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- optimizationdata (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/searchAllConversionData

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- searchParam (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/serchDataByAdvertiseId

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- advertiserId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/serchDataByManagerId

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- publisherManagerId (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/totalConversion

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/totalEvent

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total CR  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/totalPayout

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total Payout  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/totalProfit

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /conversion/totalRevenue

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total Revenue  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /eventReport/managerEventReport

- Auth required: no
- Tags: EVENTVALUE_REPORT
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  publisherconversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /eventReport/partnerEventValueReport

- Auth required: no
- Tags: EVENTVALUE_REPORT
- Request params:
- partners_Id (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- searchBy (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  partner conversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /eventReport/searchPartnerReport

- Auth required: no
- Tags: EVENTVALUE_REPORT
- Request params:
- partners_Id (query, required)
- offerId (query, optional)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,  partner conversionRateData.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /sentLogs/downloadSentLogDataInExcelSheetByPartners_Id

- Auth required: no
- Tags: DOWNLOAD DATA IN EXCEL SHEET
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /sentLogs/sentLogList

- Auth required: no
- Tags: SENT LOG
- Request params:
- partners_Id (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /sentLogs/serchDataByAdvertiseId

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /sentLogs/serchDataByManagerId

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /smart_link/clicks

- Auth required: no
- Tags: SMART-TRACKINGLINK
- Request params:
- m (query, required)
- smart_offer (query, required)
- a (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /subAdmin/conversionTestingTool

- Auth required: no
- Tags: SUBADMIN
- Request params:
- url (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully resendotp.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /subAdmin/trackingTesting

- Auth required: yes
- Tags: SUBADMIN
- Request params:
- url (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully resendotp.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /tracking/click

- Auth required: no
- Tags: TRACKING_LINK
- Request params:
- m (query, required)
- o (query, required)
- a (query, required)
- link_id (query, optional)
- force_transparent (query, optional)
- url (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /tracking/deletedata

- Auth required: yes
- Tags: TRACKING_LINK
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /tracking/EarningPerClick

- Auth required: yes
- Tags: TRACKING_LINK
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /tracking/GrossClick

- Auth required: yes
- Tags: TRACKING_LINK
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /tracking/serchDataByAdvertiseId

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- advertiserId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /tracking/serchDataByManagerId

- Auth required: yes
- Tags: POSTBACK URL
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /tracking/totalClick

- Auth required: yes
- Tags: TRACKING_LINK
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /tracking/trackingList

- Auth required: yes
- Tags: TRACKING_LINK
- Request params:
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,list found sucessfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /tracking/uniqueClick

- Auth required: yes
- Tags: TRACKING_LINK
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

## Companies / Accounts

Count: 12

### GET /admin/partnersDetails

- Auth required: no
- Tags: SUB_ADMIN_MANAGEMENT
- Request params:
- adminId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, user data view successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /admin/partnersList

- Auth required: no
- Tags: SUB_ADMIN_MANAGEMENT
- Request params:
- adminId (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, user Delete successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /api/partnerExportList

- Auth required: no
- Tags: EXPORT
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /partner/capLimitList

- Auth required: no
- Tags: PARTNER_ADD_CLICKLIMIT
- Request params:
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully delete.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /partner/capLimitView

- Auth required: no
- Tags: PARTNER_ADD_CLICKLIMIT
- Request params:
- id (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully delete.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /partner/createvalidation

- Auth required: no
- Tags: VALIDATION
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- partners_Id (formData, optional)
- publisherId (formData, required)
- offerId (formData, required)
- deductionNumber (formData, optional)
- deductionReason (formData, required)
- validNumber (formData, optional)
- payoutUsd (formData, optional)
- finalAmountUsd (formData, optional)
- status (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /partner/deleteClickLimit

- Auth required: no
- Tags: PARTNER_ADD_CLICKLIMIT
- Request params:
- offerId (formData, required)
- publisherId (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /partner/getValidationDetails

- Auth required: no
- Tags: VALIDATION
- Request params:
- _id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /partner/getValidationReports

- Auth required: no
- Tags: VALIDATION
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /partner/setClickLimit

- Auth required: no
- Tags: PARTNER_ADD_CLICKLIMIT
- Request params:
- offerId (formData, required)
- publisherId (formData, required)
- clickLimit (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /partner/updateClickLimit

- Auth required: no
- Tags: PARTNER_ADD_CLICKLIMIT
- Request params:
- offerId (formData, optional)
- publisherId (formData, optional)
- clickLimit (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /partner/updateValidationReport

- Auth required: no
- Tags: VALIDATION
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- validationId (formData, required)
- partners_Id (formData, optional)
- publisherId (formData, required)
- offerId (formData, required)
- deductionNumber (formData, optional)
- deductionReason (formData, required)
- validNumber (formData, optional)
- payoutUsd (formData, optional)
- finalAmountUsd (formData, optional)
- status (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

## Reports & Analytics

Count: 10

### GET /api/downloadFile

- Auth required: no
- Tags: EXPORT
- Request params:
- jobId (query, optional)
- type (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /api/downloadFileByManager

- Auth required: no
- Tags: EXPORT
- Request params:
- jobId (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /api/downloadFileByPub

- Auth required: no
- Tags: EXPORT
- Request params:
- jobId (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /api/exportManagerReport

- Auth required: no
- Tags: EXPORT
- Request params:
- selectedParams (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- searchBy (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /api/exportPixelLogs

- Auth required: no
- Tags: EXPORT
- Request params:
- selectedParams (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- searchBy (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /api/managerExportList

- Auth required: no
- Tags: EXPORT
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /api/startExport

- Auth required: no
- Tags: EXPORT
- Request params:
- selectedParams (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- searchBy (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, download  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/dataExport

- Auth required: no
- Tags: DOWNLOAD DATA IN EXCEL SHEET
- Request params:
- partners_Id (query, required)
- publisherManagerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, data export sucesfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /report/AffilitesPerformanceReport

- Auth required: no
- Tags: REPORT
- Request params:
- partners_Id (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- search (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /top/topManager

- Auth required: no
- Tags: TOP-DATA
- Request params:
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, successfully .
- 500: Internal Server Error
- 501: Something went wrong!

## Users & Permissions

Count: 52

### POST /admin/addClickLimit

- Auth required: no
- Tags: ADMIN ADD LIMIT
- Request params:
- adminId (formData, required)
- partners_Id (formData, required)
- click (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /admin/addPlan

- Auth required: no
- Tags: PLANS
- Request params:
- adminId (formData, required)
- planName (formData, required)
- price (formData, required)
- timePeriod (formData, required)
- conversion (formData, required)
- click (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /admin/AprovedSubAdmin

- Auth required: no
- Tags: SUB_ADMIN_MANAGEMENT
- Request params:
- adminId (query, required)
- userId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, user Delete successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /admin/block

- Auth required: no
- Tags: SUB_ADMIN_MANAGEMENT
- Request params:
- adminId (query, required)
- userId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, user data view successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /admin/changePassword

- Auth required: no
- Tags: ADMIN
- Request params:
- token (header, required)
- password (formData, required)
- newPassword (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully changePassword.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /admin/cutbackDetails

- Auth required: no
- Tags: CUTBACK
- Request params:
- id (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /admin/cutbackList

- Auth required: no
- Tags: CUTBACK
- Request params:
- partners_Id (query, optional)
- page (query, optional)
- status (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /admin/deleteCutback

- Auth required: no
- Tags: CUTBACK
- Request params:
- id (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /admin/editProfile

- Auth required: no
- Tags: ADMIN
- Request params:
- token (header, required)
- email (formData, required)
- firstname (formData, required)
- lastname (formData, required)
- address (formData, required)
- dob (formData, required)
- number (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, edit successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /admin/forgotPassword

- Auth required: no
- Tags: ADMIN
- Request params:
- email (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, otp send your email id.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /admin/login

- Auth required: no
- Tags: ADMIN
- Request params:
- email (formData, required)
- password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /admin/notificationApi

- Auth required: no
- Tags: PLANS
- Request params:
- partners_Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total CR  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /admin/planList

- Auth required: no
- Tags: PLANS
- Request params:
- adminId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, total CR  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /admin/removeCapsLimit

- Auth required: no
- Tags: ADMIN ADD LIMIT
- Request params:
- partners_Id (query, required)
- Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully delete.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /admin/resendOtp

- Auth required: no
- Tags: ADMIN
- Request params:
- email (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, otp send successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /admin/resetPassword

- Auth required: no
- Tags: ADMIN
- Request params:
- email (formData, required)
- otp (formData, required)
- newPassword (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, password reset successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /admin/updatePlan

- Auth required: no
- Tags: PLANS
- Request params:
- adminId (formData, required)
- planId (formData, required)
- planName (formData, required)
- price (formData, required)
- timePeriod (formData, required)
- conversion (formData, required)
- click (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, offer create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /admin/view

- Auth required: no
- Tags: SUB_ADMIN_MANAGEMENT
- Request params:
- adminId (query, required)
- partners_Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, user data view successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /impression/serchDataByManagerId

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /manager/addManager

- Auth required: no
- Tags: SUB_ADMIN
- Request params:
- partners_Id (formData, required)
- name (formData, required)
- email (formData, required)
- skypeId (formData, required)
- mobileNumber (formData, required)
- address (formData, required)
- managerRole (formData, required)
- password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, add category successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /manager/deleteManager

- Auth required: no
- Tags: SUB_ADMIN
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, manager delete  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /manager/login

- Auth required: no
- Tags: SUB_ADMIN
- Request params:
- email (formData, required)
- password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, Login successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/managerCommonList

- Auth required: no
- Tags: SUB_ADMIN
- Request params:
- partners_Id (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, manager list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/managerList

- Auth required: no
- Tags: SUB_ADMIN
- Request params:
- partners_Id (query, required)
- managerType (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, manager list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /manager/managerLoginById

- Auth required: no
- Tags: SUB_ADMIN
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, manager list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /manager/managerViewData

- Auth required: no
- Tags: SUB_ADMIN
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, manager list found successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /manager/updateMagager

- Auth required: no
- Tags: SUB_ADMIN
- Request params:
- partners_Id (query, required)
- managerId (query, required)
- name (formData, required)
- skypeId (formData, required)
- email (formData, required)
- mobileNumber (formData, required)
- address (formData, required)
- password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, manager details update successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /manager/uploadImage

- Auth required: no
- Tags: SUB_ADMIN
- Request params:
- partners_Id (formData, required)
- managerId (formData, required)
- image (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have upload successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /subAdmin/addIp

- Auth required: yes
- Tags: SUBADMIN
- Request params:
- partners_Id (formData, required)
- ipAddress (formData, optional)
- advertiserId (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have upload successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /subAdmin/changePassword

- Auth required: no
- Tags: SUBADMIN
- Request params:
- token (header, required)
- password (formData, required)
- newPassword (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully changePassword.
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /subAdmin/deleteIp

- Auth required: yes
- Tags: SUBADMIN
- Request params:
- partners_Id (query, required)
- advertiserId (query, optional)
- ipAddress (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have upload successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /subAdmin/editProfile

- Auth required: no
- Tags: SUBADMIN
- Request params:
- email (formData, required)
- name (formData, required)
- address (formData, required)
- mobileNumber (formData, required)
- skypeId (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully edit.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /subAdmin/forgotPassword

- Auth required: no
- Tags: SUBADMIN
- Request params:
- email (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully forgotPassword.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /subAdmin/forgotPasswordCommon

- Auth required: no
- Tags: SUBADMIN
- Request params:
- email (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully verifyOtp.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /subAdmin/ipList

- Auth required: yes
- Tags: SUBADMIN
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have upload successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /subAdmin/linkTester

- Auth required: no
- Tags: SUBADMIN
- Request params:
- url (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully resendotp.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /subAdmin/login

- Auth required: no
- Tags: SUBADMIN
- Request params:
- email (formData, required)
- password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /subAdmin/LoginPageImage

- Auth required: no
- Tags: SUBADMIN
- Request params:
- partners_Id (formData, required)
- loginPageImage (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have upload successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /subAdmin/resendOtp

- Auth required: no
- Tags: SUBADMIN
- Request params:
- email (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully resendotp.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /subAdmin/resetPassword

- Auth required: no
- Tags: SUBADMIN
- Request params:
- otp (formData, required)
- newPassword (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully  resetPassword.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /subAdmin/resetpasswordCommon

- Auth required: no
- Tags: SUBADMIN
- Request params:
- otp (formData, required)
- newPassword (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully forgotPassword.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /subAdmin/signup

- Auth required: no
- Tags: SUBADMIN
- Request params:
- planId (formData, required)
- email (formData, required)
- name (formData, required)
- domain (formData, required)
- address (formData, required)
- mobileNumber (formData, required)
- skypeId (formData, required)
- password (formData, required)
- confirm_password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully signup.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /subAdmin/singleLogin

- Auth required: no
- Tags: SUBADMIN
- Request params:
- partners_Id (formData, required)
- email (formData, required)
- password (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully login.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /subAdmin/uploadHeaderImage

- Auth required: yes
- Tags: SUBADMIN
- Request params:
- headerImage (formData, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have upload successfully.
- 500: Internal Server Error
- 501: Something went wrong!

### PUT /subAdmin/uploadImage

- Auth required: yes
- Tags: SUBADMIN
- Request params:
- image (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have uploaded successfully.
- 400: Bad Request
- 401: Unauthorized
- 500: Internal Server Error

### PUT /subAdmin/verifyOtp

- Auth required: no
- Tags: SUBADMIN
- Request params:
- otp (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully verifyOtp.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /subAdmin/viewData

- Auth required: yes
- Tags: SUBADMIN
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully viewData.
- 401: Unauthorized (invalid or missing token)
- 500: Internal Server Error
- 501: Something went wrong!

### GET /subAdmin/viewuserData

- Auth required: no
- Tags: SUBADMIN
- Request params:
- subdomain (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully viewData.
- 500: Internal Server Error
- 501: Something went wrong!

### POST /user/addCustomPayout

- Auth required: yes
- Tags: CUSTOM PAYOUT
- Request params:
- publisherId (formData, required)
- offerId (formData, required)
- eventId (formData, required)
- eventValue (formData, required)
- customPayout (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully signup.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /user/countrylist

- Auth required: no
- Tags: COUNTRY LIST
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, you have get country list  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### DELETE /user/deleteCustomPayout

- Auth required: yes
- Tags: CUSTOM PAYOUT
- Request params:
- id (query, required)
- eventId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully signup.
- 500: Internal Server Error
- 501: Something went wrong!

### GET /user/getCustomPayout

- Auth required: yes
- Tags: CUSTOM PAYOUT
- Request params:
- publisherId (query, required)
- offerId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, You have successfully signup.
- 500: Internal Server Error
- 501: Something went wrong!

## Notifications / Webhooks

Count: 1

### GET /impression/serchDataByAdvertiseId

- Auth required: no
- Tags: POSTBACK URL
- Request params:
- partners_Id (query, required)
- advertiserId (query, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, tevent data successfully .
- 500: Internal Server Error
- 501: Something went wrong!

## Settings / Config

Count: 5

### POST /category/addCategory

- Auth required: yes
- Tags: CATEGORY
- Request params:
- categoryName (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, add category successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /category/addTraffic

- Auth required: yes
- Tags: CATEGORY
- Request params:
- trafficName (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, add traffic successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### POST /category/addVertical

- Auth required: yes
- Tags: CATEGORY
- Request params:
- verticalName (formData, required)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, add vertical successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /category/categoryList

- Auth required: yes
- Tags: CATEGORY
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, add category successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /category/trafficList

- Auth required: yes
- Tags: CATEGORY
- Request params:
- none
- Response shape (from Swagger responses descriptions):
- 200: Thanks, vertical List successfully .
- 500: Internal Server Error
- 501: Something went wrong!

## Other / Unmapped

Count: 3

### GET /impression/imp

- Auth required: no
- Tags: Impression_LINK
- Request params:
- m (query, required)
- o (query, required)
- a (query, required)
- chooseOption (query, optional)
- landingPageId (query, optional)
- country (query, optional)
- state (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks, link create  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /impression/impressionList

- Auth required: no
- Tags: Impression_LINK
- Request params:
- partners_Id (query, required)
- page (query, optional)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,list found sucessfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

### GET /impression/totalImpression

- Auth required: no
- Tags: Impression_LINK
- Request params:
- partners_Id (query, required)
- startDate (query, optional)
- endDate (query, optional)
- Response shape (from Swagger responses descriptions):
- 200: Thanks,list found sucessfully  successfully .
- 500: Internal Server Error
- 501: Something went wrong!

