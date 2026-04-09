
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "swagger": "2.0",
    "info": {
      "title": "Tracking",
      "version": "1.0.0",
      "description": "Backend of Tracking Platform"
    },
    "host": "cl.repowire.com",
    "basePath": "/",
    "securityDefinitions": {
      "bearerAuth": {
        "type": "apiKey",
        "name": "Authorization",
        "in": "header",
        "description": "Enter JWT token as: Bearer <your_token>"
      }
    },
    "security": [
      {
        "bearerAuth": []
      }
    ],
    "paths": {
      "/publicher/addPublicher": {
        "post": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "addPublicher",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "companyName",
              "description": "companyName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "firstName",
              "description": "firstName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "lastName",
              "description": "lastName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "country",
              "description": "country required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "address",
              "description": "address required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "skypeId",
              "description": "skypeId required.",
              "in": "formData"
            },
            {
              "name": "telegramId",
              "description": "telegramId required.",
              "in": "formData"
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully signup."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/updatePublisher": {
        "put": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "updatePublisher",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "companyName",
              "description": "companyName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "firstName",
              "description": "firstName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "lastName",
              "description": "lastName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "skypeId",
              "description": "skypeId required.",
              "in": "formData"
            },
            {
              "name": "telegramId",
              "description": "telegramId required.",
              "in": "formData"
            },
            {
              "name": "country",
              "description": "country required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "address",
              "description": "address required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully signup."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/publisherList": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "publisherList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully list found."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/publisherLoginById": {
        "post": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "publisherLoginById",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/totalPublisherClick": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "total publisher click",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher click."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/totalPublisherConverion": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "total publisher conversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher conversion."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/totalPublisherPayout": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "total publisher Payout",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/publisherConversionList": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "publisherConversionList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/publisherClickList": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "publisherClickList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/publisherImpressionList": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "publisherImpressionList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/PublisherConversionRate": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "PublisherConversionRate",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/PublisherTotalImpression": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "PublisherTotalImpression",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/PublisherTotalEvent": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "PublisherTotalEvent",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/approveOfferForPublisher": {
        "put": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "approveOfferForPublisher",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  publisherconversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/publisherEventValueReport": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "approveOfferForPublisher",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  publisherconversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/sendOfferToPublisher": {
        "post": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "sendOfferToPublisher",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "note",
              "description": "note required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  publisherconversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/genreatePublisherKey": {
        "put": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "advertiserList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully list found."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/senndLoginDetails": {
        "post": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "senndLoginDetails",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  senndLoginDetails."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/publisherSerchDataByOfferId": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "publisherSerchDataByOfferId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/publisherSearchAllConversionData": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "publisherSearchAllConversionData",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "searchParam",
              "description": "searchParam required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/downloadDataInExcelSheetByPublisher": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "downloadDataInExcelSheetByPublisher",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "selectedParams",
              "description": "selectedParams required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/downloadDataInExcelSheetByPublisherId": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "downloadDataInExcelSheetByPublisherId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/downloadDataInExcelSheetByOfferId": {
        "get": {
          "tags": [
            "SUBADMIN ADD PUBLISHER"
          ],
          "description": "downloadDataInExcelSheetByOfferId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/pubInactive": {
        "put": {
          "tags": [
            "PUBLISHER_STATUS"
          ],
          "description": "pubInactive",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, lannding page update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/pubActive": {
        "put": {
          "tags": [
            "PUBLISHER_STATUS"
          ],
          "description": "pubActive",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, lannding page update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/login": {
        "post": {
          "tags": [
            "ADMIN"
          ],
          "description": "login",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/forgotPassword": {
        "put": {
          "tags": [
            "ADMIN"
          ],
          "description": "forgotPassword",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, otp send your email id."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/resendOtp": {
        "put": {
          "tags": [
            "ADMIN"
          ],
          "description": "resendOtp",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, otp send successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/resetPassword": {
        "put": {
          "tags": [
            "ADMIN"
          ],
          "description": "resetPassword",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "otp",
              "description": "otp required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "newPassword",
              "description": "newPassword required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_ required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, password reset successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/editProfile": {
        "put": {
          "tags": [
            "ADMIN"
          ],
          "description": "editProfile",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "token",
              "description": "token required.",
              "in": "header",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "firstname",
              "description": "firstname required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "lastname",
              "description": "lastname required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "address",
              "description": "address required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "dob",
              "description": "dob required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "number",
              "description": "number required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, edit successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/changePassword": {
        "put": {
          "tags": [
            "ADMIN"
          ],
          "description": "changePassword",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "token",
              "description": "token required.",
              "in": "header",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "newPassword",
              "description": "newPassword required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully changePassword."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/approvedAdvertiser": {
        "put": {
          "tags": [
            "ADVERTISER_MANAGEMENT"
          ],
          "description": "approvedAdvertiser",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "token",
              "description": "token required.",
              "in": "header",
              "required": true
            },
            {
              "name": "_id",
              "description": "_id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, user Delete successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/advertiserAsignList": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "advertiserAsignList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, publisher list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/viewAdvertiserData": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "viewAdvertiserData",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, publisher list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/advertiserClickList": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "advertiserClickList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, click list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/advertiserConversionList": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "advertiserConversionList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, conversion list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/advertiserTotalClick": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "advertiserTotalClick",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total click found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/advertiserTotalConversion": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "advertiserTotalConversion",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total converson found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/advertiserTotalPayout": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "advertiserTotalPayout",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total Payout  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/advertiserTotalRevenue": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "advertiserTotalRevenue",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total Revenue  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/advertiserdataExport": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "advertiserdataExport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, data export sucesfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/advertiserTotalEvent": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "advertiserTotalEvent",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total event sucesfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/advertiserImpList": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "advertiserImpList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total event sucesfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/advertiserTotalImression": {
        "get": {
          "tags": [
            "ADVERTISER_MANAGER"
          ],
          "description": "advertiserTotalImression",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total event sucesfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/addAdvertiser": {
        "post": {
          "tags": [
            "ADVERTISER"
          ],
          "description": "addAdvertiser",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData"
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "companyName",
              "description": "companyName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "firstName",
              "description": "firstName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "lastName",
              "description": "lastName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "country",
              "description": "country required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "region",
              "description": "region required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "street",
              "description": "street required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "city",
              "description": "city required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "pinCode",
              "description": "pinCode required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully add Advertiser."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/login": {
        "post": {
          "tags": [
            "ADVERTISER"
          ],
          "description": "login",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/advertiserList": {
        "get": {
          "tags": [
            "ADVERTISER"
          ],
          "description": "advertiserList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully list found."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/updateAdvertiser": {
        "put": {
          "tags": [
            "ADVERTISER"
          ],
          "description": "updateAdvertiser",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "companyName",
              "description": "companyName required.",
              "in": "formData"
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData"
            },
            {
              "name": "firstName",
              "description": "firstName required.",
              "in": "formData"
            },
            {
              "name": "lastName",
              "description": "lastName required.",
              "in": "formData"
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData"
            },
            {
              "name": "country",
              "description": "country required.",
              "in": "formData"
            },
            {
              "name": "region",
              "description": "region required.",
              "in": "formData"
            },
            {
              "name": "street",
              "description": "street required.",
              "in": "formData"
            },
            {
              "name": "city",
              "description": "city required.",
              "in": "formData"
            },
            {
              "name": "pinCode",
              "description": "pinCode required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully update Advertiser."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/advertiserView": {
        "get": {
          "tags": [
            "ADVERTISER"
          ],
          "description": "advertiserView",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully list found."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/genreateToken": {
        "put": {
          "tags": [
            "ADVERTISER"
          ],
          "description": "advertiserList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully list found."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/advertiserSignup": {
        "post": {
          "tags": [
            "ADVERTISER"
          ],
          "description": "advertiserSignup",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "firstName",
              "description": "firstName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "lastName",
              "description": "lastName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "companyName",
              "description": "companyName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "address",
              "description": "address required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully signup."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/advertiserUpdatePassword": {
        "put": {
          "tags": [
            "ADVERTISER"
          ],
          "description": "advertiserUpdatePassword",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "oldPassword",
              "description": "oldPassword required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "newPassword",
              "description": "newPassword required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully signup."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/totalAdvertiserClick": {
        "get": {
          "tags": [
            "ADVERTISER DASHBOARD"
          ],
          "description": "total advertiser click",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiser_id",
              "description": "advertiser_id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher click."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/totalAdvertiserConverion": {
        "get": {
          "tags": [
            "ADVERTISER DASHBOARD"
          ],
          "description": "total advertiser conversion",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher conversion."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/totalAdvertiserPayout": {
        "get": {
          "tags": [
            "ADVERTISER DASHBOARD"
          ],
          "description": "total publisher Payout",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/totalAdvertiserRevenue": {
        "get": {
          "tags": [
            "ADVERTISER DASHBOARD"
          ],
          "description": "total totalAdvertiserRevenue",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/advertiserConversionList": {
        "get": {
          "tags": [
            "ADVERTISER DASHBOARD"
          ],
          "description": "advertiserConversionList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/advertiserClickList": {
        "get": {
          "tags": [
            "ADVERTISER DASHBOARD"
          ],
          "description": "publisherClickList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiser_id",
              "description": "advertiser_id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/advertiserImpressionList": {
        "get": {
          "tags": [
            "ADVERTISER DASHBOARD"
          ],
          "description": "publisherImpressionList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiser_id",
              "description": "advertiser_id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/advertiserConversionRate": {
        "get": {
          "tags": [
            "ADVERTISER DASHBOARD"
          ],
          "description": "advertiserConversionRate",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/advertiserTotalImpression": {
        "get": {
          "tags": [
            "ADVERTISER DASHBOARD"
          ],
          "description": "advertiserTotalImpression",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiser_id",
              "description": "advertiser_id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/advertiser/advertiserTotalEvent": {
        "get": {
          "tags": [
            "ADVERTISER DASHBOARD"
          ],
          "description": "advertiserTotalEvent",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total publisher Payout."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/wallet/addAmount": {
        "put": {
          "tags": [
            "ADVERTISER_WALLET"
          ],
          "description": "addAmount",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData"
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully add Advertiser."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/wallet/advertiserViewWallet": {
        "get": {
          "tags": [
            "ADVERTISER_WALLET"
          ],
          "description": "advertiserViewWallet",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData"
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully add Advertiser."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherApproved/blockPublisher": {
        "post": {
          "tags": [
            "APPROVED & UNAPPROOVED PUBLISHER"
          ],
          "description": "blockPublisher",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  publisherconversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherApproved/unblockedPublisher": {
        "put": {
          "tags": [
            "APPROVED & UNAPPROOVED PUBLISHER"
          ],
          "description": "unblockedPublisher",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "Id",
              "description": "Id required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  unblockedPublisher."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherApproved/blockPublisherList": {
        "get": {
          "tags": [
            "APPROVED & UNAPPROOVED PUBLISHER"
          ],
          "description": "blockPublisherList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  unblockedPublisher."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/setClickLimit": {
        "post": {
          "tags": [
            "PARTNER_ADD_CLICKLIMIT"
          ],
          "description": "addClickLimit",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "clickLimit",
              "description": "clickLimit required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/updateClickLimit": {
        "put": {
          "tags": [
            "PARTNER_ADD_CLICKLIMIT"
          ],
          "description": "updateClickLimit",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData"
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData"
            },
            {
              "name": "clickLimit",
              "description": "clickLimit required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/deleteClickLimit": {
        "delete": {
          "tags": [
            "PARTNER_ADD_CLICKLIMIT"
          ],
          "description": "deleteClickLimit",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/capLimitList": {
        "get": {
          "tags": [
            "PARTNER_ADD_CLICKLIMIT"
          ],
          "description": "capLimitList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully delete."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/capLimitView": {
        "get": {
          "tags": [
            "PARTNER_ADD_CLICKLIMIT"
          ],
          "description": "capLimitView",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "id required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully delete."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/category/addCategory": {
        "post": {
          "tags": [
            "CATEGORY"
          ],
          "description": "addCategory",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "categoryName",
              "description": "categoryName required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, add category successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/category/categoryList": {
        "get": {
          "tags": [
            "CATEGORY"
          ],
          "description": "categoryList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, add category successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/category/addVertical": {
        "post": {
          "tags": [
            "CATEGORY"
          ],
          "description": "addVertical",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "verticalName",
              "description": "verticalName required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, add vertical successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/category/verticalList": {
        "get": {
          "tags": [
            "CATEGORY"
          ],
          "description": "verticalList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, vertical List successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/category/addTraffic": {
        "post": {
          "tags": [
            "CATEGORY"
          ],
          "description": "addTraffic",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "trafficName",
              "description": "trafficName required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, add traffic successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/category/trafficList": {
        "get": {
          "tags": [
            "CATEGORY"
          ],
          "description": "trafficList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, vertical List successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/contactUs/contact": {
        "post": {
          "tags": [
            "CONTACT"
          ],
          "description": "contact",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "name",
              "description": "name required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "company",
              "description": "company required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "address",
              "description": "address required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "planId",
              "description": "planId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "skypeId",
              "description": "skypeId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "domain",
              "description": "domain required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  publisherconversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/contactUs/messageList": {
        "get": {
          "tags": [
            "CONTACT"
          ],
          "description": "messageList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "adminId",
              "description": "adminId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  publisherconversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/contactUs/viewMessage": {
        "get": {
          "tags": [
            "CONTACT"
          ],
          "description": "viewMessage",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "adminId",
              "description": "adminId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "Id",
              "description": "Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  publisherconversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/postback": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "postback",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "m",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "click_id",
              "description": "click_id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "secure",
              "description": "secure required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        },
        "post": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "postback",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "m",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "click_id",
              "description": "click_id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "secure",
              "description": "secure required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/pixel": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "postback",
          "produces": [
            "image/gif"
          ],
          "parameters": [
            {
              "name": "m",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "click_id",
              "description": "click_id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "secure",
              "description": "secure required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/iframe": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "postback",
          "produces": [
            "text/html"
          ],
          "parameters": [
            {
              "name": "m",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "click_id",
              "description": "click_id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "secure",
              "description": "secure required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/totalConversion": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "totalConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/ConversionList": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "conversion list",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "searchBy",
              "description": "searchBy, offerid, publisherId, advertiserId, clickId  required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/postbackEvent": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "postbackEvent",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "click_id",
              "description": "click_id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/invalidClick": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "invalidClick",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/postbackLogs": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "postbackLogs",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/totalPayout": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "totalPayout",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total Payout  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/totalRevenue": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "totalRevenue",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total Revenue  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/conversionRate": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "conversionRate",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total CR  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/downloadDataInExcelSheetByPublisherId": {
        "get": {
          "tags": [
            "DOWNLOAD DATA IN EXCEL SHEET"
          ],
          "description": "downloadDataInExcelSheetByPublisherId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/downloadDataInExcelSheetByadvertiserId": {
        "get": {
          "tags": [
            "DOWNLOAD DATA IN EXCEL SHEET"
          ],
          "description": "downloadDataInExcelSheetByadvertiserId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/downloadDataInExcelSheetByOfferId": {
        "get": {
          "tags": [
            "DOWNLOAD DATA IN EXCEL SHEET"
          ],
          "description": "downloadDataInExcelSheetByOfferId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/totalEvent": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "totalEvent",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total CR  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/totalProfit": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "totalProfit",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/pendingConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "pendingConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "conversionId",
              "description": "pending conversion status required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/approvedConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "approvedConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "conversionId",
              "description": "approvedConversion status required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/DeclinedConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "DeclinedConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "conversionId",
              "description": "DeclinedConversionstatus required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/cancelConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "cancelConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "conversionId",
              "description": "cancelConversion status required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/DeclinedAllConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "DeclinedAllConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/approvedAllConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "approvedAllConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/pendingAllConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "pendingAllConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/cancelAllConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "cancelAllConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/DeclinedAllPublisherConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "DeclinedAllPublisherConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "DeclinedAllPublisherConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/approvedAllPublisherConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "approvedAllPublisherConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "approvedAllPublisherConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/pendingAllPublisherConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "pendingAllPublisherConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "pendingAllPublisherConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/cancelAllPublisherConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "cancelAllPublisherConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "cancelAllPublisherConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully"
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/cancelAllAdvertiserConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "cancelAllAdvertiserConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "advertiserId",
              "description": "cancelAllAdvertiserConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/pendingAllAdvertiserConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "pendingAllAdvertiserConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "advertiserId",
              "description": "pendingAllAdvertiserConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/approvedAllAdvertiserConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "approvedAllAdvertiserConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "advertiserId",
              "description": "approvedAllAdvertiserConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/DeclinedAllAdvertiserConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "DeclinedAllAdvertiserConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "advertiserId",
              "description": "DeclinedAllAdvertiserConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/cancelAllOfferConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "cancelAllOfferConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "cancelAllOfferConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/pendingAllOfferConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "pendingAllOfferConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "pendingAllOfferConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/approvedAllOfferConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "approvedAllOfferConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "approvedAllOfferConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/DeclinedAllOfferConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "DeclinedAllOfferConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "DeclinedAllOfferConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/cancelAllmanagerConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "cancelAllmanagerConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherManagerId",
              "description": "cancelAllmanagerConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/pendingAllmanagerConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "pendingAllmanagerConversion",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "publisherManagerId",
              "description": "pendingAllmanagerConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/approvedAllmanagerConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "approvedAllmanagerConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherManagerId",
              "description": "approvedAllmanagerConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/DeclinedAllmanagerConversion": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "DeclinedAllmanagerConversion",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherManagerId",
              "description": "DeclinedAllmanagerConversion required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/serchDataByOfferId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByOfferId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/serchDataByPublisherId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByPublisherId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/serchDataByAdvertiseId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByAdvertiseId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/serchDataByManagerId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByManagerId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/searchAllConversionData": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "searchAllConversionData",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "searchParam",
              "description": "searchParam required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/conversionCutOffApi": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "conversionCutOffApi",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "count",
              "description": "count required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/getConversionAccordingToDate": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "getConversionAccordingToDate",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/optimizationTools": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "optimizationTools",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "eventValue",
              "description": "eventValue required.",
              "in": "query",
              "required": true
            },
            {
              "name": "number",
              "description": "number required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/optimizationToolsList": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "optimizationToolsList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/downloadPixelLog": {
        "get": {
          "tags": [
            "DOWNLOAD DATA IN EXCEL SHEET"
          ],
          "description": "downloadPixelLog",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "selectedParams",
              "description": "selectedParams required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/invalidEventClick": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "invalidEventClick",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/removeoptmizationTool": {
        "put": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "removeoptmizationTool",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "optimizationdata",
              "description": "optimizationdata required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/downloadEventLogsByPartners": {
        "get": {
          "tags": [
            "DOWNLOAD DATA IN EXCEL SHEET"
          ],
          "description": "downloadEventLogsByPartners",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/deleteConversionData": {
        "delete": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "deletedata",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/deleteInvalidConversionData": {
        "delete": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "deletedata",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/conversion/deleteInvalidEventConversionData": {
        "delete": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "deletedata",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/user/countrylist": {
        "get": {
          "tags": [
            "COUNTRY LIST"
          ],
          "description": "countrylist",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Thanks, you have get country list  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/user/addCustomPayout": {
        "post": {
          "tags": [
            "CUSTOM PAYOUT"
          ],
          "description": "addCustomPayout",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "eventId",
              "description": "eventId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "eventValue",
              "description": "eventValue required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "customPayout",
              "description": "customPayout required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully signup."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/user/getCustomPayout": {
        "get": {
          "tags": [
            "CUSTOM PAYOUT"
          ],
          "description": "getCustomPayout",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully signup."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/user/deleteCustomPayout": {
        "delete": {
          "tags": [
            "CUSTOM PAYOUT"
          ],
          "description": "deleteCustomPayout",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "description": "id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "eventId",
              "description": "eventId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully signup."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/eventReport/publisherEventValueReport": {
        "get": {
          "tags": [
            "EVENTVALUE_REPORT"
          ],
          "description": "publisherEventValueReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  publisherconversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/eventReport/partnerEventValueReport": {
        "get": {
          "tags": [
            "EVENTVALUE_REPORT"
          ],
          "description": "partnerEventValueReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "searchBy",
              "description": "searchBy required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  partner conversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/eventReport/managerEventReport": {
        "get": {
          "tags": [
            "EVENTVALUE_REPORT"
          ],
          "description": "managerEventReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  publisherconversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/eventReport/searchPartnerReport": {
        "get": {
          "tags": [
            "EVENTVALUE_REPORT"
          ],
          "description": "searchPartnerReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query"
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  partner conversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/eventReport/advertiserManagerEventReport": {
        "get": {
          "tags": [
            "EVENTVALUE_REPORT"
          ],
          "description": "advertiserManagerEventReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  publisherconversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/eventReport/advertiserEventValueReport": {
        "get": {
          "tags": [
            "EVENTVALUE_REPORT"
          ],
          "description": "advertiserEventValueReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  publisherconversionRateData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/startExport": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "startExport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "selectedParams",
              "description": "selectedParams required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "searchBy",
              "description": "searchBy required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/ExportByPublisherId": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "ExportByPublisherId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "selectedParams",
              "description": "selectedParams required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "searchBy",
              "description": "searchBy required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/getExportStatus": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "getExportStatus",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "jobId",
              "description": "jobId required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/downloadFile": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "downloadFile",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "jobId",
              "description": "jobId required.",
              "in": "query"
            },
            {
              "name": "type",
              "description": "type required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/partnerExportList": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "partnerExportList",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/publisherExportList": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "publisherExportList",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/getExportPubStatus": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "getExportPubStatus",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "jobId",
              "description": "jobId required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/downloadFileByPub": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "downloadFileByPub",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "jobId",
              "description": "jobId required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/exportManagerReport": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "exportManagerReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "selectedParams",
              "description": "selectedParams required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "searchBy",
              "description": "searchBy required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/managerExportList": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "managerExportList",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/downloadFileByManager": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "downloadFileByManager",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "jobId",
              "description": "jobId required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/exportPixelLogs": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "exportPixelLogs",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "selectedParams",
              "description": "selectedParams required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "searchBy",
              "description": "searchBy required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/api/exportsentLogs": {
        "get": {
          "tags": [
            "EXPORT"
          ],
          "description": "exportsentLogs",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "selectedParams",
              "description": "selectedParams required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "searchBy",
              "description": "searchBy required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/getExternalOfferLst": {
        "get": {
          "tags": [
            "EXTERNAL_OFFER"
          ],
          "description": "addClickLimit",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/impression/imp": {
        "get": {
          "tags": [
            "Impression_LINK"
          ],
          "description": "imp",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "m",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "o",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "a",
              "description": "publicherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "chooseOption",
              "description": "chooseOption required.",
              "in": "query"
            },
            {
              "name": "landingPageId",
              "description": "landingPageId required.",
              "in": "query"
            },
            {
              "name": "country",
              "description": "geoAllowed required.",
              "in": "query"
            },
            {
              "name": "state",
              "description": "geoAllowed required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/impression/impressionList": {
        "get": {
          "tags": [
            "Impression_LINK"
          ],
          "description": "impressionList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,list found sucessfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/impression/totalImpression": {
        "get": {
          "tags": [
            "Impression_LINK"
          ],
          "description": "totalImpression",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,list found sucessfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/impression/serchDataByOfferId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByOfferId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/impression/serchDataByPublisherId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByPublisherId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/impression/serchDataByAdvertiseId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByAdvertiseId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/impression/serchDataByManagerId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByManagerId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/invoice/selectData": {
        "get": {
          "tags": [
            "INVOICE"
          ],
          "description": "selectData",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/invoice/createInvoice": {
        "get": {
          "tags": [
            "INVOICE"
          ],
          "description": "createInvoice",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "invoiceId",
              "description": "invoiceId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/invoice/partnerBilling": {
        "get": {
          "tags": [
            "INVOICE"
          ],
          "description": "partnerBilling",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerIds",
              "description": "offerIds required.",
              "in": "query",
              "required": true
            },
            {
              "name": "deduction",
              "description": "deduction required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/invoice/partnerBillinList": {
        "get": {
          "tags": [
            "INVOICE"
          ],
          "description": "partnerBillinList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/invoice/partnerBillinDetails": {
        "get": {
          "tags": [
            "INVOICE"
          ],
          "description": "partnerBillinDetails",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "invoiceId",
              "description": "invoiceId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/invoice/partnerBillingUpdate": {
        "put": {
          "tags": [
            "INVOICE"
          ],
          "description": "partnerBillingUpdate",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "invoiceId",
              "description": "invoiceId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerIds",
              "description": "offerIds required.",
              "in": "query",
              "required": true
            },
            {
              "name": "deduction",
              "description": "deduction required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/addClickLimit": {
        "post": {
          "tags": [
            "ADMIN ADD LIMIT"
          ],
          "description": "addClickLimit",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "adminId",
              "description": "adminId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "click",
              "description": "click required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/addConversionLimit": {
        "post": {
          "tags": [
            "ADMIN ADD LIMIT"
          ],
          "description": "addConversionLimit",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "conversion",
              "description": "conversion required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/addPublisherConversionLimit": {
        "post": {
          "tags": [
            "ADMIN ADD LIMIT"
          ],
          "description": "addPublisherConversionLimit",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "conversion",
              "description": "conversion required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/addAdvertiserConversionLimit": {
        "post": {
          "tags": [
            "ADMIN ADD LIMIT"
          ],
          "description": "addAdvertiserConversionLimit",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "conversion",
              "description": "conversion required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/removeCapsLimit": {
        "delete": {
          "tags": [
            "ADMIN ADD LIMIT"
          ],
          "description": "removeCapsLimit",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "Id",
              "description": "Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully delete."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/publisherCapsList": {
        "get": {
          "tags": [
            "ADMIN ADD LIMIT"
          ],
          "description": "publisherCapsList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully delete."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/publisherCutbackTool": {
        "post": {
          "tags": [
            "CUTBACK"
          ],
          "description": "publisherCutbackTool",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "conversionLimit",
              "description": "conversionLimit if type percent required.",
              "in": "formData"
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData"
            },
            {
              "name": "event_value",
              "description": "event_value required.",
              "in": "formData"
            },
            {
              "name": "type",
              "description": "type [\"ALTERNATE\", \"PERCENT\"] required.",
              "in": "formData"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "formData"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "formData"
            },
            {
              "name": "status",
              "description": "status default:\"ACTIVE\" required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/cutbackList": {
        "get": {
          "tags": [
            "CUTBACK"
          ],
          "description": "publisherCutbackTool",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query"
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "status",
              "description": "status required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/cutbackDetails": {
        "get": {
          "tags": [
            "CUTBACK"
          ],
          "description": "cutbackDetails",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "id required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/deleteCutback": {
        "delete": {
          "tags": [
            "CUTBACK"
          ],
          "description": "deleteCutback",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "id required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/AssignPublisherList": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "AssignPublisherList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, publisher list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/viewPublisherData": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "viewPublisherData",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, publisher list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/clickList": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "clickList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, click list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/conversionList": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "conversionList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, conversion list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/totalClick": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "totalClick",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total click found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/totalConversion": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "totalConversion",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total converson found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/totalPayout": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "totalPayout",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total Payout  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/totalRevenue": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "totalRevenue",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total Revenue  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/dataExport": {
        "get": {
          "tags": [
            "DOWNLOAD DATA IN EXCEL SHEET"
          ],
          "description": "dataExport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, data export sucesfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/totalEvent": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "totalEvent",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total event sucesfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/managerAddPublisher": {
        "post": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "managerAddPublisher",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "companyName",
              "description": "companyName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "firstName",
              "description": "firstName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "lastName",
              "description": "lastName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "country",
              "description": "country required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "region",
              "description": "region required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "street",
              "description": "street required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "city",
              "description": "city required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "pinCode",
              "description": "pinCode required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully signup."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/impList": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "impList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total event sucesfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/totalImression": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "totalImression",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,  total event sucesfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/totalProfit": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "totalProfit",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, data export sucesfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/managerSerchDataByOfferId": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "managerSerchDataByOfferId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/maangerSerchDataByPublisherId": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "maangerSerchDataByPublisherId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/managerSearchAllConversionData": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "managerSearchAllConversionData",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "searchParam",
              "description": "searchParam required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/downloadDataInExcelSheetByManager": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "downloadDataInExcelSheetByManager",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "selectedParams",
              "description": "selectedParams required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/downloadDataInExcelSheetByPublisherId": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "downloadDataInExcelSheetByPublisherId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/downloadDataInExcelSheetByOfferId": {
        "get": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "downloadDataInExcelSheetByOfferId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/addManager": {
        "post": {
          "tags": [
            "SUB_ADMIN"
          ],
          "description": "addManager",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "name",
              "description": "name required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "skypeId",
              "description": "skypeId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "address",
              "description": "address required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "managerRole",
              "description": "managerRole 1. Publisher Manager, 2.Advertiser Manager, 3. Account Manager required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, add category successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/login": {
        "post": {
          "tags": [
            "SUB_ADMIN"
          ],
          "description": "login",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, Login successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/updateMagager": {
        "put": {
          "tags": [
            "SUB_ADMIN"
          ],
          "description": "updateMagager",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "name",
              "description": "name required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "skypeId",
              "description": "skypeId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "address",
              "description": "address required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, manager details update successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/deleteManager": {
        "delete": {
          "tags": [
            "SUB_ADMIN"
          ],
          "description": "deleteManager",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, manager delete  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/managerList": {
        "get": {
          "tags": [
            "SUB_ADMIN"
          ],
          "description": "managerList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerType",
              "description": "managerType Advertiser Manager, Publisher Manager required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, manager list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/managerCommonList": {
        "get": {
          "tags": [
            "SUB_ADMIN"
          ],
          "description": "managerCommonList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, manager list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/managerLoginById": {
        "post": {
          "tags": [
            "SUB_ADMIN"
          ],
          "description": "managerLoginById",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, manager list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/uploadImage": {
        "put": {
          "tags": [
            "SUB_ADMIN"
          ],
          "description": "uploadImage",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "image",
              "description": "profileImage required.",
              "in": "formData",
              "format": "binary",
              "type": "file",
              "required": "ture"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have upload successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/managerViewData": {
        "get": {
          "tags": [
            "SUB_ADMIN"
          ],
          "description": "managerViewData",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, manager list found successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/offerInactive": {
        "put": {
          "tags": [
            "OfferManagement"
          ],
          "description": "offerInactive",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, lannding page update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/offerActive": {
        "put": {
          "tags": [
            "OfferManagement"
          ],
          "description": "offerActive",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, lannding page update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/createOffer": {
        "post": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "partners_Id",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "image",
              "description": "offerImage required.",
              "in": "formData",
              "format": "binary",
              "type": "file",
              "required": "ture"
            },
            {
              "name": "title",
              "description": "title required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId   required.",
              "in": "formData"
            },
            {
              "name": "advertiserId",
              "description": "advertiser Id  required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "privacyLavel",
              "description": "privacyLabel required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "description",
              "description": "description required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "category",
              "description": "category required.",
              "in": "formData",
              "type": "array",
              "items": {
                "type": "string"
              },
              "required": true
            },
            {
              "name": "traffic",
              "description": "traffic required.",
              "in": "formData",
              "type": "array",
              "items": {
                "type": "string"
              },
              "required": true
            },
            {
              "name": "incentive",
              "description": "incentive required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "eventType",
              "description": "eventType required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "eventValue",
              "description": "eventValue required.",
              "in": "formData"
            },
            {
              "name": "saleAmount",
              "description": "saleAmount required.",
              "in": "formData"
            },
            {
              "name": "currency",
              "description": "currency required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "revenue",
              "description": "revenue required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "payout",
              "description": "payout required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "eventName",
              "description": "eventName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "country_code",
              "description": "country_code required.",
              "in": "formData",
              "type": "array",
              "items": {
                "type": "string"
              },
              "required": true
            },
            {
              "name": "geoCountry",
              "description": "geoCountry required.",
              "in": "formData",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            {
              "name": "osAllowed",
              "description": "osAllowed required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "previewUrl",
              "description": "previewUrl required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "trackingUrl",
              "description": "trackingUrl required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "impressionUrl",
              "description": "impressionUrl required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "fallbackUrl",
              "description": "fallbackUrl required.",
              "in": "formData"
            },
            {
              "name": "packageName",
              "description": "packageName required.",
              "in": "formData"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "formData"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "formData"
            },
            {
              "name": "offerKpi",
              "description": "offerKpi required.",
              "in": "formData"
            },
            {
              "name": "isBlock",
              "description": "isBlock required.",
              "in": "formData"
            },
            {
              "name": "event_bit",
              "description": "event_bit required.",
              "in": "formData"
            },
            {
              "name": "redirectMode",
              "description": "redirectMode required.",
              "in": "formData"
            },
            {
              "name": "conversionTracking",
              "description": "conversionTracking required.",
              "in": "formData"
            },
            {
              "name": "conversionTrackingDomain",
              "description": "conversionTrackingDomain required.",
              "in": "formData"
            },
            {
              "name": "trackMultipleConversion",
              "description": "trackMultipleConversion required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/offerList": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "offerList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer list found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/publisherOfferList": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "publisherOfferList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query"
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query"
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer list found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/updateOffer": {
        "put": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "updateOffer",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "image",
              "description": "offerImage required.",
              "in": "formData",
              "format": "binary",
              "type": "file"
            },
            {
              "name": "title",
              "description": "title required.",
              "in": "formData"
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "formData"
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "formData"
            },
            {
              "name": "privacyLavel",
              "description": "privacyLabel required.",
              "in": "formData"
            },
            {
              "name": "description",
              "description": "description required.",
              "in": "formData"
            },
            {
              "name": "category",
              "description": "category required.",
              "in": "formData",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            {
              "name": "traffic",
              "description": "traffic required.",
              "in": "formData",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            {
              "name": "incentive",
              "description": "incentive required.",
              "in": "formData"
            },
            {
              "name": "packageName",
              "description": "packageName required.",
              "in": "formData"
            },
            {
              "name": "eventName",
              "description": "eventName required.",
              "in": "formData"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "formData"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "formData"
            },
            {
              "name": "offerKpi",
              "description": "offerKpi required.",
              "in": "formData"
            },
            {
              "name": "previewUrl",
              "description": "previewUrl required.",
              "in": "formData"
            },
            {
              "name": "isBlock",
              "description": "isBlock required.",
              "in": "formData"
            },
            {
              "name": "event_bit",
              "description": "event_bit required.",
              "in": "formData"
            },
            {
              "name": "osAllowed",
              "description": "osAllowed required.",
              "in": "formData"
            },
            {
              "name": "redirectMode",
              "description": "redirectMode required.",
              "in": "formData"
            },
            {
              "name": "conversionTracking",
              "description": "conversionTracking required.",
              "in": "formData"
            },
            {
              "name": "conversionTrackingDomain",
              "description": "conversionTrackingDomain required.",
              "in": "formData"
            },
            {
              "name": "trackMultipleConversion",
              "description": "trackMultipleConversion required.",
              "in": "formData"
            },
            {
              "name": "country_code",
              "description": "country_code required.",
              "in": "formData",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer update successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/deleteOffer": {
        "put": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "deleteOffer",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/viewOffer": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "viewOffer",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer view found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/addLandingPage": {
        "post": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "addLandingPage",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query"
            },
            {
              "name": "titleName",
              "description": "titleName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "trackingUrl",
              "description": "trackingUrl required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "impressionUrl",
              "description": "impressionUrl required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "geoCountry",
              "description": "geoCountry required.",
              "in": "formData",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, Landing page add  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/landingPageList": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "landingPageList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer view found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/updateLandingPage": {
        "put": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "updateLandingPage",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "formData"
            },
            {
              "name": "landingPageId",
              "description": "landingPageId required.",
              "in": "query"
            },
            {
              "name": "trackingUrl",
              "description": "trackingUrl required.",
              "in": "formData"
            },
            {
              "name": "impressionUrl",
              "description": "impressionUrl required.",
              "in": "formData"
            },
            {
              "name": "titleName",
              "description": "titleName required.",
              "in": "formData"
            },
            {
              "name": "geoCountry",
              "description": "geoCountry required.",
              "in": "formData",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, lannding page update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/updateImpressionLinlk": {
        "put": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "updateImpressionLinlk",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "landingPageId",
              "description": "landingPageId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "impressionUrl",
              "description": "impressionUrl required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, lannding page update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/addEventValue": {
        "post": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "addEventValue",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "formData"
            },
            {
              "name": "eventValue",
              "description": "eventValue required.",
              "in": "formData"
            },
            {
              "name": "eventName",
              "description": "eventName required.",
              "in": "formData"
            },
            {
              "name": "revenue",
              "description": "revenue required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "payout",
              "description": "payout required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "status",
              "description": "status required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "eventType",
              "description": "eventType required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer view found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/updateEventData": {
        "put": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "updateEventData",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "formData"
            },
            {
              "name": "eventId",
              "description": "eventId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "eventName",
              "description": "eventName required.",
              "in": "formData"
            },
            {
              "name": "eventValue",
              "description": "eventValue required.",
              "in": "formData"
            },
            {
              "name": "revenue",
              "description": "revenue required.",
              "in": "formData"
            },
            {
              "name": "payout",
              "description": "payout required.",
              "in": "formData"
            },
            {
              "name": "eventType",
              "description": "eventType required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer view found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/deleteEventData": {
        "delete": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "deleteEventData",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "eventId",
              "description": "eventId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, delete offer successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/eventList": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "eventList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,offer's event data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/landingPageDelete": {
        "delete": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "landingPageDelete",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query"
            },
            {
              "name": "landingPageId",
              "description": "landingPageId _id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, delete offer successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/eventValueList": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "eventValueList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,offer's eventvalue data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/searchOfferAPI": {
        "get": {
          "tags": [
            "SEARCH"
          ],
          "description": "searchOfferAPI",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "search",
              "description": "search required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, search data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/searchpublisherAPI": {
        "get": {
          "tags": [
            "SEARCH"
          ],
          "description": "searchpublisherAPI",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, search data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/searchPublisherSentLogAPI": {
        "get": {
          "tags": [
            "SEARCH"
          ],
          "description": "searchPublisherSentLogAPI",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "search",
              "description": "search required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, search data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/api": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "api",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "key",
              "description": "key required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, get offer successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/addCreatives": {
        "post": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "addCreatives",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "image",
              "description": "offerImage required.",
              "in": "formData",
              "format": "binary",
              "type": "file",
              "required": "ture"
            },
            {
              "name": "url",
              "description": "url required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/addCustomPayout": {
        "put": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "addCustomPayout",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "eventId",
              "description": "eventId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "customPayout",
              "description": "customPayout required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer view found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/fetchOfferApi": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "fetchOfferApi",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "url",
              "description": "query required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer view found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/getltsOffer": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "getltsOffer",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer list found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/geoTargeting": {
        "put": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "geoTargeting",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "landingPageId",
              "description": "landingPageId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "osAllowed",
              "description": "osAllowed required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, lannding page update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/allOfferList": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "allOfferList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer list found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/advertiserOfferList": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "advertiserOfferList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer list found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/advertiserOfferDetails": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "advertiserOfferDetails",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer list found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/updateOfferType": {
        "put": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "updateOfferType",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData"
            },
            {
              "name": "type",
              "description": "type required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer list found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/offer/advertiserManagerOfferList": {
        "get": {
          "tags": [
            "SUB-ADMIN"
          ],
          "description": "advertiserManagerOfferList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "advertiserManagerId",
              "description": "advertiserManagerId required.",
              "in": "query"
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer list found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/offerwall": {
        "post": {
          "tags": [
            "OFFERWALL"
          ],
          "description": "offerwall",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "payout",
              "description": "payout required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "trackingUrl",
              "description": "trackingUrl required.",
              "in": "formData"
            },
            {
              "name": "dPayout1",
              "description": "dPayout1 Id  required.",
              "in": "formData"
            },
            {
              "name": "dPayout2",
              "description": "dPayout2 required.",
              "in": "formData"
            },
            {
              "name": "dPayout3",
              "description": "dPayout4 required.",
              "in": "formData"
            },
            {
              "name": "dPayout5",
              "description": "dPayout5 required.",
              "in": "formData"
            },
            {
              "name": "dPayout6",
              "description": "dPayout6 required.",
              "in": "formData"
            },
            {
              "name": "dPayout7",
              "description": "dPayout7 required.",
              "in": "formData"
            },
            {
              "name": "dPayout8",
              "description": "dPayout8 required.",
              "in": "formData"
            },
            {
              "name": "dPayout9",
              "description": "dPayout9 required.",
              "in": "formData"
            },
            {
              "name": "dPayout10",
              "description": "dPayout10 required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/offerwallView": {
        "get": {
          "tags": [
            "OFFERWALL"
          ],
          "description": "offerwallView",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerwallId",
              "description": "offerwallId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/offerwalList": {
        "get": {
          "tags": [
            "OFFERWALL"
          ],
          "description": "offerwalList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/pub/createPubApp": {
        "post": {
          "tags": [
            "OFFERWALL"
          ],
          "description": "createPubApp",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "appName",
              "description": "appName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "siteUrl",
              "description": "siteUrl required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "callBackUrl",
              "description": "callBackUrl required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "payoutRatio",
              "description": "payoutRatio required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer view found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/pub/appList": {
        "get": {
          "tags": [
            "OFFERWALL"
          ],
          "description": "appList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer view found  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/addPlan": {
        "post": {
          "tags": [
            "PLANS"
          ],
          "description": "addPlan",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "adminId",
              "description": "adminId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "planName",
              "description": "planName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "price",
              "description": "price required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "timePeriod",
              "description": "timePeriod according Month, Year required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "conversion",
              "description": "conversion required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "click",
              "description": "click required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/updatePlan": {
        "put": {
          "tags": [
            "PLANS"
          ],
          "description": "updatePlan",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "adminId",
              "description": "adminId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "planId",
              "description": "planId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "planName",
              "description": "planName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "price",
              "description": "price required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "timePeriod",
              "description": "timePeriod according Month, Year required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "conversion",
              "description": "conversion required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "click",
              "description": "click required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, offer create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/notificationApi": {
        "get": {
          "tags": [
            "PLANS"
          ],
          "description": "notificationApi",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total CR  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/planList": {
        "get": {
          "tags": [
            "PLANS"
          ],
          "description": "planList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "adminId",
              "description": "adminId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, total CR  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/postbackMangement": {
        "post": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "postbackMangement",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query"
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData"
            },
            {
              "name": "level",
              "description": "level required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "type",
              "description": "type required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "postback",
              "description": "postback required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "event_value",
              "description": "event_value required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postbac create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/updatePostback": {
        "put": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "postbackMangement",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "postbackId",
              "description": "postbackId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData"
            },
            {
              "name": "level",
              "description": "level required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "type",
              "description": "type required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "postback",
              "description": "postback required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "status",
              "description": "status required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "conversionStatus",
              "description": "conversionStatus required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postbac update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/viewPostabck": {
        "get": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "postbackMangement",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "Id",
              "description": "Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postbac update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/deletePostback": {
        "delete": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "postbackMangement",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "postbackId",
              "description": "postbackId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postbac update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/postbackList": {
        "get": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "postbackMangement",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postback list successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/publisherPostbackList": {
        "get": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "publisherPostbackList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postback list successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/managerpostback": {
        "post": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "managerpostback",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData"
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData"
            },
            {
              "name": "level",
              "description": "level required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "type",
              "description": "type required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "postback",
              "description": "postback required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "event_value",
              "description": "event_value required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postbac create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/managerPostbackList": {
        "get": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "managerPostbackList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query"
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postbac update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/deletePublisherPostback": {
        "delete": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "deletePublisherPostback",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "postbackId",
              "description": "postbackId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postbac update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/managerUpdatePostback": {
        "put": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "managerUpdatePostback",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "postbackId",
              "description": "postbackId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData"
            },
            {
              "name": "level",
              "description": "level required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "type",
              "description": "type required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "postback",
              "description": "postback required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "status",
              "description": "status required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "conversionStatus",
              "description": "conversionStatus required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postbac update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/ManagerdeletePostback": {
        "delete": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "ManagerdeletePostback",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "postbackId",
              "description": "postbackId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postbac update  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisherManagement/managerPostbackView": {
        "get": {
          "tags": [
            "POSTBACK MANAGEMENT"
          ],
          "description": "managerPostbackView",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "Id",
              "description": "Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, postback view successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/manager/AprovedPublisher": {
        "put": {
          "tags": [
            "PUBLISHER_MANAGER_ROLE"
          ],
          "description": "AprovedPublisher",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "token",
              "description": "token required.",
              "in": "header",
              "required": true
            },
            {
              "name": "_id",
              "description": "_id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, user Delete successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/signup": {
        "post": {
          "tags": [
            "PUBLICHER"
          ],
          "description": "signup",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "firstName",
              "description": "firstName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "lastName",
              "description": "lastName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "companyName",
              "description": "companyName required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "address",
              "description": "address required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully signup."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/login": {
        "post": {
          "tags": [
            "PUBLICHER"
          ],
          "description": "login",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/verifyOtp": {
        "put": {
          "tags": [
            "PUBLICHER"
          ],
          "description": "verifyOtp",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "otp",
              "description": "otp required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully verifyOtp."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/resendOtp": {
        "put": {
          "tags": [
            "PUBLICHER"
          ],
          "description": "resendOtp",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully resendotp."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/forgotPassword": {
        "put": {
          "tags": [
            "PUBLICHER"
          ],
          "description": "forgotPassword",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully forgotPassword."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/resetPassword": {
        "put": {
          "tags": [
            "PUBLICHER"
          ],
          "description": "resetPassword",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "otp",
              "description": "otp required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "newPassword",
              "description": "newPassword required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully  resetPassword."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/changePassword": {
        "put": {
          "tags": [
            "PUBLICHER"
          ],
          "description": "changePassword",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "token",
              "description": "token required.",
              "in": "header",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "newPassword",
              "description": "newPassword required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully changePassword."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/editProfile": {
        "put": {
          "tags": [
            "PUBLICHER"
          ],
          "description": "editProfile",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "token",
              "description": "token required.",
              "in": "header",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "name",
              "description": "name required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "address",
              "description": "address required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully edit."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/viewData": {
        "get": {
          "tags": [
            "PUBLICHER"
          ],
          "description": "viewData",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "publicherId",
              "description": "publicherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully viewData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publicher/publicherList": {
        "get": {
          "tags": [
            "PUBLICHER"
          ],
          "description": "publicherList",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully get publisher list."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/sentLogs/sentLogList": {
        "get": {
          "tags": [
            "SENT LOG"
          ],
          "description": "sentLogList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/sentLogs/publisherPostbackApi": {
        "get": {
          "tags": [
            "SENT LOG"
          ],
          "description": "publisherPostbackApi",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/sentLogs/PublisherSentLogList": {
        "get": {
          "tags": [
            "SENT LOG"
          ],
          "description": "PublisherSentLogList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/sentLogs/downloadSentLogDataInExcelSheetByPartners_Id": {
        "get": {
          "tags": [
            "DOWNLOAD DATA IN EXCEL SHEET"
          ],
          "description": "downloadSentLogDataInExcelSheetByPartners_Id",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/sentLogs/serchDataByOfferId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByOfferId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/sentLogs/serchDataByPublisherId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByPublisherId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/sentLogs/serchDataByAdvertiseId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByAdvertiseId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/sentLogs/serchDataByManagerId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByManagerId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/sentLogs/PublisherManagerSentLogList": {
        "get": {
          "tags": [
            "SENT LOG"
          ],
          "description": "PublisherManagerSentLogList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/sentLogs/downloadSentLogDataInExcelSheetByOfferId": {
        "get": {
          "tags": [
            "DOWNLOAD DATA IN EXCEL SHEET"
          ],
          "description": "downloadSentLogDataInExcelSheetByOfferId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/sentLogs/downloadSentLogDataInExcelSheetByPublisherId": {
        "get": {
          "tags": [
            "DOWNLOAD DATA IN EXCEL SHEET"
          ],
          "description": "downloadSentLogDataInExcelSheetByPublisherId",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, download  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/report/offerReport": {
        "get": {
          "tags": [
            "REPORT"
          ],
          "description": "offerReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/report/advertiserManagerofferReport": {
        "get": {
          "tags": [
            "REPORT"
          ],
          "description": "advertiserManagerofferReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/report/advManageAdvertiserofferReport": {
        "get": {
          "tags": [
            "REPORT"
          ],
          "description": "advManageAdvertiserofferReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/report/publisherReport": {
        "get": {
          "tags": [
            "REPORT"
          ],
          "description": "publisherReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/report/advertiserReport": {
        "get": {
          "tags": [
            "REPORT"
          ],
          "description": "advertiserReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/report/publishersReport": {
        "get": {
          "tags": [
            "REPORT"
          ],
          "description": "publishersReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/report/publisherManagerReport": {
        "get": {
          "tags": [
            "REPORT"
          ],
          "description": "publisherManagerReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "publisherManagerId",
              "description": "publisherManagerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/report/AffilitesPerformanceReport": {
        "get": {
          "tags": [
            "REPORT"
          ],
          "description": "AffilitesPerformanceReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/report/advertiserPerformanceReport": {
        "get": {
          "tags": [
            "REPORT"
          ],
          "description": "advertiserPerformanceReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiser_id",
              "description": "advertiser_id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisher/requestOffer": {
        "post": {
          "tags": [
            "Request Offer"
          ],
          "description": "requestOffer",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "question",
              "description": "question required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisher/requestofferList": {
        "get": {
          "tags": [
            "Request Offer"
          ],
          "description": "requestofferList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "search",
              "description": "search required.",
              "in": "query"
            },
            {
              "name": "status",
              "description": "status required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisher/approoveOffer": {
        "put": {
          "tags": [
            "Request Offer"
          ],
          "description": "approoveOffer",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "requestOfferId",
              "description": "requestOfferId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "status",
              "description": "status , ACTIVE, REJECTrequired.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, aprooved successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/publisher/approoveOfferPublishers": {
        "put": {
          "tags": [
            "Request Offer"
          ],
          "description": "approoveOfferPublishers",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "publisherIds",
              "description": "publisherIds required.",
              "in": "formData",
              "type": "array",
              "items": {
                "type": "string"
              },
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "status",
              "description": "status , ACTIVE, REJECTrequired.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, aprooved successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/smartOffer/offerAdd": {
        "post": {
          "tags": [
            "SMART-OFFER"
          ],
          "description": "offerAdd",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "name",
              "description": "name required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "privacyLavel",
              "description": "privacyLavel required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, Landing page add  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/smartOffer/offer": {
        "put": {
          "tags": [
            "SMART-OFFER"
          ],
          "description": "offer",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "smartOfferId",
              "description": "smartOfferId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, Landing page add  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/smartOffer/publisher": {
        "put": {
          "tags": [
            "SMART-OFFER"
          ],
          "description": "publisher",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "smartOfferId",
              "description": "smartOfferId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, Landing page add  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/smart_link/clicks": {
        "get": {
          "tags": [
            "SMART-TRACKINGLINK"
          ],
          "description": "clicks",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "m",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "smart_offer",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "a",
              "description": "publicherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/partnersDetails": {
        "get": {
          "tags": [
            "SUB_ADMIN_MANAGEMENT"
          ],
          "description": "partnersDetails",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "adminId",
              "description": "adminId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, user data view successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/view": {
        "get": {
          "tags": [
            "SUB_ADMIN_MANAGEMENT"
          ],
          "description": "view",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "adminId",
              "description": "adminId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, user data view successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/block": {
        "put": {
          "tags": [
            "SUB_ADMIN_MANAGEMENT"
          ],
          "description": "block",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "adminId",
              "description": "adminId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "userId",
              "description": "userId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, user data view successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/AprovedSubAdmin": {
        "put": {
          "tags": [
            "SUB_ADMIN_MANAGEMENT"
          ],
          "description": "AprovedSubAdmin",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "adminId",
              "description": "adminId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "userId",
              "description": "userId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, user Delete successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/admin/partnersList": {
        "get": {
          "tags": [
            "SUB_ADMIN_MANAGEMENT"
          ],
          "description": "partnersList",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "adminId",
              "description": "adminId required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, user Delete successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/top/topOffer": {
        "get": {
          "tags": [
            "TOP-DATA"
          ],
          "description": "topOffer",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/top/topPublisher": {
        "get": {
          "tags": [
            "TOP-DATA"
          ],
          "description": "topPublisher",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/top/topAdvertiser": {
        "get": {
          "tags": [
            "TOP-DATA"
          ],
          "description": "topAdvertiser",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/top/topManager": {
        "get": {
          "tags": [
            "TOP-DATA"
          ],
          "description": "topManager",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/tracking/click": {
        "get": {
          "tags": [
            "TRACKING_LINK"
          ],
          "description": "click",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "m",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "o",
              "description": "offerId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "a",
              "description": "publicherId required.",
              "in": "query",
              "required": true
            },
            {
              "name": "link_id",
              "description": "landingPageId required.",
              "in": "query"
            },
            {
              "name": "force_transparent",
              "description": "force_transparent required.",
              "in": "query"
            },
            {
              "name": "url",
              "description": "url required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/tracking/totalClick": {
        "get": {
          "tags": [
            "TRACKING_LINK"
          ],
          "description": "totalClick",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, link create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/tracking/trackingList": {
        "get": {
          "tags": [
            "TRACKING_LINK"
          ],
          "description": "use this api for list of tracking data",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "page",
              "description": "page required.",
              "in": "query"
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks,list found sucessfully  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/tracking/GrossClick": {
        "get": {
          "tags": [
            "TRACKING_LINK"
          ],
          "description": "GrossClick",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/tracking/EarningPerClick": {
        "get": {
          "tags": [
            "TRACKING_LINK"
          ],
          "description": "EarningPerClick",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/tracking/uniqueClick": {
        "get": {
          "tags": [
            "TRACKING_LINK"
          ],
          "description": "uniqueClick",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/tracking/serchDataByOfferId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByOfferId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "offerId",
              "description": "offerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/tracking/serchDataByPublisherId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByPublisherId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/tracking/serchDataByAdvertiseId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByAdvertiseId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/tracking/serchDataByManagerId": {
        "get": {
          "tags": [
            "POSTBACK URL"
          ],
          "description": "serchDataByManagerId",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "managerId",
              "description": "managerId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, tevent data successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/tracking/deletedata": {
        "delete": {
          "tags": [
            "TRACKING_LINK"
          ],
          "description": "deletedata",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/signup": {
        "post": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "signup",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "planId",
              "description": "planId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "name",
              "description": "name required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "domain",
              "description": "domain required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "address",
              "description": "address required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "skypeId",
              "description": "skypeId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully signup."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/login": {
        "post": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "login",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/verifyOtp": {
        "put": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "verifyOtp",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "otp",
              "description": "otp required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully verifyOtp."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/resendOtp": {
        "put": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "resendOtp",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully resendotp."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/forgotPassword": {
        "put": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "forgotPassword",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully forgotPassword."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/resetPassword": {
        "put": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "resetPassword",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "otp",
              "description": "otp required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "newPassword",
              "description": "newPassword required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully  resetPassword."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/changePassword": {
        "put": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "changePassword",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "token",
              "description": "token required.",
              "in": "header",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "newPassword",
              "description": "newPassword required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully changePassword."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/editProfile": {
        "put": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "editProfile",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "name",
              "description": "name required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "address",
              "description": "address required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "mobileNumber",
              "description": "mobileNumber required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "skypeId",
              "description": "skypeId required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully edit."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/viewData": {
        "get": {
          "tags": [
            "SUBADMIN"
          ],
          "summary": "View Data",
          "description": "Fetch data for sub-admin",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully viewData."
            },
            "401": {
              "description": "Unauthorized (invalid or missing token)"
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/uploadImage": {
        "put": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "Upload a profile image",
          "produces": [
            "application/json"
          ],
          "consumes": [
            "multipart/form-data"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "image",
              "in": "formData",
              "description": "Profile image file",
              "required": true,
              "type": "file"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have uploaded successfully."
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/subAdmin/singleLogin": {
        "post": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "singleLogin",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "password",
              "description": "password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully login."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/uploadHeaderImage": {
        "put": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "uploadHeaderImage",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "headerImage",
              "description": "uploadHeaderImage required.",
              "in": "formData",
              "format": "binary",
              "type": "file",
              "required": "ture"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have upload successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/addIp": {
        "post": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "addIp",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "ipAddress",
              "description": "ipAddress required.",
              "in": "formData",
              "required": "ture"
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "formData",
              "required": "ture"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have upload successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/deleteIp": {
        "delete": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "deleteIp",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": "ture"
            },
            {
              "name": "ipAddress",
              "description": "ipAddress required.",
              "in": "formData",
              "required": "ture"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have upload successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/ipList": {
        "get": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "ipList",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "query",
              "required": true
            },
            {
              "name": "advertiserId",
              "description": "advertiserId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have upload successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/trackingTesting": {
        "get": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "trackingTesting",
          "produces": [
            "application/json"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "url",
              "description": "url required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully resendotp."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/viewuserData": {
        "get": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "viewuserData",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "subdomain",
              "description": "subdomain required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully viewData."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/conversionTestingTool": {
        "get": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "conversionTestingTool",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "url",
              "description": "url required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully resendotp."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/linkTester": {
        "get": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "linkTester",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "url",
              "description": "url required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully resendotp."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/forgotPasswordCommon": {
        "put": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "forgotPasswordCommon",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "email",
              "description": "email required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully verifyOtp."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/resetpasswordCommon": {
        "put": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "resetpasswordCommon",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "otp",
              "description": "otp required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "newPassword",
              "description": "newPassword required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "confirm_password",
              "description": "confirm_password required.",
              "in": "formData",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have successfully forgotPassword."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/subAdmin/LoginPageImage": {
        "put": {
          "tags": [
            "SUBADMIN"
          ],
          "description": "LoginPageImage",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "loginPageImage",
              "description": "loginPageImage required.",
              "in": "formData",
              "format": "binary",
              "type": "file",
              "required": "ture"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, You have upload successfully."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/createvalidation": {
        "post": {
          "tags": [
            "VALIDATION"
          ],
          "description": "createvalidation",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData",
              "required": "ture"
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId Id  required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "deductionNumber",
              "description": "deductionNumber required.",
              "in": "formData"
            },
            {
              "name": "deductionReason",
              "description": "deductionReason required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "validNumber",
              "description": "validNumber required.",
              "in": "formData"
            },
            {
              "name": "payoutUsd",
              "description": "payoutUsd required.",
              "in": "formData"
            },
            {
              "name": "finalAmountUsd",
              "description": "finalAmountUsd required.",
              "in": "formData"
            },
            {
              "name": "status",
              "description": "status required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/updateValidationReport": {
        "put": {
          "tags": [
            "VALIDATION"
          ],
          "description": "updateValidationReport",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "startDate",
              "description": "startDate required.",
              "in": "query"
            },
            {
              "name": "endDate",
              "description": "endDate required.",
              "in": "query"
            },
            {
              "name": "validationId",
              "description": "_id required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "partners_Id",
              "description": "partners_Id required.",
              "in": "formData"
            },
            {
              "name": "publisherId",
              "description": "publisherId required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "offerId",
              "description": "offerId Id  required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "deductionNumber",
              "description": "deductionNumber required.",
              "in": "formData"
            },
            {
              "name": "deductionReason",
              "description": "deductionReason required.",
              "in": "formData",
              "required": true
            },
            {
              "name": "validNumber",
              "description": "validNumber required.",
              "in": "formData"
            },
            {
              "name": "payoutUsd",
              "description": "payoutUsd required.",
              "in": "formData"
            },
            {
              "name": "finalAmountUsd",
              "description": "finalAmountUsd required.",
              "in": "formData"
            },
            {
              "name": "status",
              "description": "status required.",
              "in": "formData"
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/getValidationReports": {
        "get": {
          "tags": [
            "VALIDATION"
          ],
          "description": "getValidationReports",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Thanks, create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      },
      "/partner/getValidationDetails": {
        "get": {
          "tags": [
            "VALIDATION"
          ],
          "description": "getValidationDetails",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "_id",
              "description": "validationId required.",
              "in": "query",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Thanks, create  successfully ."
            },
            "500": {
              "description": "Internal Server Error"
            },
            "501": {
              "description": "Something went wrong!"
            }
          }
        }
      }
    },
    "definitions": {},
    "responses": {},
    "parameters": {},
    "tags": []
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}

