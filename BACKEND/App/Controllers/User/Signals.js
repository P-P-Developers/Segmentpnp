"use strict";
const db = require('../../Models');
const Signals_modal = db.Signals
const client_services = db.client_services
const { formattedDateTime } = require('../../Helper/time.helper')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Cilents_service_stg = db.Cilents_service_stg;


class Signals {

    // GET ADMIN SIGNALS
    async GetUserTradeSignals(req, res) {
        try {
            const { user_id, type } = req.body;

            const objectId = new ObjectId(user_id);
            var currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            var endOfDay = new Date(currentDate);
            endOfDay.setHours(23, 59, 59, 999);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            var GetAllClientServices
            if (type == "Trade") {
                GetAllClientServices = await Signals_modal.find({ users_id: user_id, createdAt: {
                    $gte: today,
                    $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                }, }).sort({ createdAt: -1 });

                return res.send({ status: true, data: GetAllClientServices, msg: "Get Signals" })

            } else {
                // const result = await Cilents_service_stg.find({user_id}).toArray();
                
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
                        $unwind: '$service',
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
                        $unwind: '$service1',
                    },
                    {
                        $lookup: {
                            from: "categories",
                            localField: "service.categorie_id",
                            foreignField: "_id",
                            as: "categories",
                        },
                    },
                    { $unwind: '$categories' },
                    {
                        $lookup: {
                            from: "strategies",
                            localField: "strategy_id",
                            foreignField: "_id",
                            as: "strategys",
                        },
                    },
                    {
                        $unwind: '$strategys',
                    },
                    {
                        $lookup: {
                            from: "signals",
                            let: {
                                service_name: '$service1.name',
                                strategy_name: '$strategys.strategy_name',
                                currentDate: currentDate,
                                endOfDay: endOfDay,
                                segment: '$categories.segment',
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ['$symbol', '$$service_name'] },
                                                { $eq: ['$strategy', '$$strategy_name'] },
                                                { $eq: ['$segment', '$$segment'] },
                                                { $gte: ['$createdAt', '$$currentDate'] },
                                                { $lte: ['$createdAt', '$$endOfDay'] },
                                            ],
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        createdAt: -1 
                                    }
                                },
                            ],
                            as: 'signals',
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            allSignals: { $push: '$signals' },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            allSignals: 1,
                        },
                    },
                ];

                GetAllClientServices = await client_services.aggregate(pipeline);


                if (GetAllClientServices.length > 0 && GetAllClientServices[0].allSignals.flat().length > 0) {
                    const sortedAndFilteredArray = GetAllClientServices[0].allSignals
                        .flat()
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .reduce((distinct, item) => {
                            if (!distinct.some(signal => signal._id === item._id)) {
                                distinct.push(item);
                            }
                            return distinct;
                        }, []);
                
                    return res.send({ status: true, data: sortedAndFilteredArray, msg: "Get Signals" });
                } else {
                    return res.send({ status: false, data: [], msg: "Data Empty" });
                }
                
            }

        } catch (error) {
            console.log("Error Signals  error -", error);
        }
    }

}


module.exports = new Signals();