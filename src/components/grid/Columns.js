import style from './Columns.module.css';
export default function Columns ({data, totalWidth, gridAttr, handleOrder}){

    function changeOrder(name, id_icon){
        let order = '';
        if(!document.getElementById('icon_asc_'+ id_icon).classList.contains('d-block') && !document.getElementById('icon_desc_'+ id_icon).classList.contains('d-block')){
            document.getElementById('icon_asc_'+ id_icon).classList.remove('d-none');
            document.getElementById('icon_asc_'+ id_icon).classList.add('d-block');
            order = 'asc'
            handleOrder(name, order);

        }else if(document.getElementById('icon_asc_'+ id_icon).classList.contains('d-block')){
            document.getElementById('icon_asc_'+ id_icon).classList.remove('d-block');
            document.getElementById('icon_asc_'+ id_icon).classList.add('d-none');
            document.getElementById('icon_desc_'+ id_icon).classList.remove('d-none');
            document.getElementById('icon_desc_'+ id_icon).classList.add('d-block');
            order = 'desc'
            handleOrder(name, order);

        }else{
            document.getElementById('icon_desc_'+ id_icon).classList.remove('d-block');
            document.getElementById('icon_desc_'+ id_icon).classList.add('d-none');

            handleOrder(name, order);

        }
    }
    return(
        <table className='border-bottom' style={{width: totalWidth+'px'}}>
        <tbody>
            <tr key={1}>
            {data.map((item, index) => {
                return (
                <th
                    key={item.ID_GRID_COLUMN}
                    style={{width: gridAttr[index].width+'px'}}
                    className={[item.M_FREEZE? style.freeze : '', item.M_VISIBLE? style.visible : style.not_visible, style.th_title, style.pointer, 'p-1'].join(' ')}
                    id={item.D_COLUMN_NAME}
                    onClick={event => changeOrder(item.D_COLUMN_NAME, item.ID_GRID_COLUMN)}
                >
                    <div className='d-flex'>
                        <span className={[style.column_title].join(' ')} > {item.D_COLUMN_TITLE} </span>
                        <span className={[style.column_sort, 'text-center d-flex align-items-center'].join(' ')} style={{display: ''}}>
                            <i id={"icon_asc_" + item.ID_GRID_COLUMN} className="d-none text-primary glyphicon glyphicon-triangle-top"></i>
                            <i id={"icon_desc_" + item.ID_GRID_COLUMN} className="d-none text-primary glyphicon glyphicon-triangle-bottom"></i>
                        </span>
                    </div>
                </th>);
            })}
            </tr>
        </tbody>
        </table>
    );
}