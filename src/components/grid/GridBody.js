import { useState } from 'react';
import style from './GridBody.module.css';
import { IMaskInput } from 'react-imask';
import {callMaestroABM} from '../../services/grid/gridService'

let timer;
let lastPosition = null;

export default function GridBody ({data, totalWidth, gridAttr, saveRowSelected}){
    const [rowSelected, setRowSelected] = useState(null);
    const scope = document.querySelector("body");

    scope.addEventListener('click', () => {
        if(document.getElementById('context_menu')){
            document.getElementById('context_menu').classList.remove(style.visible);
        }
        
    })

    document.body.addEventListener("keydown", function(event) {
        if (event.code === 'Escape' || event.keyCode === 27) {
            if(document.getElementById('item_input_' + lastPosition)){
                document.getElementById('item_input_'+ lastPosition).classList.add('d-none');
                document.getElementById('item_span_'+ lastPosition).classList.remove('d-none');
        
            }    
    
        }
      });

    document.addEventListener('mousedown', function(event) {
        if (event.detail > 1) {
            event.preventDefault();
        }
    }, false);

    



    function selectRow(id_row){
        const selectedRow = document.getElementById(id_row).classList.contains(style.tr_selected);
        setRowSelected(id_row);
        if(selectedRow === false){
            document.getElementById(id_row).classList.toggle(style.tr_selected);
            if(!!document.getElementById(rowSelected)){
                document.getElementById(rowSelected).classList.remove(style.tr_selected);
                setRowSelected(id_row);
            }else{
                setRowSelected(id_row);
            }
        }
    
    }

    function rowContextMenu(id_row, message){
        event.preventDefault();
        selectRow(id_row);
        const contextMenu = document.getElementById('context_menu');
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.classList.remove(style.visible);
        setTimeout(() => {
            contextMenu.classList.add(style.visible);
        })

        console.log(message);
    }
    
    

    return(
        <>

        <div id='context_menu' className={[style.context_menu, 'border shadow rounded text-dark text-left'].join(' ')}>
            <button className={['btn w-100 font-weight-bold p-2 d-flex border-bottom', style.buttonBg].join(' ')} onClick={event => console.log('agregar')}>
                <i className={['demo-psi-add col-2 mt-1', style.iconColor].join(' ')}></i>
                <span className='col-10'>Agregar</span>
            </button>

            <button className={['btn w-100 font-weight-bold p-2 d-flex border-bottom', style.buttonBg].join(' ')}>
                <i className={['demo-psi-file-edit col-2 mt-1', style.iconColor].join(' ')}></i>
                <span className='col-10'>Modificar</span>
            </button>

            <button className={['btn w-100 font-weight-bold p-2 d-flex border-bottom', style.buttonBg].join(' ')}>
                <i className={['demo-psi-remove col-2 mt-1', style.iconColor].join(' ')}></i>
                <span className='col-10'>Eliminar</span>
            </button>

        </div>
        
        <table id={'rowMenu'} style={{width: totalWidth+'px'}} className={[style.table, 'table table-hover'].join(' ')}>
            
            <tbody>
            {data.map((item)=>{
                return(
                    <tr id={'row_'+item.id} key={item.id} className={[style.table, style.pointer, 'border-bottom'].join(' ')} onClick={event =>selectRow('row_' + item.id)} onContextMenu={event => rowContextMenu('row_' + item.id, item.cell)}>
                        {getCell(item.cell, gridAttr, item.id, saveRowSelected)}
                    </tr>
                )
            })}
            </tbody>
        </table>
        </>
    );
    
}


export function getDataRow(data = null, saveRowSelected){
    if(timer != 0){
        if(document.getElementById('item_input_' + lastPosition)){
            document.getElementById('item_input_'+ lastPosition).classList.add('d-none');
            document.getElementById('item_span_'+ lastPosition).classList.remove('d-none');
    
        }    
        let dataRow = [];
        data.map((item) => (
            dataRow.push({columnName: item[0], value: item[1]})
        ))
        console.log(dataRow); 
        saveRowSelected(dataRow);   
    }
};

function editField(position){
    timer = 0;
    if(document.getElementById('item_input_' + lastPosition)){
        document.getElementById('item_input_'+ lastPosition).classList.add('d-none');
        document.getElementById('item_span_'+ lastPosition).classList.remove('d-none');

    }

    document.getElementById('item_span_'+ position).classList.add('d-none');
    document.getElementById('item_input_'+ position).classList.remove('d-none');
    lastPosition = position;


}

async function updateItem(){
    //setLoader(true)
    try{
        const data = await callMaestroABM(50, 2, {n_cuit: "HOLALALAL", n_posicion_fiscal: "987654"});
        console.log(data);
        //setLoader(false);
    }catch(error){
        console.log(error)
        alert('Hubo un problema al llamar MaestroABM');
        //setLoader(false);    
    }
}


function sendData(){
    event.preventDefault()
    const data = document.getElementById('item_input_' + lastPosition).value;
    console.log(data);
    updateItem();
}

export function getCell(celdas, attr, rowId, saveRowSelected){
    let td = Object.keys(celdas).map((key) => [key, celdas[key]]);
    
    let ret = td.map((item, index)=>{
        let dataTd = (attr[index].dataType === 'HTML')? <div dangerouslySetInnerHTML={{__html: item[1]}} /> : item[1];
        return(
            <td id={'rowMenu'} key={item[0]+'_'+item[1]} className={[item[0], style.td_grid].join(' ')} style={{width: attr[index].width+'px'}}  >
                <span id={'item_span_' + rowId + 'x' + index} className={[style.item_grid, 'd-flex'].join(' ')} onClick={function(){ timer = setTimeout(function(){getDataRow(td, saveRowSelected)}, 250)}} onDoubleClick={event => editField(rowId + 'x' + index)} >{dataTd}</span>
                <form onSubmit={sendData}>
                    <IMaskInput
                        mask=''
                        unmask={true}
                        value={dataTd}
                        className='form-control d-none'
                        id={'item_input_' + rowId + 'x' + index}
                        
                    />
                </form>
            </td>
        )
    });
    return ret;
}


