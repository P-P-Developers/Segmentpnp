// Angel
db.createView("angelView", "users", [
  {
    $match: {
      broker: "12",
      TradingStatus: "on", // Condition from the user collection
      $or: [
        { EndDate: { $gte: new Date() } }, // EndDate is today or in the future
        { EndDate: null }, // EndDate is not set
      ],
    },
  },
  {
    $lookup: {
      from: "client_services",
      localField: "_id", // Field from the user collection to match
      foreignField: "user_id", // Field from the client_services collection to match
      as: "client_services",
    },
  },
  {
    $unwind: "$client_services",
  },

  {
    $match: {
      "client_services.active_status": "1",
    },
  },
  {
    $lookup: {
      from: "services",
      localField: "client_services.service_id",
      foreignField: "_id",
      as: "service",
    },
  },
  {
    $unwind: "$service",
  },
  {
    $lookup: {
      from: "services",
      localField: "service.name",
      foreignField: "instrumenttype",
      as: "service1",
    },
  },
  {
    $unwind: "$service1",
  },
  {
    $lookup: {
      from: "categories",
      localField: "service.categorie_id",
      foreignField: "_id",
      as: "category",
    },
  },
  {
    $unwind: "$category",
  },
  {
    $lookup: {
      from: "strategies",
      localField: "client_services.strategy_id",
      foreignField: "_id",
      as: "strategys",
    },
  },
  {
    $unwind: "$strategys",
  },
  {
    $project: {
      client_services: 1,
      "service.name": 1,
      "service.instrument_token": 1,
      "service.exch_seg": 1,
      "strategys.strategy_name": 1,
      "category.segment": 1,
      "service.zebu_token": 1,
      service1: 1,
      _id: 1,
      FullName: 1,
      UserName: 1,
      Email: 1,
      EndDate: 1,
      ActiveStatus: 1,
      TradingStatus: 1,
      access_token: 1,
      api_secret: 1,
      app_id: 1,
      client_code: 1,
      api_key: 1,
      app_key: 1,
      api_type: 1,
      demat_userid: 1,
      client_key: 1,
      web_url: 1,
      fund_value: 1,
    },
  },
  {
    $addFields: {
      postdata: {
        variety: "NORMAL",

        // trading symbol condition here
        tradingsymbol: {
          $cond: {
            if: {
              $and: [{ $eq: ["$category.segment", "C"] }],
            },
            then: "$service.zebu_token",
            else: "",
          },
        },

        // symbol token condition here
        symboltoken: {
          $cond: {
            if: {
              $and: [{ $eq: ["$category.segment", "C"] }],
            },
            then: "$service.instrument_token",
            else: "",
          },
        },

        // transaction Type
        transactiontype: "BUY",

        // exchange condition here
        exchange: {
          $cond: {
            if: { $eq: ["$category.segment", "C"] }, // Your condition here
            then: "NSE",
            else: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ["$category.segment", "F"] },
                    { $eq: ["$category.segment", "O"] },
                    { $eq: ["$category.segment", "FO"] },
                  ],
                },
                then: "NFO",
                else: {
                  $cond: {
                    if: {
                      $or: [
                        { $eq: ["$category.segment", "MF"] },
                        { $eq: ["$category.segment", "MO"] },
                      ],
                    },
                    then: "MCX",
                    else: {
                      $cond: {
                        if: {
                          $or: [
                            { $eq: ["$category.segment", "CF"] },
                            { $eq: ["$category.segment", "CO"] },
                          ],
                        },
                        then: "CDS",

                        // all not exist condition
                        else: "NFO",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        // ordertype code condition here
        ordertype: {
          $cond: {
            if: {
              $and: [{ $eq: ["$client_services.order_type", "1"] }],
            },
            then: "MARKET",
            else: {
              $cond: {
                if: {
                  $and: [{ $eq: ["$client_services.order_type", "2"] }],
                },
                then: "LIMIT",
                else: {
                  $cond: {
                    if: {
                      $and: [{ $eq: ["$client_services.order_type", "3"] }],
                    },
                    then: "STOPLOSS_LIMIT",
                    else: {
                      $cond: {
                        if: {
                          $and: [{ $eq: ["$client_services.order_type", "4"] }],
                        },
                        then: "STOPLOSS_MARKET",

                        //All condition exist
                        else: "MARKET",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        // product code condition here
        producttype: {
          $cond: {
            if: {
              $and: [
                { $eq: ["$client_services.product_type", "1"] },
                {
                  $or: [
                    { $eq: ["$category.segment", "F"] },
                    { $eq: ["$category.segment", "O"] },
                    { $eq: ["$category.segment", "FO"] },
                  ],
                },
              ],
            },
            then: "CARRYFORWARD",
            else: {
              $cond: {
                if: {
                  $and: [{ $eq: ["$client_services.product_type", "2"] }],
                },
                then: "INTRADAY",
                else: {
                  $cond: {
                    if: {
                      $and: [{ $eq: ["$client_services.product_type", "3"] }],
                    },
                    then: "BO",
                    else: {
                      $cond: {
                        if: {
                          $and: [
                            { $eq: ["$client_services.product_type", "4"] },
                          ],
                        },
                        then: "INTRADAY",
                        else: "DELIVERY",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        // Duration
        duration: "DAY",

        triggerprice: 0,
        price: 0,
        squareoff: 0,
        stoploss: 0,
        quantity: "$client_services.quantity",
        trailingStopLoss: "",
      },
    },
  },
]);

//Alce Blue
db.createView("aliceblueView", "users", [
  {
    $match: {
      broker: "2",
      TradingStatus: "on", // Condition from the user collection
      $or: [
        { EndDate: { $gte: new Date() } }, // EndDate is today or in the future
        { EndDate: null }, // EndDate is not set
      ],
    },
  },
  {
    $lookup: {
      from: "client_services",
      localField: "_id", // Field from the user collection to match
      foreignField: "user_id", // Field from the client_services collection to match
      as: "client_services",
    },
  },
  {
    $unwind: "$client_services",
  },
  {
    $match: {
      "client_services.active_status": "1",
    },
  },
  {
    $lookup: {
      from: "services",
      localField: "client_services.service_id",
      foreignField: "_id",
      as: "service",
    },
  },
  {
    $unwind: "$service",
  },
  {
    $lookup: {
      from: "services",
      localField: "service.name",
      foreignField: "instrumenttype",
      as: "service1",
    },
  },
  {
    $unwind: "$service1",
  },
  {
    $lookup: {
      from: "categories",
      localField: "service.categorie_id",
      foreignField: "_id",
      as: "category",
    },
  },
  {
    $unwind: "$category",
  },
  {
    $lookup: {
      from: "strategies",
      localField: "client_services.strategy_id",
      foreignField: "_id",
      as: "strategys",
    },
  },
  {
    $unwind: "$strategys",
  },
  {
    $project: {
      client_services: 1,
      "service.name": 1,
      "service.instrument_token": 1,
      "service.exch_seg": 1,
      "strategys.strategy_name": 1,
      "category.segment": 1,
      "service.zebu_token": 1,
      service1: 1,
      _id: 1,
      FullName: 1,
      UserName: 1,
      Email: 1,
      EndDate: 1,
      ActiveStatus: 1,
      TradingStatus: 1,
      access_token: 1,
      api_secret: 1,
      app_id: 1,
      client_code: 1,
      api_key: 1,
      app_key: 1,
      api_type: 1,
      demat_userid: 1,
      client_key: 1,
      web_url: 1,
      fund_value: 1,
    },
  },
  {
    $addFields: {
      postdata: {
        complexty: "REGULAR",
        discqty: "0",

        // exchange condition here
        exch: {
          $cond: {
            if: { $eq: ["$category.segment", "C"] }, // Your condition here
            then: "NSE",
            else: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ["$category.segment", "F"] },
                    { $eq: ["$category.segment", "O"] },
                    { $eq: ["$category.segment", "FO"] },
                  ],
                },
                then: "NFO",
                else: {
                  $cond: {
                    if: {
                      $or: [
                        { $eq: ["$category.segment", "MF"] },
                        { $eq: ["$category.segment", "MO"] },
                      ],
                    },
                    then: "MCX",
                    else: {
                      $cond: {
                        if: {
                          $or: [
                            { $eq: ["$category.segment", "CF"] },
                            { $eq: ["$category.segment", "CO"] },
                          ],
                        },
                        then: "CDS",

                        // all not exist condition
                        else: "NFO",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        // product code condition here
        pCode: {
          $cond: {
            if: {
              $and: [
                { $eq: ["$client_services.product_type", "1"] },
                {
                  $or: [
                    { $eq: ["$category.segment", "F"] },
                    { $eq: ["$category.segment", "O"] },
                    { $eq: ["$category.segment", "FO"] },
                  ],
                },
              ],
            },
            then: "NRML",
            else: {
              $cond: {
                if: {
                  $and: [{ $eq: ["$client_services.product_type", "2"] }],
                },
                then: "MIS",
                else: {
                  $cond: {
                    if: {
                      $and: [{ $eq: ["$client_services.product_type", "3"] }],
                    },
                    then: "BO",
                    else: {
                      $cond: {
                        if: {
                          $and: [
                            { $eq: ["$client_services.product_type", "4"] },
                          ],
                        },
                        then: "CO",
                        else: "CNC",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        // ordertype code condition here
        prctyp: {
          $cond: {
            if: {
              $and: [{ $eq: ["$client_services.order_type", "1"] }],
            },
            then: "MKT",
            else: {
              $cond: {
                if: {
                  $and: [{ $eq: ["$client_services.order_type", "2"] }],
                },
                then: "L",
                else: {
                  $cond: {
                    if: {
                      $and: [{ $eq: ["$client_services.order_type", "3"] }],
                    },
                    then: "SL",
                    else: {
                      $cond: {
                        if: {
                          $and: [{ $eq: ["$client_services.order_type", "4"] }],
                        },
                        then: "SL-M",

                        //All condition exist
                        else: "MKT",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        price: "0",
        // qty: "$client_services.quantity",

        qty: {
          $cond: {
            if: {
              $or: [
                { $eq: ["$category.segment", "MF"] },
                { $eq: ["$category.segment", "MO"] },
              ],
            },
            then: "$client_services.lot_size",
            else: "$client_services.quantity",
          },
        },

        ret: "DAY",

        // symbol id token condition here
        symbol_id: {
          $cond: {
            if: {
              $and: [{ $eq: ["$category.segment", "C"] }],
            },
            then: "$service.instrument_token",
            else: "",
          },
        },

        // trading symbol condition here
        trading_symbol: {
          $cond: {
            if: {
              $and: [{ $eq: ["$category.segment", "C"] }],
            },
            then: "$service.zebu_token",
            else: "",
          },
        },

        transtype: "BUY",
        trigPrice: "",
        orderTag: "order1",
      },
    },
  },
]);

//KotakNew
db.createView("kotakneoView", "users", [
  {
    $match: {
      broker: "7",
      TradingStatus: "on", // Condition from the user collection
      $or: [
        { EndDate: { $gte: new Date() } }, // EndDate is today or in the future
        { EndDate: null }, // EndDate is not set
      ],
    },
  },
  {
    $lookup: {
      from: "client_services",
      localField: "_id", // Field from the user collection to match
      foreignField: "user_id", // Field from the client_services collection to match
      as: "client_services",
    },
  },
  {
    $unwind: "$client_services",
  },
  {
    $match: {
      "client_services.active_status": "1",
    },
  },
  {
    $lookup: {
      from: "services",
      localField: "client_services.service_id",
      foreignField: "_id",
      as: "service",
    },
  },
  {
    $unwind: "$service",
  },
  {
    $lookup: {
      from: "services",
      localField: "service.name",
      foreignField: "instrumenttype",
      as: "service1",
    },
  },
  {
    $unwind: "$service1",
  },
  {
    $lookup: {
      from: "categories",
      localField: "service.categorie_id",
      foreignField: "_id",
      as: "category",
    },
  },
  {
    $unwind: "$category",
  },
  {
    $lookup: {
      from: "strategies",
      localField: "client_services.strategy_id",
      foreignField: "_id",
      as: "strategys",
    },
  },
  {
    $unwind: "$strategys",
  },
  {
    $project: {
      client_services: 1,
      "service.name": 1,
      "service.instrument_token": 1,
      "service.exch_seg": 1,
      "strategys.strategy_name": 1,
      "category.segment": 1,
      "service.zebu_token": 1,
      service1: 1,
      _id: 1,
      FullName: 1,
      UserName: 1,
      Email: 1,
      EndDate: 1,
      ActiveStatus: 1,
      TradingStatus: 1,
      access_token: 1,
      api_secret: 1,
      app_id: 1,
      client_code: 1,
      api_key: 1,
      app_key: 1,
      api_type: 1,
      demat_userid: 1,
      client_key: 1,
      web_url: 1,
      kotakneo_sid: 1,
      kotakneo_auth: 1,
      kotakneo_userd: 1,
      hserverid: 1,
      oneTimeToken: 1,
      fund_value: 1,
    },
  },
  {
    $addFields: {
      postdata: {
        am: "NO",
        dq: "0",

        es: {
          $cond: {
            if: { $eq: ["$category.segment", "C"] }, // Your condition here
            then: "nse_cm",
            else: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ["$category.segment", "F"] },
                    { $eq: ["$category.segment", "O"] },
                    { $eq: ["$category.segment", "FO"] },
                  ],
                },
                then: "nse_fo",
                else: {
                  $cond: {
                    if: {
                      $or: [
                        { $eq: ["$category.segment", "MF"] },
                        { $eq: ["$category.segment", "MO"] },
                      ],
                    },
                    then: "mcx_fo",
                    else: {
                      $cond: {
                        if: {
                          $or: [
                            { $eq: ["$category.segment", "CF"] },
                            { $eq: ["$category.segment", "CO"] },
                          ],
                        },
                        then: "cde_fo",

                        // all not exist condition
                        else: "nse_fo",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        mp: "0",

        // product code condition here
        pc: {
          $cond: {
            if: {
              $and: [
                { $eq: ["$client_services.product_type", "1"] },
                {
                  $or: [
                    { $eq: ["$category.segment", "F"] },
                    { $eq: ["$category.segment", "O"] },
                    { $eq: ["$category.segment", "FO"] },
                  ],
                },
              ],
            },
            then: "NRML",
            else: {
              $cond: {
                if: {
                  $and: [{ $eq: ["$client_services.product_type", "2"] }],
                },
                then: "MIS",
                else: {
                  $cond: {
                    if: {
                      $and: [{ $eq: ["$client_services.product_type", "3"] }],
                    },
                    then: "BO",
                    else: {
                      $cond: {
                        if: {
                          $and: [
                            { $eq: ["$client_services.product_type", "4"] },
                          ],
                        },
                        then: "CO",
                        else: "CNC",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        pf: "N",

        pr: "0",

        pt: {
          $cond: {
            if: {
              $and: [{ $eq: ["$client_services.order_type", "1"] }],
            },
            then: "MKT",
            else: {
              $cond: {
                if: {
                  $and: [{ $eq: ["$client_services.order_type", "2"] }],
                },
                then: "L",
                else: {
                  $cond: {
                    if: {
                      $and: [{ $eq: ["$client_services.order_type", "3"] }],
                    },
                    then: "SL",
                    else: {
                      $cond: {
                        if: {
                          $and: [{ $eq: ["$client_services.order_type", "4"] }],
                        },
                        then: " SL-M",

                        //All condition exist
                        else: "MKT",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        qt: "$client_services.quantity",

        rt: "DAY",

        tp: "0",

        ts: {
          $cond: {
            if: {
              $and: [{ $eq: ["$category.segment", "C"] }],
            },
            then: "$service.zebu_token",
            else: "",
          },
        },

        tt: "B",
      },
    },
  },
]);



























// ==========================================================================================================================================================
// ==========================================================================================================================================================
// ==========================================================================================================================================================
// ==========================================================================================================================================================
  // db.createView("upstoxView", "users", [
  //   {
  //     $match: {
  //       broker: "19",
  //       TradingStatus: "on", // Condition from the user collection
  //       $or: [
  //         { EndDate: { $gte: new Date() } }, // EndDate is today or in the future
  //         { EndDate: null }, // EndDate is not set
  //       ],
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "client_services",
  //       localField: "_id", // Field from the user collection to match
  //       foreignField: "user_id", // Field from the client_services collection to match
  //       as: "client_services",
  //     },
  //   },
  //   {
  //     $unwind: "$client_services",
  //   },
  //   {
  //     $match: {
  //       "client_services.active_status": "1",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "services",
  //       localField: "client_services.service_id",
  //       foreignField: "_id",
  //       as: "service",
  //     },
  //   },
  //   {
  //     $unwind: "$service",
  //   },
  //   {
  //     $lookup: {
  //       from: "services",
  //       localField: "service.name",
  //       foreignField: "instrumenttype",
  //       as: "service1",
  //     },
  //   },
  //   {
  //     $unwind: "$service1",
  //   },
  //   {
  //     $lookup: {
  //       from: "categories",
  //       localField: "service.categorie_id",
  //       foreignField: "_id",
  //       as: "category",
  //     },
  //   },
  //   {
  //     $unwind: "$category",
  //   },
  //   {
  //     $lookup: {
  //       from: "strategies",
  //       localField: "client_services.strategy_id",
  //       foreignField: "_id",
  //       as: "strategys",
  //     },
  //   },
  //   {
  //     $unwind: "$strategys",
  //   },
  //   {
  //     $addFields: {
  //       cleanName: {
  //         $cond: {
  //           if: { $regexMatch: { input: "$service1.name", regex: /#/ } },
  //           then: { $arrayElemAt: [{ $split: ["$service1.name", "#"] }, 0] },
  //           else: "$service1.name",
  //         },
  //       },
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "option_chain_symbols",
  //       let: { cleanName: "$cleanName" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $or: [
  //                 { $eq: ["$symbol", "$$cleanName"] },
  //                 { $eq: ["$symbol", { $concat: ["NSE:", "$$cleanName"] }] },
  //               ],
  //             },
  //           },
  //         },
  //       ],
  //       as: "StockPrice",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$StockPrice",
  //       preserveNullAndEmptyArrays: true, // Optional: Set to false if you want to exclude non-matches
  //     },
  //   },
  //   {
  //     $addFields: {
  //       extractedPrice: {
  //         $cond: {
  //           if: { $regexMatch: { input: { $toString: "$StockPrice.price" }, regex: "\\." } }, // Check if the value contains a decimal point
  //           then: {
  //             $floor: { $toDouble: "$StockPrice.price" }, // Remove decimal part if present
  //           },
  //           else: {
  //             $add: [{ $toDouble: "$StockPrice.price" }, 1], // Add 1 if no decimal part
  //           },
  //         },
  //       },
  //     },
  //   },

  //   {
  //     $project: {
  //       client_services: 1,
  //       "service.name": 1,
  //       "service.instrument_token": 1,
  //       "service.exch_seg": 1,
  //       "strategys.strategy_name": 1,
  //       "category.segment": 1,
  //       "service.zebu_token": 1,
  //       "extractedPrice": 1,
  //       _id: 1,
  //       service1: 1,
  //       FullName: 1,
  //       UserName: 1,
  //       Email: 1,
  //       EndDate: 1,
  //       ActiveStatus: 1,
  //       TradingStatus: 1,
  //       access_token: 1,
  //       api_secret: 1,
  //       app_id: 1,
  //       client_code: 1,
  //       api_key: 1,
  //       app_key: 1,
  //       api_type: 1,
  //       demat_userid: 1,
  //       client_key: 1,
  //       web_url: 1,
  //       fund_value: 1,
  //       fund_type: 1,
  //     },
  //   },
  //   {
  //     $addFields: {
  //       postdata: {
  //         //quantity: "$client_services.quantity",
  //         // quantity: { "$toInt": "$client_services.quantity" },
  //         quantity: {
  //           $cond: {
  //             if: { $eq: ["$fund_type", "stock"] },
  //             then: "$client_services.quantity",
  //             else: {
  //               $cond: {
  //                 if: { $eq: ["$fund_type", "fund"] },
  //                 then: {
  //                   $floor: {
  //                     $divide: [
  //                       { $convert: { input: "$fund_value", to: "double", onError: 1, onNull: 1 } },
  //                       "$extractedPrice"
  //                     ], 
  //                   },
  //                 },
  //                 else: "$client_services.lot_size", 
  //               },
  //             },
  //           },
  //         },

  //         product: {
  //           $cond: {
  //             if: {
  //               $and: [
  //                 { $eq: ["$client_services.product_type", "1"] },
  //                 {
  //                   $or: [
  //                     { $eq: ["$category.segment", "F"] },
  //                     { $eq: ["$category.segment", "O"] },
  //                     { $eq: ["$category.segment", "FO"] },
  //                   ],
  //                 },
  //               ],
  //             },
  //             then: "D",
  //             else: {
  //               $cond: {
  //                 if: {
  //                   $and: [{ $eq: ["$client_services.product_type", "2"] }],
  //                 },
  //                 then: "I",
  //                 else: {
  //                   $cond: {
  //                     if: {
  //                       $and: [{ $eq: ["$client_services.product_type", "3"] }],
  //                     },
  //                     then: "BO",
  //                     else: {
  //                       $cond: {
  //                         if: {
  //                           $and: [
  //                             { $eq: ["$client_services.product_type", "4"] },
  //                           ],
  //                         },
  //                         then: "CO",
  //                         else: "D",
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },

  //         validity: "DAY",
  //         price: "0",

  //         // symbol id token condition here
  //         instrument_token: "",

  //         // ordertype code condition here
  //         order_type: {
  //           $cond: {
  //             if: {
  //               $and: [{ $eq: ["$client_services.order_type", "1"] }],
  //             },
  //             then: "MARKET",
  //             else: {
  //               $cond: {
  //                 if: {
  //                   $and: [{ $eq: ["$client_services.order_type", "2"] }],
  //                 },
  //                 then: "LIMIT",
  //                 else: {
  //                   $cond: {
  //                     if: {
  //                       $and: [{ $eq: ["$client_services.order_type", "3"] }],
  //                     },
  //                     then: "SL",
  //                     else: {
  //                       $cond: {
  //                         if: {
  //                           $and: [{ $eq: ["$client_services.order_type", "4"] }],
  //                         },
  //                         then: "SL-M",

  //                         //All condition exist
  //                         else: "MARKET",
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },

  //         transaction_type: "BUY",

  //         disclosed_quantity: 0,

  //         trigger_price: 0,

  //         is_amo: false,
  //       },
  //     },
  //   },
  // ]);
