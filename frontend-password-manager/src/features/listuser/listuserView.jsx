import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import {useDispatch, useSelector} from "react-redux";
import {fetchEditSubUser, fetchSubUser} from "./listuserSlice";
import {setShow} from "../formSubAcc/formSubAccSlice";
import SweetAlert from "react-bootstrap-sweetalert";
import {decrypt} from "../common/common";
import {setShowCheckMasterKey} from "../checkMasterkey/masterKeySlice";
import {fetchSubAccount} from "../list/listSlice";

export const ListUserView = () =>
{
    const columns= [
        {
            name:"Id",
            selector:(row)=><div>{row.id}</div> ,
            width: '50px',
        },
        {
            name: "email",
            selector: (row) => <div>{row.email}</div>
        },

        {
            name:"Trạng thái",
            selector:(row)=>(
                <div>{row.isActive ?" Đang hoạt động" : "Bị Khóa " }</div>)
        },
        {
            name:"Hành động ",
            cell:(row)=>(
                <div >
                    Mở khóa thời gian login
                </div>),
        },
    ];
    // const [id, setID] = useState(null); // Initialize with null
    const user = useSelector(state => state.user)
    const app = useSelector(state => state.app)

    const dispatch = useDispatch();
    const [search, SetSearch]= useState('');
    const [title, SetTitle]= useState('');
    const [showConfirm, setShowConfirm]= useState(false);

    const [filter, setFilter]= useState([]);
    //

    useEffect(()=>{
        window.alert("dcm react")
        fetchSubUser();
    }, []);

    useEffect(()=>{
        console.log("data" ,user.data);

        const result = user.data.filter((item) => {
            return item.email.toLowerCase().includes(search.toLowerCase());
        });

        setFilter(result);
    }, [search, user.data]);


    const confirmAction=(val)=>{
        fetchDeleteSubAccount(deleteID);
        setShowConfirm(false);
    }

    const cancelAction=(val)=>{
        setShowConfirm(false)
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
        console.log(data.selectedRows.map(row=>row.id));
    };

    const style = {
        width: '70px',
    };


    return(
        <div className="container"> Tổng {user.data.length}
            <div className="row container">
                {/*<div className="col-md-8 row text-start">*/}
                {/*    <div className="col-md-8 row text-start">*/}
                {/*        <button className="btn col-md-6 btn-success p-2 mr-2" style={style} onClick={addSubAccountClick}>Thêm</button>*/}
                {/*    </div>*/}

                {/*</div>*/}
                <div className="col-md-4 text-end">

                    <input type="text"
                           className="p-2  form-control"
                           placeholder="Tìm kiếm ..."
                           value={search}
                           onChange={(e) => SetSearch(e.target.value)}/>
                </div>
            </div>
            <br/>
            <SweetAlert
                show={showConfirm}
                warning
                showCancel
                cancelBtnText="Để tôi xem xét "
                cancelBtnBsStyle="light"
                confirmBtnText={title}
                confirmBtnBsStyle="danger"
                title={title}
                onConfirm={confirmAction}
                onCancel={cancelAction}
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
                // selectableRows
                fixedHeader
                paginationComponentOptions={{rowsPerPageText: "Số tài khoản trên 1 trang"}}
                selectableRowsHighlight
                highlightOnHover
                paginationPerPage={10}
            />
            
        </div>


    );
}

export default ListUserView;
