import style from './Grid.module.css';
import React, {useEffect, useState} from "react";
import {getGrid} from '../../services/grid/gridService';
import Columns from './Columns';
import GridBody from "./GridBody";
import GridFooter from "./GridFooter";
import EyeSearchRow from "./EyeSearchRow";
//import Loader  from '../loader/Loader';
import Loader  from './TableLoader';

function Grid (props){
    const [totalWidth, setTotalWidth] = useState('0'); /* tamaño de la tabla fullwidth */
    const [gridData, setGridData] = useState(null);
    const [gridAttr, setGridAttr] = useState([]);
    const [gridBody, setGridBody] = useState(null);

    const [columns, setColumns] = useState('S');
    const [total, setTotal] = useState();
    const [pagePos, setPagePos] = useState(1);
    const [loader, setLoader] = useState(false);
    const [eyeSearchProp, setEyeSearchProp] = useState({
        showFilters: false,
        iconFooter: "eye",
    });
    const [eyeSearchFilter, setEyeSearchFilter] = useState({});
    const initialStateEyeShearchFilter = {};
    const [order, setOrder] = useState({sord: ''});
    const [records, setRecords] = useState(null);
    const [rows, setRows] = useState(50);
    const defaultShowABM = {add:true, edit:true, del:true};
    const [rowSelected, setrowSelected] = useState([]);

    const handlePaginator = (page) => {
        if(page === 'right'){
            if(pagePos < total){
                setGridBody(null);
                setPagePos(pagePos + 1);
            }
        }else if(page === 'left'){
            if(pagePos != 1){
                setGridBody(null);
                setPagePos(pagePos - 1);
            }
        }else if(page != pagePos){
            setGridBody(null);
            setPagePos(page);

        }
    };
    
    const handleEyeSearchProp = (prop) => (event) => {
        switch (prop) {
          case "clickShowFilters":        
            if(eyeSearchProp.showFilters){
                setEyeSearchProp({ ...eyeSearchProp, ["showFilters"]: false, ["iconFooter"]: "eye" });
                setEyeSearchFilter({ ...initialStateEyeShearchFilter });
            }else{
                setEyeSearchProp({ ...eyeSearchProp, ["showFilters"]: true, ["iconFooter"]: "eye-off" });
            }    
            break;
          default:
            break;
        }
    };

    const handleOrder = (name, orderType) => {
        setGridBody(null);
        if(order.sord === ''){
            setOrder({sord: name + ' ' + orderType});
        }else if(!order.sord.includes(name)){

            setOrder({sord: order.sord + ',' + name + ' ' + orderType});

        }else if(orderType === 'desc'){
            setOrder({sord: order.sord.replace(name + ' asc', name + ' desc')});
        }else{
            if(order.sord.includes(',' + name)){
                setOrder({sord: order.sord.replace(',' + name + ' desc', '')});           
            }else if(order.sord.includes(name + 'desc,')){
                setOrder({sord: order.sord.replace(name + ' desc,', '')});           
            }else if(!order.sord.includes(',' + name) && order.sord.includes(name + ' desc,')){
                setOrder({sord: order.sord.replace(name + ' desc,', '')});           
            }else{
                setOrder({sord: order.sord.replace(name + ' desc', '')});             
            }            
        }
    
    }

    const handleRefresh = () => {
        setGridData(null)
        getAllGrid();
    }

    const handleRows = (data) => {
        if(data != rows){
            setTotal(null)
            setGridBody(null);
            setPagePos(1);
            setRows(data);
        }
    }

    async function getAllGrid(){
        setLoader(true)
        setGridBody(null);
        try{
            const data = await getGrid(props.id_menu, props.n_grid, props.m_autoquery, props.param, eyeSearchFilter, order.sord, rows, pagePos, props.cond, props.id_lista, props.cols);
            setGridData(data);
            
			if(columns === 'S'){
                let arrAttr = getWidthAttr(data.columns);
                setGridAttr(arrAttr);
                setTotalWidth(getFullWidth(arrAttr));
                setColumns('N');
                setTotal(data.total);
                setRecords(data.records)
            }
            setTotal(data.total);
            setRecords(data.records);
            setLoader(false);
            setGridBody(true);

        }catch(error){
            console.log(error)
            alert('Hubo un problema al cargar las grillas!');
            setLoader(false);    

        }
    }

    useEffect(()=>{
        getAllGrid();
    }, [pagePos, eyeSearchFilter, props.cond, order, rows]);

    const [ABMdata, setABMdata] = useState({});
    const [viewData, setViewData] = useState({});
    const evalDataRow = (gridData, rowData) => {
        try {
            if(typeof gridData.map === 'function'){
                let dataRows = {};
                gridData.map((rowItem, index) => {
                    let columnName = rowItem.D_COLUMN_NAME;
                    
                    if (rowData.find((aux) => aux.columnName === columnName.toUpperCase()) !== undefined) {
                        dataRows[columnName.toUpperCase()] = rowData.find(
                            (aux) => aux.columnName === columnName.toUpperCase()
                            ).value;
                    }else{                    
                        dataRows[columnName.toUpperCase()] = "";
                    }
                });
                setABMdata(dataRows);
                setViewData(dataRows);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let valColumns = gridData?.columns;
        evalDataRow((valColumns !== undefined) ? valColumns : {}, rowSelected);  
    }, [gridData, rowSelected])

    // -------------------------------------
    // useEffect(() => {
    //   if(ABMdata['oper'] !== undefined){        
    //     callMaestroABM();
    //   }
    // }, [ABMdata])
    
    // async function callMaestroABM(){
    //     setLoader(true)
    //     try{
    //         const data = await callMaestroABM(props.id_menu, props.n_orden, ABMdata);
    //         setLoader(false);
    //     }catch(error){
    //         console.log(error)
    //         alert('Hubo un problema al llamar MaestroABM');
    //         setLoader(false);    
    //     }
    // }

    return (
        <>
            <div className={style.grid_view}>
                <div className={style.grid_title}>
                    <h1>{props.grid_title? props.grid_title : 'Titulo de Grilla' }</h1>
                </div>
                {gridData && <div className={style.grid_box}>
                    <div className={style.grid_header} style={{width: totalWidth}}>
                        <Columns
                                                data={gridData.columns}
                                                totalWidth={totalWidth}
                                                gridAttr={gridAttr}
                                                handleOrder = {handleOrder}
                                            />
                    </div>
                    {eyeSearchProp.showFilters ? showEyeShearch(style, totalWidth, gridData, gridAttr, setEyeSearchFilter, eyeSearchFilter) : null}                    
                    {loader && <Loader />}
                    {gridBody && <div className={[style.grid_body].join(' ')} style={{width: totalWidth, height: '300px'}}>
                        <GridBody
                            data={gridData.rows}
                            totalWidth={totalWidth}
                            gridAttr={gridAttr}
                            className="bg-dark"
                            saveRowSelected={setrowSelected}
                        />
                    </div>}
                </div>}
                <div className={style.grid_footer}>
                    <GridFooter
                        handleEyeSearch={handleEyeSearchProp}
                        propEyeSearch={eyeSearchProp}
                        totalPages = {total} 
                        handlePaginator={handlePaginator} 
                        position = {pagePos}
                        handleRefresh = {handleRefresh}
                        records = {records}
                        handleRows = {handleRows}
                        showABM={(props.showABM) ? props.showABM : defaultShowABM}
                        gridData={gridData}
                        // rowData={rowSelected}
                        rowData={viewData}
                        ABMdata={ABMdata}
                        setABMdata={setABMdata}
                        />
                </div>
            </div>
        </>
    );
}

export default Grid;

export function getWidthAttr(columns) {
    let arrRet = [];
    if(columns !== null){
        columns.map((col)=>{
            let param = col.D_EXTRA_PARAM_DEFAULT;
            let arr = param.split(",");
            let w = 0;
            arr.map((item)=>{
                if(item.includes('width')){
                    let spliter = item.split(':');
                    w = spliter[1];
                }
            });
            if(w===0){
                arrRet.push({width: "100", dataType: col.C_TIPO_DATO});
            }
            else{
                arrRet.push({width: w, dataType: col.C_TIPO_DATO});
            }
        });

    }                    <div className="col-6 spinner-border text-primary justify-content-center" role="status"></div>

    return arrRet;
}
export function getFullWidth(sums){
    let full = 0;
    sums.map((item) => {
        full = full + Number(item.width);
    });
    return full;
}

export function showEyeShearch(style, totalWidth, gridData, gridAttr, setEyeSearchFilter, eyeSearchFilter){
    return(
        <div className={style.grid_eye} style={{width: totalWidth}}>
            {gridData.columns && <EyeSearchRow
                                    data={gridData.columns}
                                    totalWidth={totalWidth}
                                    gridAttr={gridAttr}
                                    setEyeSearchFilter={setEyeSearchFilter}
                                    eyeSearchFilter={eyeSearchFilter}
                                />}
        </div>
);
}
