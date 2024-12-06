/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Formikform from "../../../../Components/ExtraComponents/Form/Formik_form2";
import { useFormik } from "formik";
import * as valid_err from "../../../../Utils/Common_Messages";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Content from "../../../../Components/Dashboard/Content/Content1";
import {
  Get_All_Catagory,
  Service_By_Catagory,
} from "../../../../ReduxStore/Slice/Admin/AdminSlice";
import toast from "react-hot-toast";
import { Update_Service_By_Group_Id } from "../../../../ReduxStore/Slice/Admin/GroupServiceSlice";
import ToastButton from "../../../../Components/ExtraComponents/Alert_Toast";
import { Trash2 } from "lucide-react";
import { Get_Service_By_Group_Id_For_Edit_Update } from "../../../../ReduxStore/Slice/Admin/GroupServiceSlice";

const AddStrategy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const AdminToken = JSON.parse(localStorage.getItem("user_details")).token;
  const [SerachService, setSerachService] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [GetAllSgments, setGetAllSgments] = useState({
    loading: true,
    data: [],
  });
  const [allServices, setAllServices] = useState({ loading: true, data: [] });
  const [groupServiceInfo, setGroupServiceInfo] = useState({
    loading: true,
    data: [],
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectAllFiltered, setSelectAllFiltered] = useState(false);
  const [state, setstate] = useState([]);
  const [state1, setstate1] = useState([]);
  const [stockDiseble, setStockDiseble] = useState(false);

  const excludedKeywords = [
    "EQ",
    "OPTIDX",
    "OPTSTK",
    "FUTIDX",
    "FUTSTK",
    "OPTFUT",
    "FUTCOM",
    "OPTCUR",
    "FUTCUR",
    "BSE-CASH",
    "BSE-OPTIDX",
    "BSE-OPTSTK",
    "BSE-FUTIDX",
    "BSE-FUTSTK",
  ];

  const formik = useFormik({
    initialValues: {
      groupname: "",
      segment: false,
    },
    touched: {
      groupname: false,
      email: false,
    },
    validate: (values) => {
      const errors = {};
      if (!values.groupname && formik.touched.groupname) {
        errors.groupname = valid_err.EMPTY_GROUP_NAME_ERR;
      }
      return errors;
    },

    onSubmit: async (values) => {
      let checkValid = true;

      selectedServices &&
      selectedServices.forEach((item) => {
        if (item.lotsize !== 1) {
          if (item.group_qty % item.lotsize !== 0) {
            alert(`Please Enter Valid Lot Size Inside ${item.name}`);
            checkValid = false;
            return; // Exits current iteration
          }
        } else {

          item.default_status = 1;
        }
      });
    

      if (checkValid) {
        await dispatch(
          Update_Service_By_Group_Id({
            groupdetails: { name: values.groupname, id: id },
            services_id: selectedServices,
          })
        ).then((response) => {
          if (response.payload.status) {
            toast.success(response.payload.msg);
            setTimeout(() => {
              navigate("/admin/groupservices");
            }, 1000);
          } else {
            toast.error(response.payload.msg);
          }
        });
      }
    },
  });

  useEffect(() => {
    data2();
  }, [id]);

  useEffect(() => {
    getservice();
  }, []);

  useEffect(() => {
    if (groupServiceInfo.data[0] !== undefined) {
      formik.setFieldValue(
        "groupname",
        groupServiceInfo.data && groupServiceInfo.data[0].group_name
      );
    }
  }, [groupServiceInfo.data]);

  useEffect(() => {
    filterFunction();
  }, [SerachService]);

  const data2 = async () => {
    let arr = [];
    let arr1 = [];

    await dispatch(Get_Service_By_Group_Id_For_Edit_Update({ _id: id }))
      .unwrap()
      .then((response) => {
        if (response.status) {
          response.data &&
            response.data.Service_name_get.map((item1) => {
              response.data &&
                response.data.group_name.map((item) => {
                  arr.push({
                    group_name: item.name,
                    name: item1.ServiceResult.name,
                    instrumenttype: item1.ServiceResult.instrumenttype,

                    segment: item1.catagory.name,
                    segment_name: item1.catagory.segment,
                    group_qty: item1.group_qty,
                    id: item1._id,
                  });
                });
            });

          response.data &&
            response.data.Service_name_get.map((item1) => {
              response.data &&
                response.data.group_name.map((item) => {
                  arr1.push({
                    service_id: item1.ServiceResult._id,
                    name: item1.ServiceResult.name,
                    segment: item1.catagory.name,
                    group_qty: item1.group_qty,
                    lotsize: item1.ServiceResult.lotsize,
                    instrumenttype: item1.ServiceResult.instrumenttype,
                    product_type: item1.product_type,
                    default_status:1
                  });
                });
            });
          setSelectedServices(arr1);

          setGroupServiceInfo({
            loading: false,
            data: arr,
          });
        }
      });
  };

  function handleServiceChange(
    event,
    id,
    name,
    segment,
    lotsize,
    instrumenttype
  ) {
    const serviceId = id;
    const isChecked = event.target.checked;
    console.log(isChecked);
    if (isChecked) {
      // Add the selected service's information to the array
      setSelectedServices((prevInfo) => [
        ...prevInfo,
        {
          service_id: serviceId,
          name: name,
          segment: segment,
          group_qty: 0,
          lotsize: lotsize,
          product_type: instrumenttype == "OPTSTK" ? 1 : 2,
          default_status:1
        },
      ]);
    } else {
     
      setSelectedServices((prevInfo) =>
        prevInfo.filter((info) => info.service_id != serviceId)
      );
    }
  }

  const handleSelectAllFilteredChange = () => {
    setSelectAllFiltered((prevChecked) => !prevChecked);

    if (!selectAllFiltered) {
      const updatedServices = state.map((service) => ({
        service_id: service._id,
        name: service.name,
        segment: service.category.name,
        group_qty: 0,
        lotsize: service.lotsize,
        default_status:1
      }));

      state.forEach((service) => {
        const checkboxes = document.querySelectorAll(`#service-${service._id}`);
        checkboxes.forEach((checkbox) => {
          checkbox.checked = true;
        });
      });

      setSelectedServices((prevInfo) => [...prevInfo, ...updatedServices]);
    } else {
      const filteredServiceIds = state.map((service) => service._id);
      setSelectedServices((prevInfo) =>
        prevInfo.filter((info) => !filteredServiceIds.includes(info.service_id))
      );

      // Set all filtered checkboxes to unchecked
      state.forEach((service) => {
        const checkboxes = document.querySelectorAll(`#service-${service._id}`);
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      });
    }
  };

  const InputGroupQty = (event, id, servicename, segement, qty, lotsize) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");

    if (parseInt(event.target.value) < 0) {
      alert("no negetive allow");
      event.target.value = 0;
      return;
    } else {
      // if (parseInt(event.target.value) < 0) {

      const updatedQty = event.target.value === "" ? qty : numericValue;

      // Check if the selected service already exists in selectedServices
      const existingServiceIndex = selectedServices.findIndex(
        (item) => item.service_id === id
      );

      if (existingServiceIndex !== -1) {
        // Update quantity if the service already exists
        const updatedSelectedServices = [...selectedServices];
        updatedSelectedServices[existingServiceIndex].group_qty =
          parseInt(updatedQty);
        setSelectedServices(updatedSelectedServices);
      } else {
        // Add the new service to selectedServices
        setSelectedServices((prevServices) => [
          ...prevServices,
          {
            service_id: id,
            name: servicename,
            segment: segement,
            group_qty: parseInt(updatedQty),
            test: event.target.value,
          },
        ]);
      }
    }

    // }
    // else {
    //     alert("Negetive/Decimal/Character/Empty Field Not Allow")
    //     // event.target.value = ''
    //     return
    //     // }
    // }
  };

  const remoeveService = (id) => {
    if (window.confirm("Do you want to delete")) {
      let test = selectedServices.filter((item) => {
        return item.service_id !== id;
      });

      let checkboxes = document.querySelectorAll(`#service-${id}`);
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      setSelectedServices(test);
      
    }
  };

  const getservice = async () => {
    await dispatch(Get_All_Catagory())
      .unwrap()
      .then((response) => {
        if (response.status) {
          setGetAllSgments({
            loading: false,
            data: response.data,
          });
        }
      });
  };

  const fields = [
    {
      name: "groupname",
      label: "Group Name",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "segment",
      label: "Segment",
      type: "select",
      options:
        GetAllSgments.data &&
        GetAllSgments.data.map((item) => ({
          label: item.name,
          value: item.segment,
        })),
      label_size: 12,
      col_size: 6,
      disable: false,
    },
  ];

  const data = async () => {
    if (formik.values.segment) {
      await dispatch(Service_By_Catagory({ segment: formik.values.segment }))
        .unwrap()
        .then((response) => {
          if (response.status) {
            setAllServices({
              loading: false,
              data: response.data,
            });

            const filteredData1 = response.data.filter((item) => {
              if (item.category.segment == formik.values.segment) {
                return (
                  item.name == "EQ" ||
                  item.name.includes("OPTIDX") ||
                  item.name.includes("OPTSTK") ||
                  item.name.includes("FUTIDX") ||
                  item.name.includes("FUTSTK") ||
                  item.name.includes("OPTFUT") ||
                  item.name.includes("FUTCOM") ||
                  item.name.includes("OPTCUR") ||
                  item.name.includes("FUTCUR") ||
                  item.name.includes("BSE-CASH") ||
                  item.name.includes("BSE-OPTIDX") ||
                  item.name.includes("BSE-OPTSTK") ||
                  item.name.includes("BSE-FUTIDX") ||
                  item.name.includes("BSE-FUTSTK")
                );
              }
            });
        
            setstate1(filteredData1);
          }
        });
    }
  };

  const filterFunction = async () => {
    const filteredData = allServices.data.filter((item) => {
      return item.name.toLowerCase().includes(SerachService.toLowerCase());
    });

    if (SerachService === "") {
      setstate([]);
    } else {
      setstate(filteredData);
    }
   
  };

  const AddProductType = (id, e) => {
    setSelectedServices((prevServices) =>
      prevServices.map((service) =>
        service.service_id === id.service_id
          ? { ...service, product_type: e.target.value }
          : service
      )
    );
  };

  const FindStatus = (service) => {
    if (formik.values.segment == "C") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "CASH") {
            return item.segment == "CASH" && item.name != "EQ";
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "O") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "OPTION") {
            return (
              item.segment == "OPTION" &&
              item.name != "OPTIDX" &&
              item.name != "OPTSTK"
            );
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "F") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "FUTURE") {
            return (
              item.segment == "FUTURE" &&
              item.name != "FUTIDX" &&
              item.name != "FUTSTK"
            );
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "MF") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "MCX FUTURE") {
            return item.segment == "MCX FUTURE" && item.name != "FUTCOM";
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "MO") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "MCX OPTION") {
            return item.segment == "MCX OPTION" && item.name != "OPTFUT";
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "CO") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "CURRENCY OPTION") {
            return item.segment == "CURRENCY OPTION" && item.name != "OPTCUR";
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "CF") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "CURRENCY FUTURE") {
            return item.segment == "CURRENCY FUTURE" && item.name != "FUTCUR";
          }
        }).length > 0;
      return Status;
    }
  };

  const FindStatus1 = (service) => {
    if (formik.values.segment == "C") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "CASH") {
            return item.segment == "CASH" && item.name == "EQ";
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "O") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "OPTION") {
            if (item.name == "OPTIDX" && item.name == service.instrumenttype) {
              return true;
            } else if (
              item.name == "OPTSTK" &&
              item.name == service.instrumenttype
            ) {
              return true;
            }
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "F") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "FUTURE") {
            if (item.name == "FUTIDX" && item.name == service.instrumenttype) {
              return true;
            } else if (
              item.name == "FUTSTK" &&
              item.name == service.instrumenttype
            ) {
              return true;
            }
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "MF") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "MCX FUTURE") {
            return item.segment == "MCX FUTURE" && item.name == "FUTCOM";
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "MO") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "MCX OPTION") {
            return item.segment == "MCX OPTION" && item.name == "OPTFUT";
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "CO") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "CURRENCY OPTION") {
            return item.segment == "CURRENCY OPTION" && item.name == "OPTCUR";
          }
        }).length > 0;
      return Status;
    } else if (formik.values.segment == "CF") {
      var Status =
        selectedServices.filter((item) => {
          if (item.segment == "CURRENCY FUTURE") {
            return item.segment == "CURRENCY FUTURE" && item.name == "FUTCUR";
          }
        }).length > 0;
      return Status;
    }
  };

  useEffect(() => {
    setstate1([]);
    data();
    setSerachService("");
    setSelectAllFiltered(false);
  }, [formik.values.segment]);


  return (
    <>
      <Content
        Page_title="Edit Group"
        button_title="Back"
        route="/admin/groupservices"
        additional_field={
          <div style={{ overflowY: "scroll", height: "69vh" }}>
            <h4 className="text-center text-decoration-underline mb-3">
              Select Services And Quantity
            </h4>
            <table className="table table-responsive-sm col-md-4 ">
              <thead className="bg-primary">
                <tr>
                  <th>#</th>
                  <th>Segment</th>
                  <th>Service Name</th>
                  <th>lotsize</th>
                  <th>Lot </th>
                  <th>Product Type</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {selectedServices &&
                  selectedServices.map((item, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.segment}</td>
                          <td>{item.name}</td>
                          <td>{item.lotsize}</td>

                          <td>
                            <input
                              type="number"
                              className="form-control col-md-2"
                              placeholder="Enter Lot"
                              onChange={(e) =>
                                InputGroupQty(
                                  e,
                                  item.service_id,
                                  item.name,
                                  item.segment,
                                  item.group_qty,
                                  item.lotsize
                                )
                              }
                              min={0}
                              defaultValue={item.group_qty ? item.group_qty : 0}
                            />
                          </td>
                          <td
                            onClick={(e) => AddProductType(item, e)}
                            className="text-danger"
                          >
                            <select
                              className="form-select"
                              defaultValue={item.product_type}
                            >
                              <option value="" disabled>
                                Select Product Type
                              </option>
                              <option value="2">MIS</option>
                              <option value="1">CNC</option>
                              <option value="3">BO</option>
                              <option value="4">CO</option>
                            </select>
                          </td>

                          <td
                            onClick={() => remoeveService(item.service_id)}
                            className="text-danger"
                          >
                            <Trash2 />
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        }
      >
        <Formikform
          fieldtype={fields.filter(
            (field) => !field.showWhen || field.showWhen(formik.values)
          )}
          formik={formik}
          btn_name="Edit Group"
          title="addstrategy"
          additional_field={
            <>
              {formik.values.segment && (
                <div className="d-flex align-items-center">
                  <div className="col-11 me-3 flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for a service..."
                      onChange={(e) => setSerachService(e.target.value)}
                      value={SerachService || ""}
                      aria-label="Search Service"
                    />
                  </div>
                </div>
              )}

              <div
                className="col-lg-12"
                style={{ overflowY: "scroll", height: "50vh" }}
              >
                {state1 && state1.length > 0 && (
                  <div className="mb-3 row">
                    <div className="col-lg-12">
                      <div className="row mt-4">
                        <h5>Group</h5>
                        {state1.map((service) => (
                          <div key={service._id} className="col-md-4 mb-2">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`service-${service._id}`}
                                value={service._id}
                                disabled={FindStatus(service)}
                                checked={selectedServices.some(
                                  (item) => item.service_id == service._id
                                )}
                                onChange={(e) =>
                                  handleServiceChange(
                                    e,
                                    service._id,
                                    service.name,
                                    service.category.name,
                                    service.lotsize,
                                    service.instrumenttype
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`service-${service._id}`}
                              >
                                {service.name}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* {state.length > 0 && (
                  <div className="mb-3 row">
                    <div className="col-lg-12">
                      <div className="row mt-4">
                        {state
                          .filter(
                            (service) =>
                              !excludedKeywords.some((keyword) =>
                                service.name.includes(keyword)
                              )
                          )
                          .map((service) => (
                            <div key={service._id} className="col-md-4 mb-2">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`service-${service._id}`}
                                  value={service._id}
                                  checked={selectedServices.some(
                                    (item) => item.service_id == service._id
                                  )}
                                  disabled={FindStatus1(service)}
                                  onChange={(e) =>
                                    handleServiceChange(
                                      e,
                                      service._id,
                                      service.name,
                                      service.category.name,
                                      service.lotsize,
                                      service.instrumenttype
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`service-${service._id}`}
                                >
                                  {service.name}
                                </label>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </>
          }
        />
        <ToastButton />
      </Content>
    </>
  );
};

export default AddStrategy;
