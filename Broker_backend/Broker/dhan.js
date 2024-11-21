var axios = require('axios');
var qs = require('qs');
var path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const db = require('../../BACKEND/App/Models');
const services = db.services;
const Alice_token = db.Alice_token;
const Signals = db.Signals;
const MainSignals = db.MainSignals;
const AliceViewModel = db.AliceViewModel;
const BrokerResponse = db.BrokerResponse;
var dateTime = require('node-datetime');

const place_order = async (AllClientData, signals, token, filePath, signal_req) => {

    console.log("DHANNNNN")


    try {

        var dt = signals.DTime;
        var input_symbol = signals.Symbol;
        var type = signals.TType.toUpperCase();
        var tr_price = signals.Tr_Price;
        var price = signals.Price;
        var sq_value = signals.Sq_Value;
        var sl_value = signals.Sl_Value;
        var tsl = signals.TSL;
        var segment = signals.Segment.toUpperCase();
        var segment1 = signals.Segment.toUpperCase();
        var strike = signals.Strike;
        var option_type = signals.OType;
        var expiry = signals.Expiry;
        var strategy = signals.Strategy;
        var qty_percent = signals.Quntity;
        var client_key = signals.Key;
        var demo = signals.Demo;


        if (token != 0) {

            if (type == 'LE' || type == 'SE') {


                if (segment.toUpperCase() != "C") {

                    const requestPromises = AllClientData.map(async (item) => {

                        item.postdata.securityId = token[0].instrument_token;

                        if (type == 'LE' || type == 'SX') {
                            item.postdata.transactionType = 'BUY';
                        } else if (type == 'SE' || type == 'LX') {
                            item.postdata.transactionType = 'SELL';
                        }

                        if (item.client_services.order_type == "2" || item.client_services.order_type == "3") {
                            item.postdata.price = price
                        }

                        EntryPlaceOrder(item, filePath, signals, signal_req);

                    });
                    // Send all requests concurrently using Promise.all
                    Promise.all(requestPromises)
                        .then(responses => {
                           
                        })
                        .catch(errors => {
                            console.log("errors:", errors);
                        });


                } else {


                    const requestPromises = AllClientData.map(async (item) => {

                        if (type == 'LE' || type == 'SX') {
                            item.postdata.transactionType = 'BUY';
                        } else if (type == 'SE' || type == 'LX') {
                            item.postdata.transactionType = 'SELL';
                        }

                        if (item.client_services.order_type == "2" || item.client_services.order_type == "3") {
                            item.postdata.price = price
                        }

                        EntryPlaceOrder(item, filePath, signals, signal_req);

                    });
                   
                    Promise.all(requestPromises)
                        .then(responses => {})
                        .catch(errors => {
                            console.log("errors:", errors);
                        });


                }

            }

            else if (type == 'SX' || type == 'LX') {
                console.log("trade exit")

                const requestPromises = AllClientData.map(async (item) => {

                    if (segment.toUpperCase() != "C") {
                        item.postdata.securityId = token[0].instrument_token;
                    }


                    if (type == 'LE' || type == 'SX') {
                        item.postdata.transactionType = 'BUY';
                    } else if (type == 'SE' || type == 'LX') {
                        item.postdata.transactionType = 'SELL';
                    }

            

                    if (item.client_services.order_type == "2" || item.client_services.order_type == "3") {
                        item.postdata.price = price
                    }



                    var send_rr = Buffer.from(qs.stringify(item.postdata)).toString('base64');

                    var config = {
                        method: 'get',
                        url: 'https://api.dhan.co/positions',
                        headers: {
                            'access-token': item.access_token,
                            'Content-Type': 'application/json'
                        },
                    };
                    axios(config)
                        .then(async (response) => {
                       

                            if (Array.isArray(response.data)) {

                                fs.appendFile(filePath, 'TIME ' + new Date() + ' DHAN POSITION DATA - ' + item.UserName + ' LENGTH = ' + JSON.stringify(response.data) + '\n', function (err) {
                                    if (err) {
                                        //  return console.log(err);
                                    }
                                });

                                const Exist_entry_order = response.data.find(item1 => item1.securityId === token[0].instrument_token);

                                if (Exist_entry_order != undefined) {

                                    const possition_qty = parseInt(Exist_entry_order.buyQty) - parseInt(Exist_entry_order.sellQty);
                                  
                                    if (possition_qty == 0) {
                                
                                        BrokerResponse.create({
                                            user_id: item._id,
                                            receive_signal: signal_req,
                                            strategy: strategy,
                                            type: type,
                                            symbol: input_symbol,
                                            order_status: "Entry Not Exist",
                                            reject_reason: "This Script position Empty ",
                                            broker_name: "DHAN",
                                            send_request: send_rr,
                                            open_possition_qty: possition_qty,

                                        })
                                            .then((BrokerResponseCreate) => { })
                                            .catch((err) => {
                                                try {
                                                    console.log('Error creating and saving user:', err);
                                                } catch (e) {
                                                    
                                                }

                                            });


                                    } else {

                                        if (possition_qty > 0 && type == 'LX') {
                                            ExitPlaceOrder(item, filePath, possition_qty, signals, signal_req)
                                        } else if (possition_qty < 0 && type == 'SX') {
                                            ExitPlaceOrder(item, filePath, possition_qty, signals, signal_req)
                                        }
                                    }



                                } else {

                                    BrokerResponse.create({
                                        user_id: item._id,
                                        receive_signal: signal_req,
                                        strategy: strategy,
                                        type: type,
                                        symbol: input_symbol,
                                        order_status: "Entry Not Exist",
                                        order_id: "",
                                        trading_symbol: "",
                                        broker_name: "DHAN",
                                        send_request: send_rr,
                                        reject_reason: "position Not Exist",

                                    })
                                        .then((BrokerResponseCreate) => {  })
                                        .catch((err) => {
                                            try {
                                                console.log('Error creating and saving user:', err);
                                            } catch (e) {
                                                
                                            }

                                        });

                                }


                            } else {

                                BrokerResponse.create({
                                    user_id: item._id,
                                    receive_signal: signal_req,
                                    strategy: strategy,
                                    type: type,
                                    symbol: input_symbol,
                                    order_status: "Entry Not Exist",
                                    order_id: "",
                                    trading_symbol: "",
                                    broker_name: "DHAN",
                                    send_request: send_rr,
                                    reject_reason: "All position Empty",

                                })
                                    .then((BrokerResponseCreate) => {
                                        
                                    })
                                    .catch((err) => {
                                        try {
                                            console.log('Error creating and saving user:', err);
                                        } catch (e) {
                                            
                                        }

                                    });

                            }




                        })
                        .catch(async (error) => {

                            fs.appendFile(filePath, 'TIME ' + new Date() + ' DHAN POSITION DATA ERROR CATCH - ' + item.UserName + ' ERROR - ' + JSON.stringify(error) + '\n', function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                            });

                            if (error) {
                                const message = (JSON.stringify(error.response.data)).replace(/["',]/g, '');
                                BrokerResponse.create({
                                    user_id: item._id,
                                    receive_signal: signal_req,
                                    strategy: strategy,
                                    type: type,
                                    symbol: input_symbol,
                                    order_status: "position request error",
                                    order_id: "",
                                    trading_symbol: "",
                                    broker_name: "DHAN",
                                    send_request: send_rr,
                                    reject_reason: message,

                                })
                                    .then((BrokerResponseCreate) => {
                                        
                                    })
                                    .catch((err) => {
                                        try {
                                            console.log('Error creating and saving user:', err);
                                        } catch (e) {
                                            
                                        }

                                    });
                            } else {
                                const message = (JSON.stringify(error)).replace(/["',]/g, '');

                                BrokerResponse.create({
                                    user_id: item._id,
                                    receive_signal: signal_req,
                                    strategy: strategy,
                                    type: type,
                                    symbol: input_symbol,
                                    order_status: "position request error",
                                    order_id: "",
                                    trading_symbol: "",
                                    broker_name: "DHAN",
                                    send_request: send_rr,
                                    reject_reason: message,

                                })
                                    .then((BrokerResponseCreate) => {
                                        
                                    })
                                    .catch((err) => {
                                        try {
                                            console.log('Error creating and saving user:', err);
                                        } catch (e) {
                                            
                                        }

                                    });


                            }
                        });











                });
                // Send all requests concurrently using Promise.all
                Promise.all(requestPromises)
                    .then(responses => {
                        

                    })
                    .catch(errors => {
                        console.log("errors:", errors);

                    });

            }


        } else {

            const requestPromises = AllClientData.map(async (item) => {

                BrokerResponse.create({
                    user_id: item._id,
                    receive_signal: signal_req,
                    strategy: strategy,
                    type: type,
                    symbol: input_symbol,
                    order_status: "",
                    order_id: "",
                    trading_symbol: "",
                    broker_name: "DHAN",
                    send_request: "",
                    reject_reason: "Token not received due to wrong trade",

                })
                    .then((BrokerResponseCreate) => {
                        
                    })
                    .catch((err) => {
                        try {
                            console.log('Error creating and saving user:', err);
                        } catch (e) {
                            
                        }

                    });

            });
            // Send all requests concurrently using Promise.all
            Promise.all(requestPromises)
                .then(responses => {
                   

                })
                .catch(errors => {
                    console.log("errors:", errors);

                });
        }

    } catch (error) {

        console.log("error", error);
    }

}

const EntryPlaceOrder = async (item, filePath, signals, signal_req) => {

    var dt = signals.DTime;
    var input_symbol = signals.Symbol;
    var type = signals.TType.toUpperCase();
    var tr_price = signals.Tr_Price;
    var price = signals.Price;
    var sq_value = signals.Sq_Value;
    var sl_value = signals.Sl_Value;
    var tsl = signals.TSL;
    var segment = signals.Segment.toUpperCase();
    var segment1 = signals.Segment.toUpperCase();
    var strike = signals.Strike;
    var option_type = signals.OType;
    var expiry = signals.Expiry;
    var strategy = signals.Strategy;
    var qty_percent = signals.Quntity;
    var client_key = signals.Key;
    var demo = signals.Demo;

    var send_rr = Buffer.from(qs.stringify(item.postdata)).toString('base64');


    fs.appendFile(filePath, 'TIME ' + new Date() + ' DHAN BEFORE PLACE ORDER USER ENTRY- ' + item.UserName + ' REQUEST -' + JSON.stringify(item.postdata) + '\n', function (err) {
        if (err) {
            return console.log(err);
        }
    });


    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.dhan.co/orders',
        headers: {
            'access-token': item.access_token,
            'Content-Type': 'application/json'
        },
        data: item.postdata

    };
    axios(config)
        .then(async (response) => {
            fs.appendFile(filePath, 'TIME ' + new Date() + ' DHAN AFTER PLACE ORDER USER ENTRY - ' + item.UserName + ' RESPONSE -' + JSON.stringify(response.data) + '\n', function (err) {
                if (err) {
                    return console.log(err);
                }
            });

            if (response.data.orderStatus != undefined) {

                BrokerResponse.create({
                    user_id: item._id,
                    receive_signal: signal_req,
                    strategy: strategy,
                    type: type,
                    symbol: input_symbol,
                    order_status: response.data.orderStatus,
                    order_id: response.data.orderId,
                    trading_symbol: "",
                    broker_name: "DHAN",
                    send_request: send_rr,


                })
                    .then((BrokerResponseCreate) => {
                        
                    })
                    .catch((err) => {
                        try {
                            console.log('Error creating and saving user:', err);
                        } catch (e) {
                            
                        }

                    });


            } else {

                const message = (JSON.stringify(response.data)).replace(/["',]/g, '');
                BrokerResponse.create({
                    user_id: item._id,
                    receive_signal: signal_req,
                    strategy: strategy,
                    type: type,
                    symbol: input_symbol,
                    order_status: 0,
                    order_id: "",
                    trading_symbol: "",
                    broker_name: "DHAN",
                    send_request: send_rr,
                    reject_reason: message,

                })
                    .then((BrokerResponseCreate) => {
                        
                    })
                    .catch((err) => {
                        try {
                            console.log('Error creating and saving user:', err);
                        } catch (e) {
                            
                        }

                    });

            }


        })
        .catch(async (error) => {
            console.log("error", error.response.data)
            fs.appendFile(filePath, 'TIME ' + new Date() + ' DHAN AFTER PLACE ORDER CATCH ENTRY - ' + item.UserName + error.response.data + JSON.stringify(error) + '\n', function (err) {
                if (err) {
                    return console.log(err);
                }
            });

            try {
                if (error) {
                    if (error.response) {
                        const message = (JSON.stringify(error.response.data)).replace(/["',]/g, '');

                        BrokerResponse.create({
                            user_id: item._id,
                            receive_signal: signal_req,
                            strategy: strategy,
                            type: type,
                            symbol: input_symbol,
                            order_status: "Error",
                            trading_symbol: "",
                            broker_name: "DHAN",
                            send_request: send_rr,
                            reject_reason: message,
                        })
                            .then((BrokerResponseCreate) => {})
                            .catch((err) => {
                                try {
                                    console.log('Error creating and saving user:', err);
                                } catch (e) {
                                    
                                }

                            });


                    } else {
                        const message = (JSON.stringify(error)).replace(/["',]/g, '');

                        BrokerResponse.create({
                            user_id: item._id,
                            receive_signal: signal_req,
                            strategy: strategy,
                            type: type,
                            symbol: input_symbol,
                            order_status: "Error",
                            trading_symbol: "",
                            broker_name: "DHAN",
                            send_request: send_rr,
                            reject_reason: message,
                        })
                            .then((BrokerResponseCreate) => { })
                            .catch((err) => {
                                try {
                                    console.log('Error creating and saving user:', err);
                                } catch (e) {
                                    
                                }

                            });


                    }
                }

            } catch (e) {
                console.log("error 1", e);
            }

        });



}

const ExitPlaceOrder = async (item, filePath, possition_qty, signals, signal_req) => {

    var dt = signals.DTime;
    var input_symbol = signals.Symbol;
    var type = signals.TType.toUpperCase();
    var tr_price = signals.Tr_Price;
    var price = signals.Price;
    var sq_value = signals.Sq_Value;
    var sl_value = signals.Sl_Value;
    var tsl = signals.TSL;
    var segment = signals.Segment.toUpperCase();
    var segment1 = signals.Segment.toUpperCase();
    var strike = signals.Strike;
    var option_type = signals.OType;
    var expiry = signals.Expiry;
    var strategy = signals.Strategy;
    var qty_percent = signals.Quntity;
    var client_key = signals.Key;
    var demo = signals.Demo;

    var send_rr = Buffer.from(qs.stringify(item.postdata)).toString('base64');

    fs.appendFile(filePath, 'TIME ' + new Date() + ' DHAN BEFORE PLACE ORDER USER EXIT- ' + item.UserName + ' REQUEST -' + JSON.stringify(item.postdata) + '\n', function (err) {
        if (err) {
            return console.log(err);
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.dhan.co/orders',
        headers: {
            'access-token': item.access_token,
            'Content-Type': 'application/json'
        },
        data: item.postdata

    };

    axios(config)
        .then(async (response) => {

            fs.appendFile(filePath, 'TIME ' + new Date() + ' DHAN AFTER PLACE ORDER USER EXIT- ' + item.UserName + ' RESPONSE -' + JSON.stringify(response.data) + '\n', function (err) {
                if (err) {
                    return console.log(err);
                }
            });



            if (response.data.orderStatus != undefined) {

                BrokerResponse.create({
                    user_id: item._id,
                    receive_signal: signal_req,
                    strategy: strategy,
                    type: type,
                    symbol: input_symbol,
                    order_status: response.data.orderStatus,
                    order_id: response.data.orderId,
                    trading_symbol: "",
                    broker_name: "DHAN",
                    send_request: send_rr,


                })
                    .then((BrokerResponseCreate) => {
                        
                    })
                    .catch((err) => {
                        try {
                            console.log('Error creating and saving user:', err);
                        } catch (e) {
                            
                        }

                    });


            } else {

                const message = (JSON.stringify(response.data)).replace(/["',]/g, '');
                BrokerResponse.create({
                    user_id: item._id,
                    receive_signal: signal_req,
                    strategy: strategy,
                    type: type,
                    symbol: input_symbol,
                    order_status: 0,
                    order_id: "",
                    trading_symbol: "",
                    broker_name: "DHAN",
                    send_request: send_rr,
                    reject_reason: message,

                })
                    .then((BrokerResponseCreate) => {
                        
                    })
                    .catch((err) => {
                        try {
                            console.log('Error creating and saving user:', err);
                        } catch (e) {
                            
                        }

                    });

            }


        })
        .catch(async (error) => {

            fs.appendFile(filePath, 'TIME ' + new Date() + ' DHAN AFTER PLACE ORDER USER EXIT CATCH- ' + item.UserName + ' RESPONSE -' + JSON.stringify(error) + '\n', function (err) {
                if (err) {
                    return console.log(err);
                }
            });

            try {

                if (error) {
                    if (error.response) {
                        const message = (JSON.stringify(error.response.data)).replace(/["',]/g, '');

                        BrokerResponse.create({
                            user_id: item._id,
                            receive_signal: signal_req,
                            strategy: strategy,
                            type: type,
                            symbol: input_symbol,
                            order_status: "Error",
                            trading_symbol: "",
                            broker_name: "DHAN",
                            send_request: send_rr,
                            reject_reason: message,
                        })
                            .then((BrokerResponseCreate) => {
                                
                            })
                            .catch((err) => {
                                try {
                                    console.log('Error creating and saving user:', err);
                                } catch (e) {
                                    
                                }

                            });


                    } else {
                        const message = (JSON.stringify(error)).replace(/["',]/g, '');

                        BrokerResponse.create({
                            user_id: item._id,
                            receive_signal: signal_req,
                            strategy: strategy,
                            type: type,
                            symbol: input_symbol,
                            order_status: "Error",
                            trading_symbol: "",
                            broker_name: "DHAN",
                            send_request: send_rr,
                            reject_reason: message,
                        })
                            .then((BrokerResponseCreate) => {
                                
                            })
                            .catch((err) => {
                                try {
                                    console.log('Error creating and saving user:', err);
                                } catch (e) {
                                    
                                }

                            });


                    }
                }

            } catch (e) {
                console.log("error 1", e);
            }

        });


}


module.exports = { place_order }
