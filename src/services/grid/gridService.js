import API from "../../components/API/API";

export const getGrid = (id_menu, n_grid, m_autoquery, param=null, eyeShear=null, sord, rows, page, cond, id_lista=null, campos=null, campo_exacto=null) => {
    if(param == null && (Object.keys(eyeShear).length === 0 || eyeShear == null) && id_lista == null){        return new Promise(async (resolve, reject) => {
            try {
                var urlencoded = new URLSearchParams();
                urlencoded.append("id_menu", id_menu);
                urlencoded.append("n_grid", n_grid);
                urlencoded.append("m_autoquery", m_autoquery);
                urlencoded.append("cond", JSON.stringify(cond));
                const res = await API.post(process.env.fmk_frmwk6 + 'grillas', urlencoded);
                resolve(res.data);
            }
            catch (e) {
                reject(e);
            }
        })
    }else if(id_lista != null ){
        return new Promise(async (resolve, reject) => {
            try {
                var urlencoded = new URLSearchParams();
                urlencoded.append("id_lista", id_lista);
                urlencoded.append("campos", JSON.stringify(campos));
                // urlencoded.append("param", JSON.stringify(param));
                urlencoded.append("cond", cond);
                urlencoded.append("campo_exacto", '');
                urlencoded.append("m_autoquery", m_autoquery);
                urlencoded.append("rows", rows);
                urlencoded.append("page", page);
                urlencoded.append("sord", sord);
                const res = await API.post(process.env.fmk_frmwk6+'grillas/lista', urlencoded);
                resolve(res.data);
            }
            catch (e) {
                reject(e);
            }
        })
    }
    else{
        return new Promise(async (resolve, reject) => {
            try {
                var urlencoded = new URLSearchParams();
                urlencoded.append("id_menu", id_menu);
                urlencoded.append("n_grid", n_grid);
                urlencoded.append("m_autoquery", m_autoquery);
                urlencoded.append("param", JSON.stringify(param));
                urlencoded.append("filters", JSON.stringify(eyeShear));
                urlencoded.append("sord", sord);
                urlencoded.append("rows", rows);
                urlencoded.append("page", page);
                urlencoded.append("cond", JSON.stringify(cond));
                const res = await API.post(process.env.fmk_frmwk6+'grillas/busqueda', urlencoded);
                resolve(res.data);
            }
            catch (e) {
                reject(e);
            }
        })
    }
}

export const callMaestroABM = (id_menu, n_orden, param=null) => {
    console.log(param);
    return new Promise(async (resolve, reject) => {
        try {
            var urlencoded = new URLSearchParams();
            urlencoded.append("id_menu", id_menu);
            urlencoded.append("n_orden", n_orden);
            for (const [key, value] of Object.entries(param)) {
                urlencoded.append(key.toLowerCase(), value);
            }
            console.log(urlencoded);
            const res = await API.post(process.env.fmk_frmwk6+'maestroabm', urlencoded);
            resolve(res.data);
        }
        catch (e) {
            reject(e);
        }
    })
}