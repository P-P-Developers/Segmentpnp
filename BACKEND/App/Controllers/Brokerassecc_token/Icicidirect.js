const sha256 = require("sha256");
var axios = require("axios");
var dateTime = require("node-datetime");

("use strict");
const db = require("../../Models");
const panel_model = db.panel_model;
const User = db.user;
const user_logs = db.user_logs;
const BrokerResponse = db.BrokerResponse;
const Broker_information = db.Broker_information;
const live_price = db.live_price;

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const crypto = require("crypto");
const { logger, getIPAddress } = require("../../Helper/logger.helper");

class Icicidirect {
  // Get GetAccessToken ANGEL
  async GetAccessTokenIcicidirect(req, res) {
    try {
      var keystr = req.query.key;

      if (keystr != undefined) {
        var key = keystr.split("?apisession=")[0];

        var apisession = keystr.split("?apisession=")[1];

        var hosts = req.headers.host;

        var redirect = hosts.split(":")[0];
        var redirect_uri = "";
        if (redirect == "localhost") {
          redirect_uri = "http://localhost:3000";
        } else {
          redirect_uri = `https://${redirect}/`;
        }

        const Get_User = await User.find({ client_key: key });

        if (Get_User.length > 0) {
          let api_key = Get_User[0].api_key;
          let api_secret = Get_User[0].api_secret;

          var data = JSON.stringify({
            SessionToken: apisession,
            AppKey: api_key.trim(),
          });

          var config = {
            method: "get",
            url: "https://api.icicidirect.com/breezeapi/api/v1/customerdetails",
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };

          axios(config)
            .then(async function (response) {
              if (response.data.Status == 200) {
                var access_token = response.data.Success.session_token;

                let result = await User.findByIdAndUpdate(Get_User[0]._id, {
                  access_token: access_token,
                  TradingStatus: "on",
                });

                if (result != "") {
                  const user_login = new user_logs({
                    user_Id: Get_User[0]._id,
                    login_status: "Trading On",
                    role: Get_User[0].Role,
                    device: "WEB",
                    system_ip: getIPAddress(),
                  });
                  await user_login.save();
                  if (user_login) {
                    return res.redirect(redirect_uri);
                  }
                }

                return res.redirect(redirect_uri);
              } else {
                return res.send(redirect_uri);
              }
            })
            .catch(function (error) {
              return res.send(redirect_uri);
            });
        } else {
          return res.send(redirect_uri);
        }
      } else {
        return res.send(redirect_uri);
      }
    } catch (error) {
      console.log("Error Theme error-", error);
    }
  }

  // UPDATE ALL CLIENT BROKER RESPONSE
  async GetOrderFullInformationIcicidirect(req, res, user_info) {
    try {
      const { user_id } = req.body;

      if (!user_id) {
        return res.send({
          status: false,
          msg: "Please Fill All Feild",
          data: [],
        });
      }

      GetAllBrokerResponse(user_info, res);
    } catch (error) {
      console.log("Error Some Error In Order information get -", error);
      return res.send({
        status: false,
        msg: "error in Server side",
        data: error,
      });
    }
  }

