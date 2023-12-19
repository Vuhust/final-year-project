import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import config from "../config/server";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchSubAccount, fetchDeleteSubAccount} from "./listSlice";
import data from "bootstrap/js/src/dom/data";
import {setShow} from "../formSubAcc/formSubAccSlice";
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

  const subAccount = useSelector(state => state.subAccount)
  const dispatch = useDispatch();
  const [search, SetSearch]= useState('');
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
    fetchDeleteSubAccount(val)
    // const newdata= data.filter((item)=>item.id!==val);
    // setFilter(newdata);
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
    console.log(data.allSelected);
    // console.log(selectedRows);

  };

  const addSubAcc = () => {
    dispatch(setShow(true));
  }

  return(
    <div className="container"> Tổng {subAccount.data.length}
      <button onClick={addSubAcc}> Thêm</button>
      <DataTable
        onSelectedRowsChange={handleRowSelectedChange}
        customStyles={ tableHeaderstyle}
        columns={columns}
        data={filter}
        pagination
        selectableRows
        fixedHeader
        selectableRowsHighlight
        highlightOnHover
        // actions={
        //   <button className="btn btn-success">Export Pdf</button>
        // }
        subHeader
        subHeaderComponent={
          <input type="text"
                 className="w-25 form-control"
                 placeholder="Tìm kiếm"
                 value={search}
                 onChange={(e)=>SetSearch(e.target.value)}

          />
        }
        subHeaderAlign="right"

      />


    </div>


  );
}

export default ListView;
