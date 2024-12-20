import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { DispatchLogin } from "../../../Layout/Auth/Login";

import { GET_ALL_PANELS_LIST, ALL_BROKERS, UPDATE_BROKERS, UPDATE_PANEL_THEME, CLOSE_ADMIN_PANEL, GET_PANEL_INFORMATION, UPDATE_ADMIN_PERMISSION, GET_ADMIN_HELPS, ADD_LICENCE_TO_COMPANY, GET_ALL_SUBADMIN_CLIENT, GET_ALL_ADMIN_CLIENT, GET_PANEL_BROKER, ADD_PANEL, UPDATE_PANEL ,GET_PANEL_HISTORY,UPDATE_QUERY , GET_ALL_SIGNAL , UPDATE_PRICE , DELETE_SIGNAL , GET_ALL_DELETED_SIGNAL  ,BACKUP_SIGNAL , SUPER_UPDATE_USER  ,GET_ONE_USER , USER_DELETE , ADJUST_MONTH_TO_COMPANY,GET_USER,DELETE_LICENSE} from "../../../Service/superadmin.service";

export const All_Panel_List = createAsyncThunk("DispatchLogin", async (data) => {
  try {
    const res = await GET_ALL_PANELS_LIST(data);
    return await res;
  } catch (err) {
    return err;
  }
});

export const Update_Panel_Theme = createAsyncThunk("update/theme", async (data) => {
  const { theme_id, userid,UserName, token } = data
  try {
    const res = await UPDATE_PANEL_THEME({ theme_id: theme_id, userid: userid ,UserName:UserName}, token);
    return await res;
  } catch (err) {
    return err;
  }
});

export const GET_PANEL_INFORMATIONS = createAsyncThunk("get/panel/info", async (data) => {
  const { id, token } = data

  try {
    const res = await GET_PANEL_INFORMATION(data, token);
    return await res;
  } catch (err) {
    return err;
  }
});


export const GET_PANEL_BROKERS = createAsyncThunk("get/panel/info", async (data) => {
  const { domain } = data

  try {
    const res = await GET_PANEL_BROKER(data);
    return await res;
  } catch (err) {
    return err;
  }
});

export const Get_All_Admin_Client = createAsyncThunk("get/all/clients", async (data) => {
  const { id, token } = data

  try {
    const res = await GET_ALL_ADMIN_CLIENT(data, token);
    return await res;
  } catch (err) {
    return err;
  }
});


export const Get_All_Subadmin_Client = createAsyncThunk("get/all/clients", async (data) => {
  const { id, token } = data

  try {
    const res = await GET_ALL_SUBADMIN_CLIENT(data, token);
    return await res;
  } catch (err) {
    return err;
  }
});


export const Add_Licence_To_Company = createAsyncThunk("add/license", async (data) => {
  const { id, token } = data

  try {
    const res = await ADD_LICENCE_TO_COMPANY(data, token);
    return await res;
  } catch (err) {
    return err;
  }
});

export const Adjust_Month_To_Company = createAsyncThunk("add/adjust_month", async (data) => {
  const { id, token } = data

  try {
    const res = await ADJUST_MONTH_TO_COMPANY(data, token);
    return await res;
  } catch (err) {
    return err;
  }
});

export const Get_Admin_Helps = createAsyncThunk("/getall/panel/helps", async (req, token) => {
  // const { req, token } = data

  try {
    const res = await GET_ADMIN_HELPS(req, token);
    return await res;
  } catch (err) {
    return err;
  }
});


export const Update_Admin_Permissions = createAsyncThunk("/update/permission", async (req, token) => {
 // const { req, token } = data

  try {
    const res = await UPDATE_ADMIN_PERMISSION(req.req, req.token);
    return await res;
  } catch (err) {
    return err;
  }
});


export const Close_Admin_Panel = createAsyncThunk("/update/comapny/status", async (req, token) => {
  // const { req, token } = data

  try {
    const res = await CLOSE_ADMIN_PANEL(req);
    return await res;
  } catch (err) {
    return err;
  }
});


export const All_Brokers = createAsyncThunk("/get/all/brokers", async (req, token) => {
  // const { req, token } = data

  try {
    const res = await ALL_BROKERS(req);
    return await res;
  } catch (err) {
    return err;
  }
});


export const Update_Comapny_Brokers = createAsyncThunk("/update/comapny/brokers", async (req, token) => {

  try {
    const res = await UPDATE_BROKERS(req);
    return await res;
  } catch (err) {
    return err;
  }
});

export const Add_Panel_data = createAsyncThunk("add/panel", async (data) => {
  const { req, token } = data

  try {
    const res = await ADD_PANEL(data, token);
    return await res;
  } catch (err) {
    return err;
  }
});

export const Update_Panel = createAsyncThunk("edit/panel", async (data, token) => {
  // const { theme_id, userid, token } = data
  try {
    const res = await UPDATE_PANEL(data, token);
    return await res;
  } catch (err) {
    return err;
  }
});


export const Get_Panel_History = createAsyncThunk("getall/history", async (token) => {
  

  try {
    const res = await GET_PANEL_HISTORY( token);
    return await res;
  } catch (err) {
    return err;
  }
});



export const UPDATE_QUERY_PANEL = createAsyncThunk("update/query", async (data) => {
  const { theme_id, userid } = data
  try {
    const res = await UPDATE_QUERY({ theme_id: theme_id, userid: userid });
    return await res;
  } catch (err) {
    return err;
  }
});