  async SingleOrderFullInformationIcicidirect(
    req,
    res,
    user_info,
    broker_response_id,
    order_id
  ) {
    try {
      const { user_id } = req.body;
      if (!user_id) {
        return res.send({
          status: false,
          msg: "Please Fill All Feild",
          data: [],
        });
      }

      var data = JSON.stringify({
        exchange_code: "NFO",
        order_id: order_id,
      });

      var currentDateOrder = new Date().toISOString().split(".")[0] + '.000Z';
      let checksumcode = sha256(currentDateOrder +data + user_info[0].api_secret);
  
  
      let config = {
          method: 'get',
          url: 'https://api.icicidirect.com/breezeapi/api/v1/order',
        // url: 'https://api.icicidirect.com/breezeapi/api/v1/trades',

          headers: {
              'Content-Type': 'application/json',
              'X-Checksum': "token " + checksumcode,
              'X-Timestamp': currentDateOrder,
              'X-AppKey': user_info[0].api_key,
              'X-SessionToken': user_info[0].access_token,
          },
          data: data
      };
  

    //   console.log("config",config)


      axios(config)
        .then(async (response) => {
        //   console.log("response.data.data", response.data);

          if (response.data.Status == 200) {

              const result_order = response.data.Success[0]
              if (result_order != undefined) {

                  var reject_reason;
                  if (result_order.text) {
                      reject_reason = result_order.text;
                  } else {
                      reject_reason = '';
                  }

                  const message = (JSON.stringify(result_order));

                  let result = await BrokerResponse.findByIdAndUpdate(
                      { _id: broker_response_id },
                      {
                          order_view_date: message,
                          order_view_status: '1',
                          order_view_response: result_order.status,
                          reject_reason: reject_reason

                      },
                      { new: true }
                  )

                  return res.send({ status: true, msg: "broker response updated successfully" })

              } else {

                  const message = (JSON.stringify(result_order));

                  let result = await BrokerResponse.findByIdAndUpdate(
                      { _id: broker_response_id },
                      {
                          order_view_date: message,
                          order_view_status: '1',

                      },
                      { new: true }
                  )

                  return res.send({ status: false, msg: 'result order undefined', data: [] });

              }

          } else {
              return res.send({ status: false, msg: 'No data Available', data: [] });
          }
        })
        .catch(async (error) => {
          return res.send({ status: false, msg: "Order Api Err .", data: [] });
        });
    } catch (error) {
        console.log("Error Some Error In Order information get -", error);
      return res.send({
        status: false,
        msg: "error in Server side",
        data: error,
      });
    }
  }
}

const GetAllBrokerResponse = async (user_info, res) => {
  try {
    const objectId = new ObjectId(user_info[0]._id);
    var FindUserBrokerResponse = await BrokerResponse.find({
      user_id: objectId,
      order_view_status: "0",
    });

    if (FindUserBrokerResponse.length > 0) {
      FindUserBrokerResponse.forEach((data1) => {
        var dataGetOrder = {
          exchange_code: exchange_code,
          order_id: data1.order_id,
        };

        var currentDateGetOrder =
          new Date().toISOString().split(".")[0] + ".000Z";
        let checksumcodeForGetOrder = sha256(
          currentDateGetOrder +
            JSON.stringify(dataGetOrder) +
            user_info[0].api_secret
        );

        var config = {
          method: "get",
          url: "https://api.icicidirect.com/breezeapi/api/v1/order",
          headers: {
            "Content-Type": "application/json",
            "X-Checksum": "token " + checksumcodeForGetOrder,
            "X-Timestamp": currentDateGetOrder,
            "X-AppKey": user_info[0].api_key,
            "X-SessionToken": user_info[0].access_token,
          },
          data: dataGetOrder,
        };

        axios(config)
          .then(async (response) => {
            if (response.data.data.length > 0) {
              const result_order = response.data.data.find(
                (item2) => item2.orderid === data1.order_id
              );
              if (result_order != undefined) {
                var reject_reason;
                if (result_order.text) {
                  reject_reason = result_order.text;
                } else {
                  reject_reason = "";
                }

                const message = JSON.stringify(result_order);

                let result = await BrokerResponse.findByIdAndUpdate(
                  { _id: data1._id },
                  {
                    order_view_date: message,
                    order_view_status: "1",
                    order_view_response: result_order.status,
                    reject_reason: reject_reason,
                  },
                  { new: true }
                );
              } else {
                const message = JSON.stringify(result_order);

                let result = await BrokerResponse.findByIdAndUpdate(
                  { _id: data1._id },
                  {
                    order_view_date: message,
                    order_view_status: "1",
                  },
                  { new: true }
                );
              }
            } else {
            }
          })
          .catch(async (error) => {});
      });
      return res.send({
        status: true,
        msg: "broker response updated successfully",
      });
    } else {
      return res.send({ status: false, msg: "no user found" });
    }
  } catch (error) {
    console.log("Error in broker response in order Id".error);
  }
};

module.exports = new Icicidirect();
