import React, {useState} from 'react';
import {SimpleAlert} from "../../src/components/simpleAlert/SimpleAlert";
import DynamicFilter from "../../src/components/dynamicFilter/DynamicFilter";
import Grid from "../../src/components/grid/Grid";

function PlantillaComp(props) {
    const [param, setParam] = useState({
        p_n_cuit:null,
        p_f_venc_desde:null,
        p_f_venc_hasta:null,
        p_d_descripcion:null,
        p_c_provincia:null,
        p_m_obligatorio:null,
        p_m_pago:null,
        p_n_posicion_desde:null,
        p_n_posicion_hasta:null,
        p_n_cuota_desde:null,
        p_n_cuota_hasta:null
    });

    const paramsSearchGlass = {};
    const [condSearchGlass, setcondSearchGlass] = useState(null)
    const colSearchGlass = {
        c_codigo:
            {
                C_COLUMN_NAME:"c_codigo",
                D_COLUMN_NAME:"Codigo",
                C_COLUMN_ATTR:"width:150",
            },
        d_descrip:
            {
                C_COLUMN_NAME:"d_descrip",
                D_COLUMN_NAME:"Descripcion",
                C_COLUMN_ATTR:"width:200",
            }
    };
    return (
        <>
            <DynamicFilter
                id_menu = '50'
                n_grid = '0'
                n_orden = '1'
                grid_title = 'Grilla de Prueba'
                m_autoquery='S'
                param={param}
            >
                <Grid
                    editRow={[
                        {name: 'n_cuit', value: '', id_menu: 10689, n_orden: 5},
                        {name: 'n_posicion_fiscal', value: '', id_menu: 10689, n_orden: 6}
                    ]}
                />
            </DynamicFilter>
        </>
    );
}

export default PlantillaComp;