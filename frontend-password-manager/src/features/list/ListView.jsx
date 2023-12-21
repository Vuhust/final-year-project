import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import config from "../config/server";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchSubAccount, fetchDeleteSubAccount} from "./listSlice";
import data from "bootstrap/js/src/dom/data";
import {setShow} from "../formSubAcc/formSubAccSlice";
import {startConfirmation} from "../confirm/confirmSlice";
import SweetAlert from "react-bootstrap-sweetalert";
export const ListView = () =>
{
  const columns= [
    {
      name:"Sr.No",
      selector:(row)=>row.id,
    },
    {
      name:"Url",
      selector:(row)=>row.url,
    },
    {
      name:"Desc",
      selector:(row)=>row.desc,
    },
    {
      name:"User namee",
      selector:(row)=>row.subUserName,
    },
    {
      name:"password",
      selector:(row)=> "******",
    },
    {
      name:"Action",
      cell:(row)=>(
        <button className="btn btn-danger" onClick={()=>handleDelete(row.id)}>Delete</button>
      )
    }

  ];
  const [deleteID, setDeleteID] = useState(null); // Initialize with null
  const [deleteIDList, setDeleteIDList] = useState([]); // Initialize with null

  const subAccount = useSelector(state => state.subAccount)
  const dispatch = useDispatch();
  const [search, SetSearch]= useState('');
  const [showDeleteConfirm, setShowDeleteConfirm]= useState(false);
  const [filter, setFilter]= useState([]);
  console.log(subAccount.data)


  useEffect(()=>{
    fetchSubAccount();
  }, []);

  useEffect(()=>{
    const result= subAccount.data.filter((item)=>{
      const item1 = item.desc.toLowerCase().match(search.toLocaleLowerCase());
      const item2 = item.url.toLowerCase().match(search.toLocaleLowerCase());
      return item1 || item2 ;
    });
    setFilter(result);
  },[search,subAccount.data]);

  const handleDelete=(val)=>{
    setDeleteID(val);
    setShowDeleteConfirm(true)

  }

  const confirmDelete=(val)=>{
    fetchDeleteSubAccount(deleteID);
    setShowDeleteConfirm(false);
  }

  const cancelDelete=(val)=>{
    setShowDeleteConfirm(false)
  }


  const tableHeaderstyle={
    headCells:{
      style:{
        fontWeight:"bold",
        fontSize:"14px",
        backgroundColor:"#ccc"

      },
    },
  }
  const handleRowSelectedChange = (data) => {
    window.alert(1)
    console.log(data.selectedRows.map(row=>row.id));
  };

  const addSubAcc = () => {
    dispatch(setShow(true));
  }

  return(
    <div className="container"> Tổng {subAccount.data.length}
      <div className="row container">
        <div className="col-md-8 row text-start">
          <div className="col-md-8 row text-start">

            <button className="btn col-md-3 btn-danger p-2">Xóa đã chọn</button>
            {/*<div className="btn col-md-1  p-2"></div>*/}

            <button className="btn col-md-3 btn-success p-2 mr-2">Thêm</button>
          </div>

        </div>
        <div className="col-md-4 text-end">

          <input type="text"
                 className="p-2  form-control"
                 placeholder="Tìm kiếm ..."
                 value={search}
                 onChange={(e) => SetSearch(e.target.value)}/>
        </div>
        {/*<div className="p-2">*/}
        {/*</div>*/}

      </div>
      <br/>
      <SweetAlert
        show={showDeleteConfirm}
        warning
        showCancel
        cancelBtnText="Để tôi xem xét "
        cancelBtnBsStyle="light"
        confirmBtnText="Chắc chắn rồi "
        confirmBtnBsStyle="danger"
        title="Bạn có chắc chắn muốn xóa?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        focusCancelBtn
      >
        Sau khi xóa sẽ không thể hoàn tác
      </SweetAlert>
      <DataTable
        onSelectedRowsChange={handleRowSelectedChange}
        customStyles={tableHeaderstyle}
        columns={columns}
        data={filter}
        pagination
        selectableRows
        fixedHeader
        paginationComponentOptions={{rowsPerPageText: "Số tài khoản trên 1 trang"}}

        selectableRowsHighlight
        highlightOnHover
        paginationPerPage={10}
      />


    </div>


  );
}

export default ListView;
