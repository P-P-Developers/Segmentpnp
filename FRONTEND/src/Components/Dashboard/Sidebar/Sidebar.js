import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  admin_sidebar,
  supper_admin_sidebar,
  sub_admin_sidebar,
  Client,
} from "./Nav_Config";
import {
  Signal,
  Users,
  Wrench,
  Link2,
  Frame,
  CandlestickChart,
  Activity,
  WalletCards,
  HelpingHand,
  FolderClock,
  LayoutDashboard,
  Building2,
  Copyright,
  CalendarPlus,
  Repeat2,
  ArrowRightLeft,
  ScatterChart,
  Boxes,
  Rocket,
  Paintbrush,
  Vote,
  Info,
  LayoutList,
} from "lucide-react";
import $ from "jquery";
import { Get_Sub_Admin_Permissions } from "../../../ReduxStore/Slice/Subadmin/Subadminslice";
import { useDispatch } from "react-redux";
import { Get_Company_Logo } from "../../../ReduxStore/Slice/Admin/AdminSlice";
import * as Config from "../../../Utils/Config";
import { Get_Pmermission } from "../../../ReduxStore/Slice/Users/DashboardSlice";
import { User_Profile } from "../../../ReduxStore/Slice/Common/commoSlice.js";

const Sidebar = ({ ShowSidebar }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const roles = JSON.parse(localStorage.getItem("user_role"));
  const gotodashboard = JSON.parse(localStorage.getItem("gotodashboard"));
  const user_role_goTo = JSON.parse(localStorage.getItem("user_role_goTo"));
  const user_ID = JSON.parse(localStorage.getItem("user_details")).user_id;
  const token = JSON.parse(localStorage.getItem("user_details")).token;
  const goTouser_ID = JSON.parse(localStorage.getItem("user_details_goTo"));
  const [getPermissions, setGetPermissions] = useState([]);
  const [admin_permission, setAdmin_permission] = useState([]);
  const [profileData, setProfileData] = useState(0);

  const data2 = async () => {
    if (roles === "SUBADMIN") {
      await dispatch(Get_Sub_Admin_Permissions({ id: user_ID && user_ID }))
        .unwrap()
        .then((response) => {
          if (response.status) {
            setGetPermissions(response.data[0]);
          }
        });
    } else if (user_role_goTo === "SUBADMIN") {
      await dispatch(
        Get_Sub_Admin_Permissions({ id: goTouser_ID && goTouser_ID.user_id })
      )
        .unwrap()
        .then((response) => {
          if (response.status) {
            setGetPermissions(response.data[0]);
          }
        });
    }

    if (roles === "ADMIN" || roles === "USER") {
      await dispatch(
        Get_Pmermission({
          domain: Config.react_domain,
          token: token,
        })
      )
        .unwrap()
        .then((response) => {
          if (response.status) {
            setAdmin_permission({
              loading: false,
              data: response.data,
            });
          } else {
            setAdmin_permission({
              loading: false,
              data: response.data,
            });
          }
        });
    }
    if (roles == "USER") {
      const response = await dispatch(
        User_Profile({
          id: user_ID,
          token: token,
        })
      ).unwrap();
      console.log(response.data.apicreateinfo);
      if (response.status) {
        setProfileData(response.data.apicreateinfo);
        // setProfileData(response.data);
      }
    }
  };

  const CompanyName = async () => {
    try {
      const response = await dispatch(Get_Company_Logo()).unwrap();
      if (response && response.status) {
        $(".logo-abbr").attr("src", response.data && response.data[0].logo);

        let favicon = $("link[rel='icon']").length
          ? $("link[rel='icon']")
          : $("<link rel='icon' type='image/x-icon' />");
        favicon.attr("href", response.data && response.data[0].favicon);
        $("head").append(favicon);
      }
    } catch (error) {
      $(".logo-abbr").attr("src", "path/to/default/logo.png");

      let favicon = $("link[rel='icon']").length
        ? $("link[rel='icon']")
        : $("<link rel='icon' type='image/x-icon' />");
      favicon.attr("href", "path/to/default/favicon.ico");
      $("head").append(favicon);
    }
  };

  useEffect(() => {
    data2();
    CompanyName();
  }, []);

  return (
    <div className="deznav ">
      <div className="deznav-scroll">
        <ul className="metismenu" id="menu">
          {gotodashboard != null
            ? user_role_goTo === "USER"
              ? Client &&
                Client.map((item, index) => {
                  const isActive = location.pathname.includes(item.route);
                  if (
                    admin_permission.data?.length > 0 &&
                    admin_permission.data[0]?.Plans == 0 &&
                    item.name === "Plans"
                  ) {
                    return null;
                  }
                  return (
                    <React.Fragment key={"USER" + index}>
                      {item.Data.length > 0 ? (
                        <li className={isActive ? "mm-active" : ""}>
                          <a className="has-arrow">
                            <IconComponent icon={item.Icon} className="mx-2" />
                            <span className="nav-text">{item.name}</span>
                          </a>
                          <ul aria-expanded="false">
                            {item.Data.map((nested_item) => (
                              <li
                                key={nested_item.id}
                                className={
                                  location.pathname.includes(nested_item.route)
                                    ? "mm-active"
                                    : ""
                                }
                              >
                                <Link to={nested_item.route}>
                                  {nested_item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ) : (
                        <li className={isActive ? "mm-active" : ""}>
                          <Link to={item.route}>
                            <IconComponent icon={item.Icon} />
                            <span className="nav-text mx-2">{item.name}</span>
                          </Link>
                        </li>
                      )}
                    </React.Fragment>
                  );
                })
              : user_role_goTo === "SUBADMIN"
              ? sub_admin_sidebar &&
                sub_admin_sidebar.map((item) => {
                  return (
                    <>
                      {item.route === "/subadmin/tradehistory" &&
                      getPermissions &&
                      getPermissions.trade_history_old == 0 ? null : (
                        <li
                          key={item.id}
                          className={`${
                            location.pathname === item.route ? "mm-active" : ""
                          }`}
                        >
                          {item.Data.length > 0 ? (
                            <>
                              <Link className="has-arrow" aria-expanded="false">
                                <IconComponent key={item.id} icon={item.Icon} />
                                <span className="nav-text mx-2">
                                  {item.name}
                                </span>
                              </Link>
                              <ul aria-expanded="false">
                                {item.Data.map((nested_item) => (
                                  <li
                                    key={nested_item.route}
                                    className={`${
                                      location.pathname === nested_item.route
                                        ? "mm-active"
                                        : ""
                                    }`}
                                  >
                                    <Link to={nested_item.route}>
                                      {nested_item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <Link
                              to={item.route}
                              className=""
                              aria-expanded="false"
                            >
                              <IconComponent key={item.id} icon={item.Icon} />
                              <span className="nav-text mx-2">{item.name}</span>
                            </Link>
                          )}
                        </li>
                      )}
                    </>
                  );
                })
              : ""
            : roles === "ADMIN"
            ? admin_sidebar &&
              admin_sidebar.map((item) => {
                if (
                  (item.id === 9 || item.name === "Make Strategy") &&
                  admin_permission.data &&
                  admin_permission.data[0].Create_Strategy === 0
                ) {
                } else {
                  return (
                    <>
                      <li
                        key={item.id}
                        className={`${
                          location.pathname.includes(item.route && item.route)
                            ? "mm-active"
                            : ""
                        }`}
                      >
                        {item.Data.length > 0 ? (
                          <>
                            <a className="has-arrow">
                              <IconComponent
                                key={item.id}
                                icon={item.Icon}
                                className="mx-2"
                              />
                              <span className="nav-text">{item.name}</span>
                            </a>
                          </>
                        ) : (
                          ""
                        )}
                        {item.Data.length !== 0 ? (
                          <>
                            <ul aria-expanded="false" className="mm-collapse">
                              {item.Data.length > 0
                                ? item.Data.map((nested_item, index) => {
                                    if (
                                      (nested_item.route ==
                                        "/admin/createstrategy" &&
                                        admin_permission.data &&
                                        admin_permission.data[0]
                                          .Create_Strategy === 0) ||
                                      (nested_item.route ==
                                        "/admin/AllMakeStrategy" &&
                                        admin_permission.data &&
                                        admin_permission.data[0]
                                          .Create_Strategy === 0) ||
                                      (nested_item.route ==
                                        "/admin/optionchain" &&
                                        admin_permission.data &&
                                        admin_permission.data[0]
                                          .Option_chain === 0) ||
                                      (nested_item.route == "/admin/plans" &&
                                        admin_permission.data &&
                                        admin_permission.data[0].Plans === 0)
                                    ) {
                                    } else {
                                      return (
                                        <React.Fragment key={index}>
                                          <li
                                            className={`${
                                              location.pathname.includes(
                                                item.route && item.route
                                              )
                                                ? "mm-active"
                                                : ""
                                            }`}
                                          >
                                            <Link to={nested_item.route}>
                                              {nested_item.name}
                                            </Link>
                                          </li>
                                        </React.Fragment>
                                      );
                                    }
                                  })
                                : ""}
                            </ul>
                          </>
                        ) : null}
                      </li>

                      {item.Data.length === 0 ? (
                        <>
                          {(item.route === "/admin/createstrategy" &&
                            admin_permission.data &&
                            admin_permission.data[0].Create_Strategy === 0) ||
                          (item.route === "/admin/optionchain" &&
                            admin_permission.data &&
                            admin_permission.data[0].Option_chain === 0) ||
                          (item.route == "/admin/plans" &&
                            admin_permission.data &&
                            admin_permission.data[0].Plans === 0) ? (
                            ""
                          ) : (
                            <li
                              className={`${
                                location.pathname === item.route && item.route
                                  ? "mm-active"
                                  : ""
                              }`}
                            >
                              <Link
                                to={item.route}
                                className=""
                                aria-expanded="false"
                              >
                                <IconComponent key={item.id} icon={item.Icon} />
                                <span className="nav-text">{item.name}</span>
                              </Link>
                            </li>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  );
                }
              })
            : roles === "SUPERADMIN"
            ? supper_admin_sidebar &&
              supper_admin_sidebar.map((item) => {
                return (
                  <>
                    <li
                      key={item.id}
                      className={`${
                        location.pathname === item.route && item.route
                          ? "mm-active"
                          : ""
                      }`}
                    >
                      {item.Data.length > 0 ? (
                        <>
                          <Link
                            className="has-arrow "
                            href="javascript:void()"
                            aria-expanded="false"
                            to={item.route}
                          >
                            <IconComponent
                              key={item.id}
                              icon={item.Icon}
                              className="mx-2"
                            />
                            <span className="nav-text mx-2 mm-active">
                              {item.name}
                            </span>
                          </Link>
                        </>
                      ) : (
                        ""
                      )}
                      <ul aria-expanded="false">
                        {item.Data.length > 0
                          ? item.Data.map((nested_item) => {
                              return (
                                <>
                                  <li
                                    className={`${
                                      location.pathname === item.route &&
                                      item.route
                                        ? "mm-active"
                                        : ""
                                    }`}
                                  >
                                    <Link to={nested_item.route}>
                                      {nested_item.name}
                                    </Link>
                                  </li>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                    </li>
                    {item.Data.length === 0 ? (
                      <>
                        <li
                          className={`${
                            location.pathname === item.route && item.route
                              ? "mm-active"
                              : ""
                          }`}
                        >
                          <Link
                            to={item.route}
                            className=""
                            aria-expanded="false"
                          >
                            <IconComponent key={item.id} icon={item.Icon} />

                            <span className="nav-text mx-2">{item.name}</span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                );
              })
            : roles === "SUBADMIN"
            ? sub_admin_sidebar &&
              sub_admin_sidebar.map((item) => {
                if (item.id === 10 || item.id === 9) {
                  if (
                    (item.id == 10 &&
                      getPermissions &&
                      getPermissions.optionchain === 0) ||
                    (item.id == 9 &&
                      getPermissions &&
                      getPermissions.makestrategy === 0)
                  ) {
                  } else {
                    return (
                      <>
                        <li
                          className={`${
                            location.pathname.includes(item.route && item.route)
                              ? "mm-active"
                              : ""
                          }`}
                        >
                          {item.Data.length > 0 ? (
                            <>
                              <a className="has-arrow">
                                <IconComponent
                                  key={item.id}
                                  icon={item.Icon}
                                  className="mx-2"
                                />
                                <span className="nav-text">{item.name}</span>
                              </a>
                            </>
                          ) : (
                            ""
                          )}
                          {item.Data.length !== 0 ? (
                            <>
                              <ul aria-expanded="false">
                                {item.Data.length > 0
                                  ? item.Data.map((nested_item) => {
                                      return (
                                        <>
                                          <li
                                            className={`${
                                              location.pathname.includes(
                                                item.route && item.route
                                              )
                                                ? "mm-active"
                                                : ""
                                            }`}
                                          >
                                            <Link to={nested_item.route}>
                                              {nested_item.name}
                                            </Link>
                                          </li>
                                        </>
                                      );
                                    })
                                  : ""}
                              </ul>
                            </>
                          ) : (
                            ""
                          )}
                        </li>
                      </>
                    );
                  }
                } else {
                  return (
                    <>
                      {item.route === "/subadmin/tradehistory" &&
                      getPermissions &&
                      getPermissions.trade_history_old == 1 ? (
                        <>
                          <li
                            className={`${
                              location.pathname === item.route && item.route
                                ? "mm-active"
                                : ""
                            }`}
                          >
                            {item.Data.length > 0 ? (
                              <>
                                <Link
                                  className="has-arrow "
                                  // href="javascript:void()"
                                  aria-expanded="false"
                                >
                                  <IconComponent
                                    key={item.id}
                                    icon={item.Icon}
                                  />

                                  <span className="nav-text  mx-2">
                                    {item.name}
                                  </span>
                                </Link>
                              </>
                            ) : (
                              ""
                            )}
                            {item.Data.length === 0 ? (
                              ""
                            ) : (
                              <>
                                <ul aria-expanded="false">
                                  {item.Data.length > 0
                                    ? item.Data.map((nested_item) => {
                                        return (
                                          <>
                                            <li
                                              className={`${
                                                location.pathname ===
                                                  item.route && item.route
                                                  ? "mm-active"
                                                  : ""
                                              }`}
                                            >
                                              <Link to={nested_item.route}>
                                                {nested_item.name}
                                              </Link>
                                            </li>
                                          </>
                                        );
                                      })
                                    : ""}
                                </ul>
                              </>
                            )}
                          </li>
                        </>
                      ) : (
                        ""
                      )}

                      {item.Data.length === 0 ? (
                        <>
                          {item.route === "/subadmin/tradehistory" &&
                          getPermissions &&
                          getPermissions.trade_history_old == 0 ? (
                            ""
                          ) : (
                            <li
                              className={`${
                                location.pathname === item.route && item.route
                                  ? "mm-active"
                                  : ""
                              }`}
                            >
                              <Link
                                to={item.route}
                                className=""
                                aria-expanded="false"
                              >
                                <IconComponent key={item.id} icon={item.Icon} />
                                {/* <i className="flaticon-013-checkmark" /> */}
                                <span className="nav-text mx-2">
                                  {item.name}
                                </span>
                              </Link>
                            </li>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  );
                }
              })
            : roles === "USER"
            ? Client &&
              Client.map((item) => {
                if (
                  admin_permission.data &&
                  admin_permission.data[0].Plans == 0 &&
                  item.name === "Plans"
                ) {
                  return null;
                }

                if (
                  profileData &&
                  profileData == 0 &&
                  item.name === "Api Create Info"
                ) {
                  return null;
                }
                return (
                  <>
                    <li
                      key={item.id}
                      className={`${
                        location.pathname.includes(item.route && item.route)
                          ? "mm-active"
                          : ""
                      }`}
                    >
                      {item.Data.length > 0 ? (
                        <>
                          <a className="has-arrow">
                            <IconComponent
                              key={item.id}
                              icon={item.Icon}
                              className="mx-2"
                            />
                            <span className="nav-text">{item.name}</span>
                          </a>
                        </>
                      ) : (
                        ""
                      )}
                      {item.Data.length !== 0 ? (
                        <>
                          <ul aria-expanded="false">
                            {item.Data.length > 0
                              ? item.Data.map((nested_item) => {
                                  return (
                                    <>
                                      <li
                                        className={`${
                                          location.pathname.includes(
                                            item.route && item.route
                                          )
                                            ? "mm-active"
                                            : ""
                                        }`}
                                      >
                                        <Link to={nested_item.route}>
                                          {nested_item.name}
                                        </Link>
                                      </li>
                                    </>
                                  );
                                })
                              : ""}
                          </ul>
                        </>
                      ) : null}
                    </li>
                    {item.Data.length === 0 ? (
                      <>
                        {" "}
                        {(item.route === "/admin/createstrategy" &&
                          admin_permission.data &&
                          admin_permission.data[0].Create_Strategy === 0) ||
                        (item.route === "/admin/optionchain" &&
                          admin_permission.data &&
                          admin_permission.data[0].Option_chain === 0) ||
                        (item.route === "/client/plan" &&
                          admin_permission.data &&
                          admin_permission.data[0].Plans === 0) ? (
                          ""
                        ) : (
                          <li
                            className={`${
                              location.pathname === item.route && item.route
                                ? "mm-active"
                                : ""
                            }`}
                          >
                            <Link
                              to={item.route}
                              className=""
                              aria-expanded="false"
                            >
                              <IconComponent key={item.id} icon={item.Icon} />
                              <span className="nav-text">{item.name}</span>
                            </Link>
                          </li>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                );
              })
            : ""}
        </ul>
      </div>
    </div>
  );
};

const IconComponent = ({ icon }) => {
  const renderIcon = () => {
    switch (icon) {
      case "Signal":
        return <Signal className="me-3" />;
      case "Users":
        return <Users className="me-3" />;
      case "Wrench":
        return <Wrench className="me-3" />;
      case "Frame":
        return <Frame className="me-3" />;
      case "CandlestickChart":
        return <CandlestickChart className="me-3" />;
      case "Activity":
        return <Activity className="me-3" />;
      case "WalletCards":
        return <WalletCards className="me-3" />;
      case "HelpingHand":
        return <HelpingHand className="me-3" />;
      case "FolderClock":
        return <FolderClock className="me-3" />;
      case "LayoutDashboard":
        return <LayoutDashboard className="me-3" />;
      case "Building2":
        return <Building2 className="me-3" />;
      case "Copyright":
        return <Copyright className="me-3" />;
      case "Repeat2":
        return <Repeat2 className="me-3" />;
      case "Rocket":
        return <Rocket className="me-3" />;
      case "ArrowRightLeft":
        return <ArrowRightLeft className="me-3" />;
      case "ScatterChart":
        return <ScatterChart className="me-3" />;
      case "Paintbrush":
        return <Paintbrush className="me-3" />;
      case "Vote":
        return <Vote className="me-3" />;
      case "Boxes":
        return <Boxes className="me-3" />;
      case "Info":
        return <Info className="me-3" />;
      case "Link2":
        return <Link2 className="me-3" />;
      case "MoreHorizontal":
        return <LayoutList className="me-3" />;

      case "plan":
        return <WalletCards className="me-3" />;
      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
};

export default Sidebar;