export const GetAllSignal = createAsyncThunk("get/signals", async (data) => {
   
  try {
    const res = await GET_ALL_SIGNAL(data);
    return await res;
  } catch (err) {
    return err;
  }
});


export const Update_Price = createAsyncThunk("update/price", async (data) => {
   
  try {
    const res = await UPDATE_PRICE(data);
    return await res;
  } catch (err) {
    return err;
  }
});

export const DeleteSignal = createAsyncThunk("signal/delete", async (data) => {
   
  try {
    const res = await DELETE_SIGNAL(data);
    return await res;
  } catch (err) {
    return err;
  }
});

export const BackupSignal = createAsyncThunk("backup/signal", async (data) => {
   
  try {
    const res = await BACKUP_SIGNAL(data);
    return await res;
  } catch (err) {
    return err;
  }
});


export const GetAllDeletedSignal = createAsyncThunk("deleted/signal", async (data) => {
   
  try {
    const res = await GET_ALL_DELETED_SIGNAL(data);
    return await res;
  } catch (err) {
    return err;
  }
});

export const Find_One_User = createAsyncThunk("findUserById", async (data) => {
   
  try {
    const res = await GET_ONE_USER(data);
    return await res;
  } catch (err) {
    return err;
  }
});

export const SUPER_UPDATE_USER_DATA = createAsyncThunk("super/update/user", async (data) => {
   
  try {
    const res = await SUPER_UPDATE_USER(data);
    return await res;
  } catch (err) {
    return err;
  }
});

export const DELETE_USER_SERVICES = createAsyncThunk("user/delete", async (data) => {
   
  try {
    const res = await USER_DELETE(data);
    return await res;
  } catch (err) {
    return err;
  }
});

export const Find_User = createAsyncThunk("findOneUser", async (data) => {
   
  try {
    const res = await GET_USER(data);
    return await res;
  } catch (err) {
    return err;
  }
});


export const DELETE_LICENSE_API = createAsyncThunk("delete/license1", async (data) => {
   
  try {
    const res = await DELETE_LICENSE(data);
    return await res;
  } catch (err) {
    return err;
  }
});

 


const SuperAdminSlice = createSlice({
  name: "SuperAdminSlice",
  initialState: {
    isLoading: false,
    isError: false,
    getPanelList: [],
    update_panel_theme: [],
    panel_info: [],
    admin_client_list: [],
    subadmin_list: [],
    add_licence: [],
    admin_helps: [],
    admin_permission: [],
    panel_brokers: [],
    close_panel: [],
    all_brokers: [],
    Update_Brokers: [],
    Add_Panels: [],
    update_panel: [],
    panel_history: [],
    getallsignal:[],
    update_price:[],
    deletesignal :[],
    getalldeletedsignal:[],
    backupSignal:[],
    find_One_User:[],
    SUPER_UPDATE_USER_DATA:[],
    user_Delete:[],
    find_User :[] ,
    delete_license :[]
  },

  recuders: {},
  extraReducers: {
    [All_Panel_List.pending]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, getPanelList: [], isLoading: true };
    },
    [All_Panel_List.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, getPanelList: payload, isLoading: false };
    },
    [Update_Panel_Theme.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, update_panel_theme: payload, isLoading: false };
    },
    [GET_PANEL_INFORMATIONS.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, panel_info: payload, isLoading: false };
    },
    [Get_All_Admin_Client.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, admin_client_list: payload, isLoading: false };
    },
    [Get_All_Subadmin_Client.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, subadmin_list: payload, isLoading: false };
    },
    [Add_Licence_To_Company.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, add_licence: payload, isLoading: false };
    },
    [Add_Panel_data.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, Add_Panels: payload, isLoading: false };
    },
    [Update_Panel.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, update_panel: payload, isLoading: false };
    },
    [Get_Admin_Helps.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, admin_helps: payload, isLoading: false };
    },
    [Update_Admin_Permissions.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, admin_permission: payload, isLoading: false };
    },
    [GET_PANEL_BROKERS.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, panel_brokers: payload, isLoading: false };
    },
    [Close_Admin_Panel.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, close_panel: payload, isLoading: false };
    },
    [All_Brokers.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, all_brokers: payload, isLoading: false };
    },
    [Update_Comapny_Brokers.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, Update_Brokers: payload, isLoading: false };
    },
    [Get_Panel_History.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, panel_history: payload, isLoading: false };
    },
    [GetAllSignal.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, getallsignal: payload, isLoading: false };
    },
    [Update_Price.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, update_price: payload, isLoading: false };
    },
    [DeleteSignal.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, deletesignal: payload, isLoading: false };
    },
    [GetAllDeletedSignal.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, getalldeletedsignal: payload, isLoading: false };
    },
    [BackupSignal.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, backupSignal: payload, isLoading: false };
    },
    [Find_One_User.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, find_One_User: payload, isLoading: false };
    },
    [SUPER_UPDATE_USER_DATA.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, SUPER_UPDATE_USER_DATA: payload, isLoading: false };
    },
    [DELETE_USER_SERVICES.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, user_Delete: payload, isLoading: false };
    },
    [Find_User.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, find_User: payload, isLoading: false };
    },
    [DELETE_LICENSE_API.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      return { ...state, delete_license: payload, isLoading: false };
    },
  },

});

export const panellist = (state) => state && state.SuperAdminSlice?.getPanelList


// export const {ganpat} = HomeScreenSlice.actions
export default SuperAdminSlice;
