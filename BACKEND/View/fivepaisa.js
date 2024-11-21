const db = require('../App/Models');
const dbTest = db.dbTest;

async function createViewFivepaisa() {

  try {
    const views = await dbTest.listCollections({ name: 'fivepaisaView' }).toArray();

    if (views.length > 0) {
      return;
    } else {
      const currentDate = new Date();

      const pipeline = [
        {
          $match: {
            broker: "14",
            TradingStatus: 'on',
            $or: [
              { EndDate: { $gte: currentDate } },
              { EndDate: null }
            ]
          }
        },
        {
          $lookup: {
            from: 'client_services',
            localField: '_id',
            foreignField: 'user_id',
            as: 'client_services'
          }
        },
        {
          $unwind: '$client_services',
        },
        {
          $match: {
            'client_services.active_status': '1'
          }
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
          $unwind: '$service',
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
          $unwind: '$category',
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
          $unwind: '$strategys',
        },
        {
          $project: {
            "client_services": 1,
            'service.name': 1,
            'service.instrument_token': 1,
            'service.exch_seg': 1,
            "strategys.strategy_name": 1,
            "category.segment": 1,
            "service.zebu_token": 1,
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
            web_url: 1
          }
        },
        {
          $addFields: {
            postdata:
            {

              head: {
                key: "$api_key",
              },
              body: {
                ClientCode: "$client_code",

                Exchange: {
                  $cond: {
                    if: { $eq: ['$category.segment', 'C'] }, // Your condition here
                    then: 'N',
                    else: {
                      $cond: {
                        if: {
                          $or: [
                            { $eq: ['$category.segment', 'F'] },
                            { $eq: ['$category.segment', 'O'] },
                            { $eq: ['$category.segment', 'FO'] }
                          ]
                        },
                        then: 'N',
                        else: {

                          $cond: {
                            if: {
                              $or: [
                                { $eq: ['$category.segment', 'MF'] },
                                { $eq: ['$category.segment', 'MO'] }
                              ]
                            },
                            then: 'M',
                            else: {

                              $cond: {
                                if: {
                                  $or: [
                                    { $eq: ['$category.segment', 'CF'] },
                                    { $eq: ['$category.segment', 'CO'] }
                                  ]
                                },
                                then: 'N',

                                // all not exist condition 
                                else: "N"

                              }

                            }

                          }


                        }

                      }

                    }

                  }
                },


                ExchangeType: {
                  $cond: {
                    if: { $eq: ['$category.segment', 'C'] }, // Your condition here
                    then: 'C',
                    else: {
                      $cond: {
                        if: {
                          $or: [
                            { $eq: ['$category.segment', 'F'] },
                            { $eq: ['$category.segment', 'O'] },
                            { $eq: ['$category.segment', 'FO'] }
                          ]
                        },
                        then: 'D',
                        else: {

                          $cond: {
                            if: {
                              $or: [
                                { $eq: ['$category.segment', 'MF'] },
                                { $eq: ['$category.segment', 'MO'] }
                              ]
                            },
                            then: 'D',
                            else: {

                              $cond: {
                                if: {
                                  $or: [
                                    { $eq: ['$category.segment', 'CF'] },
                                    { $eq: ['$category.segment', 'CO'] }
                                  ]
                                },
                                then: 'U',

                                // all not exist condition 
                                else: "D"

                              }

                            }

                          }


                        }

                      }

                    }

                  }
                },



                Qty: "$client_services.quantity",
                Price: "0",
                OrderType: "Buy",

                ScripCode: {
                  $cond: {
                    if: {
                      $and:
                        [
                          { $eq: ['$category.segment', 'C'] },
                        ]
                    },
                    then: "$service.instrument_token",
                    else: ""

                  }
                },


                IsIntraday: {
                  $cond: {
                    if: {
                      $and:
                        [
                          { $eq: ['$client_services.product_type', '2'] },
                        ]
                    },
                    then: true,
                    else: false,

                  }
                },

                DisQty: 0,
                StopLossPrice: 0,
                IsStopLossOrder: false
              }

            }
          }
        }
      ];

      await dbTest.createCollection('fivepaisaView', { viewOn: 'users', pipeline });

      console.log('fivepaisaView View created successfully.');
      return
    }



  } catch (error) {
    return;
  } 
}

async function dropViewFivepaisa() {
  try {
    await dbTest.dropCollection('fivepaisaView');
    console.log('fivepaisaView View dropped successfully.');
  } catch (error) {
    return;
  } 
}


module.exports = { createViewFivepaisa,dropViewFivepaisa }

