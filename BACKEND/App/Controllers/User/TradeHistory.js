"use strict";
const db = require("../../Models");
const MainSignals = db.MainSignals;
const client_services = db.client_services;
const { formattedDateTime } = require("../../Helper/time.helper");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class TradeHistory {
  // GET ADMIN SIGNALS
  async GetUserTradeHistory(req, res) {
    try {
      const {
        user_id,
        startDate,
        endDate,
        serviceIndex,
        selectStrategy,
        getType,
      } = req.body;

      const objectId = new ObjectId(user_id);
      var currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      var endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (getType === "Trade") {
        const GetAllClientServices = await MainSignals.find({
          users_id: user_id,
          createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
        }).sort({ createdAt: -1 });

        return;
      }

      let pipeline = [
        {
          $match: {
            user_id: objectId,
          },
        },
        {
          $lookup: {
            from: "services",
            localField: "service_id",
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
            as: "categories",
          },
        },
        { $unwind: "$categories" },
        {
          $lookup: {
            from: "strategies",
            localField: "strategy_id",
            foreignField: "_id",
            as: "strategys",
          },
        },
        {
          $unwind: "$strategys",
        },
        {
          $lookup: {
            from: "mainsignals",
            let: {
              service_name: "$service1.name",
              strategy_name: "$strategys.strategy_name",
              currentDate: currentDate,
              endOfDay: endOfDay,
              segment: "$categories.segment",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$symbol", "$$service_name"] },
                      { $eq: ["$strategy", "$$strategy_name"] },
                      { $eq: ["$segment", "$$segment"] },
                      { $gte: ["$createdAt", "$$currentDate"] },
                      { $lte: ["$createdAt", "$$endOfDay"] },
                    ],
                  },
                },
              },
              {
                $sort: {
                  createdAt: -1,
                },
              },
            ],
            as: "signals1",
          },
        },
        {
          $lookup: {
            from: "signals",
            localField: "signals1.signals_id",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $addFields: {
            result: {
              $map: {
                input: "$result",
                as: "signal",
                in: {
                  _id: "$$signal._id",
                  symbol: "$$signal.symbol",
                  type: "$$signal.type",
                  price: "$$signal.price",
                  exchange: "$$signal.exchange",
                  sq_value: "$$signal.sq_value",
                  qty_percent: {
                    $divide: [
                      { 
                        $multiply: [
                          { $toDouble: { $ifNull: ["$$signal.qty_percent", 1] } }, 
                          { $toDouble: { $ifNull: ["$$signal.lot_size", 1] } },  

                          { $toDouble: "$quantity" }
                        ]
                      },
                      100  
                    ]
                  },
                  

                  tsl: "$$signal.tsl",
                  tr_price: "$$signal.tr_price",
                  dt: "$$signal.dt",
                  dt_date: "$$signal.dt_date",
                  strategy: "$$signal.strategy",
                  option_type: "$$signal.option_type",
                  strike: "$$signal.strike",
                  expiry: "$$signal.expiry",
                  segment: "$$signal.segment",
                  trade_symbol: "$$signal.trade_symbol",
                  client_persnal_key: "$$signal.client_persnal_key",
                  TradeType: "$$signal.TradeType",
                  token: "$$signal.token",
                  lot_size: "$$signal.lot_size",
                  token: "$$signal.token",
                  MakeStartegyName: "$$signal.MakeStartegyName",
                  exit_status: "$$signal.exit_status",
                  ft_time: "$$signal.ft_time",
                  instrumenttype: "$$signal.instrumenttype",
                  users_id: "$$signal.users_id",
                  createdAt: "$$signal.createdAt",
                },
              },
            },
          },
        },

        {
          $project: {
            service_name: "$service.name",
            strategy_name: "$strategys.strategy_name",
            quantity: 1,
            processedSignals: {
              $map: {
                input: "$signals1",
                as: "signal",
                in: {
                  _id: "$$signal._id",
                  symbol: "$$signal.symbol",
                  entry_type: "$$signal.entry_type",
                  exit_type: "$$signal.exit_type",
                  entry_price: "$$signal.entry_price",
                  exit_price: "$$signal.exit_price",
                  entry_qty: {
                    $multiply: [
                      { $toDouble: { $ifNull: ["$$signal.entry_qty", 0] } },
                    { $toDouble: { $ifNull: ["$$signal.entry_qty", 0] } }, 
                     { $toDouble: { $ifNull: ["$$signal.lot_size", 1] } }

                    ],
                  },
                  exit_qty: {
                    $multiply: [
                      { $toDouble: { $ifNull: ["$$signal.exit_qty", 0] } },
                      { $toDouble: { $ifNull: ["$$signal.exit_qty", 0] } },
                     { $toDouble: { $ifNull: ["$$signal.lot_size", 1] } }

                    ],
                  },
                  entry_qty_percent: {
                    $divide: [
                      {
                        $multiply: [
                          {
                            $toDouble: {
                              $ifNull: [
                                {
                                  $cond: [
                                    { $eq: ["$$signal.entry_qty_percent", ""] },
                                    0,
                                    "$$signal.entry_qty_percent",
                                  ],
                                },
                                0,
                              ],
                            },
                          },
                          {
                            $toDouble: {
                              $ifNull: [
                                {
                                  $cond: [
                                    { $eq: ["$quantity", ""] },
                                    0,
                                    "$quantity",
                                  ],
                                },
                                0,
                              ],
                            },
                          },
                          {
                            $toDouble: {
                              $ifNull: [
                                {
                                  $cond: [
                                    { $eq: ["$$signal.lot_size", ""] },
                                    1,
                                    "$$signal.lot_size",
                                  ],
                                },
                                1,
                              ],
                            },
                          },
                        ],
                      },
                      100,
                    ],
                  },
                  exit_qty_percent: {
                    $divide: [
                      {
                        $multiply: [
                          {
                            $toDouble: {
                              $ifNull: [
                                {
                                  $cond: [
                                    { $eq: ["$$signal.exit_qty_percent", ""] },
                                    0,
                                    "$$signal.exit_qty_percent",
                                  ],
                                },
                                0,
                              ],
                            },
                          },
                          {
                            $toDouble: {
                              $ifNull: [
                                {
                                  $cond: [
                                    { $eq: ["$quantity", ""] },
                                    0,
                                    "$quantity",
                                  ],
                                },
                                0,
                              ],
                            },
                          },
                          {
                            $toDouble: {
                              $ifNull: [
                                {
                                  $cond: [
                                    { $eq: ["$$signal.lot_size", ""] },
                                    1,
                                    "$$signal.lot_size",
                                  ],
                                },
                                1,
                              ],
                            },
                          },
                        ],
                      },
                      100,
                    ],
                  },
                  entry_dt_date: "$$signal.entry_dt_date",
                  exit_dt_date: "$$signal.exit_dt_date",
                  exchange: "$$signal.exchange",
                  strategy: "$$signal.strategy",
                  option_type: "$$signal.option_type",
                  dt: "$$signal.dt",
                  dt_date: "$$signal.dt_date",
                  strike: "$$signal.strike",
                  expiry: "$$signal.expiry",
                  segment: "$$signal.segment",
                  trade_symbol: "$$signal.trade_symbol",
                  client_persnal_key: "$$signal.client_persnal_key",
                  TradeType: "$$signal.TradeType",
                  token: "$$signal.token",
                  lot_size: "$$signal.lot_size",
                  MakeStartegyName: "$$signal.MakeStartegyName",
                  target: "$$signal.target",
                  stop_loss: "$$signal.stop_loss",
                  exit_time: "$$signal.exit_time",
                  exit_time1: "$$signal.exit_time1",
                  sl_status: "$$signal.sl_status",
                  complete_trade: "$$signal.complete_trade",
                  exit_status: "$$signal.exit_status",
                  pendin_order_status: "$$signal.pendin_order_status",
                  modify_order_status: "$$signal.modify_order_status",
                  createdAt: "$$signal.createdAt",
                  signals_id: "$$signal.signals_id",
                  result: "$result",
                },
              },
            },
          },
        },
        {
          $match: {
            processedSignals: { $ne: [] }, 
          },
        },
        {
          $group: {
            _id: null,
            allProcessedSignals: { $push: "$processedSignals" }, 
          },
        },
        {
          $project: {
            _id: 0,
            allProcessedSignals: 1,
          },
        },
      ];

      const GetAllClientServices = await client_services.aggregate(pipeline);

      console.log(GetAllClientServices);
      if(GetAllClientServices.length === 0) {
        return res.send({ status: false, data: [], msg: "Data Empty" });
      }else if (GetAllClientServices[0]?.allProcessedSignals.flat().length > 0) {
        const sortedAndFilteredArray =
          GetAllClientServices[0].allProcessedSignals
            .flat()
            .sort((a, b) => b.createdAt - a.createdAt);


        var trade_symbols_filter =
          sortedAndFilteredArray.length > 0
            ? [
                ...new Set(
                  sortedAndFilteredArray.map((item) => item.trade_symbol)
                ),
              ]
            : [];

        return res.send({
          status: true,
          data: sortedAndFilteredArray,
          msg: "Get Signals",
          trade_symbols_filter: trade_symbols_filter,
        });
      } else {
        return res.send({ status: false, data: [], msg: "Data Empty" });
      }

      let abc = [];
      let abc1 = [];

      return;
      //   for (const item of GetAllClientServices) {
      //     const client_persnal_key1 =
      //       item.users.web_url === "2" ? item.users.client_key : "";

      //     // const serIndex = serviceIndex === "null" ? item.service.name : serviceIndex;
      //     const serIndex = item.service.name;

      //     const strategyset =
      //       selectStrategy === "null"
      //         ? item.strategys.strategy_name
      //         : selectStrategy;

      //     const MatchPipeline = {
      //       symbol: serIndex,
      //       createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      //       client_persnal_key: client_persnal_key1,
      //       segment: item.categories.segment,
      //     };

      //     if (getType !== "Trade") {
      //       MatchPipeline.strategy = strategyset;
      //     } else {
      //       MatchPipeline.$or = [{ Entry_users_id: objectId }];
      //     }

      //     try {
      //       const data = await MainSignals.aggregate([
      //         { $match: MatchPipeline },
      //         {
      //           $lookup: {
      //             from: "signals",
      //             localField: "signals_id",
      //             foreignField: "_id",
      //             as: "result",
      //           },
      //         },
      //         { $sort: { _id: -1 } },
      //       ]);

      //       console.log(data);

      //       if (data.length > 0) {
      //         data.map((item1) => {
      //           const findstg = GetAllClientServices.find(
      //             (data) =>
      //               data.service.name == item1.symbol &&
      //               data.strategys.strategy_name == item1.strategy
      //           );
      //           if (findstg) {
      //             item1.result.forEach((signal) => {
      //               signal.qty_percent =
      //                 findstg.quantity *
      //                 (Math.ceil(Number(signal.qty_percent) / 100) * 100) *
      //                 0.01;
      //             });

      //             item1.entry_qty_percent =
      //               findstg.quantity *
      //               (Math.ceil(Number(item1.entry_qty_percent) / 100) * 100) *
      //               0.01;
      //             item1.exit_qty_percent =
      //               findstg.quantity *
      //               (Math.ceil(Number(item1.exit_qty_percent) / 100) * 100) *
      //               0.01;
      //           }

      //           if (
      //             Array.isArray(item1.Exit_users_id) &&
      //             !item1.Exit_users_id.some((id) => id.equals(objectId)) &&
      //             getType === "Trade"
      //           ) {
      //             item1.exit_type = "";
      //             item1.exit_price = "";
      //             item1.exit_qty_percent = "";
      //             item1.exit_qty = "";
      //             item1.exit_dt_date = "";
      //           }
      //         });
      //         abc.push(data);
      //       }

      //       if (data.length > 0) {
      //         abc1.push(data);
      //       }
      //     } catch (error) {
      //       console.log("Error fetching data:", error);
      //     }
      //   }

      //   const groupedData = await MainSignals.aggregate([
      //     {
      //       $match: {
      //         createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      //         // client_persnal_key: client_persnal_key1,
      //       },
      //     },
      //     {
      //       $lookup: {
      //         from: "signals",
      //         localField: "signals_id",
      //         foreignField: "_id",
      //         as: "result",
      //       },
      //     },
      //     {
      //       $lookup: {
      //         from: "services",
      //         localField: "symbol",
      //         foreignField: "name",
      //         as: "result1",
      //       },
      //     },
      //     { $sort: { _id: -1 } },
      //     { $match: { $expr: { $gt: [{ $size: "$result" }, 0] } } },
      //     { $match: { $expr: { $gt: [{ $size: "$result1" }, 0] } } },
      //   ]);

      //   const trade_symbols_filter = Object.keys(
      //     groupedData.reduce((acc, curr) => {
      //       if (!acc[curr.trade_symbol]) {
      //         acc[curr.trade_symbol] = 1;
      //       } else {
      //         acc[curr.trade_symbol]++;
      //       }
      //       return acc;
      //     }, {})
      //   );

      //   if (abc1.length > 0) {
      //     const groupedDataStrategy = abc1.flat().reduce((acc, curr) => {
      //       if (!acc[curr.strategy]) {
      //         acc[curr.strategy] = 1;
      //       } else {
      //         acc[curr.strategy]++;
      //       }
      //       return acc;
      //     }, {});

      //     let unique = {};
      //     let distinct = [];
      //     abc.flat().forEach(function (x) {
      //       if (!unique[x._id]) {
      //         distinct.push(x);
      //         unique[x._id] = true;
      //       }
      //     });

      //     if (serviceIndex === "null") {
      //       const trade_strategy_filter = Object.keys(groupedDataStrategy);
      //       if (distinct.length > 0) {
      //         return res.send({
      //           status: true,
      //           data: distinct,
      //           msg: "Get Signals",
      //           trade_strategy_filter: trade_strategy_filter,
      //           trade_symbols_filter: trade_symbols_filter,
      //         });
      //       }
      //     } else {
      //       let SymbolData = distinct.filter(
      //         (data) => data.symbol === serviceIndex
      //       );

      //       const trade_strategy_filter = Object.keys(groupedDataStrategy);
      //       if (distinct.length > 0) {
      //         return res.send({
      //           status: true,
      //           data: SymbolData,
      //           msg: "Get Signals",
      //           trade_strategy_filter: trade_strategy_filter,
      //           trade_symbols_filter: trade_symbols_filter,
      //         });
      //       }
      //     }
      //   }

      //   return res.send({ status: false, data: [], msg: "Data Empty" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ status: false, msg: "Internal Server Error" });
    }
  }
}

module.exports = new TradeHistory();
