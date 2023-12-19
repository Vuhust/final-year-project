import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import config from "../config/server";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchSubAccount} from "./listSlice";
export const ListView = () =>
{
  const columns= [
    {
      name:"Sr.No",
      selector:(row)=>row.id,
    },
    {
      name:"Title",
      selector:(row)=>row.title,
    },
    {
      name:"Category",
      selector:(row)=>row.category,
    },
    {
      name:"Price",
      selector:(row)=>row.price,
    },
    {
      name:"Image",
      selector:(row)=><img  height ={70} width={80} src={ row.image}/>,
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

  // const getSubAccount= async()=>{
  //   try{
  //     const req= await axios.get(config.subAccountListUrl, {
  //
  //     });
  //     const res= await req.json();
  //     setData(res);
  //     setFilter(res);
  //   } catch(error){
  //     console.log(error);
  //   }
  // }
  useEffect(()=>{
    fetchSubAccount();
  }, []);

  useEffect(()=>{
    const result= subAccount.data.filter((item)=>{
      return item.title.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  },[search]);

  const handleDelete=(val)=>{
    window.alert(val)
    const newdata= data.filter((item)=>item.id!==val);
    setFilter(newdata);
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

  return(
    <div className="container">

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
        actions={
          <button className="btn btn-success">Export Pdf</button>
        }
        subHeader
        subHeaderComponent={
          <input type="text"
                 className="w-25 form-control"
                 placeholder="Search..."
                 value={ search}
                 onChange={(e)=>SetSearch(e.target.value)}

          />
        }
        subHeaderAlign="right"

      />


    </div>


  );
}

export default ListView;
