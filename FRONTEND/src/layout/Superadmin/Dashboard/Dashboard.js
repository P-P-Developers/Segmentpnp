import React from "react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { All_Panel_List } from "../../../ReduxStore/Slice/Superadmin/SuperAdminSlice";
import { useLocation, useParams } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [AllData, setAllData] = useState({ loading: true, data: [] });
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [inActiveUserCount, setInActiveUserCount] = useState(0);

  const data = async () => {
    await dispatch(All_Panel_List())
      .unwrap()
      .then((response) => {
        const activeUsers = response.data.filter(
          (user) => user.is_active === 0
        ).length;
        const inActiveUsers = response.data.filter(
          (user) => user.is_active === 1
        ).length;

        setActiveUsersCount(activeUsers);
        setInActiveUserCount(inActiveUsers);

        setAllData({
          loading: false,
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("Error fetching panel list:", error);
      });
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <>
      <div className="content-body">
        {!AllData.loading && (
          <div className="container-fluid">
            {location.pathname == "/super/dashboard" ? (
              <>
                <div className="row">
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Panel</p>
                            <h3 className="">{AllData.data.length}</h3>

                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Active Panel</p>
                            <h3 className="">{activeUsersCount}</h3>

                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total InActive Panel </p>
                            <h3 className="">{inActiveUserCount}</h3>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row">
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-6">
                    <div className="widget-stat card  sixth-dashboard-card">
                      <div className="card-body  p-4">
                        <div className="media">
                          <span className="me-3 bg-primary">
                            <i className="la la-users  text-white" />
                          </span>
                          <div className="media-body ">
                            <p className="mb-1">Total Students</p>
                            <h3 className="">3280</h3>
                            <h6>
                              <a href="#" className="mb-2">
                                <i className="fa-regular fa-eye pe-1"></i>View
                              </a>
                            </h6>
                            <div className="progress mb-2 bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;

//    {/* --------theme-1-dashboard start---------- */}
//    <div className='theme-1-dashboard' >
//    <div className="row">
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>

//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="income-data d-flex align-items-center justify-content-xl-start justify-content-between mb-xl-0 mb-3">
//          <span className=" income-icon style-1 me-4">
//            <svg
//              width={30}
//              height={30}
//              viewBox="0 0 30 30"
//              fill="none"
//              xmlns="http://www.w3.org/2000/svg"
//            >
//              <path
//                d="M20.4764 0.97345C20.4255 0.974639 20.3747 0.978331 20.3241 0.984696C19.9555 1.02962 19.6167 1.20961 19.3732 1.48989C19.1297 1.77018 18.9988 2.13096 19.0057 2.50219V29.4991C19.0077 29.8041 19.1026 30.1012 19.2778 30.3509C19.453 30.6006 19.7001 30.7909 19.9862 30.8966C20.2723 31.0022 20.5838 31.0183 20.8792 30.9424C21.1746 30.8665 21.4398 30.7023 21.6395 30.4718L30.6425 19.9748C30.7704 19.8249 30.8676 19.6513 30.9284 19.4639C30.9893 19.2765 31.0126 19.079 30.9971 18.8825C30.9816 18.6861 30.9276 18.4946 30.8381 18.319C30.7486 18.1435 30.6254 17.9875 30.4755 17.8595C30.3257 17.7316 30.1521 17.6344 29.9647 17.5735C29.7773 17.5127 29.5797 17.4893 29.3833 17.5048C29.1869 17.5204 28.9954 17.5745 28.8199 17.664C28.6443 17.7535 28.4882 17.8766 28.3602 18.0265L21.994 25.4444V2.50219C21.9976 2.30152 21.9608 2.10206 21.8859 1.91585C21.811 1.72965 21.6995 1.56043 21.5579 1.41809C21.4164 1.27576 21.2478 1.16328 21.062 1.08729C20.8763 1.01131 20.6771 0.973336 20.4764 0.975699L20.4764 0.97345ZM11.453 1.00736C11.2441 1.01319 11.0388 1.0627 10.8501 1.15252C10.6614 1.24234 10.4935 1.37054 10.3573 1.52899L1.3661 12.026C1.22021 12.1722 1.10608 12.3469 1.03084 12.5392C0.955604 12.7315 0.920883 12.9374 0.928852 13.1437C0.936821 13.3501 0.98731 13.5526 1.07716 13.7385C1.167 13.9245 1.29427 14.0897 1.45099 14.2242C1.60771 14.3587 1.79051 14.4595 1.98794 14.52C2.18537 14.5806 2.39318 14.5997 2.59835 14.5763C2.80352 14.5528 3.00163 14.4871 3.18029 14.3835C3.35895 14.2799 3.51429 14.1407 3.6366 13.9743L10.0028 6.55623V29.4988C9.99838 29.6986 10.0339 29.8972 10.1073 30.0831C10.1807 30.2689 10.2905 30.4383 10.4302 30.5812C10.5699 30.724 10.7368 30.8374 10.921 30.9149C11.1052 30.9924 11.303 31.0324 11.5028 31.0324C11.7026 31.0324 11.9005 30.9924 12.0847 30.9149C12.2689 30.8374 12.4357 30.724 12.5754 30.5812C12.7152 30.4383 12.8249 30.2689 12.8983 30.0831C12.9717 29.8972 13.0072 29.6986 13.0028 29.4988V2.50167C13.0021 2.30093 12.9611 2.10237 12.8823 1.91775C12.8035 1.73314 12.6884 1.56607 12.5439 1.42674C12.3993 1.28741 12.2283 1.17853 12.041 1.1065C11.8536 1.03447 11.6536 1.00089 11.453 1.00753V1.00736Z"
//                fill="#fff"
//              />
//            </svg>
//          </span>
//          <div>
//            <span className=" fs-6 font-w500 d-block">Total incomes</span>
//            <h2 className="font-w600 mb-0 income-value">$45,945</h2>

//            <a href="#"><i className="fa-regular fa-eye pe-1"></i>View</a>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>
//  {/* --------theme-1-dashboard end---------- */}

//  {/* --------theme-2-dashboard start---------- */}
//  <div className='theme-2-dashboard'>
//    <div className='row'>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="rounded bg-primary overflow-hidden second-dash-card">
//          <div className="card-body pb-0 pt-3">
//            <div className="row">
//              <div className="col">
//                <h2 className="text-white">Power</h2>

//              </div>
//              <div className="col text-end">
//                <h2 className="text-white mb-0">
//                  260
//                </h2>
//                <a href="#" className="text-white"><i className="fa-regular fa-eye pe-1"></i>View</a>
//                {/* <span className="text-white">+12.5(2.8%)</span> */}
//              </div>
//            </div>
//          </div>
//          <div className="chart-wrapper">
//            <img src='../assets/images/dash_icon/bar.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>
//  {/* --------theme-2-dashboard end---------- */}

//  {/* --------theme-3-dashboard start---------- */}
//  <div className='theme-3-dashboard'>
//    <div className='row'>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-6">
//        <div className="card">
//          <div className="card-header border-0 pb-0 px-3">
//            <div className="clearfix">
//              <h3 className="card-title">Total Account</h3>

//            </div>
//            <div className="clearfix text-center">
//              <h3 className="text-primary mb-0">120/89</h3>
//              <a href="#" ><i className="fa-regular fa-eye pe-1"></i>View</a>
//            </div>
//          </div>
//          <div className="pb-1 text-center">
//            <img src='../assets/images/dash_icon/theme_3.png' className='w-100' />
//          </div>
//        </div>
//      </div>
//    </div>

//  </div>
//  {/* --------theme-3-dashboard end---------- */}

//  {/* --------theme-4-dashboard start---------- */}
//  <div className='theme-4-dashboard'>
//    <div className='row'>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <div>
//                  <h2 className="text-uppercase mb-0">74,206 </h2>
//                  <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                </div>

//                <h6 className='mb-0'>Lifetime earnings</h6>

//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <div>
//                  <h2 className="text-uppercase mb-0">74,206 </h2>
//                  <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                </div>

//                <h6 className='mb-0'>Lifetime earnings</h6>

//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <div>
//                  <h2 className="text-uppercase mb-0">74,206 </h2>
//                  <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                </div>

//                <h6 className='mb-0'>Lifetime earnings</h6>

//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <div>
//                  <h2 className="text-uppercase mb-0">74,206 </h2>
//                  <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                </div>

//                <h6 className='mb-0'>Lifetime earnings</h6>

//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <div>
//                  <h2 className="text-uppercase mb-0">74,206 </h2>
//                  <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                </div>

//                <h6 className='mb-0'>Lifetime earnings</h6>

//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <div>
//                  <h2 className="text-uppercase mb-0">74,206 </h2>
//                  <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                </div>

//                <h6 className='mb-0'>Lifetime earnings</h6>

//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <div>
//                  <h2 className="text-uppercase mb-0">74,206 </h2>
//                  <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                </div>

//                <h6 className='mb-0'>Lifetime earnings</h6>

//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>

//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <div>
//                  <h2 className="text-uppercase mb-0">74,206 </h2>
//                  <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                </div>

//                <h6 className='mb-0'>Lifetime earnings</h6>

//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <div>
//                  <h2 className="text-uppercase mb-0">74,206 </h2>
//                  <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                </div>

//                <h6 className='mb-0'>Lifetime earnings</h6>

//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <h2 className="text-uppercase">74,206</h2>
//                <h6>Lifetime earnings</h6>
//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <h2 className="text-uppercase">74,206</h2>
//                <h6>Lifetime earnings</h6>
//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <h2 className="text-uppercase">74,206</h2>
//                <h6>Lifetime earnings</h6>
//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <h2 className="text-uppercase">74,206</h2>
//                <h6>Lifetime earnings</h6>
//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <h2 className="text-uppercase">74,206</h2>
//                <h6>Lifetime earnings</h6>
//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <h2 className="text-uppercase">74,206</h2>
//                <h6>Lifetime earnings</h6>
//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//        <div className="card fourth-dashboard-card">
//          <div className="card-body">
//            <div className="row justify-content-center align-items-center">
//              <div className="col-auto text-center">
//                <h2 className="text-uppercase">74,206</h2>
//                <h6>Lifetime earnings</h6>
//              </div>
//              <div className="col-auto text-center">
//                <img src='../assets/images/dash_icon/wave-sound.png' className='w-50' />
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>
//  {/* --------theme-4-dashboard end---------- */}

//  {/* --------theme-5-dashboard start---------- */}
//  <div className='theme-5-dashboard'>
//    <div className='row'>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//        <div className="card booking mb-0 fifth-dahbaord-card">
//          <div className="card-body">
//            <div className="income-data d-flex justify-content-between align-items-center mb-sm-0 mb-2  mb-sm-0 mb-2 ps-lg-0 ">
//              <div>
//                <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                <h3 className="font-w600 fs-2 mb-0">195</h3>
//                <span className="fs-6 font-w500">Rooms</span>
//              </div>
//              <span className="income-icon style-3">
//                <img src='../assets/images/dash_icon/analyze.gif' className='w-100' />
//              </span>
//            </div>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>
//  {/* --------theme-5-dashboard end--------- */}

//         {/* --------theme-7-dashboard start--------- */}
//         <div className='theme-7-dashboard'>
//           <div className='row'>

//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0 align-items-start">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>

//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-44">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-2 col-lg-2 col-xxl-2 col-md-4">
//               <div className="card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="clearfix">
//                     <h3 className="card-title">Total Profit</h3>
//                     <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   </div>
//                   <div className="clearfix text-center">
//                     <h3 className="text-info mb-0">124</h3>

//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <img src='../assets/images/dash_icon/theme-7.png' className='w-100' />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* --------theme-7-dashboard end--------- */}

//         {/* --------theme-8-dashboard start--------- */}
//         <div className='theme-8-dashboard'>
//           <div className='row'>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-6">
//               <div className="widget-stat card">
//                 <div className="card-body p-4">
//                   <h4 className="card-title">Fees Collection</h4>
//                   <h3>25160$</h3>
//                   <h6><a href="#" className="mb-2"><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                   <div className="progress mb-2">
//                     <div
//                       className="progress-bar progress-animated bg-success"
//                       style={{ width: "30%" }}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* --------theme-8-dashboard end--------- */}
//         {/* --------theme-8-dashboard start--------- */}

//         <div className="theme-9-dashboard">
//           <div className="row">
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
//               <div className="card border-0 rounded">
//                 <div className="card-body">
//                   <div className="row justify-content-center align-items-center">
//                     <div className="col-auto text-center">
//                       <h6 className=" mb-0">Lifetime earnings</h6>
//                       <h2 className="text-uppercase mb-0">74,206</h2>
//                       <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
//                     </div>
//                     <div className="col-auto text-center px-0">
//                       <img
//                         src="../assets/images/dash_icon/dash-9-icon.png"
//                         className=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* --------theme-9-dashboard end--------- */}

//         {/* --------theme-10-dashboard start--------- */}

//         <div className="theme-10-dashboard">
//           <div className="row">
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-lg-3 col-xxl-3 col-md-4">
//               <div className="card widget-stat border-0 sixth-dashboard-card">
//                 <div className="card-header border-0 pb-0">
//                   <div className="media w-100">
//                     <span className="me-3 bg-primary">
//                       <i className="la la-users  text-white" />
//                     </span>
//                     <div className="media-body text-end">
//                       <p className="mb-1">Total Students</p>
//                       <h3 className="">3280</h3>
//                       <h6><a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a></h6>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" text-center">
//                   <img
//                     src="../assets/images/dash_icon/dash-6-icon.png"
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>